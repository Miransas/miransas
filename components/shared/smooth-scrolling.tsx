/* eslint-disable @typescript-eslint/no-explicit-any */
// components/SmoothScrolling.tsx
"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// GSAP eklentisini kaydediyoruz (Sadece client tarafında çalıştığından emin olarak)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  // Lenis instance'ına ulaşmak için ref oluşturuyoruz
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // GSAP'in her frame güncellenmesinde Lenis'i manuel olarak tetikleyen fonksiyon
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    // Lenis'i GSAP'in ticker'ına bağlıyoruz
    gsap.ticker.add(update);

    // Sekme değiştirip geri gelindiğinde animasyonların sıçramaması için önemli:
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Component unmount olduğunda temizlik yapıyoruz
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis 
      root 
      ref={lenisRef}
      autoRaf={false} // ÖNEMLİ: Lenis'in kendi döngüsünü kapatıp GSAP'e devrediyoruz
      options={{
        lerp: 0.05, 
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}