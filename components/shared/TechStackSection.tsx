/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Code2, Zap, Database, ArrowUpRight, Gamepad2, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"; // cn utils function olduğunu varsayıyorum

// ─── YARDIMCI BİLEŞENLER (Miransas Siberpunk Modifikasyonu) ───

const Beam = ({ d, color, delay }: { d: string; color: string; delay: number }) => (
  <g>
    {/* Arka plan sönük kablo izi */}
    <path d={d} className="stroke-white/5" strokeWidth="2" fill="none" strokeLinecap="round" />
    
    {/* Akan Enerji (Işık) */}
    <motion.path
      d={d}
      stroke={color}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 0.6, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 2.2, delay, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
      style={{ filter: `drop-shadow(0 0 8px ${color})` }}
    />
    
    {/* Lazerin Ucundaki Veri Paketi (Parlayan Nokta) */}
    <motion.circle
      r="4"
      fill={color}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.2, delay, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
      style={{
        offsetPath: `path("${d}")`,
        animation: `travel-${delay.toString().replace(".", "")} 2.2s ${delay}s ease-in-out infinite`,
        filter: `drop-shadow(0 0 10px ${color})`,
      }}
    />
    <style>{`
      @keyframes travel-${delay.toString().replace(".", "")} {
        0%   { offset-distance: 0%; opacity: 0; }
        15%  { opacity: 1; }
        85%  { opacity: 1; }
        100% { offset-distance: 100%; opacity: 0; }
      }
    `}</style>
  </g>
);

const BEAM_PATHS = [
  { d: "M 450 50 C 450 110, 155 110, 155 165", color: "#FFFFFF", delay: 0 },       // UI - White
  { d: "M 450 50 L 450 165",                   color: "#8CFF2E", delay: 0.75 },    // Systems - Neon Green
  { d: "M 450 50 C 450 110, 745 110, 745 165", color: "#EF4444", delay: 1.5 },     // Engine - Blood Red
];

const CircuitBeams = () => (
  <svg
    viewBox="0 0 900 220"
    className="absolute top-0 left-0 w-full h-[220px] pointer-events-none overflow-visible z-[6]"
    preserveAspectRatio="xMidYMid meet"
  >
    {BEAM_PATHS.map((b, i) => (
      <Beam key={i} d={b.d} color={b.color} delay={b.delay} />
    ))}
  </svg>
);

const Chip = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col items-center relative z-10 mt-[1px]"
  >
    {/* Üst Pinler */}
    <div className="flex gap-2 mb-[-4px]">
      {[...Array(6)].map((_, i) => (
        <motion.div key={`top-${i}`}
          className="w-1.5 h-4 rounded-t-sm bg-[#111] border-x border-t border-white/10"
          animate={{ backgroundColor: ["#111", "#8CFF2E40", "#111"] }}
          transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
    
    {/* Çekirdek (Core) */}
    <div className="bg-[#050505] border border-white/10 rounded-lg px-8 py-4 relative shadow-[0_0_50px_rgba(140,255,46,0.1)]">
      {/* Yan Bağlantı Noktaları */}
      {[0, 1].map(i => (
        <div key={`l-${i}`} className="absolute -left-3 w-3 h-[2px] bg-white/20 rounded-full" style={{ top: `${35 + i * 30}%` }} />
      ))}
      {[0, 1].map(i => (
        <div key={`r-${i}`} className="absolute -right-3 w-3 h-[2px] bg-white/20 rounded-full" style={{ top: `${35 + i * 30}%` }} />
      ))}
      
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CFF2E] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8CFF2E]"></span>
        </span>
        <span className="text-white/80 text-[11px] font-bold tracking-[0.3em] font-mono uppercase">
          Core_Router_v4
        </span>
      </div>
    </div>

    {/* Alt Pinler */}
    <div className="flex gap-2 mt-[-4px]">
      {[...Array(6)].map((_, i) => (
        <motion.div key={`bot-${i}`}
          className="w-1.5 h-4 rounded-b-sm bg-[#111] border-x border-b border-white/10"
          animate={{ backgroundColor: ["#111", "#8CFF2E40", "#111"] }}
          transition={{ duration: 2, delay: i * 0.15 + 0.5, repeat: Infinity }}
        />
      ))}
    </div>
  </motion.div>
);

const BorderBeam = ({ color, active, duration = 1.8 }: { color: string; active: boolean; duration?: number }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-[2]">
      <style>{`
        @keyframes beam-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div 
        className="absolute inset-[-10px] rounded-2xl opacity-80"
        style={{
          background: `conic-gradient(from 0deg, transparent 280deg, ${color} 340deg, white 350deg, ${color} 360deg)`,
          animation: `beam-spin ${duration}s linear infinite`,
        }} 
      />
      <div className="absolute inset-[1.5px] rounded-2xl bg-[#0a0a0a]" />
    </div>
  );
};


// ─── İÇERİK VERİLERİ (Miransas Teması) ───
const CARDS = [
  {
    icon: <Code2 className="text-white" size={24} />,
    title: "UI Architecture",
    accent: "#FFFFFF", // Saf Mantık / Beyaz
    glow: "rgba(255,255,255,0.15)",
    desc: "Crafting high-performance, SEO-critical digital experiences. Engineered with Next.js 15 and React Server Components for zero-latency rendering.",
    link: "/projects", 
  },
  {
    icon: <Activity className="text-[#050505]" size={24} />,
    iconBg: "bg-[#8CFF2E]", // Neon Yeşil vurgu
    title: "Systems & Net",
    accent: "#8CFF2E", // Altyapı / Neon Yeşil
    glow: "rgba(140,255,46,0.15)",
    desc: "Low-level optimization powered by Rust and Go. Driving memory-safe tunneling protocols like binboi and custom macOS VPN solutions.",
    link: "/projects",
  },
  {
    icon: <Gamepad2 className="text-[#EF4444]" size={24} />,
    title: "Game Engines",
    accent: "#EF4444", // Kabuslar / Kan Kırmızısı
    glow: "rgba(239,68,68,0.15)",
    desc: "Propelling the Lost Signal universe under Sadpera Studio. Seamlessly integrating complex physics logic with scalable distributed nodes.",
    link: "/games", 
  },
];


const Card = ({ card, index, hovered, setHovered, beamActive }: any) => {
  const active = hovered === index;
  const router = useRouter(); 

  const handleCardClick = () => {
    if (card.link) router.push(card.link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
      onHoverStart={() => setHovered(index)}
      onHoverEnd={() => setHovered(1)}
      onClick={handleCardClick} 
      className={cn(
        "flex-1 min-w-[320px] lg:min-w-[380px] max-w-[480px] p-8 rounded-2xl cursor-pointer relative overflow-hidden transition-all duration-300 group", 
        "bg-[#0a0a0a] border",
        active || beamActive ? "border-transparent" : "border-white/10",
        active && "shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-10 scale-[1.02]",
        "selection:bg-[#8CFF2E] selection:text-black" // Seçim rengi düzeltmesi
      )}
      style={{ borderColor: active || beamActive ? card.accent : undefined }}
    >
      <BorderBeam color={card.accent} active={beamActive || active} duration={beamActive ? 1.5 : 2.5} />

      <AnimatePresence>
        {active && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-[3]"
            style={{ background: `radial-gradient(circle at 50% 0%, ${card.glow} 0%, transparent 80%)` }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-[4]">
        {/* İkon Kutusu */}
        <div className={cn(
          "mb-8 p-3 rounded-xl w-fit border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-lg",
          card.iconBg || "bg-white/5"
        )}>
            {card.icon}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-white text-xl font-black tracking-tight uppercase font-sans">{card.title}</span>
          <motion.div 
            animate={{ x: active ? 4 : 0, y: active ? -4 : 0 }} 
            className="text-white/30 transition-colors group-hover:text-white" 
          >
            <ArrowUpRight size={22} />
          </motion.div>
        </div>
        
        <p className="text-white/40 text-sm leading-relaxed font-light">
            {card.desc}
        </p>
      </div>
    </motion.div>
  );
};


function useBeamCycle() {
  const [active, setActive] = useState([false, false, false]);
  useEffect(() => {
    const CYCLE = 3400;
    const OFFSETS = [0, 750, 1500];
    const timers: any[] = [];
    const schedule = () => {
      OFFSETS.forEach((offset, i) => {
        const arrival = offset + 1400; 
        timers.push(setTimeout(() => setActive(p => { const n=[...p]; n[i]=true; return n; }), arrival % CYCLE));
        timers.push(setTimeout(() => setActive(p => { const n=[...p]; n[i]=false; return n; }), (arrival + 1600) % CYCLE));
      });
    };
    schedule();
    const interval = setInterval(schedule, CYCLE);
    return () => { timers.forEach(clearTimeout); clearInterval(interval); };
  }, []);
  return active;
}

export default function TechStackSections() {
  // Başlangıçta ortadaki kartı (Sistemler) aktif yapıyoruz
  const [hovered, setHovered] = useState(1);
  const beamActive = useBeamCycle();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="min-h-screen bg-[#050505] flex flex-col items-center justify-center py-32 px-6 relative overflow-hidden font-sans">
      {/* İnce Siber Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} 
      />

      {/* Başlık Alanı */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{duration: 0.8, ease: "easeOut"}}
        className="text-center mb-24 z-10"
      >
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-8 h-[1px] bg-[#8CFF2E]" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#8CFF2E]">Core Architecture</span>
          <span className="w-8 h-[1px] bg-[#8CFF2E]" />
        </div>
        
        <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85]">
          Engineered for <br />
          <span className="text-transparent stroke-text" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
            Zero Latency.
          </span>
        </h2>
      </motion.div>

      {/* İçerik ve Çip Yapısı */}
      <div className="relative w-full flex flex-col items-center max-w-[1400px] mx-auto">
        <Chip />
        
        <div className="relative w-full h-[160px] md:h-[180px] mt-[-56px] z-[5]">
          <CircuitBeams />
        </div>
        
        {/* Kartlar */}
        <div className="flex flex-col lg:flex-row justify-center gap-6 w-full relative z-20">
          {CARDS.map((card, i) => (
            <Card key={i} card={card} index={i} hovered={hovered} setHovered={setHovered} beamActive={beamActive[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}