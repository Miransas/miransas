'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from 'framer-motion';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;

/** One quiet reveal language, shared by section groups rather than every paragraph. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  duration = 0.65,
  ...props
}: HTMLMotionProps<'div'> & { delay?: number; y?: number; duration?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.12 });
  const controls = useAnimationControls();

  useEffect(() => {
    if (reduce) {
      controls.stop();
      controls.set({ opacity: 1, y: 0 });
      return;
    }
    if (!visible || reduce === null) return;
    const offset = window.matchMedia('(max-width: 767px)').matches ? Math.min(y, 10) : y;
    void controls.start({
      opacity: [0, 1],
      y: [offset, 0],
      transition: { duration, delay, ease },
    });
    return () => controls.stop();
  }, [controls, delay, duration, reduce, visible, y]);

  return (
    <motion.div
      ref={ref}
      className={cn('scroll-reveal', className)}
      initial={false}
      animate={controls}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Reveal a complete heading together to keep longer text readable. */
export function TextReveal({
  children,
  id,
  className,
  delay = 0,
}: { children: React.ReactNode; id?: string; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} y={12}>
      <h2 id={id} className={className}>{children}</h2>
    </Reveal>
  );
}

export function HeroEnter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Reveal className={className} y={14}>
      {children}
    </Reveal>
  );
}
