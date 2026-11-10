'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Home, Globe, X } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-background text-foreground flex min-h-[80svh] items-center justify-center p-4 font-sans md:p-8">
      {/* Ana Kart Kapsayıcısı */}
      <div className="bg-card border-border relative grid w-full max-w-5xl grid-cols-1 items-center gap-8 overflow-hidden rounded-[2rem] border p-6 shadow-sm md:p-12 lg:grid-cols-2 lg:gap-12">
        {/* Sağ Üst Kapatma (Close) Butonu */}
        <Link href="/" aria-label="Back home" className="text-muted-foreground hover:text-foreground hover:bg-secondary absolute top-6 right-6 z-20 rounded-full p-2 transition-colors">
          <X className="h-5 w-5" />
        </Link>

        {/* SOL KATMAN: Radar Ekranı */}
        <div className="dark-visual relative mx-auto flex aspect-square w-full max-w-[420px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-inner">
          {/* Radar Üst Bilgileri */}
          <div className="z-10 flex items-center justify-between font-mono text-[10px] tracking-widest text-white/40 uppercase">
            <span>SWEEP 06.05</span>
            <span>SECTOR NE-04</span>
          </div>

          {/* Radar Gövdesi */}
          <div className="relative my-4 flex h-full w-full items-center justify-center">
            {/* İç İçe Daireler */}
            <div className="absolute inset-2 rounded-full border border-white/[0.07]" />
            <div className="absolute inset-16 rounded-full border border-white/[0.07]" />
            <div className="absolute inset-32 rounded-full border border-white/[0.07]" />

            {/* Çapraz Izgara Çizgileri */}
            <div className="absolute h-[1px] w-full bg-white/[0.07]" />
            <div className="absolute h-full w-[1px] bg-white/[0.07]" />

            {/* Dönen Radar Taraması (Sweep Animation) */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(255, 255, 255, 0.12) 360deg)',
              }}
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: 'linear',
              }}
            />

            {/* Merkez Noktası */}
            <div className="z-10 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />

            {/* Radar Üzerindeki Sinyal/Blip Noktaları */}
            <div className="absolute top-1/3 left-1/4 h-1.5 w-1.5 rounded-full bg-white/40" />

            <div className="absolute right-1/3 bottom-1/3 flex items-center justify-center">
              <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-white/40 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/80" />
            </div>

            <div className="absolute top-1/2 right-1/4 h-1.5 w-1.5 rounded-full bg-white/30" />
          </div>

          {/* Radar Alt Bilgileri */}
          <div className="z-10 flex items-center justify-between font-mono text-[10px] tracking-widest text-white/40 uppercase">
            <span>CONTACTS: 00</span>
            <span className="text-white/60">SIGNAL: LOST</span>
          </div>
        </div>

        {/* SAĞ KATMAN: 404 Metin ve Aksiyonlar */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Büyük 404 Başlığı */}
          <div className="relative">
            <h1 className="text-foreground text-8xl font-extrabold tracking-tighter select-none md:text-9xl">404</h1>
          </div>

          {/* Başlık ve Açıklama */}
          <div className="space-y-3">
            <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">Nothing on the scope.</h2>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-base">We swept every route twice and this page isn&#39;t broadcasting anymore. Search for what you need, or head back to base.</p>
          </div>

          {/* Arama Kutusu */}
          <form action="/news" className="relative flex w-full max-w-md items-center">
            <Search className="text-muted-foreground absolute left-4 h-4 w-4" />
            <input type="search" name="tag" aria-label="Search news by tag" placeholder="Search news by tag..." className="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:outline-ring w-full rounded-full border py-3.5 pr-12 pl-11 text-sm transition-all" />
            <button type="submit" aria-label="Search news" className="bg-primary text-primary-foreground absolute right-2 flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:opacity-85 active:scale-95">
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Butonlar */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/" className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all hover:opacity-85 active:scale-95">
              <Home className="h-4 w-4" />
              Back home
            </Link>

            <Link href="/contact" className="text-muted-foreground hover:text-foreground hover:bg-secondary inline-flex items-center gap-2 rounded-full bg-transparent px-4 py-3 text-sm transition-all">
              <Globe className="h-4 w-4" />
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
