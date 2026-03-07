/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { footerNavLinks, SOCIAL_LINKS } from "../../constants";

export default function Footer({ card, index, hovered, setHovered, beamActive }: any) {
     const active = hovered === index;
    const currentYear = new Date().getFullYear();

    return (
        <footer className=" border-t border-white/5 pt-16 pb-8 px-6 relative overflow-hidden">
            
            {/* --- OLD ANIMATION RESTORED: SIBER TARAMA --- */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                {/* Grainy Noise Effect */}
                <div className="absolute inset-0  mix-blend-overlay" />
                
                {/* Moving Scan Line (Lazer Hattı) */}
                <motion.div 
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF4F00]/40 to-transparent shadow-[0_0_15px_#FF4F00]"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">

                {/* --- TOP: LEGAL DIRECTORY (Mobile Fix) --- */}
                <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mb-12 w-full px-4 text-center">
                    {footerNavLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-[10px] md:text-[12px] uppercase tracking-[0.2em] md:tracking-[0.6em] text-stone-400 hover:text-white transition-all duration-300"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* --- CENTER: CORE LOGO --- */}
                <div className="mb-12">
                    <Image
                        src="/logo/logo.png"
                        alt="Miransas Studio Logo"
                        width={80}
                        height={80}
                        className="opacity-70 hover:opacity-100 transition-all grayscale hover:grayscale-0 duration-500 scale-90 hover:scale-100"
                    />
                </div>

                {/* --- SOCIAL CHANNELS --- */}
                <div className="flex items-center gap-6 mb-12">
                    {SOCIAL_LINKS.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-500 hover:text-white transition-all hover:scale-110 group"
                            title={social.name}
                        >
                            <social.icon size={18} className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                        </a>
                    ))}
                </div>

                {/* --- BOTTOM: STUDIO INTEL --- */}
                <div className="w-full pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] md:text-[12px] font-mono text-gray-500 uppercase tracking-[0.2em] border-t border-white/5">
                    <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                        <p>© {currentYear} Miransas Studio Publishing, Inc.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#FF4F00] rounded-full animate-pulse" />
                        <p className="text-stone-300">Lost Signal is Coming</p>
                    </div>
                </div>

                {/* --- FOUNDER SECTION --- */}
                <div className="w-full mt-10 pt-8 border-t border-white/5 flex justify-center">
                    <Link 
                        href="https://instagram.com/asardorazimov" 
                        className="flex flex-col sm:flex-row items-center gap-4 group transition-all"
                    >
                        <div className="relative">
                            <Image 
                                src="/logo/sazimov.png" 
                                alt="Sardor Azimov" 
                                width={40} 
                                height={40} 
                                className="rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all"
                            />
                            <div className="absolute inset-0 rounded-full bg-[#FF4F00]/10 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                        <span className="text-[11px] font-bold tracking-widest text-stone-500 group-hover:text-white transition-colors">
                            Founded by Sardor Azimov // HQ: 
                        </span>
                    </Link>
                </div>

            </div>
        </footer>
    );
}