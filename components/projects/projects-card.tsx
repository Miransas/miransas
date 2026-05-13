/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu, Database, Share2, ShieldCheck, Zap, Globe, Code2,
  Lock, Terminal, Server, Gamepad, ChevronDown, Binary,
  Clock3Icon
} from 'lucide-react';

import { cn } from "@/lib/utils";
import ShinyButton from '../shared/shiny-button';


// --- Navigation ---
const navItems = [
  { id: 'tunnels', label: 'Tunnels', icon: Globe },
  { id: 'intelligence', label: 'Intelligence', icon: Cpu },
  { id: 'game', label: 'Game', icon: Gamepad },
];

export default function CosmoqLayout() {
  const [activeSection, setActiveSection] = useState('tunnels');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.2
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/[0.02]" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/[0.02]" />
      </div>

      <div className="flex p-10 pt-32 gap-16 max-w-7xl mx-auto items-start relative z-10">

        {/* Sidebar */}
        <aside className="w-52 sticky top-32 space-y-12 h-fit hidden md:block">
          
          <div className="text-3xl font-black tracking-tighter italic px-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Project
          </div>

          <nav className="space-y-1 ">
            {navItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeSection === item.id}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              />
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 space-y-12 pb-24">

          {/* BINBOI */}
          <section
            id="tunnels"
            className="group relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0a0a0a] p-12 min-h-[520px] transition-all duration-500 hover:border-blue-500/20 hover:-translate-y-[2px] hover:shadow-[0_0_60px_rgba(255,255,255,0.03)]"
          >

            {/* Animated Border Beam */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "220%" }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "linear"
              }}
              className="absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-xl pointer-events-none"
            />

            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute inset-0 rounded-[40px] border border-white/10" />
              <div className="absolute -inset-[1px] rounded-[40px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-40 blur-sm" />
            </div>

            <motion.div
              animate={{
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-[40px] border border-white/[0.03] pointer-events-none"
            />

            <div className="relative z-10 max-w-lg">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] uppercase tracking-widest font-bold mb-6">
                <Globe size={12} /> Developer Infrastructure
              </div>

              <h2 className="text-5xl font-bold mb-6 tracking-tighter leading-none text-white">
                Public Endpoints <br /> for Localhost.
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                binboi makes localhost sharing simple with fast, secure, and reliable tunnels built for modern development workflows.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                <Tag icon={Zap} text="Instant Tunnels" />
                <Tag icon={Lock} text="Encrypted Traffic" />
                <Tag icon={Terminal} text="CLI First" />
              </div>

              <ShinyButton
                label="Open Binboi"
                href="/projects/binboi"
                isRose={false}
              />
            </div>

            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
          </section>

          {/* CHESS ENGINE */}
          <section
            id="intelligence"
            className="group relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0a0a0a] p-12 min-h-[520px] transition-all duration-500 hover:border-rose-500/20 hover:-translate-y-[2px] hover:shadow-[0_0_60px_rgba(255,255,255,0.03)]"
          >

            {/* Animated Beam */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "220%" }}
              transition={{
                repeat: Infinity,
                duration: 7,
                ease: "linear"
              }}
              className="absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-xl pointer-events-none"
            />

            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute inset-0 rounded-[40px] border border-white/10" />
              <div className="absolute -inset-[1px] rounded-[40px] bg-gradient-to-r from-transparent via-rose-500/10 to-transparent opacity-40 blur-sm" />
            </div>

            <motion.div
              animate={{
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-[40px] border border-white/[0.03] pointer-events-none"
            />

            <div className="relative z-10 max-w-lg">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/5 text-rose-400 text-[10px] uppercase tracking-widest font-bold mb-6">
                <Cpu size={12} /> Systems Programming
              </div>

              <h2 className="text-5xl font-bold mb-6 tracking-tighter leading-none text-white">
                Rust Chess <br /> Engine Project.
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                A personal chess engine project focused on Rust, bitboard optimization, move generation, and modern engine architecture.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                <Tag icon={Code2} text="Rust Engine" />
                <Tag icon={Binary} text="Bitboards" />
                <Tag icon={Cpu} text="Search Logic" />
              </div>

              <ShinyButton
                label="Open Chess Engine"
                href="/projects/chess-engine"
                isRose={true}
              />
            </div>

            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-rose-600/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -right-20 top-0 w-64 h-64 bg-rose-500/5 blur-[80px] rounded-full pointer-events-none" />
          </section>

          {/* LOST SIGNAL */}
          <section
            id="game"
            className="group relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0a0a0a] p-12 min-h-[520px] transition-all duration-500 hover:border-emerald-500/20 hover:-translate-y-[2px] hover:shadow-[0_0_60px_rgba(255,255,255,0.03)]"
          >

            {/* Beam */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "220%" }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "linear"
              }}
              className="absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-xl pointer-events-none"
            />

            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute inset-0 rounded-[40px] border border-white/10" />
              <div className="absolute -inset-[1px] rounded-[40px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent opacity-40 blur-sm" />
            </div>

            <motion.div
              animate={{
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-[40px] border border-white/[0.03] pointer-events-none"
            />

            <div className="relative z-10 max-w-lg">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] uppercase tracking-widest font-bold mb-6">
                <Clock3Icon size={12} /> In Development
              </div>

              <h2 className="text-5xl font-bold mb-6 tracking-tighter leading-none text-white">
                Lost Signal <br /> Horror Experience.
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                An atmospheric horror project focused on psychological tension, distorted frequencies, and cinematic storytelling.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                <Tag icon={Gamepad} text="Atmospheric" />
                <Tag icon={Server} text="Narrative Driven" />
                <Tag icon={ShieldCheck} text="Psychological Horror" />
              </div>

              <ShinyButton
                label="Explore Games"
                href="/games"
                isRose={false}
              />
            </div>

            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-emerald-600/10 via-transparent to-transparent pointer-events-none" />
          </section>

        </main>
      </div>
    </div>
  );
}

/* Sidebar */
const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <div
    onClick={onClick}
    className={cn(
      "group flex items-center gap-4 px-4 py-3 rounded-xl transition-all cursor-pointer relative",
      active
        ? "text-white bg-white/[0.03]"
        : "text-gray-500 hover:text-white hover:bg-white/[0.01]"
    )}
  >
    <Icon
      size={18}
      className={cn(
        "transition-colors",
        active ? "text-blue-400" : "group-hover:text-gray-300"
      )}
    />

    <span
      className={cn(
        "text-xs font-bold tracking-[0.1em] uppercase",
        active ? "opacity-100" : "opacity-60"
      )}
    >
      {label}
    </span>

    {active && (
      <motion.div
        layoutId="activeSidebarTab"
        className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-blue-500 shadow-[0_0_15px_#3b82f6] rounded-full"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
  </div>
);

/* Tags */
const Tag = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.03] text-gray-400 text-[11px] font-medium tracking-wide">
    <Icon size={12} className="text-gray-500" />
    <span>{text}</span>
  </div>
);