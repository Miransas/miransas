'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bentoitems } from '../../constants/bento';
import { AmbientSmoke } from './AmbientSmoke';

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
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const inner = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const visual = {
  hidden: { opacity: 0, y: 20, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 0.12, ease: EASE },
  },
};

function Waveform({ bars = 24, color = 'bg-[#0d4bfa]/75' }: { bars?: number; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: '100px' });
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
    <div className="flex h-full min-h-[250px] flex-col overflow-hidden rounded-3xl bg-black/[0.04] p-4 dark:bg-white/[0.04]">
      <div className="text-secondary-copy flex flex-wrap items-center justify-between gap-2 font-mono text-xs leading-[1.45]">
        <span className="text-prominent flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-xl bg-[#0d4bfa] opacity-60" />
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
        <div className="text-secondary-copy mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] leading-[1.45]">
          <span>agent-2 · intent: change_address</span>
          <span className="text-prominent flex items-center gap-1">
            resolved <span className="text-[#0d4bfa]">✓</span>
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
    <div className="flex h-full min-h-[250px] flex-col overflow-hidden rounded-3xl bg-black/[0.04] p-4 dark:bg-white/[0.04]">
      <div className="text-secondary-copy flex flex-wrap items-center justify-between gap-2 font-mono text-xs leading-[1.45]">
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
                : 'text-secondary-copy bg-black/[0.04] dark:bg-white/[0.05]'
            }`}
          >
            {v.lang} · {v.name}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <Waveform bars={24} />
        <div className="text-secondary-copy mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] leading-[1.45]">
          <span>Speech preview</span>
          <span>Sample audio</span>
        </div>
      </div>
    </div>
  );
}

function VoiceCloneMock() {
  return (
    <div className="flex h-full min-h-[250px] flex-col overflow-hidden rounded-3xl bg-black/[0.04] p-4 dark:bg-white/[0.04]">
      <div className="text-secondary-copy flex flex-wrap items-center justify-between gap-2 font-mono text-xs leading-[1.45]">
        <span className="text-prominent">Voice cloning concept</span>
        <span className="text-prominent flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-xl bg-[#0d4bfa]" />
          Example workflow
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="rounded-xl bg-black/[0.04] p-3 transition-colors dark:bg-white/[0.05]">
          <div className="text-secondary-copy mb-2 flex items-center justify-between font-mono text-[11px] leading-[1.45]">
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
  return (
    <section
      id="features"
      className="surface-page relative overflow-x-clip px-6 pt-24 pb-28"
    >
      <AmbientSmoke anchor="bottom-right" seed={7.9} intensity={0.52} />
      <div className="relative z-10 mx-auto max-w-6xl">
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

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {Bentoitems.map((item, index) => {
            const isFeatured = index === 1;
            return (
              <motion.article
                key={item.tag}
                variants={card}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className={`group relative flex min-h-[290px] flex-col justify-between overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 lg:p-8 ${
                  isFeatured
                    ? 'border border-[#0d4bfa]/20 bg-white hover:border-[#0d4bfa]/35 dark:border-[#0d4bfa]/30 dark:bg-[#0a0a0a] dark:hover:border-[#0d4bfa]/45'
                    : 'border border-black/[0.08] bg-white hover:border-black/[0.16] hover:bg-[#F7F8FC] dark:border-white/10 dark:bg-[#0a0a0a] dark:hover:border-white/20 dark:hover:bg-[#121214]'
                }`}
              >
                {isFeatured && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-4xl bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.09)_0%,rgba(13,75,250,0.03)_42%,transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.16)_0%,rgba(13,75,250,0.05)_42%,transparent_70%)]"
                  />
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_75%_at_50%_50%,rgba(13,75,250,0.07)_0%,transparent_72%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[radial-gradient(75%_75%_at_50%_50%,rgba(13,75,250,0.12)_0%,transparent_72%)]"
                />

                <motion.div variants={textStagger} className="relative z-10">
                  <motion.span
                    variants={inner}
                    className="text-prominent inline-flex items-center gap-2 rounded-xl bg-[#F7F8FC] px-3 py-1 text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px] dark:bg-[#121214]"
                  >
                    <span aria-hidden="true" className="size-1.5 rounded-xl bg-[#0d4bfa]" />
                    {item.tag}
                  </motion.span>
                  <motion.h3
                    variants={inner}
                    className="mt-5 text-xl leading-[1.15] font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-2xl lg:text-[1.65rem] dark:text-[#FFFFFF]"
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    variants={inner}
                    className="text-secondary-copy mt-4 text-[15px] leading-[1.6] sm:text-base"
                  >
                    {item.body}
                  </motion.p>
                  <motion.div variants={inner} className="mt-5">
                    <span className="text-secondary-copy inline-flex items-center rounded-xl bg-[#F7F8FC] px-3 py-1 font-mono text-xs leading-[1.45] dark:bg-[#121214]">
                      {item.aside}
                    </span>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={visual}
                  className="relative z-10 mt-7 flex w-full flex-col"
                >
                  <span className="text-secondary-copy mb-2.5 block font-mono text-[11px] leading-[1.45] tracking-[0.12em] uppercase">
                    Illustrative interface · sample data
                  </span>
                  {item.visual === 'agents' ? (
                    <AgentMock />
                  ) : item.visual === 'tts' ? (
                    <TtsMock />
                  ) : (
                    <VoiceCloneMock />
                  )}
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
