'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import CrystalizedBall from '@/components/visuals/crystalized-ball';
import { UI_DURATION, UI_EASE } from '@/lib/ui-motion';
import { UI_REVEAL, UI_VIEWPORT } from '@/lib/ui-motion';
import { Reveal } from './reval';

export function EngineeringVisualSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="engineering-lab"
      aria-labelledby="engineering-title"
      className="surface-page text-foreground relative overflow-hidden px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="relative z-10 max-w-xl">
          <span className="text-prominent block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
            ENGINEERED TO EXPLORE
          </span>
          <h2
            id="engineering-title"
            className="text-heading mt-5 max-w-[12ch] text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]"
          >
            Beyond the interface.
          </h2>
          <p className="text-supporting-copy mt-6 max-w-md text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]">
            We explore the systems behind responsive, expressive digital experiences — from real-time rendering to intelligent voice infrastructure.
          </p>
          <Link
            href="/lab"
            className="surface-card hover:bg-surface-hover text-prominent mt-8 inline-flex min-h-11 items-center gap-3 rounded-xl px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
          >
            Explore the Lab{' '}
            <ArrowUpRight className="size-4 text-[#3847ff]" aria-hidden="true" />
          </Link>
        </Reveal>
        <motion.figure
          initial={false}
          whileInView={reduce ? { opacity: 1, y: 0 } : UI_REVEAL}
          viewport={UI_VIEWPORT}
          transition={{ duration: reduce ? 0 : UI_DURATION.section, ease: UI_EASE }}
          className="surface-card relative mx-auto w-full max-w-[640px] rounded-4xl p-6"
        >
          <div className="aspect-square w-full">
            <CrystalizedBall
              preset="abyss"
              color="#3847ff"
              speed={0.5}
              glow={0.12}
              sparks={0.04}
            />
          </div>
          <figcaption className="text-supporting-copy flex flex-wrap justify-between gap-2 px-2 text-xs leading-[1.45] tracking-[0.12em] uppercase sm:text-[13px]">
            <span>VISUAL STUDY / 001</span>
            <span>LIGHT IN MOTION</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
