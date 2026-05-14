"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  GitBranch,
  Layers,
  Zap,
  ShieldCheck,
  Box,
  Globe,
} from "lucide-react";

// Terminal Row
const CommandRow = ({
  command,
  output,
}: {
  command: string;
  output: string;
}) => (
  <div className="font-mono text-[11px] mb-3">
    <div className="flex gap-2 text-zinc-500">
      <span className="text-emerald-500">➜</span>
      <span className="text-zinc-300">{command}</span>
    </div>

    <div className="text-zinc-500 pl-4 mt-1">
      {output}
    </div>
  </div>
);

export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-300 font-sans ">
      
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">

        {/* Header */}
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

            <span className="text-[10px] font-mono uppercase tracking-widest">
              Developer Environment // v4.0.2
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-6">
            Developer{" "}
            <span className="text-zinc-600">
              Platform.
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-zinc-500 font-light leading-relaxed">
            Miransas builds products, infrastructure, developer tools,
            digital platforms, and interactive experiences designed for
            modern software ecosystems and scalable global services.
          </p>
        </header>

        {/* Product / Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">

          {/* Infrastructure */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-blue-500/40 transition-all group"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                <Zap size={24} />
              </div>

              <span className="text-[10px] font-mono text-zinc-600 group-hover:text-blue-400 transition-colors">
                CLOUD / EDGE / NETWORK
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 italic uppercase tracking-tight">
              Infrastructure Tools
            </h3>

            <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
              Performance-focused infrastructure and networking systems
              designed for scalable applications, modern deployment
              pipelines, and distributed digital environments.
            </p>

            <div className="bg-black/40 rounded-xl p-4 border border-white/5">
              <CommandRow
                command="deploy --region=global"
                output="Infrastructure initialized successfully"
              />

              <CommandRow
                command="network status"
                output="All operational nodes synchronized"
              />
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-purple-500/40 transition-all group"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
                <Cpu size={24} />
              </div>

              <span className="text-[10px] font-mono text-zinc-600 group-hover:text-purple-400 transition-colors">
                SOFTWARE / GAMES / APPS
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 italic uppercase tracking-tight">
              Digital Products
            </h3>

            <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
              Miransas develops applications, games, experimental
              technologies, and interactive systems built around
              performance, reliability, and modern user experiences.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 p-3 rounded-lg border border-white/5 text-center">
                <div className="text-[10px] text-zinc-600 uppercase mb-1">
                  Products
                </div>

                <div className="text-xl font-bold text-white italic">
                  Multi
                </div>
              </div>

              <div className="bg-black/40 p-3 rounded-lg border border-white/5 text-center">
                <div className="text-[10px] text-zinc-600 uppercase mb-1">
                  Focus
                </div>

                <div className="text-xl font-bold text-white italic">
                  Scalable
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Technical Section */}
        <section className="border-t border-white/5 pt-20">
          <div className="flex items-center gap-4 mb-12">
            <Layers className="text-zinc-600" size={20} />

            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500">
              Technology Stack
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">

            {/* Languages */}
            <div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2 italic">
                <Code2 size={16} className="text-emerald-500" />
                Languages
              </h4>

              <ul className="text-xs space-y-2 text-zinc-500 font-mono">
                <li>&gt; Rust</li>
                <li>&gt; Go</li>
                <li>&gt; TypeScript</li>
                <li>&gt; Python</li>
              </ul>
            </div>

            {/* Security */}
            <div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2 italic">
                <ShieldCheck size={16} className="text-blue-500" />
                Security
              </h4>

              <ul className="text-xs space-y-2 text-zinc-500 font-mono">
                <li>&gt; Encryption</li>
                <li>&gt; Secure Auth</li>
                <li>&gt; Infrastructure Safety</li>
              </ul>
            </div>

            {/* Deployment */}
            <div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2 italic">
                <GitBranch size={16} className="text-purple-500" />
                Deployment
              </h4>

              <ul className="text-xs space-y-2 text-zinc-500 font-mono">
                <li>&gt; Cloud Nodes</li>
                <li>&gt; Edge Runtime</li>
                <li>&gt; Containerized Services</li>
              </ul>
            </div>

            {/* Infrastructure */}
            <div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2 italic">
                <Globe size={16} className="text-zinc-400" />
                Infrastructure
              </h4>

              <ul className="text-xs space-y-2 text-zinc-500 font-mono">
                <li>&gt; Distributed Systems</li>
                <li>&gt; Global Network</li>
                <li>&gt; Modern Architecture</li>
              </ul>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}