"use client";

import {
  Sparkles,
  Volume2,
  Gamepad2,
  Bot,
  Zap,
  Layers,
  Activity,
  ArrowRight,
  Code2,
} from "lucide-react";
import Link from "next/link";

// Miralas Ekosistem Navigasyonu (Gelecek modüller "Soon" badge'li)
const nav = [
  { icon: Volume2, label: "Voice Engine", active: true },
  { icon: Gamepad2, label: "AI Games", soon: true },
  { icon: Bot, label: "Agents & Bots", soon: true },
  { icon: Code2, label: "Developer APIs", soon: true },
  { icon: Zap, label: "Realtime Stream", soon: true },
  { icon: Layers, label: "Models Hub", soon: true },
  { icon: Activity, label: "Analytics", soon: true },
];

export function ProductMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full min-h-[520px] overflow-hidden rounded-[22px] border border-white/5 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.55)] font-sans">
      {/* Sol Sidebar */}
      <aside className="hidden w-[220px] shrink-0 flex-col border-r border-white/5 bg-black p-4 sm:flex">
        <div className="mb-5 flex items-center justify-between text-xs font-mono text-cyan-400">
          <span className="flex items-center gap-1.5 font-semibold tracking-wider uppercase text-white">

            Miransas
          </span>

        </div>

        <div className="space-y-1">
          {nav.map((item) => (
            <div
              key={item.label}
              className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all ${item.active
                ? "bg-black text-stone-400 border border-white/15"
                : "text-white/45 hover:text-white/80 hover:bg-white/5"
                }`}
            >
              <div className="flex items-center gap-2.5">
                <item.icon
                  size={15}
                  className={item.active ? "text-cyan-400" : "text-white/40"}
                />
                <span>{item.label}</span>
              </div>

              {/* Gelecek modüller için "SOON" Badge */}
              {item.soon && (
                <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[9px] font-mono text-cyan-400 border border-cyan-500/20">
                  SOON
                </span>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Sağ Ana Ekran */}
      <div className="relative flex-1 overflow-hidden">
        {/* Deep Violet & Cyan Radial Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 80% at 50% 0%, #2e1065 0%, #110c1f 50%, #030303 100%)",
          }}
        />
        {/* Arka planı derinleştiren kontrast katmanı */}
        <div className="absolute inset-0 bg-neutral-950/20" />


        {!compact && (
          <div className="relative z-10 mx-auto mt-10 w-[min(92%,430px)] rounded-[20px] border border-white/10 bg-black p-6 text-center backdrop-blur-md shadow-2xl">
            {/* Logo / Badge */}
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25">
              <img src="/icons/logo.png" alt="" className="object-contain w-full" />
            </div>

            <h3 className="text-xl font-bold tracking-tight text-stone-200">
              Miransas Ecosystem
            </h3>

            <p className="mt-1 text-xs text-stone-400 font-sans leading-relaxed">
              TTS Voice Clone 23+ lang
            </p>

            {/* Orta Aksiyon Butonları (Try Miralas & Join Miralas) */}
            <div className="mt-5 flex items-center gap-2.5">
              <Link href={"https://miralas.io"} className="flex-1">
                <button className="w-full rounded-xl bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:opacity-95 transition active:scale-[0.98] flex items-center justify-center gap-1.5">
                  <span>Miralas Web</span>
                  <ArrowRight size={14} />
                </button>
              </Link>

              <Link href={"https://console.miralas.io"} className="flex-1">
                <button className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md py-2.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/15 transition active:scale-[0.98]">
                  Join Miralas
                </button>
              </Link>
            </div>


            {/* Ekosistem Özeti */}
            <div className="mt-4 text-left text-[11px] leading-5 text-white/70 font-mono bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-cyan-400">
                <span>▸ Active Module:</span>
                <span className="text-purple-300">Voice Synthesis V1 </span>
              </div>
              <div className="flex items-center justify-between text-white/40">
                <span>▸ Upcoming:</span>
                <span>Agents Developer Api Telegram bot Api</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}