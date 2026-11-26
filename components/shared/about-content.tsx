'use client';

import { UI_DURATION, UI_EASE } from '@/lib/ui-motion';
import { ContentTheme } from '@/components/shared/content-theme';

import {
  BrainCircuit,
  Cpu,
  Globe2,
  HeartHandshake,
  Sparkles,
  Target,
  Users,
  Waypoints,
} from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { useMediaQuery } from '@/lib/use-media-query';
import { useRef, type ComponentType } from 'react';
import RobotEyes from './RobotEyes';

type IconComponent = ComponentType<{
  className?: string;
}>;

type AboutBlock = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: IconComponent;
};

const ABOUT_BLOCKS: AboutBlock[] = [
  {
    number: '01',
    eyebrow: 'Who we are',
    title: 'A small team building useful intelligence.',
    description:
      'Miransas is an independent technology studio focused on voice, conversational AI, and intelligent software experiences.',
    icon: Users,
  },
  {
    number: '02',
    eyebrow: 'What we build',
    title: 'Interfaces that can listen, understand, and act.',
    description:
      'We build systems where AI is not just a chat box, but a useful layer inside products, services, and everyday workflows.',
    icon: BrainCircuit,
  },
  {
    number: '03',
    eyebrow: 'How we think',
    title: 'Technology should feel natural.',
    description:
      'The best AI experiences disappear into the product. We care about clarity, responsiveness, good interaction design, and technology that feels human.',
    icon: HeartHandshake,
  },
  {
    number: '04',
    eyebrow: "Where we're going",
    title: 'From voice models to intelligent agents.',
    description:
      'Our long-term direction is to connect voice, language, automation, and action into experiences people can actually use.',
    icon: Target,
  },
];

export function AboutContent() {
  const reduce = useReducedMotion();
  const desktop = useMediaQuery('(min-width: 1024px)');
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const robotY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const robotScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.94]);
  const centerGlowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.55]);

  return (
    <div className="surface-page text-foreground relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute top-[8%] left-[-140px] h-[420px] w-[420px] rounded-4xl bg-[#3847ff]/[0.06] blur-[140px]" />
        <div className="absolute top-[18%] right-[-160px] h-[480px] w-[480px] rounded-4xl bg-[#3847ff]/[0.06] blur-[150px]" />
        <div className="absolute top-[42%] left-1/2 h-[550px] w-[750px] -translate-x-1/2 rounded-4xl bg-[#3847ff]/[0.05] blur-[160px]" />
      </div>

      <section
        ref={heroRef}
        className="relative z-10 min-h-[105vh] overflow-hidden"
      >
        <div className="mx-auto flex min-h-[105vh] max-w-7xl flex-col px-6 pt-28 pb-20 lg:px-8 lg:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="surface-blue-gradient text-prominent mx-auto inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]"
          >
            <Sparkles className="size-3.5 text-[#3847ff]" />
            <span>About Miransas</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.75 }}
            className="relative z-10 mx-auto mt-7 max-w-3xl text-center"
          >
            <h1 className="text-heading text-[2.75rem] leading-[1.03] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem]">
              We build technology
              <br />
              <span>that feels alive.</span>
            </h1>

            <p className="text-secondary-copy mx-auto mt-6 max-w-2xl text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]">
              Miransas is an independent software studio exploring what happens when artificial intelligence becomes a natural part of everyday products and services.
            </p>
          </motion.div>

          <motion.div
            style={{
              y: reduce || !desktop ? 0 : robotY,
              scale: reduce || !desktop ? 1 : robotScale,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
            className="relative mx-auto mt-8 flex flex-1 items-end justify-center lg:mt-0"
          >
            <motion.div
              style={{ opacity: centerGlowOpacity }}
              className="pointer-events-none absolute bottom-[8%] left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-4xl bg-[#3847ff]/[0.08] blur-[110px]"
            />

            <div className="relative z-10 aspect-square w-[min(85vw,590px)]">
              <RobotEyes />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mx-auto mt-2 flex flex-col items-center gap-2"
          >
            <span className="text-secondary-copy text-xs leading-[1.45] tracking-[0.12em] uppercase sm:text-[13px]">
              Scroll to explore
            </span>
            <span className="h-8 w-0.5 rounded-xl bg-gradient-to-b from-[#3847ff] to-transparent" />
          </motion.div>
        </div>
      </section>
      <ContentTheme>

        <section className="relative z-10">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-[0.7fr_1.3fr] md:items-start lg:px-8 lg:py-32">
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduce ? 0 : UI_DURATION.heading, ease: UI_EASE }}
            >
              <span className="text-prominent block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
                The idea
              </span>

              <h2 className="text-heading mt-4 max-w-sm text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]">
                AI should become useful before it becomes impressive.
              </h2>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduce ? 0 : UI_DURATION.paragraph, delay: reduce ? 0 : UI_DURATION.stagger, ease: UI_EASE }}
              className="max-w-2xl space-y-5 text-[15px] leading-[1.6] sm:text-base"
            >
              <p className="text-prominent">
                Miransas explores voice, language, automation, and agent-based software with one simple goal: build systems people can actually use.
              </p>
              <p className="text-supporting-copy">
                We care about the experience around the model as much as the model itself. A powerful system should still feel clear, fast, approachable, and intentional.
              </p>
              <p className="text-supporting-copy">
                Our work moves between research and product — from voice models and multilingual speech to the interfaces that turn those capabilities into useful experiences.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
            <div className="grid gap-5 md:grid-cols-2">
              {ABOUT_BLOCKS.map((block, index) => {
                const Icon = block.icon;

                return (
                  <motion.article
                    key={block.number}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: reduce ? 0 : UI_DURATION.section, delay: reduce ? 0 : index * UI_DURATION.stagger, ease: UI_EASE }}
                    className="surface-card relative min-h-[320px] overflow-hidden rounded-3xl p-6 sm:p-8"
                  >
                    <div className="relative flex items-center justify-between">
                      <div className="surface-card-elevated flex size-11 items-center justify-center rounded-xl text-[#3847ff]">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-prominent font-mono text-xs leading-[1.45] sm:text-[13px]">
                        {block.number} / 04
                      </span>
                    </div>

                    <div className="relative mt-12">
                      <span className="text-prominent block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
                        {block.eyebrow}
                      </span>
                      <h3 className="text-heading mt-3 max-w-md text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem]">
                        {block.title}
                      </h3>
                      <div className="mt-5 h-0.5 w-8 rounded-xl bg-surface-card-elevated" />
                      <p className="text-supporting-copy mt-4 max-w-lg text-[15px] leading-[1.6] sm:text-base">
                        {block.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative z-10 py-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {[
              {
                icon: Sparkles,
                label: 'Curious',
                text: 'We explore what is possible.',
              },
              {
                icon: Target,
                label: 'Intentional',
                text: 'We build with a reason.',
              },
              {
                icon: Waypoints,
                label: 'Practical',
                text: 'Useful beats impressive.',
              },
              {
                icon: Globe2,
                label: 'Open',
                text: 'Built for a global audience.',
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduce ? 0 : UI_DURATION.section, delay: reduce ? 0 : index * UI_DURATION.stagger, ease: UI_EASE }}
                  className="surface-card rounded-3xl p-6"
                >
                  <div className="surface-card-elevated flex size-10 items-center justify-center rounded-xl text-[#3847ff]">
                    <Icon className="size-4" />
                  </div>
                  <h3 className="text-heading mt-5 text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem]">
                    {item.label}
                  </h3>
                  <p className="text-supporting-copy mt-2 text-[15px] leading-[1.6] sm:text-base">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="relative z-10 overflow-hidden px-6 py-24">
          <div className="surface-card mx-auto max-w-5xl rounded-4xl px-6 py-16 text-center md:py-24">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduce ? 0 : UI_DURATION.section, ease: UI_EASE }}
            >
              <div className="surface-card-elevated mx-auto flex size-12 items-center justify-center rounded-xl text-[#3847ff]">
                <Cpu className="size-5" />
              </div>

              <span className="text-prominent mt-6 block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
                The next chapter
              </span>

              <h2 className="text-heading mx-auto mt-4 max-w-3xl text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]">
                We&#39;re still early.
                <br />
                That&#39;s the interesting part.
              </h2>

              <p className="text-supporting-copy mx-auto mt-5 max-w-xl text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]">
                More voices, more languages, smarter agents, and more useful ways to interact with software are already on the way.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/projects"
                  className="inline-flex min-h-11 items-center rounded-xl bg-[#3847ff] px-5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
                >
                  Explore our projects
                </Link>
                <Link
                  href="/contact"
                  className="surface-card hover:bg-surface-hover text-prominent inline-flex min-h-11 items-center rounded-xl px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
                >
                  Get in touch
                </Link>
              </div>
              <div className="surface-card text-prominent mt-8 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
                <span className="size-1.5 rounded-xl bg-[#3847ff]" />
                <span>Building in public</span>
              </div>
            </motion.div>
          </div>
        </section>
      </ContentTheme>
    </div>
  );
}
