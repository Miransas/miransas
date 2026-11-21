'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

export type SmokeAnchor =
  | 'top-right'
  | 'center-left'
  | 'bottom-right'
  | 'center'
  | 'top-left';

export type AmbientSmokeProps = {
  seed: number;
  anchor: SmokeAnchor;
  intensity?: number;
  dust?: number;
  tone?: 'light' | 'dark';
  className?: string;
};

const ANCHOR_UV: Record<SmokeAnchor, [number, number]> = {
  'top-right': [0.76, 0.3],
  'center-left': [0.24, 0.5],
  'bottom-right': [0.76, 0.7],
  center: [0.5, 0.5],
  'top-left': [0.24, 0.3],
};

const FALLBACK_POS: Record<SmokeAnchor, string> = {
  'top-right': '76% 30%',
  'center-left': '24% 50%',
  'bottom-right': '76% 70%',
  center: '50% 50%',
  'top-left': '24% 30%',
};

const VERT = /* glsl */ `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

// Reuses the 5-octave domain-warped FBM #0d4bfa smoke & drifting blue dust
// visual language from VoiceOrb ATMOS_FRAG, without the 3D dot sphere.
const FRAG = /* glsl */ `
precision highp float;

uniform vec2 uResolution;
uniform float uScale;
uniform float uTime;
uniform float uSeed;
uniform vec2 uAnchor;
uniform float uIntensity;
uniform float uDust;
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
  vec2 frag = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y);
  vec2 uv = frag / max(uResolution, vec2(1.0));

  vec2 origin = uAnchor * uResolution;
  float radius = min(uResolution.x, uResolution.y) * 0.42;
  vec2 p = (frag - origin) / max(radius, 1.0);
  float r = length(p);
  float t = uTime;

  // Organic radial plume envelope centered at uAnchor
  float coreMist = 0.42 * exp(-r * r * 1.15);
  float billow = smoothstep(0.05, 0.85, r) * (1.0 - smoothstep(0.75, 1.85, r));
  float plume = coreMist + billow * 0.82;

  // Deep 4-edge radial feathering so the smoke dissolves seamlessly with zero rectangular cutoff
  float edgeX = smoothstep(0.0, 0.22, uv.x) * smoothstep(0.0, 0.22, 1.0 - uv.x);
  float edgeY = smoothstep(0.0, 0.24, uv.y) * smoothstep(0.0, 0.24, 1.0 - uv.y);
  float edge = edgeX * edgeY;
  edge = edge * edge * (3.0 - 2.0 * edge);

  vec2 seedOffset = vec2(uSeed * 3.17, uSeed * 7.43);
  vec2 dir = p / max(r, 0.001);
  vec2 advected = p - dir * (t * 0.022) + vec2(t * 0.009, -t * 0.011) + seedOffset;
  vec2 warp = vec2(
    fbm(advected * 1.15 + vec2(1.7, 9.2) + t * 0.021),
    fbm(advected * 1.15 + vec2(8.3, 2.8) - t * 0.018)
  ) - 0.5;
  vec2 fq = advected * 0.92 + 1.55 * warp;
  float broad = fbm(fq);
  float detail = fbm(fq * 2.2 + vec2(3.4, 6.1) + seedOffset * 0.35);
  float cloud = smoothstep(0.33, 0.69, broad * 0.76 + detail * 0.24);
  float wisps = smoothstep(0.38, 0.64, fbm(fq * 1.55 + vec2(5.2, 1.9) - seedOffset * 0.25));
  float density = (cloud * 0.78 + wisps * 0.22) * plume * edge;

  float themeScale = mix(1.0, 0.58, uTheme);
  float fogAlpha = clamp(uIntensity, 0.0, 1.5) * density * (0.18 + 0.24 * cloud) * themeScale;

  // Drifting #0d4bfa dust particles
  float dustAlpha = 0.0;
  if (uDust > 0.001) {
    vec2 pixel = (frag - origin) / max(uScale, 0.35);
    float fine = particle(pixel + vec2(t * 1.8, -t * 3.0), 46.0, 0.88, 0.85, t, 1.3 + uSeed);
    float medium = particle(pixel + vec2(-t * 1.1, -t * 1.6), 78.0, 0.93, 1.15, t, 4.7 + uSeed);
    float rare = particle(pixel + vec2(t * 0.6, t * 1.3), 112.0, 0.965, 1.25, t, 8.9 + uSeed);
    float dustZone = (1.0 - smoothstep(0.95, 1.75, r)) * edge;
    dustAlpha = clamp(uDust, 0.0, 1.5)
              * (fine * 0.22 + medium * 0.26 + rare * 0.22)
              * dustZone
              * (0.55 + 0.45 * cloud)
              * themeScale;
  }

  // #0d4bfa (0.051, 0.294, 0.980) volumetric blue smoke & luminous dust palette
  vec3 cobalt = vec3(0.051, 0.294, 0.980);
  vec3 deepMistDark = vec3(0.04, 0.14, 0.48);
  vec3 brightMistDark = vec3(0.36, 0.58, 1.00);
  vec3 darkSmokeCol = mix(deepMistDark, cobalt, smoothstep(0.15, 0.75, cloud));
  darkSmokeCol = mix(darkSmokeCol, brightMistDark, clamp(wisps * 0.35, 0.0, 1.0));

  vec3 lightSmokeCol = mix(vec3(0.03, 0.14, 0.45), cobalt, smoothstep(0.2, 0.8, cloud));
  vec3 smokeCol = mix(darkSmokeCol, lightSmokeCol, uTheme);

  vec3 dustCol = mix(vec3(0.62, 0.80, 1.00), cobalt, uTheme);

  float totalAlpha = clamp(fogAlpha + dustAlpha, 0.0, 0.36);
  float dustMix = dustAlpha / max(fogAlpha + dustAlpha, 0.0001);
  vec3 finalCol = mix(smokeCol, dustCol, clamp(dustMix * 1.35, 0.0, 1.0));

  // Premultiplied alpha
  gl_FragColor = vec4(finalCol * totalAlpha, totalAlpha);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createSmokeProgram(gl: WebGLRenderingContext) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export function AmbientSmoke({
  seed,
  anchor,
  intensity = 0.52,
  dust = 0.18,
  tone,
  className = '',
}: AmbientSmokeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const resolvedTone: 'light' | 'dark' =
    tone ?? (resolvedTheme === 'light' ? 'light' : 'dark');
  const paramsRef = useRef({
    seed,
    anchor,
    intensity,
    dust,
    tone: resolvedTone,
  });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    paramsRef.current = {
      seed,
      anchor,
      intensity,
      dust,
      tone: resolvedTone,
    };
  }, [seed, anchor, intensity, dust, resolvedTone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: 'low-power',
    });

    if (!gl) {
      setFallback(true);
      return;
    }

    const program = createSmokeProgram(gl);
    if (!program) {
      setFallback(true);
      return;
    }

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uScale = gl.getUniformLocation(program, 'uScale');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uSeed = gl.getUniformLocation(program, 'uSeed');
    const uAnchor = gl.getUniformLocation(program, 'uAnchor');
    const uIntensity = gl.getUniformLocation(program, 'uIntensity');
    const uDust = gl.getUniformLocation(program, 'uDust');
    const uTheme = gl.getUniformLocation(program, 'uTheme');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let cssW = 1;
    let cssH = 1;
    let time = 0;
    let raf = 0;
    let last = performance.now();
    let inView = false;

    const reducedMotionMedia = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    let reduceMotion = reducedMotionMedia.matches;

    const render = () => {
      if (gl.isContextLost()) return;
      const p = paramsRef.current;
      const [ax, ay] = ANCHOR_UV[p.anchor];
      const scale = Math.max(0.35, Math.min(cssW / 640, cssH / 520));
      const isLight = p.tone === 'light' ? 1 : 0;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uResolution, cssW, cssH);
      gl.uniform1f(uScale, scale);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uSeed, p.seed);
      gl.uniform2f(uAnchor, ax, ay);
      gl.uniform1f(uIntensity, p.intensity);
      gl.uniform1f(uDust, p.dust);
      gl.uniform1f(uTheme, isLight);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.disableVertexAttribArray(aPosition);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt * 0.72;
      render();
    };

    const start = () => {
      if (reduceMotion || raf || !inView || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cssW = Math.max(1, Math.round(rect.width));
      cssH = Math.max(1, Math.round(rect.height));
      // Mandatory guardrail: Cap DPR at 1.0 for near-zero GPU cost
      const w = cssW;
      const h = cssH;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      render();
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
      } else if (inView && !document.hidden) {
        start();
      }
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      stop();
      setFallback(true);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        if (inView && !document.hidden) {
          render();
          start();
        } else {
          stop();
        }
      },
      { rootMargin: '120px', threshold: 0 }
    );
    intersection.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      if (!raf) render();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-tone'],
    });

    canvas.addEventListener('webglcontextlost', onContextLost);
    reducedMotionMedia.addEventListener('change', onReducedMotionChange);
    document.addEventListener('visibilitychange', onVisibility);

    resize();

    return () => {
      stop();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      reducedMotionMedia.removeEventListener('change', onReducedMotionChange);
      document.removeEventListener('visibilitychange', onVisibility);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      gl.deleteBuffer(quadBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  if (fallback) {
    const pos = FALLBACK_POS[anchor];
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 select-none ${className}`}
        style={{
          background:
            resolvedTone === 'light'
              ? `radial-gradient(closest-side at ${pos}, rgba(13, 75, 250, 0.10) 0%, rgba(13, 75, 250, 0.03) 52%, transparent 82%)`
              : `radial-gradient(closest-side at ${pos}, rgba(13, 75, 250, 0.18) 0%, rgba(13, 75, 250, 0.05) 54%, transparent 84%)`,
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden select-none ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
