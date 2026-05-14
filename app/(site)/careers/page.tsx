"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, Target, Zap, 
  ChevronRight, Globe, Code, 
  Cpu, Terminal 
} from "lucide-react";

const JobCard = ({ title, department, type, location }: { title: string; department: string; type: string; location: string }) => (
  <motion.div 
    whileHover={{ x: 10 }}
    className="group flex flex-col md:flex-row md:items-center justify-between p-8 rounded-2xl border border-white/5 bg-[#0a0a0a] hover:border-purple-500/40 transition-all cursor-pointer"
  >
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-500 bg-purple-500/10 px-2 py-1 rounded">
          {department}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">
          {type}
        </span>
      </div>
      <h3 className="text-xl font-bold text-white italic uppercase tracking-tight group-hover:text-purple-400 transition-colors">
        {title}
      </h3>
    </div>
    <div className="flex items-center gap-6 mt-4 md:mt-0">
      <div className="flex items-center gap-2 text-zinc-500">
        <Globe size={14} />
        <span className="text-xs font-mono">{location}</span>
      </div>
      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
        <ChevronRight size={18} className="text-white group-hover:text-black" />
      </div>
    </div>
  </motion.div>
);

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-300 font-sans selection:bg-purple-500/30">
      
      {/* Aurora Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full opacity-50" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-32 relative z-10">
        
        {/* Hero Section */}
        <header className="mb-32 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Talent Acquisition // Open Nodes</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white mb-8 leading-[0.8]">
            Shape the <br /> <span className="text-zinc-700">Infrastructure.</span>
          </h1>
          <p className="max-w-2xl text-xl text-zinc-500 font-light leading-relaxed">
            Miransas is not a workplace. It is a high-performance environment for engineers who believe that code should be safe, systems should be dark, and latency is the enemy.
          </p>
        </header>

        {/* Culture / Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
          <div className="space-y-4">
            <div className="p-3 w-fit bg-white/5 rounded-xl text-white">
              <Zap size={20} />
            </div>
            <h4 className="text-white font-bold italic uppercase tracking-wide text-sm">Performance First</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">We don't settle for "fast enough". Our stack is built on Rust and Go to ensure maximum throughput and minimal overhead.</p>
          </div>
          <div className="space-y-4">
            <div className="p-3 w-fit bg-white/5 rounded-xl text-white">
              <Terminal size={20} />
            </div>
            <h4 className="text-white font-bold italic uppercase tracking-wide text-sm">Dark Native</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Our culture respects the flow state. Deep focus, minimalist interfaces, and zero-distraction environments are our core.</p>
          </div>
          <div className="space-y-4">
            <div className="p-3 w-fit bg-white/5 rounded-xl text-white">
              <Cpu size={20} />
            </div>
            <h4 className="text-white font-bold italic uppercase tracking-wide text-sm">System Safety</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Safety isn't an afterthought. We leverage memory-safe languages and zero-trust architectures in everything we build.</p>
          </div>
        </section>

        {/* Open Positions */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <Briefcase className="text-zinc-600" size={24} />
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Open Roles</h2>
            </div>
            <span className="text-xs font-mono text-zinc-600 tracking-widest">[ 03 ACTIVE NODES ]</span>
          </div>

          <div className="flex flex-col gap-4">
            <JobCard 
              title="Systems Engineer" 
              department="Infrastructure" 
              type="Full-Time" 
              location="Remote / Istanbul"
            />
            <JobCard 
              title="Backend Developer (Rust/Go)" 
              department="Core Ecosystem" 
              type="Contract" 
              location="Remote"
            />
            <JobCard 
              title="Game Engine Specialist" 
              department="Interactive Media" 
              type="Full-Time" 
              location="On-Site / Hybrid"
            />
          </div>
        </section>

        {/* CTA Section */}
        <footer className="mt-40 p-12 rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-white/5 text-center">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-6">Don't see your role?</h2>
          <p className="text-zinc-500 mb-10 max-w-md mx-auto">
            We are always looking for exceptional talent in low-level engineering and atmospheric design.
          </p>
          <button className="px-10 py-4 bg-white text-black font-black italic uppercase tracking-widest text-xs rounded-full hover:bg-purple-500 hover:text-white transition-all">
            Send Open Application
          </button>
        </footer>

      </div>
    </main>
  );
}