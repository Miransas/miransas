"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Terminal, Code2, Gamepad2, 
  Database, Shield, Zap, Workflow, Globe 
} from "lucide-react";

// ─── Animated Flow Line ─────────────
const AnimatedLine = ({ d, color, delay, duration = 3 }: { d: string; color: string; delay: number; duration?: number }) => (
  <g>
    <path 
      d={d} 
      className="stroke-neutral-800" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
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
        10%  { opacity: 1; }
        90%  { opacity: 1; }
        100% { offset-distance: 100%; opacity: 0; }
      }
    `}</style>
  </g>
);

export default function EcosystemSection() {
  return (
    <section className="min-h-screen bg-[#030303] text-white py-32 px-6 relative overflow-hidden font-sans selection:bg-purple-500/30">
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ─── HEADER ─── */}
        <div className="mb-20">
          <div className="flex items-center gap-2 text-zinc-400 font-bold tracking-widest text-[10px] uppercase mb-4">
            <Shield size={14} className="text-purple-500" />
            Miransas Core Architecture
          </div>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
            Unified Ecosystem.
          </h2>
          <p className="text-zinc-500 max-w-2xl text-lg font-light leading-relaxed">
            A centralized engine powering our flagship applications. Seamlessly orchestrating workflows, gaming nodes, and secure network tunnels with zero latency.
          </p>
        </div>

        {/* ─── DIAGRAM AREA ─── */}
        <div className="relative w-full h-[500px] bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 shadow-2xl overflow-hidden hidden md:block">
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 500" preserveAspectRatio="none">
            {/* Left to Center */}
            <AnimatedLine d="M 280 120 L 400 120 C 450 120, 450 250, 480 250" color="#3B82F6" delay={0} duration={2.5} />
            <AnimatedLine d="M 280 250 L 480 250" color="#FF4F00" delay={0.8} duration={2} />
            <AnimatedLine d="M 280 380 L 400 380 C 450 380, 450 250, 480 250" color="#10B981" delay={1.5} duration={2.5} />

            {/* Center to Hub */}
            <AnimatedLine d="M 530 250 L 630 250" color="#9333EA" delay={0.2} duration={1.5} />

            {/* Hub to Right Nodes */}
            <AnimatedLine d="M 700 250 L 730 250 L 730 120 L 760 120" color="#10B981" delay={1.2} duration={2} /> 
            <AnimatedLine d="M 700 250 L 760 250" color="#3B82F6" delay={0.5} duration={1.5} /> 
            <AnimatedLine d="M 700 250 L 730 250 L 730 380 L 760 380" color="#F43F5E" delay={1.8} duration={2} /> 
            <AnimatedLine d="M 820 250 L 880 250" color="#9333EA" delay={2} duration={1} />
          </svg>

          {/* ─── LEFT NODES (PROJECTS) ─── */}
          <div className="absolute left-[5%] top-[120px] -translate-y-1/2 flex items-center gap-4 text-sm font-bold tracking-wide text-zinc-300 bg-black border border-white/5 px-5 py-3 rounded-xl z-10 hover:border-blue-500/50 transition-colors">
            <Workflow size={18} className="text-blue-500" /> Worktio Engine
          </div>
          <div className="absolute left-[5%] top-[250px] -translate-y-1/2 flex items-center gap-4 text-sm font-bold tracking-wide text-zinc-300 bg-black border border-white/5 px-5 py-3 rounded-xl z-10 hover:border-[#FF4F00]/50 transition-colors">
            <Gamepad2 size={18} className="text-[#FF4F00]" /> Lost Signal Nodes
          </div>
          <div className="absolute left-[5%] top-[380px] -translate-y-1/2 flex items-center gap-4 text-sm font-bold tracking-wide text-zinc-300 bg-black border border-white/5 px-5 py-3 rounded-xl z-10 hover:border-emerald-500/50 transition-colors">
            <Terminal size={18} className="text-emerald-500" /> binboi Tunnels
          </div>

          {/* ─── CENTER NODE ─── */}
          <div className="absolute left-[50%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-[#030303] border border-white/10 p-6 rounded-2xl shadow-[0_0_40px_rgba(147,51,234,0.15)] group hover:border-purple-500/50 transition-all">
              <Code2 size={32} className="text-white group-hover:text-purple-500 transition-colors" />
            </div>
          </div>

          {/* ─── STATUS BADGE ─── */}
          <div className="absolute left-[66%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-purple-600/20 border border-purple-500/50 text-purple-400 text-[9px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase backdrop-blur-md">
              Synchronized
            </div>
          </div>

          {/* ─── RIGHT NODES (INFRASTRUCTURE) ─── */}
          <div className="absolute left-[79%] top-[120px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-black border border-white/5 p-4 rounded-xl shadow-lg">
              <Database size={24} className="text-emerald-500" />
            </div>
          </div>
          <div className="absolute left-[79%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-black border border-white/5 p-4 rounded-xl shadow-lg">
              <Shield size={24} className="text-blue-500" />
            </div>
          </div>
          <div className="absolute left-[91%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-black border border-white/5 p-4 rounded-xl shadow-lg">
              <Globe size={24} className="text-purple-500" />
            </div>
          </div>
          <div className="absolute left-[79%] top-[380px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-black border border-white/5 p-4 rounded-xl shadow-lg">
              <Zap size={24} className="text-rose-500" />
            </div>
          </div>
        </div>

        {/* ─── BOTTOM FEATURES (PROJECT DETAILS) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          <div>
            <div className="flex items-center gap-3 text-white mb-4">
              <Workflow size={20} className="text-blue-500" />
              <h4 className="font-black italic uppercase tracking-tight text-lg">Worktio Intelligence</h4>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">
              Optimizing complex data pipelines and adaptive background tasks. Centralized neural analytics delivered with sub-millisecond precision.
            </p>
          </div>
          
          <div>
            <div className="flex items-center gap-3 text-white mb-4">
              <Gamepad2 size={20} className="text-[#FF4F00]" />
              <h4 className="font-black italic uppercase tracking-tight text-lg">Lost Signal Infrastructure</h4>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">
              Custom database architecture and low-level rendering logic driving an immersive, persistent atmospheric universe.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 text-white mb-4">
              <Terminal size={20} className="text-emerald-500" />
              <h4 className="font-black italic uppercase tracking-tight text-lg">binboi Zero-Config</h4>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">
              Secure, instant local environment exposure. High-speed encrypted routing transitioning your localhost directly to the global network.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}