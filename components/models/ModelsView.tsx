'use client';

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  CheckCircle2,
  Cpu,
  ExternalLink,
  FileAudio,
  Globe2,
  Layers,
  Lock,
  Mic,
  Music,
  Radio,
  Scale,
  ShieldCheck,
  Sliders,
  Sparkles,
  Volume2,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import {
  ModelPipelineDiagram,
  type ModelTabId,
} from './ModelPipelineDiagram';

const TAB_SWITCH_SOUND_PATH = '/sounds/tab-switch.mp3';

type SpecItem = {
  label: string;
  value: string;
  mono?: boolean;
};

type CapabilityTile = {
  title: string;
  badge?: string;
  description: string;
  linkHref?: string;
  linkLabel?: string;
  icon: LucideIcon;
  featured?: boolean;
};

type ModelConfig = {
  id: ModelTabId;
  number: string;
  name: string;
  role: string;
  badge: string;
  isBaseline: boolean;
  licenseShort: string;
  licenseDetail: string;
  commercialTerms: string;
  upstreamAuthor: string;
  upstreamUrl: string;
  upstreamLabel: string;
  headline: string;
  summary: string;
  secondarySummary: string;
  honestStatusTitle: string;
  honestStatusBody: string;
  specs: SpecItem[];
  capabilities: CapabilityTile[];
};

const MODELS: ModelConfig[] = [
  {
    id: 'chatterbox',
    number: '01',
    name: 'Chatterbox',
    role: 'Speech & Voice Cloning',
    badge: 'Current Baseline',
    isBaseline: true,
    licenseShort: 'MIT License',
    licenseDetail: 'MIT License (Resemble AI)',
    commercialTerms:
      'Commercial use permitted. Self-hosted on operator-controlled GPU infrastructure with zero per-character or per-minute third-party API fees.',
    upstreamAuthor: 'Resemble AI',
    upstreamUrl: 'https://github.com/resemble-ai/chatterbox',
    upstreamLabel: 'github.com/resemble-ai/chatterbox',
    headline: 'Multilingual speech synthesis and zero-shot voice identity.',
    summary:
      'Chatterbox Multilingual TTS is the current speech engine integrated in the Miralas development baseline. Miralas pins and verifies the approved t3_mtl23ls_v2.safetensors artifact before loading, independently of historical V3 branding.',
    secondarySummary:
      'The Rust API gateway and Python 3.11 gRPC voice worker integration is verified in development, producing 24 kHz mono PCM16 audio with an imperceptible PerTh neural watermark embedded in every output.',
    honestStatusTitle: 'Engineering Baseline & Upstream Context',
    honestStatusBody:
      'The upstream repository now describes Chatterbox as retired research while remaining open-source under MIT. In Miralas, Docker development and benchmark infrastructure is implemented, while real NVIDIA GPU production latency benchmarks remain unmeasured and public curated voices are still in preparation.',
    specs: [
      { label: 'Task', value: 'TTS & Voice Cloning' },
      { label: 'Checkpoint', value: 't3_mtl23ls_v2.safetensors', mono: true },
      { label: 'Baseline Languages', value: '23 (Uzbek excluded)' },
      { label: 'Sample Rate', value: '24 kHz Mono PCM16', mono: true },
      { label: 'License', value: 'MIT (Commercial allowed)' },
      { label: 'Watermarking', value: 'PerTh Neural Watermark' },
      { label: 'Prosody Controls', value: 'exaggeration · cfg_weight', mono: true },
      { label: 'Worker Runtime', value: 'Rust API + Python 3.11 gRPC', mono: true },
    ],
    capabilities: [
      {
        title: 'Multilingual TTS',
        badge: '23 Languages',
        description:
          'Natural speech synthesis across 23 baseline languages (including English, Turkish, Russian, Arabic, and European/Asian languages).',
        icon: Globe2,
      },
      {
        title: 'Zero-Shot Voice Cloning',
        badge: 'Consent-Gated',
        description:
          'Captures vocal timbre and style from a ~10-second clean single-speaker reference clip without per-speaker fine-tuning.',
        linkHref: '/news/principles',
        linkLabel: 'Consent & safety principles →',
        icon: Mic,
      },
      {
        title: 'Expressive Prosody',
        badge: 'Fine Control',
        description:
          'Tunable emotion intensity (exaggeration) and pacing adherence (cfg_weight), plus paralinguistic tags ([laugh], [chuckle]) in the Turbo variant.',
        icon: Sliders,
      },
      {
        title: 'Uzbek Speech Research',
        badge: 'In Development',
        description:
          'Uzbek is outside the 23-language upstream baseline and remains our primary active speech research priority for Miralas.',
        linkHref: '/news/miralas-status',
        linkLabel: 'Read development status →',
        icon: Sparkles,
        featured: true,
      },
    ],
  },
  {
    id: 'ace-step',
    number: '02',
    name: 'ACE-Step 1.5',
    role: 'Music Generation',
    badge: 'In Evaluation',
    isBaseline: false,
    licenseShort: 'MIT + Apache 2.0',
    licenseDetail: 'MIT License (Core) · Apache 2.0 (Qwen3-Embedding-0.6B)',
    commercialTerms:
      'Both the ACE-Step 1.5 core model (MIT) and its Qwen3-Embedding-0.6B text encoder (Apache 2.0) carry commercially permissive open-source licenses suitable for self-hosted SaaS deployment.',
    upstreamAuthor: 'ACE-Step Team',
    upstreamUrl: 'https://github.com/ace-step/ACE-Step',
    upstreamLabel: 'github.com/ace-step/ACE-Step',
    headline: 'Full-song music generation from style prompts and structured lyrics.',
    summary:
      'ACE-Step 1.5 is an open-source foundation music generation model under evaluation for Miralas’s upcoming music workflow. It bridges diffusion-based acoustic synthesis with structured lyric conditioning across more than 50 languages.',
    secondarySummary:
      'Its architecture supports both lightweight worker footprints (4 GB+ VRAM baseline) and high-fidelity XL configurations (12 GB+ VRAM), enabling asynchronous job queue execution alongside our Rust API gateway.',
    honestStatusTitle: 'Current Evaluation Status',
    honestStatusBody:
      'ACE-Step 1.5 is currently under architectural and quality evaluation for Miralas’s planned music generation workflow. It is not yet deployed as a live public endpoint in Miralas.',
    specs: [
      { label: 'Task', value: 'Full-Song Generation' },
      { label: 'Max Duration', value: 'Up to 10 min', mono: true },
      { label: 'Languages', value: '50+ Languages' },
      { label: 'Core License', value: 'MIT License' },
      { label: 'Text Encoder', value: 'Qwen3-Embedding-0.6B (Apache 2.0)', mono: true },
      { label: 'Structure Tags', value: '[Verse] · [Chorus] · [Bridge]', mono: true },
      { label: 'VRAM Tiers', value: '4 GB+ Base · 12 GB+ XL', mono: true },
      { label: 'Miralas Status', value: 'Planned / In Evaluation' },
    ],
    capabilities: [
      {
        title: 'Prompt + Lyrics to Song',
        badge: 'Structured',
        description:
          'Generates complete musical tracks from style/genre descriptions combined with section markers ([Verse], [Chorus], [Bridge]).',
        icon: Music,
      },
      {
        title: 'Vocals & Instrumentals',
        badge: 'Dual Mode',
        description:
          'Synthesizes either vocal-led songs with lyric alignment or pure instrumental backing arrangements.',
        icon: AudioLines,
      },
      {
        title: '50+ Languages & Long Form',
        badge: '10s – 10 min',
        description:
          'Scales from short 10-second intros and creator hooks up to 10-minute full-length compositions across 50+ languages.',
        icon: Globe2,
      },
      {
        title: 'Fast SaaS-Ready Inference',
        badge: 'Worker Queue',
        description:
          'Low-VRAM baseline (4 GB+) and high-fidelity XL tier (12 GB+ VRAM) designed for predictable GPU worker queue throughput.',
        icon: Cpu,
      },
    ],
  },
  {
    id: 'stable-audio',
    number: '03',
    name: 'Stable Audio Open',
    role: 'Sound Effects & Loops',
    badge: 'In Evaluation',
    isBaseline: false,
    licenseShort: 'Stability Community',
    licenseDetail: 'Stability AI Community License',
    commercialTerms:
      'Free for research, non-commercial use, and commercial use for organizations under $1M USD in annual revenue (above $1M requires an enterprise agreement with Stability AI).',
    upstreamAuthor: 'Stability AI',
    upstreamUrl: 'https://huggingface.co/stabilityai/stable-audio-open-1.0',
    upstreamLabel: 'huggingface.co/stabilityai/stable-audio-open-1.0',
    headline: '44.1 kHz stereo sound effects, foley, ambient textures, and loops.',
    summary:
      'Stable Audio Open 1.0 is a latent Diffusion Transformer (DiT) text-to-audio model trained on free-culture audio data, evaluated for Miralas’s dedicated Sound Effects (SFX) and creator loop workflows.',
    secondarySummary:
      'By conditioning directly on start time and total duration embeddings, the model produces variable-length stereo audio up to 47 seconds at native 44.1 kHz sample rate without abrupt mid-bar cutoffs.',
    honestStatusTitle: 'Current Evaluation Status & Scope Boundaries',
    honestStatusBody:
      'Planned for Miralas’s dedicated Sound Effects and loop workflow and not yet publicly deployed. Stable Audio Open is designed strictly for non-vocal audio (SFX, foley, ambience, instrumental loops) rather than speech or vocal songs.',
    specs: [
      { label: 'Task', value: 'SFX, Ambience & Loops' },
      { label: 'Audio Output', value: '44.1 kHz Stereo', mono: true },
      { label: 'Max Duration', value: '47 sec', mono: true },
      { label: 'License', value: 'Stability Community' },
      { label: 'Commercial Tier', value: 'Free under $1M annual revenue' },
      { label: 'Architecture', value: 'Latent Diffusion Transformer (DiT)', mono: true },
      { label: 'Timing Control', value: 'seconds_start · seconds_total', mono: true },
      { label: 'Miralas Status', value: 'Planned / In Evaluation' },
    ],
    capabilities: [
      {
        title: 'Text-to-SFX & Foley',
        badge: '44.1 kHz Stereo',
        description:
          'Generates crisp sound effects, UI interactions, foley impacts, and cinematic transitions directly from text descriptions.',
        icon: Volume2,
      },
      {
        title: 'Ambient Soundscapes',
        badge: 'Atmospheric',
        description:
          'Creates spatial textures, environmental backgrounds, and stream/video beds with full stereo width.',
        icon: Waves,
      },
      {
        title: 'Instrumental Loops',
        badge: 'Up to 47 sec',
        description:
          'Produces BPM-aware drum breaks, synth riffs, and instrumental stems up to 47 seconds in length.',
        icon: Radio,
      },
      {
        title: 'Non-Vocal Scope Clarity',
        badge: 'Boundary',
        description:
          'Explicitly engineered for non-vocal audio (SFX, foley, ambience, loops)—speech uses Chatterbox and vocal songs use ACE-Step 1.5.',
        icon: AlertCircle,
      },
    ],
  },
];

const CHATTERBOX_VARIANTS = [
  {
    name: 'Chatterbox-Multilingual',
    params: '~500M',
    languages: '23 languages',
    feature: 'Multilingual zero-shot voice cloning (`t3_mtl23ls_v2.safetensors`)',
    bestFor: 'Current Miralas baseline & localization workflows',
    activeInMiralas: true,
  },
  {
    name: 'Chatterbox (English)',
    params: '~500M',
    languages: 'English',
    feature: 'Fine-grained CFG (`cfg_weight`) & emotion (`exaggeration`) control',
    bestFor: 'High-fidelity English narration',
    activeInMiralas: false,
  },
  {
    name: 'Chatterbox-Turbo',
    params: '~350M',
    languages: 'English',
    feature: 'Low latency, lower VRAM, paralinguistic tags (`[laugh]`, `[chuckle]`)',
    bestFor: 'Real-time conversational voice agents',
    activeInMiralas: false,
  },
  {
    name: 'Chatterbox-Nano',
    params: '~110M',
    languages: 'English',
    feature: 'Compact Turbo architecture for CPU / edge environments',
    bestFor: 'Resource-constrained setups',
    activeInMiralas: false,
  },
];

const CHATTERBOX_LANGUAGE_REGIONS = [
  {
    region: 'Europe (13)',
    languages:
      'English, German, French, Spanish, Italian, Portuguese, Dutch, Polish, Danish, Swedish, Norwegian, Finnish, Greek',
  },
  {
    region: 'Middle East & South Asia (4)',
    languages: 'Turkish, Arabic, Hebrew, Hindi',
  },
  {
    region: 'East Asia (4)',
    languages: 'Chinese, Japanese, Korean, Malay',
  },
  {
    region: 'Other Baseline (2)',
    languages: 'Russian, Swahili',
  },
];

const CHATTERBOX_LIMITATIONS = [
  {
    title: 'GPU hardware requirement',
    detail:
      'A dedicated GPU is required for practical synthesis speed. Real NVIDIA GPU benchmark numbers in Miralas will be published only after hardware measurement.',
  },
  {
    title: 'Uneven quality across 23 languages',
    detail:
      'Prosody and pronunciation quality vary by language. Each target language is evaluated with native listening tests before product exposure.',
  },
  {
    title: 'Sensitivity to reference audio',
    detail:
      'Noisy, reverberant, or multi-speaker reference clips degrade zero-shot voice cloning. Clean ~10-second single-speaker recordings perform best.',
  },
  {
    title: 'Long-form text chunking & tag scope',
    detail:
      'Splitting long passages into sentence chunks improves stability. Paralinguistic tags ([laugh], [chuckle]) apply only to Turbo/Nano, not Multilingual.',
  },
];

function isValidTab(value: string | null): value is ModelTabId {
  return (
    value === 'chatterbox' ||
    value === 'ace-step' ||
    value === 'stable-audio'
  );
}

export function ModelsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [override, setOverride] = useState<{
    param: string | null;
    tab: ModelTabId;
  } | null>(null);
  const selectedTab: ModelTabId =
    override && override.param === tabParam
      ? override.tab
      : isValidTab(tabParam)
        ? tabParam
        : 'chatterbox';
  const tabAudioRef = useRef<HTMLAudioElement | null>(null);

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

  const playTabSound = () => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 1024px)').matches &&
      tabAudioRef.current
    ) {
      try {
        tabAudioRef.current.currentTime = 0;
        void tabAudioRef.current.play().catch(() => {});
      } catch {
        // Ignore when autoplay is blocked
      }
    }
  };

  const handleSelectTab = (nextId: ModelTabId, scrollIntoView = false) => {
    if (nextId !== selectedTab) {
      setOverride({ param: tabParam, tab: nextId });
      playTabSound();
      router.replace(`/models?tab=${nextId}`, { scroll: false });
    }
    if (scrollIntoView && typeof document !== 'undefined') {
      document
        .getElementById('model-showcase-tabs')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % MODELS.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + MODELS.length) % MODELS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = MODELS.length - 1;
    }
    if (nextIndex === null) return;
    event.preventDefault();
    const nextModel = MODELS[nextIndex];
    if (!nextModel) return;
    handleSelectTab(nextModel.id);
    document.getElementById(`model-tab-${nextModel.id}`)?.focus();
  };

  return (
    <div className="min-h-screen bg-[#EFEFEF] pt-16 pb-24 text-[#1d1d1f] md:pt-24 md:pb-32 dark:bg-[#050505] dark:text-white">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* 1. Hero Header */}
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-xl bg-[#0d4bfa]"
            />
            <span className="text-xs font-medium tracking-[0.12em] text-neutral-700 uppercase sm:text-[13px] dark:text-[#D1D1D1]">
              MODEL ARCHITECTURE
            </span>
          </div>

          <h1 className="mt-4 text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-5xl lg:text-[4rem] dark:text-white">
            Open models behind Miralas.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-[1.6] text-neutral-600 sm:text-lg dark:text-[#6E6E74]">
            A transparent look at the self-hosted open-source audio stack
            powering Miralas across speech synthesis, voice cloning, music
            generation, and sound effects. Upstream model capabilities and
            Miransas product release status are documented side by side.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/news/miralas-status"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-xl bg-[#0d4bfa] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa]"
            >
              <span>Read Miralas status</span>
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>

            <Link
              href="/news/principles"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 transition-colors duration-200 hover:border-black/[0.16] hover:bg-[#F7F8FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:border-white/10 dark:bg-[#0a0a0a] dark:text-[#D1D1D1] dark:hover:border-white/20 dark:hover:bg-[#121214]"
            >
              <ShieldCheck className="size-4 text-[#0d4bfa]" aria-hidden />
              <span>Voice consent principles</span>
            </Link>

            <Link
              href="/news/chatterbox"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors duration-200 hover:border-black/[0.16] hover:bg-[#F7F8FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:border-white/10 dark:bg-[#0a0a0a] dark:text-[#D1D1D1] dark:hover:border-white/20 dark:hover:bg-[#121214]"
            >
              <span>Chatterbox integration note</span>
              <ArrowUpRight className="size-4 text-[#0d4bfa]" aria-hidden />
            </Link>
          </div>
        </header>

        {/* 2. Interactive 3-Tab Selector */}
        <section
          id="model-showcase-tabs"
          aria-label="Audio model architecture showcase"
          className="mt-14 scroll-mt-28 md:mt-20"
        >
          <div
            role="tablist"
            aria-label="Miralas audio models"
            className="grid grid-cols-1 gap-3 md:grid-cols-3"
          >
            {MODELS.map((model, index) => {
              const isSelected = selectedTab === model.id;
              return (
                <button
                  key={model.id}
                  id={`model-tab-${model.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`model-panel-${model.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => handleSelectTab(model.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-xl p-5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] ${
                    isSelected
                      ? 'border border-[#0d4bfa]/25 bg-white dark:border-[#0d4bfa]/40 dark:bg-[#0a0a0a]'
                      : 'border border-black/[0.08] bg-white hover:border-black/[0.16] hover:bg-[#F7F8FC] dark:border-white/10 dark:bg-[#0a0a0a] dark:hover:border-white/20 dark:hover:bg-[#121214]'
                  }`}
                >
                  {isSelected && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-4xl bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.09)_0%,rgba(13,75,250,0.03)_45%,transparent_72%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.18)_0%,rgba(13,75,250,0.05)_45%,transparent_72%)]"
                    />
                  )}

                  <div className="relative z-10 flex w-full items-center justify-between gap-2">
                    <span className="font-mono text-xs font-medium text-neutral-500 dark:text-[#6E6E74]">
                      {model.number} · {model.name}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-0.5 text-[11px] font-medium tracking-[0.06em] uppercase ${
                        model.isBaseline
                          ? 'bg-[#0d4bfa]/12 text-[#0d4bfa] dark:bg-[#0d4bfa]/20 dark:text-[#89abff]'
                          : 'bg-[#EFEFEF]/80 text-neutral-700 dark:bg-[#121214] dark:text-[#D1D1D1]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`size-1.5 rounded-xl ${
                          model.isBaseline
                            ? 'bg-[#0d4bfa]'
                            : 'bg-neutral-400 dark:bg-[#6E6E74]'
                        }`}
                      />
                      {model.badge}
                    </span>
                  </div>

                  <div className="relative z-10 mt-3.5">
                    <span className="block text-lg font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-white">
                      {model.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-neutral-600 sm:text-[13px] dark:text-[#D1D1D1]">
                      {model.role}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 3. Active Model Detail Panels (All 3 remain mounted in DOM for SEO) */}
          <div className="mt-6">
            {MODELS.map((model) => {
              const isSelected = selectedTab === model.id;
              return (
                <article
                  key={model.id}
                  id={`model-panel-${model.id}`}
                  role="tabpanel"
                  aria-labelledby={`model-tab-${model.id}`}
                  hidden={!isSelected}
                  className="relative overflow-hidden rounded-4xl border border-black/[0.08] bg-white p-7 sm:p-10 md:p-12 dark:border-white/10 dark:bg-[#0a0a0a]"
                >
                  {/* Soft ambient glow inside panel */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/3 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-4xl bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.06)_0%,transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.12)_0%,transparent_68%)]"
                  />

                  <div className="relative z-10 space-y-10">
                    {/* Block 1: Overview & Specs (2-Column) */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                      {/* Left Column: Narrative Overview + Honest Status */}
                      <div className="flex flex-col justify-between lg:col-span-7">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-2 rounded-xl bg-[#0d4bfa]/10 px-3 py-1 text-xs font-medium tracking-[0.08em] text-[#0d4bfa] uppercase dark:bg-[#121214] dark:text-[#89abff]">
                              <span
                                aria-hidden="true"
                                className="size-1.5 rounded-xl bg-[#0d4bfa]"
                              />
                              {model.badge}
                            </span>

                            <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#F7F8FC] px-3 py-1 font-mono text-xs text-neutral-700 dark:bg-[#121214] dark:text-[#D1D1D1]">
                              <Scale
                                className="size-3.5 text-[#0d4bfa]"
                                aria-hidden
                              />
                              {model.licenseShort}
                            </span>

                            <a
                              href={model.upstreamUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl bg-[#F7F8FC] px-3 py-1 font-mono text-xs text-neutral-700 transition-colors hover:text-[#0d4bfa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:bg-[#121214] dark:text-[#D1D1D1] dark:hover:text-white"
                            >
                              <span>{model.upstreamAuthor}</span>
                              <ExternalLink className="size-3" aria-hidden />
                            </a>
                          </div>

                          <h2 className="mt-5 text-2xl leading-[1.12] font-semibold tracking-[-0.025em] text-[#1d1d1f] sm:text-4xl dark:text-white">
                            {model.name} — {model.headline}
                          </h2>

                          <p className="mt-4 text-[15px] leading-[1.68] text-neutral-700 sm:text-base dark:text-[#D1D1D1]">
                            {model.summary}
                          </p>

                          <p className="mt-3 text-[15px] leading-[1.68] text-neutral-600 sm:text-base dark:text-[#6E6E74]">
                            {model.secondarySummary}
                          </p>
                        </div>

                        {/* Honest Status / Operational Boundaries Box (Tier 3 Borderless) */}
                        <div className="mt-6 rounded-3xl bg-[#F7F8FC] p-5 sm:p-6 dark:bg-[#121214]">
                          <div className="flex items-start gap-3">
                            <CheckCircle2
                              className="mt-0.5 size-5 shrink-0 text-[#0d4bfa]"
                              aria-hidden
                            />
                            <div>
                              <h3 className="text-sm font-semibold tracking-[-0.01em] text-[#1d1d1f] dark:text-white">
                                {model.honestStatusTitle}
                              </h3>
                              <p className="mt-1.5 text-xs leading-[1.6] text-neutral-600 sm:text-sm dark:text-[#D1D1D1]">
                                {model.honestStatusBody}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Borderless Technical Spec Grid */}
                      <div className="flex flex-col justify-between rounded-3xl bg-[#F7F8FC] p-6 sm:p-7 lg:col-span-5 dark:bg-[#121214]">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase dark:text-[#6E6E74]">
                              Technical Specifications
                            </span>
                            <span className="font-mono text-xs text-[#0d4bfa] dark:text-[#89abff]">
                              {model.number} / 03
                            </span>
                          </div>

                          <dl className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                            {model.specs.map((spec) => (
                              <div
                                key={spec.label}
                                className="rounded-xl bg-white p-3.5 dark:bg-[#0a0a0a]"
                              >
                                <dt className="text-[11px] font-medium tracking-[0.08em] text-neutral-500 uppercase dark:text-[#6E6E74]">
                                  {spec.label}
                                </dt>
                                <dd
                                  className={`mt-1.5 text-xs leading-[1.45] font-semibold text-[#1d1d1f] sm:text-[13px] dark:text-white ${
                                    spec.mono ? 'font-mono break-all' : ''
                                  }`}
                                >
                                  {spec.value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>

                        <div className="mt-5 rounded-xl bg-white p-3.5 dark:bg-[#0a0a0a]">
                          <span className="block text-[11px] font-medium tracking-[0.08em] text-neutral-500 uppercase dark:text-[#6E6E74]">
                            License &amp; Commercial Terms
                          </span>
                          <p className="mt-1 text-xs leading-[1.55] text-neutral-700 dark:text-[#D1D1D1]">
                            {model.commercialTerms}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Block 2: Capabilities Grid (4 Borderless Tiles) */}
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold tracking-[-0.015em] text-[#1d1d1f] sm:text-xl dark:text-white">
                          Core capabilities &amp; scope
                        </h3>
                        <span className="font-mono text-xs text-neutral-500 dark:text-[#6E6E74]">
                          {model.role}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {model.capabilities.map((cap) => {
                          const Icon = cap.icon;
                          return (
                            <div
                              key={cap.title}
                              className={`flex flex-col justify-between rounded-xl p-5 ${
                                cap.featured
                                  ? 'bg-[#0d4bfa]/[0.08] dark:bg-[#0d4bfa]/[0.14]'
                                  : 'bg-[#F7F8FC] dark:bg-[#121214]'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2">
                                  <span className="flex size-9 items-center justify-center rounded-xl bg-[#0d4bfa]/10 text-[#0d4bfa] dark:bg-white/[0.06] dark:text-[#89abff]">
                                    <Icon className="size-4" aria-hidden />
                                  </span>
                                  {cap.badge && (
                                    <span className="rounded-xl bg-black/[0.04] px-2.5 py-0.5 font-mono text-[11px] font-medium text-neutral-700 dark:bg-white/[0.06] dark:text-[#D1D1D1]">
                                      {cap.badge}
                                    </span>
                                  )}
                                </div>

                                <h4 className="mt-4 text-base font-semibold tracking-[-0.015em] text-[#1d1d1f] dark:text-white">
                                  {cap.title}
                                </h4>

                                <p className="mt-2 text-xs leading-[1.6] text-neutral-600 sm:text-[13px] dark:text-[#D1D1D1]">
                                  {cap.description}
                                </p>
                              </div>

                              {cap.linkHref && cap.linkLabel && (
                                <div className="mt-4 pt-2">
                                  <Link
                                    href={cap.linkHref}
                                    className="inline-flex items-center gap-1 rounded-xl text-xs font-medium text-[#0d4bfa] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:text-[#89abff]"
                                  >
                                    {cap.linkLabel}
                                  </Link>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Block 3: Interactive Architecture Pipeline Diagram */}
                    <ModelPipelineDiagram modelId={model.id} />

                    {/* Block 4: Model-Specific Engineering Reference Notes (Preserving all factual MDX details) */}
                    {model.id === 'chatterbox' && (
                      <div className="space-y-8 pt-2">
                        {/* Chatterbox Model Family & Language Coverage */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                          {/* Model Family Variants */}
                          <div className="rounded-3xl bg-[#F7F8FC] p-6 sm:p-7 lg:col-span-7 dark:bg-[#121214]">
                            <span className="font-mono text-xs tracking-[0.12em] text-neutral-500 uppercase dark:text-[#6E6E74]">
                              Upstream Model Family
                            </span>
                            <h3 className="mt-2 text-lg font-semibold tracking-[-0.015em] text-[#1d1d1f] sm:text-xl dark:text-white">
                              Chatterbox variants &amp; Miralas selection
                            </h3>
                            <p className="mt-1.5 text-xs leading-[1.6] text-neutral-600 sm:text-sm dark:text-[#6E6E74]">
                              Chatterbox is a four-model open-source family.
                              Miralas uses the approved{' '}
                              <code className="rounded-xl bg-black/[0.05] px-1.5 py-0.5 font-mono text-xs text-[#1d1d1f] dark:bg-white/[0.07] dark:text-white">
                                t3_mtl23ls_v2.safetensors
                              </code>{' '}
                              multilingual checkpoint.
                            </p>

                            <div className="mt-5 space-y-2.5">
                              {CHATTERBOX_VARIANTS.map((variant) => (
                                <div
                                  key={variant.name}
                                  className={`rounded-xl p-4 ${
                                    variant.activeInMiralas
                                      ? 'bg-[#0d4bfa]/[0.08] dark:bg-[#0d4bfa]/[0.14]'
                                      : 'bg-white dark:bg-[#0a0a0a]'
                                  }`}
                                >
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                                        {variant.name}
                                      </span>
                                      {variant.activeInMiralas && (
                                        <span className="rounded-xl bg-[#0d4bfa] px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.06em] text-white uppercase">
                                          Pinned in Miralas
                                        </span>
                                      )}
                                    </div>
                                    <span className="font-mono text-xs text-neutral-500 dark:text-[#6E6E74]">
                                      {variant.params} · {variant.languages}
                                    </span>
                                  </div>
                                  <p className="mt-1.5 text-xs leading-[1.55] text-neutral-600 dark:text-[#D1D1D1]">
                                    {variant.feature} —{' '}
                                    <span className="text-neutral-500 dark:text-[#6E6E74]">
                                      {variant.bestFor}
                                    </span>
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 23 Supported Languages + Uzbek Research Priority */}
                          <div className="flex flex-col justify-between rounded-3xl bg-[#F7F8FC] p-6 sm:p-7 lg:col-span-5 dark:bg-[#121214]">
                            <div>
                              <span className="font-mono text-xs tracking-[0.12em] text-neutral-500 uppercase dark:text-[#6E6E74]">
                                Language Coverage
                              </span>
                              <h3 className="mt-2 text-lg font-semibold tracking-[-0.015em] text-[#1d1d1f] sm:text-xl dark:text-white">
                                23 baseline languages &amp; Uzbek priority
                              </h3>
                              <p className="mt-1.5 text-xs leading-[1.6] text-neutral-600 sm:text-sm dark:text-[#6E6E74]">
                                Chatterbox-Multilingual supports 23 languages
                                out of the box (including Turkish, English, and
                                Russian).
                              </p>

                              <div className="mt-4 space-y-2.5">
                                {CHATTERBOX_LANGUAGE_REGIONS.map((item) => (
                                  <div
                                    key={item.region}
                                    className="rounded-xl bg-white p-3.5 dark:bg-[#0a0a0a]"
                                  >
                                    <span className="block font-mono text-[11px] font-medium text-[#0d4bfa] uppercase dark:text-[#89abff]">
                                      {item.region}
                                    </span>
                                    <p className="mt-1 text-xs leading-[1.55] text-neutral-700 dark:text-[#D1D1D1]">
                                      {item.languages}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-4 rounded-xl bg-[#0d4bfa]/[0.08] p-4 dark:bg-[#0d4bfa]/[0.14]">
                              <div className="flex items-center gap-2">
                                <Sparkles
                                  className="size-4 text-[#0d4bfa]"
                                  aria-hidden
                                />
                                <span className="text-xs font-semibold tracking-[0.06em] text-[#1d1d1f] uppercase dark:text-white">
                                  Uzbek Speech Research — In Development
                                </span>
                              </div>
                              <p className="mt-1.5 text-xs leading-[1.55] text-neutral-700 dark:text-[#D1D1D1]">
                                Uzbek is outside the 23-language Chatterbox
                                baseline. Native Uzbek speech synthesis and
                                evaluation remain a dedicated Miransas research
                                priority.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Known Limitations & Responsible Voice Cloning */}
                        <div className="rounded-3xl bg-[#F7F8FC] p-6 sm:p-7 dark:bg-[#121214]">
                          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                            <div>
                              <span className="font-mono text-xs tracking-[0.12em] text-neutral-500 uppercase dark:text-[#6E6E74]">
                                Operational Notes &amp; Guardrails
                              </span>
                              <h3 className="mt-1 text-lg font-semibold tracking-[-0.015em] text-[#1d1d1f] sm:text-xl dark:text-white">
                                Honest limitations &amp; PerTh watermark safety
                              </h3>
                            </div>
                            <Link
                              href="/news/principles"
                              className="inline-flex items-center gap-1.5 rounded-xl text-xs font-medium text-[#0d4bfa] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:text-[#89abff]"
                            >
                              <Lock className="size-3.5" aria-hidden />
                              <span>Read our consent policy</span>
                            </Link>
                          </div>

                          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {CHATTERBOX_LIMITATIONS.map((lim) => (
                              <div
                                key={lim.title}
                                className="rounded-xl bg-white p-4 dark:bg-[#0a0a0a]"
                              >
                                <h4 className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                                  {lim.title}
                                </h4>
                                <p className="mt-1.5 text-xs leading-[1.6] text-neutral-600 dark:text-[#6E6E74]">
                                  {lim.detail}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 4. 3-Column Model & License Matrix */}
        <section
          aria-labelledby="model-license-matrix-heading"
          className="mt-16 md:mt-24"
        >
          <div className="mb-8 max-w-2xl">
            <span className="text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase dark:text-[#6E6E74]">
              Open-Source Attribution &amp; Status
            </span>
            <h2
              id="model-license-matrix-heading"
              className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#1d1d1f] sm:text-4xl dark:text-white"
            >
              Model &amp; license matrix
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-neutral-600 sm:text-base dark:text-[#6E6E74]">
              Every audio foundation model in the Miralas stack is selected for
              clear licensing, self-hosted execution, and domain specialization.
              Select any model card to inspect its architecture diagram.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {MODELS.map((model) => {
              const isSelected = selectedTab === model.id;
              return (
                <div
                  key={model.id}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 transition-all duration-200 hover:-translate-y-1 ${
                    isSelected
                      ? 'border border-[#0d4bfa]/20 bg-white dark:border-[#0d4bfa]/30 dark:bg-[#0a0a0a]'
                      : 'border border-black/[0.08] bg-white hover:border-black/[0.16] hover:bg-[#F7F8FC] dark:border-white/10 dark:bg-[#0a0a0a] dark:hover:border-white/20 dark:hover:bg-[#121214]'
                  }`}
                >
                  {isSelected && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-4xl bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.09)_0%,rgba(13,75,250,0.03)_42%,transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.16)_0%,rgba(13,75,250,0.05)_42%,transparent_70%)]"
                    />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 rounded-xl bg-[#F7F8FC] px-3 py-1 text-xs font-medium tracking-[0.08em] text-neutral-800 uppercase dark:bg-[#121214] dark:text-[#D1D1D1]">
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-xl bg-[#0d4bfa]"
                        />
                        {model.badge}
                      </span>
                      <span className="font-mono text-xs text-neutral-500 dark:text-[#6E6E74]">
                        {model.number} / 03
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-2xl dark:text-white">
                      {model.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-[#0d4bfa] sm:text-[13px] dark:text-[#89abff]">
                      {model.role}
                    </p>

                    <div className="mt-5 space-y-2.5">
                      <div className="rounded-xl bg-[#F7F8FC] p-3.5 dark:bg-[#121214]">
                        <span className="block font-mono text-[11px] tracking-[0.08em] text-neutral-500 uppercase dark:text-[#6E6E74]">
                          License
                        </span>
                        <span className="mt-1 block text-xs font-semibold text-[#1d1d1f] sm:text-[13px] dark:text-white">
                          {model.licenseDetail}
                        </span>
                      </div>

                      <div className="rounded-xl bg-[#F7F8FC] p-3.5 dark:bg-[#121214]">
                        <span className="block font-mono text-[11px] tracking-[0.08em] text-neutral-500 uppercase dark:text-[#6E6E74]">
                          Commercial &amp; Hosting Terms
                        </span>
                        <p className="mt-1 text-xs leading-[1.55] text-neutral-600 dark:text-[#D1D1D1]">
                          {model.commercialTerms}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleSelectTab(model.id, true)}
                      className="inline-flex items-center gap-1.5 rounded-xl text-xs font-semibold text-[#0d4bfa] transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] sm:text-[13px] dark:text-white"
                    >
                      <span>
                        {isSelected
                          ? 'Viewing architecture'
                          : 'Inspect architecture'}
                      </span>
                      <ArrowRight className="size-3.5 text-[#0d4bfa]" aria-hidden />
                    </button>

                    <a
                      href={model.upstreamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-xl font-mono text-[11px] text-neutral-500 transition-colors hover:text-[#0d4bfa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:text-[#6E6E74] dark:hover:text-[#D1D1D1]"
                    >
                      <span>Upstream</span>
                      <ExternalLink className="size-3" aria-hidden />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Footer Navigation Strip */}
        <section
          aria-label="Related Miralas and policy resources"
          className="mt-16 md:mt-20"
        >
          <div className="flex flex-col justify-between gap-6 rounded-3xl border border-black/[0.08] bg-white p-7 sm:p-8 lg:flex-row lg:items-center dark:border-white/10 dark:bg-[#0a0a0a]">
            <div>
              <span className="font-mono text-xs tracking-[0.12em] text-neutral-500 uppercase dark:text-[#6E6E74]">
                Continue exploring
              </span>
              <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-2xl dark:text-white">
                Platform architecture, principles, and support.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/projects#miralas"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0d4bfa] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa]"
              >
                <Layers className="size-4" aria-hidden />
                <span>Miralas project overview</span>
              </Link>

              <Link
                href="/news/principles"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#F7F8FC] px-4 py-2.5 text-sm font-medium text-[#1d1d1f] transition-colors hover:bg-black/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:bg-[#121214] dark:text-[#D1D1D1] dark:hover:bg-white/[0.08]"
              >
                <ShieldCheck className="size-4 text-[#0d4bfa]" aria-hidden />
                <span>What we will not build</span>
              </Link>

              <Link
                href="/support"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#F7F8FC] px-4 py-2.5 text-sm font-medium text-[#1d1d1f] transition-colors hover:bg-black/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:bg-[#121214] dark:text-[#D1D1D1] dark:hover:bg-white/[0.08]"
              >
                <FileAudio className="size-4 text-[#0d4bfa]" aria-hidden />
                <span>Support &amp; FAQ</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
