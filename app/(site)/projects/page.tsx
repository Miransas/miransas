"use client";

import Link from "next/link";
import { ArrowRight, Ghost, Server, Cpu, ExternalLink, ChevronRight, Code2, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const projects = [
  {
    slug: "project-sad",
    title: "Project Sad",
    category: "Independent Game",
    description: "A narrative-driven independent game experience. Built with a custom story engine, dynamic UI systems, and meticulously handcrafted assets centering around the protagonist, Sad.",
    tech: ["Game Dev", "Custom Assets", "Story Architecture"],
    status: "In Development",
    icon: Ghost,
    socials: { github: "#", site: "#" }
  },
  {
    slug: "binboi",
    title: "Binboi",
    category: "Infrastructure",
    description: "A robust client-server architecture engineered for secure, high-performance tunneling and real-world traffic management. Built entirely in Go to scale effortlessly.",
    tech: ["Go", "Networking", "Client/Server"],
    status: "Active",
    icon: Server,
    socials: { github: "#", site: "#" }
  },
  {
    slug: "rust-engine",
    title: "Evaluation Engine",
    category: "Algorithmic System",
    description: "A high-performance algorithmic chess engine currently pushing 1600+ Elo. Engineered from the ground up for raw computational speed and complex board evaluation.",
    tech: ["Rust", "Algorithms", "Performance"],
    status: "Active",
    icon: Cpu,
    socials: { github: "#", site: "#" }
  },
  {
    slug: "miransas-architecture",
    title: "Miransas Core",
    category: "Digital Platform",
    description: "The central organizational structure and digital presence. Designed with strict 'quiet luxury' principles, eliminating heavy animations for pure, unadulterated performance.",
    tech: ["Next.js", "Tailwind", "System Design"],
    status: "Live",
    icon: Code2,
    socials: { github: "#", site: "#" }
  },
];

export default function ProjectsPage() {
  return (
    <main className="w-full bg-black selection:bg-neutral-800 selection:text-white">
      
      {/* --- HERO SECTION WITH SHADER --- */}
      <div className="relative bg-black text-white min-h-[70vh] pb-32">
        
        {/* Shader Background */}
        <ShaderBackdrop />

        {/* Overlay for readability */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.8)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />

        {/* Background Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.02] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

        <section className="relative z-10 flex items-center pt-32 md:pt-40">
          <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
              
              {/* Sol Taraf: Başlık */}
              <div className="lg:col-span-8">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">
                  <Sparkles className="size-4 text-lime-300" />
                  Selected Works
                </div>
                <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
                  We don't build <br />
                  portfolios. <br />
                  <span className="text-neutral-500">We engineer systems.</span>
                </h1>
              </div>

              {/* Sağ Taraf: Meta bilgiler */}
              <div className="lg:col-span-4 flex flex-col gap-6 border-l border-white/10 pl-8">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">Core Focus</h3>
                  <p className="mt-2 text-base text-neutral-400 leading-relaxed">
                    Immersive gaming, scalable Go architectures, and high-performance Rust engines.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Location</h3>
                  <p className="mt-2 text-base text-white">
                    Izmir, Turkey — Global Reach.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* --- LOWER SECTION: IVORY --- */}
      <div className="relative z-10 -mt-16 rounded-t-[3rem] bg-[#F6F5F2] text-neutral-900 pb-32 pt-24 shadow-[0_-10px_40px_rgba(0,0,0,0.15)]">
        
        <section className="mx-auto max-w-[90rem] px-6 md:px-12">
          
          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, idx) => {
              const Icon = project.icon;
              return (
                <div 
                  key={idx}
                  className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-[#111111] p-8 lg:p-10 text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
                >
                  {/* Invisible full-card link */}
                  <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10 rounded-[2rem]">
                    <span className="sr-only">View {project.title} details</span>
                  </Link>

                  {/* Top: Icon & Status */}
                  <div className="relative z-20 flex items-start justify-between pointer-events-none">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-neutral-400">
                      {project.status}
                    </span>
                  </div>
                  
                  {/* Middle: Content */}
                  <div className="relative z-20 mt-8 flex-1 pointer-events-none">
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                      {project.category}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl flex items-center gap-2">
                      {project.title}
                      <ChevronRight className="h-6 w-6 text-neutral-500 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-neutral-400">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Socials (clickable, above invisible link) */}
                  <div className="relative z-30 mt-8 flex items-center gap-3 pt-6 border-t border-white/10">
                    <a href={project.socials.site} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:bg-white hover:text-black">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <a href={project.socials.github} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:bg-white hover:text-black">
                      <FaGithub className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </section>
      </div>
    </main>
  );
}

/* --- SHADER COMPONENT --- */
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
        float t = time * speed;
        
        float lineWidth = 0.002;
        vec3 color = vec3(0.0);
        
        for (int j = 0; j < 3; j++) {
          float layerOffset = float(j) * 1.5;
          for (int i = 1; i <= 5; i++) {
            float fi = float(i);
            float freq = fi * 0.3;
            float amp = fi * fi * 0.015;
            
            float wave1 = sin(uv.x * freq + t * (0.5 + layerOffset) + fi) * amp;
            float wave2 = cos(uv.y * freq * 0.7 + t * (0.3 + layerOffset) + fi * 1.3) * amp;
            float wave3 = sin((uv.x + uv.y) * freq * 0.5 + t * 0.4 + fi * 0.7) * amp;
            
            float pattern = wave1 + wave2 + wave3;
            float dist = length(uv) + pattern;
            
            float line = lineWidth * fi * fi / abs(dist + mod(uv.x + uv.y + t * 0.1, 0.3));
            color[j] += line;
          }
        }

        color *= vec3(0.75, 1.0, 0.58);
        float glow = 0.015 / (length(uv) + 0.5);
        color += vec3(0.75, 1.0, 0.58) * glow * 0.2;
        
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
      speed: { value: 0.2 },
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
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
    };

    const animate = () => {
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