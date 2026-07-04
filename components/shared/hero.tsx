"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import * as THREE from "three";

export function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-black text-white">
      <ShaderBackdrop />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,rgba(0,0,0,0.24)_36%,rgba(0,0,0,0.86)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#030303] to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-16 pt-32 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-zinc-200 backdrop-blur-xl">
            <Sparkles className="size-4 text-lime-300" />
            Miransas creative engineering studio
          </div>

          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Not just another software company.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            Miransas builds secure software,
            modern infrastructure,
            and intelligent systems
            designed for the future.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-lime-200"
            >
              Built on Three Frames.
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/15"
            >
              <PlayCircle className="size-4" />
              Connected by Three Circles.
            </Link>
          </div>
        </div>

        <div className="mt-16 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          <HeroStat value="Security" label="Privacy-first software engineering" />
          <HeroStat value="Infrastructure" label="Cloud-native platforms & backend systems" />
          <HeroStat value="Intelligence" label="AI automation and modern tooling" />
        </div>
      </div>
    </section>
  );
}

function ShaderBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float speed;

      // Smooth noise function for organic movement
      float hash(float n) {
        return fract(sin(n) * 43758.5453123);
      }

      float noise(vec2 x) {
        vec2 i = floor(x);
        vec2 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        float n = i.x + i.y * 57.0;
        return mix(mix(hash(n), hash(n + 1.0), f.x),
                   mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        // Use elapsed time directly for smooth continuous animation
        float t = time * speed;
        
        // Create organic flowing pattern
        float lineWidth = 0.003;
        vec3 color = vec3(0.0);
        
        // Multiple layers with different frequencies
        for (int j = 0; j < 3; j++) {
          float layerOffset = float(j) * 1.5;
          
          for (int i = 1; i <= 5; i++) {
            float fi = float(i);
            float freq = fi * 0.3;
            float amp = fi * fi * 0.02;
            
            // Use sin/cos for smooth oscillation instead of fract
            float wave1 = sin(uv.x * freq + t * (0.5 + layerOffset) + fi) * amp;
            float wave2 = cos(uv.y * freq * 0.7 + t * (0.3 + layerOffset) + fi * 1.3) * amp;
            float wave3 = sin((uv.x + uv.y) * freq * 0.5 + t * 0.4 + fi * 0.7) * amp;
            
            float pattern = wave1 + wave2 + wave3;
            float dist = length(uv) + pattern;
            
            // Smooth line rendering
            float line = lineWidth * fi * fi / abs(dist + mod(uv.x + uv.y + t * 0.1, 0.3));
            color[j] += line;
          }
        }

        // Lime-green tint matching your theme
        color *= vec3(0.75, 1.0, 0.58);
        
        // Add subtle glow
        float glow = 0.02 / (length(uv) + 0.5);
        color += vec3(0.75, 1.0, 0.58) * glow * 0.3;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    const uniforms = {
      time: { value: 0.0 },
      resolution: { value: new THREE.Vector2() },
      speed: { value: 0.3 }, // Adjust this for faster/slower animation
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    scene.add(new THREE.Mesh(geometry, material));

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const onWindowResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.resolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height,
      );
    };

    const animate = () => {
      // Use elapsed time from start for smooth continuous animation
      const elapsed = (Date.now() - startTimeRef.current) / 1000.0;
      uniforms.time.value = elapsed;
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    startTimeRef.current = Date.now();
    onWindowResize();
    window.addEventListener("resize", onWindowResize);
    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      cancelAnimationFrame(animationRef.current);
      
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-white/15 bg-black/20 px-5 py-4 backdrop-blur-sm">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-sm text-zinc-400">{label}</div>
    </div>
  );
}