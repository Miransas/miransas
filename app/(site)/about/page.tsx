"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Zap,
  Shield,
  Globe,
  Code2,
  Gamepad2,
  Server,
  Cpu,
  ArrowUpRight,
  Sparkles,
  Target,
  Layers,
  Clock,
  Users,
  ChevronRight,
} from "lucide-react";
import * as THREE from "three";

// --- DATA ---

const timeline = [
  {
    year: "2022",
    title: "Miransas Founded",
    desc: "Started as a solo engineering studio in Izmir, Turkey. Focus on systems, not products.",
    icon: Sparkles,
  },
  {
    year: "2023",
    title: "Binboi Infrastructure",
    desc: "First production-grade networking system. Built entirely in Go for real-world traffic.",
    icon: Server,
  },
  {
    year: "2024",
    title: "Project Sad Begins",
    desc: "Narrative-driven game development with custom story engine and handcrafted assets.",
    icon: Gamepad2,
  },
  {
    year: "2025",
    title: "Rust Engine 1600+ Elo",
    desc: "High-performance chess engine reaching competitive level. Raw speed, zero shortcuts.",
    icon: Cpu,
  },
  {
    year: "2026",
    title: "Global Reach",
    desc: "Remote-first team. Open source contributions. Infrastructure serving global traffic.",
    icon: Globe,
  },
];

const principles = [
  {
    icon: Target,
    title: "Precision",
    desc: "Every line of code is intentional. No bloat, no shortcuts, no technical debt we don't understand.",
  },
  {
    icon: Shield,
    title: "Security",
    desc: "Privacy-first by design. We don't collect what we don't need. We don't trust what we can't verify.",
  },
  {
    icon: Zap,
    title: "Performance",
    desc: "Milliseconds matter. Whether it's a game frame or a network packet, speed is a feature.",
  },
  {
    icon: Layers,
    title: "Simplicity",
    desc: "Complex systems built from simple parts. We engineer for maintainability, not impressiveness.",
  },
];

const stats = [
  { value: "12+", label: "Projects", suffix: "Shipped" },
  { value: "1600+", label: "Engine Elo", suffix: "Chess AI" },
  { value: "3", label: "Core Products", suffix: "Focused" },
  { value: "100%", label: "Independent", suffix: "Bootstrapped" },
];

// --- SHADER (Amber/Gold tones instead of lime) ---
function ShaderBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      
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
      
      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.15;
        
        vec3 color = vec3(0.0);
        float lineWidth = 0.002;
        
        for (int j = 0; j < 3; j++) {
          float layerOffset = float(j) * 1.2;
          for (int i = 1; i <= 4; i++) {
            float fi = float(i);
            float freq = fi * 0.25;
            float amp = fi * fi * 0.012;
            
            float wave1 = sin(uv.x * freq + t * (0.4 + layerOffset) + fi) * amp;
            float wave2 = cos(uv.y * freq * 0.6 + t * (0.25 + layerOffset) + fi * 1.1) * amp;
            float wave3 = sin((uv.x + uv.y) * freq * 0.4 + t * 0.3 + fi * 0.6) * amp;
            
            float pattern = wave1 + wave2 + wave3;
            float dist = length(uv) + pattern;
            float line = lineWidth * fi * fi / abs(dist + mod(uv.x + uv.y + t * 0.08, 0.25));
            color[j] += line;
          }
        }
        
        // Amber/Gold instead of lime
        color *= vec3(1.0, 0.75, 0.35);
        float glow = 0.012 / (length(uv) + 0.5);
        color += vec3(1.0, 0.75, 0.35) * glow * 0.15;
        
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
    };
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader: `void main(){gl_Position=vec4(position,1.0);}`, fragmentShader });
    scene.add(new THREE.Mesh(geometry, material));

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const onResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
    };

    const start = Date.now();
    const animate = () => {
      uniforms.time.value = (Date.now() - start) / 1000;
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    onResize();
    window.addEventListener("resize", onResize);
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

// --- COMPONENTS ---

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-5xl font-bold tracking-tight text-white md:text-6xl">{value}</span>
      <span className="mt-1 text-sm uppercase tracking-wider text-neutral-500">{suffix}</span>
    </div>
  );
}

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main className="w-full bg-black selection:bg-neutral-800 selection:text-white">
      
      {/* ===== HERO: Full shader background, different tone ===== */}
      <section className="relative min-h-[90vh] overflow-hidden text-white">
        <ShaderBackdrop />
        
        {/* Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.9)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-[90rem] flex-col justify-center px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur-xl">
              <MapPin className="size-4 text-amber-400" />
              Izmir, Turkey — Remote First
            </div>

            <h1 className="max-w-4xl text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl lg:text-9xl">
              Engineering
              <br />
              <span className="text-neutral-500">the quiet</span>
              <br />
              revolution.
            </h1>

            <p className="mt-10 max-w-xl text-lg leading-relaxed text-neutral-400 md:text-xl">
              We build systems that outlast trends. No investors. No agencies. 
              Just relentless engineering, obsessive detail, and software that 
              refuses to be ordinary.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-8 text-base font-semibold text-black transition-all hover:bg-neutral-200 hover:scale-[1.02]"
              >
                Start a project
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/projects"
                className="inline-flex h-14 items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10"
              >
                View our work
                <ArrowUpRight className="size-5" />
              </a>
            </div>
          </motion.div>

          {/* Floating stats bar */}
          <motion.div 
            style={{ y }}
            className="absolute bottom-12 right-6 hidden lg:flex lg:flex-col lg:gap-8 md:right-12"
          >
            {stats.slice(0, 2).map((s) => (
              <AnimatedCounter key={s.label} value={s.value} suffix={s.suffix} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== MANIFESTO: Large text, no cards ===== */}
      <section className="relative border-t border-white/10 py-32 md:py-40">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Philosophy
              </p>
              <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl">
                We don't chase trends.
                <br />
                <span className="text-neutral-600">We build software that survives them.</span>
              </h2>
            </div>
            
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="space-y-12">
                {principles.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-white/10">
                        <p.icon className="size-6 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                        <p className="mt-2 text-base leading-relaxed text-neutral-500">{p.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE: Horizontal scroll on mobile, vertical on desktop ===== */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-32">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              History
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Built over time.
            </h2>
          </div>

          {/* Desktop: Vertical timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Center line */}
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
              
              <div className="space-y-24">
                {timeline.map((item, i) => {
                  const Icon = item.icon;
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className={`relative flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                    >
                      <div className={`w-1/2 ${isLeft ? "pr-16 text-right" : "pl-16 text-left"}`}>
                        <span className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                          {item.year}
                        </span>
                        <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
                        <p className="mt-3 text-base leading-relaxed text-neutral-500">{item.desc}</p>
                      </div>
                      
                      {/* Center dot */}
                      <div className="absolute left-1/2 top-0 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-neutral-900 border border-white/10">
                        <Icon className="size-5 text-white" />
                      </div>
                      
                      <div className="w-1/2" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile: Horizontal scroll cards */}
          <div className="md:hidden -mx-6 flex gap-4 overflow-x-auto px-6 pb-4">
            {timeline.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.year}
                  className="w-72 shrink-0 rounded-2xl bg-neutral-900 p-6 border border-white/5"
                >
                  <Icon className="size-6 text-amber-400 mb-4" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                    {item.year}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== STATS: Bento grid, not cards ===== */}
      <section className="relative py-32">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Studio
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
              By the numbers.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-[#111] p-8 transition-all duration-500 hover:bg-[#1a1a1a]"
              >
                <div className="text-5xl font-bold tracking-tight text-white md:text-6xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-lg font-semibold text-neutral-300">{stat.label}</div>
                <div className="mt-1 text-sm uppercase tracking-wider text-neutral-600">{stat.suffix}</div>
                
                {/* Hover accent */}
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl transition-all group-hover:bg-amber-500/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOCUS AREAS: Asymmetric layout, not uniform cards ===== */}
      <section className="relative bg-[#F6F5F2] py-32 text-neutral-900">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              What We Build
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              Three disciplines.
              <br />
              One obsession.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Large feature: Games */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[2.5rem] bg-[#111] p-10 text-white lg:col-span-7 lg:row-span-2"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.08),transparent_50%)]" />
              
              <div className="relative z-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                  <Gamepad2 className="size-8 text-amber-400" />
                </div>
                <p className="mt-8 text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
                  Project Sad
                </p>
                <h3 className="mt-3 text-4xl font-semibold md:text-5xl">Game Development</h3>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-400">
                  Narrative-driven experiences with custom story engines, dynamic UI systems, 
                  and handcrafted assets. Every frame is intentional.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Gameplay", "Story", "Assets"].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="/projects/project-sad" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400 transition-colors hover:text-amber-300">
                  Explore Project <ChevronRight className="size-4" />
                </a>
              </div>
            </motion.div>

            {/* Medium: Infrastructure */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative overflow-hidden rounded-[2.5rem] bg-[#111] p-10 text-white lg:col-span-5"
            >
              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Server className="size-7 text-amber-400" />
                </div>
                <p className="mt-6 text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
                  Binboi
                </p>
                <h3 className="mt-3 text-3xl font-semibold">Infrastructure</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-400">
                  Scalable backend systems, networking services and cloud architecture 
                  built in Go for real-world traffic.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Go", "Networking", "Cloud"].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Medium: Performance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-[2.5rem] bg-[#111] p-10 text-white lg:col-span-5"
            >
              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Cpu className="size-7 text-amber-400" />
                </div>
                <p className="mt-6 text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
                  Rust Engine
                </p>
                <h3 className="mt-3 text-3xl font-semibold">Performance</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-400">
                  High-performance algorithms and chess engines where every millisecond matters. 
                  1600+ Elo, zero shortcuts.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Rust", "Algorithms", "Optimization"].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA: Simple, not over-designed ===== */}
      <section className="relative bg-black py-32 text-white">
        <div className="mx-auto max-w-[90rem] px-6 text-center md:px-12">
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Ready to build something
            <br />
            <span className="text-neutral-500">that lasts?</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-neutral-400">
            We're selective about projects. If you value precision over speed, 
            and quality over quantity, we should talk.
          </p>
          <a
            href="/contact"
            className="group mt-12 inline-flex h-16 items-center gap-3 rounded-full bg-white px-10 text-lg font-semibold text-black transition-all hover:bg-neutral-200 hover:scale-[1.02]"
          >
            Start a conversation
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}