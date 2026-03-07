"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Shield, Cpu, Gamepad2, Globe, 
  Layers, Code2, Database, Box, MapPin
} from "lucide-react";

export default function AboutHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-white pt-32 pb-32 overflow-hidden selection:bg-[#FF4F00]">
      
      {/* --- CORPORATE GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* ================================== */}
        {/* HERO: STUDIO OVERVIEW             */}
        {/* ================================== */}
        <section className="max-w-4xl mb-32">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#FF4F00] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Company Intelligence</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-10">
              Miransas <br /> <span className="text-gray-500 underline decoration-[#FF4F00] decoration-4 underline-offset-8">Studio.</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              Founded by <strong>Sardor Azimov</strong>, Miransas Studio is a dual-core technology house specializing in high-performance software systems and atmospheric interactive experiences. Based in <strong>İzmir, Türkiye</strong>, we engineer solutions that bridge the gap between complex logic and deep immersion.
            </motion.p>
          </motion.div>
        </section>

        {/* ================================== */}
        {/* BUSINESS PILLARS (The Cards)      */}
        {/* ================================== */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32"
        >
          {/* SOFTWARE DIVISION */}
          <motion.div variants={fadeIn} whileHover={{ y: -5 }} className="group p-10 bg-[#0A0A0A] border border-white/5 hover:border-blue-500/40 transition-all shadow-2xl">
            <Cpu className="text-blue-500 mb-8" size={40} />
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Systems Engineering</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              Developing crash-safe infrastructure using <strong>Rust</strong> and <strong>Go</strong>. Our portfolio includes native macOS VPN solutions and autonomous AI conversational interfaces.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-mono text-blue-500 font-bold uppercase">
              <Layers size={14} /> Low-Level Optimization
            </div>
          </motion.div>

          {/* GAME STUDIO */}
          <motion.div variants={fadeIn} whileHover={{ y: -5 }} className="group p-10 bg-[#0A0A0A] border border-white/5 hover:border-red-500/40 transition-all shadow-2xl">
            <Gamepad2 className="text-red-500 mb-8" size={40} />
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Interactive IP</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              Propelling the <strong>Lost Signal</strong> franchise. We focus on psychological atmospheric horror, leveraging custom shaders and M1 architecture optimization for high-fidelity performance.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-mono text-red-500 font-bold uppercase">
              <Box size={14} /> Narrative Excellence
            </div>
          </motion.div>

          {/* WEB & CLOUD SOLUTIONS */}
          <motion.div variants={fadeIn} whileHover={{ y: -5 }} className="group p-10 bg-[#0A0A0A] border border-white/5 hover:border-green-500/40 transition-all shadow-2xl">
            <Globe className="text-green-500 mb-8" size={40} />
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Full-Stack Ecosystems</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              Building scalable web architectures with <strong>Next.js</strong>, <strong>TypeScript</strong>, and <strong>Relational Databases</strong>. Experts in high-availability deployments and AdSense monetization strategies.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-mono text-green-500 font-bold uppercase">
              <Database size={14} /> Distributed Architecture
            </div>
          </motion.div>
        </motion.div>

        {/* ================================== */}
        {/* CORPORATE DATA / STATS            */}
        {/* ================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-24 border-t border-white/5">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Studio Philosophy</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 flex items-center justify-center rounded-lg border border-white/10">
                  <Shield className="text-[#FF4F00]" />
                </div>
                <div>
                  <h4 className="font-bold uppercase text-sm mb-2">Stability First</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Whether it is a VPN tunnel or a horror game engine, we prioritize crash-safe performance and zero-latency user experiences.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 flex items-center justify-center rounded-lg border border-white/10">
                  <Code2 className="text-[#FF4F00]" />
                </div>
                <div>
                  <h4 className="font-bold uppercase text-sm mb-2">Modern Stack</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Our toolkit is comprised of the latest technologies: Drizzle ORM, Prisma, FastAPI, and Unity/Unreal Engine for cross-platform delivery.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Studio Meta (İzmir focus) */}
          <div className="bg-gradient-to-br from-[#111] to-[#050505] p-12 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <MapPin size={200} />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Location & Logistics</h3>
            <p className="text-gray-400 font-light mb-8">
              Strategically headquartered in <strong>İzmir, Türkiye</strong>. Our location allows us to tap into a vibrant tech ecosystem while maintaining global reach for our software and gaming products.
            </p>
            <div className="pt-8 border-t border-white/10 flex justify-between items-center font-mono text-[10px] text-gray-500 uppercase tracking-[0.2em]">
              <span>HQ: Izmir / TR</span>
              <span>Status: Active Ops</span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}