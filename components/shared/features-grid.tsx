"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Terminal, Bot } from "lucide-react";

// --- 1. CARD BORDER BEAM EFFECT ---
const BorderBeam = ({ className = "", color = "#FF4F00", duration = 3 }: { className?: string; color?: string; duration?: number }) => {
  return (
    <div className={`absolute inset-0 rounded-[20px] overflow-hidden pointer-events-none z-1 ${className}`}>
      <motion.div
        className="absolute w-[2px] h-[30%] blur-[2px]"
        style={{
          background: `linear-gradient(180deg, ${color} 0%, rgba(255,255,255,0.8) 50%, ${color} 100%)`,
          filter: `drop-shadow(0 0 6px ${color})`,
        }}
        animate={{
          top: ["-30%", "100%", "100%", "-30%", "-30%"],
          left: ["0%", "0%", "100%", "100%", "0%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// --- 2. KUSURSUZ AKAN LAZER ---
const MiniAnimatedLine = ({ d, color, delay, duration = 2 }: { d: string; color: string; delay: number; duration?: number }) => (
  <g>
    <path d={d} className="stroke-neutral-800" strokeWidth="2" fill="none" strokeLinecap="round" />
    <motion.path
      d={d} stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ filter: `drop-shadow(0 0 8px ${color})` }}
    />
    <motion.circle
      r="3" fill={color}
      initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ offsetPath: `path("${d}")`, animation: `mini-travel-${delay.toString().replace(".", "")} ${duration}s ${delay}s ease-in-out infinite` }}
    />
    <style>{`
      @keyframes mini-travel-${delay.toString().replace(".", "")} {
        0% { offset-distance: 0%; opacity: 0; }
        10% { opacity: 1; } 90% { opacity: 1; }
        100% { offset-distance: 100%; opacity: 0; }
      }
    `}</style>
  </g>
);

// --- 3. ANA KART BİLEŞENİ (Sadece Bu İzole Edildi) ---
export default function CoreArchitectureCard() {
  return (
    <div className="w-full max-w-xl mx-auto p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-[#0A0A0A] border border-white/5 rounded-[20px] p-7 flex flex-col relative overflow-hidden group hover:border-purple-500/30 transition-all shadow-2xl selection:bg-purple-500/30"
      >
        {/* ─── BORDER BEAM (Merkezi Kart) ─── */}
        <BorderBeam color="#9333EA" duration={4} />

        {/* ÜST: Node / Lazer Şeması */}
        <div className="relative h-[240px] w-full flex items-center justify-center border border-white/5 rounded-2xl bg-[#080808] mb-8">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet">
            {/* Sol Node'dan Merkeze */}
            <MiniAnimatedLine d="M 80 120 L 170 120" color="#3B82F6" delay={0} duration={1.5} />
            {/* Merkezden Sağ Node'a */}
            <MiniAnimatedLine d="M 230 120 L 320 120" color="#10B981" delay={0.8} duration={1.5} />
          </svg>

          {/* Sol İkon (Web/Systems) */}
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 bg-[#111] border border-neutral-800 p-3.5 rounded-xl z-10 shadow-lg">
            <Database size={22} className="text-blue-500" />
          </div>

          {/* Merkez İkon (Miransas Hub v4.0) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-neutral-800 to-black border border-neutral-700 p-5 rounded-xl z-20 shadow-[0_0_40px_rgba(147,51,234,0.2)] group-hover:border-purple-500 transition-colors">
            <Terminal size={30} className="text-white group-hover:text-purple-500 transition-colors" />
          </div>

          {/* Mavi "Connected" Badge */}
          <div className="absolute left-1/2 top-[78%] -translate-x-1/2 bg-blue-600/90 border border-blue-500 text-white text-[10px] font-bold px-3.5 py-1.5 rounded-md tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.6)] z-20 backdrop-blur-sm">
            Connected
          </div>

          {/* Sağ İkon (AI/Bot Mesh) */}
          <div className="absolute right-[10%] top-1/2 -translate-y-1/2 bg-[#111] border border-neutral-800 p-3.5 rounded-xl z-10 shadow-lg">
            <Bot size={22} className="text-emerald-500" />
          </div>
        </div>

        {/* ALT: Dashboard / Terminal UI */}
        <div className="mt-auto bg-[#030303] border border-neutral-800 rounded-2xl overflow-hidden shadow-inner">
          {/* Mac Pencere Başlığı */}
          <div className="bg-[#0a0a0a] border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 tracking-wider">root@miransas-core ~ HQ: TASHKENT</span>
          </div>
          
          {/* İçerik / Progress Barlar */}
          <div className="p-6 space-y-6">
            <div>
              <div className="flex justify-between text-[11px] text-zinc-400 mb-2 font-mono uppercase tracking-widest">
                <span>Worktio Neural Engine</span>
                <span className="text-purple-500 font-bold">98%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  className="h-full bg-purple-500" 
                  initial={{ width: "0%" }} 
                  whileInView={{ width: "98%" }} 
                  transition={{ duration: 1.5, delay: 0.2 }} 
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-[11px] text-zinc-400 mb-2 font-mono uppercase tracking-widest">
                <span>binboi Tuneling Protocol</span>
                <span className="text-emerald-500 font-bold animate-pulse">Active</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                  initial={{ width: "0%" }} 
                  whileInView={{ width: "100%" }} 
                  transition={{ duration: 1.5, delay: 0.4 }} 
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}