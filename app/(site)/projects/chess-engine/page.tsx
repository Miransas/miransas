"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Link as LinkIcon, 
  Activity, 
  Github, 
  ChevronDown, 
  Code2, 
  Binary 
} from 'lucide-react';

export default function ChessEngineBlog() {
  const GITHUB_EDIT_URL = "https://github.com/sardorazimov/miransas/edit/main/blog/chess-engine.tsx";

  return (
    <div className="min-h-screen bg-black text-[#ededed] font-sans selection:bg-rose-500/30 overflow-x-hidden">
      
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        <div className="absolute right-[20%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />

        <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-rose-500/5 blur-[100px] rounded-full" />
      </div>

      <article className="max-w-[760px] mx-auto px-6 pt-32 pb-40 relative z-10">
        
        {/* Header */}
        <header className="mb-20">
          
          <div className="flex items-center justify-between mb-8">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] uppercase tracking-[0.4em] text-rose-500 font-bold"
            >
              Chess Engine Development
            </motion.div>

            <a 
              href={GITHUB_EDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors group"
            >
              <Github size={14} className="group-hover:rotate-12 transition-transform" />
              Edit on GitHub
            </a>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-10 leading-[1.05]">
            miransas-chess: <br /> Built in Rust.
          </h1>

          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-600 to-orange-400 p-[1px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <span className="text-xs font-bold uppercase tracking-tighter">
                  SA
                </span>
              </div>
            </div>

            <div className="text-left">
              <p className="text-sm font-semibold text-white">
                Sardor Azimov
              </p>

              <p className="text-[11px] text-gray-500 uppercase tracking-wider">
                Founder of Miransas
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between border-y border-white/5 py-6 font-mono text-[11px] text-gray-500 tracking-widest uppercase">
            <div className="flex gap-6">
              
              <span className="flex items-center gap-2">
                <Clock size={14} />
                5 Minute Read
              </span>

              <button className="flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors">
                <LinkIcon size={14} />
                Source Link
                <ChevronDown size={12} />
              </button>
            </div>

            <span>May 14, 2026</span>
          </div>
        </header>

        {/* Content */}
        <div className="space-y-10 text-[18px] leading-[1.8] text-gray-400">

          <p className="text-white text-2xl leading-snug font-medium tracking-tight">
            miransas-chess is a personal hobby project focused on building a modern chess engine with Rust, performance optimization, and clean architecture.
          </p>

          <p>
            The engine is currently under active development and designed around speed, stability, and efficient move generation. Inspired by classic chess engines, the project explores low-level systems programming and search optimization techniques.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-16">

            <div className="p-8 rounded-[24px] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent group hover:border-rose-500/20 transition-colors">
              
              <Binary 
                className="text-rose-500 mb-4 group-hover:scale-110 transition-transform" 
                size={24} 
              />

              <h4 className="text-white font-bold mb-2 uppercase tracking-wide text-sm">
                Bitboard Architecture
              </h4>

              <p className="text-[13px] leading-relaxed">
                Using 64-bit bitboards for fast board representation and efficient move calculations.
              </p>
            </div>

            <div className="p-8 rounded-[24px] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent group hover:border-rose-500/20 transition-colors">
              
              <Code2 
                className="text-rose-500 mb-4 group-hover:scale-110 transition-transform" 
                size={24} 
              />

              <h4 className="text-white font-bold mb-2 uppercase tracking-wide text-sm">
                UCI Compatible
              </h4>

              <p className="text-[13px] leading-relaxed">
                Built around the Universal Chess Interface protocol for compatibility with modern chess GUIs.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white pt-8 tracking-tight">
            Why Rust?
          </h3>

          <p>
            Rust provides the perfect balance between performance and safety. The language allows low-level optimization while maintaining memory safety, making it ideal for search-heavy applications like chess engines.
          </p>

          {/* Quote */}
          <blockquote className="relative p-10 rounded-[32px] border border-white/10 bg-white/[0.01] my-16 italic text-lg text-white/95 font-serif leading-relaxed">
            
            <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-rose-500" />

            &quot;Building a chess engine is one of the best ways to explore algorithms, optimization, and systems programming at a deeper level.&quot;
          </blockquote>

          <h3 className="text-2xl font-bold text-white pt-4 tracking-tight">
            Long-Term Vision
          </h3>

          <p>
            The long-term goal is to continuously improve evaluation quality, search depth, and overall playing strength. Future plans include advanced move ordering, transposition tables, and neural-network-assisted evaluation systems.
          </p>

          {/* CTA */}
          <footer className="pt-24 border-t border-white/5">
            
            <div className="relative p-12 rounded-[40px] border border-rose-500/20 bg-rose-500/[0.01] text-center overflow-hidden">

              <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/10 blur-[80px] rounded-full" />

              <Activity 
                className="mx-auto text-rose-500 mb-6" 
                size={32} 
              />

              <h4 className="text-3xl font-bold text-white mb-4 tracking-tight">
                Follow the Journey.
              </h4>

              <p className="text-gray-400 max-w-sm mx-auto mb-10 leading-relaxed text-sm">
                Track the progress of miransas-chess as the engine continues to evolve and improve over time.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                <a 
                  href="https://github.com/sardorazimov" 
                  target="_blank"
                  className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold rounded-full text-[11px] uppercase tracking-[0.2em] hover:bg-rose-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  View Repository
                </a>

                <a 
                  href="https://chess.miransas.com" 
                  target="_blank"
                  className="w-full sm:w-auto px-10 py-4 border border-white/10 text-white font-bold rounded-full text-[11px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
                >
                  Open Project
                </a>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
}