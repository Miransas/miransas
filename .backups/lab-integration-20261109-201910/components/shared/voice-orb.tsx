"use client";

import { useEffect, useId, useRef, useState } from "react";

export type OrbMode = { amp: number; freq: number; speed: number };
type VoiceOrbProps = { tone?: "light" | "dark"; mode?: OrbMode; className?: string };
const DEFAULT_MODE: OrbMode = { amp: 0.25, freq: 1.1, speed: 0.8 };

// A continuous, opaque surface replaces the former concentric point shells.
// Geometry and normals share the same coherent field; lighting never drives deformation.
const VERTEX = /* glsl */ `
precision highp float;
attribute vec3 aPosition;
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform vec2 uProjection;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vFold;

// Simplex noise by Ian McEwan, Ashima Arts (MIT)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}


vec4 surface(vec3 p) {
  float t = uTime;
  // Coherent low-frequency domain flow, projected onto the tangent plane.
  vec3 flow = sin(p.yzx * 1.65 + sin(p.zxy * 1.25 + vec3(t * .15, -t * .12, t * .09)));
  flow -= p * dot(flow, p);
  vec3 q = normalize(p + flow * .26);
  float broad = snoise(q * 1.32 + vec3(t * .075, -t * .055, t * .04));
  float frequency = .9 + clamp(uFreq - .8, 0., .8) * .34;
  float phase = (q.y * 8.2 + q.x * 2.2 + q.z * 1.2) * frequency + broad * 2.35 + t * .27;
  float fold = sin(phase);
  float intensity = .72 + clamp(uAmp, 0., .65) * 1.55;
  float radius = .91 + intensity * (.17 * fold + .052 * sin(phase * 2. + .65));
  float fine = snoise(q * 7.2 + vec3(-t * .045, t * .035, t * .025));
  radius += fine * .004;
  // Material slides across the sphere as folds form, rather than only moving radially.
  vec3 tangent = vec3(.68, .23, -.46);
  tangent -= q * dot(tangent, q);
  vec3 result = q * radius + tangent * (.075 * intensity * cos(phase + .5));
  return vec4(result, fold);
}

mat3 orientation() {
  // Fixed presentation angle: all apparent movement comes from the material field.
  float x = .28;
  float z = -.38;
  mat3 rx = mat3(1.,0.,0., 0.,cos(x),sin(x), 0.,-sin(x),cos(x));
  mat3 rz = mat3(cos(z),sin(z),0., -sin(z),cos(z),0., 0.,0.,1.);
  return rz * rx;
}

void main() {
  vec3 p = normalize(aPosition);
  vec3 up = abs(p.y) > .96 ? vec3(0.,0.,1.) : vec3(0.,1.,0.);
  vec3 tangent = normalize(cross(up, p));
  vec3 bitangent = cross(p, tangent);
  vec4 s = surface(p);
  // Smooth material-space normals, not sphere normals or triangle-face approximations.
  const float epsilon = .0035;
  vec3 du = surface(normalize(p + tangent * epsilon)).xyz - s.xyz;
  vec3 dv = surface(normalize(p + bitangent * epsilon)).xyz - s.xyz;
  mat3 model = orientation();
  vec3 world = model * s.xyz;
  vNormal = normalize(model * cross(du, dv));
  vPosition = world;
  vFold = s.w;
  const float camera = 4.6;
  float depth = camera - world.z;
  // Perspective camera, near=1 / far=9. Maximum deformation fits inside this framing.
  gl_Position = vec4(world.xy * uProjection * camera, 1.25 * depth - 2.25, depth);
}
`;

const FRAGMENT = /* glsl */ `
precision highp float;
uniform float uDark;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vFold;

void main() {
  vec3 n = normalize(vNormal);
  if (!gl_FrontFacing) n = -n;
  vec3 view = normalize(vec3(0., 0., 4.6) - vPosition);
  vec3 key = normalize(vec3(-.65, .85, 1.1));
  vec3 fill = normalize(vec3(.9, -.15, .65));
  float diffuse = max(dot(n, key), 0.);
  float reflected = max(dot(n, fill), 0.);
  float valley = smoothstep(-.8, .65, vFold);
  float occlusion = mix(.47, 1., valley);
  vec3 deep = mix(vec3(.026,.10,.235), vec3(.012,.045,.115), uDark);
  vec3 blue = mix(vec3(.055,.285,.57), vec3(.055,.255,.54), uDark);
  vec3 cyan = mix(vec3(.25,.66,.79), vec3(.20,.62,.75), uDark);
  float light = clamp(diffuse * .82 + reflected * .18, 0., 1.);
  vec3 color = mix(deep, blue, .25 + light * .75);
  color = mix(color, cyan, pow(diffuse, 3.) * .36 * valley);
  color *= occlusion;
  vec3 halfVector = normalize(key + view);
  float specular = pow(max(dot(n, halfVector), 0.), 48.);
  float glint = pow(max(dot(n, halfVector), 0.), 150.);
  color += vec3(.28,.60,.72) * specular * .22 * occlusion;
  color += vec3(.73,.88,.94) * glint * .15 * occlusion;
  float rim = pow(1. - max(dot(n, view), 0.), 3.);
  color += cyan * rim * .11 * (.3 + valley * .7);
  // Opaque material with transparent canvas clearing: no additive bloom or white haze.
  gl_FragColor = vec4(clamp(color, 0., 1.), 1.);
}
`;

type Gpu = {
  program: WebGLProgram;
  vertex: WebGLShader;
  fragment: WebGLShader;
  positions: WebGLBuffer;
  indices: WebGLBuffer;
  count: number;
  small: boolean;
  time: WebGLUniformLocation | null;
  amp: WebGLUniformLocation | null;
  freq: WebGLUniformLocation | null;
  dark: WebGLUniformLocation | null;
  projection: WebGLUniformLocation | null;
};

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  console.warn("[VoiceOrb] Shader compilation failed:", gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

/** Persistent buffers; geometry changes only when the responsive quality tier changes. */
function uploadGeometry(gl: WebGLRenderingContext, gpu: Gpu, small: boolean) {
  const rows = small ? 76 : 128;
  const columns = small ? 112 : 192;
  const vertices = new Float32Array((rows + 1) * (columns + 1) * 3);
  const indices = new Uint16Array(rows * columns * 6);
  let v = 0;
  let k = 0;
  for (let row = 0; row <= rows; row++) {
    const theta = Math.PI * row / rows;
    for (let column = 0; column <= columns; column++) {
      const phi = 2 * Math.PI * column / columns;
      vertices[v++] = Math.sin(theta) * Math.cos(phi);
      vertices[v++] = Math.cos(theta);
      vertices[v++] = Math.sin(theta) * Math.sin(phi);
    }
  }
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const a = row * (columns + 1) + column;
      const b = a + columns + 1;
      indices[k++] = a; indices[k++] = a + 1; indices[k++] = b;
      indices[k++] = b; indices[k++] = a + 1; indices[k++] = b + 1;
    }
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, gpu.positions);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const attribute = gl.getAttribLocation(gpu.program, "aPosition");
  gl.enableVertexAttribArray(attribute);
  gl.vertexAttribPointer(attribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gpu.indices);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  gpu.count = indices.length;
  gpu.small = small;
}

function release(gl: WebGLRenderingContext, gpu: Gpu | null) {
  if (!gpu) return;
  gl.deleteBuffer(gpu.positions);
  gl.deleteBuffer(gpu.indices);
  gl.deleteProgram(gpu.program);
  gl.deleteShader(gpu.vertex);
  gl.deleteShader(gpu.fragment);
}

function createGpu(gl: WebGLRenderingContext): Gpu | null {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  const positions = gl.createBuffer();
  const indices = gl.createBuffer();
  if (!vertex || !fragment || !program || !positions || !indices) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    if (program) gl.deleteProgram(program);
    if (positions) gl.deleteBuffer(positions);
    if (indices) gl.deleteBuffer(indices);
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program); gl.deleteShader(vertex); gl.deleteShader(fragment);
    gl.deleteBuffer(positions); gl.deleteBuffer(indices);
    return null;
  }
  gl.useProgram(program);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.disable(gl.CULL_FACE);
  gl.disable(gl.BLEND);
  return { program, vertex, fragment, positions, indices, count: 0, small: false,
    time: gl.getUniformLocation(program, "uTime"), amp: gl.getUniformLocation(program, "uAmp"),
    freq: gl.getUniformLocation(program, "uFreq"), dark: gl.getUniformLocation(program, "uDark"),
    projection: gl.getUniformLocation(program, "uProjection") };
}

function SculptureFallback({ dark }: { dark: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-body`} x1=".2" x2=".9" y2="1">
          <stop stopColor={dark ? "#17487c" : "#245a91"} />
          <stop offset=".5" stopColor={dark ? "#082648" : "#11365d"} />
          <stop offset="1" stopColor="#061b38" />
        </linearGradient>
        <linearGradient id={`${id}-fold`} x2=".8" y2="1">
          <stop stopColor="#5aabc5" /><stop offset=".4" stopColor="#2466a2" /><stop offset="1" stopColor="#0a2a54" />
        </linearGradient>
        <clipPath id={`${id}-clip`}><path d="M160 38C225 29 277 82 281 149C292 215 236 279 169 282C96 290 38 241 37 170C27 103 87 43 160 38Z" /></clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <path fill={`url(#${id}-body)`} d="M0 0H320V320H0Z" />
        <path fill={`url(#${id}-fold)`} d="M21 87C103 12 123 133 207 72C265 30 279 78 314 101L294 136C245 80 217 154 158 140C89 127 88 60 21 122Z" />
        <path fill={`url(#${id}-fold)`} d="M11 155C83 82 114 208 197 140C254 93 288 144 312 166L297 198C240 145 216 225 148 207C83 189 79 130 18 193Z" />
        <path fill={`url(#${id}-fold)`} d="M24 226C101 159 118 278 204 214C255 177 284 211 304 239L272 273C231 232 206 292 147 274C89 256 82 207 39 255Z" />
      </g>
    </svg>
  );
}

export function VoiceOrb({ tone = "dark", mode = DEFAULT_MODE, className }: VoiceOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef(mode);
  const toneRef = useRef(tone);
  const invalidateRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => { modeRef.current = mode; invalidateRef.current?.(); }, [mode]);
  useEffect(() => { toneRef.current = tone; invalidateRef.current?.(); }, [tone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true, powerPreference: "low-power" });
    if (!gl) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobilePreference = window.matchMedia("(max-width: 767px)");
    const current = { ...modeRef.current, dark: toneRef.current === "dark" ? 1 : 0 };
    let gpu: Gpu | null = null;
    let time = 2.7;
    let raf = 0;
    let last = 0;
    let inView = true;
    let lost = false;
    let disposed = false;

    const draw = () => {
      if (!gpu || lost || disposed) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniform1f(gpu.time, time);
      gl.uniform1f(gpu.amp, current.amp);
      gl.uniform1f(gpu.freq, current.freq);
      gl.uniform1f(gpu.dark, current.dark);
      gl.drawElements(gl.TRIANGLES, gpu.count, gl.UNSIGNED_SHORT, 0);
    };
    const update = (delta: number) => {
      const target = modeRef.current;
      const ease = 1 - Math.exp(-delta * 2.2);
      current.amp += (target.amp - current.amp) * ease;
      current.freq += (target.freq - current.freq) * ease;
      current.speed += (target.speed - current.speed) * ease;
      current.dark += ((toneRef.current === "dark" ? 1 : 0) - current.dark) * ease;
      time += delta * Math.max(.1, current.speed);
    };
    const frame = (now: number) => {
      raf = 0;
      if (disposed || lost || !inView || document.hidden || motionPreference.matches || !gpu) return;
      const interval = mobilePreference.matches ? 1000 / 30 : 1000 / 60;
      if (now - last >= interval - 1) {
        update(Math.min((now - last) / 1000, .065));
        last = now;
        draw();
      }
      raf = requestAnimationFrame(frame);
    };
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };
    const start = () => {
      if (disposed || lost || !gpu || raf || !inView || document.hidden || motionPreference.matches) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const resize = () => {
      if (!gpu || lost) return;
      const small = mobilePreference.matches;
      if (!gpu.count || gpu.small !== small) uploadGeometry(gl, gpu, small);
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75, 1200 / Math.max(rect.width, rect.height, 1));
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
      gl.viewport(0, 0, width, height);
      gl.uniform2f(gpu.projection, .67 / (width / height), .67);
      draw();
    };
    const initialize = () => {
      gpu = createGpu(gl);
      if (!gpu) { setReady(false); return; }
      resize();
      setReady(true);
      start();
    };
    const invalidate = () => {
      // Static mode still updates theme and selected technology, without an animation loop.
      if (motionPreference.matches || !inView || document.hidden) {
        Object.assign(current, modeRef.current);
        current.dark = toneRef.current === "dark" ? 1 : 0;
      }
      draw();
      start();
    };
    const onMotionChange = () => { stop(); invalidate(); };
    const onVisibility = () => { if (document.hidden) stop(); else { invalidate(); start(); } };
    const onLost = (event: Event) => { event.preventDefault(); lost = true; stop(); gpu = null; setReady(false); };
    const onRestored = () => { if (disposed) return; lost = false; initialize(); };
    const observer = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      if (inView) start(); else stop();
    });
    invalidateRef.current = invalidate;
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);
    motionPreference.addEventListener("change", onMotionChange);
    mobilePreference.addEventListener("change", resize);
    document.addEventListener("visibilitychange", onVisibility);
    observer.observe(canvas);
    intersection.observe(canvas);
    initialize();
    return () => {
      disposed = true;
      stop();
      invalidateRef.current = null;
      observer.disconnect(); intersection.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      motionPreference.removeEventListener("change", onMotionChange);
      mobilePreference.removeEventListener("change", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      release(gl, gpu);
    };
  }, []);

  return (
    <span className={className} aria-hidden="true" style={{ position: "relative", display: "inline-block", isolation: "isolate" }}>
      <canvas ref={canvasRef} data-voice-orb="acoustic-mesh" style={{ display: "block", width: "100%", height: "100%", opacity: ready ? 1 : 0 }} />
      {!ready && <span style={{ position: "absolute", inset: 0 }}><SculptureFallback dark={tone === "dark"} /></span>}
    </span>
  );
}
