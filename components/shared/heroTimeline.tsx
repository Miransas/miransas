"use client";

import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Search, PenTool, Settings, RefreshCw, Rocket } from "lucide-react";

const timelineData = [
  {
    id: "01",
    title: "Discovery & Audit",
    description: "We analyze your business workflows, bottlenecks, and revenue opportunities.",
    icon: Search,
  },
  {
    id: "02",
    title: "Automation Blueprint",
    description: "We design a detailed automation architecture aligned with KPIs.",
    icon: PenTool,
  },
  {
    id: "03",
    title: "Build & Integration",
    description: "Our engineers implement AI systems and integrate with your existing tools.",
    icon: Settings,
  },
  {
    id: "04",
    title: "Testing & Optimization",
    description: "Performance testing, data validation, iterative refinement and optimization.",
    icon: RefreshCw,
  },
  {
    id: "05",
    title: "Deployment & Scaling",
    description: "Launch, monitor, and continuously optimize systems to support scalable growth.",
    icon: Rocket,
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sayfanın kendi scroll'una yük bindirmemek için en hafif takip yöntemi
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div className="py-24 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto relative px-4" ref={containerRef}>
        
        {/* ÇİZGİLER: Hap arkaplanın (z-0) üstünde, içeriklerin (z-30) altında kalması için z-10/20 verildi */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gray-100 z-10" />

        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 origin-top z-20"
          style={{ scaleY: scrollYProgress }}
        />

        {/* ADIMLAR */}
        <div className="flex flex-col gap-4">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial="inactive"
                whileInView="active"
                viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                // Kapsayıcıya z-index VERMİYORUZ ki içindeki katmanlar dışarıyla karışabilsin
                className="relative flex items-center w-full py-8 px-6"
              >
                
                {/* HAP ARKA PLAN (Sadece opacity değişiyor, DOM'u tıkamaz, GPU kullanır, çizginin ALTINDA z-0) */}
                <motion.div
                  variants={{
                    inactive: { opacity: 0 },
                    active: { opacity: 1 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-[#F4F5F6] rounded-[3rem] z-0"
                />

                {/* SOL YARI - İÇERİK (Çizginin ÜSTÜNDE z-30) */}
                <div className="w-1/2 flex items-center justify-end pr-16 gap-6 relative z-30">
                  {isEven ? (
                    <>
                      {/* İkon Kutusu (Crossfade taktiği ile performansı artırıldı) */}
                      <div className="relative w-20 h-20 rounded-[1.5rem] overflow-hidden shadow-sm flex items-center justify-center">
                        {/* Pasif Arka Plan */}
                        <div className="absolute inset-0 bg-[#F3F4F6] text-gray-500 flex items-center justify-center">
                          <Icon size={32} strokeWidth={1.5} />
                        </div>
                        {/* Aktif Arka Plan (Yumuşakça belirir) */}
                        <motion.div
                          variants={{ inactive: { opacity: 0 }, active: { opacity: 1 } }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-[#333333] text-white flex items-center justify-center"
                        >
                          <Icon size={32} strokeWidth={1.5} />
                        </motion.div>
                      </div>

                      {/* Numara */}
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sm font-semibold text-gray-700 shadow-sm border border-gray-50">
                        {item.id}
                      </div>
                    </>
                  ) : (
                    <div className="text-right">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed max-w-xs ml-auto">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* MERKEZ NOKTASI (Çizginin ÜSTÜNDE z-30) - Şekil değiştirmek yerine crossfade yapıyoruz (Kasma biter) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 z-30 flex items-center justify-center">
                  
                  {/* Pasif Hal (Karemsi Çerçeve) */}
                  <motion.div
                    variants={{ inactive: { opacity: 1, scale: 1 }, active: { opacity: 0, scale: 0.5 } }}
                    transition={{ duration: 0.3 }}
                    className="absolute w-5 h-5 bg-[#F4F5F6] border-2 border-gray-200 rounded-[8px]"
                  />

                  {/* Aktif Hal (Mor Yuvarlak & İç Siyah Nokta) */}
                  <motion.div
                    variants={{ inactive: { opacity: 0, scale: 0.5 }, active: { opacity: 1, scale: 1 } }}
                    transition={{ duration: 0.3 }}
                    className="absolute w-7 h-7 bg-white border-4 border-purple-200 rounded-full flex items-center justify-center shadow-sm"
                  >
                    <div className="w-2 h-2 bg-black rounded-full" />
                  </motion.div>
                </div>

                {/* SAĞ YARI - İÇERİK (Çizginin ÜSTÜNDE z-30) */}
                <div className="w-1/2 flex items-center justify-start pl-16 gap-6 relative z-30">
                  {isEven ? (
                    <div className="text-left">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                        {item.description}
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Numara */}
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sm font-semibold text-gray-700 shadow-sm border border-gray-50">
                        {item.id}
                      </div>

                      {/* İkon Kutusu (Crossfade) */}
                      <div className="relative w-20 h-20 rounded-[1.5rem] overflow-hidden shadow-sm flex items-center justify-center">
                        <div className="absolute inset-0 bg-[#F3F4F6] text-gray-500 flex items-center justify-center">
                          <Icon size={32} strokeWidth={1.5} />
                        </div>
                        <motion.div
                          variants={{ inactive: { opacity: 0 }, active: { opacity: 1 } }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-[#333333] text-white flex items-center justify-center"
                        >
                          <Icon size={32} strokeWidth={1.5} />
                        </motion.div>
                      </div>
                    </>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}