'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ScrollSync({ smooth }: { smooth: boolean }) {
  const lenis = useLenis();
  const pathname = usePathname();
  useEffect(() => {
    if (!lenis) return;
    const tick = (seconds: number) => lenis.raf(seconds * 1000);
    const update = () => ScrollTrigger.update();
    let timer: ReturnType<typeof setTimeout>;
    let disposed = false;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (disposed) return;
        lenis.resize();
        ScrollTrigger.refresh();
      }, 160);
    };
    if (smooth) gsap.ticker.add(tick);
    lenis.on('scroll', update);
    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);
    document.addEventListener('load', refresh, true);
    document.fonts.ready.then(() => {
      if (!disposed) refresh();
    });
    refresh();
    return () => {
      disposed = true;
      clearTimeout(timer);
      gsap.ticker.remove(tick);
      lenis.off('scroll', update);
      observer.disconnect();
      document.removeEventListener('load', refresh, true);
    };
  }, [lenis, pathname, smooth]);
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.09, smoothWheel: reduce === false, syncTouch: false }}>
      <ScrollSync smooth={reduce === false} />
      {children}
    </ReactLenis>
  );
}
