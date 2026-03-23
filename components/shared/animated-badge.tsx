"use client";
import { motion } from "framer-motion";

interface AnimatedBadgeProps {
  text?: string;
  color?: "purple" | "blue" | "emerald" | "orange";
  className?: string;
}

const colorMap = {
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    glow: "bg-purple-500/40",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
    glow: "bg-blue-500/40",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    glow: "bg-emerald-500/40",
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    text: "text-orange-400",
    glow: "bg-orange-500/40",
  },
};

export function AnimatedBadge({ 
  text = "BETA", 
  color = "purple", 
  className = "" 
}: AnimatedBadgeProps) {
  const theme = colorMap[color];

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Arka Plan Pulsing Glow (Parlayan Katman) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute inset-0 blur-md rounded-full ${theme.glow}`}
      />

      {/* Ana Etiket Gövdesi */}
      <div className={`relative flex items-center gap-2 px-3 py-1 rounded-full border ${theme.bg} ${theme.border} backdrop-blur-sm`}>
        {/* Küçük Canlı Nokta */}
        <span className="relative flex h-1.5 w-1.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.glow}`}></span>
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${theme.glow}`}></span>
        </span>
        
        {/* Metin */}
        <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${theme.text}`}>
          {text}
        </span>
      </div>
    </div>
  );
}