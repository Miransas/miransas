"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Cpu,
  Globe2,
  Megaphone,
  Mic,
  Pause,
  Play,
  RefreshCw,
  Sparkles,
  Timer,
  Volume2,
  Zap,
  Languages,
  AudioWaveform,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

import { cn } from "@/lib/utils";
import { FaRadio } from "react-icons/fa6";

// ─────────────────────────────────────────────────────────────
// GÜNCEL VERİLER & KATEGORİLER (2026)
// ─────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "featured", label: "Featured Update" },
  { id: "all-posts", label: "Latest Updates" },
  { id: "voices", label: "Voice Samples" },
  { id: "performance", label: "Model Capabilities" },
  { id: "roadmap", label: "Languages" },
];

const BLOG_POSTS = [
  {
    id: "post-1",
    category: "Voice Network",
    date: "September 01, 2026",
    readTime: "3 min read",
    title: "Miralas Voice Network Is Expanding",
    excerpt:
      "Our Uzbek voice program is moving forward with new speakers and a broader multilingual evaluation set. The next phase is focused on native-language quality, consistency and real-world speech.",
    featured: true,
  },
  {
    id: "post-2",
    category: "Research",
    date: "August 31, 2026",
    readTime: "5 min read",
    title: "Why Uzbek Is a First-Class Training Track for Miralas",
    excerpt:
      "Instead of treating Uzbek as a translation afterthought, Miralas is building language-specific data, phoneme coverage and evaluation around native speech.",
    featured: false,
  },
  {
    id: "post-3",
    category: "Multilingual",
    date: "August 28, 2026",
    readTime: "4 min read",
    title: "Adding More Global Languages to the Evaluation Lab",
    excerpt:
      "English, Spanish, Chinese, Hindi, Arabic, Japanese, Korean, French, German, Portuguese, Turkish and Russian are now part of the broader comparison set.",
    featured: false,
  },
  {
    id: "post-4",
    category: "Models",
    date: "August 25, 2026",
    readTime: "6 min read",
    title: "Miralas vs. the New Generation of Voice AI",
    excerpt:
      "We are comparing Miralas with GPT-Realtime, Gemini Live, Grok Voice and the Chatterbox baseline using transparent capability categories rather than invented leaderboard numbers.",
    featured: false,
  },
  {
    id: "post-5",
    category: "Engineering",
    date: "August 22, 2026",
    readTime: "7 min read",
    title: "Inside the Miralas Training Pipeline",
    excerpt:
      "From clean speech data and speaker embeddings to evaluation and inference, this is the direction behind our next voice models.",
    featured: false,
  },
];

const LANGUAGE_SET = [
  { name: "English", code: "en", flag: "🇬🇧", status: "Baseline", tone: "blue" },
  { name: "Spanish", code: "es", flag: "🇪🇸", status: "Baseline", tone: "rose" },
  { name: "Chinese", code: "zh", flag: "🇨🇳", status: "Baseline", tone: "amber" },
  { name: "Hindi", code: "hi", flag: "🇮🇳", status: "Baseline", tone: "emerald" },
  { name: "Arabic", code: "ar", flag: "🇸🇦", status: "Baseline", tone: "indigo" },
  { name: "Japanese", code: "ja", flag: "🇯🇵", status: "Baseline", tone: "purple" },
  { name: "Korean", code: "ko", flag: "🇰🇷", status: "Baseline", tone: "blue" },
  { name: "French", code: "fr", flag: "🇫🇷", status: "Baseline", tone: "rose" },
  { name: "German", code: "de", flag: "🇩🇪", status: "Baseline", tone: "amber" },
  { name: "Portuguese", code: "pt", flag: "🇵🇹", status: "Baseline", tone: "emerald" },
  { name: "Turkish", code: "tr", flag: "🇹🇷", status: "Baseline", tone: "indigo" },
  { name: "Russian", code: "ru", flag: "🇷🇺", status: "Baseline", tone: "purple" },
  { name: "Uzbek", code: "uz", flag: "🇺🇿", status: "Miralas native training", tone: "amber" },
];

const MODEL_CAPABILITIES = [
  {
    name: "Miralas",
    provider: "Miralas / Chatterbox Multilingual V3",
    badge: "Miralas",
    color: "bg-blue-500",
    audio: "/audio/arena/miralas.wav",
    description: "Open multilingual baseline with Miralas-specific training and evaluation.",
    capabilities: ["Voice cloning", "Multilingual TTS", "Custom training", "Uzbek research"],
  },
  {
    name: "GPT-Realtime",
    provider: "OpenAI",
    badge: "OpenAI",
    color: "bg-emerald-500",
    audio: "/audio/arena/gpt-realtime.wav",
    description: "Realtime text/audio model for conversational voice applications.",
    capabilities: ["Realtime audio", "Audio input/output", "WebRTC", "WebSocket / SIP"],
  },
  {
    name: "Gemini 3.1 Flash Live",
    provider: "Google",
    badge: "Google",
    color: "bg-purple-500",
    audio: "/audio/arena/gemini-3.1-live.wav",
    description: "Google's realtime audio model for natural dialogue through the Live API.",
    capabilities: ["Realtime dialogue", "Audio input/output", "Live API", "Multimodal"],
  },
  {
    name: "Grok Voice",
    provider: "xAI",
    badge: "xAI",
    color: "bg-rose-500",
    audio: "/audio/arena/grok-voice.wav",
    description: "xAI voice capability included as an external comparison reference.",
    capabilities: ["Voice", "Realtime", "Conversational AI", "External reference"],
  },
];

const MODEL_FACTS = [
  {
    label: "Miralas baseline",
    value: "500M",
    detail: "Chatterbox Multilingual V3",
    icon: Cpu,
  },
  {
    label: "Chatterbox coverage",
    value: "23+",
    detail: "Languages out of the box",
    icon: Languages,
  },
  {
    label: "GPT-Realtime",
    value: "Audio I/O",
    detail: "Realtime voice model",
    icon: FaRadio,
  },
  {
    label: "Gemini Live",
    value: "A2A Audio",
    detail: "Gemini 3.1 Flash Live",
    icon: Volume2,
  },
];

// ─────────────────────────────────────────────────────────────
// YARDIMCI BİLEŞENLER
// ─────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  color,
}: {
  icon: any;
  label: string;
  value: React.ReactNode;
  subtext: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-white/10 bg-card/30 p-5 backdrop-blur-sm transition-colors"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className={cn("flex size-9 items-center justify-center rounded-xl", color)}>
          <Icon className="size-4.5 text-white" />
        </div>
        <span className="text-xs font-medium uppercase tracking-wider text-stone-400">{label}</span>
      </div>
      <div className="text-2xl font-bold text-stone-200">{value}</div>
      <div className="mt-1 text-xs text-stone-400">{subtext}</div>
    </motion.div>
  );
}

function Waveform({
  playing,
  progress,
  colorClass,
}: {
  playing: boolean;
  progress: number;
  colorClass: string;
}) {
  const bars = [
    18, 30, 44, 24, 61, 36, 72, 48, 27, 58, 78, 42, 67, 31, 52, 86,
    40, 62, 29, 74, 47, 25, 57, 76, 35, 65, 43, 82, 30, 56, 45, 70,
    28, 51, 74, 39, 64, 34, 79, 48, 59, 27, 71, 41, 55, 77, 38, 62,
  ];

  return (
    <div className="flex h-20 w-full items-center justify-center gap-[3px]">
      {bars.map((height, index) => {
        const played = (index / bars.length) * 100 <= progress;

        return (
          <motion.div
            key={index}
            animate={
              playing
                ? { scaleY: [1, 0.55 + ((index * 13) % 40) / 100, 1] }
                : { scaleY: 1 }
            }
            transition={{
              repeat: playing ? Infinity : 0,
              duration: 0.5 + (index % 5) * 0.07,
            }}
            className={cn(
              "w-[3px] origin-center rounded-full transition-colors",
              played ? colorClass : "bg-muted/35"
            )}
            style={{ height: `${Math.max(12, height)}%` }}
          />
        );
      })}
    </div>
  );
}

function AudioSample({
  modelName,
  provider,
  colorClass,
  audioSrc,
  duration = "0:12",
  transcript,
}: {
  modelName: string;
  provider: string;
  colorClass: string;
  audioSrc: string;
  duration?: string;
  transcript: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const seek = (event: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    audio.currentTime = audio.duration * ratio;
    setProgress(ratio * 100);
  };

  return (
    <div className="rounded-2xl border border-border bg-black p-5 transition-colors hover:border-border/80">
      <audio ref={audioRef} preload="metadata" src={audioSrc} />

      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className={cn("size-2.5 shrink-0 rounded-full", colorClass)} />
          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-fg">{modelName}</h4>
            <p className="mt-0.5 text-[10px] text-stone-400">{provider}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-secondary px-2 py-1 text-[9px] uppercase tracking-wider text-stone-400">
          Audio sample
        </span>
      </div>

      <div
        onClick={seek}
        className="relative mb-4 cursor-pointer overflow-hidden rounded-xl bg-secondary/40 px-4"
      >
        <div
          className="absolute inset-y-0 left-0 bg-fg/5 transition-[width]"
          style={{ width: `${progress}%` }}
        />
        <div className="relative z-10">
          <Waveform playing={playing} progress={progress} colorClass={colorClass} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label={playing ? `Pause ${modelName}` : `Play ${modelName}`}
            className="flex size-10 items-center justify-center rounded-full bg-fg text-bg transition-transform hover:scale-105 active:scale-95"
          >
            {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
          </button>
          <span className="font-mono text-xs text-stone-300">0:00 / {duration}</span>
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="flex items-center gap-1 text-xs text-stone-400 transition-colors hover:text-fg"
        >
          Transcript
          <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="border-t border-border/60 pt-3 mt-4 text-xs leading-relaxed text-stone-400">
              {transcript}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CapabilityRow({
  label,
  values,
}: {
  label: string;
  values: string[];
}) {
  return (
    <div className="grid grid-cols-[1.5fr_repeat(4,minmax(90px,1fr))] items-center border-t border-border/60 py-3 text-xs">
      <span className="font-medium text-stone-200">{label}</span>
      {values.map((value, index) => (
        <span
          key={`${label}-${index}`}
          className={cn(
            "px-2 text-center",
            value === "✓" ? "font-semibold text-emerald-400" : "text-stone-500"
          )}
        >
          {value}
        </span>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ANA SAYFA BİLEŞENİ
// ─────────────────────────────────────────────────────────────

export default function NewsPage() {
  const [activeSection, setActiveSection] = useState("featured");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 260;

      for (let index = sections.length - 1; index >= 0; index -= 1) {
        const section = sections[index];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="container-page mx-auto min-h-screen bg-black px-4 pb-24 pt-32">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-14 max-w-4xl"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400">
          <Megaphone className="size-3.5" />
          Miralas Voice Intelligence
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-fg sm:text-6xl">
          Voice AI,{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            in progress.
          </span>
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-400">
          Research updates, model comparisons, language expansion and real
          voice samples from the Miralas team.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-stone-500">
          <span className="rounded-full border border-border px-3 py-1.5">
            Native-language research
          </span>
          <span className="rounded-full border border-border px-3 py-1.5">
            Multilingual TTS
          </span>
          <span className="rounded-full border border-border px-3 py-1.5">
            Voice cloning
          </span>
          <span className="rounded-full border border-border px-3 py-1.5">
            Realtime evaluation
          </span>
        </div>
      </motion.header>

      <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          icon={Cpu}
          label="Miralas baseline"
          value="500M"
          subtext="Chatterbox Multilingual V3"
          color="bg-blue-500"
        />
        <StatCard
          icon={Languages}
          label="Baseline coverage"
          value="23+"
          subtext="Chatterbox multilingual languages"
          color="bg-emerald-500"
        />
        <StatCard
          icon={Volume2}
          label="Audio"
          value="Realtime"
          subtext="Voice AI evaluation stack"
          color="bg-indigo-500"
        />
        <StatCard
          icon={Mic}
          label="Uzbek"
          value="Native"
          subtext="Miralas training direction"
          color="bg-amber-500"
        />
      </div>

      <div className="flex flex-col gap-12 lg:flex-row">
        <main className="min-w-0 flex-1 space-y-24">
          {/* FEATURED */}
          <section id="featured" className="scroll-mt-28 space-y-6">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-stone-400">
              <Sparkles className="size-4 text-blue-400" />
              Featured Update
            </h2>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl border border-border bg-card/40 p-7 sm:p-9"
            >
              <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-stone-400">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-400">
                  Voice Network
                </span>
                <span>September 01, 2026</span>
                <span>•</span>
                <span>3 min read</span>
              </div>

              <h3 className="max-w-3xl text-2xl font-bold text-fg sm:text-4xl">
                Miralas Voice Network Is Expanding
              </h3>

              <p className="mt-4 max-w-3xl leading-relaxed text-stone-400">
                We are continuing the Miralas voice program with new speakers
                and a wider multilingual evaluation set. Uzbek remains a core
                research direction while popular global languages are used for
                cross-language quality testing.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <div className="text-xs font-semibold text-fg">New voices</div>
                  <div className="mt-1 text-xs text-stone-400">
                    More speakers are being evaluated.
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <div className="text-xs font-semibold text-fg">Uzbek</div>
                  <div className="mt-1 text-xs text-stone-400">
                    Native-language training remains a priority.
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <div className="text-xs font-semibold text-fg">Global</div>
                  <div className="mt-1 text-xs text-stone-400">
                    More languages enter the evaluation lab.
                  </div>
                </div>
              </div>

              <p className="mt-7 text-xs leading-relaxed text-stone-500">
                Previous individual voice collaborations are no longer part of
                the current Miralas voice program. We are moving forward with
                new contributors and our own training pipeline.
              </p>
            </motion.article>
          </section>

          {/* LATEST */}
          <section id="all-posts" className="scroll-mt-28 space-y-6">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-stone-400">
              <BookOpen className="size-4 text-indigo-400" />
              Latest Updates
            </h2>

            <div className="grid gap-4">
              {BLOG_POSTS.filter((post) => !post.featured).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="group rounded-2xl border border-border bg-card/30 p-6 transition-colors hover:bg-card/60"
                >
                  <div className="mb-3 flex flex-wrap gap-2 text-xs text-stone-500">
                    <span className="text-stone-300">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-200 transition-colors group-hover:text-blue-400">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-400">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-blue-400">
                    Read update <ArrowRight className="size-3.5" />
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* VOICES */}
          <section id="voices" className="scroll-mt-28 space-y-6">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-fg">
                <Mic className="size-6 text-blue-400" />
                Voice Samples
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-400">
                Side-by-side reference audio for the models we evaluate.
                Replace the local files with your own generated or licensed
                samples before shipping.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {MODEL_CAPABILITIES.map((model) => (
                <div
                  key={model.name}
                  className="rounded-3xl border border-border bg-card/30 p-5"
                >
                  <div className="mb-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-fg">{model.name}</h3>
                        <p className="mt-1 text-[10px] text-stone-500">
                          {model.provider}
                        </p>
                      </div>
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-[9px] uppercase tracking-wider text-stone-400">
                        {model.badge}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-stone-400">
                      {model.description}
                    </p>
                  </div>

                  <AudioSample
                    modelName={model.name}
                    provider={model.provider}
                    colorClass={model.color}
                    audioSrc={model.audio}
                    transcript={
                      model.name === "Miralas"
                        ? "Miralas evaluation sample. Use the exact same sentence across all models for a fair comparison."
                        : `${model.name} reference sample. Use a licensed or API-generated recording for this model.`
                    }
                  />

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {model.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="rounded-full border border-border px-2 py-1 text-[9px] text-stone-400"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MODEL CAPABILITIES */}
          <section id="performance" className="scroll-mt-28 space-y-6">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-fg">
                <BarChart3 className="size-6 text-rose-400" />
                Model Capabilities
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-400">
                A transparent capability map — not a fabricated cross-vendor
                benchmark. Latency, MOS, WER and reasoning scores will be shown
                only after Miralas runs the same evaluation methodology across
                every system.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-card/30 p-5 sm:p-7">
              <div className="hidden grid-cols-[1.5fr_repeat(4,minmax(90px,1fr))] border-b border-border pb-3 text-[10px] uppercase tracking-wider text-stone-500 sm:grid">
                <span>Capability</span>
                <span className="text-center">Miralas</span>
                <span className="text-center">GPT</span>
                <span className="text-center">Gemini</span>
                <span className="text-center">Grok</span>
              </div>

              <CapabilityRow
                label="Realtime audio"
                values={["✓", "✓", "✓", "✓"]}
              />
              <CapabilityRow
                label="Audio input / output"
                values={["✓", "✓", "✓", "✓"]}
              />
              <CapabilityRow
                label="Voice cloning"
                values={["✓", "—", "—", "—"]}
              />
              <CapabilityRow
                label="Open-source baseline"
                values={["✓", "—", "—", "—"]}
              />
              <CapabilityRow
                label="Custom language training"
                values={["✓", "—", "—", "—"]}
              />
              <CapabilityRow
                label="Uzbek training track"
                values={["✓", "—", "—", "—"]}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {MODEL_FACTS.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={fact.label}
                    className="rounded-2xl border border-border bg-card/30 p-5"
                  >
                    <Icon className="mb-4 size-5 text-blue-400" />
                    <div className="text-[10px] uppercase tracking-wider text-stone-500">
                      {fact.label}
                    </div>
                    <div className="mt-1 text-xl font-bold text-fg">{fact.value}</div>
                    <div className="mt-1 text-xs text-stone-500">{fact.detail}</div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-xs leading-relaxed text-stone-400">
              <strong className="text-stone-200">Benchmark policy:</strong>{" "}
              vendor capabilities are presented as documented capabilities.
              Internal Miralas metrics will be labeled separately with the
              evaluation date, hardware, dataset and methodology.
            </div>
          </section>

          {/* LANGUAGES */}
          <section id="roadmap" className="scroll-mt-28 space-y-6">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-fg">
                <Globe2 className="size-6 text-emerald-400" />
                Languages
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-400">
                Popular global languages are part of our evaluation set.
                Uzbek has a separate Miralas-native training direction.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {LANGUAGE_SET.map((language) => (
                <motion.div
                  key={language.code}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={cn(
                    "rounded-2xl border p-4 transition-colors",
                    language.code === "uz"
                      ? "border-amber-500/25 bg-amber-500/5"
                      : "border-border bg-card/30 hover:bg-card/50"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{language.flag}</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-[9px] uppercase tracking-wider",
                        language.code === "uz"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-secondary text-stone-500"
                      )}
                    >
                      {language.status}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold text-fg">{language.name}</h3>
                  <p className="mt-1 font-mono text-[10px] text-stone-500">
                    {language.code}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent p-7">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
                  <Mic className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-fg">
                    Uzbek — Miralas Native Training Track
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-400">
                    Uzbek is being treated as a first-class training and
                    evaluation target rather than simply relying on a generic
                    multilingual checkpoint. The program focuses on native
                    pronunciation, phoneme coverage, prosody, speaker
                    consistency and real-world conversational speech.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] text-amber-400">
                      Native data
                    </span>
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] text-amber-400">
                      Speaker evaluation
                    </span>
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] text-amber-400">
                      Phoneme coverage
                    </span>
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] text-amber-400">
                      Prosody
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-32 border-l border-border pl-6">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-stone-500">
              On this page
            </span>

            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                    activeSection === item.id
                      ? "bg-lime-500 text-stone-700"
                      : "text-stone-500 hover:bg-secondary/50 hover:text-fg"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card/30 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-fg">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                Current direction
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-stone-500">
                New voice contributors + native Uzbek research + global
                multilingual evaluation.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
