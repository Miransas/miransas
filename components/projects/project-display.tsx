/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Cpu } from "lucide-react";
import { AnimatedBadge } from "../shared/animated-badge";
// BADGE IMPORTU BURADA

export function ProjectDisplay({ project, index }: { project: any; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
    >
      {/* 1. GÖRSEL / KART ALANI */}
      <div className="flex-1 w-full group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative aspect-[16/10] bg-zinc-900 border border-white/5 rounded-[2.5rem] overflow-hidden">
          {project.coverImage ? (
             // grayscale sınıfını ekledik, üzerine gelince renklenmesi için
            <img src={project.coverImage} className="w-full h-full object-cover  group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-950">
               <Cpu size={80} className="text-zinc-800 animate-pulse" />
            </div>
          )}
        </div>
        {/* İndeks Numarası */}
        <span className="absolute -top-6 -left-6 text-8xl font-black text-white/5 italic pointer-events-none">0{index + 1}</span>
      </div>

      {/* 2. BİLGİ ALANI */}
      <div className="flex-1 space-y-6">
        
        {/* ETİKET (TAG) VE BADGE ALANI */}
        <div className="flex items-center gap-4">
          {/* Eğer proje binboi ise animasyonlu badge göster, değilse normal tag göster */}
          {project.slug?.includes("binboi") ? (
            <AnimatedBadge text="LAUNCHING SOON" color="purple" />
          ) : (
            <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-purple-400">
              {project.tag}
            </span>
          )}
          
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 italic">
            {project.readTime} MIN READ
          </span>
        </div>

        <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9] text-white">
          {project.title}
        </h2>

        {/* ─── HTML RENDER HATASI BURADA ÇÖZÜLÜYOR ─── */}
        {/* prose sınıflarındaki marginleri (my-0) sıfırladık ki kartı şişirmesin */}
        <div 
          className="text-lg text-zinc-400 font-light leading-relaxed line-clamp-3 prose prose-invert max-w-none prose-p:my-0 prose-headings:my-0 prose-ul:my-0"
          dangerouslySetInnerHTML={{ __html: project.excerpt || project.content || "" }}
        />

        {/* BUTONLAR */}
        <div className="pt-6 flex items-center gap-4">
          <a 
            href={`/projects/${project.slug}`}
            className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all active:scale-95"
          >
            Read <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          
          <div className="p-4 bg-zinc-900 border border-white/5 rounded-2xl text-zinc-500 hover:text-white transition-colors cursor-pointer">
            <Code2 size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}