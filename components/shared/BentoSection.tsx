"use client";

import {
  Zap,
  Gamepad2,
  Server,
  Cpu,
  Code2,
  ArrowRight,
  ArrowUpRight,
  Quote,
  Sparkles,
} from "lucide-react";

const stats = [
  { value: "12+", label: "Projects Shipped", desc: "From games to infrastructure" },
  { value: "1600+", label: "Engine Elo", desc: "Rust chess engine performance" },
  { value: "99.9%", label: "Uptime SLA", desc: "Binboi infrastructure" },
];

const techStack = [
  { name: "Next.js", icon: Code2, color: "text-white" },
  { name: "Go", icon: Server, color: "text-cyan-400" },
  { name: "Rust", icon: Cpu, color: "text-orange-400" },
  { name: "TypeScript", icon: Code2, color: "text-blue-400" },
  { name: "Tailwind", icon: Zap, color: "text-sky-400" },
  { name: "Three.js", icon: Gamepad2, color: "text-white" },
];

export default function BentoSection() {
  return (
    <section className="bg-black py-32 text-white">
      <div className="mx-auto max-w-[90rem] px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur-xl">
            <Sparkles className="size-4 text-amber-400" />
            Why Miransas
          </div>
          <h2 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
            One engineer.
            <br />
            <span className="text-neutral-500">Zero compromises.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          
          {/* 1. Large: Stats */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#111] p-8 md:col-span-2 lg:col-span-2">
            <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl" />
            
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                By the numbers
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl font-bold tracking-tight md:text-5xl">
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
          </div>

          {/* 2. Medium: Philosophy */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#111] p-8 md:col-span-1 lg:col-span-1">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <Zap className="size-6 text-amber-400" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">
                  Performance first
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  Every millisecond matters. From Rust bitboards to Go zero-allocation middleware.
                </p>
              </div>
              <a
                href="/projects"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
              >
                See the work <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          {/* 3. Medium: Testimonial */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#111] p-8 md:col-span-1 lg:col-span-1">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <Quote className="size-8 text-neutral-700" />
              <div>
                <p className="text-lg leading-relaxed text-neutral-300">
                  "Since launching Binboi, our infrastructure costs dropped 40% while handling 3x traffic."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800">
                    <span className="text-xs font-bold text-white">M</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Early Adopter</p>
                    <p className="text-xs text-neutral-500">Binboi Pro user</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Full width: Tech Stack */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#111] p-8 md:col-span-3 lg:col-span-4">
            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                  Technology
                </p>
                <h3 className="mt-2 text-2xl font-semibold">
                  Built with tools we trust
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {techStack.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="group flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-3 transition-all hover:bg-white/10"
                    >
                      <Icon className={`size-5 ${tech.color}`} />
                      <span className="text-sm font-medium">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 5. Large: CTA */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-amber-500 p-8 md:col-span-2 lg:col-span-2">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold text-black">
                  Start building today
                </h3>
                <p className="mt-3 text-base leading-relaxed text-black/70">
                  No sales calls, no demos, no enterprise contracts. Just pick a plan and ship.
                </p>
              </div>
              <a
                href="/pricing"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-900"
              >
                View pricing <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          {/* 6. Medium: Open Source */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#111] p-8 md:col-span-1 lg:col-span-2">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <Code2 className="size-6 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">
                  Open source core
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  Key components available on GitHub. MIT licensed, community maintained.
                </p>
              </div>
              <a
                href="https://github.com/miransas"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
              >
                github.com/miransas <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}