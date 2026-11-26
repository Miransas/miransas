'use client';

import { Reveal } from './reval';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const tabs = [
  {
    id: 'agents',
    label: 'Voice Agents',
    copy: 'Explore how voice input, conversation and useful actions could work together.',
    videoUrl:
      'https://res.cloudinary.com/dwdk20m6q/video/upload/v1787438529/150883-799711528_gfea37.mp4',
  },
  {
    id: 'cloning',
    label: 'Voice Cloning',
    copy: 'Permission-based voice cloning architecture is in development.',
    videoUrl:
      'https://res.cloudinary.com/dwdk20m6q/video/upload/v1788896592/6491689-uhd_4096_2160_25fps_neo9ck.mp4',
  },
  {
    id: 'tts',
    label: 'Studio TTS',
    copy: 'Explore expressive speech, with language coverage determined by the model.',
    videoUrl:
      'https://res.cloudinary.com/dwdk20m6q/video/upload/v1788896598/8084507-uhd_3840_2160_25fps_raxool.mp4',
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    copy: 'A Rust API connects to the Python voice engine over gRPC.',
    videoUrl:
      'https://res.cloudinary.com/dwdk20m6q/video/upload/v1788895956/infra-demo_ftsho7.mov',
  },
] as const;

export function Features() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<(typeof tabs)[number]['id']>('agents');
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <section id="capabilities" className="surface-page px-6 pb-24 sm:pb-32">
      <Reveal className="mx-auto max-w-6xl">
        <span className="text-prominent block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
          Core Capabilities
        </span>
        <h2 className="text-heading mt-5 max-w-2xl text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]">
          From voice research to useful interfaces.
        </h2>
        <p className="text-supporting-copy mt-5 max-w-xl text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]">
          We are bringing speech generation, voice identity and conversational infrastructure into a coherent developer experience.
        </p>
        <div className="mt-10 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={active === tab.id}
              aria-controls="capability-preview"
              onClick={() => setActive(tab.id)}
              className={`min-h-11 rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] ${
                active === tab.id
                  ? 'bg-[#0d4bfa] text-white'
                  : 'text-prominent border border-black/[0.08] bg-white hover:border-black/[0.16] hover:bg-[#F7F8FC] dark:border-white/10 dark:bg-[#0a0a0a] dark:hover:border-white/20 dark:hover:bg-[#121214]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <motion.div
          id="capability-preview"
          key={current.id}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.3 }}
          className="surface-card mt-8 overflow-hidden rounded-4xl"
        >
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[320px] overflow-hidden bg-black">
              <video
                key={current.videoUrl}
                src={current.videoUrl}
                autoPlay={!reduce}
                controls={Boolean(reduce)}
                aria-label={`${current.label} demonstration`}
                preload="none"
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-90"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <h3 className="text-heading text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem]">
                {current.copy}
              </h3>
              <p className="text-supporting-copy mt-4 text-[15px] leading-[1.6] sm:text-base">
                Visual study · illustrative footage. Follow our engineering notes for product availability and implementation details.
              </p>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
