/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ShaderAnimation } from "../shaders/shader";
import { GlowButton } from "../ui/glow-button";
import RobotEyes from "./RobotEyes";

export function HeroScroll() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /*
   * =====================================================
   * TRANSFORM / PARALLAX ANIMATIONS (YUKARI ÇEKİLDİ VE SIKIŞTIRILDI)
   * =====================================================
   */

  // Metin Animasyonları
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  // Arka Plan & Shader
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const shaderY = useTransform(scrollYProgress, [0.15, 0.8], [0, -60]);

  // Robot Yükselme Ve Büyüme (Daha yukarıda başlar, tatlıca yükselir)
  const robotY = useTransform(scrollYProgress, [0, 0.75], [0, -40]);
  const robotScale = useTransform(scrollYProgress, [0, 0.7], [0.95, 1.05]);

  // Çim Yükselme Katmanı (%125 yerine %65'ten başlar, karanlıktan aniden fırlamaz)
  const grassY = useTransform(scrollYProgress, [0, 0.8], ["65%", "0%"]);
  const grassScale = useTransform(scrollYProgress, [0, 0.7], [1.02, 1]);

  return (
    /* h-[250vh] yerine h-[180vh] yapılarak gereksiz uzun scroll kısaltıldı */
    <section ref={ref} className="relative h-[180vh] bg-background">
      {/* =================================================
          STICKY SCENE
      ================================================= */}
      <div className="sticky top-0 h-screen w-full overflow-hidden isolate">
        
        {/* SHADER BACKDROP */}
        <motion.div
          style={{ y: shaderY }}
          className="absolute inset-0 z-0 pointer-events-none will-change-transform opacity-70"
        >
          <ShaderAnimation />
        </motion.div>

        {/* HERO BACKGROUND IMAGE & GRADIENT */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 -top-20 z-0 pointer-events-none will-change-transform"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(/images/hero.jpg)",
              filter: "brightness(0.35) saturate(0.85) contrast(1.1)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
        </motion.div>

        {/* =================================================
            LEFT TEXT CONTENT (Biraz daha yukarı çekildi: top-[18%])
        ================================================= */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
          }}
          className="absolute left-6 top-[16%] z-50 w-[calc(100vw-3rem)] max-w-[680px] md:left-[7vw] md:top-[18%] lg:left-[8vw] lg:top-[20%] will-change-transform"
        >
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur-md px-3.5 py-1 text-xs font-mono text-muted-foreground shadow-sm"
          >
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            <span>Miransas Projects</span>
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.75, ease: "easeOut" }}
            className="mt-4 w-full text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08]"
          >
            Push the limits with{" "}
            <span className="text-gradient">flawless voice cloning.</span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.38, duration: 0.75, ease: "easeOut" }}
            className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground"
          >
            Miralas provides studio-quality multilingual text-to-speech and
            advanced voice synthesis infrastructure for creators and developers.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <GlowButton href="/about">
              Explore the project
            </GlowButton>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("next-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-card/50 px-5 text-sm font-medium text-foreground backdrop-blur transition-colors duration-200 hover:bg-secondary hover:text-primary"
            >
              <span>See how it works</span>
              <ArrowRight className="size-4" />
            </button>
          </motion.div>
        </motion.div>

        {/* =================================================
            RIGHT AI ORBIT / HUD (Biraz daha yukarı çekildi: top-[18%])
        ================================================= */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
          }}
          className="pointer-events-none absolute right-[6vw] top-[18%] z-40 hidden md:block w-[320px] lg:w-[380px] h-[360px] will-change-transform"
        >
          {/* Main orbital ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/60 [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]"
          >
            {/* Orbital amber lights */}
            <div className="absolute -top-[2px] left-1/2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            <div className="absolute right-[26px] top-[54px] h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.8)]" />
            <div className="absolute bottom-[36px] left-[48px] h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_14px_rgba(245,158,11,0.8)]" />
          </motion.div>

          {/* Secondary orbit */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 rotate-[35deg]"
          />

          {/* Center glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />

          {/* HUD Item 01 */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="absolute right-0 top-[28px] flex items-center gap-3"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground/60">01</span>
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/40" />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Voice AI</p>
              <p className="mt-0.5 text-xs font-semibold text-foreground">Neural synthesis</p>
            </div>
          </motion.div>

          {/* HUD Item 02 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="absolute right-[20px] top-[150px] flex items-center gap-3"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground/60">02</span>
            <div className="h-px w-6 bg-gradient-to-r from-transparent to-primary/40" />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Multilingual</p>
              <p className="mt-0.5 text-xs font-semibold text-foreground">128+ languages</p>
            </div>
          </motion.div>

          {/* HUD Item 03 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="absolute right-[12px] bottom-[32px] flex items-center gap-3"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground/60">03</span>
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-emerald-500/40" />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Real-time</p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-xs font-semibold text-foreground">Active</span>
              </div>
            </div>
          </motion.div>

          {/* Floating particles */}
          <motion.span
            animate={{ y: [-8, 8, -8], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[42px] top-[82px] h-1 w-1 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
          />
          <motion.span
            animate={{ y: [7, -7, 7], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[108px] left-[76px] h-1 w-1 rounded-full bg-amber-200 shadow-[0_0_8px_rgba(253,230,138,0.8)]"
          />
        </motion.div>

        {/* =================================================
            ROBOT LAYER (bottom-[-18vh] yerine bottom-[2vh] yapılarak YUKARI ÇEKİLDİ)
        ================================================= */}
        <motion.div
          style={{
            y: robotY,
            scale: robotScale,
          }}
          className="absolute left-1/2 bottom-[2vh] md:bottom-[4vh] z-20 -translate-x-1/2 pointer-events-none will-change-transform"
        >
          <div className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] lg:w-[600px] lg:h-[600px]">
            <RobotEyes />
          </div>
        </motion.div>

        {/* =================================================
            GRASS LAYER (Çim başlangıcı %125'ten %65'e çekildi - yumuşakça yükselir)
        ================================================= */}
        <motion.div
          style={{
            y: grassY,
            scale: grassScale,
          }}
          className="absolute left-0 right-0 bottom-0 z-30 origin-bottom pointer-events-none select-none will-change-transform"
        >
          <img
            src="https://res.cloudinary.com/dwdk20m6q/image/upload/v1790283621/ChatGPT_Image_24_Eyl_2026_23_58_07_wn8bog.png"
            alt="Grass overlay"
            draggable={false}
            className="block w-full h-auto min-w-full object-cover drop-shadow-[0_-10px_20px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        {/* BOTTOM FADE GRADIENT (Çimlerin arkasında z-10 veya hafifletilmiş geçiş) */}
        <div className="absolute inset-x-0 bottom-0 z-25 h-[12vh] pointer-events-none bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>
    </section>
  );
}