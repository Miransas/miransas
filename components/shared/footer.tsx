"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { footerNavLinks, SOCIAL_LINKS } from "../../constants";


export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 px-6 relative overflow-hidden">
            {/* Background Noise Effect */}


            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">

                {/* --- TOP: LEGAL DIRECTORY --- */}
                <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12">
                    {footerNavLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-[12px] uppercase tracking-[0.6em] text-stone-300 hover:text-white transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    {/* <span className="hidden md:inline text-gray-800">|</span>
          <a href="/contact" className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors">Contact Support</a> */}
                </nav>

                {/* --- CENTER: CORE LOGO --- */}
                <div className="mb-12">
                    <Image
                        src="/logo/logo.png" // Senin paylaştığın V logosu
                        alt="Miransas Studio Logo"
                        width={80}
                        height={80}
                        className="opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500"
                    />
                </div>

                {/* --- SOCIAL CHANNELS (İstediğin Instagram, X, YT, Kick) --- */}
                <div className="flex items-center gap-6 mb-12">
                    {SOCIAL_LINKS.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white transition-all hover:scale-110 group"
                            title={social.name}
                        >
                            <social.icon size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                        </a>
                    ))}
                </div>

                {/* --- BOTTOM: STUDIO INTEL --- */}
                <div className="w-full pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[12px] font-mono text-gray-200 uppercase tracking-[0.3em]">
                    <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                        <p>© {currentYear} Miransas Studio Publishing, Inc.</p>

                    </div>
                    <div>
                        <p>
                            Lost Signal is comming
                        </p>
                    </div>

                </div>
                <div className="w-full p-4 border-t flex text-center justify-center items-center ">
                    <Link href="https://instagram.com/asardorazimov" className="flex gap-3">
                        <Image src="/logo/sazimov.png" alt="Azimov" width={35} height={35} />
                        <span className="flex mt-3 font-bold ">Founded by Sardor Azimov // HQ: </span>
                    </Link>

                </div>

            </div>
        </footer>
    );
}