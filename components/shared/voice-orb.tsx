"use client";

import { useEffect, useRef, useState } from "react";

export type OrbMode = { amp: number; freq: number; speed: number };

type VoiceOrbProps = {
  tone?: "light" | "dark";
  mode?: OrbMode;
  color?: string;
  fog?: number;
  dust?: number;
  dots?: number;
  className?: string;
};

const DEFAULT_MODE: OrbMode = { amp: 0.40, freq: 1.04, speed: 0.72 };

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

// ══════════════════════════════════════════════════════════════════════════
// PASS 1: #0d4bfa BLUE SMOKE & LUMINOUS DUST AROUND THE SPHERE
// ══════════════════════════════════════════════════════════════════════════
const ATMOS_VERT = /* glsl */ `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const ATMOS_FRAG = /* glsl */ `
precision highp float;

uniform vec2 uResolution;
uniform float uDpr;
uniform float uScale;
uniform float uTime;
uniform float uBurst;
uniform vec4 uLens;   // pointer x, y, radius, strength (CSS px)
uniform vec3 uAmount; // fog, dust, dots
uniform float uTheme; // 0 dark, 1 light

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

float particle(vec2 pixel, float spacing, float threshold, float radius, float t, float seed) {
  vec2 cell = floor(pixel / spacing);
  vec2 randomPos = vec2(hash(cell + seed), hash(cell + seed + 13.7));
  vec2 local = fract(pixel / spacing);
  vec2 pos = 0.18 + randomPos * 0.64;
  float dist = length((local - pos) * spacing);
  float on = step(threshold, hash(cell + seed * 3.7));
  float softness = 1.0 - smoothstep(radius * 0.45, radius * 1.7, dist);
  float breathe = 0.87 + 0.13 * sin(t * 0.7 + randomPos.x * 6.283);
  return on * softness * breathe;
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uResolution.y * uDpr - gl_FragCoord.y) / uDpr;
  vec2 uv = frag / uResolution;
  bool mobile = uResolution.x < 768.0;

  // Aligned with ORB_VERT centerY and behind-orb MIRANSAS wordmark
  vec2 origin = vec2(uResolution.x * 0.5, uResolution.y * (mobile ? 0.43 : 0.44));
  float radius = uResolution.y * (mobile ? 0.36 : 0.265);
  vec2 p = (frag - origin) / max(radius, 1.0);
  float r = length(p);
  float t = uTime;

  // Plume wraps softly across the center wordmark and fans outward
  float birth = smoothstep(0.28, 1.15, r);
  float coreMist = 0.32 * exp(-r * r * 1.1);
  float fade = 1.0 - smoothstep(2.1, 4.7, r);
  float plume = (birth + coreMist) * fade;

  float edge = smoothstep(0.0, 0.075, uv.x) * smoothstep(0.0, 0.075, 1.0 - uv.x)
             * smoothstep(0.0, 0.09, uv.y) * smoothstep(0.0, 0.09, 1.0 - uv.y);

  vec2 dir = p / max(r, 0.001);
  vec2 advected = p - dir * (t * 0.024) + vec2(t * 0.009, -t * 0.011);
  vec2 warp = vec2(
    fbm(advected * 1.15 + vec2(1.7, 9.2) + t * 0.021),
    fbm(advected * 1.15 + vec2(8.3, 2.8) - t * 0.018)
  ) - 0.5;
  vec2 fq = advected * 0.93 + 1.55 * warp;
  float broad = fbm(fq);
  float detail = fbm(fq * 2.2 + vec2(3.4, 6.1));
  float cloud = smoothstep(0.36, 0.69, broad * 0.76 + detail * 0.24);
  float wisps = smoothstep(0.40, 0.63, fbm(fq * 1.55 + vec2(5.2, 1.9)));
  float density = (cloud * 0.78 + wisps * 0.22) * plume * edge;

  // Preserve readability of bottom-left headline & bottom-right card
  vec2 title = (uv - vec2(0.20, 0.82)) / vec2(0.28, 0.22);
  vec2 body = (uv - vec2(0.80, 0.80)) / vec2(0.28, 0.24);
  float readability = (1.0 - 0.52 * exp(-dot(title, title) * 1.7))
                    * (1.0 - 0.52 * exp(-dot(body, body) * 1.7));
  density *= readability;

  vec2 mouseDelta = frag - uLens.xy;
  float lensRadius = max(1.0, uLens.z);
  float spotlight = exp(-dot(mouseDelta, mouseDelta) / (lensRadius * lensRadius * 1.9)) * uLens.w;

  float fogAlpha = clamp(uAmount.x, 0.0, 2.0) * density * (0.16 + 0.22 * cloud);
  fogAlpha *= 1.0 + 0.75 * spotlight + 0.10 * uBurst;

  // Blue-tinted drifting dust particles
  float dustAlpha = 0.0;
  if (uAmount.y > 0.001 || uAmount.z > 0.001) {
    vec2 pixel = (frag - origin) / max(uScale, 0.35);
    float fine = particle(pixel + vec2(t * 1.9, -t * 3.2), 42.0, 0.87, 0.85, t, 1.3);
    float medium = particle(pixel + vec2(-t * 1.1, -t * 1.7), 75.0, 0.92, 1.2, t, 4.7);
    float rare = particle(pixel + vec2(t * 0.6, t * 1.4), 105.0, 0.96, 1.3, t, 8.9);
    float dustZone = smoothstep(0.55, 1.05, r) * (1.0 - smoothstep(3.0, 4.7, r));
    dustAlpha = (clamp(uAmount.y, 0.0, 2.0) * (fine * 0.24 + medium * 0.28)
               + clamp(uAmount.z, 0.0, 2.0) * rare * 0.26)
               * dustZone * edge * (0.55 + 0.45 * cloud) * (1.0 + spotlight * 0.45);
  }

  // #0d4bfa (0.051, 0.294, 0.980) volumetric blue smoke & luminous dust palette
  vec3 cobalt = vec3(0.051, 0.294, 0.980);
  vec3 deepMistDark = vec3(0.04, 0.14, 0.48);
  vec3 brightMistDark = vec3(0.36, 0.58, 1.00);
  vec3 darkSmokeCol = mix(deepMistDark, cobalt, smoothstep(0.15, 0.75, cloud));
  darkSmokeCol = mix(darkSmokeCol, brightMistDark, clamp(wisps * 0.35 + spotlight * 0.45, 0.0, 1.0));

  vec3 lightSmokeCol = mix(vec3(0.03, 0.14, 0.45), cobalt, smoothstep(0.2, 0.8, cloud));
  vec3 smokeCol = mix(darkSmokeCol, lightSmokeCol, uTheme);

  vec3 dustCol = mix(vec3(0.62, 0.80, 1.00), cobalt, uTheme);

  float totalAlpha = clamp(fogAlpha + dustAlpha, 0.0, 0.48);
  float dustMix = dustAlpha / max(fogAlpha + dustAlpha, 0.0001);
  vec3 finalCol = mix(smokeCol, dustCol, clamp(dustMix * 1.35, 0.0, 1.0));

  // Premultiplied alpha
  gl_FragColor = vec4(finalCol * totalAlpha, totalAlpha);
}
`;

// ══════════════════════════════════════════════════════════════════════════
// PASS 2: 3D WAVE DOT SPHERE (#0d4bfa COBALT PALETTE)
// ══════════════════════════════════════════════════════════════════════════
const ORB_VERT = /* glsl */ `
precision highp float;

attribute vec3 aPos;
attribute float aShell;

uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform float uBurst;
uniform vec2 uRot;
uniform float uAspect;
uniform float uScale;
uniform float uPx;
uniform vec2 uPointer;
uniform float uPointerOn;
uniform float uCenterY;

varying float vLight;
varying float vCrest;
varying float vAlpha;
varying float vHeat;

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
  vec3 n0 = normalize(aPos);
  float baseRadius = length(aPos);

  float t = uTime * 0.25;

  float twist = n0.y * 1.48 + sin(t * 0.55) * 0.30 + t * 0.16;
  float ctw = cos(twist);
  float stw = sin(twist);
  vec3 q = vec3(ctw * n0.x + stw * n0.z, n0.y, -stw * n0.x + ctw * n0.z);

  vec3 flow1 = vec3(t * 0.48, -t * 0.36, t * 0.42);
  vec3 flow2 = vec3(-t * 0.34, t * 0.44, -t * 0.28);

  vec3 warp = vec3(
    snoise(q * (uFreq * 0.95) + flow1),
    snoise(q * (uFreq * 0.95) + flow1 + vec3(3.7, 1.9, 5.1)),
    snoise(q * (uFreq * 0.95) + flow1 + vec3(7.3, 4.2, 2.8))
  );

  float macroWave = sin(q.x * 2.6 + t * 1.25) * cos(q.y * 2.4 - t * 0.95) * sin(q.z * 2.6 + t * 0.90);
  vec3 samplePos = q * (uFreq * 1.24) + warp * 0.68 + flow2 + vec3(aShell * 0.42);
  float n1 = snoise(samplePos);
  float n2 = snoise(samplePos * 1.85 - flow1 * 0.75 + vec3(0.0, aShell * 0.65, 1.4));

  float ridge = 1.0 - abs(n1);
  ridge = ridge * ridge;

  float shellScale = 1.0 - aShell * 0.10;
  float amp = (uAmp + uBurst * 0.06) * shellScale;

  float radialWave = (n1 * 0.74 + (ridge - 0.48) * 0.68 + macroWave * 0.45 + n2 * 0.25) * amp;
  vec3 tangentWarp = warp - n0 * dot(warp, n0);

  vec3 displaced = n0 * (baseRadius * (1.0 + radialWave * 0.80)) + tangentWarp * (amp * 0.44);
  displaced *= 1.0 + (0.014 + uBurst * 0.007) * sin(uTime * 0.55 + n1 * 2.4);

  float cx = cos(uRot.x), sx = sin(uRot.x);
  float cy = cos(uRot.y), sy = sin(uRot.y);

  vec3 pos = vec3(cy * displaced.x + sy * displaced.z, displaced.y, -sy * displaced.x + cy * displaced.z);
  pos = vec3(pos.x, cx * pos.y - sx * pos.z, sx * pos.y + cx * pos.z);

  vec3 warpedNormal = normalize(n0 - tangentWarp * (amp * 1.55) + warp * (amp * 0.60));
  vec3 rotN = vec3(cy * warpedNormal.x + sy * warpedNormal.z, warpedNormal.y, -sy * warpedNormal.x + cy * warpedNormal.z);
  rotN = normalize(vec3(rotN.x, cx * rotN.y - sx * rotN.z, sx * rotN.y + cx * rotN.z));

  vec3 geomN = normalize(pos);
  float facing = geomN.z;
  float k = 1.0 / (1.0 - pos.z * 0.22);

  vec2 centerOffsetNDC = vec2(0.0, uCenterY);
  vec2 ndc = pos.xy * k * uScale * vec2(1.0 / uAspect, 1.0) + centerOffsetNDC;

  vec2 dd = (ndc - uPointer) * vec2(uAspect, 1.0);
  float spot = exp(-dot(dd, dd) * 6.5) * uPointerOn;
  vec2 dir = normalize(dd + vec2(0.0001));
  ndc += dir * (0.005 * spot) * vec2(1.0 / uAspect, 1.0);

  vec3 lightDir = normalize(vec3(-0.38, 0.68, 0.62));
  vec3 fillDir = normalize(vec3(0.45, -0.55, 0.70));
  float diff = clamp(dot(rotN, lightDir) * 0.5 + 0.5, 0.0, 1.0);
  float fill = clamp(dot(rotN, fillDir) * 0.5 + 0.5, 0.0, 1.0);
  float rim = pow(1.0 - clamp(facing, 0.0, 1.0), 2.2);

  float heightNorm = clamp(radialWave / max(0.001, amp) * 0.5 + 0.5, 0.0, 1.0);
  vCrest = clamp(pow(ridge, 1.4) * 0.68 + pow(heightNorm, 1.5) * 0.50 + rim * 0.26 + spot * 0.25 + uBurst * 0.08, 0.0, 1.0);
  vLight = clamp(diff * 0.55 + heightNorm * 0.44 + fill * 0.14 + spot * 0.20 + uBurst * 0.06, 0.0, 1.0);

  float frontMask = smoothstep(-0.65, 0.28, facing);
  vAlpha = mix(0.18, 0.94, frontMask) * (1.0 - aShell * 0.14);
  vHeat = clamp(spot * 0.65 + uBurst * 0.12, 0.0, 1.0);

  float size = uPx * (0.92 - aShell * 0.10) * (1.0 + spot * 0.38 + vCrest * 0.24 + uBurst * 0.16) * (0.64 + 0.60 * frontMask) * k;
  gl_PointSize = clamp(size, uPx * 0.45, uPx * 2.65);
  gl_Position = vec4(ndc, -pos.z * 0.15, 1.0);
}
`;

const ORB_FRAG = /* glsl */ `
precision mediump float;

uniform float uTheme;

varying float vLight;
varying float vCrest;
varying float vAlpha;
varying float vHeat;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c);
  if (r > 0.5) discard;

  float edge = smoothstep(0.5, 0.08, r);

  // #0d4bfa cobalt spectrum
  vec3 deepDark  = vec3(0.015, 0.055, 0.26);
  vec3 deepLight = vec3(0.24, 0.45, 0.98);
  vec3 deepBlue  = mix(deepDark, deepLight, uTheme);

  vec3 coreBlue  = vec3(0.051, 0.294, 0.980); // #0d4bfa
  vec3 softBlue  = vec3(0.34, 0.58, 1.00);
  vec3 crestHi   = mix(vec3(0.84, 0.92, 1.00), vec3(0.03, 0.22, 0.92), uTheme * 0.65);

  vec3 col = mix(deepBlue, coreBlue, smoothstep(0.10, 0.50, vLight));
  col = mix(col, softBlue, smoothstep(0.48, 0.84, vLight));
  col = mix(col, crestHi, smoothstep(0.52, 0.96, vCrest));

  vec3 spotGlow = mix(vec3(0.92, 0.96, 1.0), vec3(0.12, 0.38, 1.0), uTheme * 0.5);
  col = mix(col, spotGlow, clamp(vHeat * 0.55, 0.0, 1.0));

  float themeAlpha = mix(1.0, 0.84, uTheme);
  float a = clamp(edge * vAlpha * themeAlpha, 0.0, 1.0);
  gl_FragColor = vec4(col * a, a);
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

function createProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string,
) {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSource);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("[VoiceOrb] link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export function VoiceOrb({
  tone,
  mode = DEFAULT_MODE,
  color = "#0d4bfa",
  fog = 0.85,
  dust = 0.40,
  dots = 0.14,
  className,
}: VoiceOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<OrbMode>(mode);
  const burstRef = useRef<number>(0);
  const isFirstRender = useRef<boolean>(true);
  const toneRef = useRef<"light" | "dark" | undefined>(tone);
  const amountsRef = useRef({ fog, dust, dots });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    modeRef.current = mode;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    burstRef.current = 0.24;
  }, [mode.amp, mode.freq, mode.speed]);

  useEffect(() => {
    toneRef.current = tone;
  }, [tone]);

  useEffect(() => {
    amountsRef.current = { fog, dust, dots };
  }, [fog, dust, dots]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });
    if (!gl) {
      setFallback(true);
      return;
    }

    const atmosProg = createProgram(gl, ATMOS_VERT, ATMOS_FRAG);
    const orbProg = createProgram(gl, ORB_VERT, ORB_FRAG);
    if (!atmosProg || !orbProg) {
      setFallback(true);
      return;
    }

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aQuadPos = gl.getAttribLocation(atmosProg, "aPosition");

    const small = window.matchMedia("(max-width: 767px)").matches;
    const baseSize = small ? 2.1 : 1.95;

    const SHELLS = small
      ? [
          { r: 0.78, rings: 40, eqDots: 80, s: 2 },
          { r: 0.89, rings: 54, eqDots: 108, s: 1 },
          { r: 1.0, rings: 74, eqDots: 148, s: 0 },
        ]
      : [
          { r: 0.78, rings: 52, eqDots: 104, s: 2 },
          { r: 0.89, rings: 76, eqDots: 152, s: 1 },
          { r: 1.0, rings: 112, eqDots: 224, s: 0 },
        ];

    const tempPos: number[] = [];
    const tempShell: number[] = [];

    SHELLS.forEach((shell) => {
      for (let lat = 1; lat < shell.rings; lat++) {
        const phi = (Math.PI * lat) / shell.rings;
        const y = Math.cos(phi);
        const sinPhi = Math.sin(phi);
        const dotsInRing = Math.max(8, Math.round(shell.eqDots * sinPhi));
        const ringTwist = lat * 0.13 + shell.s * 0.7;

        for (let lon = 0; lon < dotsInRing; lon++) {
          const theta = (2 * Math.PI * lon) / dotsInRing + ringTwist;
          const x = Math.cos(theta) * sinPhi;
          const z = Math.sin(theta) * sinPhi;

          tempPos.push(x * shell.r, y * shell.r, z * shell.r);
          tempShell.push(shell.s);
        }
      }
    });

    const orbCount = tempShell.length;
    const orbPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, orbPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempPos), gl.STATIC_DRAW);
    const aOrbPos = gl.getAttribLocation(orbProg, "aPos");

    const orbShellBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, orbShellBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempShell), gl.STATIC_DRAW);
    const aOrbShell = gl.getAttribLocation(orbProg, "aShell");

    const uAtmos = {
      res: gl.getUniformLocation(atmosProg, "uResolution"),
      dpr: gl.getUniformLocation(atmosProg, "uDpr"),
      scale: gl.getUniformLocation(atmosProg, "uScale"),
      time: gl.getUniformLocation(atmosProg, "uTime"),
      burst: gl.getUniformLocation(atmosProg, "uBurst"),
      lens: gl.getUniformLocation(atmosProg, "uLens"),
      amount: gl.getUniformLocation(atmosProg, "uAmount"),
      theme: gl.getUniformLocation(atmosProg, "uTheme"),
    };

    const uOrb = {
      time: gl.getUniformLocation(orbProg, "uTime"),
      amp: gl.getUniformLocation(orbProg, "uAmp"),
      freq: gl.getUniformLocation(orbProg, "uFreq"),
      burst: gl.getUniformLocation(orbProg, "uBurst"),
      rot: gl.getUniformLocation(orbProg, "uRot"),
      aspect: gl.getUniformLocation(orbProg, "uAspect"),
      scale: gl.getUniformLocation(orbProg, "uScale"),
      px: gl.getUniformLocation(orbProg, "uPx"),
      pointer: gl.getUniformLocation(orbProg, "uPointer"),
      pointerOn: gl.getUniformLocation(orbProg, "uPointerOn"),
      centerY: gl.getUniformLocation(orbProg, "uCenterY"),
      theme: gl.getUniformLocation(orbProg, "uTheme"),
    };

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const cur = { ...modeRef.current };
    const pointer = {
      x: 0,
      y: 0,
      nx: 0,
      ny: 0,
      tx: 0,
      ty: 0,
      inside: false,
      on: 0,
    };
    const lens = { x: 0, y: 0, strength: 0, placed: false };

    let cssW = 1;
    let cssH = 1;
    let dpr = 1;
    let time = 0;
    let spin = 0;
    let rotX = 0.22;
    let rotY = 0;
    let raf = 0;
    let last = performance.now();
    let inView = true;
    const reducedMotionMedia = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reduceMotion = reducedMotionMedia.matches;

    const update = (dt: number) => {
      const m = modeRef.current;
      const ease = 1 - Math.exp(-dt * 2.6);
      const pulse =
        1 + 0.08 * Math.sin(time * 0.55) + 0.04 * Math.cos(time * 0.28 + 1.1);

      cur.amp += (m.amp * pulse - cur.amp) * ease;
      cur.freq += (m.freq - cur.freq) * ease;
      cur.speed += (m.speed - cur.speed) * ease;

      const burst = burstRef.current;
      burstRef.current *= Math.exp(-dt * 2.1);
      if (burstRef.current < 0.001) burstRef.current = 0;

      time += dt * (cur.speed + burst * 0.12);
      spin += dt * (0.058 * cur.speed + burst * 0.045);

      if (pointer.inside && !lens.placed) {
        lens.x = pointer.x;
        lens.y = pointer.y;
        lens.placed = true;
      }
      const lensFollow = 1 - Math.exp(-dt * 7.5);
      lens.x += (pointer.x - lens.x) * lensFollow;
      lens.y += (pointer.y - lens.y) * lensFollow;

      const goal = pointer.inside ? 0.28 : 0;
      lens.strength +=
        (goal - lens.strength) *
        (1 - Math.exp(-dt / (goal > lens.strength ? 0.22 : 0.48)));
      if (lens.strength < 0.001 && !pointer.inside) lens.placed = false;

      const follow = 1 - Math.exp(-dt * 4.5);
      pointer.nx += (pointer.tx - pointer.nx) * follow;
      pointer.ny += (pointer.ty - pointer.ny) * follow;
      pointer.on +=
        ((pointer.inside ? 1 : 0) - pointer.on) * (1 - Math.exp(-dt * 3.8));

      const wanderX = Math.sin(time * 0.14) * 0.05;
      const wanderY = Math.cos(time * 0.1 + 1.5) * 0.065;
      rotX = 0.22 - pointer.ny * 0.10 + wanderX;
      rotY = spin + pointer.nx * 0.15 + wanderY;
    };

    const render = () => {
      const isMobile = cssW < 768;
      const scale = Math.max(0.25, Math.min(cssW / 585, cssH / 507));
      const isLight = toneRef.current === "light" ? 1 : 0;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(atmosProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(aQuadPos);
      gl.vertexAttribPointer(aQuadPos, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uAtmos.res, cssW, cssH);
      gl.uniform1f(uAtmos.dpr, dpr);
      gl.uniform1f(uAtmos.scale, scale);
      gl.uniform1f(uAtmos.time, time);
      gl.uniform1f(uAtmos.burst, burstRef.current);
      gl.uniform4f(uAtmos.lens, lens.x, lens.y, 130 * scale, lens.strength);
      const amounts = amountsRef.current;
      gl.uniform3f(uAtmos.amount, amounts.fog, amounts.dust, amounts.dots);
      gl.uniform1f(uAtmos.theme, isLight);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.disableVertexAttribArray(aQuadPos);

      gl.useProgram(orbProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, orbPosBuffer);
      gl.enableVertexAttribArray(aOrbPos);
      gl.vertexAttribPointer(aOrbPos, 3, gl.FLOAT, false, 0, 0);

      if (aOrbShell >= 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, orbShellBuffer);
        gl.enableVertexAttribArray(aOrbShell);
        gl.vertexAttribPointer(aOrbShell, 1, gl.FLOAT, false, 0, 0);
      }

      gl.uniform1f(uOrb.time, time);
      gl.uniform1f(uOrb.amp, cur.amp);
      gl.uniform1f(uOrb.freq, cur.freq);
      gl.uniform1f(uOrb.burst, burstRef.current);
      gl.uniform2f(uOrb.rot, rotX, rotY);
      gl.uniform1f(uOrb.aspect, cssW / cssH);
      gl.uniform1f(uOrb.scale, isMobile ? 0.72 : 0.53);
      gl.uniform1f(uOrb.px, baseSize * dpr);
      gl.uniform2f(uOrb.pointer, pointer.nx, pointer.ny);
      gl.uniform1f(uOrb.pointerOn, pointer.on);
      gl.uniform1f(uOrb.centerY, isMobile ? 0.14 : 0.12);
      gl.uniform1f(uOrb.theme, isLight);

      gl.drawArrays(gl.POINTS, 0, orbCount);
      gl.disableVertexAttribArray(aOrbPos);
      if (aOrbShell >= 0) gl.disableVertexAttribArray(aOrbShell);
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
      cssW = Math.max(1, rect.width);
      cssH = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, cssW < 768 ? 1.25 : 1.5);
      const w = Math.max(1, Math.round(cssW * dpr));
      const h = Math.max(1, Math.round(cssH * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      dpr = w / cssW;
      gl.viewport(0, 0, w, h);
      render();
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      pointer.x = x;
      pointer.y = y;
      const nx = (x / r.width) * 2 - 1;
      const ny = -((y / r.height) * 2 - 1);

      pointer.inside =
        e.pointerType !== "touch" &&
        x >= 0 && x <= r.width && y >= 0 && y <= r.height;
      pointer.tx = clamp(nx, -1, 1);
      pointer.ty = clamp(ny, -1, 1);
    };

    const onLeave = () => {
      pointer.inside = false;
      pointer.tx = 0;
      pointer.ty = 0;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };

    const onReducedMotionChange = () => {
      reduceMotion = reducedMotionMedia.matches;
      if (reduceMotion) {
        stop();
        render();
      } else if (inView && !document.hidden) start();
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

    reducedMotionMedia.addEventListener("change", onReducedMotionChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    start();

    return () => {
      stop();
      reducedMotionMedia.removeEventListener("change", onReducedMotionChange);
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(quadBuffer);
      gl.deleteBuffer(orbPosBuffer);
      gl.deleteBuffer(orbShellBuffer);
      gl.deleteProgram(atmosProg);
      gl.deleteProgram(orbProg);
    };
  }, [color]);

  if (fallback) {
    return (
      <div
        aria-hidden
        className={className}
        style={{
          background:
            "radial-gradient(closest-side, rgba(13,75,250,0.42), rgba(13,75,250,0.12) 60%, transparent 75%)",
        }}
      />
    );
  }

  return (
    <span
      className={className}
      style={{ position: "relative", display: "block" }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </span>
  );
}