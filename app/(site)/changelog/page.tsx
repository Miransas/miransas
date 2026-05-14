"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitCommit, Package, Calendar, Tag, ChevronRight } from "lucide-react";

interface ChangeEntryProps {
  version: string;
  date: string;
  project: string;
  changes: string[];
  type?: string;
}

const ChangeEntry = ({ version, date, project, changes, type }: ChangeEntryProps) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative pl-8 pb-12 border-l border-white/10 last:border-0"
  >
    {/* Timeline Dot */}
    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
    
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <Tag size={14} className="text-zinc-500" />
        <span className="font-mono text-xs font-bold text-white">{version}</span>
      </div>
      <div className="flex items-center gap-2">
        <Calendar size={14} className="text-zinc-500" />
        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{date}</span>
      </div>
      <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-purple-400 uppercase tracking-tighter">
        {project}
      </div>
    </div>

    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
      <ul className="space-y-3">
        {changes.map((change, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-zinc-400 group">
            <ChevronRight size={14} className="mt-1 text-zinc-600 group-hover:text-purple-500 transition-colors" />
            <span className="group-hover:text-zinc-200 transition-colors">{change}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-300 font-sans pt-32 pb-24 selection:bg-purple-500/30">
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <header className="mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 mb-6">
            <GitCommit size={14} className="text-emerald-500" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">System_Evolution // Commit_History</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-6">
            Change<span className="text-zinc-700">log.</span>
          </h1>
          <p className="max-w-xl text-lg text-zinc-500 font-light leading-relaxed">
            The iterative evolution of the Miransas ecosystem. Tracking every deployment, optimization, and system update across all active nodes.
          </p>
        </header>

        {/* Change Log Timeline */}
        <div className="mt-20">
          
          <ChangeEntry 
            version="v4.2.0"
            date="May 15, 2026"
            project="binboi"
            changes={[
              "Rust-based CLI agent rewritten for 30% faster handshake performance.",
              "Implemented military-grade AES-256-GCM encryption for all tunneling nodes.",
              "Added multi-region node support (Istanbul, Frankfurt, New York)."
            ]}
          />

          <ChangeEntry 
            version="v1.8.5"
            date="May 02, 2026"
            project="miransas-chess"
            changes={[
              "Optimized Bitboard move generation using SIMD instructions.",
              "Improved Alpha-Beta pruning efficiency in late-game scenarios.",
              "Added UCI protocol compatibility for third-party GUI integration."
            ]}
          />

          <ChangeEntry 
            version="v0.9.2-alpha"
            date="February 20, 2026"
            project="Lost Signal"
            changes={[
              "Enhanced volumetric lighting system in the 'Server Room' level.",
              "Refined protagonist 'Sad' movement mechanics for better precision.",
              "Integrated atmospheric audio engine for 3D spatial soundscapes."
            ]}
          />

          <ChangeEntry 
            version="v2.1.0"
            date="April 05, 2025"
            project="Worktio"
            changes={[
              "Autonomous AI agent framework updated to support long-term memory.",
              "New dashboard interface with 100% dark-mode native components.",
              "Reduced core engine startup time by 400ms."
            ]}
          />
        </div>
        {/* Footer info */}
        <footer className="mt-20 flex justify-center">
          <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
            End of History // More updates coming soon
          </div>
        </footer>

      </div>

      {/* Decorative Grid Arka Plan */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
    </main>
  );
}