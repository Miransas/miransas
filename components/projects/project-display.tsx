/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Activity, Code2, Gamepad2, Mic, Shield, 
  Cpu, Github, ArrowRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- BORDER BEAM ---
const BorderBeam = ({ color = "#FF4F00", duration = 4 }: { color?: string; duration?: number }) => (
  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-10">
    <motion.div
      className="absolute w-[2px] h-[40%] blur-[2px]"
      style={{
        background: `linear-gradient(180deg, ${color} 0%, rgba(255,255,255,0.8) 50%, ${color} 100%)`,
        filter: `drop-shadow(0 0 8px ${color})`,
      }}
      animate={{ top: ["-40%", "100%", "100%", "-40%", "-40%"], left: ["0%", "0%", "100%", "100%", "0%"] }}
      transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// --- CATEGORY MAP ---
const TYPE_MAP: any = {
  "Systems Engineering": { color: "#3B82F6", icon: <Shield size={24} className="text-blue-500" /> },
  "Network Infrastructure": { color: "#A855F7", icon: <Activity size={24} className="text-purple-500" /> },
  "Artificial Intelligence": { color: "#F43F5E", icon: <Mic size={24} className="text-rose-500" /> },
  "Interactive IP": { color: "#EF4444", icon: <Gamepad2 size={24} className="text-red-500" /> },
  "default": { color: "#10B981", icon: <Code2 size={24} className="text-emerald-500" /> }
};

interface ProjectDisplayProps {
  project: any; // DB'den gelen post objesi
  index: number;
}

export function ProjectDisplay({ project, index }: ProjectDisplayProps) {
  // Tag'e göre ikon ve renk seç, bulamazsa default'u kullan
  const style = TYPE_MAP[project.tag] || TYPE_MAP["default"];
  
  // Zebra düzeni (bir sağda bir solda)
  const isEven = index % 2 !== 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className={cn(
        "flex flex-col lg:flex-row gap-12 lg:gap-20 items-center",
        isEven ? "lg:flex-row-reverse" : ""
      )}
    >
      {/* MOCKUP & KOD EKRANI (SOL/SAĞ) */}
      <div className="w-full lg:w-1/2 relative group">
        <div className="relative bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-6 shadow-2xl overflow-hidden min-h-[400px] flex flex-col">
          <BorderBeam color={style.color} />
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800/50 relative z-20">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-neutral-700" />
              <div className="w-3 h-3 rounded-full bg-neutral-700" />
              <div className="w-3 h-3 rounded-full bg-neutral-700" />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              <Cpu size={12} /> {project.slug}.sys
            </div>
          </div>

          <div className="flex-1 overflow-hidden relative z-20">
            <pre className="text-[11px] md:text-sm font-mono leading-loose text-neutral-400 whitespace-pre-wrap">
              <code 
                dangerouslySetInnerHTML={{
                  __html: project.content // Editörden gelen HTML kod bloğu
                    .replace(/(const|let|var|async|await|func|use|import|export|from|type|def|public|class|void|if)/g, `<span style="color: ${style.color}">$1</span>`)
                }} 
              />
            </pre>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800/50 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-neutral-500 relative z-20">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: style.color }} />
              Production Ready
            </span>
            <span>Miransas Node Online</span>
          </div>
        </div>
      </div>

      {/* PROJE DETAYLARI (SAĞ/SOL) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl">
            {style.icon}
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
            {project.tag}
            </span>
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6 text-white italic">
          {project.title}
        </h2>
        
        <p className="text-neutral-400 font-light leading-relaxed mb-8 text-sm md:text-base">
          {project.excerpt}
        </p>

        {/* Aksiyonlar */}
        <div className="flex items-center gap-4">
          <a href={`/projects/${project.slug}`} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white text-black px-6 py-3 rounded-lg hover:bg-neutral-200 transition-all active:scale-95">
            Sistemi İncele <ArrowRight size={14} />
          </a>
          <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-transparent border border-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/5 transition-all">
            <Github size={14} /> Source
          </a>
        </div>
    
    </motion.div>
  );
}