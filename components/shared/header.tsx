"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Github, Twitter } from "lucide-react";
import { headerNavLinks as navLinks } from "@/constants";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-500 transform-gpu",
          // 1. Her zaman border-b ekledik, sadece rengi transparan başlattık
          "border-b border-transparent",
          scrolled
            ? "bg-black/60 backdrop-blur-xl py-3 border-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-6"
        )}
        // 2. GPU hızlandırmayı zorla
        style={{ backfaceVisibility: "hidden", perspective: 1000 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* LOGO SECTİON */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-all duration-500">
              <img src="/logo/logo.png" alt="Miransas" className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-white leading-none uppercase italic">Miransas.</span>
              <span className="text-[8px] font-bold tracking-[0.3em] text-zinc-500 uppercase leading-none mt-1 group-hover:text-blue-400 transition-colors"></span>
            </div>
          </Link>

          {/* DESKTOP NAV (Pill Style) */}
          <div className="hidden md:flex items-center bg-white/[0.03] border border-white/5 rounded-full px-2 py-1 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-5 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300",
                    isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white/5 rounded-full border border-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* RIGHT SECTİON: ACTIONS */}
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/5"
            >
              Portal <ArrowUpRight size={14} />
            </Link>

            {/* Burger Butonu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white outline-none hover:bg-white/10 transition-all"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBİL MENÜ (Modern Reveal) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-[#030303] flex flex-col pt-32 px-8"
          >
            {/* Arka Plan Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-end gap-4 text-5xl font-black uppercase tracking-tighter text-zinc-800 hover:text-white transition-all italic"
                  >
                    <span className="text-sm font-mono text-blue-500 mb-2">0{i + 1}</span>
                    {link.name}
                    <ArrowUpRight size={32} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-blue-500" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pb-12 relative z-10">
              <div className="h-px w-full bg-white/5 mb-10" />
              <div className="flex justify-between items-center text-zinc-500">
                <div className="flex gap-6">
                  <Link href="https://twitter.com/asardorazimov" target="_blank" className="hover:text-white transition-colors"><Twitter size={20} /></Link>
                  <Link href="https://github.com/sardorazimov" target="_blank" className="hover:text-white transition-colors"><Github size={20} /></Link>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest italic">Miransas © 2026</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;