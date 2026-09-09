"use client";

import React, { useState, useEffect } from "react";
import { Command, Link, Focus, Triangle } from "lucide-react";

// Veri yapısı: Kişiler, yorumlar ve şirket bilgileri
const testimonials = [
  {
    id: 0,
    name: "Sarah Jenkins",
    role: "Product Manager @ Command+R",
    quote: "The interface is incredibly intuitive. We integrated it into our workflow within hours, and the speed improvements were immediate.",
    avatar: "https://i.pravatar.cc/150?img=47",
    companyName: "Command+R",
    CompanyIcon: Command,
  },
  {
    id: 1,
    name: "Michael Torres",
    role: "Head of Operations @ Interlock",
    quote: "From onboarding to full deployment, the entire process was seamless. Our team productivity increased by 40% and we couldn't be happier with the results.",
    avatar: "https://i.pravatar.cc/150?img=11",
    companyName: "Interlock",
    CompanyIcon: Link,
  },
  {
    id: 2,
    name: "Emily Chen",
    role: "Design Lead @ FocalPoint",
    quote: "Visually stunning and technically robust. It has completely transformed how our design and engineering teams collaborate on a daily basis.",
    avatar: "https://i.pravatar.cc/150?img=32",
    companyName: "FocalPoint",
    CompanyIcon: Focus,
  },
  {
    id: 3,
    name: "David Kim",
    role: "CTO @ Acme Corp",
    quote: "Scalability was our biggest concern, but this solution handled our enterprise-level traffic without breaking a sweat. Highly recommended.",
    avatar: "https://i.pravatar.cc/150?img=59",
    companyName: "Acme Corp",
    CompanyIcon: Triangle,
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sıra sıra geçiş animasyonu (Otomatik oynatma)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
      }, 5000); // 5 saniyede bir değişir
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Kullanıcı manuel tıkladığında otomatik geçişi geçici olarak durdurabiliriz
  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false); // Kullanıcı müdahale ettiyse otomatiki durdur (opsiyonel)
  };

  return (
    <section className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-8 md:p-16 font-sans">
      {/* Başlık */}
      <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-24 text-center">
        Trusted by teams worldwide
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 w-full max-w-5xl mb-32">
        
        {/* Avatarlar */}
        <div className="flex items-center gap-4 lg:gap-6">
          {testimonials.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(index)}
                className={`relative rounded-full overflow-hidden transition-all duration-500 ease-in-out flex-shrink-0 ${
                  isActive
                    ? "w-20 h-20 ring-4 ring-[#84cc16] scale-110 z-10" // Aktif durum (Yeşil halka)
                    : "w-14 h-14 ring-1 ring-gray-700 opacity-40 grayscale hover:opacity-80 hover:grayscale-0" // Pasif durum
                }`}
              >
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* Yorum Metni Alanı */}
        <div className="flex-1 max-w-lg min-h-[150px] relative">
          {testimonials.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={item.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  isActive
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
                  "{item.quote}"
                </p>
                <p className="text-gray-100 font-medium">
                  {item.name},{" "}
                  <span className="text-gray-500 font-normal">
                    {item.role}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alt Şirket Logoları */}
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 w-full max-w-4xl border-t border-gray-900 pt-12">
        {testimonials.map((item, index) => {
          const isActive = activeIndex === index;
          const Icon = item.CompanyIcon;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(index)}
              className={`flex items-center gap-3 transition-all duration-500 ${
                isActive
                  ? "text-white opacity-100 scale-105"
                  : "text-gray-600 opacity-50 hover:opacity-80"
              }`}
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8" />
              <span className="text-lg md:text-xl font-semibold tracking-wide">
                {item.companyName}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}