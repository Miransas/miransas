/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  motion,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import { Sparkles, Users, Cpu, ShieldCheck } from "lucide-react";
import RobotEyes from "./RobotEyes";

type RobotSize = "outer" | "medium" | "center";

function TeamRobot({
  size,
  delay,
}: {
  size: RobotSize;
  delay: number;
}) {
  const config = {
    outer: {
      width: 240,
      height: 260,
      scale: 0.42,
      opacity: 0.5,
    },
    medium: {
      width: 320,
      height: 350,
      scale: 0.58,
      opacity: 0.75,
    },
    center: {
      width: 440,
      height: 460,
      scale: 0.78,
      opacity: 1,
    },
  }[size];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      animate={{
        opacity: config.opacity,
        y: 0,
      }}
      transition={{
        delay,
        duration: 0.9,
        ease: "easeOut",
      }}
      className="relative shrink-0 pointer-events-none"
      style={{
        width: config.width,
        height: config.height,
      }}
    >
      <div
        className="
          absolute
          left-1/2
          bottom-0
          origin-bottom
        "
        style={{
          width: 650,
          height: 650,
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

  const inView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  return (
    <section
      ref={ref}
      className="
        relative  overflow-hidden bg-[#020203] flex flex-col items-center justify-between min-h-[90vh]" >

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[350px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.04] blur-[140px]" />
        <div className="absolute left-[15%] top-1/4 h-[220px] w-[220px] rounded-full bg-rose-500/[0.025] blur-[110px]" />
        <div className="absolute right-[15%] top-1/4 h-[220px] w-[220px] rounded-full bg-lime-400/[0.02] blur-[110px]" />
      </div>

      {/* =================================================
          CONTENT HEADER
      ================================================= */}
      <div className="relative z-30 max-w-4xl mx-auto px-4 text-center flex flex-col items-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-medium text-zinc-300 mb-6 backdrop-blur-md shadow-lg"
        >
          <Sparkles size={14} className="text-purple-400 animate-pulse" />
          <span>Autonomous AI Workforce</span>
        </motion.div>

        <motion.h2
          initial={{
            opacity: 0,
            x: -25,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.25,
            duration: 0.75,
            ease: "easeOut",
          }}
          className="mt-6 w-full max-w-none text-left whitespace-normal break-normal text-[38px] leading-[1.08] tracking-[-0.045em] text-[#fff3f0] sm:text-[46px] md:text-[56px] md:leading-[1.08]"

        >
          An AI team designed to <br className="hidden md:block" /> scale your operations.
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.38,
            duration: 0.75,
            ease: "easeOut",
          }}
          className="mt-6 max-w-[560px] text-left text-[14px] leading-6 text-white/65 md:text-[15px] md:leading-7"
        >
          Deploy specialized intelligence agents that collaborate seamlessly in real time, handling customer success, workflow automation, and complex problem solving 24/7.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs mt-4 text-zinc-400 font-medium"
        >
          <div className="flex items-center gap-2 bg-zinc-900/40 px-3 py-1.5 rounded-lg border border-zinc-800/60">
            <Users size={14} className="text-purple-400" />
            <span>Multi-Agent Sync</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/40 px-3 py-1.5 rounded-lg border border-zinc-800/60">
            <Cpu size={14} className="text-rose-400" />
            <span>Real-time Response</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/40 px-3 py-1.5 rounded-lg border border-zinc-800/60">
            <ShieldCheck size={14} className="text-lime-400" />
            <span>Enterprise Grade</span>
          </div>
        </motion.div>
      </div>

      {/* =================================================
          ROBOT ROW
      ================================================= */}
      <div
        className="
          relative
          z-10
          flex
          items-end
          justify-center
          w-full
          mt-6
          overflow-visible
          px-2
          gap-1 md:gap-1
        "
      >
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

      {/* =================================================
          SOFT FLOOR (Geliştirilmiş Zemin Gölgesi ve Blur)
      ================================================= */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.65 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : undefined}
        transition={{ delay: 0.55, duration: 1.2 }}
        className="
          pointer-events-none
          absolute
          bottom-2
          left-1/2
          z-20
          h-[120px]
          w-[85%]
          -translate-x-1/2
          rounded-full
          bg-gradient-to-r
          from-transparent
          via-purple-500/[0.08]
          to-transparent
          blur-[50px]
        "
      />

      {/* =================================================
          BOTTOM FADE (Sert Kesimi Yok Eden Derin Gradyan)
      ================================================= */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-30
          h-[28vh]
          bg-gradient-to-t
          from-[#020203]
          via-[#020203]/95
          to-transparent
        "
      />
    </section>
  );
}