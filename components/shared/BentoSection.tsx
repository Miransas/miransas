"use client";

import {
  Zap,
  Server,
  Cpu,
  Code2,
  ArrowRight,
  ArrowUpRight,
  Quote,
  Sparkles,
  Terminal,
  Database,
  Box,
  Layers,
  Activity,
} from "lucide-react";

// Diller ve Sistem Teknolojileri
const techStack = [
  { name: "Rust", icon: Cpu, color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/20" },
  { name: "C", icon: Terminal, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  { name: "C++", icon: Code2, color: "text-cyan-400", bg: "bg-cyan-400/10 border-cyan-400/20" },
  { name: "Go", icon: Server, color: "text-sky-400", bg: "bg-sky-400/10 border-sky-400/20" },
  { name: "Python", icon: Layers, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
  { name: "TypeScript", icon: Code2, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
  { name: "PostgreSQL", icon: Database, color: "text-indigo-400", bg: "bg-indigo-400/10 border-indigo-400/20" },
  { name: "Docker / Linux", icon: Box, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
];

const stats = [
  { value: "12+", label: "Projects Shipped", desc: "Games & high-perf core tools" },
  { value: "1600+", label: "Engine Elo", desc: "Custom Rust chess engine" },
  { value: "99.99%", label: "Uptime SLA", desc: "Low latency infrastructure" },
];

export default function BentoSection() {
  return (
    <section className="relative overflow-hidden bg-black py-32 text-white">
      {/* Background Subtle Mesh Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[600px] rounded-full bg-amber-500/5 blur-[140px]" />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300 backdrop-blur-xl animate-pulse">
            <Sparkles className="size-4 text-amber-400" />
            Why Miransas
          </div>
          <h2 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
            One engineer.
            <br />
            <span className="bg-gradient-to-r from-neutral-400 via-neutral-600 to-neutral-700 bg-clip-text text-transparent">
              Zero compromises.
            </span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          
          {/* 1. Large Stats with Animated Glow */}
          <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0c0c0c] p-8 transition-all duration-500 hover:border-amber-500/30 md:col-span-2 lg:col-span-2">
            <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-amber-500/20" />
            
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                    By the numbers
                  </p>
                  <span className="flex items-center gap-1.5 text-xs text-amber-400/90 font-mono">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                    </span>
                    Live Analytics
                  </span>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="group/stat">
                      <div className="text-4xl font-bold tracking-tight text-white transition-transform duration-300 group-hover/stat:-translate-y-1 md:text-5xl">
                        {stat.value}
                      </div>
                      <div className="mt-2 text-sm font-semibold text-neutral-300">
                        {stat.label}
                      </div>
                      <div className="mt-1 text-xs text-neutral-500">
                        {stat.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal-like micro indicator */}
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-xs font-mono text-neutral-400">
                <Activity className="size-4 text-emerald-400 animate-pulse" />
                <span>Bitboard engine optimizations target &lt;1.2ms execution</span>
              </div>
            </div>
          </div>

          {/* 2. Performance First (Animated Pulse Icon) */}
          <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0c0c0c] p-8 transition-all duration-500 hover:border-white/20 md:col-span-1 lg:col-span-1">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Zap className="size-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Performance first
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  Every nanosecond counts. Direct memory management, zero-allocation Go routines, and Rust safety guarantees.
                </p>
              </div>
              <a
                href="/projects"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition-all hover:gap-3 hover:text-amber-300"
              >
                See the systems <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          {/* 3. Testimonial */}
          <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0c0c0c] p-8 transition-all duration-500 hover:border-white/20 md:col-span-1 lg:col-span-1">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <Quote className="size-8 text-neutral-700 transition-colors duration-300 group-hover:text-amber-500/40" />
              <div>
                <p className="text-lg leading-relaxed text-neutral-300">
                  "Rewriting core handlers in Rust cut server memory footprint by 65% under peak load."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-800">
                    <span className="text-xs font-bold text-white">M</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Infrastructure Lead</p>
                    <p className="text-xs text-neutral-500">Distributed Systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Technology Stack (Animated Marquee + Dynamic Grid) */}
          <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0c0c0c] p-8 md:col-span-3 lg:col-span-4">
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                    Systems & Core Stack
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    Built with low-level precision & resilience
                  </h3>
                </div>
              </div>

              {/* Tech Badges Grid with Subtle Hover Glow */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                {techStack.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className={`group/tech flex flex-col items-center justify-center gap-2 rounded-2xl border ${tech.bg} p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/10`}
                    >
                      <Icon className={`size-6 ${tech.color} transition-transform duration-300 group-hover/tech:scale-110`} />
                      <span className="text-xs font-medium text-neutral-200">{tech.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Animated Infinite Marquee Bar */}
              <div className="relative mt-2 flex overflow-hidden rounded-xl border border-white/5 bg-white/[0.01] py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-8 whitespace-nowrap text-xs font-mono text-neutral-500">
                  <span>/// RUST BITBOARDS</span>
                  <span>/// ZERO-ALLOC GO ROUTINES</span>
                  <span>/// C/C++ MEMORY OPTIMIZATIONS</span>
                  <span>/// POSTGRESQL QUERY TIMINGS &lt;1ms</span>
                  <span>/// DOCKER CONTAINER ORCHESTRATION</span>
                </div>
                <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-8 whitespace-nowrap text-xs font-mono text-neutral-500" aria-hidden="true">
                  <span>/// RUST BITBOARDS</span>
                  <span>/// ZERO-ALLOC GO ROUTINES</span>
                  <span>/// C/C++ MEMORY OPTIMIZATIONS</span>
                  <span>/// POSTGRESQL QUERY TIMINGS &lt;1ms</span>
                  <span>/// DOCKER CONTAINER ORCHESTRATION</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. CTA Card (Neon Amber Highlight with Hover Expand) */}
          <div className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-8 transition-all duration-500 hover:shadow-[0_0_50px_rgba(245,158,11,0.3)] md:col-span-2 lg:col-span-2">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3),transparent)] pointer-events-none" />
            
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold text-black tracking-tight">
                  Start building today
                </h3>
                <p className="mt-3 text-base leading-relaxed text-black/80 font-medium max-w-md">
                  No sales calls, no overhead, no enterprise bloat. Direct engineer-to-production pipeline.
                </p>
              </div>
              <a
                href="/pricing"
                className="mt-8 inline-flex items-center justify-between rounded-2xl bg-black px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-neutral-900 group-hover:scale-[1.02]"
              >
                <span>View pricing & plans</span>
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>

          {/* 6. Open Source / GitHub */}
          <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0c0c0c] p-8 transition-all duration-500 hover:border-white/20 md:col-span-1 lg:col-span-2">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-transform duration-500 group-hover:rotate-12">
                  <Code2 className="size-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  Open source core
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  Key components, chess engine modules, and backend utilities are publicly available on GitHub.
                </p>
              </div>
              <a
                href="https://github.com/miransas"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-300 transition-all hover:gap-3 hover:text-white"
              >
                github.com/miransas <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Tailwind CSS Marquee Animation Utility */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}