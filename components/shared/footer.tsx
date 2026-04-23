"use client";

import Link from "next/link";
import { Github, Instagram, Twitter, ArrowUpRight, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    projects: [
      // { name: "Worktio", href: "/projects/worktio" },
      { name: "Lost Signal", href: "/projects/lost-signal" },
      { name: "binboi", href: "/projects/binboi" },
      // { name: "MulaVPN", href: "/projects/mulavpn" }, // Geliştirdiğin diğer proje eklendi
    ],
    social: [
      { name: "GitHub", href: "https://github.com/sardorazimov", icon: <Github size={16} /> },
      { name: "Instagram", href: "https://instagram.com/asardorazimov", icon: <Instagram size={16} /> },
      { name: "X / Twitter", href: "https://twitter.com/asardorazimov", icon: <Twitter size={16} /> },
    ],
  };

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/10 pt-20 pb-8 overflow-hidden font-sans selection:bg-[#8CFF2E] selection:text-black">
      
      {/* Arka Plan Neon Glow Efekti */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[200px] bg-[#8CFF2E]/5 blur-[120px] pointer-events-none" />

      {/* İnce Siber Grid (Sistemin geneliyle uyum) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} 
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Üst Kısım Grid: 12 Sütunluk yapıyı daha dengeli dağıttık */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* MARKA BÖLÜMÜ (Genişlik: 5) */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="group flex items-center gap-4 w-fit outline-none">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#8CFF2E] transition-all duration-500 shadow-lg group-hover:shadow-[0_0_15px_rgba(140,255,46,0.2)]">
                {/* SVG Logo komponentini kullanabilirsin veya resmi: */}
                <img src="/logo/logo.png" alt="Miransas" className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">Miransas.</span>
                <p className="text-[10px] font-bold tracking-[0.4em] text-[#8CFF2E] uppercase mt-1">Engineered Solutions</p>
              </div>
            </Link>
            
            <p className="text-white/40 text-sm max-w-sm leading-relaxed font-light">
              Bridging high-performance software architecture with atmospheric game development. Built for zero latency.
            </p>
            
            {/* Sistem Durumu */}
            <div className="flex items-center gap-3 pt-2">
               <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#8CFF2E]/10 border border-[#8CFF2E]/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CFF2E] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#8CFF2E]"></span>
                  </span>
                  <span className="text-[9px] font-black text-[#8CFF2E] uppercase tracking-widest font-mono">Systems Online</span>
               </div>
            </div>
          </div>

          {/* LİNKLER - PROJELER (Genişlik: 3) */}
          <div className="lg:col-span-3 space-y-6 lg:ml-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-3">Core Projects</h4>
            <ul className="space-y-4">
              {footerLinks.projects.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-2 text-[13px] font-bold text-white/50 hover:text-white transition-colors uppercase tracking-wider outline-none">
                    {link.name} 
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#8CFF2E]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOSYAL MEDYA (Genişlik: 4) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-3">Network</h4>
            <div className="grid grid-cols-1 gap-3">
              {footerLinks.social.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  target="_blank"
                  className="flex items-center justify-between p-3.5 rounded-lg bg-[#0a0a0a] border border-white/5 hover:border-[#8CFF2E]/50 hover:bg-[#8CFF2E]/5 transition-all group outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white/40 group-hover:text-[#8CFF2E] transition-colors">{link.icon}</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">{link.name}</span>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-[#8CFF2E] transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ALT BANT (Bottom Bar) */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] font-mono">
              © {currentYear} Miransas. All rights reserved.
            </p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-white/10" />
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
               Made by Sardor Azimov
            </p>
          </div>
          
          <div className="flex items-center gap-6">
             <Link href="/privacy" className="text-[9px] font-black text-white/30 hover:text-[#8CFF2E] uppercase tracking-[0.2em] transition-colors outline-none">Privacy</Link>
             <Link href="/terms" className="text-[9px] font-black text-white/30 hover:text-[#8CFF2E] uppercase tracking-[0.2em] transition-colors outline-none">Terms</Link>
             
             {/* Back to top button */}
             <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="ml-4 w-9 h-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#050505] hover:bg-[#8CFF2E] hover:border-[#8CFF2E] transition-all outline-none group"
                aria-label="Back to top"
             >
                <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
             </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;