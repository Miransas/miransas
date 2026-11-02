"use client";

import { useEffect, useRef, useState } from "react";

export type OrbMode = { amp: number; freq: number; speed: number };

type VoiceOrbProps = {
  tone?: "light" | "dark";
  mode?: OrbMode;
  className?: string;
};

const DEFAULT_MODE: OrbMode = { amp: 0.35, freq: 1.0, speed: 1 };

// ── Vertex shader ─────────────────────────────────────────────────────────
// Points sit on a unit sphere (Fibonacci distribution). Two layers of 3D
// simplex noise push every point in or out, which gives the soft, folded,
// living surface. The pointer pushes nearby dots away and makes them larger.
const VERTEX = /* glsl */ `
precision highp float;

attribute vec3 aPos;
attribute float aShell;

uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform vec2 uRot;
uniform float uAspect;
uniform float uScale;
uniform float uPx;
uniform vec2 uPointer;
uniform float uPointerOn;

varying float vLight;
varying float vAlpha;
varying float vHeat;

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

void main() {
  vec3 p = aPos;

  // Petal twist: swirl the noise domain around Y → rose-like folded layers.
  float twist = p.y * 1.5 + uTime * 0.06;
  float ctw = cos(twist);
  float stw = sin(twist);
  vec3 np = vec3(ctw * p.x + stw * p.z, p.y, -stw * p.x + ctw * p.z);

  // Single, slow, coherent time vector — the field drifts, never jumps.
  vec3 drift = vec3(uTime * 0.14, uTime * 0.10, uTime * 0.07);

  // Each shell samples a shifted field → visible layers, like folded petals.
  float n1 = snoise(np * uFreq + drift + vec3(aShell * 1.71, aShell * 0.83, 0.0));
  float n2 = snoise(np * uFreq * 2.1 - drift * 0.7 + vec3(0.0, aShell * 1.13, aShell * 0.59));
  float amp = uAmp * (1.0 - aShell * 0.18);
  float d = clamp(n1 * amp + n2 * amp * 0.28, -0.38, 0.45);

  // Re-normalize after displacement → silhouette always stays a sphere.
  vec3 pos = normalize(p) * (1.0 + d);

  // Gentle organic "breathing" tied to the surface, not the camera.
  pos *= 1.0 + 0.012 * sin(uTime * 0.7 + n1 * 3.0);

  // rotation (X tilt, then Y spin)
  float cx = cos(uRot.x);
  float sx = sin(uRot.x);
  float cy = cos(uRot.y);
  float sy = sin(uRot.y);
  pos = vec3(cy * pos.x + sy * pos.z, pos.y, -sy * pos.x + cy * pos.z);
  pos = vec3(pos.x, cx * pos.y - sx * pos.z, sx * pos.y + cx * pos.z);

  vec3 n = normalize(pos);
  float facing = n.z;
  float k = 1.0 / (1.0 - pos.z * 0.18);

  vec2 ndc = pos.xy * k * uScale * vec2(1.0 / uAspect, 1.0);

  // Pointer: gravity vortex — dots SWIRL around the cursor, not pushed away.
  vec2 dd = (ndc - uPointer) * vec2(uAspect, 1.0);
  float f = exp(-dot(dd, dd) * 9.0) * uPointerOn;
  vec2 dir = normalize(dd + vec2(0.0001));
  vec2 perp = vec2(-dir.y, dir.x);
  ndc += (perp * 0.10 - dir * 0.025) * f * vec2(1.0 / uAspect, 1.0);

  float rim = pow(1.0 - clamp(facing, 0.0, 1.0), 2.0);
  // Fixed light direction → real "ball" shading with a soft terminator.
  vec3 lightDir = normalize(vec3(-0.45, 0.65, 0.62));
  float diff = clamp(dot(n, lightDir) * 0.5 + 0.5, 0.0, 1.0);
  vLight = clamp(0.18 + diff * 0.72 + d * 1.4 + rim * 0.35 + f * 0.4, 0.0, 1.0);
  vAlpha = mix(0.30, 1.0, smoothstep(-0.70, 0.40, facing));
  vHeat = f;

  float size = uPx * (0.82 + aShell * 0.16) * (1.0 + f * 1.3) * (0.55 + 0.75 * (facing * 0.5 + 0.5)) * k;
  gl_PointSize = clamp(size, uPx * 0.5, uPx * 3.0);
  gl_Position = vec4(ndc, -pos.z * 0.1, 1.0);
}
`;

// ── Fragment shader ───────────────────────────────────────────────────────
const FRAGMENT = /* glsl */ `
precision mediump float;

uniform float uDark;

varying float vLight;
varying float vAlpha;
varying float vHeat;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c);
  if (r > 0.5) discard;

  float edge = smoothstep(0.5, 0.18, r);

  vec3 deep = mix(vec3(0.015, 0.06, 0.30), vec3(0.04, 0.13, 0.45), uDark);
  vec3 mid = vec3(0.08, 0.32, 0.92);
  vec3 hi = vec3(0.93, 0.97, 1.0);

  vec3 col = mix(deep, mid, smoothstep(0.0, 0.55, vLight));
  col = mix(col, hi, smoothstep(0.55, 1.0, vLight));

  // Near the vortex the surface "heats up" → cyan-white glow.
  col = mix(col, vec3(0.55, 0.95, 1.0), clamp(vHeat * 0.6, 0.0, 1.0));

  float a = edge * vAlpha;
  gl_FragColor = vec4(col * a, a); // premultiplied alpha
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("[VoiceOrb] shader error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function VoiceOrb({
  tone = "dark",
  mode = DEFAULT_MODE,
  className,
}: VoiceOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<OrbMode>(mode);
  const toneRef = useRef(tone);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    toneRef.current = tone;
  }, [tone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });
    if (!gl) {
      setFallback(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      setFallback(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("[VoiceOrb] link error:", gl.getProgramInfoLog(program));
      setFallback(true);
      return;
    }
    gl.useProgram(program);

    // ── geometry: Fibonacci sphere ────────────────────────────────────────
    const small = window.matchMedia("(max-width: 767px)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const count = small ? 11000 : 24000;
    const baseSize = small ? 2.2 : 2.0;

    // Three concentric shells → the dense, layered "rose" depth from the ref.
    const positions = new Float32Array(count * 3);
    const shells = new Float32Array(count);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const SHELLS = [
      { r: 0.74, share: 0.28 },
      { r: 0.88, share: 0.33 },
      { r: 1.0, share: 0.39 },
    ];
    let ptr = 0;
    SHELLS.forEach((shell, s) => {
      const n = Math.round(count * shell.share);
      for (let i = 0; i < n && ptr < count; i++, ptr++) {
        const y = 1 - (2 * (i + 0.5)) / n;
        const r = Math.sqrt(Math.max(0, 1 - y * y)) * shell.r;
        const theta = golden * (i + s * 137.5);
        positions[ptr * 3] = Math.cos(theta) * r;
        positions[ptr * 3 + 1] = y * shell.r;
        positions[ptr * 3 + 2] = Math.sin(theta) * r;
        shells[ptr] = s;
      }
    });

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

    const shellBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shellBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, shells, gl.STATIC_DRAW);
    const aShell = gl.getAttribLocation(program, "aShell");
    if (aShell >= 0) {
      gl.enableVertexAttribArray(aShell);
      gl.vertexAttribPointer(aShell, 1, gl.FLOAT, false, 0, 0);
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const uni = (name: string) => gl.getUniformLocation(program, name);
    const u = {
      time: uni("uTime"),
      amp: uni("uAmp"),
      freq: uni("uFreq"),
      rot: uni("uRot"),
      aspect: uni("uAspect"),
      scale: uni("uScale"),
      px: uni("uPx"),
      pointer: uni("uPointer"),
      pointerOn: uni("uPointerOn"),
      dark: uni("uDark"),
    };

    // ── state ─────────────────────────────────────────────────────────────
    const cur = { ...modeRef.current };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, on: 0, tOn: 0 };
    let time = 0;
    let spin = 0;
    let rotX = 0.25;
    let rotY = 0;
    let raf = 0;
    let last = performance.now();
    let inView = true;

    const update = (dt: number) => {
      const m = modeRef.current;
      const ease = 1 - Math.exp(-dt * 3);
      // Organic idle pulse: the orb breathes on its own, even with no input.
      const pulse = 1 + 0.16 * Math.sin(time * 0.55) + 0.07 * Math.sin(time * 0.21 + 1.7);
      cur.amp += (m.amp * pulse - cur.amp) * ease;
      cur.freq += (m.freq - cur.freq) * ease;
      cur.speed += (m.speed - cur.speed) * ease;

      time += dt * cur.speed;
      spin += dt * 0.06 * cur.speed;

      const follow = 1 - Math.exp(-dt * 5);
      pointer.x += (pointer.tx - pointer.x) * follow;
      pointer.y += (pointer.ty - pointer.y) * follow;
      pointer.on += (pointer.tOn - pointer.on) * (1 - Math.exp(-dt * 4));

      // Slow autonomous wander + pointer tilt.
      const wanderX = Math.sin(time * 0.11) * 0.10;
      const wanderY = Math.sin(time * 0.07 + 2.0) * 0.15;
      rotX = 0.25 - pointer.y * 0.22 + wanderX;
      rotY = spin + pointer.x * 0.4 + wanderY;
    };

    const render = () => {
      // Contact shadow breathes with the orb → it feels grounded, not pasted.
      const sh = shadowRef.current;
      if (sh) {
        const s = 1 + cur.amp * 0.55 + Math.sin(time * 0.55) * 0.06;
        sh.style.transform = `translateX(-50%) scale(${s.toFixed(3)})`;
        sh.style.opacity = (0.55 + cur.amp * 0.5).toFixed(3);
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(u.time, time);
      gl.uniform1f(u.amp, cur.amp);
      gl.uniform1f(u.freq, cur.freq);
      gl.uniform2f(u.rot, rotX, rotY);
      gl.uniform2f(u.pointer, pointer.x, pointer.y);
      gl.uniform1f(u.pointerOn, pointer.on);
      gl.uniform1f(u.dark, toneRef.current === "dark" ? 1 : 0);
      gl.drawArrays(gl.POINTS, 0, count);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      update(dt);
      render();
    };

    const start = () => {
      if (reduceMotion || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform1f(u.aspect, w / h);
      gl.uniform1f(u.scale, 0.56);
      gl.uniform1f(u.px, baseSize * dpr);
      render();
    };

    // ── events ────────────────────────────────────────────────────────────
    const onPointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      pointer.tx = Math.max(-1, Math.min(1, nx));
      pointer.ty = Math.max(-1, Math.min(1, ny));
      pointer.tOn = Math.abs(nx) < 1.1 && Math.abs(ny) < 1.1 ? 1 : 0;
    };

    const onLeave = () => {
      pointer.tOn = 0;
      pointer.tx = 0;
      pointer.ty = 0;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        if (inView && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersection.observe(canvas);

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
    }
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteBuffer(shellBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
   
    };
  }, []);

  if (fallback) {
    return (
      <div
        aria-hidden
        className={className}
        style={{
          background:
            "radial-gradient(closest-side, rgba(56,140,255,0.55), rgba(56,140,255,0.12) 60%, transparent 72%)",
        }}
      />
    );
  }

  return (
    <span
      className={className}
      style={{ position: "relative", display: "inline-block" }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ display: "block", width: "100%", height: "100%" }}
      />
      <div
        ref={shadowRef}
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-4%",
          width: "72%",
          height: "12%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background:
            tone === "dark"
              ? "radial-gradient(ellipse at center, rgba(8, 25, 70, 0.55) 0%, rgba(8, 25, 70, 0.28) 45%, transparent 72%)"
              : "radial-gradient(ellipse at center, rgba(37, 78, 160, 0.30) 0%, rgba(37, 78, 160, 0.13) 45%, transparent 72%)",
          filter: "blur(6px)",
          pointerEvents: "none",
        }}
      />
    </span>
  );
}