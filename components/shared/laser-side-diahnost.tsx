/* eslint-disable react-hooks/purity */
"use client";

import { motion } from "framer-motion";

// ============================================================================
// SIDE DIAGNOSTICS (Lazerin Yanındaki Boşluğu Dolduran Metinler)
// ============================================================================
const floatingData = [
  { text: "KERNEL_INIT_SUCCESS", side: "left", top: "20%" },
  { text: "STABILITY_CHECK: 100%", side: "right", top: "15%" },
  { text: "LATENCY: 0.001ms", side: "left", top: "45%" },
  { text: "ENCRYPTION: AES-256", side: "right", top: "50%" },
  { text: "NODE_STRENGTH: OPTIMAL", side: "left", top: "75%" },
  { text: "UPTIME: 99.9999%", side: "right", top: "80%" },
];

export const LaserSideDiagnostics = () => {
  return (
    <div className="absolute inset-0 -translate-y-80 pointer-events-none overflow-hidden hidden lg:block">
      {floatingData.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: item.side === "left" ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.1 + i * 0.05,
          }}
          className={`absolute font-mono text-[10px] tracking-[0.3em] font-bold uppercase
            ${item.side === "left" ? "left-[10%] md:left-[20%] text-right" : "right-[10%] md:right-[20%] text-left"}
            ${i % 2 === 0 ? "cycle-text" : "text-white/20"} // Bazıları parlayacak, bazıları sönük kalacak
          `}
          style={{ top: item.top }}
        >
          {/* Yan taraftaki minik veri akışı simgesi */}
          <div className={`flex items-center gap-4 ${item.side === "right" ? "flex-row-reverse" : ""}`}>
             <div className="h-[1px] w-12 cycle-bg opacity-30" />
             <span>{item.text}</span>
          </div>
          
          {/* Hareketli Glitch Efekti (Opsiyonel) */}
          <motion.div 
            animate={{ opacity: [0, 1, 0], x: [0, 5, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 5 }}
            className="absolute inset-0 text-white/40 blur-[1px]"
          >
            {item.text}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};