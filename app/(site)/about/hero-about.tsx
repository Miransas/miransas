'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uMotion;

  // ---------- simplex noise ----------
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p);
      p = rot * p * 2.02;
      amplitude *= 0.5;
    }
    return value;
  }

  // ---------- ascii glyphs ----------
  float character(float n, vec2 p) {
    p = floor(p * vec2(-4.0, 4.0) + 2.5);
    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y) {
      float k = p.x + 5.0 * p.y;
      if (mod(floor(n / exp2(k)), 2.0) == 1.0) return 1.0;
    }
    return 0.0;
  }

  float ascii(vec2 fragCoord, float brightness) {
    float cell = 12.0;
    vec2 p = mod(fragCoord / (cell * 0.5), 2.0) - vec2(1.0);
    vec2 id = floor(fragCoord / cell);
    float rnd = fract(sin(dot(id, vec2(12.9898, 78.233)) + floor(uTime * 0.6 * uMotion)) * 43758.5453);
    float b = brightness + rnd * 0.15;

    float n = 4096.0;
    if (b > 0.25) n = 65600.0;
    if (b > 0.35) n = 332772.0;
    if (b > 0.45) n = 4357252.0;
    if (b > 0.55) n = 18157905.0;
    if (b > 0.66) n = 15255086.0;
    if (b > 0.78) n = 12652620.0;
    if (b > 0.9)  n = 13199452.0;

    return character(n, p);
  }

  // ---------- palette ----------
  vec3 palette(float t) {
    vec3 deep   = vec3(0.016, 0.024, 0.075);
    vec3 blue   = vec3(0.10, 0.28, 0.85);
    vec3 cyan   = vec3(0.15, 0.80, 0.95);
    vec3 violet = vec3(0.48, 0.30, 0.90);
    vec3 pink   = vec3(0.95, 0.55, 0.80);

    vec3 c = mix(deep, blue, smoothstep(0.0, 0.35, t));
    c = mix(c, violet, smoothstep(0.3, 0.6, t));
    c = mix(c, cyan, smoothstep(0.55, 0.8, t) * 0.65);
    c = mix(c, pink, smoothstep(0.8, 1.0, t) * 0.5);
    return c;
  }

  void main() {
    vec2 uv = vUv;
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);

    float t = uTime * 0.08 * uMotion;
    vec2 mouse = uMouse * 0.15;

    // flowing liquid domain warp
    vec2 q = vec2(
      fbm(st * 1.4 + vec2(t * 0.9, -t * 0.6)),
      fbm(st * 1.4 + vec2(-t * 0.5, t * 0.8) + 3.7)
    );
    vec2 r = vec2(
      fbm(st * 1.8 + q * 1.6 + vec2(1.7, 9.2) + t + mouse),
      fbm(st * 1.8 + q * 1.6 + vec2(8.3, 2.8) - t - mouse)
    );
    float field = fbm(st * 1.6 + r * 1.9);

    // central energy shape
    vec2 center = vec2(0.30, 0.02) + mouse * 0.6;
    float d = length(st - center);
    float wobble = fbm(st * 2.2 + r + t * 1.5) * 0.24;
    float core = 1.0 - smoothstep(0.05, 0.62 + wobble, d);
    float halo = 1.0 - smoothstep(0.0, 1.15, d);

    // energy intensity
    float energy = core * (0.42 + 0.40 * (field * 0.5 + 0.5));
    energy += halo * 0.18 * (r.x * 0.5 + 0.5);
    float scrim = smoothstep(-0.05, -0.55, st.x);
    energy *= 1.0 - scrim * 0.65;
    energy = clamp(energy, 0.0, 1.0);

    // color
    float hueShift = field * 0.5 + 0.5 + q.y * 0.3;
    vec3 col = palette(clamp(energy * 1.15 + hueShift * 0.18 - 0.08, 0.0, 1.0));

    // glow
    col += palette(0.85) * pow(core, 3.0) * 0.55;
    col += vec3(0.10, 0.20, 0.55) * halo * 0.30;

    // fog
    float fog = fbm(vec2(st.x * 1.5, st.y * 3.0 + t * 2.0)) * smoothstep(0.1, -0.6, st.y);
    col += vec3(0.05, 0.08, 0.20) * fog * 0.8;

    // ascii layer
    float brightness = dot(col, vec3(0.299, 0.587, 0.114));
    float glyph = ascii(gl_FragCoord.xy, brightness);
    float asciiMask = smoothstep(0.30, 0.62, brightness);
    col += vec3(0.65, 0.85, 1.0) * glyph * asciiMask * 0.16;
    col = mix(col, col * (0.80 + 0.20 * glyph), asciiMask * 0.4);

    // grain
    float grain = fract(sin(dot(gl_FragCoord.xy + uTime * 60.0, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.035;

    // vignette
    float vig = smoothstep(1.25, 0.35, length((uv - 0.5) * vec2(1.6, 1.25)));
    col *= mix(0.35, 1.0, vig);
    col = max(col, vec3(0.012, 0.016, 0.045) * vig);

    gl_FragColor = vec4(col, 1.0);
  }
`

function ShaderPlane({ reducedMotion }: { reducedMotion: boolean }) {
  const { size, gl } = useThree()
  const mouseTarget = useRef(new THREE.Vector2(0, 0))

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMotion: { value: 1 },
    }),
    []
  )

  // Resize'da çözünürlüğü güncelle (her frame değil)
  useEffect(() => {
    const dpr = gl.getPixelRatio()
    uniforms.uResolution.value.set(size.width * dpr, size.height * dpr)
  }, [size, gl, uniforms])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseTarget.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      )
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state) => {
    // Eğer reducedMotion açıksa uTime'ı dondur (statik kalır)
    if (!reducedMotion) {
      uniforms.uTime.value = state.clock.elapsedTime
    }
    uniforms.uMotion.value = reducedMotion ? 0 : 1
    uniforms.uMouse.value.lerp(mouseTarget.current, 0.035)
  })

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

export function HeroShader() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)

    const mobile = window.matchMedia('(max-width: 768px)')
    setIsMobile(mobile.matches)
    const onMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mobile.addEventListener('change', onMobile)

    return () => {
      mq.removeEventListener('change', onChange)
      mobile.removeEventListener('change', onMobile)
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#02040f]">
      <div className="absolute inset-0" aria-hidden="true">
        <Canvas
          key={isMobile ? 'mobile' : 'desktop'}
          dpr={isMobile ? 0.75 : [1, 1.75]}
          gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
          frameloop={reducedMotion ? 'never' : 'always'}
          className="absolute inset-0 h-full w-full"
        >
          <ShaderPlane reducedMotion={reducedMotion} />
        </Canvas>
      </div>

      {/* İçerik katmanı */}
      <div className="relative z-10 pointer-events-none">
        {/* Metin, input, footer buraya eklenebilir */}
      </div>
    </div>
  )
}