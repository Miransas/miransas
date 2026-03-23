"use function";
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Gamepad2, Lock, Radio, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function GamesPage() {
  const games = [
    {
      id: "lost-signal-1",
      title: "Lost Signal",
      chapter: "Chapter I",
      status: "Available Now",
      active: true,
      description: "Step into the 1:00 AM shift. A psychological horror experience following Sad's encounter with the stranger named Das. Do you have the diesel?",
      image: "/images/lostsignal-1.png", // public klasörüne oyunun kapağını eklemelisin usta
      link: "/games/lostsignal",
    },
    {
      id: "lost-signal-2",
      title: "Lost Signal II",
      chapter: "Chapter II",
      status: "Coming Soon",
      active: false,
      description: "The frequency expands beyond the pale city. The signal is encrypted. Stand by for further transmissions.",
      image: "/images/lost-signal-2.jpg",
      link: "/games/lostsignal2",
    },
    {
      id: "lost-signal-3",
      title: "Lost Signal III",
      chapter: "Chapter III",
      status: "Classified",
      active: false,
      description: "Data corrupted. Unauthorized access detected. The final broadcast is currently under heavy encryption.",
      image: "/images/lost-signal-3.jpg",
      link: "/games/lostsignal3",
    }
  ];

  return (
    <main className="min-h-screen mt-20 bg-[#050505] text-white selection:bg-red-600/30 overflow-hidden">
      
      {/* ========================================== */}
      {/* 1. CLASSIC VIDEO HERO SECTION              */}
      {/* ========================================== */}
      <section className="relative h-[70vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden border-b border-white/5">
        
        {/* Video Background */}
        <div className="absolute inset-0 z-0 bg-black">
          {/* Eğer videon varsa public/videos/ klasörüne atıp src kısmını güncelleyebilirsin. */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-40 scale-105"
          >
            <source src="/videos/games-hero.mp4" type="video/mp4" />
          </video>
          {/* Karanlık Gradyan (Metinlerin okunması için) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/50" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay opacity-20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6 text-red-600">
              <Radio className="animate-pulse" size={24} />
              <span className="font-mono text-sm tracking-[0.4em] uppercase font-bold">Interactive Transmissions</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none">
              Miransas <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600">Studios.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
              We build atmospheric nightmares. Enter the dark mode of interactive storytelling and survive the frequencies we engineered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. THE GAMES ARCHIVE (CARDS)               */}
      {/* ========================================== */}
      <section className="relative py-32 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <Gamepad2 className="text-[#FF4F00]" size={32} />
          <h2 className="text-4xl font-black uppercase tracking-tighter">The Archives</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div 
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`group relative flex flex-col bg-[#0A0A0A] border rounded-2xl overflow-hidden transition-all duration-500 ${
                game.active ? "border-white/10 hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] cursor-pointer" : "border-white/5 opacity-80"
              }`}
            >
              {/* Game Cover Image Area */}
              <div className="relative aspect-[4/3] w-full bg-[#111] overflow-hidden">
                {game.active ? (
                  <>
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30">
                    <Lock size={48} className="mb-4 opacity-50" />
                    <div className="w-full h-[1px] bg-gray-800 absolute top-1/2 overflow-hidden">
                      <motion.div className="w-1/4 h-full bg-red-900/50" animate={{ x: ["-100%", "400%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                    </div>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md backdrop-blur-md border ${
                    game.active ? "bg-red-600/20 text-red-500 border-red-500/30" : "bg-black/40 text-gray-500 border-white/10"
                  }`}>
                    {game.status}
                  </span>
                </div>
              </div>

              {/* Game Info Details */}
              <div className="p-8 flex-1 flex flex-col relative z-10 bg-gradient-to-b from-transparent to-[#050505]">
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-2">{game.chapter}</div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4 flex items-center justify-between">
                  {game.title}
                  {game.active && <ArrowUpRight className="text-gray-600 group-hover:text-red-500 transition-colors" size={24} />}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light mb-8 flex-1">
                  {game.description}
                </p>

                {/* Action Button */}
                {game.active ? (
                  <Link href={game.link} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-colors duration-300">
                    Enter Frequency <Play size={14} fill="currentColor" />
                  </Link>
                ) : (
                  <button disabled className="w-full py-4 bg-transparent border border-white/10 text-gray-600 font-bold uppercase tracking-widest text-xs rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
                    Signal Encrypted <Lock size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}