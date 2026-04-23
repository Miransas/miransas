"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Github, Twitter, Terminal } from "lucide-react";
import { headerNavLinks as navLinks } from "@/constants";
import { cn } from "@/lib/utils"; // cn utils function olduğunu varsayıyoruz

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  // Scroll takibi
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil menü açıkken body scroll'u kapat
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-500 transform-gpu",
          // Border her zaman var, rengi duruma göre değişiyor
          "border-b border-transparent",
          scrolled || isOpen
            ? "bg-[#020202]/80 backdrop-blur-xl py-3 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent py-6"
        )}
        style={{ backfaceVisibility: "hidden", perspective: 1000 }}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">

          {/* ─── LOGO SECTİON ─── */}
          <Link href="/" className="group flex items-center gap-4 outline-none">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#8CFF2E] transition-all duration-500 shadow-lg group-hover:shadow-[0_0_15px_rgba(140,255,46,0.2)]">
              <img src="/logo/logo.png" alt="Miransas" className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-[#8CFF2E]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white leading-none uppercase italic">Miransas.</span>
              <span className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase leading-none mt-1 group-hover:text-[#8CFF2E] transition-colors">
               
              </span>
            </div>
          </Link>

          {/* ─── DESKTOP NAV (Pill Style - Neon Edge) ─── */}
          <div className="hidden md:flex items-center bg-[#0a0a0a]/50 border border-white/5 rounded-full px-2 py-1.5 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 outline-none",
                    isActive ? "text-[#050505]" : "text-white/50 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-[#8CFF2E] rounded-full shadow-[0_0_10px_rgba(140,255,46,0.3)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 font-mono">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* ─── RIGHT SECTİON: ACTIONS ─── */}
          <div className="flex items-center gap-4">
            
            {/* Masaüstü Portal Butonu */}
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 text-white/80 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#8CFF2E] hover:border-[#8CFF2E] hover:text-[#050505] transition-all duration-300 shadow-lg outline-none group"
            >
              <Terminal size={14} className="group-hover:animate-pulse" />
              Console <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Mobil Burger Butonu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 outline-none hover:bg-[#8CFF2E]/10 hover:text-[#8CFF2E] hover:border-[#8CFF2E]/50 transition-all z-[110] relative"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── MOBİL MENÜ (Full Screen Hacker Overlay) ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-[#050505] flex flex-col pt-32 px-8 overflow-y-auto selection:bg-[#8CFF2E] selection:text-black"
          >
            {/* İnce Siber Grid (Arka Plan) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
              style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} 
            />

            {/* Neon Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[#8CFF2E]/5 blur-[150px] pointer-events-none" />

            {/* Menü Linkleri */}
            <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-center pb-20">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-end gap-6 text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white/20 hover:text-white transition-all italic outline-none"
                    >
                      <span className={cn(
                        "text-sm sm:text-lg font-mono mb-2 sm:mb-4 transition-colors duration-300",
                        isActive ? "text-[#8CFF2E]" : "text-white/20 group-hover:text-[#8CFF2E]"
                      )}>
                        0{i + 1}
                      </span>
                      <span className={cn(isActive && "text-white")}>{link.name}</span>
                      <ArrowUpRight size={40} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all text-[#8CFF2E] hidden sm:block" />
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobil Portal Butonu */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.5 }}
                className="pt-8"
              >
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between w-full p-4 rounded-xl bg-[#8CFF2E] text-[#050505] font-black uppercase tracking-widest text-sm outline-none shadow-[0_0_30px_rgba(140,255,46,0.2)]"
                >
                  <div className="flex items-center gap-3">
                    <Terminal size={18} />
                    Console Access
                  </div>
                  <ArrowUpRight size={20} />
                </Link>
              </motion.div>
            </div>

            {/* Alt Kısım (Sosyal & Copyright) */}
            <div className="mt-auto pb-10 relative z-10 shrink-0">
              <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-8" />
              <div className="flex justify-between items-center text-white/40">
                <div className="flex gap-6">
                  <Link href="https://twitter.com/asardorazimov" target="_blank" className="hover:text-[#8CFF2E] transition-colors outline-none"><Twitter size={20} /></Link>
                  <Link href="https://github.com/sardorazimov" target="_blank" className="hover:text-[#8CFF2E] transition-colors outline-none"><Github size={20} /></Link>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8CFF2E]">SYS.ACTIVE</span>
                   <p className="text-[10px] font-black uppercase tracking-widest italic mt-1 text-white/30">Miransas © 2026</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;