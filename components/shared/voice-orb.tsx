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

const hexToRgb = (value: string): [number, number, number] => {
  const raw = value.trim().replace(/^#/, "");
  const hex = /^[0-9a-f]{3}$/i.test(raw)
    ? raw
        .split("")
        .map((ch) => ch + ch)
        .join("")
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
// PASS 1: DAĞINIK (SCATTERED) DOĞAL DUMAN BULUTLARI, TOZLAR & HAFİF SPOTLIGHT
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
uniform float uBurst;
uniform vec4 uLens;   // x, y, radius, strength
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

vec2 hash2(vec2 p) {
  return vec2(hash(p + vec2(1.7, 9.2)), hash(p + vec2(8.3, 2.8)));
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

// Tam yuvarlak, farklı derinliklerde serbestçe süzülen doğal toz zerrecikleri
float naturalDustLayer(vec2 px, float cellSize, float threshold, float dotRadius, float t, float seed) {
  vec2 grid = px / cellSize;
  vec2 id = floor(grid);
  vec2 f = fract(grid);

  vec2 rnd = hash2(id + seed);
  float activeMask = step(threshold, hash(id + seed * 3.17));

  float phase = rnd.x * 6.2831853 + t * (0.55 + rnd.y * 0.50);
  vec2 center = 0.22 + 0.56 * rnd + 0.12 * vec2(cos(phase), sin(phase * 1.17));

  vec2 diff = (f - center) * cellSize;
  float dist = length(diff);

  float sizeVar = mix(0.68, 1.32, rnd.y);
  float r = dotRadius * sizeVar;
  float core = smoothstep(r, r * 0.10, dist);
  float halo = exp(-sq(dist / (r * 1.75))) * 0.32;

  float twinkle = 0.50 + 0.50 * sin(t * (1.1 + rnd.x * 1.5) + rnd.y * 6.2831853);
  return (core + halo) * activeMask * twinkle;
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uResolution.y * uDpr - gl_FragCoord.y) / uDpr;
  vec2 uv = frag / uResolution;

  bool isMobile = uResolution.x < 768.0;
  vec2 center = vec2(uResolution.x * 0.5, uResolution.y * (isMobile ? 0.43 : 0.44));
  float orbRadius = min(uResolution.x, uResolution.y) * (isMobile ? 0.36 : 0.265);

  vec2 dVec = frag - center;
  vec2 p = dVec / orbRadius;
  float r = length(p);

  float t = uTime;

  // ── EKRAN KENARLARI VE METİN KORUMA MASKELERİ ────────────────────────────
  vec2 cUv = (uv - 0.5) * 2.0;
  float cornerDist = length(cUv * vec2(0.86, 0.92));
  float cornerMask = 1.0 - smoothstep(0.88, 1.42, cornerDist);
  float topEdgeMask = smoothstep(0.0, 0.09, uv.y);

  // Sağ alt açıklama metni ve sol alt büyük başlık üzerinde okunabilirliği koru
  vec2 rightTextZone = (uv - vec2(0.73, 0.77)) / vec2(0.26, 0.21);
  float rightTextMask = 1.0 - 0.62 * exp(-dot(rightTextZone, rightTextZone) * 1.7);

  vec2 leftTitleZone = (uv - vec2(0.22, 0.82)) / vec2(0.26, 0.18);
  float leftTitleMask = 1.0 - 0.45 * exp(-dot(leftTitleZone, leftTitleZone) * 1.8);

  float zoneMask = cornerMask * topEdgeMask * rightTextMask * leftTitleMask;

  // ── HAFİF VE DOĞAL HOVER SPOTLIGHT MERCEĞİ ──────────────────────────────
  vec2 toLens = frag - uLens.xy;
  float lensCore = exp(-dot(toLens, toLens) / sq(uLens.z * 0.95)) * uLens.w;
  float lensWide = exp(-dot(toLens, toLens) / sq(uLens.z * 2.25)) * uLens.w;

  // Sekme değiştiğinde merkezden dışa yayılan yumuşak dalga
  float burstRadius = 0.75 + (1.0 - uBurst) * 1.55;
  float burstWave = exp(-sq((r - burstRadius) / 0.42)) * uBurst;

  vec3 col = vec3(0.0);

  // ── 1. DAĞINIK, PARÇALI VE DOĞAL DUMAN BULUTLARI (Multi-Plume Smoke) ────
  float fogAmount = uAmount.x;
  float smokeField = 0.0;

  if (fogAmount > 0.001 && zoneMask > 0.002) {
    // Dumanı tek bir simit gibi küreye yapıştırmak yerine 4 farklı asimetrik
    // atmosfer lobuna (sol-üst, sağ-üst, sol-alt, merkez-çevre) yayıyoruz:
    vec2 p1 = (p - vec2(-0.95, -0.35)) / vec2(1.45, 1.05); // Sol üst / tabların arkası
    vec2 p2 = (p - vec2(0.88, -0.42)) / vec2(1.35, 1.05);  // Sağ üst açılım
    vec2 p3 = (p - vec2(-0.72, 0.58)) / vec2(1.30, 0.95);  // Sol orta-alt
    vec2 p4 = (p - vec2(0.55, 0.35)) / vec2(1.15, 0.85);   // Sağ orta

    float lobes = 0.52 * exp(-dot(p1, p1))
                + 0.46 * exp(-dot(p2, p2))
                + 0.42 * exp(-dot(p3, p3))
                + 0.36 * exp(-dot(p4, p4));

    // Küre çevresindeki yumuşak geçiş (küre merkezini boğmaz, dışarı doğru yayılır)
    float coreHalo = smoothstep(0.15, 0.85, r) * exp(-pow(max(r - 0.70, 0.0) / 1.45, 1.40));
    float spatialEnvelope = clamp((lobes * 0.72 + coreHalo * 0.58) + lensWide * 0.28 + burstWave * 0.18, 0.0, 1.0) * zoneMask;

    // Farklı yönlere yavaşça süzülen 2 bağımsız FBM duman katmanı
    vec2 qA = p * 0.68 + vec2(-t * 0.024, -t * 0.018);
    vec2 warpA = vec2(
      fbm(qA * 1.20 + vec2(1.7, 9.2) + t * 0.016),
      fbm(qA * 1.20 + vec2(8.3, 2.8) - t * 0.014)
    );
    float cloudA = fbm(qA + 1.30 * warpA);

    vec2 qB = p * 0.52 + vec2(t * 0.019, -t * 0.026);
    vec2 warpB = vec2(
      fbm(qB * 1.35 + vec2(4.4, 2.1) - t * 0.015),
      fbm(qB * 1.35 + vec2(6.1, 7.4) + t * 0.013)
    );
    float cloudB = fbm(qB + 1.20 * warpB);

    // Dumanın aynı yerde toplanmasını engelleyen boşluklu parçalama maskesi (carve/pockets)
    float pockets = smoothstep(0.38, 0.76, cloudA) * (0.35 + 0.65 * smoothstep(0.32, 0.74, cloudB));
    float wisps = smoothstep(0.46, 0.84, (cloudA + cloudB) * 0.5 + 0.12 * warpA.x);

    smokeField = clamp(pockets * 1.15 + wisps * 0.45, 0.0, 1.0);

    vec3 sideTint = mix(LEFT, RIGHT, smoothstep(-1.6, 1.6, p.x));
    vec3 fog = (HAZE * 0.26 + BEAM * 0.68) * pockets * spatialEnvelope;
    fog += sideTint * 0.52 * wisps * spatialEnvelope;
    fog += EMBER * 0.12 * wisps * (burstWave + 0.35 * coreHalo) * zoneMask;

    // Hover Spotlight: İmlecin gezdiği yerdeki dağınık duman bulutlarını yumuşakça aydınlatır
    vec3 spotColor = mix(BEAM, WHITE, 0.35);
    fog += spotColor * (0.14 + 0.45 * smokeField) * lensWide * zoneMask;
    fog += WHITE * 0.12 * wisps * lensCore * zoneMask;

    col += fog * fogAmount * (1.0 + 0.08 * uBurst);
  }

  // ── 2. DAĞINIK DOĞAL TOZ ZERRECİKLERİ (Geniş Alana Yayılan Noktalar) ────
  float dustAmount = uAmount.y;
  if (dustAmount > 0.001 && zoneMask > 0.01) {
    vec2 localPx = dVec / max(uScale, 0.35);

    // Tozlar sadece küre dibinde değil, geniş ekranda ve duman bulutlarının olduğu her yerde gezer
    float wideSpread = exp(-pow(max(r - 0.55, 0.0) / 1.85, 1.35)) * smoothstep(0.18, 0.65, r);
    float dustZone = clamp(
      wideSpread * (0.38 + 0.85 * smokeField) + lensWide * 0.50 + burstWave * 0.22,
      0.0,
      1.0
    ) * zoneMask;

    // Katman 1: Geniş alana dağılmış ince mikro tozlar
    vec2 pxFine = localPx + vec2(sin(t * 0.22) * 12.0 - t * 3.2, t * 5.0);
    float fineDust = naturalDustLayer(pxFine, 21.0, 0.62, 1.10, t, 1.3);

    // Katman 2: Duman kümeleriyle birlikte süzülen orta boy parlak noktalar
    vec2 pxMid = localPx + vec2(-cos(t * 0.18) * 16.0 + t * 2.4, t * 7.8);
    float midDust = naturalDustLayer(pxMid, 34.0, 0.67, 1.50, t * 0.9, 4.7);

    // Katman 3: Seyrek, yumuşak bokeh tozları (Spotlight ile ekstra belirginleşir)
    vec2 pxNear = localPx + vec2(sin(t * 0.15 + 1.4) * 20.0, t * 10.5);
    float nearDust = naturalDustLayer(pxNear, 50.0, 0.75, 2.10, t * 0.8, 8.9);

    vec3 dustCol = mix(WHITE, PINK, 0.38) * fineDust * 0.50;
    dustCol += mix(WHITE, WARM, 0.24) * midDust * 0.76;
    dustCol += mix(WHITE, BEAM, 0.30) * nearDust * (0.42 + 0.85 * lensWide + 0.55 * lensCore);

    col += dustCol * dustZone * dustAmount;
  }

  // ── TONLAMA (Dark & Light Mode) ─────────────────────────────────────────
  vec3 emit = 1.0 - exp(-col * mix(0.95, 0.60, uTheme));
  float peak = max(emit.r, max(emit.g, emit.b));

  if (uTheme > 0.5) {
    float alpha = clamp(pow(peak, 1.12) * 0.80, 0.0, 0.68);
    vec3 lightTint = mix(vec3(0.98, 0.38, 0.49), vec3(0.96, 0.24, 0.37), clamp(peak * 1.4, 0.0, 1.0));
    gl_FragColor = vec4(lightTint * alpha, alpha);
  } else {
    gl_FragColor = vec4(emit, clamp(peak, 0.0, 1.0));
  }
}
`;

// ══════════════════════════════════════════════════════════════════════════
// PASS 2: 3B DALGALI NOKTA KÜRE (HAFİF SPOTLIGHT HOVER & TEMA UYUMLU)
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

  // Hafif Spotlight Hover etkileşimi
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

  vec3 deepDark  = vec3(0.22, 0.02, 0.07);
  vec3 deepLight = vec3(0.92, 0.42, 0.52);
  vec3 deepRose  = mix(deepDark, deepLight, uTheme);

  vec3 coreRose  = vec3(0.957, 0.247, 0.369);
  vec3 softRose  = vec3(0.988, 0.451, 0.533);
  vec3 crestHi   = mix(vec3(1.00, 0.90, 0.94), vec3(0.96, 0.18, 0.34), uTheme * 0.65);

  vec3 col = mix(deepRose, coreRose, smoothstep(0.10, 0.50, vLight));
  col = mix(col, softRose, smoothstep(0.48, 0.84, vLight));
  col = mix(col, crestHi, smoothstep(0.52, 0.96, vCrest));

  vec3 spotGlow = mix(vec3(1.0, 0.95, 0.97), vec3(1.0, 0.32, 0.46), uTheme * 0.5);
  col = mix(col, spotGlow, clamp(vHeat * 0.55, 0.0, 1.0));

  float themeAlpha = mix(1.0, 0.82, uTheme);
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
  color = "#f43f5e",
  fog = 0.85,
  dust = 1.2,
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
      theme: gl.getUniformLocation(orbProg, "uTheme"),
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

      const goal = pointer.inside ? 0.34 : 0;
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
      gl.uniform1f(uAtmos.spin, rotY);
      gl.uniform1f(uAtmos.amp, cur.amp);
      gl.uniform1f(uAtmos.burst, burstRef.current);
      gl.uniform4f(
        uAtmos.lens,
        lens.x,
        lens.y,
        125 * scale,
        lens.strength,
      );
      const amounts = amountsRef.current;
      gl.uniform3f(uAtmos.amount, amounts.fog, amounts.dust, amounts.dots);
      gl.uniform1f(uAtmos.theme, isLight);
      gl.uniform3fv(uAtmos.tint, tints);

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

      const mobile = r.width < 768;
      const orbRadius = Math.min(r.width, r.height) * (mobile ? 0.36 : 0.265);
      const dx = x - r.width * 0.5;
      const dy = y - r.height * (mobile ? 0.43 : 0.44);

      pointer.inside =
        e.pointerType !== "touch" && Math.hypot(dx, dy) <= orbRadius * 2.45;
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