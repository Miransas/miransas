"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Terminal, Shield, Gamepad2, 
  MapPin, Hexagon, Crosshair, Cpu, Box,
  Code2
} from "lucide-react";
import Image from "next/image";

// ─── YENİ ARKA PLAN: DEEP CYBER AURORA ─────────────
const AuroraBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#030303]">
    <motion.div 
      animate={{ transform: ["translate(0px, 0px) scale(1)", "translate(50px, -50px) scale(1.1)", "translate(0px, 0px) scale(1)"] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#FF4F00] mix-blend-screen filter blur-[200px] opacity-[0.07]" 
    />
    <motion.div 
      animate={{ transform: ["translate(0px, 0px) scale(1)", "translate(-50px, 50px) scale(1.2)", "translate(0px, 0px) scale(1)"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-600 mix-blend-screen filter blur-[200px] opacity-[0.05]" 
    />
    <motion.div 
      animate={{ transform: ["translate(0px, 0px) scale(1)", "translate(50px, 50px) scale(0.9)", "translate(0px, 0px) scale(1)"] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-purple-600 mix-blend-screen filter blur-[200px] opacity-[0.06]" 
    />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay opacity-20" />
  </div>
);

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#030303] text-white pt-32 pb-32 overflow-hidden selection:bg-[#FF4F00]/30 font-sans">
      
      <AuroraBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ========================================== */}
        {/* 1. HERO: THE STUDIO VISION                 */}
        {/* ========================================== */}
        <section className="flex flex-col lg:flex-row items-center gap-16 mb-40 mt-10">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-lg">
              <MapPin size={14} className="text-[#FF4F00]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400">HQ: İzmir, Türkiye // Est. 2026</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Miransas <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-200">Studio.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-xl mb-10">
              A dual-engine technology house operating at the bleeding edge of low-level systems engineering and atmospheric interactive media. Founded by Sardor Azimov, we don&lsquo;t just write code; we engineer secure, high-performance environments.
            </p>

            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">05:50</span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">AM / Global Ops</span>
              </div>
              <div className="w-[1px] h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">Dual</span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Engine Core</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
            className="flex-1 w-full relative"
          >
            {/* Cam Efektli (Glassmorphism) Kurumsal Kart */}
            <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-6 shadow-2xl group flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/50 to-[#030303] z-10" />
              
              {/* Şirket Logosunu temsil eden devasa ikon */}
              <motion.div 
                animate={{ rotateY: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="relative z-20 mb-20 opacity-80"
              >
                <Hexagon size={120} className="text-[#FF4F00]" strokeWidth={1} />
                <Hexagon size={60} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={1.5} />
              </motion.div>

              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-blue-500">Core Directive</span>
                  <Terminal size={16} className="text-neutral-500" />
                </div>
                <p className="text-sm font-light text-neutral-300 italic">
                  &#34;Light colors are the enemy. Everything is in dark mode: infrastructure, interfaces, architecture, logic.&ldquo;
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================== */}
        {/* 2. THE STUDIO DNA (Kurumsal Felsefe)       */}
        {/* ========================================== */}
        <section className="mb-40">
          <div className="flex items-center gap-4 mb-16 justify-center md:justify-start">
            <Cpu className="text-blue-500" size={28} />
            <h2 className="text-4xl font-black uppercase tracking-tighter">Studio DNA</h2>
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/[0.02] border border-white/5 p-10 rounded-3xl hover:bg-white/[0.04] transition-colors relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50" />
              <Code2 className="text-blue-500 mb-6" size={32} />
              <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-white">Algorithmic Precision</h3>
              <p className="text-neutral-500 text-sm leading-relaxed font-light mb-6">
                Our foundation is built on flawless logic. We leverage the strict type safety of Drizzle ORM and the raw performance of Go and Rust to ensure our systems never miss a beat.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white/[0.02] border border-white/5 p-10 rounded-3xl hover:bg-white/[0.04] transition-colors relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500/50" />
              <Shield className="text-yellow-500 mb-6" size={32} />
              <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-white">Battle-Tested Security</h3>
              <p className="text-neutral-500 text-sm leading-relaxed font-light mb-6">
                Security is not an afterthought; it&lsquo;s our core. From memory-safe macOS VPN clients to secure Elasiya tunneling protocols, our infrastructure operates flawlessly under pressure.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="bg-white/[0.02] border border-white/5 p-10 rounded-3xl hover:bg-white/[0.04] transition-colors relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FF4F00]/50" />
              <Crosshair className="text-[#FF4F00] mb-6" size={32} />
              <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-white">Absolute Focus</h3>
              <p className="text-neutral-500 text-sm leading-relaxed font-light mb-6">
                We eliminate the noise. No bloated codebases, no blinding light modes. Just pure, dark-themed execution. Every product we ship respects the efficiency of the shadows.
              </p>
            </motion.div>

          </div>
        </section>

        {/* ========================================== */}
        {/* 3. DUAL ENGINE CAPABILITY                  */}
        {/* ========================================== */}
        <section className="relative p-12 md:p-20 bg-[#0A0A0A] border border-white/5 rounded-[40px] overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF4F00]/5 via-transparent to-blue-500/5 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">The <span className="text-[#FF4F00]">Dual-Engine</span> Paradigm.</h2>
              <p className="text-neutral-400 font-light leading-relaxed mb-8 text-lg">
                Miransas Studio is not confined to a single discipline. We operate two distinct but heavily integrated divisions that share technology and design philosophies:
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <Terminal className="text-blue-500 mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-1">I. Software & Infrastructure</h4>
                    <p className="text-neutral-500 text-sm">Next.js ecosystems, Rust-powered network security, autonomous AI agents, and Go-based proxy tunnels.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Gamepad2 className="text-[#FF4F00] mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-1">II. Interactive Experiences</h4>
                    <p className="text-neutral-500 text-sm">The birthplace of the &#34;Lost Signal&#34; franchise. Crafting psychological horror and deep narratives optimized natively for M1 architecture.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Minimalist Abstract Representation */}
            <div className="flex justify-center lg:justify-end">
               <div className="relative w-64 h-64">
                 {/* Dönen iki halka (Software & Games) */}
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-full" />
                 <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-4 border-2 border-dashed border-[#FF4F00]/30 rounded-full" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                      <Box className="text-white" size={24} />
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}