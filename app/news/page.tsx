"use client";

import { motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Cpu,
  Globe2,
  Megaphone,
  Mic,
  Sparkles,
  Timer,
  TrendingUp,
  Volume2,
  Zap,
  BarChart3,
  Languages,
  Target,
  Radio,
  GitCommit,
  Tag,
  AlertTriangle,
  Play,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
// GÜNCEL VERİLER & KATEGORİLER (2026)
// ─────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "featured", label: "Featured Update" },
  { id: "all-posts", label: "Latest Articles" },
  { id: "performance", label: "Performance" },
  { id: "changelog", label: "Engine Changelog" },
  { id: "roadmap", label: "Language Roadmap" },
];

const BLOG_POSTS = [
  {
    id: "post-1",
    category: "Architecture & Strategy",
    date: "August 31, 2026",
    readTime: "6 min read",
    title: "Moving Beyond Custom Voice Actors: The Pure Synthetic Evolution of Chatterbox V3",
    excerpt: "Why we decided to drop external voice actor dependencies and pivot entirely to native multi-speaker architecture. Lessons learned from dataset bottlenecks and our roadmap ahead.",
    featured: true,
  },
  {
    id: "post-2",
    category: "Localization & Global",
    date: "August 24, 2026",
    readTime: "4 min read",
    title: "Expanding Regional Synthesis: Uzbek, Russian, and Arabic in Production",
    excerpt: "Deep dive into how Miransas optimized low-latency transformer layers to handle regional phonemes without accent degradation or robotic artifacts.",
    featured: false,
  },
  {
    id: "post-3",
    category: "Engineering",
    date: "August 15, 2026",
    readTime: "8 min read",
    title: "Sub-200ms Latency on Edge: How We Rewrote Our TTS Worker Pipeline",
    excerpt: "An engineering breakdown of combining Python inference workers with Neon PostgreSQL state management to achieve real-time conversational streaming.",
    featured: false,
  },
  {
    id: "post-4",
    category: "Company Update",
    date: "August 02, 2026",
    readTime: "3 min read",
    title: "Miransas Ecosystem 2.0: Status Monitoring with OpenStatus & Miralas API",
    excerpt: "Building robust failover mechanisms and live status reporting for enterprise voice infrastructure using next-gen web hooks.",
    featured: false,
  },
  {
    id: "post-5",
    category: "Benchmarks",
    date: "July 28, 2026",
    readTime: "5 min read",
    title: "Full-Duplex-Bench-v3: How Miralas Chatterbox V3 Ranks Against GPT-Live and Gemini",
    excerpt: "Our independent evaluation across speech reasoning, conversational dynamics, and tool-use accuracy in real-time voice scenarios.",
    featured: false,
  },
];

// Güncel Dil Yol Haritası
const UPCOMING_LANGUAGES = [
  { name: "Uzbek", flag: "🇺🇿", status: "Voice Casting & Data Collection", progress: 22, stage: "early", eta: "Q2 2027" },
  { name: "Kazakh", flag: "🇰🇿", status: "Phoneme Alignment", progress: 38, stage: "early", eta: "Q4 2026" },
  { name: "Russian", flag: "🇷🇺", status: "Beta Testing", progress: 94, stage: "late", eta: "Q1 2026" },
  { name: "Arabic (Gulf)", flag: "🇸🇦", status: "Data Collection", progress: 45, stage: "mid", eta: "Q3 2026" },
  { name: "Azerbaijani", flag: "🇦🇿", status: "Acoustic Modeling", progress: 61, stage: "mid", eta: "Q2 2026" },
];

// 2026 Benchmark Verileri
const BENCHMARK_DATA = {
  composite: { miralas: 79.4, gpt: 77.2, grok: 75.7, gemini: 69.5 },
  reasoning: { miralas: 97.8, gpt: 97.0, grok: 97.1, gemini: 97.0 },
  conversational: { miralas: 96.2, gpt: 95.5, grok: 77.8, gemini: 74.3 },
  mos: { miralas: 4.55, gpt: 4.30, gemini: 4.20, grok: 4.15, elevenlabs: 4.20 },
  latency: { miralas: 210, gpt: 300, gemini: 630, grok: 780 },
  wer: { miralas: 5.2, gpt: 6.8, gemini: 7.1, grok: 8.4 },
  toolUse: { miralas: 0.640, gpt: 0.600, gemini: 0.540, grok: 0.430 },
  interruption: { miralas: 8.2, gpt: 13.5, gemini: 22.0, grok: 25.5 },
};

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

function StatCard({ icon: Icon, label, value, subtext, color }: { icon: any; label: string; value: React.ReactNode; subtext: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 black p-5 backdrop-blur-sm dark:bg-card/30  transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("flex size-9 items-center justify-center rounded-xl", color)}>
          <Icon className="size-4.5 text-white" />
        </div>
        <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-bold text-stone-300">{value}</div>
      <div className="text-xs text-stone-400 mt-1">{subtext}</div>
    </motion.div>
  );
}

function BenchmarkMiniBar({ label, score, maxScore = 100, colorClass, unit = "%" }: { label: string; score: number; maxScore?: number; colorClass: string; unit?: string }) {
  const percentage = (score / maxScore) * 100;
  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between text-md">
        <span className="text-stone-400">{label}</span>
        <span className="font-mono text-stone-200">{score}{unit}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#0a0a0a]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", colorClass)}
        />
      </div>
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

  return (
    <div className="container-page mx-auto min-h-screen px-4 pb-24 pt-32 bg-black">

      {/* Sayfa Başlığı */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 max-w-3xl"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500">
          <Megaphone className="size-3.5" />
          Miransas News & Engineering Blog
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
          Stories, Updates & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Insights</span>
        </h1>
        <p className="mt-4 text-lg text-stone-400">
          Direct updates from the Miralas core engineering team, architectural deep dives, product roadmap milestones, and independent benchmark results.
        </p>
      </motion.div>

      {/* HERO STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <StatCard icon={Zap} label="Composite Score" value={<AnimatedCounter target={79.4} suffix="%" />} subtext="#1 on Artificial Analysis 2026" color="bg-blue-500" />
        <StatCard icon={Timer} label="Edge Latency" value={<AnimatedCounter target={210} suffix="ms" />} subtext="Time to First Audio" color="bg-emerald-500" />
        <StatCard icon={Volume2} label="MOS Quality" value={<AnimatedCounter target={4.55} suffix="" />} subtext="Trelis Research 2026" color="bg-indigo-500" />
        <StatCard icon={Languages} label="Languages" value={<span>31<span className="text-sm text-stone-400">+</span></span>} subtext="Production & Pipeline" color="bg-rose-500" />
      </div>

      <div className="flex flex-col lg:flex-row gap-12 relative">

        {/* SOL TARAF: Blog İçerikleri */}
        <div className="flex-1 space-y-24">

          {/* 1. FEATURED POST */}
          <section id="featured" className="scroll-mt-32 space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-2">
              <Sparkles className="size-4 text-blue-500" />
              Featured Article
            </h2>

            {BLOG_POSTS.filter(p => p.featured).map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-[#0a0a0a] p-8 transition-all hover:shadow-xl "
              >
                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 mb-4">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 font-medium text-blue-500">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-fg group-hover:text-blue-500 transition-colors sm:text-3xl">
                  {post.title}
                </h3>

                <p className="mt-4 text-stone-400 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Detaylı Açıklama / Hikaye Kutusu */}
                <div className="mt-6 rounded-2xl border border-border/80 bg-secondary/30 p-5 text-sm text-fg/90 space-y-3 dark:bg-secondary/10">
                  <p className="font-medium text-fg flex items-center gap-2">
                    <AlertTriangle className="size-4 text-amber-500" />
                    Strategic Pivot Notice:
                  </p>
                  <p className="text-stone-400 leading-relaxed">
                    As we scaled our regional data pipeline, external dependencies (such as individual voice actor engagements like our previous trials with Shahzoda) failed to meet enterprise delivery timelines and test payload requirements. Consequently, we have completely phased out external dependent workflows, reallocating 100% of our focus into Miralas Chatterbox V3&apos;s native multi-speaker synthesis engine.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 font-semibold text-blue-500 group-hover:translate-x-1 transition-transform cursor-pointer">
                  <span>Read full architectural breakdown</span>
                  <ArrowRight className="size-4" />
                </div>
              </motion.div>
            ))}
          </section>

          {/* 2. ALL POSTS / LATEST ARTICLES */}
          <section id="all-posts" className="scroll-mt-32 space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-2">
              <BookOpen className="size-4 text-indigo-500" />
              Latest Articles & Engineering Logs
            </h2>

            <div className="grid gap-6">
              {BLOG_POSTS.filter(p => !p.featured).map((post, idx) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group rounded-2xl border border-border bg-card/40 p-6 transition-all hover:bg-card hover:shadow-md dark:bg-card/20"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 mb-3">
                    <span className="font-medium text-fg/80">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h4 className="text-xl font-bold text-fg group-hover:text-blue-500 transition-colors">
                    {post.title}
                  </h4>

                  <p className="mt-2 text-sm text-stone-400 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-blue-500 cursor-pointer">
                    <span>Read article</span>
                    <ArrowRight className="size-3" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 3. PERFORMANCE / BENCHMARK KARŞILAŞTIRMA */}
          <section id="performance" className="scroll-mt-32 space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-2">
              <BarChart3 className="size-4 text-rose-500" />
              Performance Benchmarks
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Accuracy Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-border bg-card/40 p-6 dark:bg-card/20"
              >
                <h3 className="text-sm font-semibold text-fg mb-4 flex items-center gap-2">
                  <Target className="size-4 text-blue-500" />
                  Speech Reasoning Accuracy
                </h3>
                <BenchmarkMiniBar label="Miralas Chatterbox V3" score={BENCHMARK_DATA.reasoning.miralas} colorClass="bg-blue-500" />
                <BenchmarkMiniBar label="Grok Voice Think Fast 2.0" score={BENCHMARK_DATA.reasoning.grok} colorClass="bg-rose-500" />
                <BenchmarkMiniBar label="GPT-Live-1" score={BENCHMARK_DATA.reasoning.gpt} colorClass="bg-emerald-500" />
                <BenchmarkMiniBar label="Gemini Live 3.1" score={BENCHMARK_DATA.reasoning.gemini} colorClass="bg-purple-500" />
                <p className="text-[10px] text-stone-400 mt-2">Full-Duplex-Bench-v3 reasoning tasks. Higher is better.</p>
              </motion.div>

              {/* Latency Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl border border-border bg-card/40 p-6 dark:bg-card/20"
              >
                <h3 className="text-sm font-semibold text-fg mb-4 flex items-center gap-2">
                  <Timer className="size-4 text-blue-500" />
                  Time to First Audio (ms)
                </h3>
                <BenchmarkMiniBar label="Miralas (Edge)" score={BENCHMARK_DATA.latency.miralas} maxScore={1000} colorClass="bg-blue-500" unit="ms" />
                <BenchmarkMiniBar label="GPT-Live-1" score={BENCHMARK_DATA.latency.gpt} maxScore={1000} colorClass="bg-emerald-500" unit="ms" />
                <BenchmarkMiniBar label="Gemini Live 3.1" score={BENCHMARK_DATA.latency.gemini} maxScore={1000} colorClass="bg-purple-500" unit="ms" />
                <BenchmarkMiniBar label="Grok Voice 2.0" score={BENCHMARK_DATA.latency.grok} maxScore={1000} colorClass="bg-rose-500" unit="ms" />
                <p className="text-[10px] text-stone-400 mt-2">Lower is better. End-to-end audio input to first audio chunk.</p>
              </motion.div>

              {/* MOS Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl border border-border bg-card/40 p-6 dark:bg-card/20"
              >
                <h3 className="text-sm font-semibold text-fg mb-4 flex items-center gap-2">
                  <Volume2 className="size-4 text-blue-500" />
                  Mean Opinion Score (MOS)
                </h3>
                <BenchmarkMiniBar label="Miralas Chatterbox V3" score={BENCHMARK_DATA.mos.miralas} maxScore={5} colorClass="bg-blue-500" unit="" />
                <BenchmarkMiniBar label="GPT-4o Mini TTS" score={BENCHMARK_DATA.mos.gpt} maxScore={5} colorClass="bg-emerald-500" unit="" />
                <BenchmarkMiniBar label="Gemini Flash TTS" score={BENCHMARK_DATA.mos.gemini} maxScore={5} colorClass="bg-purple-500" unit="" />
                <BenchmarkMiniBar label="Grok Voice" score={BENCHMARK_DATA.mos.grok} maxScore={5} colorClass="bg-rose-500" unit="" />
                <BenchmarkMiniBar label="ElevenLabs v2" score={BENCHMARK_DATA.mos.elevenlabs} maxScore={5} colorClass="bg-orange-500" unit="" />
                <p className="text-[10px] text-stone-400 mt-2">UTMOS neural model evaluation. 5.0 = human indistinguishable.</p>
              </motion.div>

              {/* Tool Use Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-border bg-card/40 p-6 dark:bg-card/20"
              >
                <h3 className="text-sm font-semibold text-fg mb-4 flex items-center gap-2">
                  <Cpu className="size-4 text-blue-500" />
                  Pass@1 Tool Use Accuracy
                </h3>
                <BenchmarkMiniBar label="Miralas Chatterbox V3" score={BENCHMARK_DATA.toolUse.miralas * 100} colorClass="bg-blue-500" />
                <BenchmarkMiniBar label="GPT-Realtime" score={BENCHMARK_DATA.toolUse.gpt * 100} colorClass="bg-emerald-500" />
                <BenchmarkMiniBar label="Gemini Live 3.1" score={BENCHMARK_DATA.toolUse.gemini * 100} colorClass="bg-purple-500" />
                <BenchmarkMiniBar label="Grok Voice 2.0" score={BENCHMARK_DATA.toolUse.grok * 100} colorClass="bg-rose-500" />
                <p className="text-[10px] text-stone-400 mt-2">Multi-step API chaining across Travel, Finance, Housing, E-Commerce.</p>
              </motion.div>
            </div>

            {/* Ek Metrik Kartları */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-border bg-card/40 p-4"
              >
                <div className="text-[10px] text-stone-400 uppercase tracking-wider mb-1">Word Error Rate</div>
                <div className="text-xl font-bold text-fg">{BENCHMARK_DATA.wer.miralas}%</div>
                <div className="text-[10px] text-emerald-500 flex items-center gap-1 mt-1">
                  <ArrowUpRight className="size-3" />
                  vs GPT {BENCHMARK_DATA.wer.gpt}%
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-2xl border border-border bg-card/40 p-4"
              >
                <div className="text-[10px] text-stone-400 uppercase tracking-wider mb-1">Interruption Rate</div>
                <div className="text-xl font-bold text-fg">{BENCHMARK_DATA.interruption.miralas}%</div>
                <div className="text-[10px] text-emerald-500 flex items-center gap-1 mt-1">
                  <ArrowUpRight className="size-3" />
                  vs Grok {BENCHMARK_DATA.interruption.grok}%
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-2xl border border-border bg-card/40 p-4"
              >
                <div className="text-[10px] text-stone-400 uppercase tracking-wider mb-1">Conversational Dynamics</div>
                <div className="text-xl font-bold text-fg">{BENCHMARK_DATA.conversational.miralas}%</div>
                <div className="text-[10px] text-emerald-500 flex items-center gap-1 mt-1">
                  <ArrowUpRight className="size-3" />
                  #1 Full-Duplex-Bench
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="rounded-2xl border border-border bg-card/40 p-4"
              >
                <div className="text-[10px] text-stone-400 uppercase tracking-wider mb-1">Composite Index</div>
                <div className="text-xl font-bold text-fg">{BENCHMARK_DATA.composite.miralas}%</div>
                <div className="text-[10px] text-emerald-500 flex items-center gap-1 mt-1">
                  <ArrowUpRight className="size-3" />
                  Artificial Analysis 2026
                </div>
              </motion.div>
            </div>
          </section>

          {/* 4. CHANGELOG & SYSTEM UPDATES */}
          <section id="changelog" className="scroll-mt-32 space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-2">
              <Activity className="size-4 text-emerald-500" />
              Chatterbox V3 Engine Changelog
            </h2>

            <div className="rounded-3xl border border-border bg-card/30 p-8 space-y-0 dark:bg-card/10">
              <div className="border-b border-border pb-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Tag className="size-3.5 text-blue-500" />
                    <span className="font-mono text-xs font-bold text-blue-500">v3.5.0-stable</span>
                  </div>
                  <span className="text-xs text-stone-400">August 31, 2026</span>
                </div>
                <h4 className="font-semibold text-fg text-lg">Native Multi-Speaker Architecture GA</h4>
                <p className="text-sm text-stone-400 mt-1">
                  Full deprecation of external voice actor pipelines. Chatterbox V3 now generates all voices natively with zero third-party dependencies. MOS score improved from 4.38 to 4.55.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">breaking</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">performance</span>
                </div>
              </div>

              <div className="border-b border-border pb-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Tag className="size-3.5 text-blue-500" />
                    <span className="font-mono text-xs font-bold text-blue-500">v3.4.2-stable</span>
                  </div>
                  <span className="text-xs text-stone-400">August 28, 2026</span>
                </div>
                <h4 className="font-semibold text-fg text-lg">Multi-Language Phoneme Alignment Update</h4>
                <p className="text-sm text-stone-400 mt-1">
                  Added robust native support for Uzbek and Russian phonetic transitions, reducing end-to-end token latency by 14ms across edge nodes. Full-Duplex-Bench conversational score: 96.2%.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">performance</span>
                  <span className="text-[10px] bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded-full">localization</span>
                </div>
              </div>

              <div className="border-b border-border pb-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Tag className="size-3.5 text-blue-500" />
                    <span className="font-mono text-xs font-bold text-blue-500">v3.4.0-beta</span>
                  </div>
                  <span className="text-xs text-stone-400">August 10, 2026</span>
                </div>
                <h4 className="font-semibold text-fg text-lg">Independent Dataset Pipeline Transition</h4>
                <p className="text-sm text-stone-400 mt-1">
                  Completed migration from outsourced voice samples to fully internal synthetic dataset generators, ensuring zero reliance on third-party talent delivery failures.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">infrastructure</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Tag className="size-3.5 text-blue-500" />
                    <span className="font-mono text-xs font-bold text-blue-500">v3.2.1-edge</span>
                  </div>
                  <span className="text-xs text-stone-400">July 22, 2026</span>
                </div>
                <h4 className="font-semibold text-fg text-lg">Emotional Variance Layer Integration</h4>
                <p className="text-sm text-stone-400 mt-1">
                  Enhanced conversational context awareness for dynamic tone shifting during long-form audio generation. Sub-200ms latency achieved on Istanbul edge nodes.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">performance</span>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full">feature</span>
                </div>
              </div>
            </div>
          </section>

          {/* 5. ROADMAP / LANGUAGE EXPANSION */}
          <section id="roadmap" className="scroll-mt-32 space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-2">
              <Globe2 className="size-4 text-emerald-500" />
              Upcoming Languages & Expansion
            </h2>

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
                    <p className="text-xs text-stone-400">{lang.status}</p>
                  </div>
                  <div className="mt-6">
                    <div className="mb-1 flex justify-between text-[10px] font-medium uppercase text-stone-400">
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                  <Mic className="size-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-fg">Uzbek Voice Pipeline — Active Development</h4>
                  <p className="text-sm text-stone-400 mt-1 leading-relaxed">
                    Uzbek voice casting is currently in the <strong>data collection and speaker casting phase</strong>. We are actively recruiting native speakers from Tashkent, Samarkand, and Bukhara regions to build a diverse acoustic dataset. Current focus: phoneme coverage for Latin-script Uzbek, regional accent variance, and code-switching scenarios with Russian. Estimated training start: Q4 2026.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">22% Complete</span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">Casting Open</span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">ETA: Q2 2027</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

        </div>

        {/* SAĞ TARAF: Sticky Navigation */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-32 flex flex-col gap-2 border-l border-border pl-6">
            <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
              On this page
            </span>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "text-left text-sm font-medium transition-all duration-200",
                  activeSection === item.id ? "text-blue-500" : "text-stone-400 hover:text-fg"
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