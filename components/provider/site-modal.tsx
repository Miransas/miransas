"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function NoticeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Oturum boyunca bir kez gösterilsin istiyorsan sessionStorage kullanabilirsin.
    // Her sayfa yenilemede tekrar çıkmasını istersen setIsOpen(true) doğrudan yeterli.
    const hasSeenNotice = sessionStorage.getItem("hasSeenNotice");
    if (!hasSeenNotice) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("hasSeenNotice", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* ARKA PLAN BLUR (BACKDROP) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-md"
          />

          {/* MODAL KART */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800 rounded-[2rem] p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* AMBIENT LIGHT (Hafif Rose Işık Taşması) */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-rose-500/10 dark:bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col items-center text-center">
              {/* IKON */}
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 flex items-center justify-center text-zinc-900 dark:text-white mb-5 shadow-sm">
                <Sparkles size={20} className="text-rose-500" />
              </div>

              {/* BAŞLIK */}
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight mb-2.5">
                Active Development
              </h3>

              {/* İÇERİK METNİ */}
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                We are constantly updating and refining our platform to provide a better experience. Features and visual elements may evolve as development continues.
              </p>

              {/* BUTON */}
              <button
                onClick={handleClose}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black rounded-full font-medium text-sm transition-all active:scale-[0.98] shadow-lg shadow-zinc-900/10 dark:shadow-white/10"
              >
                <span>Understand & Proceed</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}