"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Home, Globe, X } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070707] text-white flex items-center justify-center p-4 md:p-8 font-sans selection:bg-white/20">
      {/* Ana Kart Kapsayıcısı */}
      <div className="relative w-full max-w-5xl bg-[#0d0d0d] border border-white/10 rounded-[2rem] p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center shadow-2xl overflow-hidden">
        
        {/* Sağ Üst Kapatma (Close) Butonu */}
        <Link
          href="/"
          className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/5 z-20"
        >
          <X className="w-5 h-5" />
        </Link>

        {/* SOL KATMAN: Radar Ekranı */}
        <div className="relative w-full aspect-square max-w-[420px] mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-inner">
          
          {/* Radar Üst Bilgileri */}
          <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-white/40 z-10 uppercase">
            <span>SWEEP 06.05</span>
            <span>SECTOR NE-04</span>
          </div>

          {/* Radar Gövdesi */}
          <div className="relative w-full h-full flex items-center justify-center my-4">
            
            {/* İç İçe Daireler */}
            <div className="absolute inset-2 rounded-full border border-white/[0.07]" />
            <div className="absolute inset-16 rounded-full border border-white/[0.07]" />
            <div className="absolute inset-32 rounded-full border border-white/[0.07]" />

            {/* Çapraz Izgara Çizgileri */}
            <div className="absolute w-full h-[1px] bg-white/[0.07]" />
            <div className="absolute h-full w-[1px] bg-white/[0.07]" />

            {/* Dönen Radar Taraması (Sweep Animation) */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(255, 255, 255, 0.12) 360deg)",
              }}
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "linear",
              }}
            />

            {/* Merkez Noktası */}
            <div className="w-2 h-2 bg-white rounded-full z-10 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />

            {/* Radar Üzerindeki Sinyal/Blip Noktaları */}
            <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-white/40 rounded-full" />
            
            <div className="absolute bottom-1/3 right-1/3 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white/40 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/80" />
            </div>

            <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white/30 rounded-full" />
          </div>

          {/* Radar Alt Bilgileri */}
          <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-white/40 z-10 uppercase">
            <span>CONTACTS: 00</span>
            <span className="text-white/60">SIGNAL: LOST</span>
          </div>
        </div>

        {/* SAĞ KATMAN: 404 Metin ve Aksiyonlar */}
        <div className="flex flex-col justify-center space-y-6">
          
          {/* Büyük 404 Başlığı */}
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter text-white select-none">
              404
            </h1>
          </div>

          {/* Başlık ve Açıklama */}
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Nothing on the scope.
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-md">
              We swept every route twice and this page isn't broadcasting
              anymore. Search for what you need, or head back to base.
            </p>
          </div>

          {/* Arama Kutusu */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative flex items-center w-full max-w-md"
          >
            <Search className="absolute left-4 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search pages..."
              className="w-full bg-[#141414] border border-white/10 rounded-full py-3.5 pl-11 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-white/90 transition-transform active:scale-95"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Butonlar */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-black font-medium text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-all active:scale-95"
            >
              <Home className="w-4 h-4" />
              Back home
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-transparent text-white/70 hover:text-white text-sm px-4 py-3 rounded-full hover:bg-white/5 transition-all"
            >
              <Globe className="w-4 h-4" />
              Contact support
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}