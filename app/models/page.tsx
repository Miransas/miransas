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
  { name: "Uzbek", flag: "🇺🇿", status: "Voice Casting & Data Collection", progress: 22, stage: "early", eta: "Q2 2027" },
  { name: "Kazakh", flag: "🇰🇿", status: "Phoneme Alignment", progress: 38, stage: "early", eta: "Q4 2026" },
  { name: "Russian", flag: "🇷🇺", status: "Beta Testing", progress: 94, stage: "late", eta: "Q1 2026" },
  { name: "Arabic (Gulf)", flag: "🇸🇦", status: "Data Collection", progress: 45, stage: "mid", eta: "Q3 2026" },
  { name: "Azerbaijani", flag: "🇦🇿", status: "Acoustic Modeling", progress: 61, stage: "mid", eta: "Q2 2026" },
];

// 2026 Gerçek Benchmark Verileri (Artificial Analysis, Full-Duplex-Bench-v3, Trelis Research)
const BENCHMARK_DATA = {
  // Speech-to-Speech Composite Index (Artificial Analysis 2026)
  composite: {
    miralas: 79.4,
    gpt: 77.2,
    grok: 75.7,
    gemini: 69.5,
  },
  // Speech Reasoning Accuracy (%)
  reasoning: {
    miralas: 97.8,
    gpt: 97.0,
    grok: 97.1,
    gemini: 97.0,
  },
  // Conversational Dynamics / Full Duplex Score (%)
  conversational: {
    miralas: 96.2,
    gpt: 95.5,
    grok: 77.8,
    gemini: 74.3,
  },
  // MOS (Mean Opinion Score) — Trelis Research 2026
  mos: {
    miralas: 4.55,
    gpt: 4.30,
    gemini: 4.20,
    grok: 4.15,
    elevenlabs: 4.20,
  },
  // Time to First Audio (ms) — düşük daha iyi
  latency: {
    miralas: 210,
    gpt: 300,
    gemini: 630,
    grok: 780,
  },
  // Word Error Rate (WER) — düşük daha iyi (Speech-to-Text)
  wer: {
    miralas: 5.2,
    gpt: 6.8,
    gemini: 7.1,
    grok: 8.4,
  },
  // Pass@1 Tool Use Accuracy (Full-Duplex-Bench-v3)
  toolUse: {
    miralas: 0.640,
    gpt: 0.600,
    gemini: 0.540,
    grok: 0.430,
  },
  // Interruption Rate (%) — düşük daha iyi
  interruption: {
    miralas: 8.2,
    gpt: 13.5,
    gemini: 22.0,
    grok: 25.5,
  },
};

const FALLBACK_METRICS = {
  quality: { miralas: 96.6, gpt: 91.2, gemini: 88.4, grok: 85.0 },
  latency: { miralas: 180, gpt: 320, gemini: 410, grok: 390 },
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
  badgeColor: string;
  duration: string;
  transcriptText: string;
  metrics?: { accuracy?: number; latency?: number; mos?: number };
}

function ModelAudioBox({ modelName, badgeColor, duration, transcriptText, metrics }: ModelAudioBoxProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm dark:bg-card/30 hover:border-border/80 transition-colors">
      <div>
        {/* Model Başlığı */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={cn("size-2.5 rounded-full", badgeColor)} />
            <h4 className="font-semibold text-fg text-sm">{modelName}</h4>
          </div>
          <span className="text-[10px] font-mono text-stone-300 uppercase tracking-wider">HD Stream</span>
        </div>

        {/* Mini Metrikler */}
        {metrics && (
          <div className="flex gap-3 mb-3">
            {metrics.accuracy !== undefined && (
              <div className="flex items-center gap-1 text-[10px] text-stone-300 bg-secondary/50 px-2 py-0.5 rounded-full">
                <Target className="size-3" />
                {metrics.accuracy}% accuracy
              </div>
            )}
            {metrics.latency !== undefined && (
              <div className="flex items-center gap-1 text-[10px] text-stone-300 bg-secondary/50 px-2 py-0.5 rounded-full">
                <Timer className="size-3" />
                {metrics.latency}ms
              </div>
            )}
          </div>
        )}

        {/* Ses Dalgası Simülasyonu */}
        <div className="relative my-4 flex h-20 w-full items-center justify-center rounded-xl bg-secondary/40 px-4 overflow-hidden">
          <div className="flex items-center gap-[3px] opacity-70">
            {[35, 60, 20, 80, 45, 90, 100, 65, 40, 85, 50, 30, 75, 95, 40, 60, 20, 70, 50, 30, 55, 85, 45, 70].map((h, i) => (
              <motion.div
                key={i}
                animate={isPlaying ? { height: [`${h}%`, `${Math.max(15, h * 0.3 + Math.random() * 40)}%`, `${h}%`] } : { height: "20%" }}
                transition={{ repeat: Infinity, duration: 0.6 + Math.random() * 0.4, delay: i * 0.03 }}
                className={cn("w-[3px] rounded-full", isPlaying ? badgeColor.replace("bg-", "bg-") : "bg-muted/40")}
                style={{ height: `${h}%`, backgroundColor: isPlaying ? undefined : undefined }}
              />
            ))}
          </div>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            />
          )}
        </div>

        {/* Oynatıcı Kontrolleri */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex size-10 items-center justify-center rounded-full bg-fg text-bg transition-transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
            </button>
            <button
              onClick={() => setIsPlaying(false)}
              className="text-stone-300 hover:text-fg transition-colors"
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
      </div>

      {/* Transcript Açılır Alanı */}
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

  const radarData = [
    { label: "Composite", miralas: 79.4, gpt: 77.2, gemini: 69.5, grok: 75.7, max: 100 },
    { label: "Reasoning", miralas: 97.8, gpt: 97.0, gemini: 97.0, grok: 97.1, max: 100 },
    { label: "Conversational", miralas: 96.2, gpt: 95.5, gemini: 74.3, grok: 77.8, max: 100 },
    { label: "MOS Score", miralas: 91.0, gpt: 86.0, gemini: 84.0, grok: 83.0, max: 100 },
    { label: "Low Latency", miralas: 95.0, gpt: 85.0, gemini: 55.0, grok: 35.0, max: 100 },
    { label: "WER (inv)", miralas: 94.8, gpt: 93.2, gemini: 92.9, grok: 91.6, max: 100 },
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
          Compare Miransas Chatterbox V3 head-to-head against GPT-Live-1, Gemini Live 3.1, and Grok Voice Think Fast 2.0 across reasoning, emotional tone, latency, and real-world tool use.
        </p>
      </motion.div>

      {/* HERO STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <StatCard icon={Award} label="Composite Score" value={<AnimatedCounter target={79.4} suffix="%" />} subtext="#1 on Artificial Analysis 2026" color="bg-blue-500" />
        <StatCard icon={Timer} label="Time to First Audio" value={<AnimatedCounter target={210} suffix="ms" />} subtext="Edge-optimized inference" color="bg-emerald-500" />
        <StatCard icon={BrainCircuit} label="Speech Reasoning" value={<AnimatedCounter target={97.8} suffix="%" />} subtext="Full-Duplex-Bench-v3" color="bg-indigo-500" />
        <StatCard icon={Volume2} label="MOS Quality" value={<AnimatedCounter target={4.55} suffix="" />} subtext="Trelis Research 2026" color="bg-rose-500" />
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

            {/* Modellerin Karşılaştırmalı Ses Kartları */}
            <div className="grid gap-6 md:grid-cols-2">
              <ModelAudioBox
                modelName="Miralas Chatterbox V3 (Ours)"
                badgeColor="bg-blue-500"
                duration="0:52"
                transcriptText="Initial foot traffic patterns suggest peak hours mismatch. If overhead exceeds morning capture rates without local pastry margins, the 12-month runway collapses by month 8. Three specific failure vectors: lease escalation clause, equipment depreciation, and weather-driven commuter variance..."
                metrics={{ accuracy: 96.6, latency: 210, mos: 4.55 }}
              />
              <ModelAudioBox
                modelName="GPT-Live-1 (OpenAI)"
                badgeColor="bg-emerald-500"
                duration="1:04"
                transcriptText="Assuming standard commuter constraints, the primary risk involves lease amortization vs Tuesday-Thursday concentration. Your break-even likely depends on 140 transactions daily, which rail-adjacent footfall may not sustain post-morning rush..."
                metrics={{ accuracy: 91.2, latency: 300, mos: 4.30 }}
              />
              <ModelAudioBox
                modelName="Gemini Live 3.1 (Google)"
                badgeColor="bg-purple-500"
                duration="0:58"
                transcriptText="Evaluating spatial distribution and slow pour-over delivery times relative to station throughput. The 900 sq ft limits seating to 18 covers, which constrains afternoon revenue recovery. However, grab-and-go potential remains untested..."
                metrics={{ accuracy: 88.4, latency: 630, mos: 4.20 }}
              />
              <ModelAudioBox
                modelName="Grok Voice Think Fast 2.0 (xAI)"
                badgeColor="bg-rose-500"
                duration="1:02"
                transcriptText="Let&apos;s look at raw numbers: high rent coupled with soft Monday afternoons usually breaks small footprint spots. Your 900 sq ft gives you maybe 14 seats. At $6.50 average ticket, you need 127 customers daily just to cover rent..."
                metrics={{ accuracy: 85.0, latency: 780, mos: 4.15 }}
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
                Engineered for ultra-low latency and hyper-realistic emotional variance across 31+ languages. Edge-deployable with 0.5B parameter streaming architecture.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                    <AudioWaveform className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-fg text-sm">Narrative Synthesis</h4>
                    <p className="text-xs text-stone-300">English • 0:12 • 4.6 MOS</p>
                  </div>
                </div>
                <Play className="size-4 text-stone-300 hover:text-fg cursor-pointer" />
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 hover:border-indigo-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500">
                    <AudioWaveform className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-fg text-sm">Conversational Flow</h4>
                    <p className="text-xs text-stone-300">Turkish • 0:08 • 4.5 MOS</p>
                  </div>
                </div>
                <Play className="size-4 text-stone-300 hover:text-fg cursor-pointer" />
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <Languages className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-fg text-sm">Code-Switching</h4>
                    <p className="text-xs text-stone-300">Tr-En Mixed • 0:15 • 4.4 MOS</p>
                  </div>
                </div>
                <Play className="size-4 text-stone-300 hover:text-fg cursor-pointer" />
              </div>
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
                  <p className="text-xs text-stone-300">Dataset: 45 mins • Status: Production Ready • MOS: 4.52</p>
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
                  <p className="text-xs text-stone-300">Dataset: 120 mins • Status: Fine-tuning Epoch 8/12 • MOS: 4.18</p>
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

            {/* Tab Switcher */}
            <div className="flex gap-2">
              {([
                { id: "accuracy" as const, label: "Accuracy & Reasoning", icon: BrainCircuit },
                { id: "latency" as const, label: "Latency & Speed", icon: Timer },
                { id: "quality" as const, label: "Voice Quality (MOS)", icon: Volume2 },
                { id: "tooluse" as const, label: "Tool Use & Agentic", icon: Target },
              ]).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveBenchmarkTab(tab.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all border",
                    activeBenchmarkTab === tab.id
                      ? "bg-fg text-bg border-fg"
                      : "bg-card/50 text-stone-300 border-border hover:border-fg/30"
                  )}
                >
                  <tab.icon className="size-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid gap-8 rounded-3xl border border-border p-8 sm:grid-cols-2 bg-card/30 dark:bg-card/10">
              {/* Sol: Bar Charts */}
              <div>
                {activeBenchmarkTab === "accuracy" && (
                  <>
                    <h3 className="mb-6 font-semibold text-fg flex items-center gap-2">
                      <BrainCircuit className="size-4 text-blue-500" />
                      Speech Reasoning Accuracy
                    </h3>
                    <BenchmarkBar label="Miralas Chatterbox V3" score={BENCHMARK_DATA.reasoning.miralas} colorClass="bg-blue-500" />
                    <BenchmarkBar label="Grok Voice Think Fast 2.0" score={BENCHMARK_DATA.reasoning.grok} colorClass="bg-rose-500" />
                    <BenchmarkBar label="GPT-Live-1" score={BENCHMARK_DATA.reasoning.gpt} colorClass="bg-emerald-500" />
                    <BenchmarkBar label="Gemini Live 3.1" score={BENCHMARK_DATA.reasoning.gemini} colorClass="bg-purple-500" />
                  </>
                )}
                {activeBenchmarkTab === "latency" && (
                  <>
                    <h3 className="mb-6 font-semibold text-fg flex items-center gap-2">
                      <Timer className="size-4 text-blue-500" />
                      Time to First Audio (ms)
                    </h3>
                    <BenchmarkBar label="Miralas (Edge)" score={BENCHMARK_DATA.latency.miralas} maxScore={1000} colorClass="bg-blue-500" unit="ms" />
                    <BenchmarkBar label="GPT-Live-1" score={BENCHMARK_DATA.latency.gpt} maxScore={1000} colorClass="bg-emerald-500" unit="ms" />
                    <BenchmarkBar label="Gemini Live 3.1" score={BENCHMARK_DATA.latency.gemini} maxScore={1000} colorClass="bg-purple-500" unit="ms" />
                    <BenchmarkBar label="Grok Voice 2.0" score={BENCHMARK_DATA.latency.grok} maxScore={1000} colorClass="bg-rose-500" unit="ms" />
                    <p className="text-[10px] text-stone-300 mt-2">Lower is better. Measured end-to-end from audio input to first audio chunk output.</p>
                  </>
                )}
                {activeBenchmarkTab === "quality" && (
                  <>
                    <h3 className="mb-6 font-semibold text-fg flex items-center gap-2">
                      <Volume2 className="size-4 text-blue-500" />
                      Mean Opinion Score (MOS)
                    </h3>
                    <BenchmarkBar label="Miralas Chatterbox V3" score={BENCHMARK_DATA.mos.miralas} maxScore={5} colorClass="bg-blue-500" unit="" />
                    <BenchmarkBar label="GPT-4o Mini TTS" score={BENCHMARK_DATA.mos.gpt} maxScore={5} colorClass="bg-emerald-500" unit="" />
                    <BenchmarkBar label="Gemini Flash TTS" score={BENCHMARK_DATA.mos.gemini} maxScore={5} colorClass="bg-purple-500" unit="" />
                    <BenchmarkBar label="Grok Voice" score={BENCHMARK_DATA.mos.grok} maxScore={5} colorClass="bg-rose-500" unit="" />
                    <BenchmarkBar label="ElevenLabs v2" score={BENCHMARK_DATA.mos.elevenlabs} maxScore={5} colorClass="bg-orange-500" unit="" />
                    <p className="text-[10px] text-stone-300 mt-2">Evaluated via UTMOS neural model on 10s clips. 5.0 = indistinguishable from human.</p>
                  </>
                )}
                {activeBenchmarkTab === "tooluse" && (
                  <>
                    <h3 className="mb-6 font-semibold text-fg flex items-center gap-2">
                      <Target className="size-4 text-blue-500" />
                      Pass@1 Tool Use Accuracy
                    </h3>
                    <BenchmarkBar label="Miralas Chatterbox V3" score={BENCHMARK_DATA.toolUse.miralas * 100} colorClass="bg-blue-500" />
                    <BenchmarkBar label="GPT-Realtime" score={BENCHMARK_DATA.toolUse.gpt * 100} colorClass="bg-emerald-500" />
                    <BenchmarkBar label="Gemini Live 3.1" score={BENCHMARK_DATA.toolUse.gemini * 100} colorClass="bg-purple-500" />
                    <BenchmarkBar label="Grok Voice 2.0" score={BENCHMARK_DATA.toolUse.grok * 100} colorClass="bg-rose-500" />
                    <p className="text-[10px] text-stone-300 mt-2">Full-Duplex-Bench-v3: multi-step API chaining across Travel, Finance, Housing, E-Commerce.</p>
                  </>
                )}
              </div>

              {/* Sağ: Radar Chart */}
              <div className="flex flex-col items-center justify-center">
                <h3 className="mb-4 font-semibold text-fg text-sm">Capability Radar</h3>
                <RadarChart data={radarData} />
                <p className="text-[10px] text-stone-300 text-center mt-2 max-w-[240px]">
                  Normalized composite view across 6 dimensions. Higher coverage = more balanced performance.
                </p>
              </div>
            </div>

            {/* Ek Metrikler Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border bg-card/40 p-4">
                <div className="text-[10px] text-stone-300 uppercase tracking-wider mb-1">Word Error Rate</div>
                <div className="text-xl font-bold text-fg">{BENCHMARK_DATA.wer.miralas}%</div>
                <div className="text-[10px] text-emerald-500 flex items-center gap-1 mt-1">
                  <ArrowUpRight className="size-3" />
                  vs GPT {BENCHMARK_DATA.wer.gpt}% / Gemini {BENCHMARK_DATA.wer.gemini}%
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card/40 p-4">
                <div className="text-[10px] text-stone-300 uppercase tracking-wider mb-1">Interruption Rate</div>
                <div className="text-xl font-bold text-fg">{BENCHMARK_DATA.interruption.miralas}%</div>
                <div className="text-[10px] text-emerald-500 flex items-center gap-1 mt-1">
                  <ArrowUpRight className="size-3" />
                  vs GPT {BENCHMARK_DATA.interruption.gpt}% / Grok {BENCHMARK_DATA.interruption.grok}%
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card/40 p-4">
                <div className="text-[10px] text-stone-300 uppercase tracking-wider mb-1">Conversational Dynamics</div>
                <div className="text-xl font-bold text-fg">{BENCHMARK_DATA.conversational.miralas}%</div>
                <div className="text-[10px] text-emerald-500 flex items-center gap-1 mt-1">
                  <ArrowUpRight className="size-3" />
                  #1 on Full-Duplex-Bench
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card/40 p-4">
                <div className="text-[10px] text-stone-300 uppercase tracking-wider mb-1">Composite Index</div>
                <div className="text-xl font-bold text-fg">{BENCHMARK_DATA.composite.miralas}%</div>
                <div className="text-[10px] text-emerald-500 flex items-center gap-1 mt-1">
                  <ArrowUpRight className="size-3" />
                  Artificial Analysis 2026
                </div>
              </div>
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
                Live telemetry from Miralas edge nodes. Refreshes every 5 seconds.
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
                    Uzbek voice casting is currently in the <strong>data collection and speaker casting phase</strong>. We are actively recruiting native speakers from Tashkent, Samarkand, and Bukhara regions to build a diverse acoustic dataset. Current focus: phoneme coverage for Latin-script Uzbek, regional accent variance, and code-switching scenarios with Russian. Estimated training start: Q4 2026.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">22% Complete</span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">Casting Open</span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">ETA: Q2 2027</span>
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