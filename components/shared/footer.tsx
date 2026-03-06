"use client";

import { useRef } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
    cubicBezier,
} from "framer-motion";
import { BsInstagram, BsX, BsYoutube } from "react-icons/bs";
import { InstagramIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StudioLogo {
    name: string;
    className?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
    "Legal",
    "Terms of Use",
    "Privacy Policy",
    "Careers",
    "Cookie Policy",
    "Support",
    "Code of Conduct",
];





const SOCIAL_ICONS = [
    {
        label: "YouTube",
        href: "#",
        svg: (
            <BsYoutube className="w-6 h-6 fill-current" />
        ),
    },
    {
        label: "Instagram",
        href: "#",
        svg: (
            <BsInstagram className="w-6 h-6 fill-current" />
        ),
    },
    {
        label: "X",
        href: "#",
        svg: (
            <BsX className="w-6 h-6 fill-current" />
        ),
    },


];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: cubicBezier(0.22, 1, 0.36, 1), delay: i * 0.07 },
    }),
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
        opacity: 1,
        transition: { duration: 0.5, delay: i * 0.06 },
    }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SocialSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <div
            ref={ref}
            className="relative border-b border-white/10 px-16 py-8 flex items-center justify-center gap-10"
        >
            {/* Corner decorators */}
            <span className="absolute left-8 top-1/2 -translate-y-1/2 flex gap-1 opacity-40">
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className="block w-1 h-1 rounded-full bg-white"
                        style={{ transform: `translate(${i % 2 === 0 ? -4 : 4}px, ${i === 1 ? 5 : -3}px)` }}
                    />
                ))}
            </span>

            <motion.span
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={0}
                className="font-['Barlow_Condensed',sans-serif] text-3xl font-black tracking-[0.12em] uppercase"
            >
                Stay Connected
            </motion.span>

            <ul className="flex gap-7 items-center list-none m-0 p-0">
                {SOCIAL_ICONS.map((icon, i) => (
                    <motion.li
                        key={icon.label}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={fadeIn}
                        custom={i + 1}
                    >
                        <motion.a
                            href={icon.href}
                            aria-label={icon.label}
                            className="text-white flex items-center justify-center"
                            whileHover={{ scale: 1.15, opacity: 0.7 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {icon.svg}
                        </motion.a>
                    </motion.li>
                ))}
            </ul>

            <span className="absolute right-8 top-1/2 -translate-y-1/2 flex gap-1 opacity-40">
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className="block w-1 h-1 rounded-full bg-white"
                        style={{ transform: `translate(${i % 2 === 0 ? 4 : -4}px, ${i === 1 ? -5 : 3}px)` }}
                    />
                ))}
            </span>
        </div>
    );
}

function NavSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <nav
            ref={ref}
            className="border-b border-white/10 px-16 py-6 flex flex-wrap items-center justify-center"
        >
            {NAV_LINKS.map((link, i) => (
                <span key={link} className="flex items-center">
                    <motion.a
                        href="#"
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={fadeUp}
                        custom={i * 0.5}
                        className="font-['Barlow_Condensed',sans-serif] text-xs font-bold tracking-[0.1em] uppercase text-white no-underline px-5"
                        whileHover={{ color: "#888" }}
                        transition={{ duration: 0.15 }}
                    >
                        {link}
                    </motion.a>
                    {i < NAV_LINKS.length - 1 && (
                        <span className="text-white/20 text-sm select-none">|</span>
                    )}
                </span>
            ))}
            {/* Privacy Choices */}
            <span className="flex items-center">
                <span className="text-white/20 text-sm select-none mx-0">|</span>
                <motion.a
                    href="#"
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={fadeUp}
                    custom={NAV_LINKS.length * 0.5}
                    className="font-['Barlow_Condensed',sans-serif] text-xs font-bold tracking-[0.1em] uppercase text-white no-underline px-5 flex items-center gap-1.5"
                    whileHover={{ color: "#888" }}
                >
                    Your Privacy Choices
                    <span className="inline-flex items-center bg-blue-600 text-white text-[8px] font-black px-1 py-0.5 rounded-sm leading-none">
                        ✓✗
                    </span>
                </motion.a>
            </span>
        </nav>
    );
}

function StudiosSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const renderRow = (logos: StudioLogo[], rowOffset: number) =>
        logos.map((logo, i) => (
            <motion.span
                key={logo.name}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={rowOffset + i}
                className={`font-['Barlow_Condensed',sans-serif] font-black uppercase text-white/85 whitespace-nowrap cursor-pointer ${logo.className ?? ""}`}
                whileHover={{ opacity: 1, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
            >
                {logo.name}
            </motion.span>
        ));

    return (
        <div ref={ref} className="border-b border-white/10 px-16 py-11">
            <div className="flex items-center justify-center flex-wrap gap-x-14 gap-y-4 mb-9">
        
            </div>
           
        </div>
    );
}

function RatingsSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <div ref={ref} className="px-16 pt-10 pb-4 flex flex-col items-center gap-6">
            <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={0}
                className="flex items-center gap-4"
            >
                {/* ESRB Privacy Certified */}
                

                {/* ESRB Mature 17+ */}
             
            </motion.div>

            <motion.p
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={1}
                className="text-xs text-white/50 tracking-wider text-center"
            >
                ©/TM/® 2026 Miransas Studio. All rights reserved. All trademarks are property of their respective owners in the Uzb  and other countries. See our{" "}
            </motion.p>
        </div>
    );
}



// ─── Main Footer ──────────────────────────────────────────────────────────────

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    // Subtle parallax on the whole footer background line
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["4%", "0%"]);

    return (
        <footer
            ref={footerRef}
            className="relative bg-black text-white overflow-hidden"
            style={{ fontFamily: "'Barlow', sans-serif" }}
        >
            {/* Subtle scroll-driven background gradient */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    y: bgY,
                    background:
                        "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)",
                }}
            />

            <SocialSection />
            <NavSection />
            <StudiosSection />
            <RatingsSection />
           
        </footer>
    );
}