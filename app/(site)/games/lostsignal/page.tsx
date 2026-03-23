"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, BrainCircuit, Ghost, TriangleAlert, Radio } from "lucide-react";
import Image from "next/image";
import { TbSteam } from "react-icons/tb";
import { FaSteam } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import Link from "next/link";

// --- Custom Steam & Epic Icons ---
const SteamIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.979 0C5.353 0 0 5.353 0 11.979c0 4.678 2.686 8.71 6.646 10.74l1.354-3.924c-.201-.06-.395-.138-.58-.236-2.024-.985-2.864-3.414-1.88-5.44 1.055-2.17 3.65-3.076 5.82-2.02.26.126.497.288.705.48l3.665-2.61c.01-.137.017-.275.017-.417C15.747 4.54 12.44 1.233 8.428 1.233 4.416 1.233 1.11 4.54 1.11 8.552c0 3.25 2.138 6.02 5.093 7.032l-1.442 4.18C2.083 17.842 0 13.155 0 8.552 0 3.829 3.829 0 8.552 0c4.724 0 8.553 3.829 8.553 8.552 0 .552-.054 1.092-.154 1.615l-3.376 2.404c-.672-1.353-2.183-2.193-3.832-1.92-1.636.268-2.923 1.555-3.19 3.19-.245 1.503.435 2.94 1.666 3.696.173.106.36.192.556.25l-1.385 4.01c4.548 1.22 9.387-.523 11.66-4.665 2.502-4.558.835-10.288-3.723-12.79zM18.1 13.626l-3.868 1.118c-.37-.872-1.205-1.488-2.18-1.574-1.157-.1-2.228.618-2.553 1.71-.325 1.092.203 2.27 1.26 2.81 1.056.54 2.338.212 3.064-.783l3.865-1.117c.504 1.488 2.115 2.28 3.604 1.776 1.488-.504 2.28-2.115 1.776-3.604-.504-1.488-2.115-2.28-3.604-1.776-.902.306-1.517 1.085-1.673 1.956zm2.365.174c.642.868.455 2.103-.414 2.744-.868.642-2.103.455-2.744-.414-.642-.868-.455-2.103.414-2.744.868-.642 2.103-.455 2.744.414z"/>
  </svg>
);

const EpicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.005 0a12.005 12.005 0 100 24.01 12.005 12.005 0 000-24.01zm5.286 16.714h-3.43v-4.285h-2.57v4.285H7.86V7.286h3.43v4.285h2.57V7.286h3.43v9.428z"/>
  </svg>
);

export default function LostSignalPage() {
  return (
    <main className="bg-[#050505] mt-20 text-white selection:bg-red-900/50 min-h-screen font-sans">
      
      {/* ========================================== */}
      {/* 1. HERO SECTION                            */}
      {/* ========================================== */}
      <section className="relative w-full h-[85vh] min-h-[700px] flex items-end pb-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/lostsignal-banner.png" 
            alt="Lost Signal Night Shift" 
            fill
            className="object-cover opacity-50 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay opacity-40 pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-red-900/30 border border-red-500/30 text-red-500 text-[10px] uppercase tracking-[0.3em] font-bold rounded">
                Chapter I
              </span>
              <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-mono">
                Atmospheric Survival
              </span>
            </div>

            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 leading-none text-white drop-shadow-2xl">
              Lost <br />
              <span className="text-red-700">Signal.</span>
            </h1>
            
            <p className="max-w-xl text-lg md:text-xl text-gray-400 font-light mb-10 leading-relaxed drop-shadow-lg">
              Day 1. The graveyard shift at an isolated relay station. Your only lifeline is a two-way radio. But at 1:00 AM, the static changes.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md">
              <Link href="7" className="w-full flex items-center justify-center gap-3  border border-white/10 px-6 py-4 rounded-md font-bold uppercase tracking-widest text-xs transition-colors group">
              <FaSteam  size={30}/>
                Wishlist on Steam
              </Link>
              <Link href="/" className="w-full flex items-center justify-center gap-3  border border-white/10 text-white px-6 py-4 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-[#1A1A1A] hover:border-white/20 transition-colors group">
                <SiEpicgames  size={30}/>
                Epic Games Store
              </Link>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. THE LORE: THE FIRST SHIFT               */}
      {/* ========================================== */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
            <Clock className="text-red-700" size={24} />
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">The First Night</h2>
          </div>
          
          <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
            <p>
              It was supposed to be the easiest job in the world. A solitary night watchman position at a decommissioned communications facility miles away from civilization. The instructions left by the previous guard were simple: keep the generator running, check the perimeter monitors, and report in via the two-way radio every hour.
            </p>
            <p>
              You make your coffee. You sit in the cramped security booth. You wait. 
            </p>
            <p className="pl-6 border-l-2 border-red-900/50 text-gray-300 italic">
              &#34;Never ignore the static. If the frequency drops, lock the booth.&ldquo;
            </p>
            <p>
              But at exactly 1:00 AM, the routine shatters. The radio on your desk crackles to life. It isn&lsquo;t dispatch. It isn&#39;t interference. The white noise morphs into slow, methodical whispers. The cameras start showing blind spots that weren&#39;t there a minute ago. You are completely alone, but the radio suggests otherwise. 
            </p>
            <p>
              <strong>Lost Signal</strong> is a stealth-based psychological horror experience where your main tool—the radio—is also your greatest enemy. 
            </p>
          </div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* 3. CHARACTER SPOTLIGHT: SAD                */}
      {/* ========================================== */}
      <section className="bg-[#0A0A0A] border-y border-white/5 py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative h-[600px] bg-[#111] border border-white/5 rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <Image 
              src="/images/lost.png" 
              alt="Night Watchman Sad" 
              fill 
              className="object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute bottom-10 left-10 z-20">
              <div className="text-red-700 font-mono text-[10px] tracking-[0.4em] uppercase mb-2">Employee #042</div>
              <h3 className="text-5xl font-black text-white uppercase tracking-tighter">SAD</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 text-gray-500">
              <BrainCircuit size={20} className="text-blue-500" />
              <span className="font-mono text-xs uppercase tracking-widest">Profile: The New Guy</span>
            </div>

            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Sad isn&rsquo;t a detective, a soldier, or a hero. He&lsquo;s just a guy desperate enough for cash to take the graveyard shift nobody else wanted. 
            </p>

            <ul className="space-y-6 text-gray-400 text-sm font-light">
              <li className="flex items-start gap-4">
                <Radio className="mt-1 text-red-600 shrink-0" size={16} />
                <p><strong>The Only Lifeline:</strong> His sole connection to the outside world is a cheap, battery-drained radio. As the night progresses, he must choose between keeping it on to hear *them* coming, or turning it off to save his sanity.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 w-1.5 h-1.5 bg-red-600 rounded-full shrink-0" />
                <p><strong>Unprepared:</strong> He has no weapons. His only defense is a flickering flashlight, hiding under desks, and the desperate hope that morning will eventually come.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 w-1.5 h-1.5 bg-red-600 rounded-full shrink-0" />
                <p><strong>The First Day Toll:</strong> This is Day 1. He doesn&#39;t know the layout of the facility perfectly. Every shadow looks like a threat, and panic is his default state of mind.</p>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 4. THE ANTAGONIST: DAS                     */}
      {/* ========================================== */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay opacity-50" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <Ghost size={40} className="mx-auto text-gray-800 mb-8" />
          
          <h2 className="text-4xl font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-gray-500 to-black mb-6">
            DAS
          </h2>
          
          <div className="bg-black/50 border border-white/5 p-8 backdrop-blur-sm rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-red-900/30 group-hover:bg-red-600 transition-colors" />
            <p className="text-gray-500 font-mono text-sm leading-loose tracking-wide">
              Not a person. A localized anomaly trapped between dead frequencies. <br/>
              It doesn&#39;t cast a shadow. It doesn&lsquo;t trigger the motion sensors. <br/>
              Do not speak into the radio. It is listening.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* 5. FOOTER INFO                             */}
      {/* ========================================== */}
      <section className="border-t border-white/5 py-12 text-center bg-[#030303]">
        <div className="flex items-center justify-center gap-2 text-gray-600 font-mono text-xs uppercase tracking-[0.3em]">
          <TriangleAlert size={14} className="text-red-900" />
          <span>Miransas Interactive Engine // Powered by Sardor Azimov</span>
        </div>
      </section>

    </main>
  );
}