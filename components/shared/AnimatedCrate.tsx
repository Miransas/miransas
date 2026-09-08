"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AnimatedCrate() {
  return (
    <div className="flex items-center justify-center min-h-[300px] bg-slate-950 p-6">
      {/* Framer Motion ile süzülme ve etkileşim efektleri */}
      <motion.div
        className="cursor-pointer"
        initial={{ y: 0 }}
        animate={{ 
          y: [-10, 10, -10], // Yukarı aşağı süzülme efekti
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.1, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="240"
          height="240"
          viewBox="0 0 240 240"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
          aria-label="Crate"
          stroke="none"
          className="drop-shadow-2xl"
        >
          {/* SVG İçerikleriniz */}
          <path d="M115.67 91.2Q120 88.7 124.33 91.2L217.67 145.09Q222 147.59 222 152.59L222 158.08Q222 163.08 217.67 165.58L124.33 219.47Q120 221.97 115.67 219.47L22.33 165.58Q18 163.08 18 158.08L18 152.59Q18 147.59 22.33 145.09Z" fill="#26332a" stroke="none" />
          <path d="M217.67 150.09Q222 147.59 222 152.59L222 158.08Q222 163.08 217.67 165.58L124.33 219.47Q120 221.97 120 216.97L120 206.47Z" fill="#324137" stroke="none" />
          <path d="M22.33 150.09Q18 147.59 18 152.59L18 158.08Q18 163.08 22.33 165.58L115.67 219.47Q120 221.97 120 216.97L120 206.47Z" fill="#405044" stroke="none" />
          <path d="M115.67 91.2Q120 88.7 124.33 91.2L217.67 145.09Q222 147.59 217.67 150.09L120 206.47L22.33 150.09Q18 147.59 22.33 145.09Z" fill="#26332a" stroke="none" />
          <path d="M115.67 91.2Q120 88.7 124.33 91.2L217.67 145.09Q222 147.59 222 152.59L222 158.08Q222 163.08 217.67 165.58L124.33 219.47Q120 221.97 115.67 219.47L22.33 165.58Q18 163.08 18 158.08L18 152.59Q18 147.59 22.33 145.09Z" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M120 206.47L220.92 148.21" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M120 206.47L19.08 148.21" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M120 206.47L120 220.72" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M115.67 57.1Q120 54.6 124.33 57.1L190.83 95.49Q195.16 97.99 195.16 102.99L195.16 142.59Q195.16 147.59 190.83 150.09L124.33 188.48Q120 190.98 115.67 188.48L49.17 150.09Q44.84 147.59 44.84 142.59L44.84 102.99Q44.84 97.99 49.17 95.49Z" fill="#17160f" stroke="none" />
          <path d="M190.83 100.49Q195.16 97.99 195.16 102.99L195.16 142.59Q195.16 147.59 190.83 150.09L124.33 188.48Q120 190.98 120 185.98L120 141.39Z" fill="#221f16" stroke="none" />
          <path d="M49.17 100.49Q44.84 97.99 44.84 102.99L44.84 142.59Q44.84 147.59 49.17 150.09L115.67 188.48Q120 190.98 120 185.98L120 141.39Z" fill="#2e2a1e" stroke="none" />
          <path d="M115.67 57.1Q120 54.6 124.33 57.1L190.83 95.49Q195.16 97.99 190.83 100.49L120 141.39L49.17 100.49Q44.84 97.99 49.17 95.49Z" fill="#17160f" stroke="none" />
          <path d="M115.67 57.1Q120 54.6 124.33 57.1L190.83 95.49Q195.16 97.99 195.16 102.99L195.16 142.59Q195.16 147.59 190.83 150.09L124.33 188.48Q120 190.98 115.67 188.48L49.17 150.09Q44.84 147.59 44.84 142.59L44.84 102.99Q44.84 97.99 49.17 95.49Z" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M120 141.39L194.08 98.62" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M120 141.39L45.92 98.62" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M120 141.39L120 189.73" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M115.67 64.54Q120 62.04 124.33 64.54L177.94 95.49Q182.27 97.99 177.94 100.49L124.33 131.45Q120 133.95 115.67 131.45L62.06 100.49Q57.73 97.99 62.06 95.49Z" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M120 104.19L120 63.29" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M120 104.19L145.77 119.07" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M120 104.19L94.23 119.07" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M115.67 20.53Q120 18.03 124.33 20.53L190.83 58.92Q195.16 61.42 195.16 63.28L195.16 65.14Q195.16 67 190.83 69.5L124.33 107.89Q120 110.39 115.67 107.89L49.17 69.5Q44.84 67 44.84 65.14L44.84 63.28Q44.84 61.42 49.17 58.92Z" fill="#e0603a" stroke="none" />
          <path d="M190.83 63.92Q195.16 61.42 195.16 63.28L195.16 65.14Q195.16 67 190.83 69.5L124.33 107.89Q120 110.39 120 108.53L120 104.81Z" fill="#b94e2e" stroke="none" />
          <path d="M49.17 63.92Q44.84 61.42 44.84 63.28L44.84 65.14Q44.84 67 49.17 69.5L115.67 107.89Q120 110.39 120 108.53L120 104.81Z" fill="#963e23" stroke="none" />
          <path d="M115.67 20.53Q120 18.03 124.33 20.53L190.83 58.92Q195.16 61.42 190.83 63.92L120 104.81L49.17 63.92Q44.84 61.42 49.17 58.92Z" fill="#e0603a" stroke="none" />
          <path d="M115.67 20.53Q120 18.03 124.33 20.53L190.83 58.92Q195.16 61.42 195.16 63.28L195.16 65.14Q195.16 67 190.83 69.5L124.33 107.89Q120 110.39 115.67 107.89L49.17 69.5Q44.84 67 44.84 65.14L44.84 63.28Q44.84 61.42 49.17 58.92Z" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M120 104.81L194.54 61.78" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M120 104.81L45.46 61.78" fill="none" stroke="#fafafa" strokeWidth="1.5" />
          <path d="M120 104.81L120 109.14" fill="none" stroke="#fafafa" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}