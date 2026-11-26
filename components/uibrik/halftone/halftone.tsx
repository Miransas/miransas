"use client";

import { ShaderSurface, type ShaderBackgroundProps } from "../_shader-background/ShaderSurface";

// A screen of lit dots showing ribbons of light. The picture underneath is noise warped by noise,
// shaped into soft ribbons along its curves, so bright streams swirl slowly through the dark. Every
// dot on the grid stays: in the dark it's small and dim, and as the light reaches it, it grows and
// brightens along the colour list (blended in OKLCH), like a halftone printed in light. A faint
// glow spills around the brightest dots. The pointer leaves an eased trail along its real path.
const SHADER = /* glsl */ `
uniform float u_cell;      // dot spacing, css px
uniform float u_dotSize;   // largest dot, as a share of the spacing
uniform float u_minDot;    // smallest dot, as a share of the largest
uniform float u_angle;     // grid angle, degrees
uniform float u_frequency; // size of the ribbons; higher is busier
uniform float u_flow;      // how much the ribbons curl
uniform float u_bandWidth; // thickness of the ribbons
uniform float u_contrast;  // tone contrast
uniform float u_glow;      // light spilling around bright dots
uniform float u_softness;  // blur on each dot's edge
uniform float u_fade;      // how much the dots fade out (see u_fadeFrom)
uniform float u_fadeFrom;  // 0 edges, 1 top, 2 bottom, 3 left, 4 right
uniform float u_radius;    // width of the pointer trail, css px
uniform float u_trailAmt;  // how strongly the trail lights the dots

float fbm(vec3 p) {
  return snoise(p) * 0.78 + snoise(p * 2.03 + 7.1) * 0.22;
}

// 0 dark .. 1 the middle of a ribbon of light
float toneAt(vec2 q, float t) {
  vec2 p = q * 0.55 * u_frequency;
  vec2 w = vec2(fbm(vec3(p * 0.5, t)), fbm(vec3(p * 0.5 + 5.2, t)));
  float n = fbm(vec3(p + w * u_flow * 0.7, t * 0.7));
  float bw = 0.2 * u_bandWidth;
  float v = exp(-n * n / (bw * bw));
  // broad swells so some ribbons burn brighter than others
  v *= 0.65 + 0.35 * (snoise(vec3(p * 0.35, t * 0.5)) * 0.5 + 0.5);
  return clamp((v - 0.5) * u_contrast + 0.5, 0.0, 1.0);
}

// 1 where dots stay, falling to 0 where they fade out
float fadeAt(vec2 uv) {
  float k;
  if (u_fadeFrom < 0.5) k = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)) * 2.0;
  else if (u_fadeFrom < 1.5) k = 1.0 - uv.y;
  else if (u_fadeFrom < 2.5) k = uv.y;
  else if (u_fadeFrom < 3.5) k = uv.x;
  else k = 1.0 - uv.x;
  return mix(1.0, smoothstep(0.0, 0.7, k), u_fade);
}

// The pointer's path as a liquid rather than a stroke: its edges are warped by slowly flowing noise,
// the tail spreads wider as it thins (like ink diffusing), and a soft threshold gives it a body, so
// it reads as a blob of ink with a feathered rim instead of a blurred line.
float liquidTrail(vec2 p, float R, float t) {
  vec2 q = p / (R * 2.4);
  p += vec2(snoise(vec3(q, t)), snoise(vec3(q + 7.3, t))) * R * 0.5;
  float best = 0.0;
  for (int i = 0; i < 15; i++) {
    if (i + 1 >= u_trailCount) break;
    vec3 a = u_trailPts[i];
    vec3 b = u_trailPts[i + 1];
    vec2 ab = b.xy - a.xy;
    float h = clamp(dot(p - a.xy, ab) / max(dot(ab, ab), 1e-4), 0.0, 1.0);
    float s = mix(a.z, b.z, h);
    float r = R * mix(1.2, 0.8, s);
    float d = length(p - a.xy - ab * h);
    best = max(best, exp(-d * d / (r * r)) * s);
  }
  if (u_trailCount == 1) {
    float d = length(p - u_trailPts[0].xy);
    best = exp(-d * d / (R * R)) * u_trailPts[0].z;
  }
  return mix(best, smoothstep(0.05, 0.8, best), 0.7);
}

vec3 shade(vec2 frag) {
  float t = u_time * 0.08;
  float a = radians(u_angle);
  mat2 rot = mat2(cos(a), sin(a), -sin(a), cos(a));
  float cs = u_cell * u_dpr;
  vec2 g = rot * frag / cs;
  vec2 cell = floor(g) + 0.5;
  vec2 center = transpose(rot) * (cell * cs);

  float tone = toneAt(center / u_res.y, t);
  float R = u_radius * u_dpr;
  float rest = exp(-pow(length(center - u_pointer) / R, 2.0));
  float trail = u_pointerAmt * max(liquidTrail(center, R, u_time * 0.5), rest * 0.6);
  tone = clamp(tone + trail * u_trailAmt, 0.0, 1.0);
  float fade = fadeAt(center / u_res);
  tone *= fade;

  // every dot stays on the grid; light makes it bigger and brighter
  float r = 0.5 * cs * u_dotSize * mix(u_minDot, 1.0, sqrt(tone)) * fade;
  float soft = 0.6 + u_softness * cs * 0.25;
  float d = length((g - cell) * cs);
  float m = 1.0 - smoothstep(r - soft, r + soft, d);

  vec3 bg = oklabToLinear(u_bg);
  vec3 dotColor = oklabToLinear(paletteRampLch(tone));
  // a faint glow between the brightest dots
  vec3 base = bg + dotColor * u_glow * 0.12 * tone * tone;
  return mix(base, dotColor, m);
}
`;

const COLORS = ["#1b2533", "#5c7a9a", "#c9d6e0", "#f6ecdc"];
const FADES = { edges: 0, top: 1, bottom: 2, left: 3, right: 4 } as const;

export type HalftoneProps = ShaderBackgroundProps & {
  /** Distance between dots, in px. */
  spacing?: number;
  /** Largest dot, as a share of the spacing; 1 lets the brightest dots touch. */
  dotSize?: number;
  /** Smallest dot (in the dark), as a share of the largest; 0 lets dark dots vanish. */
  minDot?: number;
  /** Grid angle in degrees. */
  angle?: number;
  /** Size of the ribbons of light; higher is busier. */
  frequency?: number;
  /** How much the ribbons curl. */
  flow?: number;
  /** Thickness of the ribbons. */
  bandWidth?: number;
  /** Tone contrast; higher gives darker darks and fuller lights. */
  contrast?: number;
  /** Light spilling around the brightest dots. */
  glow?: number;
  /** Blur on each dot's edge. */
  softness?: number;
  /** How much the dots fade out toward `fadeFrom`. */
  fade?: number;
  /** Where the dots fade out. */
  fadeFrom?: keyof typeof FADES;
  /** Colour behind the dots. */
  background?: string;
  /** Width of the pointer trail, in px. */
  radius?: number;
  /** How strongly the trail lights the dots. */
  trailStrength?: number;
  /** Seconds the trail takes to fade. */
  trailLength?: number;
  /** How lazily the trail follows the pointer, 0 (locked) to 1 (drifts after it). */
  follow?: number;
};

export function Halftone({
  colors = COLORS,
  speed = 1,
  animate = true,
  interactive = true,
  grain = 0,
  seed = 0,
  spacing = 7,
  dotSize = 0.95,
  minDot = 0.3,
  angle = 0,
  frequency = 1.3,
  flow = 1.2,
  bandWidth = 1,
  contrast = 1.1,
  glow = 0.5,
  softness = 0,
  fade = 0,
  fadeFrom = "edges",
  background = "#050608",
  radius = 70,
  trailStrength = 0.85,
  trailLength = 0.9,
  follow = 0.55,
  ...rest
}: HalftoneProps) {
  return (
    <ShaderSurface
      shader={SHADER}
      uniforms={{
        u_cell: spacing,
        u_dotSize: dotSize,
        u_minDot: minDot,
        u_angle: angle,
        u_frequency: frequency,
        u_flow: flow,
        u_bandWidth: bandWidth,
        u_contrast: contrast,
        u_glow: glow,
        u_softness: softness,
        u_fade: fade,
        u_fadeFrom: FADES[fadeFrom] ?? 0,
        u_radius: radius,
        u_trailAmt: trailStrength,
      }}
      colors={colors}
      speed={speed}
      animate={animate}
      interactive={interactive}
      grain={grain}
      seed={seed}
      background={background}
      follow={follow}
      trailLife={trailLength}
      maxDpr={2}
      fallback={(_, base) =>
        `radial-gradient(${colors[1] ?? colors[0]} ${spacing * 0.2}px, transparent ${spacing * 0.2 + 0.5}px) 0 0 / ${spacing}px ${spacing}px, ${base}`
      }
      {...rest}
    />
  );
}
