/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Link2 } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [

  { name: "Project", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Change Log", href: "/changelog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${scrolled
        ? "bg-[#05060a]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3"
        : "bg-transparent border-b border-transparent py-6"
        }`}
    >
      {/* Scroll Olunca Beliren En Üstteki Lazer Çizgisi */}
      <motion.div
        animate={{ opacity: scrolled ? [0.3, 0.8, 0.3] : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-rose-500 to-transparent pointer-events-none"
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        {/* ========================================= */}
        {/* 1. LOGO ALANI                             */}
        {/* ========================================= */}
        <Link href="/"><div className="flex items-center gap-4 cursor-pointer group">
          {/* İkon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl  shadow-[inset_0_0_10px_rgba(244,63,94,0.2)] transition-shadow group-hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]">
            <img src="/logo/logo.png" alt="MIRANSAS Logo" className="h-full w-full object-contain" />
          </div>
          {/* Marka İsmi */}
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter text-white">MIRANSAS</span>

          </div>
        </div></Link>

        {/* ========================================= */}
        {/* 2. ORTA NAVİGASYON (MASAÜSTÜ)             */}
        {/* ========================================= */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative  text-sm font-bold tracking-[0.1em] text-slate-200 transition-colors hover:text-white"
            >
              {link.name}
              {/* Hover Altı Çizgisi Animasyonu */}
              <span className="absolute -bottom-2 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-rose-500 transition-all duration-300 group-hover:w-full" />
              {/* Hover Arka Plan Parlaması */}
              <span className="absolute inset-0 -z-10 scale-150 rounded-full bg-rose-500/0 blur-md transition-all duration-300 group-hover:bg-rose-500/10" />
            </a>
          ))}
        </nav>

        {/* ========================================= */}
        {/* 3. SAĞ AKSİYON & SİSTEM DURUMU            */}
        {/* ========================================= */}
        <div className="flex items-center gap-6">

          {/* SYS_ONLINE */}
          <div className="hidden items-center gap-2 font-mono text-[9px] font-bold tracking-widest text-[#9eff00] lg:flex">
            <div className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9eff00] opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#9eff00] shadow-[0_0_8px_#9eff00]" />
            </div>
            SYS_ONLINE
          </div>

          {/* Login — ghost */}


          {/* CTA — beyaz, rose glow */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold text-black font-mono tracking-wider transition-all duration-300"
            style={{
              boxShadow: '0 0 20px rgba(244,63,94,0.35), 0 0 40px rgba(244,63,94,0.15)'
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(244,63,94,0.6), 0 0 60px rgba(244,63,94,0.25)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(244,63,94,0.35), 0 0 40px rgba(244,63,94,0.15)';
            }}
          >
            <Activity className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
            <span>INIT_CLI</span>
          </motion.button>

        </div>

      </div>
    </header>
  );
}