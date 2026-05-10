"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, Code2, Gamepad2,
  Database, Shield, Zap, Workflow, Globe
} from "lucide-react";
import { cn } from "../../lib/utils";

// ─── NODE STYLE HELPER ───
const nodeStyle = (accent: string, alpha = 0.12) => ({
  background: `radial-gradient(ellipse at 50% 0%, ${accent}${Math.round(alpha * 255).toString(16).padStart(2, "0")} 0%, transparent 70%), #0a0a0a`,
  border: `1px solid ${accent}45`,
  boxShadow: `0 0 24px ${accent}20, inset 0 0 20px ${accent}0c`,
});

// ─── BEAM TANIMLARI ───
// Sol node'lardan merkeze giden 3 beam, sonra merkezden sağa giden 4 beam
// Sıra: LEFT_0 → LEFT_1 → LEFT_2 → RIGHT_0 → RIGHT_1 → RIGHT_2 → RIGHT_3 → tekrar
const BEAMS = [
  // Sol → Merkez
  { id: "l0", d: "M 280 120 L 400 120 C 450 120, 450 250, 480 250", color: "#FFFFFF", accent: 0 },
  { id: "l1", d: "M 280 250 L 480 250",                              color: "#EF4444", accent: 1 },
  { id: "l2", d: "M 280 380 L 400 380 C 450 380, 450 250, 480 250", color: "#8CFF2E", accent: 2 },
  // Merkez → Sağ
  { id: "r0", d: "M 530 250 L 700 250 L 700 120 L 760 120",         color: "#8CFF2E", accent: -1 },
  { id: "r1", d: "M 530 250 L 760 250",                              color: "#FFFFFF", accent: -1 },
  { id: "r2", d: "M 530 250 L 700 250 L 700 380 L 760 380",         color: "#EF4444", accent: -1 },
  { id: "r3", d: "M 820 250 L 880 250",                              color: "#8CFF2E", accent: -1 },
];

// Her beam 1.6s akar, 200ms boşluk
const BEAM_DURATION = 1600;
const BEAM_GAP = 200;

// accent index → renk
const ACCENT_COLORS: Record<number, string> = {
  0: "#FFFFFF",
  1: "#EF4444",
  2: "#8CFF2E",
};

// ─── SEQUENTIAL BEAM HOOK ───
function useSequentialBeam(count: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, BEAM_DURATION + BEAM_GAP);
    return () => clearInterval(interval);
  }, [count]);

  return activeIndex;
}

// ─── SVG DIAGRAM ───
const Diagram = ({ activeBeam, centerAccent }: { activeBeam: number; centerAccent: string }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none z-0"
    viewBox="0 0 1000 500"
    preserveAspectRatio="none"
  >
    {BEAMS.map((beam, i) => (
      <g key={beam.id}>
        {/* Sabit sönük kablo */}
        <path
          d={beam.d}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Aktif akan ışık */}
        {activeBeam === i && (
          <motion.path
            key={`${beam.id}-${activeBeam}`}
            d={beam.d}
            stroke={beam.color}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
            transition={{ duration: BEAM_DURATION / 1000, ease: "easeInOut" }}
            style={{ filter: `drop-shadow(0 0 6px ${beam.color})` }}
          />
        )}
      </g>
    ))}
  </svg>
);


type EcosystemSectionProps = {
  themeColor: "rose" | "lime";
};

export default function EcosystemSection() {
  const activeBeam = useSequentialBeam(BEAMS.length);
  const isRose = BEAMS[activeBeam].color === "#EF4444";
  // Aktif beam'in sol node accent'i (merkez node rengi için)
  const currentBeam = BEAMS[activeBeam];
  const centerAccent =
    currentBeam.accent >= 0
      ? ACCENT_COLORS[currentBeam.accent]
      : ACCENT_COLORS[2]; // sağ beam'lerde yeşil default

  return (
    <section className="min-h-screen bg-[#050505] text-white py-32 px-6 relative overflow-hidden font-sans selection:bg-[#8CFF2E] selection:text-black">

      {/* Siber Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ─── HEADER ─── */}
        <div className="mb-20">
          <div className="flex items-center gap-3 text-[#8CFF2E] font-bold tracking-widest text-[10px] uppercase mb-6">
            <span className="w-8 h-[1px] bg-[#8CFF2E]" />
            <Shield size={14} />
            Miransas Core Architecture
            <span className="w-8 h-[1px] bg-[#8CFF2E]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">
            Unified Ecosystem.
          </h2>
          <p className="text-white/50 max-w-2xl text-lg font-light leading-relaxed">
            A centralized engine powering our flagship applications. Seamlessly orchestrating workflows, gaming nodes, and secure network tunnels with zero latency.
          </p>
        </div>

        {/* ─── DIAGRAM CARD ─── */}
        <div
          className="relative w-full h-[500px] rounded-3xl p-8 overflow-hidden hidden md:block transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${centerAccent}0a 0%, transparent 60%), bg-[#09090b]`,
            border: `1px solid ${centerAccent}25`,
            boxShadow: `0 0 60px ${centerAccent}12, 0 0 120px ${centerAccent}08, inset 0 0 80px ${centerAccent}05`,
            transition: "background 0.7s ease, border-color 0.7s ease, box-shadow 0.7s ease",
          }}
        >
          <div className={cn(
                  "absolute inset-0 h-1/2 bg-gradient-to-b to-transparent opacity-20 pointer-events-none z-0",
                  isRose ? "from-rose-500" : "from-[#9eff00]"
                )} />
          <Diagram activeBeam={activeBeam} centerAccent={centerAccent} />

          {/* ─── SOL NODE'LAR ─── */}
          <div
            className="absolute left-[5%] top-[120px] -translate-y-1/2 flex items-center gap-3 text-sm font-bold tracking-wide text-white px-5 py-3 rounded-xl z-10 cursor-default transition-all duration-300 hover:scale-[1.03]"
            style={nodeStyle("#FFFFFF", 0.06)}
          >
            <Workflow size={18} className="text-white" />
            Worktio Engine
          </div>

          <div
            className="absolute left-[5%] top-[250px] -translate-y-1/2 flex items-center gap-3 text-sm font-bold tracking-wide text-white px-5 py-3 rounded-xl z-10 cursor-default transition-all duration-300 hover:scale-[1.03]"
            style={nodeStyle("#EF4444")}
          >
            <Gamepad2 size={18} className="text-[#EF4444]" />
            Lost Signal Nodes
          </div>

          <div
            className="absolute left-[5%] top-[380px] -translate-y-1/2 flex items-center gap-3 text-sm font-bold tracking-wide text-white px-5 py-3 rounded-xl z-10 cursor-default transition-all duration-300 hover:scale-[1.03]"
            style={nodeStyle("#8CFF2E")}
          >
            <Terminal size={18} className="text-[#8CFF2E]" />
            binboi Tunnels
          </div>

          {/* ─── MERKEZ NODE — aktif beam rengine göre değişiyor ─── */}
          <div className="absolute left-[50%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              className="p-6 rounded-2xl cursor-default"
              animate={{
                background: `radial-gradient(ellipse at 50% 0%, ${centerAccent}30 0%, transparent 70%), #0a0a0a`,
                borderColor: `${centerAccent}55`,
                boxShadow: `0 0 40px ${centerAccent}30, inset 0 0 30px ${centerAccent}15`,
              }}
              transition={{ duration: 0.5 }}
              style={{ border: "1px solid" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={centerAccent}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Code2 size={32} style={{ color: centerAccent }} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ─── STATUS BADGE ─── */}
          <div className="absolute left-[66%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-20">
            <div
              className="text-[#8CFF2E] text-[9px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase flex items-center gap-2"
              style={nodeStyle("#8CFF2E", 0.10)}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CFF2E] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#8CFF2E]" />
              </span>
              Synchronized
            </div>
          </div>

          {/* ─── SAĞ NODE'LAR ─── */}
          <div className="absolute left-[79%] top-[120px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="p-4 rounded-xl cursor-default transition-all duration-300 hover:scale-110" style={nodeStyle("#8CFF2E", 0.15)}>
              <Database size={24} className="text-[#8CFF2E]" />
            </div>
          </div>

          <div className="absolute left-[79%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="p-4 rounded-xl cursor-default transition-all duration-300 hover:scale-110" style={nodeStyle("#FFFFFF", 0.06)}>
              <Shield size={24} className="text-white" />
            </div>
          </div>

          <div className="absolute left-[91%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="p-4 rounded-xl cursor-default transition-all duration-300 hover:scale-110" style={nodeStyle("#8CFF2E", 0.15)}>
              <Globe size={24} className="text-[#8CFF2E]" />
            </div>
          </div>

          <div className="absolute left-[79%] top-[380px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="p-4 rounded-xl cursor-default transition-all duration-300 hover:scale-110" style={nodeStyle("#EF4444")}>
              <Zap size={24} className="text-[#EF4444]" />
            </div>
          </div>
        </div>

        {/* ─── ALT FEATURE KARTLARI ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

          <div className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]" style={nodeStyle("#FFFFFF", 0.05)}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={nodeStyle("#FFFFFF", 0.08)}>
                <Workflow size={20} className="text-white" />
              </div>
              <h4 className="font-black italic uppercase tracking-tight text-lg">Worktio Intelligence</h4>
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-light">
              Optimizing complex data pipelines and adaptive background tasks. Centralized neural analytics delivered with sub-millisecond precision.
            </p>
          </div>

          <div className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]" style={nodeStyle("#EF4444")}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={nodeStyle("#EF4444", 0.18)}>
                <Gamepad2 size={20} className="text-[#EF4444]" />
              </div>
              <h4 className="font-black italic uppercase tracking-tight text-lg">Lost Signal Infrastructure</h4>
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-light">
              Custom database architecture and low-level rendering logic driving an immersive, persistent atmospheric universe.
            </p>
          </div>

          <div className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]" style={nodeStyle("#8CFF2E")}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={nodeStyle("#8CFF2E", 0.18)}>
                <Terminal size={20} className="text-[#8CFF2E]" />
              </div>
              <h4 className="font-black italic uppercase tracking-tight text-lg">binboi Zero-Config</h4>
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-light">
              Secure, instant local environment exposure. High-speed encrypted routing transitioning your localhost directly to the global network.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}