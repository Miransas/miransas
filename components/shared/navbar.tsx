"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function cn(...inputs: (string | boolean | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}

const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "https://blog.miransas.com", external: true },
  { label: "Status", href: "/status", isStatus: true },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-8"
    >
      <div
        className={cn(
          "relative flex w-full max-w-[90rem] items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-8",
          scrolled
            ? "border border-white/10 bg-[#0a0a0a]/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        )}
      >
        {/* Soft Amber Glow on Scroll */}
        {scrolled && (
          <div className="pointer-events-none absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        )}

        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="Miransas home"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-1 shadow-inner transition-transform duration-300 group-hover:scale-105 group-hover:border-amber-500/30">
            <Image
              src="/icons/logo.png"
              alt="Miransas Logo"
              width={36}
              height={36}
              className="rounded-lg object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white">
              Miransas
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.02] p-1.5 backdrop-blur-md md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-neutral-400 transition-colors duration-200 hover:text-white"
              >
                <span>{link.label}</span>

                {/* Status Indicator Pulse */}
                {link.isStatus && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                )}

                {/* External Icon */}
                {link.external && (
                  <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="group relative hidden h-10 items-center justify-center overflow-hidden rounded-xl bg-amber-400 px-5 text-sm font-semibold text-black transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] md:inline-flex"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Get Started
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white transition-colors hover:border-amber-500/30 hover:bg-white/[0.08] md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-4 top-20 flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-[#0a0a0a]/95 p-4 shadow-2xl backdrop-blur-2xl md:hidden"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-neutral-300 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <span>{link.label}</span>
                  {link.isStatus && (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                  )}
                </div>
                {link.external && <ArrowUpRight className="h-4 w-4 text-neutral-500" />}
              </Link>
            ))}

            <div className="mt-2 pt-2 border-t border-white/10">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 text-center text-base font-semibold text-black transition-bg hover:bg-amber-300"
              >
                Get Started
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}