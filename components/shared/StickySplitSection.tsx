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
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: EASE_OUT_EXPO,
    },
  },
};

const cardRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: 'blur(6px)',
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.72,
      delay: index * 0.06,
      ease: EASE_OUT_EXPO,
    },
  }),
};

const lineDrawVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: (index: number) => ({
    scaleX: 1,
    transition: {
      duration: 0.85,
      delay: index * 0.06 + 0.08,
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
      'Convert spoken audio into text for transcription, search, and voice-driven workflows.',
  },
  {
    number: '03',
    category: 'VOICE IDENTITY',
    title: 'Voice Cloning',
    description:
      'Build voice experiences around a consistent voice identity, with permission from the voice owner.',
  },
  {
    number: '04',
    category: 'LIVE AUDIO',
    title: 'Real-time Voice',
    description:
      'Create interactive experiences where audio can move through your product in real time.',
  },
  {
    number: '05',
    category: 'DEVELOPER INFRASTRUCTURE',
    title: 'API & Infrastructure',
    description:
      'Connect voice capabilities to your applications through a developer-focused integration layer.',
  },
];

export default function StickySplitSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const currentFocus = hoveredIndex ?? activeIndex;

  return (
    <section className="text-foreground relative isolate w-full px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-24">
        {/* SOL SÜTUN — Sticky & Sağ Liste ile Senkronize */}
        <motion.div
          initial={reduce ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={leftContainerVariants}
          className="self-start lg:sticky lg:top-32"
        >
          <motion.div
            variants={leftItemVariants}
            className="mb-7 inline-flex items-center gap-3"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f43f5e] opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#f43f5e]" />
            </span>

            <span className="text-muted-foreground text-[11px] font-medium tracking-[0.22em] uppercase">
              Voice AI Infrastructure
            </span>
          </motion.div>

          <motion.h2
            variants={leftItemVariants}
            className="text-foreground max-w-[15ch] text-[2.65rem] leading-[1.06] font-medium tracking-[-0.045em] sm:text-5xl lg:text-[3.65rem]"
          >
            Give your product a voice.
          </motion.h2>

          <motion.p
            variants={leftItemVariants}
            className="text-muted-foreground mt-7 max-w-md text-base leading-8 sm:text-lg"
          >
            Miransas brings speech generation, transcription, and voice
            experiences together in a developer-focused platform.
          </motion.p>

          {/* Senkronize Aktif Adım Göstergesi (Sadece Masaüstünde Sticky Akışı Destekler) */}
          <motion.div
            variants={leftItemVariants}
            className="mt-8 hidden items-center gap-3 lg:flex"
            aria-hidden="true"
          >
            <span className="font-mono text-[11px] tracking-[0.16em] text-foreground">
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
                    className="relative h-1 rounded-full transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ width: isCurrent ? 28 : 10 }}
                  >
                    <span className="bg-border/80 absolute inset-0 rounded-full" />
                    {isCurrent && (
                      <motion.span
                        layoutId="sticky-capability-progress"
                        transition={reduce ? { duration: 0 } : SPRING_INDICATOR}
                        className="absolute inset-0 rounded-full bg-[#f43f5e]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <span className="text-muted-foreground font-mono text-[11px] tracking-[0.16em]">
              05
            </span>
          </motion.div>

          <motion.div variants={leftItemVariants} className="mt-9">
            <a
              href="#voice-capabilities"
              className="group border-border/60 bg-primary text-primary-foreground inline-flex items-center gap-3 rounded-full border px-6 py-3.5 text-sm font-medium transition-[transform,opacity,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:opacity-92 hover:shadow-[0_12px_30px_rgba(0,0,0,0.14)] active:scale-[0.98]"
            >
              Explore capabilities
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </motion.div>

        {/* SAĞ SÜTUN — Capabilities Listesi */}
        <div
          id="voice-capabilities"
          className="flex scroll-mt-28 flex-col"
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
                className="group relative py-8 sm:py-10"
              >
                {/* Soldan sağa çizilerek açılan üst ayırıcı çizgi */}
                <motion.span
                  aria-hidden="true"
                  custom={index}
                  variants={lineDrawVariants}
                  className="bg-border absolute inset-x-0 top-0 h-px origin-left"
                />

                {/* Hover veya aktif durumda parlayan #f43f5e lazer çizgisi */}
                <span
                  aria-hidden="true"
                  className={` absolute top-0 left-0 h-px origin-left bg-gradient-to-r from-[#f43f5e] via-[#fb7185] to-transparent transition-[width,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isHighlighted
                      ? 'w-full opacity-100'
                      : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`}
                />

                {/* Hover arka plan dokusu */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-4 inset-y-1 -z-10 rounded-2xl bg-foreground/[0.022] opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:-inset-x-6 dark:bg-white/[0.025]"
                />

                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`size-1.5 rounded-full transition-[transform,background-color,opacity] duration-300 ${
                        isHighlighted
                          ? 'scale-100 bg-[#f43f5e] opacity-100'
                          : 'bg-muted-foreground/40 scale-75 opacity-60 group-hover:scale-100 group-hover:bg-[#f43f5e] group-hover:opacity-100'
                      }`}
                    />
                    <span className="text-muted-foreground group-hover:text-foreground/80 text-xs font-medium tracking-[0.16em] transition-colors duration-300">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-mono text-xs transition-colors duration-300 ${
                        isHighlighted
                          ? 'text-[#f43f5e]'
                          : 'text-muted-foreground group-hover:text-foreground'
                      }`}
                    >
                      {item.number}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 -translate-x-1 translate-y-1 text-[#f43f5e] opacity-0 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                    />
                  </div>
                </div>

                <h3 className="text-foreground text-2xl font-medium tracking-tight transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 sm:text-[1.75rem]">
                  {item.title}
                </h3>

                <p className="text-muted-foreground group-hover:text-foreground/75 mt-3 max-w-xl text-sm leading-7 transition-colors duration-300 sm:text-base">
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