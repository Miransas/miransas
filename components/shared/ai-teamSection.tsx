'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { UI_DURATION, UI_EASE } from '@/lib/ui-motion';
import { Reveal } from './reval';
import { Sparkles, Users, Cpu, ShieldCheck } from 'lucide-react';
import RobotEyes from './RobotEyes';

type RobotSize = 'outer' | 'medium' | 'center';

function TeamRobot({ size, delay }: { size: RobotSize; delay: number }) {
  const reduce = useReducedMotion();
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
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: config.opacity, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: reduce ? 0 : delay, duration: reduce ? 0 : UI_DURATION.section, ease: UI_EASE }}
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
  return (
    <section
      className="surface-page relative flex flex-col items-center justify-between overflow-hidden py-24 sm:py-32"
    >
      <Reveal className="relative z-30 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <div
          className="text-prominent inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]"
        >
          <Sparkles className="size-3.5 text-[#0d4bfa]" />
          <span>AI &amp; engineering</span>
        </div>
        <h2
          className="text-heading mt-5 text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]"
        >
          Intelligence, built to <br className="hidden sm:block" /> work together.
        </h2>
        <p
          className="text-supporting-copy mt-5 max-w-xl text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]"
        >
          We are exploring how voice, language and software can work as one system. The direction is collaborative intelligence, built with the same care as the infrastructure beneath it.
        </p>
        <div
          className="text-prominent mt-7 flex flex-wrap items-center justify-center gap-3 text-xs font-medium sm:text-[13px]"
        >
          <div className="bg-surface-card-elevated flex items-center gap-2 rounded-xl px-3.5 py-2">
            <Users className="size-3.5 text-[#3847ff]" />
            <span>Connected systems</span>
          </div>
          <div className="bg-surface-card-elevated flex items-center gap-2 rounded-xl px-3.5 py-2">
            <Cpu className="size-3.5 text-[#3847ff]" />
            <span>Voice interaction</span>
          </div>
          <div className="bg-surface-card-elevated flex items-center gap-2 rounded-xl px-3.5 py-2">
            <ShieldCheck className="size-3.5 text-[#3847ff]" />
            <span>Developer control</span>
          </div>
        </div>
      </Reveal>
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
