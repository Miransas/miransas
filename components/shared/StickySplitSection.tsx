'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';

import { UI_DURATION, UI_EASE } from '@/lib/ui-motion';
const leftContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: UI_DURATION.stagger,
      delayChildren: UI_DURATION.stagger,
    },
  },
};

const leftItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: UI_DURATION.section,
      ease: UI_EASE,
    },
  },
};

const cardRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: UI_DURATION.section,
      delay: index * UI_DURATION.stagger,
      ease: UI_EASE,
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
            className="text-supporting-copy mt-6 max-w-md text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]"
          >
            Miransas brings speech generation, transcription, and voice
            experiences together in a developer-focused platform.
          </motion.p>

          <motion.div
            variants={leftItemVariants}
            className="mt-8 hidden items-center gap-3 lg:flex"
            aria-hidden="true"
          >
            <span className="text-prominent font-mono tabular-nums text-xs leading-[1.45] sm:text-[13px]">
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
                        ?.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth', block: 'center' });
                    }}
                    className="relative h-1.5 rounded-xl"
                    style={{ width: isCurrent ? 28 : 10 }}
                  >
                    <span className="absolute inset-0 rounded-xl bg-black/[0.06] dark:bg-white/[0.08]" />
                    {isCurrent && (
                      <motion.span
                        layoutId="sticky-capability-progress"
                        transition={reduce ? { duration: 0 } : { duration: UI_DURATION.interactive, ease: UI_EASE }}
                        className="absolute inset-0 rounded-xl bg-[#0d4bfa]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <span className="text-supporting-copy font-mono tabular-nums text-xs leading-[1.45] sm:text-[13px]">
              05
            </span>
          </motion.div>

          <motion.div variants={leftItemVariants} className="mt-9">
            <a
              href="#voice-capabilities"
              className="group inline-flex items-center gap-3 rounded-xl bg-[#0d4bfa] px-6 py-3.5 text-sm font-medium text-white transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-92 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa]"
            >
              Explore capabilities
              <ArrowRight
                aria-hidden
                className="size-4"
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
                className={`group relative rounded-3xl border border-transparent p-6  sm:p-8 ${isHighlighted ? 'bg-surface-card-elevated' : 'bg-surface-card'}`}
              >
                <div className="relative z-10 mb-4 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`size-2 rounded-xl transition-[transform,background-color,opacity] duration-300 ${
                        isHighlighted
                          ? ' bg-[#0d4bfa] opacity-100'
                          : 'bg-secondary-copy/40  opacity-60 group-hover:bg-[#0d4bfa] group-hover:opacity-100'
                      }`}
                    />
                    <span className="text-prominent text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-mono tabular-nums text-xs leading-[1.45] transition-colors duration-300 sm:text-[13px] ${
                        isHighlighted
                          ? 'text-prominent'
                          : 'text-supporting-copy group-hover:text-prominent'
                      }`}
                    >
                      {item.number} / 05
                    </span>
                  </div>
                </div>

                <h3 className="text-heading relative z-10 text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem]">
                  {item.title}
                </h3>

                <p className="text-supporting-copy relative z-10 mt-3 max-w-xl text-[15px] leading-[1.6] sm:text-base">
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
