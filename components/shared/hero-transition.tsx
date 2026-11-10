'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/** Native document flow: no pinning, scaling or changes inside the Hero/Orb. */
export function HeroTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0.68]);
  return (
    <motion.div ref={ref} data-hero-transition style={{ opacity: reduce ? 1 : opacity }}>
      {children}
    </motion.div>
  );
}
