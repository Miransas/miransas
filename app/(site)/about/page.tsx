"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Terminal, Shield, Gamepad2, 
  Hexagon, Crosshair, Cpu, Box,
  Code2, Network, Activity
} from "lucide-react";

const AuroraBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#030303]">
    <motion.div 
      animate={{ transform: ["translate(0px, 0px) scale(1)", "translate(50px, -50px) scale(1.1)", "translate(0px, 0px) scale(1)"] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-600 mix-blend-screen filter blur-[200px] opacity-[0.05]" 
    />
    <motion.div 
      animate={{ transform: ["translate(0px, 0px) scale(1)", "translate(-50px, 50px) scale(1.2)", "translate(0px, 0px) scale(1)"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-600 mix-blend-screen filter blur-[200px] opacity-[0.04]" 
    />
    <motion.div 
      animate={{ transform: ["translate(0px, 0px) scale(1)", "translate(50px, 50px) scale(0.9)", "translate(0px, 0px) scale(1)"] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-emerald-600 mix-blend-screen filter blur-[200px] opacity-[0.03]" 
    />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay opacity-[0.15]" />
  </div>
);

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#030303] text-white pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-28 lg:pb-32 overflow-hidden font-sans">

      <AuroraBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ========================================== */}
        {/* 1. HERO: THE STUDIO VISION                 */}
        {/* ========================================== */}
        <section className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16 mb-24 sm:mb-32 lg:mb-40 mt-6 sm:mt-10">

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="flex-1 w-full"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8 backdrop-blur-md shadow-lg">
              <Network size={14} className="text-purple-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400">Global Node Active // Core Systems</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black italic uppercase tracking-tighter leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-8">
              Miransas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600 block sm:inline">Ecosystem.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-xl mb-8 sm:mb-10 border-l-4 border-purple-500/50 pl-5 sm:pl-6">
              A multi-disciplinary technology node operating at the intersection of low-level systems engineering, neural automation, and atmospheric interactive media. We engineer secure, zero-latency environments.
            </p>

            <div className="flex flex-wrap gap-6 sm:gap-8 items-center">
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-black text-white italic tracking-tighter">0.1<span className="text-purple-500 text-xl sm:text-2xl">ms</span></span>
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">Target Latency</span>
              </div>
              <div className="hidden sm:block w-[1px] h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-black text-white italic tracking-tighter">100<span className="text-purple-500 text-xl sm:text-2xl">%</span></span>
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">Dark Mode Native</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="flex-1 w-full relative flex justify-center lg:justify-end"
          >
            {/* Cam Efektli (Glassmorphism) Kurumsal Kart - SADECE MIRANSAS */}
            <div className="relative aspect-[4/5] w-full max-w-md rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 sm:p-8 shadow-2xl group flex flex-col justify-between">
              
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-black z-10" />
              
              {/* Üst Kısım: Dönen Logo */}
              <div className="relative z-20 flex justify-center mt-12 opacity-90">
                <motion.div 
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <Hexagon size={160} className="text-purple-500/20" strokeWidth={1} />
                  <Hexagon size={80} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={1.5} />
                </motion.div>
              </div>

              {/* Alt Kısım: Miransas System Status */}
              <div className="relative z-20 bg-black/60 p-6 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-emerald-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">Miransas_Modules</span>
                  </div>
                  <Terminal size={14} className="text-zinc-500" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between group cursor-default">
                    <span className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">&gt; Miransoft</span>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-500 font-bold">Online</span>
                  </div>
                  
                  <div className="flex items-center justify-between group cursor-default">
                    <span className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">&gt; Miransaas</span>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-500 font-bold">Online</span>
                  </div>

                  <div className="flex items-center justify-between group cursor-default">
                    <span className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">&gt; binboi_node</span>
                    <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">Rust/Go</span>
                  </div>

                  <div className="flex items-center justify-between group cursor-default">
                    <span className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">&gt; miransas-chess</span>
                    <span className="text-[10px] uppercase tracking-wider text-purple-400 font-bold">UCI Engine</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </section>

        {/* ========================================== */}
        {/* 2. THE STUDIO DNA (Kurumsal Felsefe)       */}
        {/* ========================================== */}
        <section className="mb-24 sm:mb-32 lg:mb-40">
          <div className="flex items-center gap-4 mb-10 sm:mb-16 justify-center md:justify-start text-center md:text-left flex-wrap">
            <Cpu className="text-purple-500" size={28} />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Architecture DNA</h2>
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.4 }} className="bg-[#0a0a0a] border border-white/5 p-8 sm:p-10 rounded-2xl sm:rounded-3xl hover:border-blue-500/30 transition-colors duration-200 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/20 group-hover:bg-blue-500 transition-colors" />
              <Code2 className="text-blue-500 mb-6" size={32} />
              <h3 className="text-xl font-black italic uppercase tracking-tight mb-4 text-white">Algorithmic Precision</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-light mb-6">
                Built on flawless logic. Leveraging strict type safety, modular microservices, and the raw computational performance of Rust and Go to ensure zero dropped packets.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.4, delay: 0.05 }} className="bg-[#0a0a0a] border border-white/5 p-8 sm:p-10 rounded-2xl sm:rounded-3xl hover:border-emerald-500/30 transition-colors duration-200 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors" />
              <Shield className="text-emerald-500 mb-6" size={32} />
              <h3 className="text-xl font-black italic uppercase tracking-tight mb-4 text-white">Encrypted Tunnels</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-light mb-6">
                Security by design. From memory-safe protocols to binboi tunneling services, the network infrastructure is isolated, encrypted, and operates flawlessly under stress.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.4, delay: 0.1 }} className="bg-[#0a0a0a] border border-white/5 p-8 sm:p-10 rounded-2xl sm:rounded-3xl hover:border-purple-500/30 transition-colors duration-200 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-purple-500/20 group-hover:bg-purple-500 transition-colors" />
              <Crosshair className="text-purple-500 mb-6" size={32} />
              <h3 className="text-xl font-black italic uppercase tracking-tight mb-4 text-white">Absolute Focus</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-light mb-6">
                Eliminating the noise. No bloated dependencies, no visual clutter. Every tool, dashboard, and game engine respects the efficiency of minimalist, dark-themed execution.
              </p>
            </motion.div>

          </div>
        </section>

        {/* ========================================== */}
        {/* 3. DUAL ENGINE CAPABILITY                  */}
        {/* ========================================== */}
        <section className="relative p-6 sm:p-12 md:p-16 lg:p-20 bg-[#0a0a0a] border border-white/5 rounded-[1.5rem] sm:rounded-[3rem] overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter mb-6 leading-tight">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Dual-Engine</span> Paradigm.
              </h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-10 sm:mb-12 text-base sm:text-lg border-l-2 border-white/10 pl-5 sm:pl-6">
                Miransas operates two distinct but heavily integrated technological divisions that share core architecture and design philosophies:
              </p>
              
              <ul className="space-y-8">
                <li className="flex items-start gap-6 group">
                  <div className="p-3 bg-black border border-white/5 rounded-xl group-hover:border-blue-500/50 transition-colors">
                     <Terminal className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-black italic uppercase tracking-wide text-lg mb-2">I. Neural & Infrastructure</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">Worktio automation engines, Rust-powered network security, autonomous AI agents, and high-speed local proxy tunnels.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-6 group">
                  <div className="p-3 bg-black border border-white/5 rounded-xl group-hover:border-[#FF4F00]/50 transition-colors">
                     <Gamepad2 className="text-[#FF4F00]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-black italic uppercase tracking-wide text-lg mb-2">II. Interactive Experiences</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">The birthplace of the &#34;Lost Signal&#34; universe under Sadpera Studio. Crafting deep narratives and low-level rendering pipelines optimized natively for high-end hardware.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Minimalist Abstract Representation */}
            <div className="flex justify-center lg:justify-end">
               <div className="relative w-72 h-72">
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-dashed border-blue-500/30 rounded-full" />
                 <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-6 border border-dashed border-[#FF4F00]/30 rounded-full" />
                 
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-20 h-20 bg-[#030303] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(147,51,234,0.1)]">
                      <div className="absolute inset-0 bg-purple-500/10 blur-md rounded-2xl" />
                      <Box className="text-white relative z-10" size={28} />
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