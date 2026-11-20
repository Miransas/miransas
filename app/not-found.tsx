'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Home, Globe, X } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="surface-page text-foreground flex min-h-[80svh] items-center justify-center p-4 font-sans md:p-8">
      <div className="surface-blue-gradient relative grid w-full max-w-5xl grid-cols-1 items-center gap-8 overflow-hidden rounded-4xl p-6 md:p-12 lg:grid-cols-2 lg:gap-12">
        <Link
          href="/"
          aria-label="Back home"
          className="surface-card text-prominent hover:text-heading absolute top-6 right-6 z-20 rounded-xl p-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
        >
          <X className="h-5 w-5" />
        </Link>

        <div className="dark-visual surface-card relative mx-auto flex aspect-square w-full max-w-[420px] flex-col justify-between overflow-hidden rounded-3xl p-6">
          <div className="z-10 flex items-center justify-between font-mono text-xs leading-[1.45] tracking-[0.12em] text-[#6E6E74] uppercase">
            <span>SWEEP 06.05</span>
            <span>SECTOR NE-04</span>
          </div>

          <div className="relative my-4 flex h-full w-full items-center justify-center">
            <div className="absolute inset-2 rounded-4xl bg-white/[0.02]" />
            <div className="absolute inset-16 rounded-4xl bg-white/[0.03]" />
            <div className="absolute inset-32 rounded-4xl bg-[#3847ff]/10" />

            <div className="absolute h-[1px] w-full bg-white/[0.06]" />
            <div className="absolute h-full w-[1px] bg-white/[0.06]" />

            <motion.div
              className="absolute inset-0 rounded-4xl"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(56, 71, 255, 0.24) 360deg)',
              }}
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: 'linear',
              }}
            />

            <div className="z-10 h-2.5 w-2.5 rounded-xl bg-[#3847ff] shadow-[0_0_12px_rgba(56,71,255,0.9)]" />

            <div className="absolute top-1/3 left-1/4 h-1.5 w-1.5 rounded-xl bg-white/40" />

            <div className="absolute right-1/3 bottom-1/3 flex items-center justify-center">
              <span className="absolute inline-flex h-3 w-3 animate-ping rounded-xl bg-[#3847ff]/60 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-xl bg-[#3847ff]" />
            </div>

            <div className="absolute top-1/2 right-1/4 h-1.5 w-1.5 rounded-xl bg-white/30" />
          </div>

          <div className="z-10 flex items-center justify-between font-mono text-xs leading-[1.45] tracking-[0.12em] text-[#6E6E74] uppercase">
            <span>CONTACTS: 00</span>
            <span className="text-[#D1D1D1]">SIGNAL: LOST</span>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <div className="relative">
            <h1 className="text-heading text-[2.75rem] leading-[1.03] font-semibold tracking-[-0.03em] select-none sm:text-6xl lg:text-[4.5rem]">
              404 — Nothing on the scope.
            </h1>
          </div>

          <div className="space-y-3">
            <p className="text-secondary-copy max-w-md text-[15px] leading-[1.6] sm:text-base">
              We swept every route twice and this page isn&#39;t broadcasting anymore. Search for what you need, or head back to base.
            </p>
          </div>

          <form
            action="/news"
            className="relative flex w-full max-w-md items-center"
          >
            <Search className="text-secondary-copy absolute left-4 h-4 w-4" />
            <input
              type="search"
              name="tag"
              aria-label="Search news by tag"
              placeholder="Search news by tag..."
              className="surface-card text-heading placeholder:text-secondary-copy w-full rounded-xl py-3.5 pr-12 pl-11 text-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
            />
            <button
              type="submit"
              aria-label="Search news"
              className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-[#3847ff] text-white transition-transform hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] active:scale-95"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#3847ff] px-6 py-3 text-sm font-medium text-white transition-all hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] active:scale-95"
            >
              <Home className="h-4 w-4" />
              Back home
            </Link>

            <Link
              href="/contact"
              className="surface-card hover:surface-card-elevated text-prominent inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
            >
              <Globe className="h-4 w-4" />
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
