"use client";

import { useState } from "react";
import {

  ExternalLink,
  Code2,
  Terminal,
  GitBranch,
  Cpu,
  Gamepad2,
  Server,
  Star,
  Copy,
  Check,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Zap,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

const repos = [
  {
    name: "miransas-core",
    description: "Next.js 15 app router, TypeScript, Tailwind. The site you're on right now.",
    lang: "TypeScript",
    stars: 124,
    forks: 18,
    icon: Code2,
    color: "bg-blue-500/10 text-blue-400",
    href: "https://github.com/miransas/miransas-core",
  },
  {
    name: "binboi",
    description: "High-performance tunneling and reverse proxy in Go. Zero-allocation hot path.",
    lang: "Go",
    stars: 89,
    forks: 12,
    icon: Server,
    color: "bg-cyan-500/10 text-cyan-400",
    href: "https://github.com/miransas/binboi",
  },
  {
    name: "rust-engine",
    description: "Chess evaluation engine. 1600+ Elo, bitboards, magic bitboards, PVS search.",
    lang: "Rust",
    stars: 256,
    forks: 34,
    icon: Cpu,
    color: "bg-orange-500/10 text-orange-400",
    href: "https://github.com/miransas/rust-engine",
  },
  {
    name: "project-sad",
    description: "Narrative game engine. Custom ECS, asset pipeline, dynamic dialogue system.",
    lang: "Rust",
    stars: 67,
    forks: 8,
    icon: Gamepad2,
    color: "bg-purple-500/10 text-purple-400",
    href: "https://github.com/miransas/project-sad",
  },
];

const stack = [
  { category: "Frontend", items: ["Next.js ", "React ", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Go", "Rust", "PostgreSQL", "Redis", "gRPC"] },
  { category: "Infrastructure", items: ["Docker", "Kubernetes", "Vercel", "AWS", "Cloudflare"] },
  { category: "Tools", items: ["Neovim", "tmux", "Git", "Figma", "Blender"] },
];

const snippets = [
  {
    title: "Zero-allocation middleware",
    lang: "go",
    code: `func Middleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Pool-allocated buffers, zero heap escapes
        buf := bufPool.Get().(*bytes.Buffer)
        defer bufPool.Put(buf)
        
        next.ServeHTTP(w, r)
    })
}`,
  },
  {
    title: "Bitboard attack generation",
    lang: "rust",
    code: `pub fn rook_attacks(sq: Square, occ: Bitboard) -> Bitboard {
    let mut attacks = Bitboard(0);
    // Magic bitboard lookup, O(1)
    let magic = ROOK_MAGICS[sq.0 as usize];
    let index = ((occ.0.wrapping_mul(magic.0)) >> magic.shift) as usize;
    ROOK_ATTACK_TABLE[sq.0 as usize][index]
}`,
  },
];

export default function DevelopersPage() {
  const [copied, setCopied] = useState<number | null>(null);

  const copyCode = (idx: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="w-full bg-black selection:bg-neutral-800 selection:text-white">
      
      {/* ===== HERO ===== */}
      <section className="relative border-b border-white/10 pb-32 pt-32 md:pt-40">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur-xl">
            <Terminal className="size-4 text-amber-400" />
            Open Source
          </div>
          
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Built in public.
            <br />
            <span className="text-neutral-500">One engineer. Zero shortcuts.</span>
          </h1>
          
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            Miransas is a solo engineering studio. Every line of code is written, 
            reviewed, and shipped by one person. These are the tools of the trade.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="https://github.com/miransas"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-8 text-base font-semibold text-black transition-all hover:bg-neutral-200 hover:scale-[1.02]"
            >
              <FaGithub className="size-5" />
              @miransas
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://miransas.com/blog"
              className="inline-flex h-14 items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10"
            >
              <BookOpen className="size-5" />
              Engineering Blog
            </a>
          </div>
        </div>
      </section>

      {/* ===== REPOS: Bento grid ===== */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Repositories
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Ship code daily.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {repos.map((repo) => {
              const Icon = repo.icon;
              return (
                <a
                  key={repo.name}
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-3xl bg-[#111] p-8 transition-all duration-500 hover:bg-[#1a1a1a] md:p-10"
                >
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl transition-all group-hover:bg-amber-500/20" />
                  
                  <div className="relative z-10 flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${repo.color}`}>
                      <Icon className="size-6" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-400">
                      <Star className="size-3" />
                      {repo.stars}
                      <span className="mx-1 text-neutral-600">|</span>
                      <GitBranch className="size-3" />
                      {repo.forks}
                    </div>
                  </div>

                  <div className="relative z-10 mt-6">
                    <h3 className="text-2xl font-semibold text-white transition-colors group-hover:text-amber-400">
                      {repo.name}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-neutral-500">
                      {repo.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 flex items-center justify-between">
                    <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-400">
                      {repo.lang}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-all group-hover:bg-white/10">
                      <ArrowUpRight className="size-4 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== STACK: Clean list ===== */}
      <section className="relative bg-[#F6F5F2] py-32 text-neutral-900">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Technology
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              The stack.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-neutral-500">
              No bloated frameworks. No dependencies we don't understand. 
              Every tool is chosen for performance, reliability, and long-term maintainability.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stack.map((group) => (
              <div key={group.category} className="rounded-2xl bg-white p-8 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                  {group.category}
                </h3>
                <ul className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base font-medium">
                      <Zap className="size-4 text-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CODE SNIPPETS: Copy-paste ready ===== */}
      <section className="relative py-32 text-white">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Code
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              How we think.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {snippets.map((snip, i) => (
              <div key={i} className="overflow-hidden rounded-3xl bg-[#111]">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Terminal className="size-4 text-amber-400" />
                    <span className="text-sm font-medium text-neutral-300">{snip.title}</span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-neutral-500">
                      {snip.lang}
                    </span>
                  </div>
                  <button
                    onClick={() => copyCode(i, snip.code)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-white/10"
                  >
                    {copied === i ? (
                      <Check className="size-4 text-emerald-400" />
                    ) : (
                      <Copy className="size-4 text-neutral-400" />
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto p-6 text-sm leading-relaxed text-neutral-300">
                  <code>{snip.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative border-t border-white/10 py-32 text-white">
        <div className="mx-auto max-w-[90rem] px-6 text-center md:px-12">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Want to collaborate?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
            Open to interesting problems, open source contributions, and 
            technical discussions. No recruiters, no agencies.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:dev@miransas.com"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-8 text-base font-semibold text-black transition-all hover:bg-neutral-200 hover:scale-[1.02]"
            >
              <MessageSquare className="size-5" />
              Talk technical
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://twitter.com/miransaas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10"
            >
              <ExternalLink className="size-5" />
              Follow updates
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}