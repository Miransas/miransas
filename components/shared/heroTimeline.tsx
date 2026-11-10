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
    setActive((current) => (current === next ? current : next));
  });

  return (
    <section aria-label="How we build" className="bg-background text-foreground px-6 py-20 md:py-28">
      <Reveal className="mx-auto mb-14 max-w-4xl">
        <p className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">The engineering process</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl">From a question to a working system.</h2>
        <p className="text-muted-foreground mt-5 max-w-xl text-sm leading-7">A sequence of decisions, built around the problem. From discovery to refinement, each step makes the next decision clearer.</p>
      </Reveal>
      <div className="relative mx-auto max-w-4xl" ref={containerRef}>
        <div aria-hidden className="bg-border absolute top-0 bottom-0 left-4 w-px md:left-1/2" />
        <motion.div aria-hidden className="bg-foreground/60 absolute top-0 bottom-0 left-4 w-px origin-top md:left-1/2" style={{ scaleY: reduce ? 1 : scrollYProgress }} />
        <div className="flex flex-col gap-6 md:gap-10">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = item.icon;
            return (
              <motion.article key={item.id} initial={false} animate={index === active ? 'active' : 'inactive'} data-active={index === active} aria-current={index === active ? 'step' : undefined} className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-5 py-6 md:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] md:gap-8 md:py-8">
                <motion.div aria-hidden variants={{ inactive: { opacity: 0 }, active: { opacity: 1 } }} transition={{ duration: reduce ? 0 : 0.35 }} className="bg-card absolute -inset-x-3 inset-y-0 rounded-2xl" />
                <div className={`relative z-10 col-start-2 row-start-1 min-w-0 ${isEven ? 'md:col-start-3' : 'md:col-start-1 md:text-right'}`}>
                  <p className="text-muted-foreground mb-3 font-mono text-xs tracking-wider">{item.id}</p>
                  <h3 className={`text-xl font-medium tracking-tight transition-colors ${index === active ? 'text-foreground' : 'text-muted-foreground'}`}>{item.title}</h3>
                  <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-7">{item.description}</p>
                </div>
                <div aria-hidden className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2">
                  <motion.span variants={{ inactive: { scale: 0.8 }, active: { scale: 1 } }} className="border-background bg-foreground ring-border mt-1 size-4 rounded-full border-[3px] ring-1" />
                </div>
                <div aria-hidden className={`relative z-10 hidden items-center md:flex ${isEven ? 'md:col-start-1 md:row-start-1 md:justify-end' : 'md:col-start-3'}`}>
                  <div className="border-border bg-elevated text-muted-foreground flex size-16 items-center justify-center rounded-2xl border">
                    <Icon size={28} strokeWidth={1.4} />
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
