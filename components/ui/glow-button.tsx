"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

const FREQUENCY = 3.4;
const DAMPING = 0.78;
const GLOW_RISE = 0.5;
const EDGE_SATURATION = 0.55;
const EDGE_BRIGHTNESS = 0.12;
const HUE_SHIFT = -5;

export type GlowButtonColor = "red" | "rose" | "blue" | "emerald" | "purple" | "amber";
export type GlowButtonSize = "sm" | "md" | "lg" | "xl";

const COLOR_THEMES: Record<
  GlowButtonColor,
  {
    textColor: string;
    focusOutline: string;
    grad1: string;
    grad2: string;
    grad3: string;
    lightRadial: string;
  }
> = {
  red: {
    textColor: "text-[#5a250a]",
    focusOutline: "focus-visible:outline-[#ff8964]",
    grad1: "linear-gradient(91.88deg, rgba(255,137,100,.2) 46.45%, #cd3100 98.59%)",
    grad2: "linear-gradient(97.68deg, rgba(255,177,153,0) 38.1%, rgba(255,177,153,.2) 82.47%, #ff7950 93.3%)",
    grad3: "linear-gradient(103.7deg, rgba(188,155,143,.1) 38.66%, rgba(233,132,99,.1) 68.55%, #e98463 85.01%, #fff 92.12%)",
    lightRadial: "radial-gradient(50% 50% at 50% 50%, #fffff5 3.5%, #ffaa81 26.5%, #ffda9f 37.5%, rgba(255,170,129,.5) 49%, rgba(210,106,58,0) 92.5%)",
  },
  rose: {
    textColor: "text-[#4c0519]",
    focusOutline: "focus-visible:outline-[#fb7185]",
    grad1: "linear-gradient(91.88deg, rgba(251,113,133,.2) 46.45%, #e11d48 98.59%)",
    grad2: "linear-gradient(97.68deg, rgba(254,205,211,0) 38.1%, rgba(254,205,211,.2) 82.47%, #f43f5e 93.3%)",
    grad3: "linear-gradient(103.7deg, rgba(244,63,94,.1) 38.66%, rgba(225,29,72,.1) 68.55%, #fb7185 85.01%, #fff 92.12%)",
    lightRadial: "radial-gradient(50% 50% at 50% 50%, #fff1f2 3.5%, #fb7185 26.5%, #fecdd3 37.5%, rgba(244,63,94,.5) 49%, rgba(225,29,72,0) 92.5%)",
  },
  blue: {
    textColor: "text-[#172554]",
    focusOutline: "focus-visible:outline-[#60a5fa]",
    grad1: "linear-gradient(91.88deg, rgba(147,197,253,.2) 46.45%, #2563eb 98.59%)",
    grad2: "linear-gradient(97.68deg, rgba(191,219,254,0) 38.1%, rgba(191,219,254,.2) 82.47%, #3b82f6 93.3%)",
    grad3: "linear-gradient(103.7deg, rgba(59,130,246,.1) 38.66%, rgba(37,99,235,.1) 68.55%, #60a5fa 85.01%, #fff 92.12%)",
    lightRadial: "radial-gradient(50% 50% at 50% 50%, #eff6ff 3.5%, #60a5fa 26.5%, #bfdbfe 37.5%, rgba(59,130,246,.5) 49%, rgba(37,99,235,0) 92.5%)",
  },
  emerald: {
    textColor: "text-[#022c22]",
    focusOutline: "focus-visible:outline-[#34d399]",
    grad1: "linear-gradient(91.88deg, rgba(110,231,183,.2) 46.45%, #059669 98.59%)",
    grad2: "linear-gradient(97.68deg, rgba(167,243,208,0) 38.1%, rgba(167,243,208,.2) 82.47%, #10b981 93.3%)",
    grad3: "linear-gradient(103.7deg, rgba(16,185,129,.1) 38.66%, rgba(5,150,105,.1) 68.55%, #34d399 85.01%, #fff 92.12%)",
    lightRadial: "radial-gradient(50% 50% at 50% 50%, #ecfdf5 3.5%, #34d399 26.5%, #a7f3d0 37.5%, rgba(16,185,129,.5) 49%, rgba(5,150,105,0) 92.5%)",
  },
  purple: {
    textColor: "text-[#3b0764]",
    focusOutline: "focus-visible:outline-[#c084fc]",
    grad1: "linear-gradient(91.88deg, rgba(216,180,254,.2) 46.45%, #9333ea 98.59%)",
    grad2: "linear-gradient(97.68deg, rgba(233,213,255,0) 38.1%, rgba(233,213,255,.2) 82.47%, #a855f7 93.3%)",
    grad3: "linear-gradient(103.7deg, rgba(168,85,247,.1) 38.66%, rgba(147,51,234,.1) 68.55%, #c084fc 85.01%, #fff 92.12%)",
    lightRadial: "radial-gradient(50% 50% at 50% 50%, #faf5ff 3.5%, #c084fc 26.5%, #e9d5ff 37.5%, rgba(168,85,247,.5) 49%, rgba(147,51,234,0) 92.5%)",
  },
  amber: {
    textColor: "text-[#451a03]",
    focusOutline: "focus-visible:outline-[#fbbf24]",
    grad1: "linear-gradient(91.88deg, rgba(252,211,77,.2) 46.45%, #d97706 98.59%)",
    grad2: "linear-gradient(97.68deg, rgba(253,230,138,0) 38.1%, rgba(253,230,138,.2) 82.47%, #f59e0b 93.3%)",
    grad3: "linear-gradient(103.7deg, rgba(245,158,11,.1) 38.66%, rgba(217,119,6,.1) 68.55%, #fbbf24 85.01%, #fff 92.12%)",
    lightRadial: "radial-gradient(50% 50% at 50% 50%, #fffbeb 3.5%, #fbbf24 26.5%, #fde68a 37.5%, rgba(245,158,11,.5) 49%, rgba(217,119,6,0) 92.5%)",
  },
};

const SIZE_CONFIGS: Record<
  GlowButtonSize,
  {
    buttonClasses: string;
    iconClasses: string;
  }
> = {
  sm: {
    buttonClasses: "h-8 px-5 text-[10px] gap-1",
    iconClasses: "h-[7px] w-[13px]",
  },
  md: {
    buttonClasses: "h-10 px-8 text-xs gap-1.5",
    iconClasses: "h-[9px] w-[17px]",
  },
  lg: {
    buttonClasses: "h-12 px-10 text-sm gap-2",
    iconClasses: "h-[10px] w-[19px]",
  },
  xl: {
    buttonClasses: "h-14 px-12 text-base gap-2.5",
    iconClasses: "h-[12px] w-[22px]",
  },
};

export interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  href?: string;
  color?: GlowButtonColor;
  size?: GlowButtonSize;
  showIcon?: boolean;
  icon?: React.ReactNode;
  target?: string;
  rel?: string;
}

export function GlowButton({
  children = "See in Action",
  href,
  color = "rose",
  size = "md",
  showIcon = true,
  icon,
  className = "",
  onClick,
  target,
  rel,
  ...props
}: GlowButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const lightTrackRef = useRef<HTMLSpanElement>(null);
  const rightGlowRef = useRef<HTMLSpanElement>(null);
  const leftGlowRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const theme = COLOR_THEMES[color] || COLOR_THEMES.rose;
  const sizeConfig = SIZE_CONFIGS[size] || SIZE_CONFIGS.md;

  useEffect(() => {
    const container = containerRef.current;
    const button = buttonRef.current;
    const lightTrack = lightTrackRef.current;
    const rightGlow = rightGlowRef.current;
    const leftGlow = leftGlowRef.current;
    if (!container || !button || !lightTrack || !rightGlow || !leftGlow) return;

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
        "hue-rotate(" + HUE_SHIFT + "deg)" +
        " saturate(" + (1 + EDGE_SATURATION * magnitude).toFixed(3) + ")" +
        " brightness(" + (1 + EDGE_BRIGHTNESS * magnitude).toFixed(3) + ")";

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

    button.onfocus = () => {
      inside = false;
      targetX = 0;
      kick();
    };

    button.onblur = () => {
      inside = false;
      targetX = x;
      kick();
    };

    return () => {
      resizeObserver.disconnect();
      container.onpointermove = null;
      container.onpointerleave = null;
      button.onfocus = null;
      button.onblur = null;
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const sharedButtonClasses = `relative z-10 flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/60 bg-[#d1d1d1] font-bold uppercase leading-none tracking-[-.015em] ${theme.textColor} ${sizeConfig.buttonClasses} transition-colors duration-200 ease-[cubic-bezier(.4,0,.2,1)] [font-family:Inter,-apple-system,'Segoe_UI',sans-serif] focus-visible:outline-2 focus-visible:outline-offset-8 ${theme.focusOutline} ${className}`;

  const buttonContent = (
    <>
      <span
        ref={lightTrackRef}
        aria-hidden="true"
        className="absolute left-1/2 top-0 z-[-10] ml-[-102px] flex h-full w-[204px] items-center justify-center [--light-x:120px] [transform:translateX(var(--light-x))_translateZ(0)]"
      >
        <span
          className="absolute top-1/2 h-[121px] w-[121px] -translate-y-1/2"
          style={{ background: theme.lightRadial }}
        />
        <span className="absolute top-1/2 h-[103px] w-[204px] -translate-y-1/2 blur-[5px] [background:radial-gradient(43.3%_44.23%_at_50%_49.51%,#fffff7_29%,#fffacd_48.5%,#f4d2bf_60.71%,rgba(214,211,210,0)_100%)]" />
      </span>

      <span>{children}</span>

      {showIcon && (
        icon || (
          <svg className={`${sizeConfig.iconClasses} flex-none fill-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 9" aria-hidden="true">
            <path fillRule="evenodd" d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z" clipRule="evenodd" />
          </svg>
        )
      )}
    </>
  );

  const renderGlowLayer = (glowRef: React.RefObject<HTMLSpanElement | null>, isLeft = false) => (
    <span
      ref={glowRef}
      aria-hidden="true"
      style={{ transform: `translate(-50%, -50%)${isLeft ? " scaleX(-1)" : ""}` }}
      className={`pointer-events-none absolute left-1/2 top-1/2 h-[calc(100%+9px)] w-[calc(100%+9px)] rounded-full border-[3px] border-transparent opacity-0 will-change-transform `}
    >
      <span
        className="absolute left-[-3px] top-[-3px] z-20 box-content h-full w-full rounded-full border-[3px] border-transparent blur-[15px]"
        style={{ background: `linear-gradient(transparent,transparent) padding-box, ${theme.grad1} border-box` }}
      />
      <span
        className="absolute left-[-2px] top-[-2px] z-10 box-content h-full w-full rounded-full border-2 border-transparent blur-[2px]"
        style={{ background: `linear-gradient(transparent,transparent) padding-box, ${theme.grad2} border-box` }}
      />
      <span
        className="relative block h-full w-full rounded-full border border-transparent"
        style={{ background: `linear-gradient(transparent,transparent) padding-box, ${theme.grad3} border-box` }}
      >
        <span
          className="absolute left-[-2px] top-[-2px] z-30 box-content h-full w-full rounded-full border-2 border-transparent blur-[7px]"
          style={{ background: `linear-gradient(transparent,transparent) padding-box, ${theme.grad2} border-box` }}
        />
      </span>
    </span>
  );

  return (
    <div ref={containerRef} className="relative z-10 inline-flex items-center">
      {renderGlowLayer(rightGlowRef)}
      {renderGlowLayer(leftGlowRef, true)}

      {href ? (
        <Link
          ref={buttonRef as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={sharedButtonClasses}
        >
          {buttonContent}
        </Link>
      ) : (
        <button
          ref={buttonRef as React.Ref<HTMLButtonElement>}
          type={props.type || "button"}
          onClick={onClick}
          className={sharedButtonClasses}
          {...props}
        >
          {buttonContent}
        </button>
      )}
    </div>
  );
}