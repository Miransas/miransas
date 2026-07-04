"use client";

import {
  Sparkles,
  ArrowRight,
  X,
  Check,
  Clock,
  Zap,
  Target,
  Globe,
  Cpu,
  Gamepad2,
  Server,
  Code2,
  ArrowUpRight,
  Mail,
} from "lucide-react";

const philosophy = [
  {
    icon: Target,
    title: "Impact over headcount",
    desc: "One senior engineer ships more than five juniors. We don't hire to scale ego, we ship to scale systems.",
  },
  {
    icon: Zap,
    title: "Deep work, no meetings",
    desc: "No standups, no sprints, no retrospectives. Async communication, documented decisions, shipped code.",
  },
  {
    icon: Globe,
    title: "Remote by design",
    desc: "Izmir-based, globally distributed. Work from anywhere, ship to everywhere. Results are the only metric.",
  },
];

const currentWork = [
  {
    icon: Gamepad2,
    title: "Project Sad",
    status: "In Development",
    desc: "Narrative-driven indie game. Custom ECS, handcrafted assets, emotional storytelling.",
    stack: ["Rust", "Bevy", "Blender"],
    type: "Game",
  },
  {
    icon: Server,
    title: "Binboi Infrastructure",
    status: "Active",
    desc: "Zero-allocation Go networking. Reverse proxy, tunneling, load balancing.",
    stack: ["Go", "gRPC", "Kubernetes"],
    type: "Infrastructure",
  },
  {
    icon: Cpu,
    title: "Rust Engine",
    status: "Active",
    desc: "1600+ Elo chess AI. Bitboards, magic bitboards, parallel search.",
    stack: ["Rust", "WASM", "Algorithms"],
    type: "Engine",
  },
  {
    icon: Code2,
    title: "Miransas Core",
    status: "Live",
    desc: "This website. Next.js 15, Three.js shaders, premium UX without bloat.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    type: "Web",
  },
];

const collaborations = [
  {
    type: "Technical Partner",
    desc: "You have deep expertise in a complementary domain (graphics, audio, security) and want to build together.",
    ideal: "Senior engineer, 5+ years, open source contributor",
  },
  {
    type: "Design Contractor",
    desc: "You craft interfaces that feel inevitable. No trends, no Dribbble copycats. Timeless design.",
    ideal: "Product designer, portfolio of shipped work",
  },
  {
    type: "Advisor",
    desc: "You've built and exited companies. You see around corners. You challenge assumptions.",
    ideal: "Former CTO/founder, sector-specific expertise",
  },
];

export default function CareersPage() {
  return (
    <main className="w-full bg-black selection:bg-neutral-800 selection:text-white">
      
      {/* ===== HERO: Solo studio narrative ===== */}
      <section className="relative border-b border-white/10 pb-32 pt-32 md:pt-40">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur-xl">
            <Sparkles className="size-4 text-amber-400" />
            Solo Studio
          </div>
          
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
                Not hiring.
                <br />
                <span className="text-neutral-500">Always building.</span>
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-xl leading-relaxed text-neutral-400">
                Miransas is intentionally a solo operation. No employees, no managers, 
                no bureaucracy. Just one engineer, obsessive focus, and a refusal to 
                compromise on quality.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-neutral-500">
                That said, interesting people with interesting problems sometimes 
                lead to interesting collaborations. Read on if that's you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY: Why solo ===== */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Principles
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Why one person?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {philosophy.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-3xl bg-[#111] p-8 transition-all duration-500 hover:bg-[#1a1a1a] md:p-10"
                >
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl transition-all group-hover:bg-amber-500/20" />
                  
                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="size-6 text-amber-400" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-neutral-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CURRENT WORK: What I'm building ===== */}
      <section className="relative bg-[#F6F5F2] py-32 text-neutral-900">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Active Projects
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              What I'm shipping.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {currentWork.map((project) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.title}
                  className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-lg md:p-10"
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
                        <Icon className="size-6 text-neutral-900" />
                      </div>
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                          project.status === "Live"
                            ? "bg-emerald-50 text-emerald-600"
                            : project.status === "Active"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="mt-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        {project.type}
                      </span>
                      <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
                      <p className="mt-3 text-base leading-relaxed text-neutral-500">
                        {project.desc}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== COLLABORATIONS: How to work together ===== */}
      <section className="relative py-32 text-white">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Collaborations
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              When we might work together.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-neutral-500">
              Not employment. Not contracting. Strategic collaborations with 
              people who raise the bar.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {collaborations.map((col, i) => (
              <div
                key={col.type}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-8 transition-all duration-500 hover:border-white/20 md:p-10"
              >
                <div className="relative z-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                    <span className="text-sm font-bold text-amber-400">0{i + 1}</span>
                  </div>
                  
                  <h3 className="mt-6 text-xl font-semibold text-white">
                    {col.type}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-500">
                    {col.desc}
                  </p>
                  
                  <div className="mt-6 rounded-2xl bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Ideal profile
                    </p>
                    <p className="mt-2 text-sm text-neutral-300">
                      {col.ideal}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA: Reach out ===== */}
      <section className="relative border-t border-white/10 py-32 text-white">
        <div className="mx-auto max-w-[90rem] px-6 text-center md:px-12">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Have a problem worth solving?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
            I don't read resumes. I read code, I read writing, and I listen to 
            people who care deeply about their craft.
          </p>
          
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hello@miransas.com"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-8 text-base font-semibold text-black transition-all hover:bg-neutral-200 hover:scale-[1.02]"
            >
              <Mail className="size-5" />
              Send something interesting
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://github.com/miransas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10"
            >
              <Code2 className="size-5" />
              Read my code first
            </a>
          </div>
          
          <p className="mt-8 text-sm text-neutral-600">
            No recruiters. No "quick calls". No "exploring opportunities". 
            Just craft.
          </p>
        </div>
      </section>
    </main>
  );
}