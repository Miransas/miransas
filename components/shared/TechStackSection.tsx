/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Code2, Zap, Database, ArrowUpRight, Gamepad2 } from "lucide-react";
import { useRouter } from "next/navigation"; // ─── Next.js Router EKLENDİ ───

// ... (RustBadge, ArrowIcon, Beam, CircuitBeams, Chip, BorderBeam bileşenleri aynı kalıyor) ...
const RustBadge = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" className="inline align-middle mx-[2px] mb-[3px]">
    <circle cx="8" cy="8" r="7" stroke="#CE422B" strokeWidth="1.2" fill="none" />
    <text x="8" y="11.5" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#CE422B">R</text>
  </svg>
);

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" className="inline ml-1 align-middle text-neutral-600">
    <path d="M3 11L11 3M11 3H6M11 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Beam = ({ d, color, delay }: { d: string; color: string; delay: number }) => (
  <g>
    <path d={d} className="stroke-white/5" strokeWidth="1" fill="none" strokeLinecap="round" />
    <motion.path
      d={d}
      stroke={color}
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 0.5, 0], opacity: [0, 0.8, 0] }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
    />
    <motion.circle
      r="2.5"
      fill={color}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
      style={{
        offsetPath: `path("${d}")`,
        animation: `travel-${delay.toString().replace(".", "")} 2s ${delay}s ease-in-out infinite`,
        filter: `drop-shadow(0 0 6px ${color})`,
      }}
    />
    <style>{`
      @keyframes travel-${delay.toString().replace(".", "")} {
        0%   { offset-distance: 0%; opacity: 0; }
        10%  { opacity: 1; }
        85%  { opacity: 1; }
        100% { offset-distance: 100%; opacity: 0; }
      }
    `}</style>
  </g>
);

const BEAM_PATHS = [
  { d: "M 450 50 C 450 110, 155 110, 155 165", color: "#3B82F6", delay: 0 }, 
  { d: "M 450 50 L 450 165",                   color: "#FF4F00", delay: 0.75 }, 
  { d: "M 450 50 C 450 110, 745 110, 745 165", color: "#EAB308", delay: 1.5 }, 
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
    <div className="flex gap-1.5 mb-[-3px]">
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          className="w-1 h-3.5 rounded-sm bg-neutral-800 border border-neutral-700/50"
          animate={{ backgroundColor: ["#262626", "#404040", "#262626"] }}
          transition={{ duration: 2.5, delay: i * 0.18, repeat: Infinity }}
        />
      ))}
    </div>
    <div className="bg-gradient-to-br from-neutral-800 to-black border border-neutral-700/80 rounded-xl px-10 py-3 relative shadow-[0_8px_40px_rgba(0,0,0,0.7)]">
      {[0, 1].map(i => (
        <div key={i} className="absolute -left-3 w-3 h-[2px] bg-neutral-800 rounded-full" style={{ top: `${35 + i * 30}%` }} />
      ))}
      {[0, 1].map(i => (
        <div key={i} className="absolute -right-3 w-3 h-[2px] bg-neutral-800 rounded-full" style={{ top: `${35 + i * 30}%` }} />
      ))}
      <span className="text-neutral-300 text-sm font-medium tracking-[0.2em] font-mono uppercase selection:bg-[#FF4F00]">
        Miransas Core
      </span>
    </div>
    <div className="flex gap-1.5 mt-[-3px]">
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          className="w-1 h-3.5 rounded-sm bg-neutral-800 border border-neutral-700/50"
          animate={{ backgroundColor: ["#262626", "#404040", "#262626"] }}
          transition={{ duration: 2.5, delay: i * 0.18 + 0.6, repeat: Infinity }}
        />
      ))}
    </div>
  </motion.div>
);

const BorderBeam = ({ color, active, duration = 1.8 }: { color: string; active: boolean; duration?: number }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 rounded-[16px] overflow-hidden pointer-events-none z-[2]">
      <style>{`
        @keyframes beam-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div 
        className="absolute inset-[-4px] rounded-[18px]"
        style={{
          background: `conic-gradient(from 0deg, transparent 300deg, ${color} 340deg, white 350deg, ${color} 360deg)`,
          animation: `beam-spin ${duration}s linear infinite`,
        }} 
      />
      <div className="absolute inset-[1.5px] rounded-[15px] bg-neutral-950" />
    </div>
  );
};


const CARDS = [
  {
    icon: <Code2 className="text-blue-500" size={30} />,
    title: "UI Engineering",
    accent: "#3B82F6",
    glow: "rgba(59,130,246,0.18)",
    desc: <>High-performance, SEO-critical studio interfaces. Engineered using Next.js and React Server Components for maximum efficiency.</>,
    link: "/projects", // ─── Linkleri temiz tutmakta fayda var
  },
  {
    icon: <Zap className="text-[#FF4F00]" size={30} />,
    title: "Systems Architecture",
    accent: "#FF4F00",
    glow: "rgba(255,79,0,0.22)",
    desc: <>Low-level optimization powered by **Rust** <RustBadge /> and **Go**. driving memory-safe macOS VPN solutions.</>,
    link: "/projects",
  },
  {
    icon: <Gamepad2 className="text-yellow-500" size={30} />,
    title: "Game Engines",
    accent: "#EAB308",
    glow: "rgba(234,179,8,0.18)",
    desc: <>Propelling the **Lost Signal** universe. Typed data handling via Drizzle ORM interfacing with scalable distributed PostgreSQL nodes.</>,
    link: "/games", // ─── Oyunlar sayfasına yönlendirir
  },
];


const Card = ({ card, index, hovered, setHovered, beamActive }: any) => {
  const active = hovered === index;
  const router = useRouter(); // ─── Router'ı başlattık ───

  // ─── Tıklama İşlevi (Click Handler) EKLENDİ ───
  const handleCardClick = () => {
    if (card.link) {
      router.push(card.link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
      onHoverStart={() => setHovered(index)}
      onHoverEnd={() => setHovered(1)}
      onClick={handleCardClick} // ─── onClick eventi karta eklendi ───
      className={cn(
        "flex-1 min-w-[380px] max-w-[480px] p-12 rounded-2xl cursor-pointer relative overflow-hidden transition-all duration-300 group", // ─── group eklendi (iç ikon hoverları için)
        "bg-gradient-to-br from-neutral-900 to-black border-1.5",
        active || beamActive ? "border-transparent" : "border-neutral-800",
        active && "shadow-[0_20px_60px_rgba(0,0,0,0.7)]",
        "selection:bg-[#FF4F00]/30"
      )}
      style={{ borderColor: active || beamActive ? card.accent : undefined }}
    >
      <BorderBeam color={card.accent} active={beamActive || active} duration={beamActive ? 1.5 : 2.5} />

      <AnimatePresence>
        {active && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-[3]"
            style={{ background: `radial-gradient(circle at 50% 0%, ${card.glow} 0%, transparent 70%)` }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-[4]">
        <div className="mb-6 drop-shadow-[0_0_8px_currentColor]">{card.icon}</div>
        <div className="flex items-center mb-2">
          <span className="text-white text-lg font-bold tracking-tight uppercase font-mono">{card.title}</span>
          <motion.span 
            animate={{ x: active ? 4 : 0, y: active ? -4 : 0 }} // ─── Ok animasyonu daha belirgin ───
            className="text-neutral-600 transition-colors group-hover:text-white" // ─── Hover olunca ok rengi beyazlar ───
          >
            <ArrowUpRight size={18} />
          </motion.span>
        </div>
        <p className="text-neutral-500 text-sm leading-relaxed font-light">{card.desc}</p>
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
  const [hovered, setHovered] = useState(1);
  const beamActive = useBeamCycle();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-[#FF4F00]/20 selection:text-white">
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(#404040 1px, transparent 1px), linear-gradient(90deg, #404040 1px, transparent 1px)`, backgroundSize: "50px 50px" }} 
      />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{duration: 0.6}}
        className="text-white text-3xl md:text-4xl font-black text-center mb-20 tracking-tighter uppercase z-10 font-mono leading-none"
      >
        Built on a foundation of fast, <br />
        <span className="text-neutral-700 decoration-[#FF4F00] decoration-2 underline underline-offset-8">production-grade</span> tooling.
      </motion.h2>

      <div className="relative w-full flex flex-col items-center">
        <Chip />
        
        <div className="relative w-full h-[180px] mt-[-56px] z-[5]">
          <CircuitBeams />
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 w-full relative z-20">
          {CARDS.map((card, i) => (
            <Card key={i} card={card} index={i} hovered={hovered} setHovered={setHovered} beamActive={beamActive[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}