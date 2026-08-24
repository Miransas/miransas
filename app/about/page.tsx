"use client";

import { motion } from "framer-motion";

const miransasParagraphs = [
  "Miransas is a software company developing next-generation AI voice tools and advanced web applications. We build high-performance systems designed for the modern web.",
  "From memory-safe backend architectures built with Rust and Tokio to ultra-responsive Next.js frontends, every layer of our ecosystem is engineered for speed, scale, and absolute reliability.",
];

const miralasParagraphs = [
  "Miralas is our flagship AI voice synthesis platform, engineered for real-time speech generation and custom voice cloning with sub-second latency.",
  "Powered by advanced neural pipelines and multilingual dataset scripts, Miralas brings human-like voice agents to life, seamlessly blending cutting-edge machine learning with production-grade reliability.",
];

export default function AboutPage() {
  return (
    <section id="about" className="relative bg-black px-6 py-28 md:py-36">
      <div className="mx-auto max-w-3xl space-y-24">
        
        {/* Bölüm 1: Miransas */}
        <div>
          <p className="eyebrow text-emerald-500 font-mono">Miransas</p>
          <div className="mt-8 space-y-10">
            {miransasParagraphs.map((text) => (
              <motion.p
                key={text.slice(0, 24)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-[22px] leading-[1.45] tracking-[-0.03em] text-[#fff3f0] md:text-[28px]"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Bölüm 2: Miralas */}
        <div className="border-t border-zinc-900 pt-24">
          <p className="eyebrow text-blue-400 font-mono">Miralas.io</p>
          <div className="mt-8 space-y-10">
            {miralasParagraphs.map((text) => (
              <motion.p
                key={text.slice(0, 24)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-[22px] leading-[1.45] tracking-[-0.03em] text-[#fff3f0] md:text-[28px]"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}