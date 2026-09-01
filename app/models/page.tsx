"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  AudioWaveform,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Globe2,
  Mic,
  Play,
  Pause,
  Sparkles,
  RefreshCw,
  Zap,
  BarChart3,
  Timer,
  TrendingUp,
  Volume2,
  Languages,
  BrainCircuit,
  Target,
  Award,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useState, useRef, type ReactNode } from "react";
import useSWR from "swr";

import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
// GÜNCEL VERİLER & KATEGORİLER (2026 Benchmark Verileri)
// ─────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "voice-arena", label: "Model Arena" },
  { id: "chatterbox-v3", label: "Chatterbox V3" },
  { id: "custom-models", label: "Custom Voices" },
  { id: "benchmarks", label: "Benchmarks" },
  { id: "live-metrics", label: "Live Metrics" },
  { id: "roadmap", label: "Roadmap" },
];

// Güncel Arena Kategorileri (2026 Full-Duplex-Bench-v3 bazlı)
const ARENA_CATEGORIES = [
  { id: "strategic", label: "Strategic Reasoning" },
  { id: "tone", label: "Tone & Expressiveness" },
  { id: "spatial", label: "Spatial Reasoning" },
  { id: "alphanumerics", label: "Alphanumerics" },
  { id: "logic", label: "Logic Puzzle" },
  { id: "disfluency", label: "Disfluency Handling" },
  { id: "multistep", label: "Multi-Step Tool Use" },
];

// Güncel Dil Yol Haritası — Uzbek casting aşamasında
const UPCOMING_LANGUAGES = [
  { name: "English", flag: "🇬🇧", status: "Baseline / evaluation", progress: 100, stage: "late", eta: "Available" },
  { name: "Spanish", flag: "🇪🇸", status: "Baseline / evaluation", progress: 100, stage: "late", eta: "Available" },
  { name: "Chinese", flag: "🇨🇳", status: "Baseline / evaluation", progress: 100, stage: "late", eta: "Available" },
  { name: "Hindi", flag: "🇮🇳", status: "Baseline / evaluation", progress: 100, stage: "late", eta: "Available" },
  { name: "Arabic", flag: "🇸🇦", status: "Baseline / evaluation", progress: 100, stage: "late", eta: "Available" },
  { name: "Japanese", flag: "🇯🇵", status: "Baseline / evaluation", progress: 100, stage: "late", eta: "Available" },
  { name: "Uzbek", flag: "🇺🇿", status: "Miralas native-language training", progress: 22, stage: "early", eta: "In training" },
];

// 2026 Gerçek Benchmark Verileri (Artificial Analysis, Full-Duplex-Bench-v3, Trelis Research)
const BENCHMARK_DATA = {
  // Cross-vendor performance numbers are intentionally NOT fabricated here.
  // Public vendor documentation does not provide an apples-to-apples benchmark
  // for latency, MOS, WER, reasoning or tool-use across these systems.
  // Keep these fields for internal Miralas measurements only.
  internal: {
    miralas: {
      label: "Miralas / Chatterbox pipeline",
      note: "Internal measurement — replace with your measured run",
    },
  },

  // Verified model facts from official documentation (Sep 2026).
  models: {
    miralas: {
      name: "Miralas",
      engine: "Chatterbox Multilingual V3 + Miralas training",
      params: "500M baseline",
      languages: "23+ baseline languages",
      audio: "Voice cloning / TTS",
      source: "Resemble AI Chatterbox",
    },
    gpt: {
      name: "GPT-Realtime",
      engine: "GPT-Realtime",
      audio: "Audio input + output",
      realtime: "WebRTC / WebSocket / SIP",
      source: "OpenAI",
    },
    gemini: {
      name: "Gemini 3.1 Flash Live",
      engine: "gemini-3.1-flash-live-preview",
      audio: "Low-latency audio-to-audio",
      realtime: "Live API",
      source: "Google",
    },
    grok: {
      name: "Grok Voice",
      engine: "xAI Grok voice stack",
      audio: "Voice / realtime product capability",
      source: "xAI",
    },
  },

  // Chatterbox Multilingual V3 officially lists these 23 baseline languages.
  languages: [
    ["English", "en"],
    ["Spanish", "es"],
    ["French", "fr"],
    ["German", "de"],
    ["Italian", "it"],
    ["Portuguese", "pt"],
    ["Chinese", "zh"],
    ["Japanese", "ja"],
    ["Korean", "ko"],
    ["Hindi", "hi"],
    ["Arabic", "ar"],
    ["Russian", "ru"],
    ["Turkish", "tr"],
    ["Dutch", "nl"],
    ["Polish", "pl"],
    ["Greek", "el"],
    ["Hebrew", "he"],
    ["Danish", "da"],
    ["Finnish", "fi"],
    ["Norwegian", "no"],
    ["Swedish", "sv"],
    ["Malay", "ms"],
    ["Swahili", "sw"],
  ],
};

const FALLBACK_METRICS = {
  // Internal telemetry only. Do not present these as vendor benchmarks.
  quality: { miralas: 0, gpt: 0, gemini: 0, grok: 0 },
  latency: { miralas: 0, gpt: 0, gemini: 0, grok: 0 },
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// ─────────────────────────────────────────────────────────────
// YARDIMCI BİLEŞENLER
// ─────────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "", duration = 1.5 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Number((target * eased).toFixed(target % 1 === 0 ? 0 : 1)));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, subtext, color }: { icon: any; label: string; value: ReactNode; subtext: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border bg-black  p-5 backdrop-blur-sm "
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("flex size-9 items-center justify-center rounded-xl", color)}>
          <Icon className="size-4.5 text-white" />
        </div>
        <span className="text-xs font-medium text-stone-200 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-bold text-stone-300">{value}</div>
      <div className="text-xs text-stone-400 mt-1">{subtext}</div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// KARŞILAŞTIRMALI SES OYNATMA KARTI (Arena)
// ─────────────────────────────────────────────────────────────

interface ModelAudioBoxProps {
  modelName: string;
  provider: string;
  badgeColor: string;
  duration: string;
  transcriptText: string;
  audioSrc?: string;
  status?: "sample" | "official" | "internal";
  metrics?: { latency?: number; mos?: number };
}

function ModelAudioBox({
  modelName,
  provider,
  badgeColor,
  duration,
  transcriptText,
  audioSrc,
  status = "sample",
  metrics,
}: ModelAudioBoxProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audioSrc || !audio) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const resetPlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setProgress(0);
    setIsPlaying(false);
  };

  const waveform = [
    18, 34, 52, 28, 68, 42, 78, 55, 30, 64, 84, 48, 72, 38, 58, 91,
    46, 67, 35, 76, 54, 29, 62, 81, 43, 70, 51, 88, 36, 60, 47, 74,
    32, 56, 80, 44, 69, 38, 85, 52, 63, 31, 77, 45, 59, 82, 40, 66,
  ];

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm hover:border-border/80 transition-colors">
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className={cn("size-2.5 shrink-0 rounded-full", badgeColor)} />
            <div className="min-w-0">
              <h4 className="font-semibold text-fg text-sm truncate">{modelName}</h4>
              <p className="text-[10px] text-stone-400 mt-0.5">{provider}</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
            {status}
          </span>
        </div>

        {metrics && (
          <div className="flex flex-wrap gap-2 mb-3">
            {metrics.latency !== undefined && (
              <div className="flex items-center gap-1 text-[10px] text-stone-300 bg-secondary/50 px-2 py-0.5 rounded-full">
                <Timer className="size-3" />
                {metrics.latency}ms internal
              </div>
            )}
            {metrics.mos !== undefined && (
              <div className="flex items-center gap-1 text-[10px] text-stone-300 bg-secondary/50 px-2 py-0.5 rounded-full">
                <Volume2 className="size-3" />
                {metrics.mos} MOS internal
              </div>
            )}
          </div>
        )}

        <div
          className="relative my-4 flex h-20 w-full items-center rounded-xl bg-secondary/40 px-4 overflow-hidden cursor-pointer"
          onClick={() => {
            const audio = audioRef.current;
            if (!audioSrc || !audio) return;
            audio.currentTime = (audio.duration || 1) * (progress / 100);
          }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="absolute inset-y-0 left-0 bg-fg/5" style={{ width: `${progress}%` }} />
          <div className="relative z-10 flex w-full items-center justify-center gap-[3px]">
            {waveform.map((h, i) => {
              const played = (i / waveform.length) * 100 <= progress;
              return (
                <motion.div
                  key={i}
                  animate={isPlaying ? { scaleY: [1, 0.55 + ((i * 17) % 45) / 100, 1] } : { scaleY: 1 }}
                  transition={{ repeat: isPlaying ? Infinity : 0, duration: 0.55 + (i % 5) * 0.08 }}
                  className={cn(
                    "w-[3px] rounded-full origin-center transition-colors",
                    played ? badgeColor : "bg-muted/40"
                  )}
                  style={{ height: `${Math.max(12, h)}%` }}
                />
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlayback}
              disabled={!audioSrc}
              aria-label={isPlaying ? "Pause" : "Play"}
              className={cn(
                "flex size-10 items-center justify-center rounded-full bg-fg text-bg transition-transform hover:scale-105 active:scale-95",
                !audioSrc && "opacity-50 cursor-not-allowed"
              )}
            >
              {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
            </button>
            <button
              onClick={resetPlayback}
              disabled={!audioSrc}
              aria-label="Reset audio"
              className="text-stone-300 hover:text-fg transition-colors disabled:opacity-40"
            >
              <RefreshCw className="size-3.5" />
            </button>
            <span className="font-mono text-xs text-stone-300">0:00 / {duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Volume2 className="size-3 text-stone-300" />
            <div className="w-16 h-1 rounded-full bg-secondary overflow-hidden">
              <div className="w-3/4 h-full bg-muted/60 rounded-full" />
            </div>
          </div>
        </div>

        {!audioSrc && (
          <p className="mt-3 text-[10px] text-stone-500">
            Add a licensed/public sample at <code className="font-mono">audioSrc</code> to enable playback.
          </p>
        )}
      </div>

      <div className="mt-4 border-t border-border/60 pt-3">
        <button
          onClick={() => setTranscriptOpen(!transcriptOpen)}
          className="flex w-full items-center justify-between text-xs font-medium text-stone-300 hover:text-fg transition-colors"
        >
          <span>Transcript</span>
          <ChevronDown className={cn("size-3.5 transition-transform duration-200", transcriptOpen && "rotate-180")} />
        </button>

        <AnimatePresence>
          {transcriptOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden text-xs text-stone-300/90 pt-2 leading-relaxed"
            >
              <p>{transcriptText}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GELİŞMİŞ BENCHMARK BAR
// ─────────────────────────────────────────────────────────────

function BenchmarkBar({
  label,
  score,
  maxScore = 100,
  colorClass,
  unit = "%",
  inverse = false,
}: {
  label: string;
  score: number;
  maxScore?: number;
  colorClass: string;
  unit?: string;
  inverse?: boolean;
}) {
  const percentage = inverse ? ((maxScore - score) / maxScore) * 100 : (score / maxScore) * 100;
  const displayScore = inverse ? score : score;

  return (
    <div className="mb-5">
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-stone-200">{label}</span>
        <span className="font-mono text-stone-300">
          {displayScore}
          {unit}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#0a0a0a]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={cn("h-full rounded-full relative", colorClass)}
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute right-0 top-0 h-full w-2 bg-white/30 rounded-full"
          />
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// RADAR / POLAR GRAFİK BİLEŞENİ
// ─────────────────────────────────────────────────────────────

type RadarDataPoint = {
  label: string;
  miralas: number;
  gpt: number;
  gemini: number;
  grok: number;
  max?: number;
};

function RadarChart({ data }: { data: RadarDataPoint[] }) {
  const size = 280;
  const center = size / 2;
  const radius = 90;
  const axes = data.length;

  const getPoint = (value: number, max: number, index: number) => {
    const angle = (Math.PI * 2 * index) / axes - Math.PI / 2;
    const r = (value / max) * radius;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };

  const models = [
    { key: "miralas" as const, color: "#3b82f6", label: "Miralas" },
    { key: "gpt" as const, color: "#10b981", label: "GPT Realtime" },
    { key: "gemini" as const, color: "#a855f7", label: "Gemini Live" },
    { key: "grok" as const, color: "#f43f5e", label: "Grok Audio" },
  ];

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <circle
            key={scale}
            cx={center}
            cy={center}
            r={radius * scale}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.1}
            className="text-fg"
          />
        ))}
        {/* Axes */}
        {data.map((_, i) => {
          const angle = (Math.PI * 2 * i) / axes - Math.PI / 2;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="currentColor"
              strokeOpacity={0.1}
              className="text-fg"
            />
          );
        })}
        {/* Data polygons */}
        {models.map((model) => {
          const points = data.map((d, i) => getPoint(d[model.key], d.max || 100, i));
          const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
          return (
            <motion.path
              key={model.key}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.25 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2 }}
              d={pathD}
              fill={model.color}
              stroke={model.color}
              strokeWidth={2}
            />
          );
        })}
        {/* Axis labels */}
        {data.map((d, i) => {
          const angle = (Math.PI * 2 * i) / axes - Math.PI / 2;
          const labelRadius = radius + 22;
          return (
            <text
              key={i}
              x={center + labelRadius * Math.cos(angle)}
              y={center + labelRadius * Math.sin(angle)}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm fill-stone-400"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {models.map((m) => (
          <div key={m.key} className="flex items-center gap-1.5">
            <div className="size-2.5 rounded-full" style={{ backgroundColor: m.color }} />
            <span className="text-[10px] text-stone-300">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ANA SAYFA BİLEŞENİ
// ─────────────────────────────────────────────────────────────

export default function ModelsPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeCategory, setActiveCategory] = useState("strategic");
  const [activeBenchmarkTab, setActiveBenchmarkTab] = useState<"accuracy" | "latency" | "quality" | "tooluse">("accuracy");

  const { data: metrics = FALLBACK_METRICS } = useSWR(
    "https://api.miransas.com/v1/chatterbox/metrics",
    fetcher,
    { fallbackData: FALLBACK_METRICS, refreshInterval: 5000 }
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 300;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
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
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 120, behavior: "smooth" });
    }
  };

  // This radar is deliberately a capability map, not a benchmark score.
  // Values are binary/normalized feature coverage derived from official docs.
  const radarData = [
    { label: "Realtime Audio", miralas: 100, gpt: 100, gemini: 100, grok: 80, max: 100 },
    { label: "Audio Output", miralas: 100, gpt: 100, gemini: 100, grok: 100, max: 100 },
    { label: "Voice Cloning", miralas: 100, gpt: 0, gemini: 0, grok: 0, max: 100 },
    { label: "Multilingual", miralas: 100, gpt: 100, gemini: 100, grok: 80, max: 100 },
    { label: "Open Model", miralas: 100, gpt: 0, gemini: 0, grok: 0, max: 100 },
    { label: "Custom Training", miralas: 100, gpt: 0, gemini: 0, grok: 0, max: 100 },
  ];

  return (
    <div className="container-page mx-auto min-h-screen px-4 pb-24 pt-32">
      {/* Sayfa Başlığı */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-green-500 px-3 py-1 text-md font-medium text-stone-700 mb-4">
          <Zap className="size-3" />
          2026 Benchmarks Updated
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-stone-300 sm:text-5xl">
         Miralas Voice{" "}
          <span className="text-stone-300">
            Model Arena
          </span>
        </h1>
        <p className="mt-4 text-lg text-stone-400">
          Compare Miralas against leading voice AI systems using verified model capabilities — then plug in your own measured audio samples and internal benchmarks.
        </p>
      </motion.div>

      {/* HERO STATS — VERIFIED CAPABILITY FACTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <StatCard icon={Cpu} label="Miralas Baseline" value="500M" subtext="Chatterbox Multilingual V3" color="bg-blue-500" />
        <StatCard icon={Languages} label="Baseline Languages" value="23+" subtext="Official Chatterbox multilingual model" color="bg-emerald-500" />
        <StatCard icon={Volume2} label="Audio I/O" value="Realtime" subtext="Miralas pipeline + voice samples" color="bg-indigo-500" />
        <StatCard icon={Mic} label="Uzbek Track" value="Native" subtext="Miralas proprietary training direction" color="bg-rose-500" />
      </div>

      <div className="flex flex-col lg:flex-row gap-12 relative">
        {/* SOL TARAF: İçerik Alanı */}
        <div className="flex-1 space-y-28">

          {/* 1. OVERVIEW */}
          <section id="overview" className="scroll-mt-32">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-secondary/50 ring-1 ring-border dark:bg-secondary/20">
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500/5 to-purple-500/5">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                >
                  <Sparkles className="mb-4 size-12 text-blue-500/50" />
                </motion.div>
                <h3 className="text-xl font-semibold text-fg/80">Miralas Core Architecture</h3>
                <p className="text-sm text-stone-300">Real-Time Audio Intelligence Demo</p>
              </div>
            </div>
          </section>

          {/* 2. MODEL ARENA */}
          <section id="voice-arena" className="scroll-mt-32 space-y-8">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-fg">
                <Sparkles className="size-6 text-blue-500" />
                Interactive Voice Arena
              </h2>
              <p className="mt-2 text-stone-300">
                Test and compare how different models handle complex user prompts in real-time conversation. Based on Full-Duplex-Bench-v3 scenarios.
              </p>
            </div>

            {/* Kategori Seçim Barı */}
            <div className="flex flex-wrap gap-2 pb-2">
              {ARENA_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 border",
                    activeCategory === cat.id
                      ? "bg-fg text-bg border-fg shadow-sm"
                      : "bg-card/50 text-stone-300 border-border hover:border-fg/40 hover:text-fg"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Kullanıcı Prompt Kartı */}
            <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur-md">
              <div className="flex justify-end mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-300 bg-secondary px-2.5 py-1 rounded-full">
                  User Prompt • {ARENA_CATEGORIES.find((c) => c.id === activeCategory)?.label}
                </span>
              </div>
              <p className="text-sm text-fg leading-relaxed max-w-2xl ml-auto text-right">
                &ldquo;I&apos;m considering a 900-square-foot indie coffee shop beside a commuter rail station. Give me a strategic pre-mortem: if this fails after a year, what probably happened?&rdquo;
              </p>
            </div>

            {/* Gerçek model adları + ses örneği alanları */}
            <div className="grid gap-6 md:grid-cols-2">
              <ModelAudioBox
                modelName="Miralas"
                provider="Chatterbox Multilingual V3 baseline + Miralas training"
                badgeColor="bg-blue-500"
                duration="0:12"
                status="internal"
                audioSrc="/audio/arena/miralas.wav"
                transcriptText="This is the Miralas reference sample. Replace this file with your own licensed Uzbek, Turkish or multilingual evaluation recording."
              />
              <ModelAudioBox
                modelName="GPT-Realtime"
                provider="OpenAI"
                badgeColor="bg-emerald-500"
                duration="0:12"
                status="official"
                audioSrc="/audio/arena/gpt-realtime.wav"
                transcriptText="Official model family: realtime text and audio input/output over WebRTC, WebSocket or SIP. Use an approved sample generated through your own API account."
              />
              <ModelAudioBox
                modelName="Gemini 3.1 Flash Live"
                provider="Google"
                badgeColor="bg-purple-500"
                duration="0:12"
                status="official"
                audioSrc="/audio/arena/gemini-3.1-live.wav"
                transcriptText="Official model: gemini-3.1-flash-live-preview. Google documents it as a low-latency audio-to-audio model for real-time dialogue."
              />
              <ModelAudioBox
                modelName="Grok Voice"
                provider="xAI"
                badgeColor="bg-rose-500"
                duration="0:12"
                status="official"
                audioSrc="/audio/arena/grok-voice.wav"
                transcriptText="Use a licensed/public xAI sample here. Do not ship scraped or copyrighted audio files."
              />
            </div>   
          </section>

          {/* 3. CHATTERBOX V3 DETAILS */}
          <section id="chatterbox-v3" className="scroll-mt-32 space-y-6">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-fg">
                <Cpu className="size-6 text-blue-500" />
                Chatterbox Multilingual V3 Engine
              </h2>
              <p className="mt-2 text-stone-300">
                Miralas uses Chatterbox Multilingual V3 as its open-source TTS baseline, then focuses its own training and evaluation work on languages and voices that matter to our users. The official V3 model is listed at 500M parameters and 23+ supported languages.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "English", meta: "en • reference sample", color: "bg-blue-500/10 text-blue-500", audio: "/audio/languages/en.wav" },
                { name: "Spanish", meta: "es • reference sample", color: "bg-rose-500/10 text-rose-500", audio: "/audio/languages/es.wav" },
                { name: "Chinese", meta: "zh • reference sample", color: "bg-amber-500/10 text-amber-500", audio: "/audio/languages/zh.wav" },
                { name: "Hindi", meta: "hi • reference sample", color: "bg-emerald-500/10 text-emerald-500", audio: "/audio/languages/hi.wav" },
                { name: "Arabic", meta: "ar • reference sample", color: "bg-indigo-500/10 text-indigo-500", audio: "/audio/languages/ar.wav" },
                { name: "Japanese", meta: "ja • reference sample", color: "bg-purple-500/10 text-purple-500", audio: "/audio/languages/ja.wav" },
              ].map((sample) => (
                <div key={sample.name} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-full", sample.color)}>
                      <AudioWaveform className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-fg text-sm">{sample.name}</h4>
                      <p className="text-xs text-stone-300">{sample.meta}</p>
                    </div>
                  </div>
                  <audio controls preload="none" src={sample.audio} className="h-8 w-28" />
                </div>
              ))}
            </div>
          </section>

          {/* 4. CUSTOM MODELS */}
          <section id="custom-models" className="scroll-mt-32 space-y-6 rounded-3xl bg-secondary/30 p-8 ring-1 ring-border dark:bg-card/20">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-fg">
                <Mic className="size-6 text-indigo-500" />
                Custom Voice Clones & Fine-Tuning
              </h2>
              <p className="mt-2 text-stone-300">
                Train your proprietary voice models using 5 minutes of clean audio data with emotion preservation and speaker embedding stability.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 rounded-xl border border-border bg-bg p-4 dark:bg-card/40">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <CheckCircle2 className="size-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-fg">Shahzoda — Custom Voice Pipeline</h4>
                  <p className="text-xs text-stone-300">Dataset: 45 min • Status: Internal evaluation • Add measured MOS after your test run</p>
                </div>
                <button className="flex h-9 items-center justify-center rounded-lg bg-fg px-4 text-sm font-medium text-bg transition-transform hover:scale-105">
                  Test Voice
                </button>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-border bg-bg p-4 dark:bg-card/40">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                  <TrendingUp className="size-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-fg">Corporate Brand Voice — Acme Corp</h4>
                  <p className="text-xs text-stone-300">Dataset: 120 min • Status: Fine-tuning • Metrics shown after internal evaluation</p>
                </div>
                <button className="flex h-9 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-stone-300 transition-colors hover:text-fg">
                  Preview
                </button>
              </div>
            </div>
          </section>

          {/* 5. BENCHMARKS — Gelişmiş */}
          <section id="benchmarks" className="scroll-mt-32 space-y-6">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-fg">
                <Activity className="size-6 text-rose-500" />
                Live Performance Benchmarks
              </h2>
              <p className="mt-2 text-stone-300">
                Continuous accuracy and latency testing against leading industry solutions. Data sourced from Artificial Analysis Speech-to-Speech Index, Full-Duplex-Bench-v3, and Trelis Research (2026).
              </p>
            </div>

            <div className="rounded-3xl border border-border p-8 sm:grid-cols-2 bg-card/30 dark:bg-card/10">
              <div className="mb-8">
                <h3 className="mb-2 font-semibold text-fg">Verified Capability Comparison</h3>
                <p className="text-xs text-stone-400">
                  These are product/model capabilities documented by the vendors, not fabricated cross-vendor benchmark scores.
                  For latency, MOS, WER and reasoning, run the same script, prompt, hardware and audio set across every model.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-stone-400">
                      <th className="py-3 pr-4">Capability</th>
                      <th className="py-3 px-4">Miralas</th>
                      <th className="py-3 px-4">GPT-Realtime</th>
                      <th className="py-3 px-4">Gemini 3.1 Live</th>
                      <th className="py-3 pl-4">Grok Voice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {[
                      ["Realtime audio", "✓", "✓", "✓", "✓"],
                      ["Audio input/output", "✓", "✓", "✓", "✓"],
                      ["Voice cloning", "✓", "—", "—", "—"],
                      ["Open-source baseline", "✓", "—", "—", "—"],
                      ["Custom language training", "✓", "—", "—", "—"],
                      ["Uzbek-first training track", "✓", "—", "—", "—"],
                      ["WebRTC / realtime API", "Internal", "✓", "Live API", "Vendor API"],
                    ].map(([capability, miralas, gpt, gemini, grok]) => (
                      <tr key={capability}>
                        <td className="py-3 pr-4 font-medium text-stone-200">{capability}</td>
                        <td className="py-3 px-4 text-blue-400">{miralas}</td>
                        <td className="py-3 px-4 text-stone-300">{gpt}</td>
                        <td className="py-3 px-4 text-stone-300">{gemini}</td>
                        <td className="py-3 pl-4 text-stone-300">{grok}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-border bg-card/40 p-4">
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider mb-1">Miralas Baseline</div>
                  <div className="text-xl font-bold text-fg">500M</div>
                  <div className="text-[10px] text-stone-400 mt-1">Chatterbox Multilingual V3</div>
                </div>
                <div className="rounded-2xl border border-border bg-card/40 p-4">
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider mb-1">Chatterbox Languages</div>
                  <div className="text-xl font-bold text-fg">23+</div>
                  <div className="text-[10px] text-stone-400 mt-1">Official multilingual baseline</div>
                </div>
                <div className="rounded-2xl border border-border bg-card/40 p-4">
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider mb-1">GPT Realtime</div>
                  <div className="text-xl font-bold text-fg">Audio I/O</div>
                  <div className="text-[10px] text-stone-400 mt-1">Realtime API</div>
                </div>
                <div className="rounded-2xl border border-border bg-card/40 p-4">
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider mb-1">Gemini Live</div>
                  <div className="text-xl font-bold text-fg">A2A Audio</div>
                  <div className="text-[10px] text-stone-400 mt-1">Gemini 3.1 Flash Live</div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-[10px] text-stone-400">
                <span>OpenAI: GPT-Realtime supports realtime text/audio over WebRTC, WebSocket and SIP.</span>
                <span>Google: Gemini 3.1 Flash Live is documented as a low-latency audio-to-audio model.</span>
                <span>Chatterbox: Multilingual V3 is documented as 500M and 23+ languages.</span>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-xs text-stone-300">
              <strong className="text-fg">Benchmark policy:</strong> Miralas performance numbers will only be shown here after
              you run the same evaluation suite on the same hardware and publish the methodology. This prevents the page from
              presenting invented MOS, WER, latency or leaderboard claims as independent research.
            </div>
          </section>

          {/* 6. LIVE METRICS */}
          <section id="live-metrics" className="scroll-mt-32 space-y-6">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-fg">
                <BarChart3 className="size-6 text-blue-500" />
                Real-Time System Metrics
              </h2>
              <p className="mt-2 text-stone-300">
                Live telemetry from your Miralas endpoint. If the endpoint is unavailable, the page does not invent vendor metrics.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 rounded-3xl border border-border p-8 bg-card/30 dark:bg-card/10">
              <div>
                <h3 className="mb-6 font-semibold text-fg">Audio Intelligence Accuracy</h3>
                <BenchmarkBar label="Miralas Chatterbox V3" score={metrics.quality.miralas} colorClass="bg-blue-500" />
                <BenchmarkBar label="GPT Realtime" score={metrics.quality.gpt} colorClass="bg-emerald-500" />
                <BenchmarkBar label="Gemini Voice" score={metrics.quality.gemini} colorClass="bg-purple-500" />
                <BenchmarkBar label="Grok Audio" score={metrics.quality.grok} colorClass="bg-rose-500" />
              </div>
              <div>
                <h3 className="mb-6 font-semibold text-fg">Time to First Byte (Latency)</h3>
                <BenchmarkBar label="Miralas (Edge)" score={metrics.latency.miralas} maxScore={1000} colorClass="bg-blue-500" unit="ms" />
                <BenchmarkBar label="GPT Realtime" score={metrics.latency.gpt} maxScore={1000} colorClass="bg-emerald-500" unit="ms" />
                <BenchmarkBar label="Gemini Voice" score={metrics.latency.gemini} maxScore={1000} colorClass="bg-purple-500" unit="ms" />
                <BenchmarkBar label="Grok Audio" score={metrics.latency.grok} maxScore={1000} colorClass="bg-rose-500" unit="ms" />
              </div>
            </div>
          </section>

          {/* 7. ROADMAP */}
          <section id="roadmap" className="scroll-mt-32 space-y-6">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-fg">
                <Globe2 className="size-6 text-emerald-500" />
                Upcoming Languages & Expansion
              </h2>
              <p className="mt-2 text-stone-300">
                Languages currently scaling in our regional training pipelines. Uzbek voice casting is now active.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {UPCOMING_LANGUAGES.map((lang) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className={cn(
                    "flex flex-col justify-between rounded-2xl border p-5 dark:bg-card/20 transition-colors",
                    lang.stage === "early"
                      ? "border-amber-500/30 bg-amber-500/5"
                      : lang.stage === "mid"
                      ? "border-blue-500/30 bg-blue-500/5"
                      : "border-emerald-500/30 bg-emerald-500/5"
                  )}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="text-3xl">{lang.flag}</span>
                      <span className={cn(
                        "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full",
                        lang.stage === "early"
                          ? "bg-amber-500/10 text-amber-600"
                          : lang.stage === "mid"
                          ? "bg-blue-500/10 text-blue-600"
                          : "bg-emerald-500/10 text-emerald-600"
                      )}>
                        {lang.eta}
                      </span>
                    </div>
                    <h4 className="mt-2 font-semibold text-fg">{lang.name}</h4>
                    <p className="text-xs text-stone-300">{lang.status}</p>
                  </div>
                  <div className="mt-6">
                    <div className="mb-1 flex justify-between text-[10px] font-medium uppercase text-stone-300">
                      <span>Progress</span>
                      <span>{lang.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary dark:bg-secondary/50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn(
                          "h-full rounded-full",
                          lang.stage === "early"
                            ? "bg-amber-500"
                            : lang.stage === "mid"
                            ? "bg-blue-500"
                            : "bg-emerald-500"
                        )}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Uzbek Özel Bilgi Kartı */}
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                  <Mic className="size-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-fg">Uzbek Voice Pipeline — Active Development</h4>
                  <p className="text-sm text-stone-300 mt-1 leading-relaxed">
                    Uzbek is the core language research direction for Miralas. The goal is to build a native-quality training pipeline around Uzbek phoneme coverage, natural prosody, regional variation and code-switching. Replace this status with your real dataset and training telemetry as the pipeline progresses.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">Research Track</span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">Native Uzbek</span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">Live Dataset Metrics</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* SAĞ TARAF: Sticky Navigation */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-32 flex flex-col gap-2 border-l border-border pl-6">
            <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-300">
              On this page
            </span>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "text-left text-sm font-medium transition-all duration-200",
                  activeSection === item.id ? "text-blue-500" : "text-stone-300 hover:text-fg"
                )}
              >
                {item.label}
              </button>
            ))}

            <motion.div
              className="absolute left-[-1px] w-[2px] bg-blue-500"
              initial={false}
              animate={{
                top: `${NAV_ITEMS.findIndex((item) => item.id === activeSection) * 32 + 38}px`,
                height: "20px",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </aside>
      </div>
    </div>
  
  );
}