"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const AboutUs = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // SVG Çizgi animasyonu için değerler
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-sans px-6 py-24"
    >
      {/* 1. Arka Plan "Lens" Efekti (Mouse Takibi için geliştirilebilir) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* 2. Hareketli SVG Çizgileri (Geometrik Yapı) */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
        viewBox="0 0 1000 1000"
      >
        <motion.path
          d="M0,200 Q250,100 500,500 T1000,800"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Üst Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="px-4 py-1 text-xs font-medium tracking-[0.2em] uppercase border border-white/10 rounded-full bg-white/5">
            Miransas Studio
          </span>
          <h2 className="mt-8 text-5xl md:text-7xl font-bold tracking-tight">
            Fikirleri <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Dijital Evrenlere</span> Dönüştürüyoruz.
          </h2>
        </motion.div>

        {/* Ana İçerik Bölümü */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Yazılımın Gücü, Oyunun Ruhu.</h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              Miransas olarak, kodun disiplini ile hayal gücünün sınırsızlığını birleştiriyoruz. 
              Sadece yazılım geliştirmiyoruz; kullanıcıların içinde kaybolacağı dünyalar ve 
              karmaşık sorunları tek tıkla çözen estetik araçlar inşa ediyoruz.
            </p>
            <div className="mt-10 flex gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="text-blue-400 font-bold text-xl">01</div>
                <div className="text-sm text-gray-300">İleri Düzey Mimari</div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="text-purple-400 font-bold text-xl">02</div>
                <div className="text-sm text-gray-300">İmmeratif Deneyim</div>
              </div>
            </div>
          </motion.div>

          {/* Görsel / Grafik Alanı */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-square flex items-center justify-center"
          >
            {/* "Lens" Efektli Cam Panel */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl border border-white/20 backdrop-blur-3xl overflow-hidden shadow-2xl">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="text-6xl font-black opacity-10 uppercase tracking-widest">Code</div>
                <div className="text-6xl font-black opacity-20 uppercase tracking-widest">Play</div>
                <div className="text-6xl font-black opacity-10 uppercase tracking-widest">Repeat</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;