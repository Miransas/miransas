"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Terminal, Code2, Gamepad2, 
  Database, Shield, Zap, Workflow, Globe 
} from "lucide-react";
import { cn } from "@/lib/utils"; // cn utils function olduğunu varsayıyoruz

// ─── Animated Flow Line ─────────────
const AnimatedLine = ({ 
  d, 
  color, 
  delay, 
  duration = 3, 
  className 
}: { 
  d: string; 
  color: string; 
  delay: number; 
  duration?: number;
  className?: string;
}) => (
  <g className={className}>
    {/* Arka plan sönük kablo izi */}
    <path 
      d={d} 
      className="stroke-white/5" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    {/* Akan Enerji (Işık) */}
    <motion.path
      d={d}
      stroke={color}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ filter: `drop-shadow(0 0 8px ${color})` }}
    />
    {/* Lazerin Ucundaki Veri Paketi (Parlayan Nokta) */}
    <motion.circle
      r="4"
      fill={color}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{
        offsetPath: `path("${d}")`,
        animation: `travel-dot-${delay.toString().replace(".", "")} ${duration}s ${delay}s ease-in-out infinite`,
        filter: `drop-shadow(0 0 10px ${color})`,
      }}
    />
    <style>{`
      @keyframes travel-dot-${delay.toString().replace(".", "")} {
        0%   { offset-distance: 0%; opacity: 0; }
        15%  { opacity: 1; }
        85%  { opacity: 1; }
        100% { offset-distance: 100%; opacity: 0; }
      }
    `}</style>
  </g>
);

export default function EcosystemSection() {
  return (
    <section className="min-h-screen bg-[#050505] text-white py-32 px-6 relative overflow-hidden font-sans selection:bg-[#8CFF2E] selection:text-black">
      
      {/* İnce Siber Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ─── HEADER ─── */}
        <div className="mb-20">
          <div className="flex items-center gap-3 text-[#8CFF2E] font-bold tracking-widest text-[10px] uppercase mb-6">
            <span className="w-8 h-[1px] bg-[#8CFF2E]" />
            <Shield size={14} className="text-[#8CFF2E]" />
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

        {/* ─── DIAGRAM AREA ─── */}
        <div className="relative w-full h-[500px] bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden hidden md:block">
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 500" preserveAspectRatio="none">
            {/* Left to Center */}
            <AnimatedLine d="M 280 120 L 400 120 C 450 120, 450 250, 480 250" color="#FFFFFF" delay={0} duration={2.5} /> {/* Worktio - UI/White */}
            <AnimatedLine d="M 280 250 L 480 250" color="#EF4444" delay={0.8} duration={2} /> {/* Lost Signal - Game/Red */}
            <AnimatedLine d="M 280 380 L 400 380 C 450 380, 450 250, 480 250" color="#8CFF2E" delay={1.5} duration={2.5} /> {/* binboi - Sys/Green */}

            {/* Center to Hub */}
            <AnimatedLine d="M 530 250 L 630 250" color="#8CFF2E" delay={0.2} duration={1.5} />

            {/* Hub to Right Nodes */}
            <AnimatedLine d="M 700 250 L 730 250 L 730 120 L 760 120" color="#8CFF2E" delay={1.2} duration={2} /> 
            <AnimatedLine d="M 700 250 L 760 250" color="#FFFFFF" delay={0.5} duration={1.5} /> 
            <AnimatedLine d="M 700 250 L 730 250 L 730 380 L 760 380" color="#EF4444" delay={1.8} duration={2} /> 
            <AnimatedLine d="M 820 250 L 880 250" color="#8CFF2E" delay={2} duration={1} />
          </svg>

          {/* ─── LEFT NODES (PROJECTS) ─── */}
          <div className="absolute left-[5%] top-[120px] -translate-y-1/2 flex items-center gap-4 text-sm font-bold tracking-wide text-white bg-[#050505] border border-white/10 px-5 py-3 rounded-xl z-10 hover:border-white transition-colors cursor-default">
            <Workflow size={18} className="text-white" /> Worktio Engine
          </div>
          <div className="absolute left-[5%] top-[250px] -translate-y-1/2 flex items-center gap-4 text-sm font-bold tracking-wide text-white bg-[#050505] border border-white/10 px-5 py-3 rounded-xl z-10 hover:border-[#EF4444] transition-colors cursor-default">
            <Gamepad2 size={18} className="text-[#EF4444]" /> Lost Signal Nodes
          </div>
          <div className="absolute left-[5%] top-[380px] -translate-y-1/2 flex items-center gap-4 text-sm font-bold tracking-wide text-white bg-[#050505] border border-white/10 px-5 py-3 rounded-xl z-10 hover:border-[#8CFF2E] transition-colors cursor-default">
            <Terminal size={18} className="text-[#8CFF2E]" /> binboi Tunnels
          </div>

          {/* ─── CENTER NODE ─── */}
          <div className="absolute left-[50%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-[#050505] border border-white/20 p-6 rounded-2xl shadow-[0_0_40px_rgba(140,255,46,0.15)] group hover:border-[#8CFF2E] transition-all cursor-default">
              <Code2 size={32} className="text-[#8CFF2E] group-hover:scale-110 transition-transform" />
            </div>
          </div>

          {/* ─── STATUS BADGE ─── */}
          <div className="absolute left-[66%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-[#8CFF2E]/10 border border-[#8CFF2E]/30 text-[#8CFF2E] text-[9px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase backdrop-blur-md flex items-center gap-2">
               <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CFF2E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#8CFF2E]"></span>
               </span>
              Synchronized
            </div>
          </div>

          {/* ─── RIGHT NODES (INFRASTRUCTURE) ─── */}
          <div className="absolute left-[79%] top-[120px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-[#050505] border border-white/10 p-4 rounded-xl shadow-lg hover:border-[#8CFF2E] transition-colors cursor-default">
              <Database size={24} className="text-[#8CFF2E]" />
            </div>
          </div>
          <div className="absolute left-[79%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-[#050505] border border-white/10 p-4 rounded-xl shadow-lg hover:border-white transition-colors cursor-default">
              <Shield size={24} className="text-white" />
            </div>
          </div>
          <div className="absolute left-[91%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-[#050505] border border-white/10 p-4 rounded-xl shadow-lg hover:border-[#8CFF2E] transition-colors cursor-default">
              <Globe size={24} className="text-[#8CFF2E]" />
            </div>
          </div>
          <div className="absolute left-[79%] top-[380px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-[#050505] border border-white/10 p-4 rounded-xl shadow-lg hover:border-[#EF4444] transition-colors cursor-default">
              <Zap size={24} className="text-[#EF4444]" />
            </div>
          </div>
        </div>

        {/* ─── BOTTOM FEATURES (PROJECT DETAILS) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          <div className="group">
            <div className="flex items-center gap-3 text-white mb-4">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-white transition-colors">
                 <Workflow size={20} className="text-white" />
              </div>
              <h4 className="font-black italic uppercase tracking-tight text-lg">Worktio Intelligence</h4>
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-light">
              Optimizing complex data pipelines and adaptive background tasks. Centralized neural analytics delivered with sub-millisecond precision.
            </p>
          </div>
          
          <div className="group">
            <div className="flex items-center gap-3 text-white mb-4">
              <div className="p-2 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 group-hover:border-[#EF4444] transition-colors">
                 <Gamepad2 size={20} className="text-[#EF4444]" />
              </div>
              <h4 className="font-black italic uppercase tracking-tight text-lg">Lost Signal Infrastructure</h4>
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-light">
              Custom database architecture and low-level rendering logic driving an immersive, persistent atmospheric universe.
            </p>
          </div>

          <div className="group">
            <div className="flex items-center gap-3 text-white mb-4">
              <div className="p-2 rounded-lg bg-[#8CFF2E]/10 border border-[#8CFF2E]/20 group-hover:border-[#8CFF2E] transition-colors">
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