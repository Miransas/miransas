'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div className="flex flex-1 flex-col" key={pathname} initial={{ opacity: reduce ? 1 : 0 }} animate={{ opacity: 1 }} exit={{ opacity: reduce ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.2 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
