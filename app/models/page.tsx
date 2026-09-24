"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Globe2,
  Languages,
  Megaphone,
  Mic,
  Pause,
  Play,
  RefreshCw,
  Volume2,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";
import { FaRadio } from "react-icons/fa6";

/* =========================================================
   TYPES
========================================================= */

type Accent =
  | "rose"
  | "purple"
  | "lime"
  | "neutral";

type IconComponent = ComponentType<{
  className?: string;
  size?: number | string;
}>;

/* =========================================================
   NAVIGATION
========================================================= */

const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "models",
    label: "Our Models",
  },
  {
    id: "uzbek",
    label: "Uzbek Track",
  },
  {
    id: "listen",
    label: "Listen",
  },
];

/* =========================================================
   MODEL DATA
========================================================= */

const MODELS = [
  {
    name: "Llasa-3B",
    source: "HKUST Audio",
    architecture:
      "LLaMA 3.2 + XCodec2 speech tokenizer",
    params: "3B",
    training:
      "250,000 hours of Chinese–English speech data",
    languages:
      "English, Chinese (baseline)",
    capabilities: [
      "Zero-shot voice cloning",
      "Text + speech-prompted synthesis",
      "Open source",
    ],
  },

  {
    name: "Chatterbox Multilingual V3",
    source: "Resemble AI",
    architecture:
      "Multilingual TTS baseline",
    params: "500M",
    training:
      "Official multilingual release",
    languages:
      "23+ languages (baseline)",
    capabilities: [
      "Multilingual out of the box",
      "Open source baseline",
      "Used as our fine-tuning base",
    ],
  },
];

/* =========================================================
   PROGRESS
========================================================= */

const UZBEK_PROGRESS = 22;

/* =========================================================
   MODEL FACTS
========================================================= */

const MODEL_FACTS = [
  {
    label: "Models in use",
    value: "2",
    detail: "Llasa-3B + Chatterbox V3",
    icon: Cpu,
    accent: "purple" as Accent,
  },

  {
    label: "Baseline languages",
    value: "23+",
    detail: "Via Chatterbox Multilingual V3",
    icon: Languages,
    accent: "lime" as Accent,
  },

  {
    label: "Audio",
    value: "Realtime",
    detail: "Voice AI evaluation stack",
    icon: FaRadio,
    accent: "rose" as Accent,
  },

  {
    label: "Uzbek training",
    value: `${UZBEK_PROGRESS}%`,
    detail: "In-house, ongoing",
    icon: Mic,
    accent: "neutral" as Accent,
  },
];

/* =========================================================
   ACCENT HELPERS
========================================================= */

function getAccent(accent: Accent) {
  switch (accent) {
    case "rose":
      return {
        icon:
          "border-rose-300/10 bg-rose-300/10 text-rose-200",
        glow:
          "bg-rose-400/10",
        text:
          "text-rose-300",
        line:
          "bg-rose-300",
      };

    case "purple":
      return {
        icon:
          "border-purple-300/10 bg-purple-300/10 text-purple-200",
        glow:
          "bg-purple-400/10",
        text:
          "text-purple-300",
        line:
          "bg-purple-300",
      };

    case "lime":
      return {
        icon:
          "border-lime-300/10 bg-lime-300/10 text-lime-200",
        glow:
          "bg-lime-300/10",
        text:
          "text-lime-300",
        line:
          "bg-lime-300",
      };

    default:
      return {
        icon:
          "border-white/10 bg-white/[0.04] text-white/70",
        glow:
          "bg-white/[0.04]",
        text:
          "text-white/70",
        line:
          "bg-white/40",
      };
  }
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  accent,
}: {
  icon: IconComponent;
  label: string;
  value: ReactNode;
  subtext: string;
  accent: Accent;
}) {
  const tone = getAccent(accent);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-50px",
      }}
      transition={{
        duration: 0.5,
      }}
      className="group relative  rounded-[24px] border border-white/[0.08] bg-white/[0.018] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.026]"
    >
      <div
        className={cn(
          `
            pointer-events-none
            absolute

            -right-12
            -top-12

            size-28

            rounded-full

            blur-3xl

            opacity-30

            transition-opacity

            group-hover:opacity-60
          `,
          tone.glow
        )}
      />

      <div
        className="relative mb-4 flex items-center gap-3"
      >
        <div
          className={cn(
            `
              flex
              size-9

              items-center
              justify-center

              rounded-xl

              border
            `,
            tone.icon
          )}
        >
          <Icon className="size-4" />
        </div>

        <span
          className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/30"
        >
          {label}
        </span>
      </div>

      <div
        className="text-2xl font-semibold tracking-[-0.03em] text-white/90"
      >
        {value}
      </div>

      <div
        className="mt-1 text-xs leading-5 text-white/35"
      >
        {subtext}
      </div>
    </motion.div>
  );
}

/* =========================================================
   AUDIO BOX
========================================================= */

interface ModelAudioBoxProps {
  modelName: string;
  provider: string;
  accent: Accent;
  transcriptText: string;
  audioSrc?: string;
}

function ModelAudioBox({
  modelName,
  provider,
  accent,
  transcriptText,
  audioSrc,
}: ModelAudioBoxProps) {
  const audioRef =
    useRef<HTMLAudioElement>(null);

  const waveformRef =
    useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [transcriptOpen, setTranscriptOpen] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const tone =
    getAccent(accent);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const onTimeUpdate = () => {
      if (!audio.duration) return;

      setProgress(
        (audio.currentTime / audio.duration) * 100
      );
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener(
      "timeupdate",
      onTimeUpdate
    );

    audio.addEventListener(
      "loadedmetadata",
      onLoadedMetadata
    );

    audio.addEventListener(
      "ended",
      onEnded
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        onTimeUpdate
      );

      audio.removeEventListener(
        "loadedmetadata",
        onLoadedMetadata
      );

      audio.removeEventListener(
        "ended",
        onEnded
      );
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audioSrc || !audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch {
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

  const seekAudio = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const audio = audioRef.current;
    const waveform =
      waveformRef.current;

    if (!audioSrc || !audio || !waveform) {
      return;
    }

    const rect =
      waveform.getBoundingClientRect();

    const percentage = Math.min(
      Math.max(
        (event.clientX - rect.left) /
        rect.width,
        0
      ),
      1
    );

    audio.currentTime =
      percentage *
      (audio.duration || 0);

    setProgress(percentage * 100);
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(
      seconds / 60
    );

    const remaining = Math.floor(
      seconds % 60
    )
      .toString()
      .padStart(2, "0");

    return `${minutes}:${remaining}`;
  };

  const waveform = [
    18, 34, 52, 28, 68, 42, 78, 55, 30,
    64, 84, 48, 72, 38, 58, 91, 46, 67,
    35, 76, 54, 29, 62, 81, 43, 70,
  ];

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-50px",
      }}
      transition={{
        duration: 0.55,
      }}
      className="group relative flex flex-col justify-between  rounded-[28px] border border-white/[0.08] bg-white/[0.018] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.025]"
    >
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
      />

      {/* Ambient glow */}

      <div
        className={cn(
          `
            pointer-events-none

            absolute

            -right-16
            -top-16

            size-40

            rounded-full

            blur-[80px]

            opacity-25
          `,
          tone.glow
        )}
      />

      <div className="relative">
        {/* Header */}

        <div
          className="flex items-center justify-between gap-4"
        >
          <div
            className="flex min-w-0 items-center gap-3"
          >
            <div
              className={cn(
                `
                  size-2.5
                  shrink-0

                  rounded-full

                  shadow-[0_0_12px_currentColor]
                `,
                tone.text
              )}
            />

            <div className="min-w-0">
              <h3
                className="truncate text-sm font-medium text-white/85"
              >
                {modelName}
              </h3>

              <p
                className="mt-0.5 text-[10px] text-white/30"
              >
                {provider}
              </p>
            </div>
          </div>

          <div
            className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-white/35"
          >
            Audio
          </div>
        </div>

        {/* Waveform */}

        <div
          ref={waveformRef}
          onClick={seekAudio}
          role="slider"
          aria-label={`${modelName} audio progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          className="relative mt-6 flex h-24 w-full cursor-pointer items-center justify-center  rounded-[20px] border border-white/[0.07] bg-black/[0.20] px-5"
        >
          {/* progress fill */}

          <div
            className="absolute inset-y-0 left-0 bg-white/[0.025]"
            style={{
              width: `${progress}%`,
            }}
          />

          <div
            className="relative z-10 flex w-full items-center justify-center gap-[3px]"
          >
            {waveform.map(
              (height, index) => {
                const played =
                  (index / waveform.length) *
                  100 <=
                  progress;

                return (
                  <motion.div
                    key={index}
                    animate={
                      isPlaying
                        ? {
                          scaleY: [
                            1,
                            0.55 +
                            ((index * 17) %
                              45) /
                            100,
                            1,
                          ],
                        }
                        : {
                          scaleY: 1,
                        }
                    }
                    transition={{
                      repeat: isPlaying
                        ? Infinity
                        : 0,
                      duration:
                        0.55 +
                        (index % 5) *
                        0.08,
                    }}
                    className={cn(
                      `
                        w-[3px]

                        origin-center

                        rounded-full

                        transition-colors
                      `,
                      played
                        ? tone.line
                        : "bg-white/10"
                    )}
                    style={{
                      height: `${Math.max(
                        12,
                        height
                      )}%`,
                      opacity: played
                        ? 0.8
                        : 1,
                    }}
                  />
                );
              }
            )}
          </div>
        </div>

        {/* Controls */}

        <div
          className="mt-5 flex items-center justify-between"
        >
          <div
            className="flex items-center gap-3"
          >
            <button
              type="button"
              onClick={togglePlayback}
              disabled={!audioSrc}
              aria-label={
                isPlaying
                  ? "Pause audio"
                  : "Play audio"
              }
              className="flex size-10 items-center justify-center rounded-full bg-[#EFEFEF] text-black transition hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPlaying ? (
                <Pause className="size-4" />
              ) : (
                <Play className="ml-0.5 size-4" />
              )}
            </button>

            <button
              type="button"
              onClick={resetPlayback}
              disabled={!audioSrc}
              aria-label="Reset audio"
              className="text-white/35 transition hover:text-white disabled:opacity-30"
            >
              <RefreshCw className="size-3.5" />
            </button>

            <span
              className="font-mono text-[11px] text-white/35"
            >
              {formatTime(
                ((progress / 100) *
                  duration) || 0
              )}
              {" / "}
              {formatTime(duration)}
            </span>
          </div>

          <Volume2
            className="size-3.5 text-white/25"
          />
        </div>

        {!audioSrc && (
          <p
            className="mt-4 text-[10px] leading-5 text-white/25"
          >
            Add your sample to{" "}
            <code className="font-mono">
              audioSrc
            </code>{" "}
            to enable playback.
          </p>
        )}
      </div>

      {/* Transcript */}

      <div
        className="relative mt-5 border-t border-white/[0.07] pt-4"
      >
        <button
          type="button"
          onClick={() =>
            setTranscriptOpen(
              (current) => !current
            )
          }
          className="flex w-full items-center justify-between text-xs font-medium text-white/45 transition hover:text-white/75"
        >
          <span>Transcript</span>

          <motion.span
            animate={{
              rotate: transcriptOpen
                ? 180
                : 0,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <ChevronDown className="size-3.5" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {transcriptOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className=""
            >
              <p
                className="pt-3 text-xs leading-6 text-white/35"
              >
                {transcriptText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

/* =========================================================
   CAPABILITY TABLE
========================================================= */

function CapabilityRow({
  label,
  values,
}: {
  label: string;
  values: string[];
}) {
  return (
    <div
      className="grid min-w-[680px] grid-cols-[1.6fr_repeat(4,minmax(110px,1fr))] items-center border-t border-white/[0.07] py-3.5"
    >
      <span
        className="pr-4 text-xs font-medium text-white/65"
      >
        {label}
      </span>

      {values.map(
        (value, index) => (
          <div
            key={`${label}-${index}`}
            className="flex items-center justify-center"
          >
            {value === "✓" ? (
              <span
                className="flex size-6 items-center justify-center rounded-full bg-lime-300/[0.06] text-lime-300"
              >
                <CheckCircle2
                  size={13}
                />
              </span>
            ) : (
              <span
                className="text-white/20"
              >
                —
              </span>
            )}
          </div>
        )
      )}
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function ModelsPage() {
  const [activeSection, setActiveSection] =
    useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const sections =
        NAV_ITEMS.map((item) =>
          document.getElementById(
            item.id
          )
        );

      const scrollPosition =
        window.scrollY + 300;

      for (
        let i =
          sections.length - 1;
        i >= 0;
        i--
      ) {
        const section =
          sections[i];

        if (
          section &&
          section.offsetTop <=
          scrollPosition
        ) {
          setActiveSection(
            section.id
          );

          break;
        }
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollTo = (id: string) => {
    const element =
      document.getElementById(id);

    if (!element) return;

    window.scrollTo({
      top:
        element.offsetTop - 110,
      behavior: "smooth",
    });
  };

  return (
    <main
      className="relative mx-auto max-w-5xl min-h-screen  bg-[#020203] px-4 pb-24 pt-28 text-white"
    >
      {/* ===================================================
          BACKGROUND ATMOSPHERE
      =================================================== */}

      <div
        className="pointer-events-none absolute inset-0 "
      >
        <div
          className="absolute left-[-180px] top-[3%] size-[460px] rounded-full bg-rose-400/[0.035] blur-[140px]"
        />

        <div
          className="absolute right-[-180px] top-[12%] size-[520px] rounded-full bg-purple-400/[0.04] blur-[150px]"
        />

        <div
          className="absolute left-1/2 top-[50%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-lime-300/[0.012] blur-[150px]"
        />

        <div
          className="absolute inset-0 bg-[radial-gradient( circle_at_center, transparent_0%, rgba(0,0,0,0.12)_50%, rgba(0,0,0,0.4)_100% )]"
        />
      </div>

      <div
        className="relative z-10 mx-auto max-w-[1450px]"
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.header
          initial={{
            opacity: 0,
            y: 26,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.75,
            ease: "easeOut",
          }}
          className="mb-14 max-w-4xl"
        >
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 backdrop-blur-xl"
          >
            <Megaphone
              className="size-3.5 text-rose-300"
            />

            Miransas Voice Intelligence
          </div>

          <h1
            className="max-w-4xl text-4xl font-medium leading-[0.98] tracking-[-0.055em] text-[#fff3f0] sm:text-5xl lg:text-[66px]"
          >
            Voice AI,
            <span
              className="bg-gradient-to-r from-rose-300 via-purple-300 to-lime-200 bg-clip-text text-transparent"
            >
              {" "}
              in progress.
            </span>
          </h1>

          <p
            className="mt-6 max-w-3xl text-sm leading-7 text-white/50 sm:text-base"
          >
            Explore the models behind Miransas,
            follow the Uzbek training track, and
            listen to real voice samples as the
            platform evolves.
          </p>

          <div
            className="mt-6 flex flex-wrap gap-2"
          >
            {[
              "Multilingual TTS",
              "Voice cloning",
              "Native-language research",
              "Realtime evaluation",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/[0.08] bg-white/[0.018] px-3 py-1.5 text-[10px] uppercase tracking-[0.11em] text-white/30"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.header>

        {/* =================================================
            STATS
        ================================================= */}

        <div
          className="mb-20 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {MODEL_FACTS.map((fact) => (
            <StatCard
              key={fact.label}
              icon={fact.icon}
              label={fact.label}
              value={fact.value}
              subtext={fact.detail}
              accent={fact.accent}
            />
          ))}
        </div>

        {/* =================================================
            MAIN LAYOUT
        ================================================= */}

        <div
          className="flex flex-col gap-12 lg:flex-row"
        >
          {/* =================================================
              CONTENT
          ================================================= */}

          <div
            className="min-w-0 flex-1 space-y-24"
          >
            {/* =================================================
                OVERVIEW
            ================================================= */}

            <section
              id="overview"
              className="scroll-mt-28"
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-70px",
                }}
                className="relative aspect-video  rounded-[30px] border border-white/[0.08] bg-black"
              >
                <video
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source
                    src="https://res.cloudinary.com/dwdk20m6q/video/upload/v1788896598/8084507-uhd_3840_2160_25fps_raxool.mp4"
                    type="video/mp4"
                  />
                </video>

                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                />

                <div
                  className="absolute bottom-5 left-5 rounded-full border border-white/[0.10] bg-black/35 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/40 backdrop-blur-xl"
                >
                  Voice model environment
                </div>
              </motion.div>
            </section>

            {/* =================================================
                OUR MODELS
            ================================================= */}

            <section
              id="models"
              className="scroll-mt-28 space-y-7"
            >
              <div>
                <div
                  className="flex items-center gap-3"
                >
                  <span
                    className="flex size-9 items-center justify-center rounded-xl border border-purple-300/10 bg-purple-300/[0.06] text-purple-200"
                  >
                    <Cpu className="size-4.5" />
                  </span>

                  <h2
                    className="text-2xl font-medium tracking-[-0.03em] text-white/90"
                  >
                    Our models
                  </h2>
                </div>

                <p
                  className="mt-3 max-w-3xl text-sm leading-7 text-white/40"
                >
                  Miransas currently works with two
                  open model baselines. We present
                  documented capabilities rather than
                  inventing cross-vendor scores.
                </p>
              </div>

              <div
                className="grid gap-4 md:grid-cols-2"
              >
                {MODELS.map(
                  (model, index) => (
                    <motion.article
                      key={model.name}
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        margin: "-60px",
                      }}
                      transition={{
                        duration: 0.55,
                        delay:
                          index * 0.08,
                      }}
                      className="group relative  rounded-[28px] border border-white/[0.08] bg-white/[0.018] p-6 backdrop-blur-xl transition hover:border-white/[0.14] hover:bg-white/[0.025]"
                    >
                      <div
                        className="absolute -right-14 -top-14 size-40 rounded-full bg-purple-400/[0.035] blur-[70px]"
                      />

                      <div className="relative">
                        <div
                          className="flex items-start justify-between gap-4"
                        >
                          <div>
                            <h3
                              className="text-lg font-medium tracking-[-0.025em] text-white/90"
                            >
                              {model.name}
                            </h3>

                            <p
                              className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/25"
                            >
                              {model.source}
                            </p>
                          </div>

                          <span
                            className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[9px] text-white/30"
                          >
                            {model.params}
                          </span>
                        </div>

                        <div
                          className="mt-7 space-y-3 text-sm"
                        >
                          {[
                            [
                              "Architecture",
                              model.architecture,
                            ],
                            [
                              "Training",
                              model.training,
                            ],
                            [
                              "Languages",
                              model.languages,
                            ],
                          ].map(
                            ([label, value]) => (
                              <div
                                key={label}
                                className="grid grid-cols-[100px_1fr] gap-4 border-b border-white/[0.07] pb-3 last:border-0"
                              >
                                <span
                                  className="text-white/25"
                                >
                                  {label}
                                </span>

                                <span
                                  className="text-right text-white/60"
                                >
                                  {value}
                                </span>
                              </div>
                            )
                          )}
                        </div>

                        <div
                          className="mt-5 flex flex-wrap gap-2"
                        >
                          {model.capabilities.map(
                            (cap) => (
                              <span
                                key={cap}
                                className="rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[10px] text-white/35"
                              >
                                {cap}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </motion.article>
                  )
                )}
              </div>
            </section>

            {/* =================================================
                UZBEK TRACK
            ================================================= */}

            <section
              id="uzbek"
              className="scroll-mt-28 space-y-7"
            >
              <div>
                <div
                  className="flex items-center gap-3"
                >
                  <span
                    className="flex size-9 items-center justify-center rounded-xl border border-lime-300/10 bg-lime-300/[0.06] text-lime-200"
                  >
                    <Globe2 className="size-4.5" />
                  </span>

                  <h2
                    className="text-2xl font-medium tracking-[-0.03em] text-white/90"
                  >
                    Uzbek voice track
                  </h2>
                </div>

                <p
                  className="mt-3 max-w-3xl text-sm leading-7 text-white/40"
                >
                  Our in-house training effort focuses
                  on native Uzbek phoneme coverage,
                  natural prosody and regional speech
                  variation.
                </p>
              </div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
                className="relative  rounded-[28px] border border-lime-300/10 bg-gradient-to-br from-lime-300/[0.035] via-white/[0.012] to-purple-300/[0.025] p-6 sm:p-7"
              >
                <div
                  className="pointer-events-none absolute right-[-70px] top-[-70px] size-48 rounded-full bg-lime-300/[0.05] blur-[90px]"
                />

                <div
                  className="relative flex flex-col gap-6 sm:flex-row"
                >
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-lime-300/10 bg-lime-300/[0.05] text-lime-200"
                  >
                    <Mic className="size-5" />
                  </div>

                  <div className="flex-1">
                    <div
                      className="text-[9px] uppercase tracking-[0.2em] text-lime-200/50"
                    >
                      Active development
                    </div>

                    <h3
                      className="mt-2 text-xl font-medium tracking-[-0.025em] text-white/90"
                    >
                      Uzbek Voice Pipeline
                    </h3>

                    <p
                      className="mt-3 max-w-3xl text-sm leading-7 text-white/40"
                    >
                      We're building a native-quality
                      Uzbek pipeline on top of Llasa-3B
                      and Chatterbox, focused on phoneme
                      coverage, natural prosody and
                      regional variation.
                    </p>

                    <div className="mt-6">
                      <div
                        className="mb-2 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.16em] text-white/30"
                      >
                        <span>Progress</span>

                        <span className="text-lime-200/65">
                          {UZBEK_PROGRESS}%
                        </span>
                      </div>

                      <div
                        className="h-1.5 w-full  rounded-full bg-white/[0.06]"
                      >
                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          whileInView={{
                            width: `${UZBEK_PROGRESS}%`,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 1.1,
                            ease: "easeOut",
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-lime-300 via-lime-200 to-purple-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* =================================================
                LISTEN
            ================================================= */}

            <section
              id="listen"
              className="scroll-mt-28 space-y-7"
            >
              <div>
                <div
                  className="flex items-center gap-3"
                >
                  <span
                    className="flex size-9 items-center justify-center rounded-xl border border-rose-300/10 bg-rose-300/[0.06] text-rose-200"
                  >
                    <Volume2 className="size-4.5" />
                  </span>

                  <h2
                    className="text-2xl font-medium tracking-[-0.03em] text-white/90"
                  >
                    Listen for yourself
                  </h2>
                </div>

                <p
                  className="mt-3 max-w-3xl text-sm leading-7 text-white/40"
                >
                  Reference samples — no invented MOS
                  or latency scores. Just the audio.
                </p>
              </div>

              <div
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              >
                <ModelAudioBox
                  modelName="Llasa-3B"
                  provider="HKUST Audio"
                  accent="purple"
                  audioSrc="/audio/llasa-3b.wav"
                  transcriptText="Replace with your Llasa-3B sample and its transcript."
                />

                <ModelAudioBox
                  modelName="Chatterbox V3"
                  provider="Resemble AI"
                  accent="lime"
                  audioSrc="/audio/chatterbox-v3.wav"
                  transcriptText="Replace with your Chatterbox Multilingual V3 sample and its transcript."
                />

                <ModelAudioBox
                  modelName="Miransas (Uzbek)"
                  provider="In-house fine-tune"
                  accent="rose"
                  audioSrc="/audio/miransas-uzbek.wav"
                  transcriptText="Replace with your current Uzbek fine-tune sample and its transcript."
                />
              </div>
            </section>
          </div>

          {/* =================================================
              STICKY NAV
          ================================================= */}

          <aside
            className="hidden w-60 shrink-0 lg:block"
          >
            <div
              className="sticky top-32 border-l border-white/[0.08] pl-5"
            >
              <span
                className="mb-3 block text-[10px] font-medium uppercase tracking-[0.18em] text-white/25"
              >
                On this page
              </span>

              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map(
                  (item) => {
                    const active =
                      activeSection ===
                      item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          scrollTo(
                            item.id
                          )
                        }
                        aria-current={
                          active
                            ? "page"
                            : undefined
                        }
                        className={cn(
                          `
                            rounded-xl

                            px-3
                            py-2.5

                            text-left

                            text-xs

                            font-medium

                            transition-all
                            duration-200
                          `,
                          active
                            ? `
                              border
                              border-lime-300/10

                              bg-lime-300/[0.06]

                              text-lime-200
                            `
                            : `
                              text-white/30

                              hover:bg-white/[0.025]

                              hover:text-white/70
                            `
                        )}
                      >
                        {item.label}
                      </button>
                    )
                  }
                )}
              </nav>

              <div
                className="mt-8 rounded-[22px] border border-white/[0.08] bg-white/[0.018] p-4"
              >
                <div
                  className="flex items-center gap-2 text-xs font-medium text-white/70"
                >
                  <span
                    className="flex size-6 items-center justify-center rounded-lg bg-lime-300/[0.06] text-lime-200"
                  >
                    <CheckCircle2 className="size-3.5" />
                  </span>

                  Current direction
                </div>

                <p
                  className="mt-2 text-[11px] leading-6 text-white/35"
                >
                  Two open baselines, native Uzbek
                  research, and multilingual voice
                  evaluation.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}