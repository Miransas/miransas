'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Bentoitems } from '../../constants/bento';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const card = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

function Waveform({ bars = 24, color = 'bg-[#0d4bfa]/75' }: { bars?: number; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: '100px' });
  return (
    <div ref={ref} className="flex h-8 items-center gap-[3px] overflow-hidden" aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className={`waveform-bar w-[3px] shrink-0 rounded-xl ${color}`}
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

// Tier 3 (Strictly Borderless) inner mocks — separated purely by tonal fills
function AgentMock() {
  return (
    <div className="flex h-full min-h-[250px] flex-col overflow-hidden rounded-xl bg-surface-card-elevated p-4">
      <div className="text-supporting-copy flex flex-wrap items-center justify-between gap-2 font-mono text-xs leading-[1.45]">
        <span className="text-prominent flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-xl bg-[#0d4bfa]" />
          </span>
          Sample call · Support
        </span>
        <span className="tracking-wider tabular-nums">Example conversation</span>
      </div>

      <div className="mt-4 space-y-3 text-xs leading-[1.55] sm:text-sm">
        <div className="text-prominent max-w-[90%] rounded-xl bg-black/[0.04] px-3.5 py-2.5 dark:bg-white/[0.05]">
          Hi, I need to change the delivery address for order #48213.
        </div>
        <div className="text-heading ml-auto max-w-[90%] rounded-xl bg-[#0d4bfa]/10 px-3.5 py-2.5 dark:bg-[#0d4bfa]/20">
          Of course — I&#39;ve pulled up order #48213. What&#39;s the new address?
        </div>
      </div>

      <div className="mt-auto pt-4">
        <Waveform bars={22} />
        <div className="text-supporting-copy mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] leading-[1.45]">
          <span>agent-2 · intent: change_address</span>
          <span className="text-prominent flex items-center gap-1">
            resolved <span aria-hidden="true" className="text-prominent">✓</span>
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
    <div className="flex h-full min-h-[250px] flex-col overflow-hidden rounded-xl bg-surface-card-elevated p-4">
      <div className="text-supporting-copy flex flex-wrap items-center justify-between gap-2 font-mono text-xs leading-[1.45]">
        <span className="text-prominent">Studio TTS</span>
        <span className="text-prominent rounded-xl bg-black/[0.04] px-2.5 py-1 dark:bg-white/[0.05]">
          Example voice
        </span>
      </div>

      <p className="text-prominent mt-4 rounded-xl bg-black/[0.04] px-3.5 py-3 text-xs leading-[1.6] italic sm:text-sm dark:bg-white/[0.05]">
        &ldquo;Assalomu alaykum! Buyurtmangiz yo&#39;lga chiqdi.&rdquo;
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {voices.map((v) => (
          <span
            key={v.lang}
            className={`rounded-xl px-2.5 py-1 text-xs font-medium transition-colors ${
              v.active
                ? 'bg-[#0d4bfa] text-white'
                : 'text-supporting-copy bg-black/[0.04] dark:bg-white/[0.05]'
            }`}
          >
            {v.lang} · {v.name}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <Waveform bars={24} />
        <div className="text-supporting-copy mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] leading-[1.45]">
          <span>Speech preview</span>
          <span>Sample audio</span>
        </div>
      </div>
    </div>
  );
}

function VoiceCloneMock() {
  return (
    <div className="flex h-full min-h-[250px] flex-col overflow-hidden rounded-xl bg-surface-card-elevated p-4">
      <div className="text-supporting-copy flex flex-wrap items-center justify-between gap-2 font-mono text-xs leading-[1.45]">
        <span className="text-prominent">Voice cloning concept</span>
        <span className="text-prominent flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-xl bg-[#0d4bfa]" />
          Example workflow
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="rounded-xl bg-black/[0.04] p-3 transition-colors dark:bg-white/[0.05]">
          <div className="text-supporting-copy mb-2 flex items-center justify-between font-mono text-[11px] leading-[1.45]">
            <span>Reference audio</span>
            <span>speaker_01.wav</span>
          </div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="text-prominent flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-black/[0.06] text-xs dark:bg-white/[0.08]"
            >
              ▶
            </span>
            <div className="min-w-0 flex-1 opacity-60">
              <Waveform bars={14} color="bg-[#0d4bfa]/60" />
            </div>
          </div>
        </div>
        <div className="relative flex justify-center py-0.5">
          <div className="text-prominent relative rounded-xl bg-black/[0.04] px-2.5 py-0.5 font-mono text-[11px] tracking-[0.12em] uppercase dark:bg-white/[0.05]">
            generating
          </div>
        </div>
        <div className="rounded-xl bg-[#0d4bfa]/10 p-3 dark:bg-[#0d4bfa]/20">
          <div className="text-heading mb-2 flex items-center justify-between font-mono text-[11px] leading-[1.45]">
            <span>Synthesized Output</span>
            <span>Example output</span>
          </div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#0d4bfa] text-xs text-white"
            >
              ▶
            </span>
            <div className="min-w-0 flex-1">
              <Waveform bars={14} color="bg-[#0d4bfa]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Bento() {
  const reduce = useReducedMotion();

  return (
    <section
      id="features"
      className="surface-page relative overflow-x-clip px-6 py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          variants={headerStagger}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-start text-left"
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
            Voice first. <span className="text-supporting-copy">Never voice only.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-supporting-copy mt-6 max-w-2xl text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]"
          >
            Our work connects voice interfaces, speech models and the systems that carry audio between them. These illustrative studies show the direction; they are not live product interfaces.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-6">
          {Bentoitems.map((item) => {
            return (
              <motion.article
                key={item.tag}
                variants={card}
                initial={reduce ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="surface-card relative grid gap-8 rounded-4xl p-6 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12 lg:p-10"
              >
                <div className="relative z-10">
                  <span className="text-prominent inline-flex items-center gap-2 rounded-xl bg-[#F7F8FC] px-3 py-1 text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px] dark:bg-[#121214]">
                    <span aria-hidden="true" className="size-1.5 rounded-xl bg-[#0d4bfa]" />
                    {item.tag}
                  </span>
                  <h3 className="mt-5 text-xl leading-[1.15] font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-2xl lg:text-[1.65rem] dark:text-[#FFFFFF]">
                    {item.title}
                  </h3>
                  <p className="text-supporting-copy mt-4 text-[15px] leading-[1.6] sm:text-base">
                    {item.body}
                  </p>
                  <div className="mt-5">
                    <span className="text-supporting-copy inline-flex items-center rounded-xl bg-surface-card-elevated px-3 py-1 text-xs leading-relaxed">
                      {item.aside}
                    </span>
                  </div>
                </div>
                <div className="relative z-10 flex w-full min-w-0 flex-col">
                  <span className="text-supporting-copy mb-2.5 block text-[11px] leading-[1.45] tracking-[0.12em] uppercase">
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
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
