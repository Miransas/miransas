"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Instagram, Twitter, ArrowUpRight, Globe, Command } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    projects: [
      { name: "Worktio", href: "/projects/worktio" },
      { name: "Lost Signal", href: "/projects/lost-signal" },
      { name: "binboi", href: "/projects/binboi" },
    ],
    brands: [
    //   { name: "Soon", href: "#" },
    //   { name: "Soon", href: "#" },
    //   { name: "Velorsoft", href: "#" },
    ],
    social: [
      { name: "GitHub", href: "https://github.com/sardorazimov", icon: <Github size={16} /> },
      { name: "Instagram", href: "https://instagram.com/asardorazimov", icon: <Instagram size={16} /> },
      { name: "X / Twitter", href: "https://twitter.com/asardorazimov", icon: <Twitter size={16} /> },
    ],
  };

  return (
    <footer className="relative w-full bg-[#030303] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Arka Plan Glow Efekti */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          
          {/* MARKA BÖLÜMÜ */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5  flex items-center justify-center group-hover:border-purple-500/50 transition-all duration-500">
                <img src={"./logo/logo.png"}  alt="Miransas" className="text-white group-hover:text-purple-500 transition-colors"  />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">Miransas.</span>
                <p className="text-[10px] font-bold tracking-[0.4em] text-zinc-600 uppercase mt-1">Engineered Solutions</p>
              </div>
            </Link>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
              Software architecture, game development, and automation systems. 
            </p>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
               </div>
               <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest"></span>
            </div>
          </div>

          {/* LİNKLER - PROJELER */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Projects</h4>
            <ul className="space-y-4">
              {footerLinks.projects.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-tight">
                    {link.name} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-purple-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LİNKLER - MARKALAR */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Ekosistem</h4>
            <ul className="space-y-4">
              {/* {footerLinks.brands.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-tight">
                    {link.name}
                  </Link>
                </li>
              ))} */}
            </ul>
          </div>

          {/* SOSYAL MEDYA */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Sosyal</h4>
            <div className="grid grid-cols-1 gap-3">
              {footerLinks.social.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  target="_blank"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 group-hover:text-white transition-colors">{link.icon}</span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">{link.name}</span>
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-700 group-hover:text-purple-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ALT BANT */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">
            Miransas © {currentYear} — <span className="text-white hover:text-purple-500 transition-colors cursor-help"></span>
          </p>
          
          <div className="flex items-center gap-8">
             <Link href="/privacy" className="text-[9px] font-black text-zinc-600 hover:text-white uppercase tracking-widest transition-colors">Privacy</Link>
             <Link href="/terms" className="text-[9px] font-black text-zinc-600 hover:text-white uppercase tracking-widest transition-colors">Terms</Link>
             <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-purple-500/50 transition-all"
             >
                <ArrowUpRight className="-rotate-45" size={18} />
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;