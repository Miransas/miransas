"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useTheme } from "next-themes";
import { useHydrated } from "@/lib/use-hydrated";
import {
  ArrowUpRight,
  Bot,
  Languages,
  Mic,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { VoiceOrb, type OrbMode } from "./voice-orb";

const TAB_SWITCH_SOUND_PATH = "/sounds/tab-switch.mp3";

const ITEMS: {
  label: string;
  kicker: string;
  description: string;
  href: string;
  icon: LucideIcon;
  mode: OrbMode;
}[] = [
    {
      label: "Voice Cloning",
      kicker: "01 / VOICE IDENTITY",
      description:
        "A familiar voice, with a distinct identity. Explore the possibilities of consent-based voice cloning.",
      href: "/projects#miralas",
      icon: Mic,
      mode: { amp: 0.42, freq: 1.08, speed: 0.75 },
    },
    {
      label: "Text to Speech",
      kicker: "02 / SPEECH GENERATION",
      description:
        "Turn written language into expressive speech, shaped for the voices and products we build.",
      href: "/projects",
      icon: Waves,
      mode: { amp: 0.35, freq: 0.94, speed: 0.65 },
    },
    {
      label: "Speech to Speech",
      kicker: "03 / VOICE TRANSFORMATION",
      description:
        "Explore new ways for speech to move between voices without losing the flow of a conversation.",
      href: "/projects",
      icon: Languages,
      mode: { amp: 0.48, freq: 1.24, speed: 0.90 },
    },
    {
      label: "Voice Agent",
      kicker: "04 / CONVERSATIONAL AI",
      description:
        "From listening to understanding to replying. A direction we're exploring for interactive voice systems.",
      href: "/agent",
      icon: Bot,
      mode: { amp: 0.38, freq: 1.02, speed: 0.70 },
    },
  ];

const COPY = {
  eyebrow: "INDEPENDENT VOICE AI LAB",
  gradientTitle: "Your Voice.\nYour Language.",
  solidTitle: "Built to Last.",
  text: "Native Uzbek voice AI and the infrastructure behind it. Built with care by an independent engineering studio.",
};

export function NewHero({ tone }: { tone?: "light" | "dark" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const tabAudioRef = useRef<HTMLAudioElement | null>(null);
  const [active, setActive] = useState(0);
  const { resolvedTheme } = useTheme();
  const hydrated = useHydrated();
  const orbTone =
    tone ?? (hydrated && resolvedTheme === "light" ? "light" : "dark");
  const current = ITEMS[active];

  // Masaüstü sekme geçiş sesi (public/sounds/tab-switch.mp3)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio(TAB_SWITCH_SOUND_PATH);
    audio.preload = "auto";
    audio.volume = 0.35;
    tabAudioRef.current = audio;

    return () => {
      tabAudioRef.current?.pause();
      tabAudioRef.current = null;
    };
  }, []);

  const handleSelectTab = useCallback(
    (nextIndex: number) => {
      if (nextIndex === active) return;
      setActive(nextIndex);

      if (
        typeof window !== "undefined" &&
        window.matchMedia("(min-width: 1024px)").matches &&
        tabAudioRef.current
      ) {
        try {
          tabAudioRef.current.currentTime = 0;
          void tabAudioRef.current.play().catch(() => { });
        } catch {
          // Ses dosyası henüz yokken veya autoplay engellendiğinde yoksay
        }
      }
    },
    [active],
  );

  useEffect(() => {
    const header = document.querySelector("header") as HTMLElement | null;
    if (!header) return;

    const prevTransition = header.style.transition;
    header.style.transition =
      "background-color 250ms ease, border-color 250ms ease, backdrop-filter 250ms ease";

    const syncHeaderBg = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      const inHeroTop =
        window.scrollY <= 24 && (rect ? rect.bottom > 120 : true);

      if (inHeroTop) {
        header.style.backgroundColor = "transparent";
        header.style.backdropFilter = "none";
        header.style.borderColor = "transparent";
        header.setAttribute("data-hero-transparent", "true");
      } else {
        header.style.removeProperty("background-color");
        header.style.removeProperty("backdrop-filter");
        header.style.removeProperty("border-color");
        header.removeAttribute("data-hero-transparent");
      }
    };

    syncHeaderBg();
    window.addEventListener("scroll", syncHeaderBg, { passive: true });
    window.addEventListener("resize", syncHeaderBg, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncHeaderBg);
      window.removeEventListener("resize", syncHeaderBg);
      header.style.transition = prevTransition;
      header.style.removeProperty("background-color");
      header.style.removeProperty("backdrop-filter");
      header.style.removeProperty("border-color");
      header.removeAttribute("data-hero-transparent");
    };
  }, []);

  const onTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % ITEMS.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + ITEMS.length) % ITEMS.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = ITEMS.length - 1;
    if (next === null) return;
    event.preventDefault();
    handleSelectTab(next);
    document.getElementById(`hero-technology-tab-${next}`)?.focus();
  }; return (<section ref={sectionRef} data-tone={orbTone} data-site-hero="true" className="relative isolate -mt-[var(--header-h)] flex min-h-[760px] flex-col overflow-hidden bg-transparent text-foreground sm:min-h-[820px] lg:min-h-[max(800px,100svh)]" > {/* Tam ekran Küre + Dağınık Doğal Duman ve Toz */} <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden" > {hydrated && (<VoiceOrb tone={orbTone} mode={current.mode} color="#f43f5e" fog={0.85} dust={1.2} dots={0} className="absolute inset-0 h-full w-full" />)} </div>  <div className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center gap-3 px-6 pt-[calc(var(--header-h)+24px)] md:px-12 lg:px-20"> <span aria-hidden className="size-1.5 rounded-full bg-[#f43f5e]" /> <span className="text-[10px] font-medium tracking-[0.22em] text-muted-foreground"> {COPY.eyebrow} </span> </div>  {/* Mobilde tamamen gizli (hidden lg:block), masaüstünde tam 36\% dikey konumda sabit */} <nav aria-label="Voice technologies" style={{ top: "36\%" }} className="hidden z-20 mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-[36\%] lg:mt-0 lg:block lg:px-20" > <div className="lg:pointer-events-auto lg:w-fit"> <p className="mb-3 text-[10px] tracking-[0.2em] text-[#727175]"> OUR TECHNOLOGY </p> <div role="tablist" aria-label="Voice technologies" className="flex flex-col gap-2" > {ITEMS.map((item, i) => {
    const selected = i === active; return (<button id={`hero-technology-tab-${i}`}
      key={item.label}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls="hero-technology-panel"
      tabIndex={selected ? 0 : -1}
      onClick={() => handleSelectTab(i)}
      onKeyDown={(event) => onTabKeyDown(event, i)}
      className={`group relative flex min-h-9 min-w-[190px] items-center gap-2.5 rounded-lg py-1.5 text-left text-xs leading-snug transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected
        ? "font-medium text-foreground"
        : "text-muted-foreground hover:text-foreground"
        }`}
    >
      <span  className={`h-px transition-[width,background-color] duration-300 ${selected ? "w-8 bg-[#f43f5e]" : "w-4 bg-foreground/25 group-hover:w-6"}`} />
       <span>{item.label}</span> </button>);
  })} 
  </div> 
  
  </div>
   </nav> 
   <div className="relative z-10 mx-auto mt-auto grid w-full max-w-[1440px] gap-7 px-6 pb-10 pt-[clamp(260px,45vw,420px)] sm:pb-14 md:px-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:px-20 lg:pb-20 lg:pt-24"> <div> <h1 className="max-w-[780px] whitespace-pre-line text-[clamp(2.7rem,5.25vw,5.2rem)] font-medium leading-[1.045] tracking-[-0.055em]"> <span className="bg-clip-text text-transparent" style={{ backgroundImage: orbTone === "light" ? "linear-gradient(92deg, #e15b64 0\%, #d4883a 34\%, #4f9e76 66\%, #4a7fd9 100\%)" : "linear-gradient(92deg, #f3b2a6 0\%, #e9c993 34\%, #b5d9be 66\%, #9dc1f5 100\%)", }} > {COPY.gradientTitle} </span> {"\n"} <span className="text-foreground">{COPY.solidTitle}</span> </h1> </div> <div className="max-w-[420px] lg:pb-1"> <p className="text-sm leading-7 text-[#727175]">{COPY.text}</p> <div id="hero-technology-panel" role="tabpanel" aria-labelledby={`hero-technology-tab-${active}`}
    tabIndex={0}
    className="mt-5 border-l border-[#f43f5e]/45 pl-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  >
    <p className="font-mono text-[10px] tracking-[0.16em] text-[#727175]">
      {current.kicker}
    </p>
    <p className="mt-2 text-sm leading-6 text-[#727175]">
      {current.description}
    </p>
    <Link
      href={current.href}
      className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-foreground underline-offset-4 hover:underline"
    >
      Learn more <ArrowUpRight className="size-3.5" aria-hidden />
    </Link>
  </div>
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <Link
        href="/news"
        className="inline-flex min-h-11 items-center gap-3 rounded-xl bg-foreground px-4 py-3 text-xs font-medium text-background transition-opacity hover:opacity-80"
      >
        Follow our progress <ArrowUpRight className="size-4" aria-hidden />
      </Link>
      <Link
        href="/projects"
        className="inline-flex min-h-11 items-center rounded-xl border border-border bg-card/50 px-4 py-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
      >
        Explore projects
      </Link>
    </div>
  </div>
    </div>
  </section>
  );
}