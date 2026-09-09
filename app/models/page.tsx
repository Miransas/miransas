"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Cpu,
  Globe2,
  Mic,
  Play,
  Pause,
  RefreshCw,
  Volume2,
} from "lucide-react";
import { useEffect, useState, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
// GERÇEK MODEL VERİLERİ — uydurma cross-vendor benchmark yok
// ─────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "models", label: "Our Models" },
  { id: "uzbek", label: "Uzbek Track" },
  { id: "listen", label: "Listen" },
];

const MODELS = [
  {
    name: "Llasa-3B",
    source: "HKUST Audio",
    architecture: "LLaMA 3.2 + XCodec2 speech tokenizer",
    params: "3B",
    training: "250,000 hours of Chinese–English speech data",
    languages: "English, Chinese (baseline)",
    capabilities: ["Zero-shot voice cloning", "Text + speech-prompted synthesis", "Open source"],
  },
  {
    name: "Chatterbox Multilingual V3",
    source: "Resemble AI",
    architecture: "Multilingual TTS baseline",
    params: "500M",
    training: "Official multilingual release",
    languages: "23+ languages (baseline)",
    capabilities: ["Multilingual out of the box", "Open source baseline", "Used as our fine-tuning base"],
  },
];

const UZBEK_PROGRESS = 22; // update as training advances

function StatCard({ icon: Icon, label, value, subtext, color }: { icon: any; label: string; value: ReactNode; subtext: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border bg-black p-5 backdrop-blur-sm"
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
// SES ÖRNEĞİ KARTI — sen kendi audioSrc'lerini ekleyeceksin
// ─────────────────────────────────────────────────────────────

interface ModelAudioBoxProps {
  modelName: string;
  provider: string;
  badgeColor: string;
  duration: string;
  transcriptText: string;
  audioSrc?: string;
}

function ModelAudioBox({ modelName, provider, badgeColor, duration, transcriptText, audioSrc }: ModelAudioBoxProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    const onEnded = () => { setIsPlaying(false); setProgress(0); };
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
    if (audio.paused) { await audio.play(); setIsPlaying(true); }
    else { audio.pause(); setIsPlaying(false); }
  };

  const resetPlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setProgress(0);
    setIsPlaying(false);
  };

  const waveform = [18, 34, 52, 28, 68, 42, 78, 55, 30, 64, 84, 48, 72, 38, 58, 91, 46, 67, 35, 76, 54, 29, 62, 81, 43, 70];

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm hover:border-border/80 transition-colors">
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      <div>
        <div className="flex items-center gap-2 mb-4 min-w-0">
          <span className={cn("size-2.5 shrink-0 rounded-full", badgeColor)} />
          <div className="min-w-0">
            <h4 className="font-semibold text-fg text-sm truncate">{modelName}</h4>
            <p className="text-[10px] text-stone-400 mt-0.5">{provider}</p>
          </div>
        </div>

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
                  className={cn("w-[3px] rounded-full origin-center transition-colors", played ? badgeColor : "bg-muted/40")}
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
            <button onClick={resetPlayback} disabled={!audioSrc} aria-label="Reset audio" className="text-stone-300 hover:text-fg transition-colors disabled:opacity-40">
              <RefreshCw className="size-3.5" />
            </button>
            <span className="font-mono text-xs text-stone-300">0:00 / {duration}</span>
          </div>
          <Volume2 className="size-3 text-stone-300" />
        </div>

        {!audioSrc && (
          <p className="mt-3 text-[10px] text-stone-500">
            Add your sample at <code className="font-mono">audioSrc</code> to enable playback.
          </p>
        )}
      </div>

      <div className="mt-4 border-t border-border/60 pt-3">
        <button onClick={() => setTranscriptOpen(!transcriptOpen)} className="flex w-full items-center justify-between text-xs font-medium text-stone-300 hover:text-fg transition-colors">
          <span>Transcript</span>
          <ChevronDown className={cn("size-3.5 transition-transform duration-200", transcriptOpen && "rotate-180")} />
        </button>
        <AnimatePresence>
          {transcriptOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden text-xs text-stone-300/90 pt-2 leading-relaxed">
              <p>{transcriptText}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ANA SAYFA
// ─────────────────────────────────────────────────────────────

export default function ModelsPage() {
  const [activeSection, setActiveSection] = useState("overview");

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
    if (element) window.scrollTo({ top: element.offsetTop - 120, behavior: "smooth" });
  };

  return (
    <div className="container-page mx-auto min-h-screen px-4 pb-24 pt-32">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-green-500 px-3 py-1 text-md font-medium text-stone-700 mb-4">
          <Mic className="size-3" />
          2 Models · Training Uzbek
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-stone-300 sm:text-5xl">
          Miralas Ses Modelleri
        </h1>
        <p className="mt-4 text-lg text-stone-400">
          Two models power Miralas today — Llasa-3B and Chatterbox Multilingual V3 —
          while we train our own Uzbek-language voice model in-house.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
        <StatCard icon={Cpu} label="Models in use" value="2" subtext="Llasa-3B + Chatterbox V3" color="bg-blue-500" />
        <StatCard icon={Globe2} label="Baseline Languages" value="23+" subtext="Via Chatterbox Multilingual V3" color="bg-emerald-500" />
        <StatCard icon={Mic} label="Uzbek Training" value={`${UZBEK_PROGRESS}%`} subtext="In-house, ongoing" color="bg-amber-500" />
      </div>

      <div className="flex flex-col lg:flex-row gap-12 relative">
        <div className="flex-1 space-y-20">

          {/* OVERVIEW */}
          <section id="overview" className="scroll-mt-32">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-secondary/50 ring-1 ring-border dark:bg-secondary/20">
              <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
                <source src="https://res.cloudinary.com/dwdk20m6q/video/upload/v1788896598/8084507-uhd_3840_2160_25fps_raxool.mp4" type="video/mp4" />
              </video>
            </div>
          </section>

          {/* OUR MODELS */}
          <section id="models" className="scroll-mt-32 space-y-6">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-fg">
                <Cpu className="size-6 text-blue-500" />
                Modellerimiz
              </h2>
              <p className="mt-2 text-stone-300">
                Miralas runs on two open models today. No fabricated cross-vendor
                scores here — just what each model actually is.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {MODELS.map((model) => (
                <div key={model.name} className="rounded-3xl border border-border bg-card/40 p-6">
                  <h3 className="text-lg font-semibold text-fg">{model.name}</h3>
                  <p className="text-xs text-stone-400 mt-0.5">{model.source}</p>

                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-stone-400">Mimari</span>
                      <span className="text-stone-200 text-right">{model.architecture}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-stone-400">Parametreler</span>
                      <span className="text-stone-200">{model.params}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-stone-400">Training data</span>
                      <span className="text-stone-200 text-right">{model.training}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Diller</span>
                      <span className="text-stone-200 text-right">{model.languages}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {model.capabilities.map((cap) => (
                      <span key={cap} className="text-[10px] bg-secondary/50 text-stone-300 px-2 py-1 rounded-full">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* UZBEK TRACK */}
          <section id="uzbek" className="scroll-mt-32 space-y-6">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-fg">
                <Globe2 className="size-6 text-emerald-500" />
                Uzbek Voice Track
              </h2>
              <p className="mt-2 text-stone-300">
                Our own in-house training effort — fine-tuning on top of the two
                baseline models above for native Uzbek phoneme coverage and prosody.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                  <Mic className="size-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-fg">Uzbek Voice Pipeline — Active Development</h4>
                  <p className="text-sm text-stone-300 mt-1 leading-relaxed">
                    We're building a native-quality Uzbek pipeline on top of Llasa-3B
                    and Chatterbox, focused on phoneme coverage, natural prosody, and regional variation.
                  </p>
                  <div className="mt-4">
                    <div className="mb-1 flex justify-between text-[10px] font-medium uppercase text-stone-300">
                      <span>Progress</span>
                      <span>{UZBEK_PROGRESS}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary dark:bg-secondary/50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${UZBEK_PROGRESS}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-amber-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* LISTEN */}
          <section id="listen" className="scroll-mt-32 space-y-6">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-fg">
                <Volume2 className="size-6 text-rose-500" />
                Kendiniz dinleyin
              </h2>
              <p className="mt-2 text-stone-300">
                Reference samples — no invented MOS or latency scores, just the audio.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ModelAudioBox
                modelName="Llasa-3B"
                provider="HKUST Audio"
                badgeColor="bg-blue-500"
                duration="0:12"
                audioSrc="/audio/llasa-3b.wav"
                transcriptText="Replace with your Llasa-3B sample and its transcript."
              />
              <ModelAudioBox
                modelName="Chatterbox V3"
                provider="Resemble AI"
                badgeColor="bg-emerald-500"
                duration="0:12"
                audioSrc="/audio/chatterbox-v3.wav"
                transcriptText="Replace with your Chatterbox Multilingual V3 sample and its transcript."
              />
              <ModelAudioBox
                modelName="Miralas (Uzbek)"
                provider="In-house fine-tune"
                badgeColor="bg-amber-500"
                duration="0:12"
                audioSrc="/audio/miralas-uzbek.wav"
                transcriptText="Replace with your current Uzbek fine-tune sample and its transcript."
              />
            </div>
          </section>
        </div>

        {/* STICKY NAV */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-32 flex flex-col gap-2 border-l border-border pl-6">
            <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-300">Bu sayfada</span>
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
          </div>
        </aside>
      </div>
    </div>
  );
}