import type { Metadata } from "next";
import { VoiceChat } from "./VoiceChat";

export const metadata: Metadata = {
  title: "Miralas Agent — Voice AI Demo",
  description:
    "LLaMA-3.1 8B + Whisper tiny (0.69s) + multilingual TTS. Türkçe, İngilizce, Özbekçe, Rusça.",
};

export default function AgentPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white">

      {/* Hero + Voice Chat */}
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-8 pb-16 md:pt-16">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          live • whisper tiny 0.69s • llm streaming
        </div>

        <h1 className="max-w-2xl text-center text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Voice agent, <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">canlı</span>.
        </h1>

        <p className="mt-4 max-w-xl text-center text-base text-white/60 md:text-lg">
          Türkçe, İngilizce, Özbekçe, Rusça konuş — o da senin dilinde yanıt versin.
          Sesler edge-tts + Piper, LLM LLaMA-3.1 8B (local Ollama).
        </p>

        <div className="mt-12 w-full max-w-2xl">
          <VoiceChat />
        </div>

        {/* Specs grid */}
        <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "STT", value: "0.69s", sub: "whisper-tiny" },
            { label: "First audio", value: "~7s", sub: "sentence-level" },
            { label: "Session store", value: "Rust", sub: "DashMap" },
            { label: "HTTP", value: "reqwest", sub: "10x faster" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
            >
              <div className="text-[11px] uppercase tracking-wider text-white/40">
                {s.label}
              </div>
              <div className="mt-1 text-2xl font-semibold">{s.value}</div>
              <div className="text-xs text-white/40">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 px-6 py-6 text-center text-xs text-white/40">
        Miralas Agent • open source • made by Sardor Azimov
      </footer>
    </main>
  );
}