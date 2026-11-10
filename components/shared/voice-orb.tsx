"use client";

import { useEffect, useRef, useState } from "react";

export type OrbMode = { amp: number; freq: number; speed: number };

type VoiceOrbProps = {
  tone?: "light" | "dark";
  mode?: OrbMode;
  color?: string;
  fog?: number;
  dust?: number;
  className?: string;
};

const DEFAULT_MODE: OrbMode = { amp: 0.42, freq: 1.08, speed: 0.75 };

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
// PASS 1: KÜRE ÇEVRESİNDE YOĞUNLAŞAN, METİN VE KÖŞELERDE AZALAN DUMAN & TOZ
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
uniform vec4 uLens;
uniform vec3 uAmount; // x: fog, y: dust, z: dots
uniform float uTheme; // 0: dark, 1: light
uniform vec3 uTint[16];

#define BEAM uTint[0]
#define LEFT uTint[1]
#define RIGHT uTint[2]
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

  // Küre merkezi: Metinlerin üstünde ferah durması için y = %43 noktasında
  vec2 center = vec2(uResolution.x * 0.5, uResolution.y * 0.43);
  float orbRadius = min(uResolution.x, uResolution.y) * 0.255;

  vec2 dVec = frag - center;
  vec2 p = dVec / orbRadius; // r = 1.0 tam kürenin dış çeperidir
  float r = length(p);
  float angle = atan(p.y, p.x);

  float t = uTime;

  // Kürenin doğal dalgalarıyla eşzamanlı hareket eden sınır
  float waveRim = 0.08 * sin(angle * 3.0 - uSpin * 1.4 + t * 0.5)
                + 0.05 * cos(angle * 5.0 + uSpin * 0.9 - t * 0.4);
  float surfaceR = 0.92 + waveRim * (0.7 + uAmp);
  float distFromRim = r - surfaceR;

  // ── BÖLGE MASKESİ: Metinlerin olduğu alt alanda ve köşelerde dumanı azalt ──
  // 1) Alt metin bölgesi (başlık ve sağ açıklama metni okunaklılığı için)
  float bottomTextMask = 1.0 - 0.82 * smoothstep(0.54, 0.80, uv.y);
  // 2) Sol menü ("OUR TECHNOLOGY") bölgesi
  float leftMenuMask = 1.0 - 0.55 * (1.0 - smoothstep(0.05, 0.26, uv.x)) * smoothstep(0.25, 0.58, uv.y);
  // 3) Ekran köşeleri ve en üst/alt sınırları (keskin çizgi oluşmaması için yumuşak vignette)
  float cornerDist = length((uv - vec2(0.5, 0.45)) * vec2(1.15, 1.1));
  float cornerMask = 1.0 - smoothstep(0.48, 0.82, cornerDist);
  float topEdgeMask = smoothstep(0.0, 0.09, uv.y);

  float zoneMask = bottomTextMask * leftMenuMask * cornerMask * topEdgeMask;

  // Mouse Lens etkisi
  vec2 toLens = frag - uLens.xy;
  float lens = exp(-dot(toLens, toLens) / sq(uLens.z)) * uLens.w;

  vec3 col = vec3(0.0);

  // ── 1. KÜRE ÇEVRESİNDE YOĞUN, DIŞARI DOĞRU AZALAN DUMAN (FBM SMOKE) ─────
  float fogAmount = uAmount.x;
  // Küre merkezinin tam içini boğmaz (smoothstep(0.32, 0.88, r)),
  // çeperde (r ~ 0.95) zirve yapar, dışarı doğru (r > 1.2) hızla azalır.
  float innerClear = smoothstep(0.30, 0.88, r);
  float outerFalloff = exp(-pow(max(r - 0.88, 0.0) * 1.55, 1.75));
  float rimBoost = exp(-sq(distFromRim / 0.28));
  float envelope = innerClear * outerFalloff * zoneMask;

  if (fogAmount > 0.001 && envelope > 0.002) {
    float cs = cos(-uSpin * 0.32);
    float sn = sin(-uSpin * 0.32);
    vec2 rotP = vec2(cs * p.x - sn * p.y, sn * p.x + cs * p.y);

    // Küreden dışarı doğru süzülen FBM duman koordinatları
    vec2 fq = rotP * 1.25 - normalize(p + vec2(0.0001)) * (t * 0.055) + vec2(t * 0.015, -t * 0.028);
    vec2 fw = vec2(
      fbm(fq * 1.35 + vec2(1.7, 9.2) + t * 0.03),
      fbm(fq * 1.35 + vec2(8.3, 2.8) - t * 0.024)
    );
    float cloud = fbm(fq + 1.35 * fw);

    float density = smoothstep(0.36, 0.78, cloud);
    float smoke = smoothstep(0.24, 0.72, cloud);

    vec3 sideK = mix(LEFT, RIGHT, smoothstep(-1.1, 1.1, p.x));
    vec3 fog = (HAZE * 0.42 + BEAM * (2.6 * rimBoost + 0.9)) * density * envelope;
    fog += sideK * 1.55 * rimBoost * smoke * envelope;
    fog += EMBER * 0.35 * smoke * rimBoost * envelope;

    col += fog * fogAmount * (1.0 + 0.75 * lens);
  }

  // ── 2. DUMAN ÜZERİNDEKİ İNCE NOKTA DOKUSU (DOT GRID) ────────────────────
  float haze = max(col.r, max(col.g, col.b));
  float dotGrid = 1.0 - smoothstep(0.16, 0.32, length(fract(frag / 3.0) - 0.5));
  col += BEAM * dotGrid * clamp(haze * 1.3, 0.0, 1.4) * (0.20 + 0.28 * lens) * uAmount.z * zoneMask;

  // ── 3. KÜRE ÇEVRESİNDE YOĞUNLAŞIP KENARLARDA AZALAN TOZ / KIVILCIMLAR ───
  float dustAmount = uAmount.y;
  if (dustAmount > 0.001 && zoneMask > 0.01) {
    // A) Küre çeperinden (r ≈ 0.85..1.45) dışarı savrulan yoğun toz halkası
    float normAngle = (angle + 3.14159265) / 6.2831853;
    float radialStream = log(max(r, 0.35) / 0.80) * 3.4;
    vec2 flowCell = vec2(radialStream - t * 0.20, (normAngle - uSpin * 0.09) * 30.0);
    vec2 cellId = floor(flowCell);
    vec2 cellJitter = vec2(hash(cellId + 1.7), hash(cellId + 8.3));
    vec2 cellLocal = fract(flowCell) - (0.15 + cellJitter * 0.7);
    float particleDist = length(cellLocal * vec2(14.5, 9.5));
    float particleOn = step(0.62, hash(cellId + 3.1));
    float particleTwinkle = 0.5 + 0.5 * sin(t * 3.8 + hash(cellId + 9.2) * 6.283);

    // Küre kenarında çok yoğun, uzaklaştıkça hızla azalan maske
    float dustRingZone = exp(-sq((r - 1.02) / 0.34)) * smoothstep(0.60, 0.88, r) * zoneMask;
    col += mix(WHITE, WARM, 0.22)
         * exp(-particleDist * particleDist / 0.40)
         * particleOn * particleTwinkle * dustRingZone * 2.8 * dustAmount;

    // B) Küre etrafında yukarı süzülen ince parıltılı tozlar
    vec2 localPx = dVec / uScale;
    vec2 glitterCoord = vec2(localPx.x / 4.5, (localPx.y + t * 12.0) / 10.5);
    vec2 glitterId = floor(glitterCoord);
    vec2 glitterJitter = vec2(hash(glitterId + 4.4), hash(glitterId + 2.9));
    vec2 glitterPos = (glitterId + 0.15 + glitterJitter * 0.7) * vec2(4.5, 10.5);
    float glitterDist = length(vec2(localPx.x, localPx.y + t * 12.0) - glitterPos);
    float glitterOn = step(0.72, hash(glitterId + 6.6));
    float glitterTwinkle = 0.5 + 0.5 * sin(t * 4.4 + hash(glitterId + 1.1) * 6.283);

    // Sadece küre ve yakın çevresinde güçlü, köşelerde çok az
    float glitterZone = exp(-pow(max(r - 0.85, 0.0) * 1.45, 1.8)) * smoothstep(0.45, 0.85, r) * zoneMask;
    col += WHITE * exp(-glitterDist * glitterDist / 0.36) * glitterOn * glitterTwinkle * glitterZone * 2.2 * dustAmount;
  }

  vec3 emit = 1.0 - exp(-col * mix(1.0, 0.68, uTheme));
  float peak = max(emit.r, max(emit.g, emit.b));

  if (uTheme > 0.5) {
    float low = min(emit.r, min(emit.g, emit.b));
    float chroma = peak - low;
    vec3 hue = (emit - low) / max(chroma, 0.0001);
    float alpha = clamp(pow(chroma, 1.22) * 1.3, 0.0, 1.0) * 0.85;
    gl_FragColor = vec4((hue * 0.84 + 0.05) * alpha, alpha);
  } else {
    gl_FragColor = vec4(emit, peak);
  }
}
`;

// ══════════════════════════════════════════════════════════════════════════
// PASS 2: DOĞAL 3B DALGALI (ORGANIC WAVE) NOKTA KÜRE (#f43f5e SABİT)
// ══════════════════════════════════════════════════════════════════════════
const ORB_VERT = /* glsl */ `
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

  // Akıcı, doğal su/ses dalgası zamanlaması
  float t = uTime * 0.24;

  // Gül yaprağı sarmal bükülmesi
  float twist = n0.y * 1.45 + sin(t * 0.55) * 0.28 + t * 0.16;
  float ctw = cos(twist);
  float stw = sin(twist);
  vec3 q = vec3(ctw * n0.x + stw * n0.z, n0.y, -stw * n0.x + ctw * n0.z);

  vec3 flow1 = vec3(t * 0.48, -t * 0.36, t * 0.42);
  vec3 flow2 = vec3(-t * 0.34, t * 0.44, -t * 0.28);

  // 1) Domain Warping: Kumaş/yaprak gibi katlanan vektör alanı
  vec3 warp = vec3(
    snoise(q * (uFreq * 0.95) + flow1),
    snoise(q * (uFreq * 0.95) + flow1 + vec3(3.7, 1.9, 5.1)),
    snoise(q * (uFreq * 0.95) + flow1 + vec3(7.3, 4.2, 2.8))
  );

  // 2) Büyük doğal yüzey dalgası (Macro Wave) + Simplex sırtları
  float macroWave = sin(q.x * 2.5 + t * 1.2) * cos(q.y * 2.3 - t * 0.95) * sin(q.z * 2.5 + t * 0.85);
  vec3 samplePos = q * (uFreq * 1.22) + warp * 0.65 + flow2 + vec3(aShell * 0.42);
  float n1 = snoise(samplePos);
  float n2 = snoise(samplePos * 1.85 - flow1 * 0.75 + vec3(0.0, aShell * 0.65, 1.4));

  float ridge = 1.0 - abs(n1);
  ridge = ridge * ridge;

  float shellScale = 1.0 - aShell * 0.10;
  float amp = uAmp * shellScale;

  // Belirgin, yumuşak 3B dalga yüksekliği ve teğetsel kıvrılma
  float radialWave = (n1 * 0.72 + (ridge - 0.48) * 0.65 + macroWave * 0.42 + n2 * 0.24) * amp;
  vec3 tangentWarp = warp - n0 * dot(warp, n0);

  vec3 displaced = n0 * (baseRadius * (1.0 + radialWave * 0.78)) + tangentWarp * (amp * 0.42);

  // Organik nefes alma
  displaced *= 1.0 + 0.016 * sin(uTime * 0.65 + n1 * 2.2);

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

  // Küreyi ekranın %43 yüksekliğine (metinlerin üstüne) hizala
  vec2 centerOffsetNDC = vec2(0.0, 0.14);
  vec2 ndc = pos.xy * k * uScale * vec2(1.0 / uAspect, 1.0) + centerOffsetNDC;

  // Mouse yaklaştığında doğal dalga kabarması
  vec2 dd = (ndc - uPointer) * vec2(uAspect, 1.0);
  float f = exp(-dot(dd, dd) * 8.0) * uPointerOn;
  vec2 dir = normalize(dd + vec2(0.0001));
  vec2 perp = vec2(-dir.y, dir.x);
  ndc += (perp * 0.032 + dir * 0.014) * f * vec2(1.0 / uAspect, 1.0);

  vec3 lightDir = normalize(vec3(-0.38, 0.68, 0.62));
  vec3 fillDir = normalize(vec3(0.45, -0.55, 0.70));
  float diff = clamp(dot(rotN, lightDir) * 0.5 + 0.5, 0.0, 1.0);
  float fill = clamp(dot(rotN, fillDir) * 0.5 + 0.5, 0.0, 1.0);
  float rim = pow(1.0 - clamp(facing, 0.0, 1.0), 2.2);

  float heightNorm = clamp(radialWave / max(0.001, amp) * 0.5 + 0.5, 0.0, 1.0);
  vCrest = clamp(pow(ridge, 1.4) * 0.78 + pow(heightNorm, 1.5) * 0.60 + rim * 0.35 + f * 0.32, 0.0, 1.0);
  vLight = clamp(diff * 0.56 + heightNorm * 0.46 + fill * 0.14 + f * 0.20, 0.0, 1.0);

  float frontMask = smoothstep(-0.65, 0.28, facing);
  vAlpha = mix(0.20, 0.96, frontMask) * (1.0 - aShell * 0.12);
  vHeat = f;

  float size = uPx * (0.92 - aShell * 0.10) * (1.0 + f * 0.95 + vCrest * 0.28) * (0.62 + 0.65 * frontMask) * k;
  gl_PointSize = clamp(size, uPx * 0.45, uPx * 3.1);
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

  // Dalga derinliğini öne çıkaran yüksek kontrastlı #f43f5e paleti
  vec3 deepRose = vec3(0.20, 0.015, 0.065);  // #330410 - Derin dalga çukuru
  vec3 coreRose = vec3(0.957, 0.247, 0.369); // #f43f5e - Ana sabit renk
  vec3 softRose = vec3(0.988, 0.451, 0.533); // #fb7185 - Dalga gövdesi
  vec3 crestHi  = vec3(1.00, 0.91, 0.94);    // #ffe8ef - Parlak dalga sırtı

  vec3 col = mix(deepRose, coreRose, smoothstep(0.10, 0.48, vLight));
  col = mix(col, softRose, smoothstep(0.46, 0.82, vLight));
  col = mix(col, crestHi, smoothstep(0.50, 0.95, vCrest));

  col = mix(col, vec3(1.0, 0.95, 0.96), clamp(vHeat * 0.42, 0.0, 1.0));

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
  fog = 0.9,
  dust = 1.45,
  className,
}: VoiceOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<OrbMode>(mode);
  const toneRef = useRef<"light" | "dark" | undefined>(tone);
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
    const baseSize = small ? 2.05 : 1.95;

    const SHELLS = small
      ? [
          { r: 0.78, rings: 38, eqDots: 76, s: 2 },
          { r: 0.89, rings: 52, eqDots: 104, s: 1 },
          { r: 1.00, rings: 72, eqDots: 144, s: 0 },
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
      lens: gl.getUniformLocation(atmosProg, "uLens"),
      amount: gl.getUniformLocation(atmosProg, "uAmount"),
      theme: gl.getUniformLocation(atmosProg, "uTheme"),
      tint: gl.getUniformLocation(atmosProg, "uTint"),
    };

    const uOrb = {
      time: gl.getUniformLocation(orbProg, "uTime"),
      amp: gl.getUniformLocation(orbProg, "uAmp"),
      freq: gl.getUniformLocation(orbProg, "uFreq"),
      rot: gl.getUniformLocation(orbProg, "uRot"),
      aspect: gl.getUniformLocation(orbProg, "uAspect"),
      scale: gl.getUniformLocation(orbProg, "uScale"),
      px: gl.getUniformLocation(orbProg, "uPx"),
      pointer: gl.getUniformLocation(orbProg, "uPointer"),
      pointerOn: gl.getUniformLocation(orbProg, "uPointerOn"),
    };

    const tints = buildTints([0.957, 0.247, 0.369]);

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

    const update = (dt: number) => {
      const m = modeRef.current;
      const ease = 1 - Math.exp(-dt * 2.2);
      const pulse =
        1 + 0.08 * Math.sin(time * 0.55) + 0.04 * Math.cos(time * 0.28 + 1.1);

      cur.amp += (m.amp * pulse - cur.amp) * ease;
      cur.freq += (m.freq - cur.freq) * ease;
      cur.speed += (m.speed - cur.speed) * ease;

      time += dt * cur.speed;
      spin += dt * 0.055 * cur.speed;

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
      const goal = pointer.inside ? 1 : 0;
      lens.strength +=
        (goal - lens.strength) *
        (1 - Math.exp(-dt / (goal > lens.strength ? 0.35 : 0.6)));
      if (lens.strength < 0.001 && !pointer.inside) lens.placed = false;

      const follow = 1 - Math.exp(-dt * 3.5);
      pointer.nx += (pointer.tx - pointer.nx) * follow;
      pointer.ny += (pointer.ty - pointer.ny) * follow;
      pointer.on += (goal - pointer.on) * (1 - Math.exp(-dt * 3.0));

      const wanderX = Math.sin(time * 0.14) * 0.05;
      const wanderY = Math.cos(time * 0.10 + 1.5) * 0.065;
      rotX = 0.22 - pointer.ny * 0.10 + wanderX;
      rotY = spin + pointer.nx * 0.16 + wanderY;
    };

    const render = () => {
      const scale = Math.max(0.25, Math.min(cssW / 585, cssH / 507));
      const isLight = toneRef.current === "light" ? 1 : 0;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Pass 1: Küre Çeperinde Yoğun, Metin ve Köşelerde Azalan Duman & Toz
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
      gl.uniform4f(uAtmos.lens, lens.x, lens.y, 110 * scale, lens.strength);
      gl.uniform3f(uAtmos.amount, fog, dust, 1.0);
      gl.uniform1f(uAtmos.theme, isLight);
      gl.uniform3fv(uAtmos.tint, tints);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.disableVertexAttribArray(aQuadPos);

      // Pass 2: Doğal 3B Dalgalı Nokta Küre
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
      gl.uniform2f(uOrb.rot, rotX, rotY);
      gl.uniform1f(uOrb.aspect, cssW / cssH);
      // Küre yarıçapı metinlerin üstüne binmemesi için dengelendi
      gl.uniform1f(uOrb.scale, small ? 0.56 : 0.51);
      gl.uniform1f(uOrb.px, baseSize * dpr);
      gl.uniform2f(uOrb.pointer, pointer.nx, pointer.ny);
      gl.uniform1f(uOrb.pointerOn, pointer.on);

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
      if (raf) return;
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
      dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
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
      pointer.inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
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

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    start();

    return () => {
      stop();
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
  }, [color, fog, dust, tone]);

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