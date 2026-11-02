
"use client";

import Link from "next/link";
import { useState } from "react";
import { Geist } from "next/font/google";
import {
  ArrowUpRight,
  Bot,
  Languages,
  Mic,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { VoiceOrb, type OrbMode } from "./voice-orb";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

const COPY = {
  eyebrow: "INDEPENDENT VOICE AI LAB",
  title: "Your Voice.\nYour Language.\nBuilt to Last.",
  text: "Native Uzbek voice AI and the infrastructure behind it. Voice cloning, text-to-speech and speech-to-speech — built by a small, independent team.",
  primary: { label: "Follow our progress", href: "/news" },
  secondary: { label: "Explore projects", href: "/projects" },
};

type Item = {
  label: string;
  href: string;
  icon: LucideIcon;
  mode: OrbMode;
};

const ITEMS: Item[] = [
  {
    label: "Voice Cloning",
    href: "/projects/miralas",
    icon: Mic,
    mode: { amp: 0.34, freq: 1.25, speed: 1 },
  },
  {
    label: "Text to Speech",
    href: "/projects",
    icon: Waves,
    mode: { amp: 0.28, freq: 1, speed: 0.8 },
  },
  {
    label: "Speech to Speech",
    href: "/projects",
    icon: Languages,
    mode: { amp: 0.4, freq: 1.5, speed: 1.3 },
  },
  {
    label: "Voice Agent",
    href: "/agent",
    icon: Bot,
    mode: { amp: 0.22, freq: 0.8, speed: 0.6 },
  },
];

const TONES = {
  dark: {
    section: "bg-[#050609] text-white",
    muted: "text-white/50",
    subtle: "text-white/30",
    item: "text-white/40 hover:text-white",
    active: "text-white",
    line: "bg-white/15",
    lineActive: "bg-white",
    primary: "bg-white text-black hover:bg-[#e8edff]",
    secondary:
      "border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.09]",
  },
  light: {
    section: "bg-[#f7f8fc] text-[#101116]",
    muted: "text-black/50",
    subtle: "text-black/30",
    item: "text-black/40 hover:text-black",
    active: "text-black",
    line: "bg-black/15",
    lineActive: "bg-black",
    primary: "bg-black text-white hover:bg-black/80",
    secondary:
      "border border-black/10 bg-black/[0.03] text-black hover:bg-black/[0.07]",
  },
} as const;

export function NewHero({
  tone = "dark",
}: {
  tone?: "light" | "dark";
}) {
  const [active, setActive] = useState(0);
  const t = TONES[tone];

  return (
    <section
      className={`${geist.className} ${t.section} relative isolate -mt-[var(--header-h)] flex min-h-[100svh] flex-col overflow-hidden`}
    >
      {/* BACKGROUND */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            tone === "dark"
              ? "radial-gradient(ellipse 55% 55% at 50% 35%, rgba(39,91,210,0.10), transparent 75%)"
              : "radial-gradient(ellipse 55% 55% at 50% 35%, rgba(80,120,220,0.08), transparent 75%)",
        }}
      />

      {/* VOICE ORB */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[calc(var(--header-h)+4svh)] z-0 aspect-square w-[min(76vw,680px)] -translate-x-1/2 md:w-[min(58vw,700px)]"
      >
        <div
          className="h-full w-full"
          style={{
            filter:
              tone === "dark"
                ? [
                    "drop-shadow(0 0 12px rgba(255,255,255,0.85))",
                    "drop-shadow(0 0 28px rgba(95,160,255,0.85))",
                    "drop-shadow(0 0 65px rgba(40,110,255,0.55))",
                    "drop-shadow(0 0 110px rgba(30,90,255,0.25))",
                  ].join(" ")
                : [
                    "drop-shadow(0 0 12px rgba(255,255,255,0.95))",
                    "drop-shadow(0 0 30px rgba(95,155,255,0.65))",
                    "drop-shadow(0 0 70px rgba(65,120,255,0.30))",
                  ].join(" "),
          }}
        >
          <VoiceOrb
            tone={tone}
            mode={ITEMS[active].mode}
            className="h-full w-full"
          />
        </div>
      </div>

      {/* TOP LABEL */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center gap-3 px-6 pt-[calc(var(--header-h)+24px)] md:px-12 lg:px-20">
        <span className="size-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(80,150,255,0.9)]" />

        <span
          className={`text-[9px] font-medium tracking-[0.25em] ${t.subtle}`}
        >
          {COPY.eyebrow}
        </span>
      </div>

      {/* PRODUCT NAVIGATION */}
      <nav
        aria-label="What we build"
        className="relative z-20 mx-auto mt-10 w-full max-w-[1440px] px-6 md:absolute md:left-12 md:top-[39%] md:mt-0 md:w-auto md:px-0 lg:left-20"
      >
        <p
          className={`mb-6 hidden text-[9px] font-medium tracking-[0.24em] md:block ${t.subtle}`}
        >
          OUR TECHNOLOGY
        </p>

        <ul className="flex gap-6 overflow-x-auto pb-2 md:flex-col md:gap-6 md:overflow-visible md:pb-0">
          {ITEMS.map((item, i) => {
            const isActive = active === i;
            const Icon = item.icon;

            return (
              <li key={item.label} className="shrink-0">
                <Link
                  href={item.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group flex items-center gap-3 whitespace-nowrap text-[12px] tracking-wide transition-colors duration-300 ${
                    isActive ? t.active : t.item
                  }`}
                >
                  <span
                    className={`hidden h-px transition-all duration-500 md:block ${
                      isActive
                        ? `w-8 ${t.lineActive}`
                        : `w-4 ${t.line} group-hover:w-7`
                    }`}
                  />

                  <Icon
                    className="size-3.5 md:hidden"
                    strokeWidth={1.6}
                  />

                  {item.label}

                  <ArrowUpRight
                    className={`hidden size-3 transition-all duration-300 md:block ${
                      isActive
                        ? "translate-x-0 opacity-50"
                        : "-translate-x-1 opacity-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* BOTTOM FADE */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[55%] ${
          tone === "dark"
            ? "bg-gradient-to-t from-[#050609] via-[#050609]/85 to-transparent"
            : "bg-gradient-to-t from-[#f7f8fc] via-[#f7f8fc]/85 to-transparent"
        }`}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto mt-auto grid w-full max-w-[1440px] gap-6 px-6 pb-10 pt-16 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-12 md:px-12 md:pb-16 lg:px-20">
        <div>
          <h1 className="max-w-[760px] whitespace-pre-line text-[clamp(2.65rem,5.2vw,5rem)] font-medium leading-[1.02] tracking-[-0.065em]">
            {COPY.title}
          </h1>
        </div>

        <div className="max-w-[390px] md:pb-1">
          <p
            className={`text-[13px] leading-[1.9] tracking-[-0.01em] md:text-[14px] ${t.muted}`}
          >
            {COPY.text}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={COPY.primary.href}
              className={`group inline-flex items-center gap-3 rounded-full px-5 py-3 text-[12px] font-medium transition-all duration-300 ${t.primary}`}
            >
              {COPY.primary.label}

              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href={COPY.secondary.href}
              className={`inline-flex items-center rounded-full px-5 py-3 text-[12px] font-medium transition-all duration-300 ${t.secondary}`}
            >
              {COPY.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
