'use client';

import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from 'framer-motion';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SPRING_INDICATOR: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
  mass: 0.7,
};

const leftContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const leftItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: EASE_OUT_EXPO,
    },
  },
};

const cardRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.68,
      delay: index * 0.06,
      ease: EASE_OUT_EXPO,
    },
  }),
};

const capabilities = [
  {
    number: '01',
    category: 'SPEECH GENERATION',
    title: 'Text to Speech',
    description:
      'Turn written content into natural-sounding speech for applications, products, and digital experiences.',
  },
  {
    number: '02',
    category: 'SPEECH RECOGNITION',
    title: 'Speech to Text',
    description:
      'Explore speech recognition for transcription, search, and voice-driven workflows as part of our research direction.',
  },
  {
    number: '03',
    category: 'VOICE IDENTITY',
    title: 'Voice Cloning',
    description:
      'We are developing voice identity workflows that require permission from the voice owner.',
  },
  {
    number: '04',
    category: 'CONVERSATIONAL RESEARCH',
    title: 'Interactive Voice',
    description:
      'We are researching how speech and conversation can work together in interactive applications.',
  },
  {
    number: '05',
    category: 'DEVELOPER INFRASTRUCTURE',
    title: 'API & Infrastructure',
    description:
      'A Rust API and Python voice worker are connected over gRPC. Public developer access remains in development.',
  },
];

export default function StickySplitSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const currentFocus = hoveredIndex ?? activeIndex;

  return (
    <section className="surface-page text-foreground relative isolate w-full px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-20">
        <motion.div
          initial={reduce ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={leftContainerVariants}
          className="self-start lg:sticky lg:top-32"
        >
          <motion.div
            variants={leftItemVariants}
            className="mb-6 inline-flex items-center gap-3"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-xl bg-[#0d4bfa] opacity-60" />
              <span className="relative inline-flex size-2 rounded-xl bg-[#0d4bfa]" />
            </span>

            <span className="text-prominent text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
              Voice AI Infrastructure
            </span>
          </motion.div>

          <motion.h2
            variants={leftItemVariants}
            className="text-heading max-w-[15ch] text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]"
          >
            Give your product a voice.
          </motion.h2>

          <motion.p
            variants={leftItemVariants}
            className="text-secondary-copy mt-6 max-w-md text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]"
          >
            Miransas brings speech generation, transcription, and voice
            experiences together in a developer-focused platform.
          </motion.p>

          <motion.div
            variants={leftItemVariants}
            className="mt-8 hidden items-center gap-3 lg:flex"
            aria-hidden="true"
          >
            <span className="text-prominent font-mono text-xs leading-[1.45] sm:text-[13px]">
              {capabilities[currentFocus]?.number}
            </span>
            <div className="flex items-center gap-1.5">
              {capabilities.map((cap, idx) => {
                const isCurrent = idx === currentFocus;
                return (
                  <button
                    key={cap.number}
                    type="button"
                    tabIndex={-1}
                    onClick={() => {
                      document
                        .getElementById(`capability-${cap.number}`)
                        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="relative h-1.5 rounded-xl transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ width: isCurrent ? 28 : 10 }}
                  >
                    <span className="absolute inset-0 rounded-xl bg-black/[0.06] dark:bg-white/[0.08]" />
                    {isCurrent && (
                      <motion.span
                        layoutId="sticky-capability-progress"
                        transition={reduce ? { duration: 0 } : SPRING_INDICATOR}
                        className="absolute inset-0 rounded-xl bg-[#0d4bfa]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <span className="text-secondary-copy font-mono text-xs leading-[1.45] sm:text-[13px]">
              05
            </span>
          </motion.div>

          <motion.div variants={leftItemVariants} className="mt-9">
            <a
              href="#voice-capabilities"
              className="group inline-flex items-center gap-3 rounded-xl bg-[#0d4bfa] px-6 py-3.5 text-sm font-medium text-white transition-[transform,opacity,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:opacity-92 hover:shadow-[0_12px_30px_rgba(13,75,250,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] active:scale-[0.98]"
            >
              Explore capabilities
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </motion.div>

        <div
          id="voice-capabilities"
          className="flex scroll-mt-28 flex-col gap-4"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {capabilities.map((item, index) => {
            const isHighlighted = currentFocus === index;

            return (
              <motion.article
                id={`capability-${item.number}`}
                key={item.number}
                custom={index}
                initial={reduce ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                onViewportEnter={() => setActiveIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                variants={cardRevealVariants}
                className={`group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 sm:p-8 ${
                  isHighlighted
                    ? 'border border-[#0d4bfa]/20 bg-white dark:border-[#0d4bfa]/30 dark:bg-[#070912]'
                    : 'border border-black/[0.08] bg-white hover:border-black/[0.16] dark:border-white/10 dark:bg-background dark:hover:border-white/20'
                }`}
              >
                {isHighlighted && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-4xl bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.09)_0%,rgba(13,75,250,0.03)_42%,transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.16)_0%,rgba(13,75,250,0.05)_42%,transparent_70%)]"
                  />
                )}
                <div className="relative z-10 mb-4 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`size-2 rounded-xl transition-[transform,background-color,opacity] duration-300 ${
                        isHighlighted
                          ? 'scale-100 bg-[#0d4bfa] opacity-100'
                          : 'bg-secondary-copy/40 scale-75 opacity-60 group-hover:scale-100 group-hover:bg-[#0d4bfa] group-hover:opacity-100'
                      }`}
                    />
                    <span className="text-prominent text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-mono text-xs leading-[1.45] transition-colors duration-300 sm:text-[13px] ${
                        isHighlighted
                          ? 'text-prominent'
                          : 'text-secondary-copy group-hover:text-prominent'
                      }`}
                    >
                      {item.number} / 05
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 -translate-x-1 translate-y-1 text-[#0d4bfa] opacity-0 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                    />
                  </div>
                </div>

                <h3 className="text-heading relative z-10 text-xl leading-[1.15] font-semibold tracking-[-0.02em] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 sm:text-2xl lg:text-[1.65rem]">
                  {item.title}
                </h3>

                <p className="text-secondary-copy relative z-10 mt-3 max-w-xl text-[15px] leading-[1.6] sm:text-base">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
