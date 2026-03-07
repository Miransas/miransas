"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Terminal, Code2, Gamepad2, Bot, 
  Database, Shield, Zap, Workflow 
} from "lucide-react";

// ─── Kusursuz Akan Lazer (Linear Style) ─────────────
const AnimatedLine = ({ d, color, delay, duration = 3 }: { d: string; color: string; delay: number; duration?: number }) => (
  <g>
    {/* SABİT YOL (ÇOK BELİRGİN KOYU GRİ) */}
    <path 
      d={d} 
      className="stroke-neutral-800" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* AKAN NEON VERİ (COMET EFFECT) */}
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
    
    {/* PARLAYAN UÇ NOKTASI */}
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
    <section className="min-h-screen bg-[#050505] text-white py-32 px-6 relative overflow-hidden font-sans selection:bg-[#FF4F00]/30">
      
      {/* ─── DOTTED GRID ARKA PLAN ─── */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle at 1.5px 1.5px, #ffffff 1px, transparent 0)`, backgroundSize: `32px 32px` }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ─── ÜST METİN (Görseldeki gibi sol üstte) ─── */}
        <div className="mb-24">
          <div className="flex items-center gap-2 text-neutral-300 font-semibold text-sm mb-4">
            <Workflow size={18} className="text-[#FF4F00]" />
            Native Tools Integration
          </div>
          <p className="text-neutral-500 max-w-2xl text-sm leading-relaxed font-light">
            Track real-time activity of Miransas agents with detailed records of triggers, tools used, outcomes, and timestamps across our Next.js and Rust architecture.
          </p>
        </div>

        {/* ─── ŞEMA ALANI (KARTLAR VE ÇİZGİLER) ─── */}
        <div className="relative w-full h-[500px] bg-[#050505]/50 border border-white/5 rounded-3xl p-8 shadow-2xl overflow-hidden">
          
          {/* SVG Çizgi Yolları (Keskin, Doğrudan Kartlara Giden Yollar) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 500" preserveAspectRatio="none">
            {/* Sol Kartlardan Merkez Karta */}
            <AnimatedLine d="M 280 120 L 400 120 C 450 120, 450 250, 480 250" color="#3B82F6" delay={0} duration={2.5} />
            <AnimatedLine d="M 280 250 L 480 250" color="#FF4F00" delay={0.8} duration={2} />
            <AnimatedLine d="M 280 380 L 400 380 C 450 380, 450 250, 480 250" color="#EAB308" delay={1.5} duration={2.5} />

            {/* Merkez Karttan "Connected" Etiketine */}
            <AnimatedLine d="M 530 250 L 630 250" color="#3B82F6" delay={0.2} duration={1.5} />

            {/* "Connected" Etiketinden Sağdaki Kartlara Dağılım */}
            <AnimatedLine d="M 700 250 L 730 250 L 730 120 L 760 120" color="#10B981" delay={1.2} duration={2} /> {/* Database'e */}
            <AnimatedLine d="M 700 250 L 760 250" color="#8B5CF6" delay={0.5} duration={1.5} /> {/* Ortadaki Shield'a */}
            <AnimatedLine d="M 700 250 L 730 250 L 730 380 L 760 380" color="#F43F5E" delay={1.8} duration={2} /> {/* Alttaki Zap'a */}
            
            {/* Sağ Orta Karttan En Sağdaki Karta */}
            <AnimatedLine d="M 820 250 L 880 250" color="#3B82F6" delay={2} duration={1} />
          </svg>

          {/* ─── SOL KARTLAR (NET, BELİRGİN, GÖRSELDEKİ GİBİ) ─── */}
          {/* Top Left */}
          <div className="absolute left-[5%] top-[120px] -translate-y-1/2 flex items-center gap-4 text-sm font-medium text-neutral-300 bg-[#0A0A0A] border border-neutral-800 px-4 py-2.5 rounded-lg z-10 hover:border-white/20 transition-colors">
            <Code2 size={18} className="text-blue-500" /> Web Ecosystem
          </div>
          {/* Middle Left */}
          <div className="absolute left-[5%] top-[250px] -translate-y-1/2 flex items-center gap-4 text-sm font-medium text-neutral-300 bg-[#0A0A0A] border border-neutral-800 px-4 py-2.5 rounded-lg z-10 hover:border-white/20 transition-colors">
            <Gamepad2 size={18} className="text-[#FF4F00]" /> Lost Signal Server
          </div>
          {/* Bottom Left */}
          <div className="absolute left-[5%] top-[380px] -translate-y-1/2 flex items-center gap-4 text-sm font-medium text-neutral-300 bg-[#0A0A0A] border border-neutral-800 px-4 py-2.5 rounded-lg z-10 hover:border-white/20 transition-colors">
            <Bot size={18} className="text-yellow-500" /> AI Bot Interface
          </div>

          {/* ─── MERKEZİ KART (BÜYÜK VE DİKKAT ÇEKİCİ) ─── */}
          <div className="absolute left-[50%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-gradient-to-br from-neutral-800 to-black border border-neutral-700 p-6 rounded-2xl shadow-[0_0_40px_rgba(255,79,0,0.15)] group hover:border-[#FF4F00]/50 transition-all cursor-pointer">
              <Terminal size={32} className="text-white group-hover:text-[#FF4F00] transition-colors" />
            </div>
          </div>

          {/* ─── CONNECTED BADGE (Mavi, görseldeki gibi) ─── */}
          <div className="absolute left-[66%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-blue-600/90 border border-blue-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-md tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              Connected
            </div>
          </div>

          {/* ─── SAĞ KARTLAR (KÜÇÜK, İKONLU KARELER) ─── */}
          {/* Database (Neon/Drizzle) - Top Right */}
          <div className="absolute left-[79%] top-[120px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-[#111] border border-neutral-700 p-4 rounded-xl hover:bg-neutral-900 transition-colors shadow-lg">
              <Database size={24} className="text-emerald-500" />
            </div>
          </div>
          
          {/* Security (Rust VPN) - Middle Right */}
          <div className="absolute left-[79%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-[#111] border border-neutral-700 p-4 rounded-xl hover:bg-neutral-900 transition-colors shadow-lg">
              <Shield size={24} className="text-blue-500" />
            </div>
          </div>

          {/* External API (Gemini/OpenAI) - Far Middle Right */}
          <div className="absolute left-[91%] top-[250px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-[#111] border border-neutral-700 p-4 rounded-xl hover:bg-neutral-900 transition-colors shadow-lg">
              <Bot size={24} className="text-white" />
            </div>
          </div>

          {/* Operations/Queue - Bottom Right */}
          <div className="absolute left-[79%] top-[380px] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-[#111] border border-neutral-700 p-4 rounded-xl hover:bg-neutral-900 transition-colors shadow-lg">
              <Zap size={24} className="text-rose-500" />
            </div>
          </div>

        </div>

        {/* ─── ALT METİNLER (Görseldeki 3 Sütunlu Yapı) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 px-2">
          <div>
            <div className="flex items-center gap-3 text-white mb-4">
              <Shield size={18} className="text-neutral-400" />
              <h4 className="font-bold text-sm tracking-wide">One Click Auth</h4>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed font-light">
              A streamlined interface to securely connect and authenticate Miransas web architectures and Rust VPN tunnels.
            </p>
          </div>
          
          <div>
            <div className="flex items-center gap-3 text-white mb-4">
              <Zap size={18} className="text-neutral-400" />
              <h4 className="font-bold text-sm tracking-wide">Realtime Sync</h4>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed font-light">
              Servers operate independently, pushing low-latency updates for Lost Signal and synchronizing AI Telegram responses.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 text-white mb-4">
              <Terminal size={18} className="text-neutral-400" />
              <h4 className="font-bold text-sm tracking-wide">Custom Connector SDK</h4>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed font-light">
              Run workflows in a secure sandbox to preview behavior, debug Go microservices, and test database interactions.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}