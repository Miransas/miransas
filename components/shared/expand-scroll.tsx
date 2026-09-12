"use client";
import React from 'react';
import { 
  Search, 
  PenTool, 
  Settings, 
  RefreshCw, 
  Rocket, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Globe 
} from 'lucide-react';
import ScrollExpand from '../ScrollExpand';
import { motion } from 'framer-motion';

const featuresData = [
  {
    id: "01",
    title: "Discovery & Audit",
    description: "We analyze your business workflows, bottlenecks, and revenue opportunities.",
    icon: Search,
    // Kart içi mini UI önizleme verisi
    preview: {
      header: "Workflow Audit",
      badge: "Completed",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
      items: [
        { label: "Bottlenecks", value: "Identified", color: "text-zinc-900 font-medium" },
        { label: "ROI Target", value: "3.4x", color: "text-indigo-600 font-semibold" },
        { label: "Data Audit", value: "Verified", color: "text-emerald-600 font-medium" },
      ]
    }
  },
  {
    id: "02",
    title: "Automation Blueprint",
    description: "We design a detailed automation architecture aligned with your KPIs.",
    icon: PenTool,
    preview: {
      header: "Blueprint Spec",
      badge: "v2.4 Active",
      badgeColor: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
      items: [
        { label: "Architecture", value: "Event-driven", color: "text-zinc-900 font-medium" },
        { label: "Latency", value: "< 45ms", color: "text-emerald-600 font-medium" },
        { label: "Triggers", value: "14 active", color: "text-zinc-700 font-medium" },
      ]
    }
  },
  {
    id: "03",
    title: "Build & Integration",
    description: "Our engineers implement AI systems and integrate with existing tools.",
    icon: Settings,
    preview: {
      header: "API Connectors",
      badge: "Live Sync",
      badgeColor: "bg-sky-500/10 text-sky-600 border-sky-200",
      items: [
        { label: "REST / gRPC", value: "Connected", color: "text-emerald-600 font-medium" },
        { label: "Auth Layer", value: "OAuth 2.0", color: "text-zinc-900 font-medium" },
        { label: "Webhooks", value: "99.99%", color: "text-emerald-600 font-medium" },
      ]
    }
  },
  {
    id: "04",
    title: "Testing & Scaling",
    description: "Continuous testing, data validation, and real-time system refinement.",
    icon: RefreshCw,
    preview: {
      header: "System Health",
      badge: "Optimal",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
      items: [
        { label: "Stress Test", value: "Passed", color: "text-emerald-600 font-medium" },
        { label: "Failover", value: "Auto-scale", color: "text-zinc-900 font-medium" },
        { label: "Uptime SLA", value: "99.9%", color: "text-indigo-600 font-semibold" },
      ]
    }
  },
];

const badges = [
  { label: "SOC 2 Type II", icon: ShieldCheck },
  { label: "GDPR ready", icon: CheckCircle2 },
  { label: "ISO 27001", icon: Zap },
  { label: "High Availability", icon: Globe },
];

export default function ExpandScroll() {
  return (
    <main className="min-h-screen bg-transparent">
      <ScrollExpand
        src="https://res.cloudinary.com/dwdk20m6q/image/upload/v1789081538/ChatGPT_Image_Sep_11_2026_02_05_26_AM_vz9rct.png"
        alt="Miransas — independent software studio"
        scrollHint="Scroll to see what's live"
        title="Independent by design"
        useWindowScroll
      >
        <div className="py-20 px-6 max-w-7xl mx-auto bg-transparent">
          
          {/* ÜST BAŞLIK ALANI */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
              Engineered for seamless scaling.
            </h2>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
              From audit to execution. We build high-throughput automated systems designed to grow with your business.
            </p>
          </div>

          {/* MINIMAL GRID KARTLAR (4 SÜTUN) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {featuresData.map((item, index) => {
              const MainIcon = item.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group relative flex flex-col justify-between p-5 rounded-[2rem] bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xl border border-white/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300"
                >
                  {/* KART İÇİ MİNİ UI WIDGET (Üst Yüzen Kutu) */}
                  <div className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-zinc-800/80 mb-6">
                    
                    {/* UI Widget Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-zinc-800">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-slate-900 text-white">
                          <MainIcon size={14} />
                        </div>
                        <span className="text-xs font-medium text-slate-800 dark:text-zinc-200">
                          {item.preview.header}
                        </span>
                      </div>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${item.preview.badgeColor}`}>
                        {item.preview.badge}
                      </span>
                    </div>

                    {/* UI Widget Satır Verileri */}
                    <div className="space-y-2">
                      {item.preview.items.map((row, rIdx) => (
                        <div key={rIdx} className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-normal">{row.label}</span>
                          <span className={`text-xs ${row.color}`}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KART ALT İÇERİK (Başlık + Açıklama) */}
                  <div className="px-1">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ALT ROZET DİZİSİ (SOC 2, GDPR vb.) */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-6 border-t border-slate-200/40">
            {badges.map((badge, idx) => {
              const BadgeIcon = badge.icon;
              return (
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors">
                  <BadgeIcon size={15} />
                  <span>{badge.label}</span>
                </div>
              );
            })}
          </div>

        </div>
      </ScrollExpand>
    </main>
  );
}