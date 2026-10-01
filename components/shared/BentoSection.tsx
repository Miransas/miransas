"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bentoitems } from "../../constants/bento";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS (Scroll Animasyonları)
───────────────────────────────────────────────────────────── */
const headerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

const card = {
  hidden: { opacity: 0, y: 48, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const textStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const inner = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const visual = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, delay: 0.15, ease: EASE },
  },
};

/* ─────────────────────────────────────────────────────────────
   MOCK VISUALS (Sahte Arayüz Bileşenleri)
───────────────────────────────────────────────────────────── */

function Waveform({ bars = 28, color = "bg-[#17c9b6]/80" }: { bars?: number, color?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex h-9 items-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const h = 20 + Math.abs(Math.sin(i * 0.55)) * 80;
        return reduce ? (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className={`w-[3px] rounded-full ${color}`}
          />
        ) : (
          <motion.span
            key={i}
            style={{ height: `${h}%` }}
            className={`w-[3px] rounded-full ${color}`}
            animate={{ scaleY: [0.35, 1, 0.5, 0.9, 0.35] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05,
            }}
          />
        );
      })}
    </div>
  );
}

function AgentMock() {
  return (
    <div className="flex h-full min-h-[280px] flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0a0f0e]/80 backdrop-blur-sm p-5 shadow-inner">
      <div className="flex items-center justify-between text-[11px] text-white/50 font-mono">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#17c9b6] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#17c9b6]" />
          </span>
          Live call · Support
        </span>
        <span className="tabular-nums tracking-wider">00:42 · 182 ms</span>
      </div>

      <div className="mt-6 space-y-4 text-[13px] leading-relaxed">
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.02] px-4 py-2.5 text-white/70">
          Hi, I need to change the delivery address for order #48213.
        </div>
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#17c9b6]/10 border border-[#17c9b6]/20 px-4 py-2.5 text-[#d7fbf6]">
          Of course — I've pulled up order #48213. What's the new address?
        </div>
      </div>

      <div className="mt-auto pt-6">
        <Waveform />
        <div className="mt-4 flex items-center justify-between text-[11px] text-white/40 font-mono">
          <span>agent-2 · intent: change_address</span>
          <span className="text-[#17c9b6] flex items-center gap-1">
            resolved <span className="text-[10px]">✓</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function TtsMock() {
  const voices = [
    { lang: "UZ", name: "Dilnoza", active: true },
    { lang: "EN", name: "Ava", active: false },
    { lang: "TR", name: "Mert", active: false },
  ];
  
  return (
    <div className="flex h-full min-h-[280px] flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0d0d0d]/80 backdrop-blur-sm p-5 shadow-inner">
      <div className="flex items-center justify-between text-[11px] text-white/50 font-mono">
        <span>Studio TTS</span>
        <span className="rounded-full border border-white/[0.05] bg-white/[0.03] px-2.5 py-1 text-white/60">
          miransas-tts-1
        </span>
      </div>

      <p className="mt-6 rounded-xl border border-white/[0.03] bg-white/[0.02] px-4 py-4 text-[14px] leading-6 text-white/80 italic">
        "Assalomu alaykum! Buyurtmangiz yo'lga chiqdi."
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {voices.map((v) => (
          <span
            key={v.lang}
            className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
              v.active
                ? "bg-[#17c9b6]/15 border border-[#17c9b6]/30 text-[#8ff0e4]"
                : "bg-white/[0.03] border border-transparent text-white/40 hover:text-white/60"
            }`}
          >
            {v.lang} · {v.name}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <Waveform bars={34} />
        <div className="mt-4 flex items-center justify-between text-[11px] text-white/40 font-mono">
          <span>24 kHz · streaming</span>
          <span>first byte: 96ms</span>
        </div>
      </div>
    </div>
  );
}

function VoiceCloneMock() {
  return (
    <div className="flex h-full min-h-[280px] flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#070908]/80 backdrop-blur-sm p-5 shadow-inner">
      <div className="flex items-center justify-between text-[11px] text-white/50 font-mono">
        <span>Zero-Shot Engine</span>
        <span className="flex items-center gap-1.5 text-[#17c9b6]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#17c9b6]" />
          Engine Ready
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {/* Source Audio Card */}
        <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3.5 transition-colors hover:bg-white/[0.04]">
          <div className="mb-3 flex items-center justify-between text-[10.5px] text-white/40 font-mono">
            <span>Reference (3.2s)</span>
            <span>speaker_01.wav</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] text-white/70 hover:bg-white/20 transition-colors">
              ▶
            </button>
            <div className="flex-1 opacity-40">
              <Waveform bars={14} color="bg-white/80" />
            </div>
          </div>
        </div>

        {/* Processing Indicator */}
        <div className="relative flex justify-center py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-white/[0.1]"></div>
          </div>
          <div className="relative bg-[#070908] px-3 text-[10px] text-white/30 tracking-widest uppercase font-mono">
            generating
          </div>
        </div>

        {/* Generated Output Card */}
        <div className="rounded-xl border border-[#17c9b6]/20 bg-[#17c9b6]/[0.03] p-3.5 shadow-[0_0_20px_rgba(23,201,182,0.03)]">
          <div className="mb-3 flex items-center justify-between text-[10.5px] text-[#17c9b6]/70 font-mono">
            <span>Synthesized Output</span>
            <span>Sim: 99.2%</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17c9b6]/20 text-[10px] text-[#17c9b6] hover:bg-[#17c9b6]/30 transition-colors">
              ▶
            </button>
            <div className="flex-1">
              <Waveform bars={14} color="bg-[#17c9b6]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────────── */

export function Bento() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#050505] px-6 pb-28 pt-24"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Header - Hatalı ve tekrar eden metinler temizlendi */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center text-center md:items-start md:text-left"
        >
          <motion.p
            variants={fadeUp}
            className="text-[12px] font-medium uppercase tracking-[0.22em] text-white/40"
          >
            What we build
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 max-w-2xl text-4xl tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Voice first. <span className="text-white/40">Never voice only.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/50"
          >
            Miransas builds real-time voice agents for companies that talk to
            their customers — plus the TTS models, infrastructure and voice cloning tech
            that make them feel human.
          </motion.p>
        </motion.div>

        {/* Cards / Bento Grid */}
        <div className="mt-16 space-y-6">
          {Bentoitems.map((item, index) => (
            <motion.div
              key={item.tag}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="group grid overflow-hidden rounded-[32px] border border-white/[0.06] bg-[#0a0a0a] transition-colors duration-500 hover:border-white/[0.1] hover:bg-[#0c0c0c] md:grid-cols-2"
            >
              {/* Text side */}
              <motion.div
                variants={textStagger}
                className={`flex flex-col justify-center p-8 md:p-14 ${
                  index === 1 ? "md:order-2" : ""
                }`}
              >
                <motion.p
                  variants={inner}
                  className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#17c9b6]/90"
                >
                  {item.tag}
                </motion.p>
                <motion.h3
                  variants={inner}
                  className="mt-4 text-2xl font-medium tracking-tight text-white md:text-[32px] md:leading-[1.2]"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  variants={inner}
                  className="mt-5 text-[15px] leading-relaxed text-white/50"
                >
                  {item.body}
                </motion.p>
                <motion.p
                  variants={inner}
                  className="mt-8 text-[13px] font-mono text-white/30"
                >
                  {item.aside}
                </motion.p>
              </motion.div>

              {/* Visual side */}
              <motion.div
                variants={visual}
                className={`flex min-h-[320px] items-center justify-center p-6 md:p-10 relative ${
                  index === 1 ? "md:order-1" : ""
                }`}
              >
                {/* Arka plan yumuşak parlama efekti */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#17c9b6]/[0.02] blur-3xl rounded-full pointer-events-none" />
                
                <div className="w-full max-w-md relative z-10">
                  {item.visual === "agents" ? (
                    <AgentMock />
                  ) : item.visual === "tts" ? (
                    <TtsMock />
                  ) : (
                    <VoiceCloneMock />
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}