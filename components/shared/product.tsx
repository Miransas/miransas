"use client";

import Link from "next/link";
import { Reveal } from "./reval";
import { ArrowRight } from "lucide-react";

const products = [
  {
    title: "Miralas Voice",
    body: "Real-time speech synthesis and neural voice cloning with sub-second latency.",
    to: "/miralas",
    preview: "voice" as const,
  },
  {
    title: "Rust Core",
    body: "High-performance memory-safe microservices powered by Axum and Tokio.",
    to: "/backend",
    preview: "build" as const,
  },
  {
    title: "Neural Agent",
    body: "Autonomous voice agents that handle multi-language conversations 24/7.",
    to: "/agents",
    preview: "bot" as const,
  },
  {
    title: "Studio API",
    body: "Custom dataset training scripts and multilingual voice actor pipelines.",
    to: "/api/studio",
    preview: "imagine" as const,
  },
  {
    title: "Next.js Edge",
    body: "Lightning-fast React interfaces styled with Tailwind CSS and pnpm.",
    to: "/",
    preview: "chat" as const,
  },
];

function MiniPreview({ kind }: { kind: (typeof products)[number]["preview"] }) {
  if (kind === "chat") {
    return (
      <div className="space-y-2">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-black px-3 py-2 text-[11px] text-white">
          Deploy Next.js 16 status app
        </div>
        <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-black px-3 py-2 text-[11px] text-zinc-400 ring-1 ring-black">
          Build optimized, edge-ready in 1.2s…
        </div>
      </div>
    );
  }
  if (kind === "build") {
    return (
      <pre className="rounded-xl bg-black p-3 font-mono text-[10px] leading-relaxed text-emerald-400/90 ring-1 ring-black">
        {`$ cargo run --release
▸ tokio::net::TcpListener
▸ axum routing initialized
Listening on 0.0.0.0:8080`}
      </pre>
    );
  }
  if (kind === "bot") {
    return (
      <div className="rounded-xl bg-black p-3 ring-1 ring-black">
        <p className="text-[11px] font-medium text-white">Multilingual Stream</p>
        <p className="mt-1 text-[11px] text-zinc-400">
          Uzbek, Russian, and English voice synthesis active.
        </p>
        <span className="mt-2 inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 border border-emerald-500/20">
          Active Node
        </span>
      </div>
    );
  }
  if (kind === "imagine") {
    return (
      <div className="grid grid-cols-3 gap-1.5">
        <div className="aspect-square rounded-lg bg-black flex items-center justify-center text-[10px] font-mono text-zinc-400">uz</div>
        <div className="aspect-square rounded-lg bg-black flex items-center justify-center text-[10px] font-mono text-zinc-400">ru</div>
        <div className="aspect-square rounded-lg bg-black flex items-center justify-center text-[10px] font-mono text-zinc-400">en</div>
      </div>
    );
  }
  return (
    <div className="flex h-16 items-end gap-1 px-2">
      {[40, 70, 55, 90, 45, 80, 60, 35].map((h, i) => (
        <span
          key={i}
          className="flex-1 rounded-full bg-emerald-500/80"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

const Product = () => {
  return (
    <div>
      <section className="container-page py-16 md:py-24 bg-black">
        <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
          {products.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04} className="min-w-[220px] flex-1 md:min-w-0">
              <Link
                href={p.to}
                className="group flex h-full flex-col rounded-2xl bg-black p-4 ring-1 ring-white/5 transition-all hover:bg-black hover:ring-white/20"
              >
                <div className="mb-4 min-h-[88px] flex items-center justify-center">
                  <MiniPreview kind={p.preview} />
                </div>
                <h3 className="text-base font-medium text-white">{p.title}</h3>
                <p className="mt-1 flex-1 text-[13px] leading-relaxed text-zinc-400">
                  {p.body}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-emerald-400">
                  Explore
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section> 
    </div>
  );
};

export default Product;