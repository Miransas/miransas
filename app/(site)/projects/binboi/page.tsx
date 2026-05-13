"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Link as LinkIcon, 
  ChevronDown, 
  Terminal, 
  Github, 
  ExternalLink,
  Cpu,
  Globe
} from 'lucide-react';

export default function BinboiBlog() {
  const GITHUB_EDIT_URL = "https://github.com/sardorazimov/miransas/edit/main/blog/binboi.tsx";

  return (
    <div className="min-h-screen bg-black text-[#ededed] font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* --- Background Decor --- */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Vertical Grid Lines */}
        <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        <div className="absolute left-[35%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        <div className="absolute right-[35%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        <div className="absolute right-[15%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <article className="max-w-[760px] mx-auto px-6 pt-32 pb-40 relative z-10">
        
        {/* Header */}
        <header className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-bold"
            >
              Developer Infrastructure
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
            binboi: Localhost Access, <br /> Simplified.
          </h1>

          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-[1px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <span className="text-xs font-bold">SA</span>
                </div>
              </div>

              <div className="text-left">
                <p className="text-sm font-semibold text-white">Sardor Azimov</p>
                <p className="text-[11px] text-gray-500 uppercase tracking-wider">
                  Founder of Miransas
                </p>
              </div>
            </div>

            <a 
              href="https://binboi.com" 
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium transition-all"
            >
              <Globe size={14} />
              binboi.com
              <ExternalLink size={12} className="opacity-50" />
            </a>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between border-y border-white/5 py-6 font-mono text-[11px] text-gray-500 tracking-widest uppercase">
            <div className="flex gap-6">
              <span className="flex items-center gap-2">
                <Clock size={14} />
                4 Minute Read
              </span>

              <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                <LinkIcon size={14} />
                Copy Link
                <ChevronDown size={12} />
              </button>
            </div>

            <span className="hidden sm:inline">May 14, 2026</span>
          </div>
        </header>

        {/* Content */}
        <div className="space-y-10 text-[18px] leading-[1.8] text-gray-400">
          
          <p className="text-white text-2xl leading-snug font-medium tracking-tight">
            binboi is a lightweight tunneling platform designed for developers who value speed, simplicity, and clean infrastructure.
          </p>

          <p>
            With <strong>binboi</strong>, our goal is to make localhost exposure effortless. From webhook testing to remote demos and API development, binboi helps developers share local services instantly and securely.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-16">
            
            <div className="p-8 rounded-[24px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
              <Terminal className="text-blue-500 mb-4" size={24} />

              <h4 className="text-white font-bold mb-2">
                High-Speed Backend
              </h4>

              <p className="text-sm leading-relaxed">
                Powered by Go for fast networking, low latency, and reliable tunnel orchestration at scale.
              </p>
            </div>

            <div className="p-8 rounded-[24px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
              <Cpu className="text-cyan-400 mb-4" size={24} />

              <h4 className="text-white font-bold mb-2">
                Rust CLI Agent
              </h4>

              <p className="text-sm leading-relaxed">
                Built with Rust for performance and stability, ensuring secure and efficient local connections.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white pt-8 tracking-tight italic">
            Built for Modern Development
          </h3>

          <p>
            binboi was designed to remove friction from local development workflows. Fast setup, stable tunnels, and clean tooling allow developers to focus on building instead of configuring infrastructure.
          </p>

          {/* Features */}
          <ul className="space-y-6 list-none p-0 my-12">
            
            <li className="flex items-start gap-4">
              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />

              <span>
                <strong className="text-white">
                  Instant Setup:
                </strong>{" "}
                Launch secure public endpoints in seconds.
              </span>
            </li>

            <li className="flex items-start gap-4">
              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />

              <span>
                <strong className="text-white">
                  Reliable Connections:
                </strong>{" "}
                Stable tunnels designed for testing, demos, and development workflows.
              </span>
            </li>

            <li className="flex items-start gap-4">
              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />

              <span>
                <strong className="text-white">
                  Custom Domains:
                </strong>{" "}
                Connect your own domains and create a professional development environment.
              </span>
            </li>
          </ul>

          {/* Quote */}
          <div className="relative p-10 rounded-[32px] border border-white/10 bg-white/[0.02] my-16 overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 to-transparent" />

            <p className="m-0 italic text-lg text-white/90 font-serif leading-relaxed">
              &quot;We built binboi to make localhost sharing fast, reliable, and frustration-free for modern developers.&quot;
            </p>
          </div>

          <p>
            Whether you&apos;re testing APIs, receiving webhooks, sharing local projects, or building production-ready applications, binboi keeps your tunnels fast and secure.
          </p>

          {/* CTA */}
          <footer className="pt-24 border-t border-white/5">
            <div className="relative p-12 rounded-[40px] border border-blue-500/20 bg-blue-500/[0.02] text-center overflow-hidden">
              
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full" />

              <h4 className="text-3xl font-bold text-white mb-4 tracking-tight">
                Expose Localhost Instantly.
              </h4>

              <p className="text-gray-400 max-w-sm mx-auto mb-10 leading-relaxed">
                Create secure public endpoints for your local applications in seconds.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                
                <a 
                  href="https://binboi.com" 
                  className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold rounded-full text-[11px] uppercase tracking-[0.2em] hover:bg-blue-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  Get Started
                </a>

                <a 
                  href="https://github.com/miransas" 
                  className="w-full sm:w-auto px-10 py-4 border border-white/10 text-white font-bold rounded-full text-[11px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
                >
                  Open GitHub
                </a>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
}