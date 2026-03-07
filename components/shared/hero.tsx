/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Code2, Database, Shield, Zap, Gamepad2, ArrowRight, Github, FolderGit2 } from "lucide-react";

// --- KUSURSUZ İZOMETRİK MOTOR (Milimetrik Hesaplama) ---
const pt = (x: number, y: number, z: number = 0) => {
  const ISO_X = 0.866025; // cos(30)
  const ISO_Y = 0.5;      // sin(30)
  return `${(x - y) * ISO_X * 1.1},${((x + y) * ISO_Y - z) * 1.1}`;
};

const poly = (...pts: [number, number, number][]) => pts.map(p => pt(...p)).join(' ');

// --- İZOMETRİK STATİK BLOK ---
const IsoBlock = ({ 
  x, y, z, w, h, d, 
  topFill = "#161616", leftFill = "#0D0D0D", rightFill = "#050505", edge = "#2A2A2A", opacity = 1
}: any) => (
  <g opacity={opacity}>
    <polygon points={poly([x, y+h, z], [x+w, y+h, z], [x+w, y+h, z+d], [x, y+h, z+d])} fill={leftFill} stroke={edge} strokeWidth="0.5" strokeLinejoin="round" />
    <polygon points={poly([x+w, y, z], [x+w, y+h, z], [x+w, y+h, z+d], [x+w, y, z+d])} fill={rightFill} stroke={edge} strokeWidth="0.5" strokeLinejoin="round" />
    <polygon points={poly([x, y, z+d], [x+w, y, z+d], [x+w, y+h, z+d], [x, y+h, z+d])} fill={topFill} stroke={edge} strokeWidth="0.5" strokeLinejoin="round" />
  </g>
);

export default function Hero() {
  const S = 180; 
  const C = S / 2; // Merkez noktası (90)

  // --- MIRANSAS VİZYONU & KOORDİNATLAR ---
  const nodes = [
    { id: 0, label: "AI MESH", color: "#EAB308", icon: BrainCircuit, x: -60, y: C, z: 220, path: `M ${pt(-60, C, 220)} L ${pt(-60, C, 160)} L ${pt(C-20, C, 160)}` },
    { id: 1, label: "RUST TUNNEL", color: "#3B82F6", icon: Shield, x: 30, y: -40, z: 240, path: `M ${pt(30, -40, 240)} L ${pt(30, -40, 160)} L ${pt(30, C, 160)} L ${pt(C-20, C, 160)}` },
    { id: 2, label: "DATA LAYER", color: "#10B981", icon: Database, x: 150, y: -40, z: 230, path: `M ${pt(150, -40, 230)} L ${pt(150, -40, 160)} L ${pt(150, C, 160)} L ${pt(C+20, C, 160)}` },
    { id: 3, label: "PROXY CORE", color: "#A855F7", icon: Zap, x: S+60, y: C, z: 220, path: `M ${pt(S+60, C, 220)} L ${pt(S+60, C, 160)} L ${pt(S+60, C, 160)} L ${pt(C+20, C, 160)}` },
    { id: 4, label: "GAME ENGINE", color: "#EF4444", icon: Gamepad2, x: 150, y: S+40, z: 210, path: `M ${pt(150, S+40, 210)} L ${pt(150, S+40, 160)} L ${pt(150, C, 160)} L ${pt(C+20, C, 160)}` },
    { id: 5, label: "NEXT.JS UI", color: "#06B6D4", icon: Code2, x: 30, y: S+40, z: 200, path: `M ${pt(30, S+40, 200)} L ${pt(30, S+40, 160)} L ${pt(30, C, 160)} L ${pt(C-20, C, 160)}` },
  ];

  // --- KUSURSUZ DÖNGÜ YÖNETİMİ ---
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    // Tam 4.0 saniyede bir tetiklenir. Tüm animasyonlar 3.9s'de sıfırlanmış olur.
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, [nodes.length]);

  const activeColor = nodes[activeNode].color;

  return (
    <section className="relative min-h-screen bg-[#050505] text-white flex items-center py-20 overflow-hidden font-sans selection:bg-[#FF4F00]/30">
      
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        
        {/* ========================================================= */}
        {/* SOL TARAF: İNGİLİZCE METİNLER (KURUMSAL VE KARANLIK VİZYON) */}
        {/* ========================================================= */}
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }} className="max-w-xl z-20">
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]" style={{ backgroundColor: activeColor, color: activeColor }} />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400">System Architecture</span>
          </motion.div>

          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            className="text-5xl md:text-6xl lg:text-[72px] font-black uppercase tracking-tighter leading-[0.95] mb-6"
          >
            Infrastructure is not <span className="text-white/30 italic">linear</span>.<br />
            Neither are we.
          </motion.h1>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }} 
            className="text-base text-gray-400 mb-12 leading-relaxed max-w-lg font-light"
          >
            Engineered for high-stakes production. A 6-layer symmetric architecture featuring memory-safe macOS tunnels, autonomous AI meshes, and centralized telemetry routing.
          </motion.p>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-wrap gap-4">
            <button 
              className="group flex items-center gap-2 text-white px-7 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95 border border-white/10"
              style={{ backgroundColor: `${activeColor}20`, color: activeColor }}
            >
              Initialize Core <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 bg-[#111] hover:bg-[#1A1A1A] border border-white/5 text-white px-7 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors active:scale-95">
              <Github size={16} /> Source
            </button>
          </motion.div>
        </motion.div>

        {/* ========================================================= */}
        {/* SAĞ TARAF: YAŞAYAN VE MERKEZÎ DEPOLAMA İZOMETRİK MOTORU     */}
        {/* ========================================================= */}
        <div className="relative w-full h-[700px] flex items-center justify-center pointer-events-none">
          
          {/* Dinamik Merkez Işıltı (Glow) */}
          <motion.div 
            className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20" 
            animate={{ backgroundColor: activeColor }}
            transition={{ duration: 0.8 }}
          />
          
          <svg viewBox="-350 -350 700 750" className="w-[140%] h-[140%] max-w-[900px] overflow-visible">
            <motion.g initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }}>
              
              {/* --- KATMAN 1: ANA BLOK (Z = 0) --- */}
              <g>
                <IsoBlock x={0} y={0} z={0} w={S} h={S} d={60} topFill="#141414" leftFill="#0A0A0A" rightFill="#050505" edge="#1A1A1A" />
              </g>

              {/* Katmanları Birleştiren Dikey Sütunlar 1->2 */}
              <path d={`M ${pt(0,0,60)} L ${pt(0,0,100)} M ${pt(S,0,60)} L ${pt(S,0,100)} M ${pt(0,S,60)} L ${pt(0,S,100)} M ${pt(S,S,60)} L ${pt(S,S,100)}`} stroke="#222" strokeWidth="1" strokeDasharray="3 3" />

              {/* --- KATMAN 2: Orta Tel Kafes (Z = 100) --- */}
              <g>
                <polygon points={poly([0,0,100], [S,0,100], [S,S,100], [0,S,100])} fill="#111" fillOpacity="0.4" stroke="#333" strokeWidth="1" />
              </g>

              {/* Katmanları Birleştiren Dikey Sütunlar 2->3 */}
              <path d={`M ${pt(0,0,100)} L ${pt(0,0,140)} M ${pt(S,0,100)} L ${pt(S,0,140)} M ${pt(0,S,100)} L ${pt(0,S,140)} M ${pt(S,S,100)} L ${pt(S,S,140)}`} stroke="#222" strokeWidth="1" strokeDasharray="3 3" />

              {/* --- KATMAN 3: Üst Grid ve CORE MATRİS (Z = 140) --- */}
              <g>
                <IsoBlock x={0} y={0} z={140} w={S} h={S} d={20} topFill="#161616" leftFill="#111" rightFill="#0A0A0A" edge="#222" opacity={0.9} />
                
                {/* Üst Grid Çizgileri */}
                {[1, 2, 3, 4, 5].map(i => (
                  <g key={`grid-${i}`}>
                    <path d={`M ${pt(i*(S/6), 0, 160)} L ${pt(i*(S/6), S, 160)}`} stroke="#2A2A2A" strokeWidth="1" />
                    <path d={`M ${pt(0, i*(S/6), 160)} L ${pt(S, i*(S/6), 160)}`} stroke="#2A2A2A" strokeWidth="1" />
                  </g>
                ))}

                {/* --- 6 ADET SABİT "KABLO/RAY" (Tesisat) --- */}
                {/* Lazerler bu rayların üzerinde akacak, böylece havada uçuyor hissi kaybolacak */}
                {nodes.map(node => (
                  <path key={`wire-${node.id}`} d={node.path} fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="miter" />
                ))}

                {/* Şelale Rayları (Tesisat) */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <g key={`wire-waterfall-${i}`}>
                    <path d={`M ${pt(i * (S / 11), S, 60)} L ${pt(i * (S / 11), S, 0)}`} stroke="#1A1A1A" strokeWidth="2" />
                    <path d={`M ${pt(S, i * (S / 11), 60)} L ${pt(S, i * (S / 11), 0)}`} stroke="#1A1A1A" strokeWidth="2" />
                  </g>
                ))}

                {/* Ana Hat Rayı (Terminal Hattı) */}
                <path d={`M ${pt(S+50, S+50, 20)} L ${pt(S+50, S+50, 100)} L ${pt(S+150, S+150, 100)} L ${pt(S+150, S+150, 140)}`} fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* ============================================================== */}
                {/* === TETİKLENEN KUSURSUZ ANİMASYONLAR (TİTREMESİZ TIMELINE) === */}
                {/* ============================================================== */}
                <AnimatePresence mode="wait">
                  <g key={activeNode}>
                    
                    {/* 1. Lazer Atışı (0.0s - 1.5s) */}
                    <motion.path 
                      d={nodes[activeNode].path} 
                      fill="none" stroke={activeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="miter"
                      initial={{ pathLength: 0, opacity: 0 }}
                      // Lazer uzar, merkeze vurur ve yavaşça silinir (Opaklık 1.5s'de 0 olur)
                      animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, times: [0, 0.7, 1], ease: "easeInOut" }}
                      style={{ filter: `drop-shadow(0 0 6px ${activeColor})` }}
                    />

                    {/* 2. CORE GRID: MERKEZ ALTI 6X6 MATRİS (1.5s - 2.5s) */}
                    {/* Sadece lazer merkeze çarpınca (1.5s) bir dalga (ripple) yaratır ve söner */}
                    <g>
                      {Array.from({ length: 6 }).map((_, row) => 
                        Array.from({ length: 6 }).map((_, col) => {
                          const cellX = (C-20) + (col * (40/6));
                          const cellY = (C-20) + (row * (40/6));
                          const cellSize = 40/6;
                          // Merkezden dışa doğru dalga hesaplaması
                          const delay = 1.5 + (Math.sqrt(Math.pow(col-2.5, 2) + Math.pow(row-2.5, 2)) * 0.05);

                          return (
                            <motion.polygon
                              key={`coregrid-${row}-${col}`} 
                              points={poly([cellX, cellY, 160], [cellX+cellSize, cellY, 160], [cellX+cellSize, cellY+cellSize, 160], [cellX, cellY+cellSize, 160])}
                              stroke="#222" strokeWidth="0.5"
                              initial={{ fill: "#111" }}
                              // 1 saniye içinde parlar ve tekrar karanlığa gömülür
                              animate={{ fill: ["#111", `${activeColor}60`, "#111"] }}
                              transition={{ duration: 1, delay: delay, ease: "easeInOut" }}
                            />
                          );
                        })
                      )}
                    </g>

                    {/* 3. Şelale / Waterfall (1.5s - 3.0s) */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.path
                        key={`w-left-${i}`}
                        d={`M ${pt(i * (S / 11), S, 60)} L ${pt(i * (S / 11), S, 0)}`}
                        stroke={activeColor} strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        // Aşağı akar ve 3.0s'de tamamen silinir
                        animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 1.5 + (i * 0.03) }}
                      />
                    ))}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.path
                        key={`w-right-${i}`}
                        d={`M ${pt(S, i * (S / 11), 60)} L ${pt(S, i * (S / 11), 0)}`}
                        stroke={activeColor} strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 1.5 + (i * 0.03) }}
                      />
                    ))}

                    {/* 4. Ana Terminale Giden Çizgi (2.5s - 3.9s) */}
                    {/* Enerji havuzdan Miransas terminaline akar. Tam 3.9s'de yok olur ki 4.0s'de temiz sayfa açılsın */}
                    <motion.path 
                      d={`M ${pt(S+50, S+50, 20)} L ${pt(S+50, S+50, 100)} L ${pt(S+150, S+150, 100)} L ${pt(S+150, S+150, 140)}`} 
                      fill="none" stroke={activeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }} 
                      transition={{ duration: 1.4, ease: "easeOut", delay: 2.5 }}
                      style={{ filter: `drop-shadow(0 0 6px ${activeColor})` }}
                    />

                  </g>
                </AnimatePresence>
                {/* ============================================================== */}
                
                {/* --- YAŞAYAN ANA ÇEKİRDEK KÜPÜ --- */}
                <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <motion.polygon points={poly([C-10, C-10, 175], [C+10, C-10, 175], [C+10, C+10, 175], [C-10, C+10, 175])} animate={{ fill: activeColor }} transition={{ duration: 0.5 }} opacity={0.9} />
                  <motion.polygon points={poly([C-10, C+10, 160], [C+10, C+10, 160], [C+10, C+10, 175], [C-10, C+10, 175])} animate={{ fill: activeColor }} transition={{ duration: 0.5 }} opacity={0.7} />
                  <motion.polygon points={poly([C+10, C-10, 160], [C+10, C+10, 160], [C+10, C+10, 175], [C+10, C-10, 175])} animate={{ fill: activeColor }} transition={{ duration: 0.5 }} opacity={0.5} />
                </motion.g>
              </g>

              {/* --- 6 ADET HAVADA SÜZÜLEN SİMETRİK MODÜL KUTUSU --- */}
              {nodes.map((node, index) => {
                const isActive = activeNode === index;
                const Icon = node.icon;
                return (
                  <motion.g key={`node-${node.id}`} animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}>
                    <IsoBlock x={node.x-15} y={node.y-15} z={node.z} w={30} h={30} d={10} topFill="#1A1A1A" leftFill="#111" rightFill="#0A0A0A" edge={isActive ? node.color : "#333"} />
                    <g transform={`translate(${pt(node.x, node.y, node.z + 10).split(',')[0]}, ${pt(node.x, node.y, node.z + 10).split(',')[1]})`}>
                      <g transform="scale(1, 0.577) rotate(-45)">
                        <Icon color={isActive ? node.color : "#555"} size={14} x="-7" y="-7" strokeWidth={isActive ? 2.5 : 1.5} />
                      </g>
                    </g>
                  </motion.g>
                );
              })}

              {/* Birleştirme Hub'ı (Statik Tesisat) */}
              <g>
                <IsoBlock x={S+40} y={S+40} z={0} w={20} h={20} d={20} topFill="#161616" leftFill="#0A0A0A" rightFill="#050505" edge="#222" />
                <path d={`M ${pt(S-20, S, 0)} L ${pt(S+50, S+50, 10)}`} stroke="#333" strokeWidth="1" strokeDasharray="2 2" />
                <path d={`M ${pt(S, S-20, 0)} L ${pt(S+50, S+50, 10)}`} stroke="#333" strokeWidth="1" strokeDasharray="2 2" />
              </g>

              {/* MERKEZÎ REPO TERMİNALİ (Miransas) */}
              <motion.g animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <IsoBlock x={S+130} y={S+130} z={140} w={40} h={40} d={25} topFill="#111" leftFill="#111" rightFill="#0A0A0A" edge={`${activeColor}40`} />
                <g transform={`translate(${pt(S+150, S+150, 165).split(',')[0]}, ${pt(S+150, S+150, 165).split(',')[1]})`}>
                  <g transform="scale(1, 0.577) rotate(-45)">
                    <FolderGit2 color={activeColor} size={18} x="-9" y="-9" strokeWidth={2.5} />
                    <text x="0" y="22" fill="#888" fontSize="8" fontWeight="bold" textAnchor="middle" className="font-mono tracking-widest">
                      MIRANSAS
                    </text>
                  </g>
                </g>
                <polygon points={poly([S+135, S+135, 165], [S+165, S+135, 165], [S+165, S+165, 165], [S+135, S+165, 165])} fill="#111" fillOpacity="0.3" stroke={`${activeColor}60`} strokeWidth="1.5" />
              </motion.g>

            </motion.g>
          </svg>
        </div>
      </div>
    </section>
  );
}