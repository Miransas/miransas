"use client";

import { motion } from "framer-motion";

export function GhostAnimation() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[400px] overflow-hidden">
      <motion.div
        // Büyük boyut, geniş yatay ve dikey hareket alanı
        animate={{
          x: [-30, 30, -30],      // Sağa sola geniş hareket
          y: [-20, 20, -20],      // Yukarı aşağı süzülme
          rotate: [-5, 5, -5],    // Hafif sağa sola salınım
        }}
        transition={{
          duration: 6,            // Yavaş ve akışkan olması için süre
          repeat: Infinity,       // Sonsuz döngü
          ease: "easeInOut",      // Yumuşak başlangıç ve bitiş
        }}
        className="relative w-[40rem] h-[40rem] md:w-80 md:h-80 drop-shadow-[0_20px_50px_rgba(255,255,255,0.15)]"
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-zinc-100"
        >
          {/* Elindeki SVG path verisini buraya koyabilirsin */}
          <path
            d="M55 75 C 35 25, 95 10, 115 20 C 150 35, 175 60, 160 110 C 145 160, 130 175, 105 165 C 90 155, 85 140, 70 155 C 55 170, 35 165, 45 125 C 50 100, 30 110, 55 75 Z"
            fill="currentColor"
          />
          
          {/* Sol Göz */}
          <ellipse
            cx="110"
            cy="85"
            rx="7"
            ry="11"
            fill="#18181b"
            transform="rotate(-15 110 85)"
          />
          
          {/* Sağ Göz */}
          <ellipse
            cx="135"
            cy="92"
            rx="7"
            ry="11"
            fill="#18181b"
            transform="rotate(-15 135 92)"
          />
        </svg>
      </motion.div>
    </div>
  );
}