"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Instagram, Twitter, ArrowUpRight, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    projects: [
      { name: "Lost Signal", href: "/projects/lost-signal" },
      { name: "binboi", href: "/projects/binboi" },
      { name: "Miransas Engine", href: "/projects/engine" },
      
    ],
    social: [
      { name: "GitHub", href: "https://github.com/sardorazimov", icon: <Github size={15} /> },
      { name: "Instagram", href: "https://instagram.com/asardorazimov", icon: <Instagram size={15} /> },
      { name: "X / Twitter", href: "https://twitter.com/asardorazimov", icon: <Twitter size={15} /> },
    ],
  };

  return (
    <footer className="relative w-full bg-[#050505] overflow-hidden font-sans selection:bg-[#8CFF2E] selection:text-black">

      {/* ── Üst ayırıcı glow çizgisi ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8CFF2E]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8CFF2E] to-transparent blur-sm opacity-30" />
      </div>

      {/* ── Zemin ambient glow ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#8CFF2E]/6 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] bg-[#EF4444]/4 blur-[100px] pointer-events-none rounded-full" />

      {/* ── Siber grid ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Ana içerik ── */}
      <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-8 relative z-10">

      
        {/* <div className="mb-16 relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[72px] md:text-[120px] font-black italic uppercase tracking-tighter leading-none select-none"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.08)",
              color: "transparent",
              textShadow: "0 0 80px rgba(140,255,46,0.12)",
            }}
          >
            Miransas.
          </motion.h2>
         
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-0 left-0 text-[72px] md:text-[120px] font-black italic uppercase tracking-tighter leading-none pointer-events-none select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(140,255,46,0.15)",
              filter: "blur(8px)",
            }}
          >
            Miransas.
          </motion.h2>
        </div> */}

        {/* ── Grid: marka sol, linkler sağ ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Marka col */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="group flex items-center gap-4 w-fit outline-none">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(140,255,46,0.15) 0%, transparent 70%), #0a0a0a",
                  border: "1px solid rgba(140,255,46,0.25)",
                  boxShadow: "0 0 20px rgba(140,255,46,0.12)",
                }}
              >
                <img src="/logo/logo.png" alt="Miransas" className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">Miransas.</span>
                <p className="text-[10px] font-bold tracking-[0.4em] text-[#8CFF2E] uppercase mt-1">Engineered Solutions</p>
              </div>
            </Link>

            <p className="text-white/35 text-sm max-w-sm leading-relaxed font-light">
              Bridging high-performance software architecture with atmospheric game development. Built for zero latency.
            </p>

            {/* Status */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(140,255,46,0.10) 0%, transparent 70%), #0a0a0a",
                border: "1px solid rgba(140,255,46,0.25)",
                boxShadow: "0 0 20px rgba(140,255,46,0.08)",
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CFF2E] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#8CFF2E]" />
              </span>
              <span className="text-[9px] font-black text-[#8CFF2E] uppercase tracking-widest font-mono">Systems Online</span>
            </div>
          </div>

          {/* Projeler */}
          <div className="lg:col-span-3 space-y-6 lg:ml-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/25 pb-3 border-b border-white/5">
              Core Projects
            </h4>
            <ul className="space-y-5">
              {footerLinks.projects.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[13px] font-bold text-white/40 hover:text-white transition-all duration-300 uppercase tracking-wider outline-none"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#8CFF2E]/40 group-hover:bg-[#8CFF2E] transition-colors" />
                    {link.name}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#8CFF2E]"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sosyal */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/25 pb-3 border-b border-white/5">
              Network
            </h4>
            <div className="flex flex-col gap-3">
              {footerLinks.social.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  className="group flex items-center justify-between p-4 rounded-xl transition-all duration-300 outline-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 0%, rgba(140,255,46,0.04) 0%, transparent 70%), #0a0a0a",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.border = "1px solid rgba(140,255,46,0.35)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(140,255,46,0.10), inset 0 0 20px rgba(140,255,46,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white/35 group-hover:text-[#8CFF2E] transition-colors duration-300">
                      {link.icon}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white/45 group-hover:text-white transition-colors duration-300">
                      {link.name}
                    </span>
                  </div>
                  <ArrowUpRight size={13} className="text-white/15 group-hover:text-[#8CFF2E] transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Alt bant ── */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-[10px] font-black text-white/25 uppercase tracking-[0.2em] font-mono">
              © {currentYear} Miransas. All rights reserved.
            </p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-white/10" />
            <p className="text-[10px] font-mono text-white/15 uppercase tracking-widest">
              Made by Sardor Azimov
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[9px] font-black text-white/25 hover:text-[#8CFF2E] uppercase tracking-[0.2em] transition-colors outline-none">
              Privacy
            </Link>
            <Link href="/terms" className="text-[9px] font-black text-white/25 hover:text-[#8CFF2E] uppercase tracking-[0.2em] transition-colors outline-none">
              Terms
            </Link>

            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="ml-4 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 outline-none group"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(140,255,46,0.10) 0%, transparent 70%), #0a0a0a",
                border: "1px solid rgba(140,255,46,0.25)",
                boxShadow: "0 0 16px rgba(140,255,46,0.10)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#8CFF2E";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(140,255,46,0.4)";
                (e.currentTarget as HTMLElement).style.border = "1px solid #8CFF2E";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "radial-gradient(ellipse at 50% 0%, rgba(140,255,46,0.10) 0%, transparent 70%), #0a0a0a";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(140,255,46,0.10)";
                (e.currentTarget as HTMLElement).style.border = "1px solid rgba(140,255,46,0.25)";
              }}
              aria-label="Back to top"
            >
              <ArrowUp size={15} className="text-[#8CFF2E] group-hover:text-[#050505] group-hover:-translate-y-0.5 transition-all duration-300" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;