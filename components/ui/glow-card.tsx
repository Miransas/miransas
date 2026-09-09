"use client";

import React, { useEffect, useRef } from "react";
import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";

const FREQUENCY = 3.4;
const DAMPING = 0.78;
const GLOW_RISE = 0.5;
const EDGE_SATURATION = 0.55;
const EDGE_BRIGHTNESS = 0.12;
const HUE_SHIFT = -5;

export type GlowCardColor = "emerald" | "rose" | "blue" | "purple" | "amber" | "neutral";

const COLOR_THEMES: Record<
  GlowCardColor,
  {
    roleColor: string;
    grad1: string;
    grad2: string;
    grad3: string;
    lightRadial: string;
  }
> = {
  emerald: {
    roleColor: "text-emerald-600",
    grad1: "linear-gradient(91.88deg, rgba(16,185,129,.15) 46.45%, #10b981 98.59%)",
    grad2: "linear-gradient(97.68deg, rgba(167,243,208,0) 38.1%, rgba(167,243,208,.4) 82.47%, #34d399 93.3%)",
    grad3: "linear-gradient(103.7deg, rgba(16,185,129,.1) 38.66%, rgba(5,150,105,.15) 68.55%, #34d399 85.01%, #ffffff 92.12%)",
    lightRadial: "radial-gradient(50% 50% at 50% 50%, #ffffff 5%, #a7f3d0 35%, rgba(52,211,153,.3) 60%, rgba(16,185,129,0) 100%)",
  },
  rose: {
    roleColor: "text-rose-600",
    grad1: "linear-gradient(91.88deg, rgba(244,63,94,.15) 46.45%, #f43f5e 98.59%)",
    grad2: "linear-gradient(97.68deg, rgba(254,205,211,0) 38.1%, rgba(254,205,211,.4) 82.47%, #fb7185 93.3%)",
    grad3: "linear-gradient(103.7deg, rgba(244,63,94,.1) 38.66%, rgba(225,29,72,.15) 68.55%, #fb7185 85.01%, #ffffff 92.12%)",
    lightRadial: "radial-gradient(50% 50% at 50% 50%, #ffffff 5%, #fecdd3 35%, rgba(251,113,133,.3) 60%, rgba(244,63,94,0) 100%)",
  },
  blue: {
    roleColor: "text-blue-600",
    grad1: "linear-gradient(91.88deg, rgba(59,130,246,.15) 46.45%, #2563eb 98.59%)",
    grad2: "linear-gradient(97.68deg, rgba(191,219,254,0) 38.1%, rgba(191,219,254,.4) 82.47%, #60a5fa 93.3%)",
    grad3: "linear-gradient(103.7deg, rgba(59,130,246,.1) 38.66%, rgba(37,99,235,.15) 68.55%, #60a5fa 85.01%, #ffffff 92.12%)",
    lightRadial: "radial-gradient(50% 50% at 50% 50%, #ffffff 5%, #bfdbfe 35%, rgba(96,165,250,.3) 60%, rgba(37,99,235,0) 100%)",
  },
  purple: {
    roleColor: "text-purple-600",
    grad1: "linear-gradient(91.88deg, rgba(168,85,247,.15) 46.45%, #9333ea 98.59%)",
    grad2: "linear-gradient(97.68deg, rgba(233,213,255,0) 38.1%, rgba(233,213,255,.4) 82.47%, #c084fc 93.3%)",
    grad3: "linear-gradient(103.7deg, rgba(168,85,247,.1) 38.66%, rgba(147,51,234,.15) 68.55%, #c084fc 85.01%, #ffffff 92.12%)",
    lightRadial: "radial-gradient(50% 50% at 50% 50%, #ffffff 5%, #e9d5ff 35%, rgba(192,132,252,.3) 60%, rgba(147,51,234,0) 100%)",
  },
  amber: {
    roleColor: "text-amber-600",
    grad1: "linear-gradient(91.88deg, rgba(245,158,11,.15) 46.45%, #d97706 98.59%)",
    grad2: "linear-gradient(97.68deg, rgba(253,230,138,0) 38.1%, rgba(253,230,138,.4) 82.47%, #fbbf24 93.3%)",
    grad3: "linear-gradient(103.7deg, rgba(245,158,11,.1) 38.66%, rgba(217,119,6,.15) 68.55%, #fbbf24 85.01%, #ffffff 92.12%)",
    lightRadial: "radial-gradient(50% 50% at 50% 50%, #ffffff 5%, #fde68a 35%, rgba(251,191,36,.3) 60%, rgba(217,119,6,0) 100%)",
  },
  neutral: {
    roleColor: "text-slate-600",
    grad1: "linear-gradient(91.88deg, rgba(100,116,139,.1) 46.45%, #64748b 98.59%)",
    grad2: "linear-gradient(97.68deg, rgba(226,232,240,0) 38.1%, rgba(226,232,240,.4) 82.47%, #94a3b8 93.3%)",
    grad3: "linear-gradient(103.7deg, rgba(148,163,184,.1) 38.66%, rgba(100,116,139,.15) 68.55%, #cbd5e1 85.01%, #ffffff 92.12%)",
    lightRadial: "radial-gradient(50% 50% at 50% 50%, #ffffff 5%, #e2e8f0 35%, rgba(148,163,184,.3) 60%, rgba(100,116,139,0) 100%)",
  },
};

export interface GlowCardProps {
  children: React.ReactNode;
  color?: GlowCardColor;
  className?: string;
}

export function GlowCard({ children, color = "emerald", className = "" }: GlowCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lightTrackRef = useRef<HTMLSpanElement>(null);
  const rightGlowRef = useRef<HTMLSpanElement>(null);
  const leftGlowRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const theme = COLOR_THEMES[color] || COLOR_THEMES.emerald;

  useEffect(() => {
    const container = containerRef.current;
    const lightTrack = lightTrackRef.current;
    const rightGlow = rightGlowRef.current;
    const leftGlow = leftGlowRef.current;
    if (!container || !lightTrack || !rightGlow || !leftGlow) return;

    let bound = container.getBoundingClientRect().width / 2 + 12;
    let x = bound;
    let velocity = 0;
    let targetX = 0;
    let inside = false;
    let last = 0;

    const measure = () => {
      bound = container.getBoundingClientRect().width / 2 + 12;
    };

    const paint = () => {
      lightTrack.style.setProperty("--light-x", x.toFixed(2) + "px");
      const normalized = Math.max(-1, Math.min(1, x / bound));
      const magnitude = Math.abs(normalized);
      const intensity = Math.pow(magnitude, GLOW_RISE);
      const colorTuning =
        "hue-rotate(" +
        HUE_SHIFT +
        "deg)" +
        " saturate(" +
        (1 + EDGE_SATURATION * magnitude).toFixed(3) +
        ")" +
        " brightness(" +
        (1 + EDGE_BRIGHTNESS * magnitude).toFixed(3) +
        ")";

      rightGlow.style.opacity = (normalized > 0 ? intensity : 0).toFixed(3);
      leftGlow.style.opacity = (normalized < 0 ? intensity : 0).toFixed(3);
      rightGlow.style.filter = colorTuning;
      leftGlow.style.filter = colorTuning;
    };

    measure();
    paint();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => resizeObserver.disconnect();
    }

    const frame = (now = performance.now()) => {
      const delta = Math.min((now - last) / 1000, 0.032);
      last = now;
      const angularFrequency = 2 * Math.PI * FREQUENCY;
      velocity +=
        (angularFrequency * angularFrequency * (targetX - x) -
          2 * DAMPING * angularFrequency * velocity) *
        delta;
      x += velocity * delta;
      paint();

      if (inside || Math.abs(targetX - x) > 0.15 || Math.abs(velocity) > 0.6) {
        animationFrameRef.current = requestAnimationFrame(frame);
      } else {
        animationFrameRef.current = null;
        x = targetX;
        velocity = 0;
        paint();
      }
    };

    const kick = () => {
      if (animationFrameRef.current === null) {
        last = performance.now();
        animationFrameRef.current = requestAnimationFrame(frame);
      }
    };

    container.onpointermove = (event) => {
      const bounds = container.getBoundingClientRect();
      inside = true;
      targetX = Math.max(-bound, Math.min(bound, event.clientX - (bounds.left + bounds.width / 2)));
      kick();
    };

    container.onpointerleave = () => {
      inside = false;
      targetX = x;
      kick();
    };

    return () => {
      resizeObserver.disconnect();
      container.onpointermove = null;
      container.onpointerleave = null;
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const renderGlowLayer = (glowRef: React.RefObject<HTMLSpanElement | null>, isLeft = false) => (
    <span
      ref={glowRef}
      aria-hidden="true"
      style={{ transform: `translate(-50%, -50%)${isLeft ? " scaleX(-1)" : ""}` }}
      className="pointer-events-none absolute left-1/2 top-1/2 h-[calc(100%+8px)] w-[calc(100%+8px)] rounded-[25px] border-[3px] border-transparent opacity-0 will-change-transform"
    >
      <span
        className="absolute left-[-3px] top-[-3px] z-20 box-content h-full w-full rounded-[25px] border-[3px] border-transparent blur-[14px]"
        style={{ background: `linear-gradient(transparent,transparent) padding-box, ${theme.grad1} border-box` }}
      />
      <span
        className="absolute left-[-2px] top-[-2px] z-10 box-content h-full w-full rounded-[25px] border-2 border-transparent blur-[2px]"
        style={{ background: `linear-gradient(transparent,transparent) padding-box, ${theme.grad2} border-box` }}
      />
      <span
        className="relative block h-full w-full rounded-[25px] border border-transparent"
        style={{ background: `linear-gradient(transparent,transparent) padding-box, ${theme.grad3} border-box` }}
      >
        <span
          className="absolute left-[-2px] top-[-2px] z-30 box-content h-full w-full rounded-[25px] border-2 border-transparent blur-[6px]"
          style={{ background: `linear-gradient(transparent,transparent) padding-box, ${theme.grad2} border-box` }}
        />
      </span>
    </span>
  );

  return (
    <div ref={containerRef} className={`relative z-10 block w-full rounded-[22px] ${className}`}>
      {renderGlowLayer(rightGlowRef)}
      {renderGlowLayer(leftGlowRef, true)}

      <div className="relative z-10 h-full w-full overflow-hidden rounded-[22px] border border-black/10 bg-white/90 shadow-sm transition-all duration-300 hover:shadow-md">
        <span
          ref={lightTrackRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 z-[-10] ml-[-150px] flex h-full w-[300px] items-center justify-center [--light-x:120px] [transform:translateX(var(--light-x))_translateZ(0)]"
        >
          <span
            className="absolute top-0 h-[180px] w-[180px] -translate-y-1/2 rounded-full opacity-60 blur-xl"
            style={{ background: theme.lightRadial }}
          />
        </span>
        {children}
      </div>
    </div>
  );
}

// TEAM SECTION USAGE (Light Mode)

type SocialLinks = {
  instagram?: string;
  github?: string;
  x?: string;
};

const TEAM: {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: SocialLinks;
}[] = [
  {
    name: "Sardor",
    role: "Founder & Engineer",
    bio: "Founded Miransas in 2023 and builds the core stack end-to-end — frontend, backend, infra, and billing. Splits time between Frankfurt and İzmir, shipping products solo before handing pieces off as the team grows.",
    image: "https://res.cloudinary.com/dwdk20m6q/image/upload/v1788894744/photo_2026-09-08_22.11.45_ozmn34.jpg",
    social: {
      instagram: "https://instagram.com/asardorazimov",
      github: "https://github.com/sardorazimov",
      x: "https://x.com/asardorazimov",
    },
  },
  {
    name: "Guliruhsar",
    role: "Voice Actor",
    bio: "Brings the voice behind Miransas's audio and TTS products to life — recording reference samples, reviewing synthesized output, and shaping the tone the products speak in.",
    image: "https://res.cloudinary.com/dwdk20m6q/image/upload/v1788894765/ChatGPT_Image_Sep_8_2026_10_11_10_PM_ovrglt.png",
    social: {
      instagram: "https://instagram.com/guliruhsar.msn",
      x: "https://x.com/TODO_guliruhsar",
    },
  },
  {
    name: "Efe Kaya",
    role: "Backend Developer",
    bio: "Works on backend systems and infrastructure across the product lineup — APIs, databases, and the plumbing that keeps everything running in production.",
    image: "https://res.cloudinary.com/dwdk20m6q/image/upload/v1788894746/PhotoshopExtension_Image_yi5uaz.png",
    social: {
      instagram: "https://instagram.com/efe_kaaya35",
      github: "https://github.com/efekaya35",
      x: "https://x.com/efekaya1510",
    },
  },
];

function SocialRow({ social }: { social: SocialLinks }) {
  const items = [
    { key: "instagram", href: social.instagram, Icon: FaInstagram },
    { key: "github", href: social.github, Icon: FaGithub },
    { key: "x", href: social.x, Icon: FaXTwitter },
  ].filter((item) => item.href);

  if (items.length === 0) return null;

  return (
    <div className="mt-5 flex items-center gap-2.5 border-t border-black/5 pt-4">
      {items.map(({ key, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-neutral-100 text-neutral-600 transition-colors hover:border-black/30 hover:bg-white hover:text-black"
        >
          <Icon className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}

