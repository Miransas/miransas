"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS (scroll animasyonları)
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
   CONTENT
───────────────────────────────────────────────────────────── */

const items = [
  {
    tag: "Voice Agents",
    title: "Agents that answer like your best employee.",
    body: "Real-time voice assistants that pick up in milliseconds, understand context and resolve calls end-to-end. Deploy them on support, sales or ops — 24/7, in every language you serve.",
    aside: "Every call answered. Every time.",
    visual: "agents",
  },
  {
    tag: "Studio TTS",
    title: "Our own voices. All the way to Uzbek.",
    body: "Konuşma kiralamıyoruz; onu eğitiyoruz. Miransas, ana dili Özbekçe olan model dahil kendi TTS ve ses modellerini kurum içinde geliştirir.",
    aside: "Uçtan uca sahip olunan konuşma sentezi.",
    visual: "tts",
  },
  {
    tag: "Voice Clone",
    title: "Replicate any voice in seconds.",
    body: "Yüksek doğruluklu sıfır örnekli ses klonlama. Yalnızca 3 saniyelik ses örneğinden duyguyu, nefesi ve kişisel aksanları yakalayın.",
    aside: "Kimlik korunur. Duygu bozulmaz.",
    visual: "clone",
  },
];

/* ─────────────────────────────────────────────────────────────
   MOCK VISUALS
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
    <div className="flex h-full min-h-[280px] flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#0a0f0e] p-5">
      <div className="flex items-center justify-between text-[11px] text-white/50">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live call · Support
        </span>
        <span className="tabular-nums">00:42 · 182 ms</span>
      </div>

      <div className="mt-5 space-y-3 text-[12.5px] leading-5">
        <div className="max-w-[80%] rounded-xl rounded-tl-sm bg-white/[0.06] px-3 py-2 text-white/70">
          Hi, I need to change the delivery address for order #48213.
        </div>
        <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-[#17c9b6]/15 px-3 py-2 text-[#d7fbf6]">
          Of course — I've pulled up order #48213. What's the new address?
        </div>
      </div>

      <div className="mt-auto pt-6">
        <Waveform />
        <div className="mt-3 flex items-center justify-between text-[11px] text-white/40">
          <span>miransas-agent-2 · intent: change_address</span>
          <span className="text-[#17c9b6]">resolved ✓</span>
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
    <div className="flex h-full min-h-[280px] flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#0d0d0d] p-5">
      <div className="flex items-center justify-between text-[11px] text-white/50">
        <span>Studio TTS</span>
        <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-white/70">
          miransas-tts-1
        </span>
      </div>

      <p className="mt-5 rounded-xl bg-white/[0.05] px-4 py-3 text-[13px] leading-6 text-white/80">
        "Assalomu alaykum! Buyurtmangiz yo'lga chiqdi."
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {voices.map((v) => (
          <span
            key={v.lang}
            className={`rounded-full px-2.5 py-1 text-[11px] ${v.active
              ? "bg-[#17c9b6]/20 text-[#8ff0e4]"
              : "bg-white/[0.06] text-white/45"
              }`}
          >
            {v.lang} · {v.name}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <Waveform bars={34} />
        <div className="mt-3 flex items-center justify-between text-[11px] text-white/40">
          <span>24 kHz · streaming</span>
          <span>first byte 96 ms</span>
        </div>
      </div>
    </div>
  );
}

function VoiceCloneMock() {
  return (
    <div className="flex h-full min-h-[280px] flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#070908] p-5">
      <div className="flex items-center justify-between text-[11px] text-white/50">
        <span>Zero-Shot Engine</span>
        <span className="flex items-center gap-1.5 text-[#17c9b6]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#17c9b6]" />
          Engine Ready
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {/* Source Audio Card */}
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.05]">
          <div className="mb-3 flex items-center justify-between text-[10.5px] text-white/40">
            <span>Reference Audio (3.2s)</span>
            <span>speaker_01.wav</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[10px] text-white/70">
              ▶
            </button>
            <div className="flex-1 opacity-40">
              <Waveform bars={14} color="bg-white/80" />
            </div>
          </div>
        </div>

        {/* Processing Indicator */}
        <div className="relative flex justify-center py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/[0.04]"></div>
          </div>
          <div className="relative bg-[#070908] px-3 text-[10px] text-white/30">
            generating clone
          </div>
        </div>

        {/* Generated Output Card */}
        <div className="rounded-xl border border-[#17c9b6]/20 bg-[#17c9b6]/[0.04] p-3 shadow-[0_0_15px_rgba(23,201,182,0.05)]">
          <div className="mb-3 flex items-center justify-between text-[10.5px] text-[#17c9b6]/70">
            <span>Synthesized Output</span>
            <span>Similarity: 99.2%</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#17c9b6]/20 text-[10px] text-[#17c9b6]">
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
   SECTION
───────────────────────────────────────────────────────────── */

export function Bento() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#050505] px-6 pb-28 pt-24"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p
            variants={fadeUp}
            className="text-[12px] uppercase tracking-[0.22em] text-white/40"
          >
            What we build
            What we build
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 max-w-2xl text-3xl tracking-[-0.04em] text-white md:text-5xl"
          >
            Voice first. Never voice only.
            Voice first. Never voice only.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-[15px] leading-7 text-white/60"
          >
            Miransas builds real-time voice agents for companies that talk to
            their customers — plus the TTS models, infrastructure and voice cloning tech
            that make them feel human.
            Miransas müşterileriyle konuşan şirketler için gerçek zamanlı sesli ajanlar;
            ayrıca bunları insan gibi hissettiren TTS modelleri, altyapı ve ses klonlama teknolojileri geliştirir.
            Live call · Support
            Merhaba, #48213 numaralı siparişimin teslimat adresini değiştirmem gerekiyor.
            Elbette, #48213 numaralı siparişi açtım. Yeni adres nedir?
            resolved ✓
            generating clone
            <span>Synthesized Output</span>
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="mt-14 space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={item.tag}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="grid overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0d0d0d] md:grid-cols-2"
            >
              {/* Text side */}
              <motion.div
                variants={textStagger}
                className={`flex flex-col justify-center p-8 md:p-12 ${index === 1 ? "md:order-2" : ""
                  }`}
              >
                <motion.p
                  variants={inner}
                  className="text-[12px] uppercase tracking-[0.22em] text-[#17c9b6]/80"
                >
                  {item.tag}
                </motion.p>
                <motion.h3
                  variants={inner}
                  className="mt-4 text-2xl tracking-tight text-white md:text-[32px] md:leading-10"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  variants={inner}
                  className="mt-4 text-sm leading-6 text-white/60"
                >
                  {item.body}
                </motion.p>
                <motion.p
                  variants={inner}
                  className="mt-8 text-sm text-white/40"
                >
                  {item.aside}
                </motion.p>
              </motion.div>

              {/* Visual side */}
              <motion.div
                variants={visual}
                className={`min-h-[280px] p-4 md:p-6 ${index === 1 ? "md:order-1" : ""
                  }`}
              >
                {item.visual === "agents" ? (
                  <AgentMock />
                ) : item.visual === "tts" ? (
                  <TtsMock />
                ) : (
                  <VoiceCloneMock />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}