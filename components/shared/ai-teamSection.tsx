'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Users, Cpu, ShieldCheck } from 'lucide-react';
import RobotEyes from './RobotEyes';

type RobotSize = 'outer' | 'medium' | 'center';

function TeamRobot({ size, delay }: { size: RobotSize; delay: number }) {
  const config = {
    outer: {
      width: 180,
      height: 200,
      scale: 0.38,
      opacity: 0.5,
      zIndex: 10,
      margin: '-mx-8 sm:-mx-10 lg:-mx-12',
    },
    medium: {
      width: 250,
      height: 280,
      scale: 0.54,
      opacity: 0.78,
      zIndex: 20,
      margin: '-mx-6 sm:-mx-8 lg:-mx-10',
    },
    center: {
      width: 360,
      height: 380,
      scale: 0.74,
      opacity: 1,
      zIndex: 30,
      margin: 'z-30 relative',
    },
  }[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: config.opacity, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay, duration: 0.8, ease: 'easeOut' }}
      className={`pointer-events-none relative shrink-0 ${config.margin}`}
      style={{
        width: config.width,
        height: config.height,
        zIndex: config.zIndex,
      }}
    >
      <div
        className="absolute bottom-0 left-1/2 origin-bottom"
        style={{
          width: 600,
          height: 600,
          transform: `translateX(-50%) scale(${config.scale})`,
        }}
      >
        <RobotEyes />
      </div>
    </motion.div>
  );
}

export function AiTeamSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="surface-page relative flex min-h-[80vh] flex-col items-center justify-between overflow-hidden py-16 md:py-24"
    >
      <div className="relative z-30 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="text-prominent inline-flex items-center gap-2 rounded-xl bg-[#0d4bfa]/10 px-3.5 py-1.5 text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px] dark:bg-[#0d4bfa]/15"
        >
          <Sparkles className="size-3.5 text-[#0d4bfa]" />
          <span>AI &amp; engineering</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.15, duration: 0.65, ease: 'easeOut' }}
          className="text-heading mt-5 text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]"
        >
          Intelligence, built to <br className="hidden sm:block" /> work together.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.25, duration: 0.65, ease: 'easeOut' }}
          className="text-secondary-copy mt-5 max-w-xl text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]"
        >
          We are exploring how voice, language and software can work as one system. The direction is collaborative intelligence, built with the same care as the infrastructure beneath it.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-prominent mt-7 flex flex-wrap items-center justify-center gap-3 text-xs font-medium sm:text-[13px]"
        >
          <div className="surface-card flex items-center gap-2 rounded-xl px-3.5 py-2">
            <Users className="size-3.5 text-[#3847ff]" />
            <span>Connected systems</span>
          </div>
          <div className="surface-card flex items-center gap-2 rounded-xl px-3.5 py-2">
            <Cpu className="size-3.5 text-[#3847ff]" />
            <span>Voice interaction</span>
          </div>
          <div className="surface-card flex items-center gap-2 rounded-xl px-3.5 py-2">
            <ShieldCheck className="size-3.5 text-[#3847ff]" />
            <span>Developer control</span>
          </div>
        </motion.div>
      </div>
      <div className="relative z-10 mt-8 flex w-full items-end justify-center overflow-visible px-2">
        <div className="hidden xl:block">
          <TeamRobot size="outer" delay={0.1} />
        </div>

        <div className="hidden sm:block">
          <TeamRobot size="medium" delay={0.2} />
        </div>

        <TeamRobot size="center" delay={0.3} />

        <div className="hidden sm:block">
          <TeamRobot size="medium" delay={0.4} />
        </div>

        <div className="hidden xl:block">
          <TeamRobot size="outer" delay={0.5} />
        </div>
      </div>
    </section>
  );
}
