'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;

/** One quiet reveal language, shared by section groups rather than every paragraph. */
export function Reveal({ children, className, delay = 0, y = 18, ...props }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={cn('scroll-reveal', className)} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12, margin: '0px 0px -32px 0px' }} transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : delay, ease }} {...props}>
      {children}
    </motion.div>
  );
}

export function HeroEnter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Reveal className={className} y={14}>
      {children}
    </Reveal>
  );
}
