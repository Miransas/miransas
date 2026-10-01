/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion, useInView } from "framer-motion";
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
      width: 180,
      height: 200,
      scale: 0.38,
      opacity: 0.5,
      zIndex: 10,
      margin: "-mx-8 sm:-mx-10 lg:-mx-12",
    },
    medium: {
      width: 250,
      height: 280,
      scale: 0.54,
      opacity: 0.78,
      zIndex: 20,
      margin: "-mx-6 sm:-mx-8 lg:-mx-10",
    },
    center: {
      width: 360,
      height: 380,
      scale: 0.74,
      opacity: 1,
      zIndex: 30,
      margin: "z-30 relative",
    },
  }[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: config.opacity, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className={`relative shrink-0 pointer-events-none ${config.margin}`}
      style={{
        width: config.width,
        height: config.height,
        zIndex: config.zIndex,
      }}
    >
      <div
        className="absolute left-1/2 bottom-0 origin-bottom"
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
      className="relative overflow-hidden bg-[#050505] py-16 md:py-24 flex flex-col items-center justify-between min-h-[80vh] border-t border-border/40"
    >
      {/* AMBER & DARK BACKDROP GLOWS */}
    /
      {/* =================================================
          CONTENT HEADER (Ortalanmış ve Daraltılmış)
      ================================================= */}
      <div className="relative z-30 max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/70 border border-border text-xs font-mono text-muted-foreground backdrop-blur-md shadow-sm"
        >
          <Sparkles className="size-3.5 text-primary animate-pulse" />
          <span>Autonomous AI Workforce</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.15, duration: 0.65, ease: "easeOut" }}
          className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-[1.1]"
        >
          An AI team designed to <br className="hidden sm:block" /> scale your operations.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.25, duration: 0.65, ease: "easeOut" }}
          className="mt-4 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed"
        >
          Deploy specialized intelligence agents that collaborate seamlessly in real time, handling customer success, workflow automation, and complex problem solving 24/7.
        </motion.p>

        {/* Features Chips */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs mt-6 text-muted-foreground font-medium"
        >
          <div className="flex items-center gap-2 bg-card/60 px-3 py-1.5 rounded-lg border border-border backdrop-blur-sm">
            <Users className="size-3.5 text-primary" />
            <span>Multi-Agent Sync</span>
          </div>
          <div className="flex items-center gap-2 bg-card/60 px-3 py-1.5 rounded-lg border border-border backdrop-blur-sm">
            <Cpu className="size-3.5 text-amber-400" />
            <span>Real-time Response</span>
          </div>
          <div className="flex items-center gap-2 bg-card/60 px-3 py-1.5 rounded-lg border border-border backdrop-blur-sm">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            <span>Enterprise Grade</span>
          </div>
        </motion.div>
      </div>

      {/* =================================================
          ROBOT ROW (Sıkılaştırılmış ve Derinlikli Dizilim)
      ================================================= */}
      <div className="relative z-10 flex items-end justify-center w-full mt-8 overflow-visible px-2">
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

  
      {/* <motion.div
        initial={{ opacity: 0, scaleX: 0.65 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : undefined}
        transition={{ delay: 0.55, duration: 1 }}
        className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-[100px] w-[80%] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-primary/15 to-transparent blur-[40px]"
      />

    
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[20vh] bg-gradient-to-t from-background via-background/80 to-transparent" /> */}
    </section>
  );
}