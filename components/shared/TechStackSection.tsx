"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Zap, Database } from "lucide-react";

export default function TechStack() {
  return (
    <section className="bg-[#050505] py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* --- BAŞLIK --- */}
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Built on a foundation of fast, production-grade tooling
          </h2>
        </div>

        {/* --- ŞEMA ALANI --- */}
        <div className="relative flex flex-col items-center">
          
          {/* MERKEZİ CHIP (Powered By) */}
          <div className="relative z-20 bg-[#111] border border-white/10 px-8 py-3 rounded-md flex items-center justify-center">
            <span className="text-gray-300 font-medium text-sm tracking-tight">Powered By</span>
            {/* Yanlardaki Chip Pinleri */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
              {[1, 2, 3].map((i) => <div key={i} className="w-2 h-[1px] bg-white/20" />)}
            </div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
              {[1, 2, 3].map((i) => <div key={i} className="w-2 h-[1px] bg-white/20" />)}
            </div>
          </div>

          {/* SVG DEVRE ÇİZGİLERİ (Birebir Görseldeki Geometri) */}
          <div className="absolute top-[44px] inset-0 z-10 pointer-events-none h-[200px]">
            <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
              {/* Statik Arka Plan Çizgileri */}
              <path d="M 500 0 L 500 60 L 166 60 L 166 200" stroke="#1A1A1A" strokeWidth="1" fill="none" />
              <path d="M 500 0 L 500 200" stroke="#1A1A1A" strokeWidth="1" fill="none" />
              <path d="M 500 0 L 500 60 L 833 60 L 833 200" stroke="#1A1A1A" strokeWidth="1" fill="none" />

              {/* HAREKETLİ VERİ AKIŞI (Lazer Efekti) */}
              <motion.path 
                d="M 500 0 L 500 60 L 166 60 L 166 200" 
                stroke="url(#grad-left)" strokeWidth="1.5" fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.path 
                d="M 500 0 L 500 200" 
                stroke="url(#grad-center)" strokeWidth="1.5" fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              />
              <motion.path 
                d="M 500 0 L 500 60 L 833 60 L 833 200" 
                stroke="url(#grad-right)" strokeWidth="1.5" fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.5 }}
              />

              <defs>
                <linearGradient id="grad-left" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
                <linearGradient id="grad-center" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF4F00" stopOpacity="0" />
                  <stop offset="100%" stopColor="#FF4F00" />
                </linearGradient>
                <linearGradient id="grad-right" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#EAB308" stopOpacity="0" />
                  <stop offset="100%" stopColor="#EAB308" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* ÜÇLÜ KART YAPISI (Statik & Temiz) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-[180px] relative z-20">
            
            {/* KART 1: FRONTEND */}
            <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-lg hover:border-white/10 transition-colors">
              <Code2 className="text-gray-400 mb-6" size={28} />
              <h3 className="text-xl font-bold text-white mb-3">Next.js</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                The core library for web and native interfaces. Miransas Studio leverages Next.js for SEO-critical production platforms.
              </p>
            </div>

            {/* KART 2: SYSTEMS */}
            <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-lg hover:border-white/10 transition-colors">
              <Zap className="text-gray-400 mb-6" size={28} />
              <h3 className="text-xl font-bold text-white mb-3">Systems Engineering</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                Utilizing <strong>Rust</strong> and <strong>Go</strong> for high-performance macOS VPN clients and autonomous AI bot logic.
              </p>
            </div>

            {/* KART 3: DATA */}
            <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-lg hover:border-white/10 transition-colors">
              <Database className="text-gray-400 mb-6" size={28} />
              <h3 className="text-xl font-bold text-white mb-3">Data Architecture</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                Strictly typed schemas via <strong>Drizzle ORM</strong> and <strong>Prisma</strong>, interfacing with scalable PostgreSQL nodes on <strong>Neon</strong>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}