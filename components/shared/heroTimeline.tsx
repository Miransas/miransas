'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { Reveal } from './reval';
import { Search, PenTool, Settings, RefreshCw, Rocket } from 'lucide-react';

const timelineData = [
  {
    id: '01',
    title: 'Discovery & Audit',
    description: 'We analyze your business workflows, bottlenecks, and revenue opportunities.',
    icon: Search,
  },
  {
    id: '02',
    title: 'Automation Blueprint',
    description: 'We design a detailed automation architecture aligned with KPIs.',
    icon: PenTool,
  },
  {
    id: '03',
    title: 'Build & Integration',
    description: 'Our engineers implement AI systems and integrate with your existing tools.',
    icon: Settings,
  },
  {
    id: '04',
    title: 'Testing & Optimization',
    description: 'Performance testing, data validation, iterative refinement and optimization.',
    icon: RefreshCw,
  },
  {
    id: '05',
    title: 'Deployment & Scaling',
    description: 'Launch, monitor, and continuously optimize systems to support scalable growth.',
    icon: Rocket,
  },
];

export default function Timeline() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const next = Math.min(timelineData.length - 1, Math.floor(progress * timelineData.length));
    if (next !== active) setActive(next);
  });

  return (
    <section
      aria-label="How we build"
      className="surface-page text-foreground relative overflow-x-clip px-6 py-24 md:py-32"
    >
      <Reveal className="relative z-10 mx-auto mb-14 max-w-4xl">
        <span className="text-prominent block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
          The engineering process
        </span>
        <h2 className="text-heading mt-4 max-w-2xl text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]">
          From a question to a working system.
        </h2>
        <p className="text-supporting-copy mt-5 max-w-xl text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]">
          A sequence of decisions, built around the problem. From discovery to refinement, each step makes the next decision clearer.
        </p>
      </Reveal>
      <div className="relative z-10 mx-auto max-w-4xl" ref={containerRef}>
        <div aria-hidden className="absolute top-0 bottom-0 left-4 w-0.5 rounded-xl bg-black/[0.06] md:left-1/2 dark:bg-white/[0.08]" />
        <motion.div
          aria-hidden
          className="absolute top-0 bottom-0 left-4 w-0.5 origin-top rounded-xl bg-[#0d4bfa] md:left-1/2"
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
        />
        <div className="flex flex-col gap-6 md:gap-8">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            const isActive = index === active;
            const Icon = item.icon;
            return (
              <motion.article
                key={item.id}
                initial={false}
                animate={isActive ? 'active' : 'inactive'}
                data-active={isActive}
                aria-current={isActive ? 'step' : undefined}
                className={`relative grid grid-cols-[2rem_minmax(0,1fr)] gap-5 rounded-3xl border border-transparent p-6  sm:p-8 md:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] md:gap-8 ${isActive ? 'bg-surface-card-elevated' : 'bg-surface-card'}`}
              >
                <div className={`relative z-10 col-start-2 row-start-1 min-w-0 ${isEven ? 'md:col-start-3' : 'md:col-start-1 md:text-right'}`}>
                  <span className="text-prominent mb-3 block font-mono tabular-nums text-xs leading-[1.45] sm:text-[13px]">
                    {item.id} / 05
                  </span>
                  <h3 className="text-heading text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem]">
                    {item.title}
                  </h3>
                  <p className={`text-supporting-copy mt-3 max-w-sm text-[15px] leading-[1.6] sm:text-base ${!isEven ? 'md:ml-auto' : ''}`}>
                    {item.description}
                  </p>
                </div>
                <div aria-hidden className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2">
                  <motion.span
                    variants={{ inactive: { opacity: 0.6 }, active: { opacity: 1 } }}
                    className={`mt-1 size-3.5 rounded-xl transition-colors ${
                      isActive ? 'bg-[#0d4bfa]' : 'bg-black/[0.08] dark:bg-white/[0.12]'
                    }`}
                  />
                </div>
                <div aria-hidden className={`relative z-10 hidden items-center md:flex ${isEven ? 'md:col-start-1 md:row-start-1 md:justify-end' : 'md:col-start-3'}`}>
                  <div className="flex size-14 items-center justify-center rounded-xl bg-surface-card-elevated text-[#0d4bfa]">
                    <Icon size={24} strokeWidth={1.6} />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
