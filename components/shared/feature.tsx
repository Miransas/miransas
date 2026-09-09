"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Sekme içeriklerini ve videoları buradan kolayca yönetebilirsin
const tabs = [
  {
    id: "agents",
    label: "Voice Agents",
    copy: "Deploy conversational AI that speaks and understands context instantly.",
    videoUrl: "https://res.cloudinary.com/dwdk20m6q/video/upload/v1787438529/150883-799711528_gfea37.mp4", // Kendi video yollarını buraya gir
  },
  {
    id: "cloning",
    label: "Voice Cloning",
    copy: "Create high-fidelity voice replicas with just 3 seconds of reference audio.",
    videoUrl: "https://res.cloudinary.com/dwdk20m6q/video/upload/v1788896592/6491689-uhd_4096_2160_25fps_neo9ck.mp4",
  },
  {
    id: "tts",
    label: "Studio TTS",
    copy: "Generate studio-quality, expressive voiceovers in multiple languages.",
    videoUrl: "https://res.cloudinary.com/dwdk20m6q/video/upload/v1788896598/8084507-uhd_3840_2160_25fps_raxool.mp4",
  },
  {
    id: "infrastructure",
    label: "Low Latency",
    copy: "Built on high-performance gRPC and Rust for zero-latency streaming.",
    videoUrl: "https://res.cloudinary.com/dwdk20m6q/video/upload/v1788895956/infra-demo_ftsho7.mov",
  },
] as const;

export function Features() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("agents");
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <section id="features" className="bg-[#050505] px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-[12px] uppercase tracking-[0.22em] text-[#17c9b6]/80">
          Core Capabilities
        </p>
        <h2 className="mt-5 max-w-2xl text-3xl tracking-[-0.04em] text-white md:text-5xl md:leading-[1.15]">
          One platform to run your entire voice stack.
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/60">
          Miransas brings your agents, TTS models, and voice cloning tools into one
          unified infrastructure, so you can build human-like experiences without latency issues.
        </p>

        {/* Butonlar */}
        <div className="mt-10 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`rounded-full px-4 py-1.5 text-sm transition-all duration-300 ${active === tab.id
                ? "bg-[#17c9b6] text-black font-medium"
                : "bg-white/[0.06] text-white/70 hover:bg-white/10"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Aktif Sekme İçeriği (Video + Metin) */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0d0d]"
        >
          {/* Sol taraf video (1.1fr), Sağ taraf içerik (0.9fr) */}
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">

            {/* VİDEO ALANI (En Başta) */}
            <div className="relative min-h-[320px] bg-black border-r border-white/10">
              <video
                key={current.videoUrl} // Video kaynağı değiştiğinde bileşeni yeniden yükler
                src={current.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-90"
              />
            </div>

            {/* İÇERİK ALANI */}
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-xl tracking-tight text-white">
                {current.copy}
              </p>
              <p className="mt-4 text-sm leading-6 text-white/40">
                Everything stays under your control, scaling seamlessly with our highly optimized inference engines.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}