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
      mode: { amp: 0.42, freq: 1.08, speed: 0.82 },
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
  const sectionRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    const header = document.querySelector('header') as HTMLElement | null;
    if (!header) return;

    const prevTransition = header.style.transition;
    header.style.transition =
      'background-color 250ms ease, backdrop-filter 250ms ease';

    const syncHeaderBg = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      const inHeroTop =
        window.scrollY <= 24 && (rect ? rect.bottom > 120 : true);

      if (inHeroTop) {
        header.style.backgroundColor = 'transparent';
        header.style.backdropFilter = 'none';
        header.setAttribute('data-hero-transparent', 'true');
      } else {
        header.style.removeProperty('background-color');
        header.style.removeProperty('backdrop-filter');
        header.removeAttribute('data-hero-transparent');
      }
    };

    syncHeaderBg();
    window.addEventListener('scroll', syncHeaderBg, { passive: true });
    window.addEventListener('resize', syncHeaderBg, { passive: true });

    return () => {
      window.removeEventListener('scroll', syncHeaderBg);
      window.removeEventListener('resize', syncHeaderBg);
      header.style.transition = prevTransition;
      header.style.removeProperty('background-color');
      header.style.removeProperty('backdrop-filter');
      header.removeAttribute('data-hero-transparent');
    };
  }, []);

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
      ref={sectionRef}
      data-tone={orbTone}
      data-site-hero="true"
      className="surface-page text-foreground relative isolate -mt-[var(--header-h)] flex min-h-[760px] flex-col overflow-hidden sm:min-h-[820px] lg:min-h-[max(800px,100svh)]"
    >
      {/* Layer 0: Giant MIRANSAS wordmark behind the sphere, veiled by live blue smoke */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[44%] z-0 flex -translate-y-1/2 select-none items-center justify-center overflow-hidden px-4 md:top-[46%]"
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

      {/* Layer 1: Live WebGL Blue Smoke, Dust & #0d4bfa Orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-hidden"
      >
        {hydrated && (
          <VoiceOrb
            tone={orbTone} // sabit istersen "dark" veya "light"
            mode={{
              amp: 0.70,   // dalga yüksekliği / kürenin açılıp dağılması
              freq: 1.44,  // dalga sıklığı / kırışıklık detay sayısı
              speed: 1.72, // dönüş + duman akış hızı
            }}
            color="#0d4bfa"
            fog={1.25}     // mavi duman yoğunluğu (0.0 – 2.0)
            dust={1.38}    // süzülen ince toz parçacıkları (0.0 – 2.0)
            dots={1.12}    // seyrek parlak noktalar (0.0 – 2.0)
            className="absolute inset-0"
          />
        )}
      </div>

      {/* Top Eyebrow */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center gap-3 px-6 pt-[calc(var(--header-h)+24px)] md:px-12 lg:px-20">
        <span aria-hidden className="size-1.5 rounded-xl bg-[#0d4bfa]" />
        <span className="text-prominent text-xs font-medium uppercase tracking-[0.12em] sm:text-[13px]">
          {COPY.eyebrow}
        </span>
      </div>

      {/* Left Technology Orb Mode Controls */}
      <nav
        aria-label="Voice technologies"
        style={{ top: '36%' }}
        className="z-20 mx-auto hidden w-full max-w-[1440px] px-6 md:px-12 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-[36%] lg:mt-0 lg:block lg:px-20"
      >
        <div className="lg:pointer-events-auto lg:w-fit">
          <span className="text-secondary-copy mb-3 block text-xs font-medium uppercase tracking-[0.12em] sm:text-[13px]">
            OUR TECHNOLOGY
          </span>
          <div
            role="group"
            aria-label="Voice technology modes"
            className="flex flex-col gap-1.5"
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
                      ? 'text-prominent font-medium'
                      : 'text-secondary-copy hover:text-prominent'
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
      <div className="relative z-10 mx-auto mt-auto grid w-full max-w-[1440px] gap-8 px-6 pt-[clamp(260px,45vw,420px)] pb-10 sm:pb-14 md:px-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:px-20 lg:pt-24 lg:pb-20">
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
              className="surface-card hover:surface-card-elevated text-prominent inline-flex min-h-11 items-center rounded-xl px-5 py-3 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] sm:text-[13px]"
            >
              Explore projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}