"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Rocket, RefreshCw, BarChart,
    BrainCircuit, ShieldAlert, Settings,
    Terminal, Database, Bot, Zap
} from "lucide-react";
import { cn } from "@/lib/utils"; // Tailwind merge yardımcı fonksiyonu

// --- 1. CARD BORDER BEAM EFFECT (KART KENARINDAKİ IŞIN) ---
const BorderBeam = ({ className, color = "#FF4F00", duration = 3 }: { className?: string; color?: string; duration?: number }) => {
    return (
        <div className={cn("absolute inset-0 rounded-[20px] overflow-hidden pointer-events-none z-1", className)}>
            <motion.div
                className="absolute w-[2px] h-[30%] blur-[2px]"
                style={{
                    background: `linear-gradient(180deg, ${color} 0%, rgba(255,255,255,0.8) 50%, ${color} 100%)`,
                    filter: `drop-shadow(0 0 6px ${color})`,
                }}
                animate={{
                    top: ["-30%", "100%", "100%", "-30%", "-30%"],
                    left: ["0%", "0%", "100%", "100%", "0%"],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
};

// --- 2. KUSURSUZ AKAN LAZER (MİNİ VERSİYON - BELİRGİN VE KESKİN) ---
const MiniAnimatedLine = ({ d, color, delay, duration = 2 }: { d: string; color: string; delay: number; duration?: number }) => (
    <g>
        {/* Sabit Koyu İz (ÇOK BELİRGİN) */}
        <path d={d} className="stroke-neutral-800" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Kayan Neon */}
        <motion.path
            d={d} stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
        <motion.circle
            r="3" fill={color}
            initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
            style={{ offsetPath: `path("${d}")`, animation: `mini-travel-${delay.toString().replace(".", "")} ${duration}s ${delay}s ease-in-out infinite` }}
        />
        <style>{`
      @keyframes mini-travel-${delay.toString().replace(".", "")} {
        0% { offset-distance: 0%; opacity: 0; }
        10% { opacity: 1; } 90% { opacity: 1; }
        100% { offset-distance: 100%; opacity: 0; }
      }
    `}</style>
    </g>
);

export default function FeaturesGrid() {
    return (
        <section className="bg-[#050505] py-32 px-6 selection:bg-[#FF4F00]/30 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* ─── BAŞLIK ─── */}
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                        The Miransas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] to-orange-600">Architecture</span>
                    </h2>
                    <p className="text-neutral-500 font-light max-w-2xl mx-auto">
                        High-performance, military-grade systems. Engineered in İzmir by Sardor Azimov.
                    </p>
                </div>

                {/* ─── BENTO GRID YAPISI (GÖRKEMLİ VE BELİRGİN) ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* SOL KOLON (3 Küçük Kart) */}
                    <div className="flex flex-col gap-8">
                        <FeatureCard
                            icon={<Rocket size={22} className="text-[#FF4F00]" />}
                            title="Deploy Faster"
                            desc="Engineering zero-downtime, Rust-powered secure VPN tunnels and Next.js SEO-critical platforms."
                        />
                        <FeatureCard
                            icon={<RefreshCw size={22} className="text-blue-500" />}
                            title="Iterate Rapidly"
                            desc="Modular, Gemini-like AI conversational agents with dynamic state management."
                            color="#3B82F6"
                        />
                        <FeatureCard
                            icon={<BarChart size={22} className="text-emerald-500" />}
                            title="Scale Smarter"
                            desc="Scale distributed PostgreSQL nodes via Neon with strictly typed Drizzle ORM schemas."
                            color="#10B981"
                        />
                    </div>

                    {/* ORTA KOLON (Devasa Ana Kart) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="lg:col-span-1 bg-[#0A0A0A] border border-white/5 rounded-[20px] p-7 flex flex-col relative overflow-hidden group hover:border-[#FF4F00]/30 transition-all shadow-2xl"
                    >
                        {/* ─── BORDER BEAM (Merkezi Kart) ─── */}
                        <BorderBeam color="#FF4F00" duration={4} />

                        {/* ÜST: Node / Lazer Şeması (BELİRGİN VE KESKİN) */}
                        <div className="relative h-[240px] w-full flex items-center justify-center border border-white/5 rounded-2xl bg-[#080808] mb-8">
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet">
                                {/* Sol Node'dan Merkeze */}
                                <MiniAnimatedLine d="M 80 120 L 170 120" color="#3B82F6" delay={0} duration={1.5} />
                                {/* Merkezden Sağ Node'a */}
                                <MiniAnimatedLine d="M 230 120 L 320 120" color="#10B981" delay={0.8} duration={1.5} />
                            </svg>

                            {/* Sol İkon (Web/Systems) */}
                            <div className="absolute left-[10%] top-1/2 -translate-y-1/2 bg-[#111] border border-neutral-800 p-3.5 rounded-xl z-10 shadow-lg">
                                <Database size={22} className="text-blue-500" />
                            </div>

                            {/* Merkez İkon (Miransas Hub v4.0) */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-neutral-800 to-black border border-neutral-700 p-5 rounded-xl z-20 shadow-[0_0_40px_rgba(255,79,0,0.2)] group-hover:border-[#FF4F00] transition-colors">
                                <Terminal size={30} className="text-white group-hover:text-[#FF4F00] transition-colors" />
                            </div>

                            {/* Mavi "Connected" Badge */}
                            <div className="absolute left-1/2 top-[78%] -translate-x-1/2 bg-blue-600 border border-blue-500 text-white text-[10px] font-bold px-3.5 py-1.5 rounded-md tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.6)] z-20">
                                Connected
                            </div>

                            {/* Sağ İkon (AI/Bot Mesh) */}
                            <div className="absolute right-[10%] top-1/2 -translate-y-1/2 bg-[#111] border border-neutral-800 p-3.5 rounded-xl z-10 shadow-lg">
                                <Bot size={22} className="text-emerald-500" />
                            </div>
                        </div>

                        {/* ALT: Dashboard / Terminal UI (Lost Signal, Rust VPN) */}
                        <div className="mt-auto bg-[#050505] border border-neutral-800 rounded-2xl overflow-hidden shadow-inner selection:bg-[#FF4F00]/20">
                            {/* Mac Pencere Başlığı */}
                            <div className="bg-[#111] border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-[10px] font-mono text-neutral-500">terminal@miransas ~ HQ: İzmir</span>
                            </div>
                            {/* İçerik / Progress Barlar */}
                            <div className="p-6 space-y-5">
                                <div>
                                    <div className="flex justify-between text-[11px] text-neutral-300 mb-1.5 font-mono">
                                        <span>Lost Signal servers</span>
                                        <span className="text-[#FF4F00]">92%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                                        <motion.div className="h-full bg-[#FF4F00]" initial={{ width: "0%" }} whileInView={{ width: "92%" }} transition={{ duration: 1.5, delay: 0.2 }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[11px] text-neutral-300 mb-1.5 font-mono">
                                        <span>Rust VPN secure tunnels</span>
                                        <span className="text-emerald-500">Active</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                                        <motion.div className="h-full bg-emerald-500" initial={{ width: "0%" }} whileInView={{ width: "100%" }} transition={{ duration: 1.5, delay: 0.4 }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SAĞ KOLON (3 Küçük Kart) */}
                    <div className="flex flex-col gap-8">
                        <FeatureCard
                            icon={<BrainCircuit size={22} className="text-yellow-500" />}
                            title="Reuse Intelligence"
                            desc="Modular, reusable Gemini Pro AI prompt sequences across dynamic Telegram interfaces."
                            color="#EAB308"
                        />
                        <FeatureCard
                            icon={<ShieldAlert size={22} className="text-rose-500" />}
                            title="Prevent Breakdowns"
                            desc="Engineering crash-safe performance in the Lost Signal game engine using Rust on M1."
                            color="#F43F5E"
                        />
                        <FeatureCard
                            icon={<Settings size={22} className="text-purple-500" />}
                            title="Automate Workflows"
                            desc="Automate all workflows, from macOS VPN deployments to AdSense script integration."
                            color="#A855F7"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}

// --- KÜÇÜK KART BİLEŞENİ (BORDER BEAM ENTEGRELİ) ─────────────
function FeatureCard({ icon, title, desc, color = "#FF4F00" }: { icon: React.ReactNode; title: string; desc: string; color?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-[#0A0A0A] border border-white/5 rounded-[20px] p-8 hover:border-white/15 transition-all group flex-1 relative overflow-hidden"
        >
            {/* ─── BORDER BEAM (Küçük Kart) ─── */}
            <BorderBeam color={color} duration={3} />

            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-5 bg-[#111] border border-neutral-800 w-11 h-11 flex items-center justify-center rounded-lg group-hover:scale-110 group-hover:border-white/20 transition-all shadow-md">
                    {icon}
                </div>
                <h3 className="text-white font-bold mb-2 tracking-wide uppercase text-base">{title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">
                    {desc}
                </p>
            </div>
        </motion.div>
    );
}