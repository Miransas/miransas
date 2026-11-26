'use client';

import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { useTheme } from 'next-themes';
import { useHydrated } from '@/lib/use-hydrated';
import { ArrowUpRight } from 'lucide-react';
import { VoiceOrb, type OrbMode } from './voice-orb';

const TAB_SWITCH_SOUND_PATH = '/sounds/tab-switch.mp3';

const ITEMS: {
  label: string;
  mode: OrbMode;
}[] = [
    {
      label: 'Voice Cloning',
      mode: { amp: 0.70, freq: 1.44, speed: 1.72 },
    },
    {
      label: 'Text to Speech',
      mode: { amp: 0.36, freq: 0.96, speed: 0.68 },
    },
    {
      label: 'Speech to Speech',
      mode: { amp: 0.48, freq: 1.24, speed: 1.05 },
    },
    {
      label: 'Voice Agent',
      mode: { amp: 0.39, freq: 1.04, speed: 0.76 },
    },
  ];

const COPY = {
  eyebrow: 'INDEPENDENT VOICE AI LAB',
  gradientTitle: 'Your Voice.\nYour Language.',
  solidTitle: 'Built to Last.',
  text: 'Voice AI research and the infrastructure behind it. Building toward native Uzbek speech support.',
};

export function NewHero({ tone }: { tone?: 'light' | 'dark' }) {
  const tabAudioRef = useRef<HTMLAudioElement | null>(null);
  const [active, setActive] = useState(0);
  const { resolvedTheme } = useTheme();
  const hydrated = useHydrated();
  const orbTone =
    tone ?? (hydrated && resolvedTheme === 'light' ? 'light' : 'dark');
  const current = ITEMS[active];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const audio = new Audio(TAB_SWITCH_SOUND_PATH);
    audio.preload = 'auto';
    audio.volume = 0.35;
    tabAudioRef.current = audio;

    return () => {
      tabAudioRef.current?.pause();
      tabAudioRef.current = null;
    };
  }, []);

  const handleSelectMode = (nextIndex: number) => {
    if (nextIndex === active) return;
    setActive(nextIndex);

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 1024px)').matches &&
      tabAudioRef.current
    ) {
      try {
        tabAudioRef.current.currentTime = 0;
        void tabAudioRef.current.play().catch(() => { });
      } catch {
        // Ignore when autoplay is blocked
      }
    }
  };

  const onModeKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let next: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
      next = (index + 1) % ITEMS.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      next = (index - 1 + ITEMS.length) % ITEMS.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = ITEMS.length - 1;
    if (next === null) return;
    event.preventDefault();
    handleSelectMode(next);
    document.getElementById(`hero-technology-mode-${next}`)?.focus();
  };

  return (
    <section
      data-tone={orbTone}
      data-site-hero="true"
      className="surface-page text-foreground relative isolate flex min-h-[760px] flex-col overflow-x-clip sm:min-h-[820px] xl:-mt-[var(--header-h)] xl:min-h-[max(800px,100svh)]"
    >
      {/* Top Eyebrow */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center gap-3 px-6 pt-6 md:px-12 lg:px-20 xl:pt-[calc(var(--header-h)+24px)]">
        <span aria-hidden className="size-1.5 rounded-xl bg-[#0d4bfa]" />
        <span className="text-prominent text-xs font-medium uppercase tracking-[0.12em] sm:text-[13px]">
          {COPY.eyebrow}
        </span>
      </div>

      {/* One reserved visual stage; the fixed header is outside this stacking context. */}
      <div
        aria-hidden="true"
        data-hero-visual
        className="pointer-events-none relative z-[1] mt-4 h-[clamp(260px,76vw,520px)] w-full overflow-hidden xl:absolute xl:inset-x-0 xl:top-0 xl:mt-0 xl:aspect-[2/1] xl:h-auto"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 z-0 flex -translate-y-1/2 select-none items-center justify-center overflow-hidden px-4 xl:top-[calc(max(800px,100svh)*0.46)]"
          style={{
            maskImage:
              'radial-gradient(ellipse 72% 64% at 50% 50%, rgba(0,0,0,0.95) 28%, rgba(0,0,0,0.28) 72%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 72% 64% at 50% 50%, rgba(0,0,0,0.95) 28%, rgba(0,0,0,0.28) 72%, transparent 100%)',
          }}
        >
          <span
            className="bg-clip-text text-center font-semibold uppercase leading-none tracking-[-0.045em] text-transparent"
            style={{
              fontSize: 'clamp(4.25rem, 16.5vw, 15.5rem)',
              backgroundImage:
                orbTone === 'light'
                  ? 'linear-gradient(180deg, rgba(13,75,250,0.16) 0%, rgba(5,5,5,0.08) 55%, rgba(13,75,250,0.05) 100%)'
                  : 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(13,75,250,0.22) 55%, rgba(13,75,250,0.05) 100%)',
              filter: 'blur(0.4px)',
            }}
          >
            MIRANSAS
          </span>
        </div>

        {hydrated && (
          <VoiceOrb
            tone={orbTone}
            mode={current.mode}
            color="#0d4bfa"
            fog={1.25 * (orbTone === 'light' ? 0.7 : 0.875)}
            dust={1.38}
            dots={1.12}
            className="absolute inset-0"
          />
        )}
      </div>

      {/* Left Technology Orb Mode Controls */}
      <nav
        aria-label="Voice technologies"
        style={{ top: '36%' }}
        className="z-20 mx-auto hidden w-full max-w-[1440px] px-6 md:px-12 lg:block xl:pointer-events-none xl:absolute xl:inset-x-0 xl:top-[36%] xl:mt-0 xl:block xl:px-20"
      >
        <div className="xl:pointer-events-auto xl:w-fit">
          <span className="text-prominent mb-3 block text-xs font-medium uppercase tracking-[0.12em] sm:text-[13px]">
            OUR TECHNOLOGY
          </span>
          <div
            role="group"
            aria-label="Voice technology modes"
            className="grid grid-cols-4 gap-1.5 xl:flex xl:flex-col"
          >
            {ITEMS.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  id={`hero-technology-mode-${i}`}
                  key={item.label}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => handleSelectMode(i)}
                  onKeyDown={(event) => onModeKeyDown(event, i)}
                  className={`group relative flex min-h-9 min-w-[200px] items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-left text-xs leading-[1.45] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] sm:text-[13px] ${selected
                      ? 'text-heading font-medium'
                      : 'text-prominent hover:text-heading'
                    }`}
                >
                  <span
                    className={`h-0.5 rounded-xl transition-[width,background-color] duration-300 ${selected
                        ? 'w-7 bg-[#0d4bfa]'
                        : 'bg-foreground/25 w-3.5 group-hover:w-5'
                      }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Copy & CTAs */}
      <div className="relative z-10 mx-auto mt-auto grid w-full max-w-[1440px] gap-8 px-6 pt-8 pb-10 sm:pb-14 md:px-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:px-20 xl:pt-24 lg:pb-20">
        <div>
          <h1 className="text-heading max-w-[780px] whitespace-pre-line text-[2.75rem] font-semibold leading-[1.03] tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem]">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  orbTone === 'light'
                    ? 'linear-gradient(92deg, #0d4bfa 0%, #1d5cff 42%, #050505 100%)'
                    : 'linear-gradient(92deg, #FFFFFF 0%, #D1D1D1 48%, #5b86ff 100%)',
              }}
            >
              {COPY.gradientTitle}
            </span>
            {'\n'}
            <span className="text-heading">{COPY.solidTitle}</span>
          </h1>
        </div>

        <div className="max-w-[440px] lg:pb-1">
          <p className="text-prominent text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]">
            {COPY.text}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/news"
              className="inline-flex min-h-11 items-center gap-3 rounded-xl bg-[#0d4bfa] px-5 py-3 text-xs font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] sm:text-[13px]"
            >
              Follow our progress{' '}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/projects"
              className="text-prominent inline-flex min-h-11 items-center rounded-xl bg-black/[0.05] px-5 py-3 text-xs font-medium transition-colors hover:bg-black/[0.09] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] sm:text-[13px] dark:bg-white/[0.07] dark:hover:bg-white/[0.12]"
            >
              Explore projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}