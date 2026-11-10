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

// ── LaserFlow Renk & Tint Sistemi (#f43f5e tabanlı) ───────────────────────
const TINTS: [number, number][] = [
  [0, 1],
  [-11.5, 0.77],
  [9.5, 0.95],
  [-53.5, 0.79],
  [39.5, 0.77],
  [16, 0.81],
  [-16.3, 0.92],
  [13.3, 0.96],
  [3, 1.01],
  [1, 0.68],
  [1, 1.15],
  [142.5, 0.51],
  [113.6, 0.28],
  [-7.5, 0.13],
  [-2.7, 0.32],
  [7.5, 0.81],
];

const BASE_SATURATION = 0.78;

// The tint palette now follows the `color` prop instead of always using rose.
// A safe rose fallback is used for unsupported CSS color formats.
const hexToRgb = (value: string): [number, number, number] => {
  const raw = value.trim().replace(/^#/, "");
  const hex = /^[0-9a-f]{3}$/i.test(raw)
    ? raw.split("").map((ch) => ch + ch).join("")
    : raw;
  if (!/^[0-9a-f]{6}$/i.test(hex)) return [0.957, 0.247, 0.369];
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ];
};
const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const toHsv = ([r, g, b]: number[]): [number, number] => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let hue = 0;
  if (delta > 0) {
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
  }
  return [(hue * 60 + 360) % 360, max > 0 ? delta / max : 0];
};

const fromHsv = (hue: number, saturation: number): number[] => {
  const h = (((hue % 360) + 360) % 360) / 60;
  const c = saturation;
  const x = c * (1 - Math.abs((h % 2) - 1));
  const m = 1 - c;
  const [r, g, b] =
    h < 1
      ? [c, x, 0]
      : h < 2
        ? [x, c, 0]
        : h < 3
          ? [0, c, x]
          : h < 4
            ? [0, x, c]
            : h < 5
              ? [x, 0, c]
              : [c, 0, x];
  return [r + m, g + m, b + m];
};

const buildTints = (rgb: number[]) => {
  const [hue, saturation] = toHsv(rgb);
  const strength = saturation / BASE_SATURATION;
  const data = new Float32Array(TINTS.length * 3);
  TINTS.forEach(([shift, scale], index) => {
    data.set(
      fromHsv(hue + shift, clamp(BASE_SATURATION * scale * strength, 0, 1)),
      index * 3,
    );
  });
  return data;
};

// ══════════════════════════════════════════════════════════════════════════
// PASS 1: LASERFLOW YOĞUN DUMAN, DOT-GRID, SPOTLIGHT HOVER VE TAB TOZLARI
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
uniform float uSpin;
uniform float uAmp;
uniform float uBurst; // Tab değiştiğinde oluşan canlanma dalgası
uniform vec4 uLens;   // LaserFlow Spotlight (x, y, radius, strength)
uniform vec3 uAmount; // x: fog, y: dust, z: dots
uniform float uTheme; // 0: dark, 1: light
uniform vec3 uTint[16];

#define BEAM uTint[0]
#define LEFT uTint[1]
#define RIGHT uTint[2]
#define PINK uTint[4]
#define WARM uTint[11]
#define EMBER uTint[12]
#define WHITE uTint[13]
#define HAZE uTint[14]

float sq(float x) { return x * x; }

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
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

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uResolution.y * uDpr - gl_FragCoord.y) / uDpr;
  vec2 uv = frag / uResolution;

  bool isMobile = uResolution.x < 768.0;
  vec2 center = vec2(uResolution.x * 0.5, uResolution.y * (isMobile ? 0.43 : 0.44));
  float orbRadius = min(uResolution.x, uResolution.y) * (isMobile ? 0.36 : 0.265);

  vec2 dVec = frag - center;
  vec2 p = dVec / orbRadius; // r = 1.0 küre çeperi, r = 1.6..2.2 sol tabların olduğu alan
  float r = length(p);
  float angle = atan(p.y, p.x);

  float t = uTime;

  // Kürenin dalgalı sınırı
  float waveRim = 0.09 * sin(angle * 3.0 - uSpin * 1.4 + t * 0.55)
                + 0.06 * cos(angle * 5.0 + uSpin * 0.9 - t * 0.45);
  float surfaceR = 0.92 + waveRim * (0.75 + uAmp + uBurst * 0.35);
  float distFromRim = r - surfaceR;

  // ── KÖŞE MASKESİ: Tablara kadar uzanır, sadece en dış 4 köşede azalır ───
  vec2 cUv = (uv - 0.5) * 2.0; // -1..1
  float cornerDist = length(cUv * vec2(0.92, 0.96));
  float cornerMask = 1.0 - smoothstep(0.88, 1.36, cornerDist);
  float topEdgeMask = smoothstep(0.0, 0.07, uv.y);
  // Alt metinlerin okunaklı kalması için hafif yumuşatma (tamamen yok etmez)
  float bottomTextMask = 1.0 - 0.42 * smoothstep(0.68, 0.94, uv.y);

  float zoneMask = cornerMask * topEdgeMask * bottomTextMask;

  // ── LASERFLOW SPOTLIGHT HOVER MERCEĞİ ───────────────────────────────────
  vec2 toLens = frag - uLens.xy;
  float lensCore = exp(-dot(toLens, toLens) / sq(uLens.z * 0.95)) * uLens.w;
  float lensWide = exp(-dot(toLens, toLens) / sq(uLens.z * 1.95)) * uLens.w;

  // Tab değiştiğinde merkezden dışarı (sekmelere doğru) yayılan enerji halkası
  float burstRadius = 0.85 + (1.0 - uBurst) * 1.45;
  float burstWave = exp(-sq((r - burstRadius) / 0.34)) * uBurst;

  vec3 col = vec3(0.0);

  // ── 1. YOĞUN FBM DUMAN / SMOKE (Tablara Kadar Süzülür) ──────────────────
  float fogAmount = uAmount.x;
  float innerClear = smoothstep(0.22, 0.82, r);
  // 0.78 çarpanı sayesinde duman r = 2.2 (sol tablar) mesafesine kadar ulaşır
  float outerFalloff = exp(-pow(max(r - 0.82, 0.0) * 1.25, 1.45));
  float rimBoost = exp(-sq(distFromRim / 0.34));

  // Spotlight tutulan yerde duman ekstra görünür olur
  float envelope = clamp(innerClear * outerFalloff + lensWide * 0.18 + burstWave * 0.14, 0.0, 1.0) * zoneMask;

  if (fogAmount > 0.001 && envelope > 0.002) {
    float cs = cos(-uSpin * 0.30);
    float sn = sin(-uSpin * 0.30);
    vec2 rotP = vec2(cs * p.x - sn * p.y, sn * p.x + cs * p.y);

    vec2 fq = rotP * 1.12 - normalize(p + vec2(0.0001)) * (t * 0.030) + vec2(t * 0.009, -t * 0.015);
    vec2 fw = vec2(
      fbm(fq * 1.35 + vec2(1.7, 9.2) + t * 0.015),
      fbm(fq * 1.35 + vec2(8.3, 2.8) - t * 0.013)
    );
    float cloud = fbm(fq + 1.45 * fw);

    float density = smoothstep(0.30, 0.76, cloud);
    float smoke = smoothstep(0.20, 0.72, cloud);

    vec3 sideK = mix(LEFT, RIGHT, smoothstep(-1.2, 1.2, p.x));
    vec3 fog = (HAZE * 0.32 + BEAM * (1.10 * rimBoost + 0.60 + burstWave * 0.40)) * density * envelope;
    fog += sideK * 0.70 * (rimBoost + 0.35 * outerFalloff) * smoke * envelope;
    fog += EMBER * 0.14 * smoke * (rimBoost + burstWave) * envelope;

    // Spotlight Hover vurgu ışığı: Mouse'un gezdiği yerde duman fener tutulmuş gibi parlar
    fog += mix(BEAM, WHITE, 0.25) * (0.20 + 0.45 * smoke) * lensWide * 0.75;

    col += fog * fogAmount * (1.0 + 0.15 * lensCore + 0.08 * uBurst);
  }

  // ── 2. LASERFLOW DOT-GRID (Nokta Matrisi Dokusu + Spotlight Vurgusu) ────
  float haze = max(col.r, max(col.g, col.b));
  float dotGrid = 1.0 - smoothstep(0.15, 0.33, length(fract(frag / 3.0) - 0.5));
  col += mix(BEAM, WHITE, 0.25 * lensCore)
       * dotGrid
       * clamp(haze * 1.45 + lensWide * 0.65, 0.0, 1.8)
       * (0.32 + 0.95 * lensCore + 0.35 * burstWave)
       * uAmount.z
       * zoneMask;

  // ── 3. YOĞUN TOZ VE KIVILCIMLAR (Sekmelere Kadar Uzanır + Hover Spark) ──
  float dustAmount = uAmount.y;
  if (dustAmount > 0.001 && zoneMask > 0.01) {
    // A) Küreden dışarı ve sol tablara doğru savrulan ana toz akışı (flowCell)
    float normAngle = (angle + 3.14159265) / 6.2831853;
    float radialStream = log(max(r, 0.30) / 0.75) * 2.20;
    vec2 flowCell = vec2(radialStream - t * 0.09, (normAngle - uSpin * 0.05) * 34.0);
    vec2 cellId = floor(flowCell);
    vec2 cellJitter = vec2(hash(cellId + 1.7), hash(cellId + 8.3));
    vec2 cellLocal = fract(flowCell) - (0.15 + cellJitter * 0.7);
    float particleDist = length(cellLocal * vec2(13.5, 9.0));
    float particleOn = step(0.56, hash(cellId + 3.1));
    float particleTwinkle = 0.5 + 0.5 * sin(t * 1.7 + hash(cellId + 9.2) * 6.283);

    // r = 0.75'ten r = 2.35'e (sol tabların üstüne kadar) yayılan geniş toz kuşağı
    float dustRingZone = exp(-pow(max(r - 0.92, 0.0) * 1.45, 1.5)) * smoothstep(0.48, 0.85, r) * zoneMask;
    dustRingZone = clamp(dustRingZone + burstWave * 0.12 + lensWide * 0.18, 0.0, 1.0);

    col += mix(WHITE, WARM, 0.25)
         * exp(-particleDist * particleDist / 0.44)
         * particleOn * particleTwinkle * dustRingZone * 1.15 * dustAmount;

    // B) Geniş alanda yukarı süzülen parlak toz zerrecikleri (glitterCell - Tabları da kapsar)
    vec2 localPx = dVec / uScale;
    vec2 glitterCoord = vec2(localPx.x / 3.8, (localPx.y + t * 6.5) / 9.0);
    vec2 glitterId = floor(glitterCoord);
    vec2 glitterJitter = vec2(hash(glitterId + 4.4), hash(glitterId + 2.9));
    vec2 glitterPos = (glitterId + 0.15 + glitterJitter * 0.7) * vec2(3.8, 9.0);
    float glitterDist = length(vec2(localPx.x, localPx.y + t * 6.5) - glitterPos);
    float glitterOn = step(0.66, hash(glitterId + 6.6));
    float glitterTwinkle = 0.5 + 0.5 * sin(t * 1.8 + hash(glitterId + 1.1) * 6.283);

    float glitterZone = exp(-pow(max(r - 0.80, 0.0) * 1.40, 1.45)) * smoothstep(0.35, 0.80, r) * zoneMask;
    col += WHITE * exp(-glitterDist * glitterDist / 0.38) * glitterOn * glitterTwinkle * (glitterZone + lensWide * 0.15) * 0.85 * dustAmount;

    // C) LaserFlow Spotlight Kıvılcımları (Mouse ile nereye gidilirse orada parlayan tozlar)
    if (lensWide > 0.002) {
      vec2 drift = frag + vec2(0.0, t * 5.0);
      vec2 sparkCell = floor(drift / 6.5);
      vec2 sparkPos = (sparkCell + 0.2 + 0.6 * vec2(hash(sparkCell + 5.1), hash(sparkCell + 2.3))) * 6.5;
      float sparkDist = length(drift - sparkPos);
      float sparkOn = step(0.70, hash(sparkCell + 8.8));
      float sparkTwinkle = 0.5 + 0.5 * sin(t * 2.0 + hash(sparkCell + 3.7) * 6.283);
      col += mix(WHITE, PINK, 0.25)
           * exp(-sparkDist * sparkDist / 0.42)
           * sparkOn * sparkTwinkle * lensWide * 0.65 * dustAmount * cornerMask;
    }
  }

  vec3 emit = 1.0 - exp(-col * mix(1.02, 0.70, uTheme));
  float peak = max(emit.r, max(emit.g, emit.b));

  if (uTheme > 0.5) {
    float low = min(emit.r, min(emit.g, emit.b));
    float chroma = peak - low;
    vec3 hue = (emit - low) / max(chroma, 0.0001);
    float alpha = clamp(pow(chroma, 1.18) * 1.35, 0.0, 1.0) * 0.88;
    gl_FragColor = vec4((hue * 0.84 + 0.05) * alpha, alpha);
  } else {
    gl_FragColor = vec4(emit, peak);
  }
}
`;

// ══════════════════════════════════════════════════════════════════════════
// PASS 2: 3B DALGALI NOKTA KÜRE (SPOTLIGHT HOVER VE TAB CANLANMA DESTEKLİ)
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
  // Tab değiştiğinde (uBurst) dalgalar ekstra kabarır ve canlanır
  float amp = (uAmp + uBurst * 0.07) * shellScale;

  float radialWave = (n1 * 0.74 + (ridge - 0.48) * 0.68 + macroWave * 0.45 + n2 * 0.25) * amp;
  vec3 tangentWarp = warp - n0 * dot(warp, n0);

  vec3 displaced = n0 * (baseRadius * (1.0 + radialWave * 0.80)) + tangentWarp * (amp * 0.44);
  displaced *= 1.0 + (0.014 + uBurst * 0.008) * sin(uTime * 0.55 + n1 * 2.4);

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

  // Spotlight Hover etkileşimi: Küre üzerindeki noktalar mercek altında aydınlanır ve dalgalanır
  vec2 dd = (ndc - uPointer) * vec2(uAspect, 1.0);
  float f = exp(-dot(dd, dd) * 5.8) * uPointerOn;
  vec2 dir = normalize(dd + vec2(0.0001));
  vec2 perp = vec2(-dir.y, dir.x);
  ndc += (perp * 0.018 + dir * 0.009) * f * vec2(1.0 / uAspect, 1.0);

  vec3 lightDir = normalize(vec3(-0.38, 0.68, 0.62));
  vec3 fillDir = normalize(vec3(0.45, -0.55, 0.70));
  float diff = clamp(dot(rotN, lightDir) * 0.5 + 0.5, 0.0, 1.0);
  float fill = clamp(dot(rotN, fillDir) * 0.5 + 0.5, 0.0, 1.0);
  float rim = pow(1.0 - clamp(facing, 0.0, 1.0), 2.2);

  float heightNorm = clamp(radialWave / max(0.001, amp) * 0.5 + 0.5, 0.0, 1.0);
  vCrest = clamp(pow(ridge, 1.4) * 0.72 + pow(heightNorm, 1.5) * 0.55 + rim * 0.30 + f * 0.22 + uBurst * 0.08, 0.0, 1.0);
  vLight = clamp(diff * 0.56 + heightNorm * 0.46 + fill * 0.14 + f * 0.16 + uBurst * 0.06, 0.0, 1.0);

  float frontMask = smoothstep(-0.65, 0.28, facing);
  vAlpha = mix(0.22, 0.98, frontMask) * (1.0 - aShell * 0.12);
  vHeat = clamp(f * 0.50 + uBurst * 0.10, 0.0, 1.0);

  float size = uPx * (0.94 - aShell * 0.10) * (1.0 + f * 1.15 + vCrest * 0.30 + uBurst * 0.22) * (0.62 + 0.65 * frontMask) * k;
  gl_PointSize = clamp(size, uPx * 0.45, uPx * 3.3);
  gl_Position = vec4(ndc, -pos.z * 0.15, 1.0);
}
`;

const ORB_FRAG = /* glsl */ `
precision mediump float;

varying float vLight;
varying float vCrest;
varying float vAlpha;
varying float vHeat;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c);
  if (r > 0.5) discard;

  float edge = smoothstep(0.5, 0.12, r);

  vec3 deepRose = vec3(0.20, 0.015, 0.065);  // #330410 - Derin dalga çukuru
  vec3 coreRose = vec3(0.957, 0.247, 0.369); // #f43f5e - Ana sabit renk
  vec3 softRose = vec3(0.988, 0.451, 0.533); // #fb7185 - Dalga gövdesi
  vec3 crestHi  = vec3(1.00, 0.92, 0.95);    // #ffebf2 - Parlak dalga sırtı

  vec3 col = mix(deepRose, coreRose, smoothstep(0.10, 0.48, vLight));
  col = mix(col, softRose, smoothstep(0.46, 0.82, vLight));
  col = mix(col, crestHi, smoothstep(0.50, 0.95, vCrest));

  // Spotlight Hover ve Tab geçişinde sıcak gül-beyaz parlama
  col = mix(col, vec3(1.0, 0.96, 0.97), clamp(vHeat * 0.55, 0.0, 1.0));

  float a = clamp(edge * vAlpha, 0.0, 1.0);
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
  color = "#f43f5e",
  fog = 0.46,
  dust = 0.25,
  dots = 0,
  className,
}: VoiceOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<OrbMode>(mode);
  const burstRef = useRef<number>(0);
  const isFirstRender = useRef<boolean>(true);
  const toneRef = useRef<"light" | "dark" | undefined>(tone);
  const amountsRef = useRef({ fog, dust, dots });
  const [fallback, setFallback] = useState(false);

  // Sekme (tab) tıklandığında ve mode değiştiğinde küreyi canlandır (burst)
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

  // Updating atmosphere intensity must not recreate GPU buffers or programs.
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
    const baseSize = small ? 2.15 : 2.0;

    const SHELLS = small
      ? [
          { r: 0.78, rings: 40, eqDots: 80, s: 2 },
          { r: 0.89, rings: 54, eqDots: 108, s: 1 },
          { r: 1.00, rings: 74, eqDots: 148, s: 0 },
        ]
      : [
          { r: 0.78, rings: 52, eqDots: 104, s: 2 },
          { r: 0.89, rings: 76, eqDots: 152, s: 1 },
          { r: 1.00, rings: 112, eqDots: 224, s: 0 },
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
      spin: gl.getUniformLocation(atmosProg, "uSpin"),
      amp: gl.getUniformLocation(atmosProg, "uAmp"),
      burst: gl.getUniformLocation(atmosProg, "uBurst"),
      lens: gl.getUniformLocation(atmosProg, "uLens"),
      amount: gl.getUniformLocation(atmosProg, "uAmount"),
      theme: gl.getUniformLocation(atmosProg, "uTheme"),
      tint: gl.getUniformLocation(atmosProg, "uTint"),
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
    };

    const tints = buildTints(hexToRgb(color));

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
    const lens = { x: 0, y: 0, vx: 0, vy: 0, strength: 0, placed: false };

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
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = reducedMotionMedia.matches;

    const update = (dt: number) => {
      const m = modeRef.current;
      const ease = 1 - Math.exp(-dt * 2.6);
      const pulse =
        1 + 0.08 * Math.sin(time * 0.55) + 0.04 * Math.cos(time * 0.28 + 1.1);

      cur.amp += (m.amp * pulse - cur.amp) * ease;
      cur.freq += (m.freq - cur.freq) * ease;
      cur.speed += (m.speed - cur.speed) * ease;

      // Tab değiştiğinde tetiklenen canlanma (burst) sönümlenmesi
      const burst = burstRef.current;
      burstRef.current *= Math.exp(-dt * 2.1);
      if (burstRef.current < 0.001) burstRef.current = 0;

      // Burst anında zaman ve dönüş hızı tatlı bir ivme kazanır
      time += dt * (cur.speed + burst * 0.12);
      spin += dt * (0.058 * cur.speed + burst * 0.045);

      // LaserFlow Spotlight yay fiziği (Spring Lens)
      if (pointer.inside && !lens.placed) {
        lens.x = pointer.x;
        lens.y = pointer.y;
        lens.vx = 0;
        lens.vy = 0;
        lens.placed = true;
      }
      const ax = 120 * (pointer.x - lens.x) - 19 * lens.vx;
      const ay = 120 * (pointer.y - lens.y) - 19 * lens.vy;
      lens.vx += ax * dt;
      lens.vy += ay * dt;
      lens.x += lens.vx * dt;
      lens.y += lens.vy * dt;
      const goal = pointer.inside ? 0.40 : 0;
      lens.strength +=
        (goal - lens.strength) *
        (1 - Math.exp(-dt / (goal > lens.strength ? 0.25 : 0.55)));
      if (lens.strength < 0.001 && !pointer.inside) lens.placed = false;

      const follow = 1 - Math.exp(-dt * 4.2);
      pointer.nx += (pointer.tx - pointer.nx) * follow;
      pointer.ny += (pointer.ty - pointer.ny) * follow;
      pointer.on += (goal - pointer.on) * (1 - Math.exp(-dt * 3.5));

      const wanderX = Math.sin(time * 0.14) * 0.05;
      const wanderY = Math.cos(time * 0.10 + 1.5) * 0.065;
      rotX = 0.22 - pointer.ny * 0.12 + wanderX;
      rotY = spin + pointer.nx * 0.18 + wanderY;
    };

    const render = () => {
      const isMobile = cssW < 768;
      const scale = Math.max(0.25, Math.min(cssW / 585, cssH / 507));
      const isLight = toneRef.current === "light" ? 1 : 0;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Pass 1: Yoğun Duman, Dot-Grid, Spotlight Hover ve Tab Tozları
      gl.useProgram(atmosProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(aQuadPos);
      gl.vertexAttribPointer(aQuadPos, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uAtmos.res, cssW, cssH);
      gl.uniform1f(uAtmos.dpr, dpr);
      gl.uniform1f(uAtmos.scale, scale);
      gl.uniform1f(uAtmos.time, time);
      gl.uniform1f(uAtmos.spin, rotY);
      gl.uniform1f(uAtmos.amp, cur.amp);
      gl.uniform1f(uAtmos.burst, burstRef.current);
      gl.uniform4f(
        uAtmos.lens,
        lens.x,
        lens.y,
        100 * scale,
        lens.strength,
      );
      const amounts = amountsRef.current;
      gl.uniform3f(uAtmos.amount, amounts.fog, amounts.dust, amounts.dots);
      gl.uniform1f(uAtmos.theme, isLight);
      gl.uniform3fv(uAtmos.tint, tints);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.disableVertexAttribArray(aQuadPos);

      // Pass 2: 3B Dalgalı Nokta Küre
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
      // Mobilde tam ekran arkasında dolgun görünmesi için ölçek büyütüldü
      gl.uniform1f(uOrb.scale, isMobile ? 0.72 : 0.53);
      gl.uniform1f(uOrb.px, baseSize * dpr);
      gl.uniform2f(uOrb.pointer, pointer.nx, pointer.ny);
      gl.uniform1f(uOrb.pointerOn, pointer.on);
      gl.uniform1f(uOrb.centerY, isMobile ? 0.14 : 0.12);

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
      dpr = Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.5);
      const w = Math.max(1, Math.round(cssW * dpr));
      const h = Math.max(1, Math.round(cssH * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
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
      // Interaction is focused around the Orb, not the entire fullscreen Hero.
      const mobile = r.width < 768;
      const orbRadius = Math.min(r.width, r.height) * (mobile ? 0.36 : 0.265);
      const dx = x - r.width * 0.5;
      const dy = y - r.height * (mobile ? 0.43 : 0.44);
      pointer.inside = e.pointerType !== "touch" &&
        Math.hypot(dx, dy) <= orbRadius * 1.35;
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
      if (reduceMotion) { stop(); render(); }
      else if (inView && !document.hidden) start();
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
            "radial-gradient(closest-side, rgba(244,63,94,0.38), rgba(190,18,60,0.12) 60%, transparent 75%)",
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