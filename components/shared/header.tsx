/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Menu, X } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { name: "Project", href: "/projects" },
  { name: "Blog", href: "https://blog.miransas.com" },
  { name: "Change Log", href: "/changelog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] transition-colors duration-300 ${
        scrolled || open
          ? "bg-[#05060a]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3"
          : "bg-transparent border-b border-transparent py-5 md:py-6"
      }`}
    >
      <motion.div
        animate={{ opacity: scrolled ? [0.3, 0.8, 0.3] : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-rose-500 to-transparent pointer-events-none"
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" onClick={() => setOpen(false)}>
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl shadow-[inset_0_0_10px_rgba(244,63,94,0.2)] transition-shadow group-hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]">
              <img
                src="/logo/logo.png"
                alt="MIRANSAS Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-base sm:text-lg font-black tracking-tighter text-white">
              MIRANSAS
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative text-sm font-bold tracking-[0.1em] text-slate-200 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8CFF2E]/40 rounded-sm"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-rose-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden items-center gap-2 font-mono text-[9px] font-bold tracking-widest text-[#9eff00] lg:flex">
            <div className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9eff00] opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#9eff00] shadow-[0_0_8px_#9eff00]" />
            </div>
            SYS_ONLINE
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative hidden sm:flex items-center gap-2 rounded-full bg-white px-4 sm:px-5 py-2 text-xs font-bold text-black font-mono tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8CFF2E]/40"
            style={{
              boxShadow:
                "0 0 20px rgba(244,63,94,0.35), 0 0 40px rgba(244,63,94,0.15)",
            }}
          >
            <Activity className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
            <span>INIT_CLI</span>
          </motion.button>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white transition-colors duration-200 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8CFF2E]/40"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/10 bg-[#05060a]/95 backdrop-blur-xl"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 sm:px-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-bold tracking-[0.1em] text-slate-200 transition-colors duration-200 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8CFF2E]/40"
                >
                  {link.name}
                </a>
              ))}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-black font-mono tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8CFF2E]/40"
              >
                <Activity className="h-3.5 w-3.5" />
                INIT_CLI
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
