'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import CrystalizedBall from '@/components/visuals/crystalized-ball';
import { Reveal } from './reval';

export function EngineeringVisualSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const scale = useTransform(scrollYProgress, [0, .45, 1], [.96, 1, .98]);

  return (
    <section id="engineering-lab" ref={ref} aria-labelledby="engineering-title" className="relative overflow-hidden bg-background px-6 py-24 text-foreground md:px-12 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <Reveal className="relative z-10 max-w-xl">
          <p className="font-mono text-[11px] tracking-[.2em] text-muted-foreground">ENGINEERED TO EXPLORE</p>
          <h2 id="engineering-title" className="mt-6 max-w-[10ch] text-[clamp(2.8rem,5.5vw,5rem)] leading-[1.04] tracking-[-.055em]">Beyond the interface.</h2>
          <p className="mt-7 max-w-md text-base leading-8 text-muted-foreground">We explore the systems behind responsive, expressive digital experiences — from real-time rendering to intelligent voice infrastructure.</p>
          <Link href="/lab" className="mt-8 inline-flex min-h-11 items-center gap-4 rounded-lg py-2 text-sm font-medium underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            Explore the Lab <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
        <motion.figure style={{ y: reduce ? 0 : y, scale: reduce ? 1 : scale }} className="relative mx-auto w-full max-w-[640px]">
          <div className="aspect-square w-full"><CrystalizedBall preset="abyss" color="#6B9EEA" speed={.5} glow={.34} sparks={.12} /></div>
          <figcaption className="flex justify-between gap-4 px-2 font-mono text-[10px] tracking-[.12em] text-muted-foreground"><span>VISUAL STUDY / 001</span><span>LIGHT IN MOTION</span></figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
