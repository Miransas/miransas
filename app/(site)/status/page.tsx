"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Globe,
  ShieldCheck,
  Server,
  Database,
  Wifi,
} from "lucide-react";

const services = [
  {
    name: "Web Platform",
    status: "Operational",
    latency: "24ms",
    uptime: "99.99%",
    icon: Globe,
  },
  {
    name: "API Gateway",
    status: "Operational",
    latency: "18ms",
    uptime: "99.98%",
    icon: Activity,
  },
  {
    name: "Authentication",
    status: "Operational",
    latency: "12ms",
    uptime: "100%",
    icon: ShieldCheck,
  },
  {
    name: "Infrastructure",
    status: "Operational",
    latency: "31ms",
    uptime: "99.97%",
    icon: Server,
  },
  {
    name: "Database",
    status: "Operational",
    latency: "9ms",
    uptime: "99.99%",
    icon: Database,
  },
  {
    name: "Network",
    status: "Operational",
    latency: "22ms",
    uptime: "99.95%",
    icon: Wifi,
  },
];

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-300 selection:bg-emerald-500/20">
      
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-emerald-500/5 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-28 relative z-10">

        {/* Header */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-white/10 bg-white/5 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-zinc-400">
              Live System Status
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-5">
            Status{" "}
            <span className="text-zinc-700">
              Page.
            </span>
          </h1>

          <p className="max-w-2xl text-zinc-500 text-lg font-light leading-relaxed">
            Real-time operational status and infrastructure availability
            across the Miransas ecosystem.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-8 text-sm font-mono text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              All systems operational
            </span>

            <span>99.98% uptime</span>

            <span>
              {new Date().toLocaleTimeString("en-US")}
            </span>
          </div>
        </header>

        {/* Services */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-3xl border border-white/5 bg-[#0a0a0a] p-6 hover:border-emerald-500/20 transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h3 className="text-white font-semibold">
                        {service.name}
                      </h3>

                      <p className="text-xs text-zinc-600 font-mono mt-1 uppercase tracking-wider">
                        {service.status}
                      </p>
                    </div>
                  </div>

                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mt-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2 font-mono">
                      Latency
                    </div>

                    <div className="text-xl font-bold italic text-white">
                      {service.latency}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2 font-mono">
                      Uptime
                    </div>

                    <div className="text-xl font-bold italic text-white">
                      {service.uptime}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Incident History */}
        <section className="border-t border-white/5 pt-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 rounded-full bg-zinc-600" />

            <h2 className="text-sm uppercase tracking-[0.3em] font-black text-zinc-500">
              Recent Incidents
            </h2>
          </div>

          <div className="space-y-6">
            
            <div className="border border-white/5 rounded-2xl p-5 bg-[#080808]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold">
                  No active incidents
                </h3>

                <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-mono">
                  Stable
                </span>
              </div>

              <p className="text-sm text-zinc-500 leading-relaxed">
                All systems are currently operating normally without any
                known disruptions or degraded performance.
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}