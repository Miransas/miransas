/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

/**
 * MIRANSAS — Full Scroll Experience
 * Lenis smooth scroll + Framer Motion scroll-triggered animations
 * Sections: Hero · Features · Tech Stack · Metrics
 *
 * Dependencies:
 *   npm install lenis framer-motion lucide-react
 */

import React, {
  useState, useEffect, useRef, useCallback,
} from "react";
import Lenis from "lenis";
import {
  motion, useScroll, useTransform, useSpring,
  useInView, AnimatePresence,
} from "framer-motion";
import {
  BrainCircuit, Code2, Database, Shield, Zap, Gamepad2,
  ArrowRight, Github, FolderGit2, Terminal, Activity,
  Layers, GitBranch, Cpu, Box, ArrowDown,
  Hexagon, BarChart3, Network, Workflow,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// ISO ENGINE
// ─────────────────────────────────────────────────────────────────────────────
const ISO_X = 0.866025;
const ISO_Y = 0.5;
const SC = 1.1;
const pt = (x: number, y: number, z = 0) =>
  `${(x - y) * ISO_X * SC},${((x + y) * ISO_Y - z) * SC}`;
const ptN = (x: number, y: number, z = 0): [number, number] => [
  (x - y) * ISO_X * SC,
  ((x + y) * ISO_Y - z) * SC,
];
const poly = (...pts: [number, number, number][]) =>
  pts.map((p) => pt(...p)).join(" ");

const S = 180;
const C = S / 2;

interface IsoBlockProps {
  x: number; y: number; z: number; w: number; h: number; d: number;
  topFill?: string; leftFill?: string; rightFill?: string;
  edge?: string; opacity?: number; glowColor?: string;
}
const IsoBlock = ({
  x, y, z, w, h, d,
  topFill = "#161616", leftFill = "#0D0D0D", rightFill = "#050505",
  edge = "#2A2A2A", opacity = 1, glowColor,
}: IsoBlockProps) => (
  <g opacity={opacity}>
    {glowColor && (
      <polygon points={poly([x,y,z+d],[x+w,y,z+d],[x+w,y+h,z+d],[x,y+h,z+d])}
        fill={glowColor} opacity={0.06} />
    )}
    <polygon points={poly([x,y+h,z],[x+w,y+h,z],[x+w,y+h,z+d],[x,y+h,z+d])}
      fill={leftFill} stroke={glowColor ?? edge} strokeWidth="0.4" strokeLinejoin="round" />
    <polygon points={poly([x+w,y,z],[x+w,y+h,z],[x+w,y+h,z+d],[x+w,y,z+d])}
      fill={rightFill} stroke={glowColor ?? edge} strokeWidth="0.4" strokeLinejoin="round" />
    <polygon points={poly([x,y,z+d],[x+w,y,z+d],[x+w,y+h,z+d],[x,y+h,z+d])}
      fill={topFill} stroke={glowColor ?? edge} strokeWidth="0.4" strokeLinejoin="round" />
  </g>
);

// ─────────────────────────────────────────────────────────────────────────────
// NODE DATA
// ─────────────────────────────────────────────────────────────────────────────
const nodes = [
  { id: 0, label: "AI MESH",     sublabel: "Neural Fabric",    color: "#EAB308", icon: BrainCircuit,
    x: -60,   y: C,    z: 220,
    path: `M ${pt(-60,C,220)} L ${pt(-60,C,160)} L ${pt(C-20,C,160)}`,
    desc: "Autonomous neural mesh with real-time inference routing" },
  { id: 1, label: "RUST TUNNEL", sublabel: "Memory Safe",      color: "#3B82F6", icon: Shield,
    x: 30,    y: -40,  z: 240,
    path: `M ${pt(30,-40,240)} L ${pt(30,-40,160)} L ${pt(30,C,160)} L ${pt(C-20,C,160)}`,
    desc: "Zero-copy macOS kernel bypass with memory guarantees" },
  { id: 2, label: "DATA LAYER",  sublabel: "Persistent Store", color: "#10B981", icon: Database,
    x: 150,   y: -40,  z: 230,
    path: `M ${pt(150,-40,230)} L ${pt(150,-40,160)} L ${pt(150,C,160)} L ${pt(C+20,C,160)}`,
    desc: "Distributed columnar storage with sub-millisecond access" },
  { id: 3, label: "PROXY CORE",  sublabel: "Signal Router",    color: "#A855F7", icon: Zap,
    x: S+60,  y: C,    z: 220,
    path: `M ${pt(S+60,C,220)} L ${pt(S+60,C,160)} L ${pt(C+20,C,160)}`,
    desc: "Centralized telemetry with zero-overhead signal dispatch" },
  { id: 4, label: "GAME ENGINE", sublabel: "Real-time Sim",    color: "#EF4444", icon: Gamepad2,
    x: 150,   y: S+40, z: 210,
    path: `M ${pt(150,S+40,210)} L ${pt(150,S+40,160)} L ${pt(150,C,160)} L ${pt(C+20,C,160)}`,
    desc: "High-frequency simulation loop at 120Hz tick rate" },
  { id: 5, label: "NEXT.JS UI",  sublabel: "Edge Rendered",    color: "#06B6D4", icon: Code2,
    x: 30,    y: S+40, z: 200,
    path: `M ${pt(30,S+40,200)} L ${pt(30,S+40,160)} L ${pt(30,C,160)} L ${pt(C-20,C,160)}`,
    desc: "Server-edge rendering with streaming RSC support" },
];

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────
const Scanline = () => (
  <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
    style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.045) 2px,rgba(255,255,255,0.045) 4px)" }} />
);

const GridBg = () => (
  <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.018]"
    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
);

// Animate-in wrapper
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TICKER
// ─────────────────────────────────────────────────────────────────────────────
const metrics_ticker = [
  "LATENCY 0.4ms","THROUGHPUT 12.4 GB/s","NODES ACTIVE 6/6",
  "UPTIME 99.99%","MESH SYNC ✓","RUST ALLOC 0 LEAKS",
  "PACKETS/s 2.4M","CORE TEMP 38°C","BUILD #4821",
];
const TickerBar = ({ color }: { color: string }) => {
  const items = [...metrics_ticker, ...metrics_ticker, ...metrics_ticker];
  return (
    <div className="overflow-hidden border-b border-white/[0.05] py-2 bg-black/50">
      <motion.div className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, "-33.33%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
        {items.map((m, i) => (
          <span key={i} className="font-mono text-[10px] tracking-[0.22em] uppercase flex items-center gap-3">
            <span className="w-1 h-1 rounded-full inline-block" style={{ backgroundColor: color, transition: "background-color 1s" }} />
            <span className="text-white/30">{m}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ISO DIAGRAM (Hero right panel)
// ─────────────────────────────────────────────────────────────────────────────
const IsoDiagram = ({ activeNode, activeColor, tick }: { activeNode: number; activeColor: string; tick: number }) => {
  const active = nodes[activeNode];
  const mx = useSpring(useRef(0 as any).current, { stiffness: 55, damping: 20 });
  const my = useSpring(useRef(0 as any).current, { stiffness: 55, damping: 20 });

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center pointer-events-none select-none"
      style={{ transform: "translateZ(0)", willChange: "transform" }}>
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none" style={{
        background: `radial-gradient(circle, ${activeColor}12 0%, transparent 68%)`,
        transition: "background 1.1s ease",
      }} />
      <div className="w-[132%] h-[132%] max-w-[920px] flex items-center justify-center"
        style={{ willChange: "transform" }}>
        <svg viewBox="-360 -360 720 780" className="w-full h-full overflow-visible">
          <motion.g initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6, ease: "easeOut" }}>

            {/* Platform */}
            <IsoBlock x={0} y={0} z={0} w={S} h={S} d={60}
              topFill="#131313" leftFill="#0A0A0A" rightFill="#060606" edge="#1E1E1E" glowColor={activeColor} />
            <motion.polygon points={poly([0,0,60],[S,0,60],[S,S,60],[0,S,60])}
              fill="none" animate={{ stroke: `${activeColor}20` }} transition={{ duration: 0.8 }} strokeWidth="1" />

            {/* Pillars */}
            {([[0,0],[S,0],[0,S],[S,S]] as [number,number][]).map(([px,py],i) => (
              <React.Fragment key={`col-${i}`}>
                <path d={`M ${pt(px,py,60)} L ${pt(px,py,100)}`} stroke="#1B1B1B" strokeWidth="1" strokeDasharray="3 4" />
                <path d={`M ${pt(px,py,100)} L ${pt(px,py,140)}`} stroke="#1B1B1B" strokeWidth="1" strokeDasharray="3 4" />
              </React.Fragment>
            ))}

            {/* Mid mesh */}
            <polygon points={poly([0,0,100],[S,0,100],[S,S,100],[0,S,100])}
              fill="#0D0D0D" fillOpacity="0.6" stroke="#202020" strokeWidth="0.8" />
            {[30,60,90,120,150].map(v => (
              <g key={`msh-${v}`}>
                <path d={`M ${pt(v,0,100)} L ${pt(v,S,100)}`} stroke="#191919" strokeWidth="0.5" />
                <path d={`M ${pt(0,v,100)} L ${pt(S,v,100)}`} stroke="#191919" strokeWidth="0.5" />
              </g>
            ))}

            {/* Top platform */}
            <IsoBlock x={0} y={0} z={140} w={S} h={S} d={20}
              topFill="#161616" leftFill="#111" rightFill="#0A0A0A" edge="#222" opacity={0.95} />
            {[1,2,3,4,5].map(i => (
              <g key={`g-${i}`}>
                <path d={`M ${pt(i*(S/6),0,162)} L ${pt(i*(S/6),S,162)}`} stroke="#222" strokeWidth="0.8" />
                <path d={`M ${pt(0,i*(S/6),162)} L ${pt(S,i*(S/6),162)}`} stroke="#222" strokeWidth="0.8" />
              </g>
            ))}

            {/* Static rails */}
            {nodes.map(n => (
              <path key={`rail-${n.id}`} d={n.path} fill="none" stroke="#161616" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            ))}
            {Array.from({length:12}).map((_,i) => (
              <g key={`wr-${i}`}>
                <path d={`M ${pt(i*(S/11),S,60)} L ${pt(i*(S/11),S,0)}`} stroke="#141414" strokeWidth="1.5" />
                <path d={`M ${pt(S,i*(S/11),60)} L ${pt(S,i*(S/11),0)}`} stroke="#141414" strokeWidth="1.5" />
              </g>
            ))}
            <path d={`M ${pt(S+50,S+50,20)} L ${pt(S+50,S+50,100)} L ${pt(S+150,S+150,100)} L ${pt(S+150,S+150,140)}`}
              fill="none" stroke="#161616" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Animated sequences */}
            <AnimatePresence mode="wait">
              <g key={activeNode}>
                {/* Laser */}
                <motion.path d={active.path} fill="none" stroke={activeColor} strokeWidth="3"
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{ filter: `drop-shadow(0 0 5px ${activeColor})` }}
                  initial={{ pathLength:0, opacity:0 }}
                  animate={{ pathLength:[0,1,1], opacity:[0,1,0] }}
                  transition={{ duration:1.6, times:[0,0.65,1], ease:"easeInOut" }} />
                <motion.path d={active.path} fill="none" stroke="white" strokeWidth="0.8"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength:0, opacity:0 }}
                  animate={{ pathLength:[0,1,1], opacity:[0,0.55,0] }}
                  transition={{ duration:1.6, times:[0,0.65,1], ease:"easeInOut" }} />

                {/* Core matrix ripple */}
                {Array.from({length:6}).map((_,row) =>
                  Array.from({length:6}).map((_,col) => {
                    const cx=(C-20)+col*(40/6), cy=(C-20)+row*(40/6), cs=40/6;
                    const d=Math.sqrt((col-2.5)**2+(row-2.5)**2);
                    return (
                      <motion.polygon key={`cm-${row}-${col}`}
                        points={poly([cx,cy,162],[cx+cs,cy,162],[cx+cs,cy+cs,162],[cx,cy+cs,162])}
                        stroke="#1A1A1A" strokeWidth="0.5"
                        initial={{ fill:"#111" }}
                        animate={{ fill:["#111",`${activeColor}65`,"#111"] }}
                        transition={{ duration:1.1, delay:1.5+d*0.055, ease:"easeInOut" }} />
                    );
                  })
                )}

                {/* Waterfall */}
                {Array.from({length:12}).map((_,i) => (
                  <React.Fragment key={`wf-${i}`}>
                    <motion.path d={`M ${pt(i*(S/11),S,60)} L ${pt(i*(S/11),S,0)}`}
                      stroke={activeColor} strokeWidth="2"
                      initial={{ pathLength:0, opacity:0 }}
                      animate={{ pathLength:[0,1,1], opacity:[0,0.85,0] }}
                      transition={{ duration:1.5, ease:"easeOut", delay:1.5+i*0.03 }} />
                    <motion.path d={`M ${pt(S,i*(S/11),60)} L ${pt(S,i*(S/11),0)}`}
                      stroke={activeColor} strokeWidth="2"
                      initial={{ pathLength:0, opacity:0 }}
                      animate={{ pathLength:[0,1,1], opacity:[0,0.85,0] }}
                      transition={{ duration:1.5, ease:"easeOut", delay:1.5+i*0.03 }} />
                  </React.Fragment>
                ))}

                {/* Terminal signal */}
                <motion.path
                  d={`M ${pt(S+50,S+50,20)} L ${pt(S+50,S+50,100)} L ${pt(S+150,S+150,100)} L ${pt(S+150,S+150,140)}`}
                  fill="none" stroke={activeColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ filter: `drop-shadow(0 0 8px ${activeColor})` }}
                  initial={{ pathLength:0, opacity:0 }}
                  animate={{ pathLength:[0,1,1], opacity:[0,1,0] }}
                  transition={{ duration:1.4, ease:"easeOut", delay:2.5 }} />
              </g>
            </AnimatePresence>

            {/* Core cube */}
            <motion.g animate={{ y:[0,-6,0] }} transition={{ duration:3.5, repeat:Infinity, ease:"easeInOut" }}>
              <motion.circle cx={ptN(C,C,178)[0]} cy={ptN(C,C,178)[1]} r="24" fill="none"
                animate={{ stroke:activeColor, opacity:[0.12,0.38,0.12] }}
                transition={{ duration:2.2, repeat:Infinity }} strokeWidth="1" />
              <motion.polygon points={poly([C-12,C-12,180],[C+12,C-12,180],[C+12,C+12,180],[C-12,C+12,180])}
                animate={{ fill:activeColor }} transition={{ duration:0.5 }} opacity={0.9} />
              <motion.polygon points={poly([C-12,C+12,162],[C+12,C+12,162],[C+12,C+12,180],[C-12,C+12,180])}
                animate={{ fill:activeColor }} transition={{ duration:0.5 }} opacity={0.6} />
              <motion.polygon points={poly([C+12,C-12,162],[C+12,C+12,162],[C+12,C+12,180],[C+12,C-12,180])}
                animate={{ fill:activeColor }} transition={{ duration:0.5 }} opacity={0.4} />
            </motion.g>

            {/* Nodes */}
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isActive = activeNode === index;
              const [ix, iy] = ptN(node.x, node.y, node.z+10);
              const [lx, ly] = ptN(node.x, node.y, node.z+20);
              return (
                <motion.g key={`node-${node.id}`}
                  animate={{ y:[0,-8,0] }}
                  transition={{ duration:4, repeat:Infinity, ease:"easeInOut", delay:index*0.35 }}>
                  {isActive && (
                    <motion.ellipse cx={ptN(node.x,node.y,node.z+5)[0]} cy={ptN(node.x,node.y,node.z+5)[1]}
                      rx="30" ry="17" fill={node.color}
                      animate={{ opacity:[0.05,0.16,0.05] }} transition={{ duration:2.2, repeat:Infinity }} />
                  )}
                  <IsoBlock x={node.x-16} y={node.y-16} z={node.z} w={32} h={32} d={12}
                    topFill={isActive ? `${node.color}18` : "#1A1A1A"}
                    leftFill={isActive ? `${node.color}0F` : "#111"}
                    rightFill={isActive ? `${node.color}08` : "#0A0A0A"}
                    edge={isActive ? `${node.color}75` : "#282828"} />
                  <g transform={`translate(${ix},${iy})`}>
                    <g transform="scale(1,0.577) rotate(-45)">
                      <Icon color={isActive ? node.color : "#3A3A3A"} size={14} x="-7" y="-7" strokeWidth={isActive ? 2.5 : 1.5} />
                    </g>
                  </g>
                  <motion.text x={lx} y={ly-18} textAnchor="middle"
                    fontSize="6" fontFamily="'IBM Plex Mono',monospace" fontWeight="700" letterSpacing="1.2"
                    animate={{ fill:isActive ? node.color : "#2E2E2E", opacity:isActive ? 1 : 0.5 }}
                    transition={{ duration:0.4 }}>
                    {node.label}
                  </motion.text>
                </motion.g>
              );
            })}

            {/* Hub */}
            <g>
              <IsoBlock x={S+40} y={S+40} z={0} w={20} h={20} d={20}
                topFill="#161616" leftFill="#0A0A0A" rightFill="#060606" edge="#222" />
              <path d={`M ${pt(S-20,S,0)} L ${pt(S+50,S+50,10)}`} stroke="#252525" strokeWidth="1" strokeDasharray="2 3" />
              <path d={`M ${pt(S,S-20,0)} L ${pt(S+50,S+50,10)}`} stroke="#252525" strokeWidth="1" strokeDasharray="2 3" />
            </g>

            {/* Repo terminal */}
            <motion.g animate={{ y:[0,-10,0] }} transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}>
              <IsoBlock x={S+128} y={S+128} z={140} w={44} h={44} d={28}
                topFill="#111" leftFill="#0E0E0E" rightFill="#0A0A0A"
                edge={`${activeColor}45`} glowColor={activeColor} />
              <motion.polygon
                points={poly([S+128,S+128,168],[S+172,S+128,168],[S+172,S+172,168],[S+128,S+172,168])}
                fill="none"
                animate={{ stroke:activeColor, opacity:[0.18,0.55,0.18] }}
                transition={{ duration:2.8, repeat:Infinity }} strokeWidth="1.5" />
              <g transform={`translate(${ptN(S+150,S+150,170)[0]},${ptN(S+150,S+150,170)[1]})`}>
                <g transform="scale(1,0.577) rotate(-45)">
                  <FolderGit2 color={activeColor} size={20} x="-10" y="-10" strokeWidth={2} style={{ transition: "color 0.5s" }} />
                  <text x="0" y="26" fill="#777" fontSize="7.5" fontWeight="bold" textAnchor="middle" letterSpacing="2">MIRANSAS</text>
                </g>
              </g>
            </motion.g>

          </motion.g>
        </svg>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// ─────────────────────────────────────────────────────────────────────────────
const SectionHero = ({ activeNode, activeColor, tick, setActiveNode }:
  { activeNode: number; activeColor: string; tick: number; setActiveNode: (n: number) => void }) => {
  const active = nodes[activeNode];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} 
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#000000]"
      style={{ transform: "translateZ(0)", isolation: "isolate", fontFamily: "'IBM Plex Mono',monospace" }}>
      <Scanline />
      <GridBg />
      <div className="pointer-events-none absolute inset-0 z-0" style={{
        background: `radial-gradient(ellipse 65% 55% at 68% 50%, ${activeColor}10 0%, transparent 70%)`,
        transition: "background 1.2s ease",
      }} />

      {/* NAV */}
    

      {/* TICKER */}
      {/* <TickerBar color={activeColor} /> */}

      {/* MAIN */}
      <motion.div style={{ opacity }} className="relative z-10 flex-1 flex items-center">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-0 items-center">

          {/* LEFT */}
          <motion.div style={{ y: leftY }}
            className="py-16 lg:py-0 max-w-[560px] relative z-20">
            <motion.div initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.11 } } }}>

              {/* Badge */}
              <motion.div variants={{ hidden:{opacity:0,x:-20}, visible:{opacity:1,x:0} }} className="mb-8">
                <AnimatePresence mode="wait">
                  <motion.div key={activeNode}
                    initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
                    transition={{ duration:0.3 }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full border"
                    style={{ backgroundColor:`${activeColor}0D`, borderColor:`${activeColor}30` }}>
                    <motion.span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor:activeColor }}
                      animate={{ opacity:[1,0.15,1], scale:[1,1.6,1] }} transition={{ duration:1.6, repeat:Infinity }} />
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color:activeColor }}>{active.label}</span>
                    <span className="text-[9px] font-mono text-white/25">{active.sublabel}</span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* H1 */}
              <motion.h1 variants={{ hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.9}} }}
                className="text-[50px] lg:text-[62px] xl:text-[74px] font-black uppercase leading-[0.92] tracking-[-0.03em] mb-5">
                Infrastructure<br />
                is not{" "}
                <span className="text-white/18 italic font-light">linear</span>.<br />
                <motion.span className="inline-block" animate={{ color:activeColor }} transition={{ duration:0.7 }}>
                  Neither are we.
                </motion.span>
              </motion.h1>

              <motion.p variants={{ hidden:{opacity:0,y:20}, visible:{opacity:1,y:0,transition:{duration:0.8}} }}
                className="text-[13px] leading-[1.8] text-white/35 mb-4 max-w-[440px] font-light">
                Engineered for high-stakes production. A 6-layer symmetric architecture featuring
                memory-safe macOS tunnels, autonomous AI meshes, and centralized telemetry routing.
              </motion.p>

              <AnimatePresence mode="wait">
                <motion.p key={activeNode}
                  initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:8 }}
                  transition={{ duration:0.3 }}
                  className="text-[11px] leading-relaxed mb-10 font-mono tracking-wide border-l-2 pl-3"
                  style={{ color:`${activeColor}75`, borderColor:`${activeColor}40` }}>
                  {active.desc}
                </motion.p>
              </AnimatePresence>

              {/* Stats */}
              <motion.div variants={{ hidden:{opacity:0}, visible:{opacity:1} }} className="flex flex-wrap gap-2 mb-10">
                {[["Layers","6"],["Latency","0.4ms"],["Uptime","99.99%"],["GB/s","12.4"]].map(([l,v]) => (
                  <div key={l} className="flex flex-col gap-0.5 border border-white/5 bg-white/[0.025] px-3 py-2 rounded-lg">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">{l}</span>
                    <span className="font-mono text-sm font-bold" style={{ color:activeColor, transition:"color 0.6s" }}>{v}</span>
                  </div>
                ))}
              </motion.div>

              {/* Buttons */}
              <motion.div variants={{ hidden:{opacity:0,y:20}, visible:{opacity:1,y:0} }} className="flex flex-wrap gap-3 mb-10">
                <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                  className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] border"
                  style={{ backgroundColor:`${activeColor}15`, borderColor:`${activeColor}45`, color:activeColor }}>
                  <Activity size={12} /> Initialize Core
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
                <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] border border-white/[0.08] bg-white/[0.03] text-white/45 hover:text-white/75 transition-all">
                  <Github size={12} /> Source Code
                </motion.button>
              </motion.div>

              {/* Dot nav */}
              <motion.div variants={{ hidden:{opacity:0}, visible:{opacity:1} }} className="flex items-center gap-2">
                {nodes.map((node, i) => (
                  <button key={i} onClick={() => setActiveNode(i)}
                    className="relative h-[3px] rounded-full overflow-hidden bg-white/8 cursor-pointer transition-all"
                    style={{ width: activeNode === i ? "24px" : "16px" }}>
                    {activeNode === i && (
                      <motion.span className="absolute inset-0 rounded-full" style={{ backgroundColor:node.color }} layoutId="activeDot" />
                    )}
                  </button>
                ))}
                <span className="ml-2 font-mono text-[9px] text-white/18 tracking-[0.3em] uppercase">
                  {String(activeNode+1).padStart(2,"0")} / 06
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div style={{ y: rightY }}>
            <IsoDiagram activeNode={activeNode} activeColor={activeColor} tick={tick} />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
        <motion.div animate={{ y:[0,6,0] }} transition={{ duration:1.6, repeat:Infinity, ease:"easeInOut" }}>
          <ArrowDown size={14} className="text-white/20" />
        </motion.div>
      </motion.div>

      {/* Bottom node bar */}
      <div className="relative z-20 border-t border-white/[0.05] px-8 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-5 flex-wrap">
          {nodes.map((node, i) => (
            <button key={i} onClick={() => setActiveNode(i)} className="flex items-center gap-1.5 cursor-pointer">
              <motion.div className="w-1 h-1 rounded-full" style={{ backgroundColor:node.color }}
                animate={{ opacity:activeNode===i?1:0.22, scale:activeNode===i?1.6:1 }} transition={{ duration:0.3 }} />
              <span className="font-mono text-[8.5px] uppercase tracking-widest hidden sm:block transition-colors"
                style={{ color:activeNode===i ? node.color : "rgba(255,255,255,0.18)" }}>
                {node.label}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 font-mono text-[8.5px] text-white/18 tracking-[0.2em] uppercase">
          <motion.div className="w-1 h-1 rounded-full bg-white/20"
            animate={{ opacity:[0.2,0.9,0.2] }} transition={{ duration:2, repeat:Infinity }} />
          {active.label}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — FEATURES





// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — METRICS
// ─────────────────────────────────────────────────────────────────────────────



// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeNode, setActiveNode] = useState(0);
  const [tick, setTick] = useState(0);

  // ── Lenis setup ──────────────────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
    });

    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // ── Node cycling ─────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      setActiveNode(p => (p + 1) % nodes.length);
      setTick(p => p + 1);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const activeColor = nodes[activeNode].color;

  return (
    <div className="bg-[#000000] text-white" style={{ fontFamily:"'IBM Plex Mono',monospace" }}>
      <SectionHero
        activeNode={activeNode}
        activeColor={activeColor}
        tick={tick}
        setActiveNode={setActiveNode}
      />
      
    </div>
  );
}