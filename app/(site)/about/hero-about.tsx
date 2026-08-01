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

  float character(float n, vec2 p) {
    p = floor(p * vec2(-4.0, 4.0) + 2.5);
    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y) {
      float k = p.x + 5.0 * p.y;
      if (mod(floor(n / exp2(k)), 2.0) == 1.0) return 1.0;
    }
    return 0.0;
  }

  // her hücre kendi zaman ofsetinde flip olur -> gerçek matrix rain hissi, global "cut" yok
  float cellHash(vec2 id) {
    return fract(sin(dot(id, vec2(93.989, 67.345))) * 43758.5453);
  }

 // her sütun kendi hızında akar -> gerçek matrix rain
float cellHash(vec2 id) {
  return fract(sin(dot(id, vec2(93.989, 67.345))) * 43758.5453);
}

float ascii(vec2 fragCoord, float brightness) {
  float cell = 16.0;                       // 12 -> 16, karakterler büyüdü
  vec2 p = mod(fragCoord / (cell * 0.5), 2.0) - vec2(1.0);
  vec2 id = floor(fragCoord / cell);

  // sütun hızı daralt: 0.6-2.4 -> 0.3-0.9, çarpan 2.4 -> 0.9 (yavaş, okunabilir akış)
  float colSpeed = 0.3 + cellHash(vec2(id.x, 0.0)) * 0.6;
  float flow = uTime * uMotion * colSpeed * 0.9;

  vec2 flowId = vec2(id.x, id.y - flow);
  vec2 snappedId = floor(flowId);

  float offset = cellHash(snappedId) * 12.0;
  float localTime = uTime * uMotion + offset;
  float rnd = fract(sin(dot(snappedId, vec2(12.9898, 78.233)) + floor(localTime * 0.6)) * 43758.5453);
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

    float t = uTime * 0.11 * uMotion;

    // fare olmasa da hep hareket etsin
    vec2 idleDrift = vec2(cos(uTime * 0.055), sin(uTime * 0.041)) * 0.24 * uMotion;
    vec2 mouse = uMouse * 0.15 + idleDrift;

    vec2 q = vec2(
      fbm(st * 1.4 + vec2(t * 0.9, -t * 0.6)),
      fbm(st * 1.4 + vec2(-t * 0.5, t * 0.8) + 3.7)
    );
    vec2 r = vec2(
      fbm(st * 1.8 + q * 1.6 + vec2(1.7, 9.2) + t + mouse),
      fbm(st * 1.8 + q * 1.6 + vec2(8.3, 2.8) - t - mouse)
    );
    float field = fbm(st * 1.6 + r * 1.9);

    vec2 center = vec2(0.30, 0.02) + mouse * 0.6;
    float d = length(st - center);
    float wobble = fbm(st * 2.2 + r + t * 1.5) * 0.24;
    float core = 1.0 - smoothstep(0.05, 0.62 + wobble, d);
    float halo = 1.0 - smoothstep(0.0, 1.15, d);

    float energy = core * (0.42 + 0.40 * (field * 0.5 + 0.5));
    energy += halo * 0.18 * (r.x * 0.5 + 0.5);
    float scrim = smoothstep(-0.05, -0.55, st.x);
    energy *= 1.0 - scrim * 0.65;
    energy = clamp(energy, 0.0, 1.0);

    float hueShift = field * 0.5 + 0.5 + q.y * 0.3;
    vec3 col = palette(clamp(energy * 1.15 + hueShift * 0.18 - 0.08, 0.0, 1.0));

    col += palette(0.85) * pow(core, 3.0) * 0.55;
    col += vec3(0.10, 0.20, 0.55) * halo * 0.30;

    float fog = fbm(vec2(st.x * 1.5, st.y * 3.0 + t * 2.0)) * smoothstep(0.1, -0.6, st.y);
    col += vec3(0.05, 0.08, 0.20) * fog * 0.8;

    float brightness = dot(col, vec3(0.299, 0.587, 0.114));
    float glyph = ascii(gl_FragCoord.xy, brightness);
    float asciiMask = smoothstep(0.30, 0.62, brightness);
    col += vec3(0.65, 0.85, 1.0) * glyph * asciiMask * 0.16;
    col = mix(col, col * (0.80 + 0.20 * glyph), asciiMask * 0.4);

    float grain = fract(sin(dot(gl_FragCoord.xy + uTime * 60.0, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.035;

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

  // WebGL context kaybını sessizce toparlar — arayüzde hiçbir şey göstermez
  useEffect(() => {
    const canvas = gl.domElement
    const handleLost = (e: Event) => e.preventDefault()
    canvas.addEventListener('webglcontextlost', handleLost, false)
    return () => canvas.removeEventListener('webglcontextlost', handleLost)
  }, [gl])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30) // sekme değişiminde zıplama olmasın
    uniforms.uTime.value += dt
    uniforms.uMotion.value = reducedMotion ? 0.4 : 1 // reduced-motion'da tam durmaz, yavaşlar
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

// ==================== CONTENT ====================

function HeroContent() {
  const [email, setEmail] = useState('')

  return (
    <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-10 md:px-16 lg:px-24 pointer-events-none">
      <div className="pointer-events-auto max-w-3xl pt-20 md:pt-28">
        <h1 className="text-4xl font-light leading-[1.15] tracking-tight text-white md:text-6xl lg:text-7xl">
          Empowers creators to design experiences
          <br />
          <span className="italic font-serif">that inspire, not just function</span>
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            console.log(email)
          }}
          className="mt-12 flex w-full max-w-lg items-center gap-2 rounded-full border border-white/20 bg-white/5 px-2 py-2 backdrop-blur-md"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-transparent px-5 text-sm text-white placeholder-white/40 outline-none focus:outline-none focus:ring-0 focus:shadow-none [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_transparent] [&:-webkit-autofill]:[-webkit-text-fill-color:white] invalid:shadow-none invalid:outline-none"
            style={{ boxShadow: 'none' }}
            required
          />
          <button
            type="submit"
            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
          >
            Get started →
          </button>
        </form>
      </div>

      <footer className="pointer-events-auto flex flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end md:justify-between" />
    </div>
  )
}

// ==================== MAIN ====================

export function HeroShader() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionMq.matches)
    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    motionMq.addEventListener('change', onMotionChange)

    const mobileMq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mobileMq.matches)
    const onMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mobileMq.addEventListener('change', onMobileChange)

    return () => {
      motionMq.removeEventListener('change', onMotionChange)
      mobileMq.removeEventListener('change', onMobileChange)
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#02040f]">
      <div className="absolute inset-0" aria-hidden="true">
        <Canvas
          dpr={isMobile ? 0.75 : 1.5}
          gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
          frameloop="always"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <ShaderPlane reducedMotion={reducedMotion} />
        </Canvas>
      </div>

      <HeroContent />
    </div>
  )
}