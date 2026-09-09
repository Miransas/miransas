"use client";
import React from 'react';
import { Terminal, Activity, GitBranch, ArrowUpRight } from 'lucide-react';
import ScrollExpand from '../ScrollExpand';

const SYSTEMS = [
  {
    name: "Binboi",
    desc: "Self-hosted ngrok alternative",
    status: "CANLI",
    statusColor: "text-[#8CFF2E]",
    dotColor: "bg-[#8CFF2E] shadow-[0_0_8px_rgba(140,255,46,0.6)]",
  },
  {
    name: "CourierX",
    desc: "Resend alternatifi e-posta API'si",
    status: "PAUSED",
    statusColor: "text-slate-500",
    dotColor: "bg-slate-600",
  },
  {
    name: "Miransas Chess",
    desc: "Chess engine, written in Rust",
    status: "IN DEV",
    statusColor: "text-amber-400",
    dotColor: "bg-amber-400",
  },
  {
    name: "Pulse",
    desc: "Yerel macOS sistem izleyicisi",
    status: "YAYINLANDI",
    statusColor: "text-[#8CFF2E]",
    dotColor: "bg-[#8CFF2E] shadow-[0_0_8px_rgba(140,255,46,0.6)]",
  },
];

export default function ExpandScroll() {
  return (
    <main className="min-h-screen ">
      <ScrollExpand
        src="https://res.cloudinary.com/dwdk20m6q/image/upload/v1788966098/Ekran_Resmi_2026-09-09_18.00.58_xi4xe8.png"
        alt="Miransas — independent software studio"
        scrollHint="Scroll to see what's live"
        title="Independent by design"
        useWindowScroll
      >
        {/* Alt Kısım: İçerik ve Sistem Durumu (Görselin dışında, kaybolmaz) */}
        <div className="max-w-6xl mx-auto px-6 py-20 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Sol Kolon: Metinler */}
            <div className="flex flex-col gap-3">
              <h1 className="text-[2.75rem] leading-tight font-bold text-white tracking-tight">
                Independent by design
              </h1>
              <h2 className="text-2xl font-bold text-slate-300">
                One developer. Real products in production.
              </h2>
              <p className="text-lg text-slate-400 mt-2 max-w-md leading-relaxed">
                Miransas builds, ships, and sells software products end-to-end —
                no investors, no roadmap meetings. Just code that ships.
              </p>
            </div>

            {/* Sağ Kolon: Live Systems Paneli */}
            <div className=" rounded-xl p-5 text-stone-700 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] ">

              {/* Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-stone-800" />
                  <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                    Sistemler
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8CFF2E] shadow-[0_0_6px_rgba(140,255,46,0.8)]"></div>
                  <span className="text-[#8CFF2E] text-[10px] font-medium tracking-wide">
                    operational
                  </span>
                </div>
              </div>

              {/* Sistem Listesi */}
              <div className="flex flex-col  rounded-xloverflow-hidden mb-4">
                {SYSTEMS.map((sys) => (
                  <div key={sys.name} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${sys.dotColor}`}></div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-100">{sys.name}</span>
                        <span className="text-[11px] text-slate-500">{sys.desc}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-semibold tracking-wide ${sys.statusColor}`}>
                      {sys.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <a
                href="/about"
                className="flex items-center justify-between px-1 py-1 group cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>View all projects</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#8CFF2E] transition-colors" />
              </a>

            </div>
          </div>
        </div>
      </ScrollExpand>
    </main>
  );
}