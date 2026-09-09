"use client";

import { motion } from "framer-motion";
import { Mic, Send, Paperclip, Sparkles, MoreHorizontal, Pause, Volume2, Radio } from "lucide-react";
import SideRays from "../SideRays";

// Canlı Ekualayzır / Frekans Barları
function Equalizer({ barCount = 28 }: { barCount?: number }) {
  return (
    <div className="flex items-center justify-between gap-[3px] h-10 w-full px-2">
      {Array.from({ length: barCount }).map((_, i) => {
        // Rastgele görünümlü, organik frekans yükseklikleri
        const baseMin = (i % 5 + 1) * 15;
        const baseMax = Math.min(100, baseMin + 60);
        const duration = 0.4 + (i % 7) * 0.15;

        return (
          <motion.span
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-rose-500 to-pink-500"
            animate={{
              height: [`${baseMin}%`, `${baseMax}%`, `${baseMin}%`],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 3) * 0.1,
            }}
          />
        );
      })}
    </div>
  );
}

export function ProductMock() {
  return (
    <div className="flex w-full max-w-3xl flex-col items-center mx-auto mt-12 mb-24">
        <div style={{ width: '768px', height: 'h-auto', position: 'absolute', borderRadius: '24px', overflow: 'hidden' }}>
        <SideRays
          speed={2.8}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={3}
          spread={2.4}
          origin="top-left"
          tilt={7}
          saturation={2}
          blend={0.75}
          falloff={1.6}
          opacity={1}
        />
      </div>
      {/* Ana Kapsayıcı: Glassmorphism Pencere */}
      <div className="w-full rounded-[2rem] border border-white/10  backdrop-blur-2xl shadow-[0_0_80px_rgba(244,63,94,0.12)] overflow-hidden flex flex-col relative z-20">

        {/* Üst Bar (Header) */}
        <div className="flex items-center justify-between px-6 py-4 ">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-white/10" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-white/10" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-white/10" />
          </div>

          <div className="flex items-center gap-2 text-white/80 text-xs font-semibold tracking-wider uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            Miralas Real-time Neural Audio
          </div>

          <div>
          </div>
        </div>

        {/* Sohbet Geçmişi (Chat Area) */}
        <div className="flex-1 p-6 flex flex-col gap-6 h-[380px] overflow-hidden justify-end">

          {/* Kullanıcı Mesajı */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="self-end max-w-[85%] rounded-2xl rounded-tr-sm bg-white/10 px-5 py-3.5 text-white/90 text-[15px] leading-relaxed border border-white/5 shadow-sm"
          >
            Let's listen live to the voiceover for our new commercial, featuring Şahzoda's voice model.     
             </motion.div>

          {/* Yapay Zeka (AI) Mesajı & Live Waveform Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="self-start max-w-[92%] w-full rounded-2xl rounded-tl-sm bg-gradient-to-br from-rose-500/10 via-black/40 to-transparent p-5 border border-rose-500/20 shadow-sm flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 border border-rose-500/30">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Live Voice Synthesizer</h4>
                  <p className="text-[11px] text-white/40">Şahzoda Model (Uzbek/Turkish Neural Voice)</p>
                </div>
              </div>

              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-[10px] text-rose-300 font-mono tracking-wider">
                <Radio className="w-3 h-3 animate-pulse text-rose-400" /> LIVE STREAMING
              </span>
            </div>

            {/* LIVE WAVEFORM & EQUALIZER OYNATICI */}
            <div className="bg-black/60 rounded-xl border border-white/10 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-4">
                {/* Oynat/Durdur Butonu */}
                <button className="w-11 h-11 rounded-full bg-rose-500 hover:bg-rose-400 transition-all flex items-center justify-center shrink-0 text-white shadow-lg shadow-rose-500/30 active:scale-95">
                  <Pause className="w-5 h-5 fill-current" />
                </button>

                {/* Canlı Ekualayzır Barları */}
                <div className="flex-1 overflow-hidden">
                  <Equalizer barCount={32} />
                </div>

                <div className="flex items-center gap-2 text-white/60 shrink-0">
                  <Volume2 className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-mono text-white/70">24-bit / 48kHz</span>
                </div>
              </div>

              {/* Süre ve Dalga Alt Bilgisi */}
              <div className="flex justify-between items-center text-[11px] font-mono text-white/40 pt-1 border-t border-white/5">
                <span>00:18.42</span>
                <span className="text-rose-400/80 font-sans text-[10px]">Buffer: 100% (Ultra Low Latency)</span>
                <span>00:45.00</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Alt Kısım: Canlı oluşturma ve giriş alanı */}
        <div className="p-4 bg-black/20 border-t border-white/5 backdrop-blur-md">
          <div className="relative flex items-center bg-white/5 rounded-[1.5rem] border border-white/10 px-2 py-2 hover:border-white/20 transition-all focus-within:border-rose-500/50 focus-within:bg-white/10 focus-within:shadow-[0_0_20px_rgba(244,63,94,0.1)]">

            <button className="p-2 text-white/40 hover:text-white/90 transition-colors rounded-full hover:bg-white/5">
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              placeholder="Type text to synthesize or speak into the microphone..."
              className="flex-1 bg-transparent border-none outline-none text-white text-[15px] px-3 placeholder:text-white/30"
              readOnly
            />

            <div className="flex items-center gap-1">
              <button className="p-2 text-rose-400 hover:text-rose-300 transition-colors rounded-full hover:bg-rose-500/10">
                <Mic className="w-5 h-5 animate-pulse" />
              </button>
              <button className="p-2 bg-rose-500 hover:bg-rose-400 text-white rounded-full transition-all flex items-center justify-center w-10 h-10 shadow-lg shadow-rose-500/20 active:scale-95 ml-1">
                <Send className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" />
              </button>
            </div>
          </div>

          <div className="text-center mt-3">
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium">
              Miransas AI Audio Engine • Realtime Neural Synthesis
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}