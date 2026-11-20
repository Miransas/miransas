'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bentoitems } from '../../constants/bento';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const card = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
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
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, delay: 0.15, ease: EASE },
  },
};

function Waveform({ bars = 28, color = 'bg-[#3847ff]/75' }: { bars?: number; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: '100px' });
  return (
    <div ref={ref} className="flex h-9 items-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className={`waveform-bar w-[3px] rounded-xl ${color}`}
          style={{
            height: `${(20 + Math.abs(Math.sin(i * 0.55)) * 80).toFixed(3)}%`,
            animationDelay: `${i * 0.05}s`,
            animationPlayState: visible ? 'running' : 'paused',
          }}
        />
      ))}
    </div>
  );
}

function AgentMock() {
  return (
    <div className="surface-card flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl p-5">
      <div className="text-secondary-copy flex flex-wrap items-center justify-between gap-2 font-mono text-xs leading-[1.45]">
        <span className="text-prominent flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-xl bg-[#3847ff] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-xl bg-[#3847ff]" />
          </span>
          Sample call · Support
        </span>
        <span className="tracking-wider tabular-nums">Example conversation</span>
      </div>

      <div className="mt-6 space-y-4 text-[15px] leading-[1.6]">
        <div className="surface-card-elevated text-prominent max-w-[85%] rounded-xl px-4 py-2.5">
          Hi, I need to change the delivery address for order #48213.
        </div>
        <div className="surface-blue-gradient text-heading ml-auto max-w-[85%] rounded-xl px-4 py-2.5">
          Of course — I&#39;ve pulled up order #48213. What&#39;s the new address?
        </div>
      </div>

      <div className="mt-auto pt-6">
        <Waveform />
        <div className="text-secondary-copy mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-xs leading-[1.45]">
          <span>agent-2 · intent: change_address</span>
          <span className="text-prominent flex items-center gap-1">
            resolved <span className="text-[#3847ff]">✓</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function TtsMock() {
  const voices = [
    { lang: 'UZ', name: 'Dilnoza', active: true },
    { lang: 'EN', name: 'Ava', active: false },
    { lang: 'TR', name: 'Mert', active: false },
  ];

  return (
    <div className="surface-card flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl p-5">
      <div className="text-secondary-copy flex flex-wrap items-center justify-between gap-2 font-mono text-xs leading-[1.45]">
        <span className="text-prominent">Studio TTS</span>
        <span className="surface-card-elevated text-prominent rounded-xl px-2.5 py-1">
          Example voice
        </span>
      </div>

      <p className="surface-card-elevated text-prominent mt-6 rounded-xl px-4 py-4 text-[15px] leading-[1.6] italic">
        &ldquo;Assalomu alaykum! Buyurtmangiz yo&#39;lga chiqdi.&rdquo;
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {voices.map((v) => (
          <span
            key={v.lang}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
              v.active
                ? 'bg-[#3847ff] text-white'
                : 'surface-card-elevated text-secondary-copy'
            }`}
          >
            {v.lang} · {v.name}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <Waveform bars={34} />
        <div className="text-secondary-copy mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-xs leading-[1.45]">
          <span>Speech preview</span>
          <span>Sample audio</span>
        </div>
      </div>
    </div>
  );
}

function VoiceCloneMock() {
  return (
    <div className="surface-card flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl p-5">
      <div className="text-secondary-copy flex flex-wrap items-center justify-between gap-2 font-mono text-xs leading-[1.45]">
        <span className="text-prominent">Voice cloning concept</span>
        <span className="text-prominent flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-xl bg-[#3847ff]" />
          Example workflow
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="surface-card-elevated rounded-xl p-3.5 transition-colors">
          <div className="text-secondary-copy mb-3 flex items-center justify-between font-mono text-xs leading-[1.45]">
            <span>Reference audio</span>
            <span>speaker_01.wav</span>
          </div>
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="surface-card text-prominent flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs"
            >
              ▶
            </span>
            <div className="flex-1 opacity-60">
              <Waveform bars={14} color="bg-[#3847ff]/60" />
            </div>
          </div>
        </div>
        <div className="relative flex justify-center py-1">
          <div className="surface-card-elevated text-prominent relative rounded-xl px-3 py-1 font-mono text-xs tracking-[0.12em] uppercase">
            generating
          </div>
        </div>
        <div className="surface-blue-gradient rounded-xl p-3.5">
          <div className="text-heading mb-3 flex items-center justify-between font-mono text-xs leading-[1.45]">
            <span>Synthesized Output</span>
            <span>Example output</span>
          </div>
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#3847ff] text-xs text-white"
            >
              ▶
            </span>
            <div className="flex-1">
              <Waveform bars={14} color="bg-[#3847ff]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Bento() {
  return (
    <section id="features" className="surface-page relative overflow-hidden px-6 pt-24 pb-28">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          variants={headerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center text-center md:items-start md:text-left"
        >
          <motion.span
            variants={fadeUp}
            className="text-prominent text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]"
          >
            What we build
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-heading mt-5 max-w-2xl text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]"
          >
            Voice first. <span className="text-secondary-copy">Never voice only.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-secondary-copy mt-6 max-w-2xl text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]"
          >
            Our work connects voice interfaces, speech models and the systems that carry audio between them. These illustrative studies show the direction; they are not live product interfaces.
          </motion.p>
        </motion.div>
        <div className="mt-16 space-y-6">
          {Bentoitems.map((item, index) => (
            <motion.div
              key={item.tag}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className={`group grid overflow-hidden rounded-3xl transition-all duration-500 md:grid-cols-2 ${
                index === 1 ? 'surface-blue-gradient' : 'surface-card hover-surface-blue-gradient'
              }`}
            >
              <motion.div
                variants={textStagger}
                className={`flex flex-col justify-center p-8 md:p-14 ${index === 1 ? 'md:order-2' : ''}`}
              >
                <motion.span
                  variants={inner}
                  className="text-prominent text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]"
                >
                  {item.tag}
                </motion.span>
                <motion.h3
                  variants={inner}
                  className="text-heading mt-4 text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem]"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  variants={inner}
                  className="text-secondary-copy mt-5 text-[15px] leading-[1.6] sm:text-base"
                >
                  {item.body}
                </motion.p>
                <motion.span
                  variants={inner}
                  className="text-secondary-copy mt-8 block font-mono text-xs leading-[1.45] sm:text-[13px]"
                >
                  {item.aside}
                </motion.span>
              </motion.div>
              <motion.div
                variants={visual}
                className={`relative flex min-h-[320px] items-center justify-center p-6 md:p-10 ${index === 1 ? 'md:order-1' : ''}`}
              >
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-4xl bg-[#3847ff]/15 blur-3xl" />

                <div className="surface-card-elevated relative z-10 w-full max-w-md min-w-0 rounded-4xl p-4">
                  <span className="text-secondary-copy mb-3 block font-mono text-xs leading-[1.45] tracking-[0.12em] uppercase">
                    Illustrative interface · sample data
                  </span>
                  {item.visual === 'agents' ? (
                    <AgentMock />
                  ) : item.visual === 'tts' ? (
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
