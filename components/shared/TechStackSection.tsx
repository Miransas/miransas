/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Gamepad2, Activity, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// ─── SVG BEAM ───
// viewBox 900x200, Chip merkezi x=450 y=50
// Sol kart ~%17 → x=153, Orta ~%50 → x=450, Sağ ~%83 → x=747
const BEAM_PATHS = [
  { d: "M 450 50 C 450 120, 153 120, 153 180", color: "#FFFFFF" },
  { d: "M 450 50 L 450 180",                   color: "#8CFF2E" },
  { d: "M 450 50 C 450 120, 747 120, 747 180", color: "#EF4444" },
];

const SequentialBeams = ({ activeIndex }: { activeIndex: number }) => (
  <svg
    viewBox="0 0 900 200"
    className="absolute top-0 left-0 w-full h-[200px] pointer-events-none overflow-visible z-[6]"
    preserveAspectRatio="xMidYMid meet"
  >
    {BEAM_PATHS.map((b, i) => (
      <g key={i}>
        {/* Sabit sönük kablo */}
        <path
          d={b.d}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Aktif akan ışık */}
        {activeIndex === i && (
          <motion.path
            key={`active-${i}`}
            d={b.d}
            stroke={b.color}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            style={{ filter: `drop-shadow(0 0 6px ${b.color})` }}
          />
        )}
      </g>
    ))}
  </svg>
);

// ─── ÇİP ───
const Chip = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col items-center relative z-10"
  >
    <div className="flex gap-2 mb-[-4px]">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`top-${i}`}
          className="w-1.5 h-4 rounded-t-sm bg-[#111] border-x border-t border-white/10"
          animate={{ backgroundColor: ["#111", "#8CFF2E40", "#111"] }}
          transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
    <div className="bg-[#050505] border border-white/10 rounded-lg px-8 py-4 relative shadow-[0_0_50px_rgba(140,255,46,0.1)]">
      {[0, 1].map((i) => (
        <div key={`l-${i}`} className="absolute -left-3 w-3 h-[2px] bg-white/20 rounded-full" style={{ top: `${35 + i * 30}%` }} />
      ))}
      {[0, 1].map((i) => (
        <div key={`r-${i}`} className="absolute -right-3 w-3 h-[2px] bg-white/20 rounded-full" style={{ top: `${35 + i * 30}%` }} />
      ))}
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CFF2E] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8CFF2E]" />
        </span>
        <span className="text-white/80 text-[11px] font-bold tracking-[0.3em] font-mono uppercase">
          Core_Router_v4
        </span>
      </div>
    </div>
    <div className="flex gap-2 mt-[-4px]">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`bot-${i}`}
          className="w-1.5 h-4 rounded-b-sm bg-[#111] border-x border-b border-white/10"
          animate={{ backgroundColor: ["#111", "#8CFF2E40", "#111"] }}
          transition={{ duration: 2, delay: i * 0.15 + 0.5, repeat: Infinity }}
        />
      ))}
    </div>
  </motion.div>
);

// ─── KART VERİLERİ ───
const CARDS = [
  {
    icon: <Code2 size={24} className="text-white" />,
    title: "UI Architecture",
    accent: "#FFFFFF",
    bgGlow: "radial-gradient(ellipse at 50% -10%, rgba(255,255,255,0.07) 0%, transparent 65%)",
    border: "rgba(255,255,255,0.15)",
    shadow: "rgba(255,255,255,0.06)",
    link: "/projects",
    desc: "Crafting high-performance, SEO-critical digital experiences. Engineered with Next.js 15 and React Server Components for zero-latency rendering.",
  },
  {
    icon: <Activity size={24} className="text-[#050505]" />,
    iconBg: "bg-[#8CFF2E]",
    title: "Systems & Net",
    accent: "#8CFF2E",
    bgGlow: "radial-gradient(ellipse at 50% -10%, rgba(140,255,46,0.12) 0%, transparent 65%)",
    border: "rgba(140,255,46,0.28)",
    shadow: "rgba(140,255,46,0.10)",
    link: "/projects",
    desc: "Low-level optimization powered by Rust and Go. Driving memory-safe tunneling protocols like binboi and custom macOS VPN solutions.",
  },
  {
    icon: <Gamepad2 size={24} className="text-[#EF4444]" />,
    title: "Game Engines",
    accent: "#EF4444",
    bgGlow: "radial-gradient(ellipse at 50% -10%, rgba(239,68,68,0.12) 0%, transparent 65%)",
    border: "rgba(239,68,68,0.25)",
    shadow: "rgba(239,68,68,0.08)",
    link: "/games",
    desc: "Propelling the Lost Signal universe under Sadpera Studio. Seamlessly integrating complex physics logic with scalable distributed nodes.",
  },
];

// ─── KART ───
const Card = ({ card, index, isActive }: { card: any; index: number; isActive: boolean }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => card.link && router.push(card.link)}
      className="flex-1 w-full sm:min-w-[280px] max-w-full lg:max-w-[480px] p-6 sm:p-8 rounded-2xl cursor-pointer relative overflow-hidden"
      style={{
        background: `${card.bgGlow}, #0a0a0a`,
        border: `1px solid ${card.border}`,
        boxShadow: `0 0 40px ${card.shadow}, inset 0 0 30px ${card.shadow}`,
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 80px ${card.shadow}, 0 0 140px ${card.shadow}, inset 0 0 40px ${card.shadow}`,
        transition: { duration: 0.25 },
      }}
    >
      {/* Beam gelince ek parlama */}
      {isActive && (
        <motion.div
          key={`pulse-${index}`}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          style={{
            boxShadow: `0 0 100px ${card.accent}25, inset 0 0 60px ${card.accent}10`,
          }}
        />
      )}

      <div className="relative z-10">
        <div className={cn(
          "mb-8 p-3 rounded-xl w-fit border border-white/10 shadow-lg",
          card.iconBg ?? "bg-white/5"
        )}>
          {card.icon}
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-white text-xl font-black tracking-tight uppercase">
            {card.title}
          </span>
          <ArrowUpRight size={20} className="text-white/30" />
        </div>

        <p className="text-white/40 text-sm leading-relaxed font-light">
          {card.desc}
        </p>
      </div>
    </motion.div>
  );
};

// ─── SIRAYLA BEAM: 0 → 1 → 2 → 0 → ... ───
function useSequentialBeam() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const BEAM_DURATION = 1800; // motion ile eşleşiyor
    const GAP = 300;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, BEAM_DURATION + GAP);

    return () => clearInterval(interval);
  }, []);

  return activeIndex;
}

// ─── ANA BİLEŞEN ───
export default function TechStackSections() {
  const activeBeamIndex = useSequentialBeam();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="min-h-screen bg-[#050505] flex flex-col items-center justify-center py-20 sm:py-28 lg:py-32 px-6 relative overflow-hidden font-sans"
    >
      {/* Siber grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Başlık */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center mb-16 sm:mb-20 lg:mb-24 z-10"
      >
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-8 h-[1px] bg-[#8CFF2E]" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#8CFF2E]">
            Core Architecture
          </span>
          <span className="w-8 h-[1px] bg-[#8CFF2E]" />
        </div>
        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
          Engineered for{" "}
          <span
            className="text-transparent block sm:inline"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
          >
            Zero Latency.
          </span>
        </h2>
      </motion.div>

      {/* Çip + SVG + Kartlar */}
      <div className="relative w-full flex flex-col items-center max-w-[1400px] mx-auto">
        <Chip />

        <div className="relative w-full h-[200px] mt-[-56px] z-[5]">
          <SequentialBeams activeIndex={activeBeamIndex} />
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-6 w-full px-0 sm:px-4 relative z-20">
          {CARDS.map((card, i) => (
            <Card
              key={i}
              card={card}
              index={i}
              isActive={activeBeamIndex === i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}