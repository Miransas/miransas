"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ProductMock } from "./product-mock";
import { ShaderAnimation } from "../shaders/shader";

export function HeroScroll() {
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, -48]);
  const frameY = useTransform(scrollYProgress, [0, 0.7], [40, -80]);
  const frameScale = useTransform(scrollYProgress, [0, 0.7], [0.94, 1.04]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  
  // YENİ EKLENEN: Shader için bekleme ve yukarı gitme ayarı
  // [0.2, 0.8] -> Sayfanın %20'si kayana kadar bekle, sonra %80'e kadar animasyonu oynat.
  // [0, -120] -> Önce 0'da dur (bekle), sonra kart gibi yukarı doğru (-120) kay.
  const shaderY = useTransform(scrollYProgress, [0.2, 0.8], [0, -120]);

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        
        {/* SHADER KATMANI: Artık shaderY kullanıyor (Bekler ve yukarı çıkar) */}
        <motion.div 
          style={{ y: shaderY }} 
          className="absolute inset-0 pointer-events-none z-0"
        >
          <ShaderAnimation />
        </motion.div>

        {/* GÖRSEL KATMANI (Hero arka plan) */}
        <motion.div 
          style={{ y: bgY }} 
          className="absolute inset-0 -top-24 pointer-events-none z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(/images/hero.jpg)",
              filter: "brightness(0.42) saturate(0.85) contrast(1.05)",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black via-black/35 to-black" />
        </motion.div>

        {/* İÇERİK METİNLERİ */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 mx-auto mt-28 flex max-w-3xl flex-col items-center px-6 text-center md:mt-32"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-full border border-white/12 bg-black/35 px-3 py-1 text-[12px] text-white/75 backdrop-blur"
          >
            Community platform for creators
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mt-6 text-[40px] leading-[1.15] tracking-[-0.04em] text-[#fff3f0] md:text-[56px] md:leading-[72.8px]"
          >
            Your community deserves its own home.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7 }}
            className="mt-5 max-w-xl text-[15px] leading-7 text-white/70 md:text-base"
          >
            Fora gives creators, educators, and coaches a fully branded space
            with courses, events, discussions, and members.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            href="#pricing"
            className="mt-8 rounded-full bg-[#efe8e2] px-6 py-2.5 text-[14px] font-medium text-black transition-transform hover:scale-[1.03] cursor-pointer pointer-events-auto"
          >
            Get started free
          </motion.a>
        </motion.div>

        {/* MOCKUP / KART */}
        <motion.div
          style={{ y: frameY, scale: frameScale }}
          className="relative z-10 mx-auto mt-10 w-[min(92vw,1100px)] flex-1 px-4 pb-0"
        >
          <ProductMock />
        </motion.div>

      </div>
    </section>
  );
}