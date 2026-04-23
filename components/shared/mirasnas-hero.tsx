/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { BrainCircuit, Code2, Database, Shield, Zap, Gamepad2, Activity, Github, ArrowDown } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// ISO ENGINE (Matematik ve Geometri)
// ─────────────────────────────────────────────────────────────────────────────
const ISO_X = 0.866025;
const ISO_Y = 0.5;
const SC = 1.1;
const pt = (x: number, y: number, z = 0) => `${(x - y) * ISO_X * SC},${((x + y) * ISO_Y - z) * SC}`;
const ptN = (x: number, y: number, z = 0): [number, number] => [(x - y) * ISO_X * SC, ((x + y) * ISO_Y - z) * SC];
const poly = (...pts: [number, number, number][]) => pts.map((p) => pt(...p)).join(" ");

const S = 180;
const C = S / 2;

// --- Siber-Cam İzometrik Blok ---
const IsoBlock = ({ x, y, z, w, h, d, topFill = "#0a0a0a", leftFill = "#050505", rightFill = "#020202", edge = "#1a1a1a", opacity = 1, glowColor }: any) => (
  <g opacity={opacity}>
    {glowColor && (
      <polygon points={poly([x,y,z+d],[x+w,y,z+d],[x+w,y+h,z+d],[x,y+h,z+d])} fill={glowColor} opacity={0.15} style={{ filter: "blur(4px)" }} />
    )}
    <polygon points={poly([x,y+h,z],[x+w,y+h,z],[x+w,y+h,z+d],[x,y+h,z+d])} fill={leftFill} stroke={glowColor ?? edge} strokeWidth="0.8" strokeLinejoin="round" />
    <polygon points={poly([x+w,y,z],[x+w,y+h,z],[x+w,y+h,z+d],[x+w,y,z+d])} fill={rightFill} stroke={glowColor ?? edge} strokeWidth="0.8" strokeLinejoin="round" />
    <polygon points={poly([x,y,z+d],[x+w,y,z+d],[x+w,y+h,z+d],[x,y+h,z+d])} fill={topFill} stroke={glowColor ?? edge} strokeWidth="0.8" strokeLinejoin="round" />
  </g>
);

// ─────────────────────────────────────────────────────────────────────────────
// NODE DATA
// ─────────────────────────────────────────────────────────────────────────────
const nodes = [
  { id: 0, label: "AI MESH", sublabel: "Neural Fabric", color: "#8CFF2E", icon: BrainCircuit, x: -60, y: C, z: 220, path: `M ${pt(-60,C,220)} L ${pt(-60,C,160)} L ${pt(C-20,C,160)}`, desc: "Autonomous neural mesh routing inference in real-time." },
  { id: 1, label: "RUST CORE", sublabel: "Memory Safe", color: "#FFFFFF", icon: Shield, x: 30, y: -40, z: 240, path: `M ${pt(30,-40,240)} L ${pt(30,-40,160)} L ${pt(30,C,160)} L ${pt(C-20,C,160)}`, desc: "Zero-copy macOS kernel bypass with absolute memory safety." },
  { id: 2, label: "DB LAYER", sublabel: "Persistent Store", color: "#8CFF2E", icon: Database, x: 150, y: -40, z: 230, path: `M ${pt(150,-40,230)} L ${pt(150,-40,160)} L ${pt(150,C,160)} L ${pt(C+20,C,160)}`, desc: "Distributed columnar storage with sub-millisecond access." },
  { id: 3, label: "PROXY NODE", sublabel: "Signal Router", color: "#4ade80", icon: Zap, x: S+60, y: C, z: 220, path: `M ${pt(S+60,C,220)} L ${pt(S+60,C,160)} L ${pt(C+20,C,160)}`, desc: "Centralized telemetry with zero-overhead signal dispatch." },
  { id: 4, label: "NIGHTMARES", sublabel: "Lost Signal", color: "#EF4444", icon: Gamepad2, x: 150, y: S+40, z: 210, path: `M ${pt(150,S+40,210)} L ${pt(150,S+40,160)} L ${pt(150,C,160)} L ${pt(C+20,C,160)}`, desc: "High-frequency simulation loop powering psychological horror." },
  { id: 5, label: "NEXT.JS UI", sublabel: "Edge Rendered", color: "#FFFFFF", icon: Code2, x: 30, y: S+40, z: 200, path: `M ${pt(30,S+40,200)} L ${pt(30,S+40,160)} L ${pt(30,C,160)} L ${pt(C-20,C,160)}`, desc: "Server-edge rendering delivering crash-safe user interfaces." },
];

// --- Terminal Yazı Efekti ---
const ScrambleText = ({ text }: { text: string }) => {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    let iteration = 0;
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    const interval = setInterval(() => {
      setDisplay(text.split("").map((char, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  return <>{display}</>;
};

// ─────────────────────────────────────────────────────────────────────────────
// ISO DIAGRAM (Siber-Motor)
// ─────────────────────────────────────────────────────────────────────────────
const IsoDiagram = ({ activeNode, activeColor }: any) => {
  const active = nodes[activeNode];
  const [coreCenter] = ptN(C, C, 178); // Çekirdek merkezi X
  const [, coreCenterY] = ptN(C, C, 178); // Çekirdek merkezi Y

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center pointer-events-none select-none drop-shadow-2xl">
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none blur-[120px]" style={{
        background: `radial-gradient(circle, ${activeColor}15 0%, transparent 60%)`,
        transition: "background 0.8s ease",
      }} />
      
      <div className="w-[132%] h-[132%] max-w-[920px] flex items-center justify-center">
        <svg viewBox="-360 -360 720 780" className="w-full h-full overflow-visible">
          <defs>
            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <motion.g initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }}>
            
            {/* Alt Zemin */}
            <IsoBlock x={0} y={0} z={0} w={S} h={S} d={60} topFill="#0a0a0a" leftFill="#050505" rightFill="#030303" edge="#1a1a1a" />
            
            {/* İç Karkas */}
            {([[0,0],[S,0],[0,S],[S,S]] as [number,number][]).map(([px,py],i) => (
              <path key={`col-${i}`} d={`M ${pt(px,py,60)} L ${pt(px,py,140)}`} stroke="#111" strokeWidth="2" strokeDasharray="4 6" />
            ))}
            
            {/* Üst Zemin */}
            <IsoBlock x={0} y={0} z={140} w={S} h={S} d={20} topFill="#0f0f0f" leftFill="#080808" rightFill="#040404" edge="#222" opacity={0.9} />

            {/* Sabit Ağ Bağlantıları */}
            {nodes.map(n => (
              <path key={`rail-${n.id}`} d={n.path} fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            ))}

            {/* AKTİF VERİ AKIŞI (DATA PACKETS) */}
            <AnimatePresence mode="wait">
              <g key={activeNode}>
                {/* Ana Lazer Işığı */}
                <motion.path d={active.path} fill="none" stroke={activeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#neonGlow)"
                  initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }} transition={{ duration: 1.5, times: [0, 0.7, 1], ease: "easeInOut" }} />
                
                {/* Hareket Eden Veri Paketleri (Kayan Noktalar) */}
                <motion.path d={active.path} fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 12"
                  initial={{ opacity: 0 }} animate={{ strokeDashoffset: [24, 0], opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />

                {/* Yan Sütunlardan Akan Veri Şelalesi */}
                {Array.from({length:8}).map((_,i) => (
                  <motion.path key={`wf-${i}`} d={`M ${pt(i*(S/7),S,60)} L ${pt(i*(S/7),S,0)}`} stroke={activeColor} strokeWidth="2" filter="url(#neonGlow)"
                    initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: [0, 1, 1], opacity: [0, 0.8, 0] }} transition={{ duration: 1.2, ease: "easeOut", delay: 1 + i*0.08 }} />
                ))}
              </g>
            </AnimatePresence>

            {/* MERKEZ REAKTÖR (Dönen Halkalar ve Atan Kalp) */}
            <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              {/* Dönen Dış Koruma */}
              <motion.circle cx={coreCenter} cy={coreCenterY} r="36" fill="none" stroke="#222" strokeWidth="1" strokeDasharray="4 8"
                animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: `${coreCenter}px ${coreCenterY}px` }} />
              
              {/* Nabız Atan Neon Halka */}
              <motion.circle cx={coreCenter} cy={coreCenterY} r="26" fill="none" stroke={activeColor} filter="url(#intenseGlow)"
                animate={{ opacity: [0.3, 1, 0.3], strokeWidth: [1, 4, 1], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: `${coreCenter}px ${coreCenterY}px` }} />
              
              <IsoBlock x={C-12} y={C-12} z={162} w={24} h={24} d={16} topFill={activeColor} leftFill={`${activeColor}80`} rightFill={`${activeColor}40`} edge="#ffffff" />
            </motion.g>

            {/* DIŞ DÜĞÜMLER (NODES) */}
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isActive = activeNode === index;
              const [ix, iy] = ptN(node.x, node.y, node.z+10);
              const [lx, ly] = ptN(node.x, node.y, node.z+32);
              return (
                <motion.g key={`node-${node.id}`} animate={{ y: [0, -4, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index*0.15 }}>
                  <IsoBlock x={node.x-18} y={node.y-18} z={node.z} w={36} h={36} d={14}
                    topFill={isActive ? `${node.color}15` : "#0a0a0a"} leftFill={isActive ? `${node.color}0a` : "#050505"} rightFill="#000000"
                    edge={isActive ? node.color : "#1a1a1a"} glowColor={isActive ? node.color : undefined} />
                  
                  <g transform={`translate(${ix},${iy}) scale(1.3)`}>
                    <g transform="scale(1,0.577) rotate(-45)">
                      <Icon color={isActive ? node.color : "#333"} size={16} x="-8" y="-8" strokeWidth={isActive ? 2.5 : 1.5} style={{ filter: isActive ? "drop-shadow(0px 0px 6px currentColor)" : "none" }} />
                    </g>
                  </g>
                  
                  {/* Düğüm İsimleri */}
                  <motion.text x={lx} y={ly-25} textAnchor="middle" className="font-mono font-bold tracking-[0.2em] text-[8px]"
                    animate={{ fill: isActive ? "#FFF" : "#444", opacity: isActive ? 1 : 0.5 }}>
                    {node.label}
                  </motion.text>
                </motion.g>
              );
            })}
          </motion.g>
        </svg>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────
const SectionHero = ({ activeNode, activeColor, setActiveNode }: any) => {
  const active = nodes[activeNode];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden bg-[#050505] font-sans selection:bg-[#8CFF2E] selection:text-black">
      {/* İnce Kılavuz Çizgileri */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-center">

          {/* SOL PANEL (Typography & UI) */}
          <motion.div style={{ y: leftY }} className="py-20 lg:py-0 relative z-20">
            
            <div className="mb-8 h-8">
              <AnimatePresence mode="wait">
                <motion.div key={activeNode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="inline-flex items-center gap-3 px-3 py-1.5 rounded-sm border bg-black/50 backdrop-blur-sm" style={{ borderColor: `${activeColor}30` }}>
                  <motion.span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeColor }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">{active.label}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <h1 className="text-[52px] lg:text-[76px] font-black uppercase leading-[0.85] tracking-tighter mb-8 text-white">
              Logic & <br/>
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>Nightmares</span><br/>
              <motion.span className="inline-block" animate={{ color: activeColor }} transition={{ duration: 0.8 }}>
                Engineered.
              </motion.span>
            </h1>

            <div className="h-20 mb-8 max-w-[480px]">
              <AnimatePresence mode="wait">
                <motion.div key={activeNode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-[13px] leading-relaxed text-white/50 font-light border-l border-white/10 pl-5 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[1px]" style={{ backgroundColor: activeColor, boxShadow: `0 0 10px ${activeColor}` }} />
                  <ScrambleText text={active.desc} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <button className="group relative px-8 py-4 bg-[#8CFF2E] rounded-lg text-[#050505] font-bold uppercase tracking-widest text-[11px] overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(140,255,46,0.3)] flex items-center gap-3">
                <Activity size={14} /> Initialize Core
                <div className="absolute inset-0 w-full h-full border border-[#8CFF2E] scale-[1.05] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
              </button>
              <button className="flex items-center gap-3 px-8 py-4 border rounded-lg border-white/10 text-white/50 font-bold uppercase tracking-widest text-[11px] hover:text-white hover:bg-white/5 transition-all">
                <Github size={14} /> Source Code
              </button>
            </div>
          </motion.div>

          {/* SAĞ PANEL (Siber-Motor) */}
          <motion.div style={{ y: rightY }} className="hidden lg:block">
            <IsoDiagram activeNode={activeNode} activeColor={activeColor} />
          </motion.div>
        </div>
      </div>

      {/* FOOTER NAVİGASYON */}
      <div className="relative z-20 border-t border-white/5 bg-[#020202]/80 backdrop-blur-xl px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {nodes.map((node, i) => (
            <button key={i} onClick={() => setActiveNode(i)} className="group flex flex-col gap-1.5 cursor-pointer outline-none">
              <span className="text-[9px] uppercase tracking-widest font-mono transition-colors duration-300" style={{ color: activeNode === i ? "#fff" : "rgba(255,255,255,0.2)" }}>
                0{i+1}
              </span>
              <div className="w-10 h-[2px] rounded-full overflow-hidden bg-white/5 relative">
                {activeNode === i && (
                  <motion.div layoutId="navIndicator" className="absolute inset-0" style={{ backgroundColor: node.color }} />
                )}
              </div>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase">
          <ArrowDown size={14} className="animate-bounce" style={{ color: activeColor }} /> Scroll
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveNode(p => (p + 1) % nodes.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <SectionHero activeNode={activeNode} activeColor={nodes[activeNode].color} setActiveNode={setActiveNode} />
    </div>
  );
}