"use client";

import React from "react";

// --- ANA SAYFA BİLEŞENİ ---
export default function PipelineHero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] font-sans text-slate-200">
      
      {/* ATMOSFERİK ARKA PLAN IŞIKLARI */}
      {/* Sağ üstteki sıcak turuncu/bakır parlama */}
      <div 
        className="pointer-events-none absolute -right-40 -top-40 h-[800px] w-[800px] opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle at center, rgba(234, 88, 12, 0.4), transparent 60%)" }}
      />
      {/* Sol alttaki soğuk mavi parlama */}
      <div 
        className="pointer-events-none absolute -left-40 top-1/4 h-[600px] w-[600px] opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.3), transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24">
        
        {/* KAHRAMAN METNİ (HERO TEXT) */}
        <div className="mb-16 max-w-3xl">
          <h1 className="mb-6 text-5xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl">
            Real-Time Data Pipelines in Python. <br />
            <span className="text-white/60">No Kafka. No Flink. Just Python.</span>
          </h1>
          <p className="mb-8 max-w-xl text-lg text-white/50">
            A serverless and production-ready setup that empowers everyone in your data team to build and transform event-driven data pipelines.
          </p>
          <div className="flex items-center gap-4">
            <button className="rounded-md bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-slate-200">
              Try for free
            </button>
            <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:text-white">
              Documentation <span>→</span>
            </button>
          </div>
        </div>

        {/* BÜYÜK KONTROL PANELİ (GLASS PANEL) */}
        <div className="relative w-full rounded-2xl border border-white/10 bg-[#0a0a0a]/80 shadow-2xl backdrop-blur-xl">
          
          {/* Panelin içindeki üst sıcak parlama (Sağ üstten vuran ışık efekti) */}
          <div 
            className="pointer-events-none absolute right-0 top-0 h-96 w-96 opacity-40 blur-[80px]"
            style={{ background: "radial-gradient(circle at top right, rgba(234, 88, 12, 0.2), transparent 70%)" }}
          />

          {/* SEKMELER (TABS) */}
          <div className="flex items-center gap-8 border-b border-white/5 px-8 pt-6 pb-4 text-xs font-semibold tracking-wider text-white/40">
            <span className="text-white/90">PRICE RECOMMENDATION</span>
            <span className="hover:text-white/70 cursor-pointer transition-colors">ANOMALY DETECTION</span>
            <span className="hover:text-white/70 cursor-pointer transition-colors">CLICKSTREAM DASHBOARD</span>
          </div>

          {/* AKIŞ ŞEMASI ALANI (PIPELINE CANVAS) */}
          <div className="relative h-[500px] w-full overflow-x-auto overflow-y-hidden">
            <div className="relative min-w-[1000px] h-full">
              
              {/* Arka plan ızgarası (Grid) */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)`,
                  backgroundSize: "24px 24px"
                }}
              />

              {/* BAĞLANTI ÇİZGİLERİ (SVGs & Divs) */}
              {/* Debezium -> GlassFlow Line */}
              <div className="absolute left-[180px] top-[260px] h-[1px] w-[110px] bg-white/15" />
              {/* GlassFlow -> OpenAI Line (Vertical then Horizontal) */}
              <div className="absolute left-[450px] top-[140px] h-[50px] w-[1px] bg-white/15" />
              {/* GlassFlow -> Right Nodes Line (Branching) */}
              <div className="absolute left-[650px] top-[260px] h-[1px] w-[70px] bg-white/15" />
              <div className="absolute left-[720px] top-[180px] h-[150px] w-[1px] bg-white/15" />
              <div className="absolute left-[720px] top-[180px] h-[1px] w-[60px] bg-white/15" />
              <div className="absolute left-[720px] top-[330px] h-[1px] w-[60px] bg-white/15" />

              {/* NODELAR (KARTLAR) */}
              
              {/* 1. Debezium Node (Sol) */}
              <div className="absolute left-[40px] top-[200px]">
                <NodeCard 
                  title="Debezium" 
                  icon={<IconDatabase />} 
                  glowColor="rgba(59, 130, 246, 0.4)" 
                />
                <span className="absolute -right-[90px] top-[45px] text-[10px] text-white/40">Change data capture</span>
              </div>

              {/* 2. OpenAI Node (Üst Merkez) */}
              <div className="absolute left-[400px] top-[60px]">
                <NodeCard 
                  title="OpenAI" 
                  icon={<IconAI />} 
                  glowColor="rgba(168, 85, 247, 0.4)" 
                />
              </div>

              {/* 3. Ana Merkez: GlassFlow Büyük Kutu */}
              <div className="absolute left-[290px] top-[190px] h-[140px] w-[360px] rounded-xl border border-white/10 bg-gradient-to-r from-[#1e2235]/40 to-[#2a203b]/40 p-4 shadow-xl backdrop-blur-md">
                {/* Statik Glow */}
                <div className="absolute -inset-px opacity-30 blur-2xl" style={{ background: "radial-gradient(circle at center, rgba(120, 119, 198, 0.3), transparent 70%)" }} />
                
                <div className="relative z-10 flex h-full w-full items-center justify-between gap-2">
                  <SmallBox title="Integration sources" />
                  
                  {/* Data Transformation Shapes */}
                  <div className="flex h-[80px] w-[100px] flex-wrap items-center justify-center gap-2 rounded-lg bg-[#000000]/40 p-2 border border-white/5 relative">
                    <span className="absolute -top-3 -right-3 rounded-full bg-slate-800 p-1 text-[8px] border border-white/10">.py</span>
                    <div className="h-3 w-3 rounded-full bg-orange-500" />
                    <div className="h-0 w-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-blue-400" />
                    <div className="h-3 w-6 bg-slate-400 rounded-sm" />
                    <div className="h-4 w-4 bg-purple-500/80 rotate-45" />
                    <div className="absolute -bottom-6 text-[10px] text-white/40 w-full text-center">Data transformation</div>
                  </div>

                  <SmallBox title="Integration destinations" />
                </div>
              </div>

              {/* 4. Web App Node (Sağ Üst) */}
              <div className="absolute left-[780px] top-[130px]">
                <NodeCard 
                  title="Web app" 
                  icon={<IconMonitor />} 
                  glowColor="rgba(234, 88, 12, 0.3)" 
                />
                <span className="absolute -left-[50px] top-[50px] text-[10px] text-white/40">Notify</span>
              </div>

              {/* 5. BI and Analytics Node (Sağ Alt) */}
              <div className="absolute left-[780px] top-[280px]">
                <NodeCard 
                  title="BI and Analytics" 
                  icon={<IconChart />} 
                  glowColor="rgba(234, 88, 12, 0.3)" 
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- ALT BİLEŞENLER (SUB-COMPONENTS) ---

function NodeCard({ title, icon, glowColor }: { title: string, icon: React.ReactNode, glowColor: string }) {
  return (
    <div className="relative flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#121212] px-6 py-5 shadow-lg backdrop-blur-md">
      {/* Kartın arkasındaki statik parlama */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-40 blur-xl"
        style={{ background: `radial-gradient(circle at center, ${glowColor}, transparent 60%)` }}
      />
      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#1a1a1a] shadow-inner text-white/80">
        {icon}
      </div>
      <span className="relative z-10 text-xs font-medium text-white/80">{title}</span>
    </div>
  );
}

function SmallBox({ title }: { title: string }) {
  return (
    <div className="flex h-[70px] w-[90px] flex-col items-center justify-center rounded-lg border border-white/5 bg-[#1a1a1a]/80 shadow-inner px-2 text-center">
      <span className="text-[10px] leading-tight text-white/60">{title}</span>
    </div>
  );
}

// --- SVG IKONLAR ---

function IconDatabase() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  );
}

function IconAI() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}

function IconMonitor() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  );
}