/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MicOff } from "lucide-react";

export default function AIDemoSection() {
  const [isDemoActive, setIsDemoActive] = useState(false);

  // Cloudinary üzerinden gelen 3D model görselin
  const heroImageUrl = "https://res.cloudinary.com/dwdk20m6q/image/upload/v1789168695/image__1_-removebg-preview_pftjw6.png";

  return (
    <section className="w-full min-h-screen bg-black flex items-center justify-center p-4 transition-colors duration-300">
      {/* ANA KAPSAYICI KART */}
      <div className="relative w-full max-w-5xl h-[650px] bg-[#F7F7F5] dark:bg-zinc-900/60 rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-200/80 dark:border-zinc-800 flex flex-col justify-end pb-12 transition-colors duration-300">
        
        {/* 1. DOT PATTERN BACKGROUND (SVG & RADIAL MASK) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-30">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="hero-dot-pattern"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="2"
                  cy="2"
                  r="1.2"
                  className="fill-zinc-400 dark:fill-zinc-500"
                />
              </pattern>
              <radialGradient id="dot-mask" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="radial-mask">
                <rect width="100%" height="100%" fill="url(#dot-mask)" />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#hero-dot-pattern)"
              mask="url(#radial-mask)"
            />
          </svg>
        </div>

        {/* 2. SUBTLE AMBIENT SPOTLIGHT (Çok Hafif Rose Işık Dokunuşu) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-[420px] h-[420px] bg-gradient-to-tr from-rose-500/15 via-pink-400/10 to-transparent rounded-full blur-[90px] pointer-events-none z-0" />

        <AnimatePresence mode="wait">
          {!isDemoActive ? (
            /* =========================================
               STATE 1: BAŞLANGIÇ EKRANI (Hero State)
               ========================================= */
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-end pb-12 z-10"
            >
              {/* ETRAFTA UÇUŞAN KÜRELER (Minimalist Frosted Glass) */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }} 
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute top-20 left-28 w-10 h-10 rounded-2xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md border border-white/80 dark:border-zinc-700/50 shadow-sm opacity-80"
              />
              <motion.div 
                animate={{ y: [8, -8, 8] }} 
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute top-36 right-32 w-12 h-12 rounded-full bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md border border-white/80 dark:border-zinc-700/50 shadow-sm opacity-80 flex items-center justify-center text-[10px] text-rose-500 font-mono font-semibold"
              >
                AI
              </motion.div>
              <motion.div 
                animate={{ y: [-6, 6, -6] }} 
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="absolute bottom-40 left-40 w-12 h-12 rounded-2xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md border border-white/80 dark:border-zinc-700/50 shadow-sm opacity-70"
              />
              <motion.div 
                animate={{ y: [10, -10, 10] }} 
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                className="absolute bottom-44 right-28 w-14 h-14 rounded-full bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md border border-white/80 dark:border-zinc-700/50 shadow-sm opacity-70"
              />

              {/* 3D KAFA GÖRSELİ */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] w-[480px] pointer-events-none flex items-center justify-center">
                <img 
                  src={heroImageUrl} 
                  alt="AI Humanoid Head" 
                  className="w-full h-auto object-contain opacity-95 dark:opacity-90 drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)] relative z-10"
                />
              </div>

              {/* METİN VE BUTON */}
              <div className="relative z-20 flex flex-col items-center text-center mt-auto px-4">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 mb-4 shadow-sm">
                  <Sparkles size={13} className="text-rose-500" />
                  <span>AI Demo Experience</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-white mb-3 tracking-tight">
                  See Handhold in action
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base mb-8 max-w-md leading-relaxed">
                  Let our agent walk you through our product in real time.
                </p>

                <button
                  onClick={() => setIsDemoActive(true)}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-900/10 dark:shadow-white/10"
                >
                  <Sparkles size={15} className="text-rose-400 dark:text-rose-600 transition-transform group-hover:rotate-12" />
                  Start demo
                </button>
              </div>
            </motion.div>
          ) : (
            /* =========================================
               STATE 2: CANLI CHAT EKRANI (Active State)
               ========================================= */
            <motion.div
              key="active"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <div className="relative w-full h-full flex items-center justify-center p-4">
                
                {/* MERKEZ KÜRE */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [1, 1.02, 1], opacity: 1 }}
                  transition={{ 
                    scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                    opacity: { duration: 0.5, delay: 0.1 }
                  }}
                  className="relative w-[300px] h-[300px] md:w-[340px] md:h-[340px] rounded-full shadow-2xl flex items-center justify-center z-20"
                  style={{
                    background: "radial-gradient(circle at 40% 20%, #86EFAC 0%, #4ADE80 30%, #3B82F6 80%, #1D4ED8 100%)",
                    boxShadow: "0 20px 50px rgba(59, 130, 246, 0.3), inset 0 -15px 30px rgba(0,0,0,0.15)"
                  }}
                >
                  <div className="w-14 h-14 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-inner cursor-pointer hover:bg-black/30 transition-colors">
                    <MicOff size={22} className="text-white drop-shadow" />
                  </div>
                </motion.div>

                {/* CHAT BALONCUKLARI */}
                <motion.div
                  initial={{ opacity: 0, x: -30, y: 15 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="absolute left-[4%] md:left-[8%] top-[22%] z-30 max-w-[260px] md:max-w-[280px]"
                >
                  <div className="bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs md:text-sm p-4 rounded-3xl rounded-tr-sm shadow-lg">
                    Hi, thanks for calling Housean. How can I help you today?
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30, y: 15 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                  className="absolute left-[6%] md:left-[12%] bottom-[22%] z-30 max-w-[260px] md:max-w-[280px]"
                >
                  <div className="bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs md:text-sm p-4 rounded-3xl rounded-tr-sm shadow-lg">
                    Of course. Let me look that up right now. Can I get your order number?
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30, y: 15 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="absolute right-[4%] md:right-[8%] top-[38%] z-30 max-w-[280px] md:max-w-[300px]"
                >
                  <div className="bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs md:text-sm p-4 rounded-3xl rounded-tl-sm shadow-xl">
                    I ordered something four days ago, and it still hasn't arrived. I need to know what's going on.
                  </div>
                </motion.div>

                <button 
                  onClick={() => setIsDemoActive(false)}
                  className="absolute bottom-6 right-8 text-xs md:text-sm font-medium text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 underline z-40 transition-colors"
                >
                  Back to Intro
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}