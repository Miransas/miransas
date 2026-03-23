"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, Terminal, ShieldCheck, 
  MapPin, Mail, Github, MessageSquare, Fingerprint, AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sendSignal } from "@/app/(site)/actions/send-email"; // SERVER ACTION IMPORTU

// --- BORDER BEAM ---
const BorderBeam = ({ className, color = "#FF4F00", duration = 4 }: { className?: string; color?: string; duration?: number }) => (
  <div className={cn("absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-10", className)}>
    <motion.div
      className="absolute w-[2px] h-[40%] blur-[2px]"
      style={{
        background: `linear-gradient(180deg, ${color} 0%, rgba(255,255,255,0.8) 50%, ${color} 100%)`,
        filter: `drop-shadow(0 0 8px ${color})`,
      }}
      animate={{ top: ["-40%", "100%", "100%", "-40%", "-40%"], left: ["0%", "0%", "100%", "100%", "0%"] }}
      transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // GERÇEK GÖNDERİM FONKSİYONU
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await sendSignal(formData);
      if (result.success) {
        setFormState("sent");
      } else {
        setFormState("error");
      }
    } catch (err) {
      setFormState("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-32 font-sans  overflow-hidden relative">
      
      {/* ─── SİBER ARKA PLAN ─── */}
      <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(#404040 1px, transparent 1px), linear-gradient(90deg, #404040 1px, transparent 1px)`, backgroundSize: "40px 40px" }} 
      />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF4F00]/5 blur-[150px] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ─── HEADER ─── */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
              <ShieldCheck size={14} className="text-blue-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400">Connection Encrypted (ChaCha20)</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
              Establish <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] to-orange-600">Connection.</span>
            </h1>
            <p className="text-lg text-neutral-400 font-light leading-relaxed">
              Initiate a direct signal to Miransas Studio. Whether for high-performance infrastructure, interactive IP development, or classified operations.
            </p>
          </motion.div>
        </div>

        {/* ─── İLETİŞİM BÖLÜMÜ ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          
          {/* SOL: TELEMETRİ */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-2 space-y-8">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4F00] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              <Terminal size={24} className="text-neutral-500 mb-6" />
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 text-white">Sardor Azimov</h3>
              <p className="text-sm font-mono text-neutral-500 mb-8">Lead Architect & Founder</p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin className="text-[#FF4F00] mt-1 shrink-0" size={18} />
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-1">Headquarters</h4>
                    <p className="text-neutral-400 text-sm font-light">İzmir, Türkiye<br/>[38.4237° N, 27.1428° E]</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="text-blue-500 mt-1 shrink-0" size={18} />
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-1">Secure Email</h4>
                    <a href="mailto:contact@miransas.com" className="text-neutral-400 text-sm font-light hover:text-white transition-colors">
                      contact@miransas.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a href="#" className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 hover:bg-white/[0.02] hover:border-white/10 transition-all flex flex-col items-center justify-center text-center group">
                <MessageSquare size={24} className="text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">Live Agent</span>
                <span className="text-sm font-bold text-white">Telegram</span>
              </a>
              <a href="https://github.com/sardorazimov" target="_blank" rel="noreferrer" className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 hover:bg-white/[0.02] hover:border-white/10 transition-all flex flex-col items-center justify-center text-center group">
                <Github size={24} className="text-white mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">Source Code</span>
                <span className="text-sm font-bold text-white">GitHub</span>
              </a>
            </div>
          </motion.div>

          {/* SAĞ: GÜVENLİ İLETİŞİM FORMU */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="lg:col-span-3 relative">
            <div className="relative bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-center">
              
              <BorderBeam color={formState === "error" ? "#EF4444" : "#FF4F00"} duration={5} />

              <div className="absolute top-0 left-0 w-full bg-[#111] border-b border-neutral-800 px-6 py-4 flex items-center justify-between z-20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  <Fingerprint size={12} /> signal_transmitter.exe
                </div>
              </div>

              {formState === "sent" ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-20 flex flex-col items-center text-center mt-12">
                  <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4">Signal Encrypted & Sent</h3>
                  <p className="text-neutral-400 font-light text-sm max-w-sm mb-8">
                    Your transmission has securely bypassed the proxy and reached Miransas core servers. We will respond shortly.
                  </p>
                  <button onClick={() => setFormState("idle")} className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors border-b border-neutral-800 hover:border-white pb-1">
                    Initiate New Signal
                  </button>
                </motion.div>
              ) : formState === "error" ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-20 flex flex-col items-center text-center mt-12">
                  <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle size={32} className="text-red-500" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4">Transmission Failed</h3>
                  <p className="text-neutral-400 font-light text-sm max-w-sm mb-8">
                    The signal was intercepted or dropped due to network instability. Please check your connection and try again.
                  </p>
                  <button onClick={() => setFormState("idle")} className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors border-b border-neutral-800 hover:border-white pb-1">
                    Retry Transmission
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-20 flex flex-col gap-6 mt-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                        <span className="text-[#FF4F00]">{">"}</span> Origin ID (Name)
                      </label>
                      <input type="text" name="name" required disabled={formState === "sending"} className="w-full bg-[#111] border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF4F00] focus:ring-1 focus:ring-[#FF4F00] transition-all disabled:opacity-50" placeholder="e.g. John Doe" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                        <span className="text-[#FF4F00]">{">"}</span> Return Route (Email)
                      </label>
                      <input type="email" name="email" required disabled={formState === "sending"} className="w-full bg-[#111] border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF4F00] focus:ring-1 focus:ring-[#FF4F00] transition-all disabled:opacity-50" placeholder="contact@domain.com" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                      <span className="text-[#FF4F00]">{">"}</span> Payload (Message)
                    </label>
                    <textarea name="message" required rows={5} disabled={formState === "sending"} className="w-full bg-[#111] border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF4F00] focus:ring-1 focus:ring-[#FF4F00] transition-all resize-none disabled:opacity-50" placeholder="Enter transmission data..." />
                  </div>

                  <button type="submit" disabled={formState === "sending"} className="group relative w-full flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden">
                    {formState === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Encrypting & Routing...
                      </>
                    ) : (
                      <>
                        Transmit Signal <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="text-center mt-2">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-600">
                      Protected by Miransas proprietary encryption
                    </span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}