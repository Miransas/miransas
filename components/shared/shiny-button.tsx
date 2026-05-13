"use client";
import { motion } from 'framer-motion';
import Link from 'next/link'; // Next.js kullanıyorsan bunu ekle
import { cn } from '../../lib/utils';

const ShinyButton = ({ label, isRose, href }: { label: string, isRose?: boolean, href: string }) => (
  <Link 
    href={href} 
    className={cn(
      "relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 border bg-black/50 transition-all duration-300 hover:scale-105",
      isRose 
        ? "border-rose-500/40 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.1)]" 
        : "border-[#9eff00]/40 text-[#9eff00] shadow-[0_0_15px_rgba(158,255,0,0.1)]"
    )}
  >
    <span className="text-[10px] font-mono font-bold tracking-widest uppercase relative z-10">
      {label}
    </span>
    
    <motion.div 
      animate={{ x: ["-100%", "200%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
    />
  </Link>
);

export default ShinyButton;