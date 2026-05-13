/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  ShieldAlert, Cpu, CheckCircle2, 
  TerminalSquare, ArrowRight, Loader2, XOctagon 
} from "lucide-react";

// ============================================================================
// TYPES & DATA
// ============================================================================
type LogEntry = {
  id: string;
  message: string;
  time: string;
  status: "danger" | "success" | "warning";
};

type SystemLogCardProps = {
  title: string;
  description: string;
  logs: LogEntry[];
  themeColor: "rose" | "lime";
  Icon: any;
  statusText: string;
  link ?: string;
};

// ============================================================================
// BORDERLESS, PREMIUM INNER-GLOW SYSTEM LOG CARD
// ============================================================================
const SystemLogCard = ({ title, description, logs, themeColor, Icon, statusText, link }: SystemLogCardProps) => {
  const isRose = themeColor === "rose";
  const textMain = isRose ? "text-rose-500" : "text-[#9eff00]";
  const bgMain = isRose ? "bg-rose-500" : "bg-[#9eff00]";
  const colorHex = isRose ? "#f43f5e" : "#9eff00";

  return (
    <div
      className={cn(
        // BORDER KALDIRILDI, SABİT ARKA PLAN RENGİ EKLENDİ
        "relative flex flex-col w-full h-[600px] overflow-hidden",
        "rounded-[2rem] bg-[#09090b] z-10 shadow-2xl"
      )}
    >
      {/* ====================================================================== */}
      {/* İÇ GLOW (AURA) EFEKTİ - Resimdeki gibi üstten süzülen sabit ışık      */}
      {/* ====================================================================== */}
      {/* 1. Üstten aşağı süzülen geniş gradient */}
      <div className={cn(
        "absolute inset-0 h-1/2 bg-gradient-to-b to-transparent opacity-20 pointer-events-none z-0",
        isRose ? "from-rose-500" : "from-[#9eff00]"
      )} />
      
      {/* 2. Sağ üst köşeye yoğunlaşan soft blur (Yanıp sönmez, sabittir) */}
      <div className={cn(
        "absolute -top-20 -right-10 w-96 h-96 rounded-full blur-[100px] opacity-30 pointer-events-none z-0",
        bgMain
      )} />

      {/* HEADER */}
      <div className="relative z-10 flex flex-col gap-3 p-8 border-b border-white/5 bg-transparent">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-white/[0.03] shadow-inner relative overflow-hidden">
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className={cn("absolute inset-0 border border-dashed rounded-xl opacity-30", isRose ? "border-rose-500" : "border-[#9eff00]")} />
            <Icon className={cn("h-6 w-6 relative z-10", textMain)} />
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white drop-shadow-md">{title}</h2>
        </div>
        <p className="text-sm font-mono text-slate-400 mt-2 leading-relaxed max-w-md">
          {description}
        </p>
      </div>

      {/* İÇERİK (TIMELINE & LOGS) */}
      <div className="relative z-10 flex-1 flex flex-col pt-6 pb-20">
        
        {/* Canlı Sistem Durumu Kutusu */}
        <div className="relative z-20 flex items-center justify-between bg-black/40 border border-white/5 rounded-xl px-5 py-4 mx-8 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="h-4 w-4">
              <Loader2 className={cn("h-full w-full", textMain)} />
            </motion.div>
            <p className="font-mono text-xs font-bold tracking-widest text-slate-200 uppercase">
              {statusText}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", bgMain)} />
              <span className={cn("relative inline-flex rounded-full h-2 w-2", bgMain)} />
            </span>
            <span className="text-xs font-mono text-slate-500 uppercase">
              SYS_ACTV
            </span>
          </div>
        </div>

        {/* ====================================================================== */}
        {/* DOĞRU SVG YOLU: Lazer tam olarak butona saplanır                       */}
        {/* ====================================================================== */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
           <svg width="100%" height="100%" className="overflow-visible absolute top-0 left-0">
              <path 
                d="M 44 140 V 500 Q 44 530 74 530 H 1000" 
                stroke="rgba(255,255,255,0.05)" 
                strokeWidth="1.5" 
                fill="none" 
              />
              <motion.path
                d="M 44 140 V 500 Q 44 530 74 530 H 1000"
                stroke={colorHex}
                strokeWidth="2.5"
                fill="none"
                style={{ filter: `drop-shadow(0 0 5px ${colorHex})` }}
                initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 0.2, 0.2], 
                  pathOffset: [0, 0.8, 1], 
                  opacity: [0, 1, 0] 
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
           </svg>
        </div>

        {/* Log Listesi */}
        <div className="flex flex-col gap-8 relative z-10 pt-10 pl-8">
          {logs.map((log, index) => (
            <div key={log.id} className="flex items-start gap-6">
              
              <div className="relative flex items-center justify-center mt-1 shrink-0">
                <div className="h-6 w-6 rounded-full bg-[#0a0a0c] border border-white/5 flex items-center justify-center shadow-md">
                   <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className={cn("h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor]", bgMain, textMain)} 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 pr-8">
                <h3 className="text-sm md:text-base font-mono font-bold text-slate-100 tracking-tight">
                  {log.message}
                </h3>
                <div className="flex items-center gap-2">
                  {log.status === "danger" ? (
                    <XOctagon className="h-3.5 w-3.5 text-rose-500" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#9eff00]" />
                  )}
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    {log.time}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ====================================================================== */}
        {/* PARLAYAN ACTION BUTONU (ABSOLUTE RIGHT BOTTOM)                         */}
        {/* ====================================================================== */}
        <div className="absolute bottom-10 right-8 flex justify-end z-30">
          <button className={cn(
            "group/btn relative flex items-center gap-2 overflow-hidden rounded-full px-8 py-3.5 transition-all duration-300 border bg-[#09090b] cursor-pointer",
            isRose 
              ? "border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.15)] hover:shadow-[0_0_35px_rgba(244,63,94,0.3)]" 
              : "border-[#9eff00]/40 shadow-[0_0_20px_rgba(158,255,0,0.15)] hover:shadow-[0_0_35px_rgba(158,255,0,0.3)]"
          )}>
            <div className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-md shadow-[0_0_10px_currentColor]",
              bgMain, textMain
            )} />

            <span className={cn("relative z-10 text-xs font-mono font-bold tracking-[0.2em] uppercase pl-2", textMain)}>
              Inspect Logs
            </span>
            <ArrowRight className={cn("relative z-10 h-4 w-4 transition-transform group-hover/btn:translate-x-1", textMain)} />
            
            <motion.div 
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            />
          </button>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// MAIN SECTION WRAPPER
// ============================================================================

const binboiLogs: LogEntry[] = [
  { id: "1", message: "Malicious IP range block enforced.", time: "SYS_TIME: 14:09:22", status: "danger" },
  { id: "2", message: "DDoS signature mitigated on edge port.", time: "SYS_TIME: 14:12:05", status: "danger" },
  { id: "3", message: "Global Node status updated to ONLINE.", time: "SYS_TIME: 14:15:59", status: "success" },
];

const chessLogs: LogEntry[] = [
  { id: "4", message: "Board state evaluated: +1.24 advantage.", time: "SYS_TIME: 11:23:01", status: "success" },
  { id: "5", message: "Deep search depth 24 completed in 1.2s.", time: "SYS_TIME: 12:45:12", status: "success" },
  { id: "6", message: "Alpha-beta pruning optimized branch paths.", time: "SYS_TIME: 13:02:44", status: "success" },
];

export function MiransasSecurityFeatures() {
  return (
    <section className="w-full flex flex-col items-center py-32 bg-[#020203] selection:bg-rose-500 selection:text-white">
      
      <div className="text-center mb-20 flex flex-col items-center px-6">
        <div className="flex items-center justify-center p-4 rounded-2xl bg-[#09090b] shadow-2xl relative overflow-hidden">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-dashed border-rose-500/30 rounded-2xl" />
          <TerminalSquare className="h-8 w-8 text-rose-500 relative z-10" />
        </div>
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white drop-shadow-xl">
          System <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-white to-[#9eff00]">
            Diagnostics
          </span>
        </h2>
        <p className="mt-6 max-w-2xl text-sm md:text-base font-mono text-slate-500 leading-relaxed">
          Real-time core logs streaming constantly. Continuous diagnostics from edge networks to compile-time guarantees.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 w-full max-w-[1600px] px-6 lg:px-12">
        <SystemLogCard 
          title="Binboi.com Global Defense"
          description="Identify and drop malicious packets before they reach the control plane. Zero-trust architecture enforced at the edge layer."
          statusText="Live Attack Mitigation"
          logs={binboiLogs}
          themeColor="rose"
          Icon={ShieldAlert}
        />
        <SystemLogCard 
          title="Miransas Chess Engine"
          description="Powered by a high-performance Rust core. Calculate millions of positions per second with zero memory overhead."
          statusText="Position Evaluation Active"
          logs={chessLogs}
          themeColor="lime"
          Icon={Cpu}
          link="/chess"
        />
      </div>
    </section>
  );
}