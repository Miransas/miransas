"use client";

import type {
  ComponentType,
  ReactNode,
} from "react";

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Cpu,
  FileText,
  Globe2,
  Languages,
  Megaphone,
  Mic,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Volume2,
} from "lucide-react";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { FaRadio } from "react-icons/fa6";

/* =========================================================
   TYPES
========================================================= */

type IconComponent = ComponentType<{
  className?: string;
  size?: number;
}>;

type Accent =
  | "rose"
  | "purple"
  | "lime"
  | "neutral";

type Tone =
  | "rose"
  | "purple"
  | "lime"
  | "neutral";

/* =========================================================
   NAVIGATION
========================================================= */

const NAV_ITEMS = [
  {
    id: "featured",
    label: "Featured Update",
  },
  {
    id: "all-posts",
    label: "Latest Updates",
  },
  {
    id: "performance",
    label: "Model Capabilities",
  },
  {
    id: "roadmap",
    label: "Languages",
  },
];

/* =========================================================
   BLOG POSTS
========================================================= */

const BLOG_POSTS = [
  {
    id: "post-1",
    category: "Voice Team",
    date: "September 09, 2026",
    readTime: "3 min read",
    title: "A New Chapter for the Miransas Voice Team",
    excerpt:
      "Our voice program continues with Guliruhsar now leading recordings, with Malika set to join the team soon.",
    featured: true,
  },

  {
    id: "post-2",
    category: "Research",
    date: "August 31, 2026",
    readTime: "5 min read",
    title:
      "Why Uzbek Is a First-Class Training Track for Miransas",
    excerpt:
      "Instead of treating Uzbek as a translation afterthought, Miransas is building language-specific data, phoneme coverage and evaluation around native speech.",
    featured: false,
  },

  {
    id: "post-3",
    category: "Multilingual",
    date: "August 28, 2026",
    readTime: "4 min read",
    title:
      "Adding More Global Languages to the Evaluation Lab",
    excerpt:
      "English, Spanish, Chinese, Hindi, Arabic, Japanese, Korean, French, German, Portuguese, Turkish and Russian are now part of the broader comparison set.",
    featured: false,
  },

  {
    id: "post-4",
    category: "Models",
    date: "August 25, 2026",
    readTime: "6 min read",
    title:
      "Miransas and the Next Generation of Voice AI",
    excerpt:
      "We are comparing Miransas with GPT-Realtime, Gemini Live, Grok Voice and the Chatterbox baseline using transparent capability categories rather than invented leaderboard numbers.",
    featured: false,
  },

  {
    id: "post-5",
    category: "Engineering",
    date: "August 22, 2026",
    readTime: "7 min read",
    title:
      "Inside the Miransas Training Pipeline",
    excerpt:
      "From clean speech data and speaker embeddings to evaluation and inference, this is the direction behind our next voice models.",
    featured: false,
  },
];

/* =========================================================
   MODEL FACTS
========================================================= */

const MODEL_FACTS = [
  {
    label: "Miransas baseline",
    value: "500M",
    detail: "Chatterbox Multilingual V3",
    icon: Cpu,
    accent: "purple" as Accent,
  },

  {
    label: "Baseline coverage",
    value: "23+",
    detail: "Chatterbox multilingual languages",
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
    label: "Uzbek",
    value: "Native",
    detail: "Miransas training direction",
    icon: Volume2,
    accent: "neutral" as Accent,
  },
];

/* =========================================================
   STATS
========================================================= */

const STATS = [
  {
    icon: Cpu,
    label: "Miransas baseline",
    value: "500M",
    subtext: "Chatterbox Multilingual V3",
    accent: "purple" as Accent,
  },

  {
    icon: Languages,
    label: "Baseline coverage",
    value: "23+",
    subtext: "Chatterbox multilingual languages",
    accent: "lime" as Accent,
  },

  {
    icon: Volume2,
    label: "Audio",
    value: "Realtime",
    subtext: "Voice AI evaluation stack",
    accent: "rose" as Accent,
  },

  {
    icon: Mic,
    label: "Uzbek",
    value: "Native",
    subtext: "Miransas training direction",
    accent: "neutral" as Accent,
  },
];

/* =========================================================
   CAPABILITIES
========================================================= */

const CAPABILITIES = [
  {
    label: "Realtime audio",
    values: ["✓", "✓", "✓", "✓"],
  },

  {
    label: "Audio input / output",
    values: ["✓", "✓", "✓", "✓"],
  },

  {
    label: "Voice cloning",
    values: ["✓", "—", "—", "—"],
  },

  {
    label: "Open-source baseline",
    values: ["✓", "—", "—", "—"],
  },

  {
    label: "Custom language training",
    values: ["✓", "—", "—", "—"],
  },

  {
    label: "Uzbek training track",
    values: ["✓", "—", "—", "—"],
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getToneClasses(tone: Tone) {
  switch (tone) {
    case "rose":
      return {
        text: "text-rose-300",
        soft: "bg-rose-300/10",
        border: "border-rose-300/10",
      };

    case "purple":
      return {
        text: "text-purple-300",
        soft: "bg-purple-300/10",
        border: "border-purple-300/10",
      };

    case "lime":
      return {
        text: "text-lime-300",
        soft: "bg-lime-300/10",
        border: "border-lime-300/10",
      };

    default:
      return {
        text: "text-white/70",
        soft: "bg-white/[0.04]",
        border: "border-white/[0.08]",
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
  const tone = getToneClasses(accent);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
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
      className="group rounded-[22px] border border-white/[0.08] bg-white/[0.018] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.028]"
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          className={cn(
            "flex size-9 items-center justify-center rounded-xl border",
            tone.soft,
            tone.border
          )}
        >
          <Icon className={cn("size-4", tone.text)} />
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
        className="mt-1 text-xs text-white/35"
      >
        {subtext}
      </div>
    </motion.div>
  );
}

/* =========================================================
   CAPABILITY ROW
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
      className="grid min-w-[680px] grid-cols-[1.6fr_repeat(4,minmax(110px,1fr))] items-center border-t border-white/[0.07] py-3.5 text-xs"
    >
      <span
        className="pr-4 font-medium text-white/70"
      >
        {label}
      </span>

      {values.map((value, index) => (
        <span
          key={`${label}-${index}`}
          className="px-2 text-center"
        >
          {value === "✓" ? (
            <span
              className="inline-flex size-6 items-center justify-center rounded-full bg-lime-300/[0.07] text-lime-300"
            >
              <CheckCircle2 size={13} />
            </span>
          ) : (
            <span className="text-white/20">
              —
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

/* =========================================================
   NEWS PAGE
========================================================= */

export default function NewsPage() {
  const [activeSection, setActiveSection] =
    useState("featured");

  const featuredPost =
    BLOG_POSTS.find((post) => post.featured) ??
    BLOG_POSTS[0];

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) =>
        document.getElementById(item.id)
      );

      const scrollPosition =
        window.scrollY + 260;

      for (
        let index = sections.length - 1;
        index >= 0;
        index -= 1
      ) {
        const section = sections[index];

        if (
          section &&
          section.offsetTop <= scrollPosition
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <main
      className="relative min-h-screen  bg-[#020203] px-4 pb-24 pt-28 text-white mx-auto max-w-6xl"
    >
      <div
        className="pointer-events-none absolute inset-0 "
      >
        {/* rose */}

        <div
          className="absolute left-[-160px] top-[4%] size-[420px] rounded-full bg-rose-400/[0.035] blur-[140px]"
        />

        {/* purple */}

        <div
          className="absolute right-[-180px] top-[12%] size-[500px] rounded-full bg-purple-400/[0.04] blur-[150px]"
        />

        {/* lime */}

        <div
          className="absolute left-1/2 top-[46%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-lime-300/[0.012] blur-[150px]"
        />

        {/* vignette */}

        <div
          className="absolute inset-0 bg-[radial-gradient( circle_at_center, transparent_0%, rgba(0,0,0,0.12)_52%, rgba(0,0,0,0.38)_100% )]"
        />
      </div>

      {/* ===================================================
          PAGE WRAPPER
      =================================================== */}

      <div
        className="relative z-10 mx-auto max-w-[1500px]"
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.header
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="mx-auto mb-16 max-w-4xl"
        >
          {/* Eyebrow */}

          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/45 backdrop-blur-xl"
          >
            <Megaphone className="size-3.5 text-rose-300" />

            Miransas Voice Intelligence
          </div>

          {/* Title */}

          <h1
            className="max-w-4xl text-4xl font-medium leading-[0.98] tracking-[-0.055em] text-[#fff3f0] sm:text-5xl lg:text-[68px]"
          >
            Voice AI,
            <span
              className="bg-gradient-to-r from-rose-300 via-purple-300 to-lime-200 bg-clip-text text-transparent"
            >
              {" "}
              in progress.
            </span>
          </h1>

          {/* Description */}

          <p
            className="mt-6 max-w-3xl text-sm leading-7 text-white/50 sm:text-base"
          >
            Research updates, model comparisons,
            language expansion and real voice samples
            from the Miransas team.
          </p>

          {/* Topics */}

          <div
            className="mt-6 flex flex-wrap gap-2"
          >
            {[
              "Native-language research",
              "Multilingual TTS",
              "Voice cloning",
              "Realtime evaluation",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/[0.08] bg-white/[0.018] px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white/30"
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
          {STATS.map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              subtext={stat.subtext}
              accent={stat.accent}
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
                FEATURED
            ================================================= */}

            <section
              id="featured"
              className="scroll-mt-28 space-y-6"
            >
              <div
                className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/35"
              >
                <Sparkles className="size-4 text-rose-300" />
                Featured Update
              </div>

              <motion.article
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
                transition={{
                  duration: 0.6,
                }}
                className="relative  rounded-[30px] border border-white/[0.09] bg-white/[0.018] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-9"
              >
                {/* glow */}

                <div
                  className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-purple-400/[0.06] blur-[90px]"
                />

                {/* meta */}

                <div
                  className="relative mb-5 flex flex-wrap items-center gap-3 text-xs text-white/30"
                >
                  <span
                    className="rounded-full border border-rose-300/10 bg-rose-300/[0.06] px-3 py-1 text-rose-200/75"
                  >
                    {featuredPost.category}
                  </span>

                  <span>
                    {featuredPost.date}
                  </span>

                  <span>•</span>

                  <span>
                    {featuredPost.readTime}
                  </span>
                </div>

                {/* title */}

                <h2
                  className="relative max-w-3xl text-2xl font-medium tracking-[-0.035em] text-white/90 sm:text-4xl"
                >
                  {featuredPost.title}
                </h2>

                {/* detailed feature copy */}

                <p
                  className="relative mt-5 max-w-3xl text-sm leading-7 text-white/45 sm:text-[15px]"
                >
                  Our previous voice collaboration has ended
                  and is no longer part of the Miransas voice
                  program. Guliruhsar is now leading our voice
                  recordings, and Malika will be joining the
                  team in the near future. The program's
                  direction — native-language quality and
                  real-world speech — continues uninterrupted.
                </p>

                {/* feature details */}

                <div
                  className="relative mt-8 grid gap-3 sm:grid-cols-3"
                >
                  {[
                    {
                      title: "Guliruhsar",
                      text:
                        "Now recording the core Miransas voice samples.",
                      accent: "rose" as Accent,
                    },

                    {
                      title: "Malika",
                      text:
                        "Joining the voice team soon.",
                      accent: "purple" as Accent,
                    },

                    {
                      title: "Program",
                      text:
                        "Same native-language focus, no change in direction.",
                      accent: "lime" as Accent,
                    },
                  ].map((item) => {
                    const tone = getToneClasses(
                      item.accent
                    );

                    return (
                      <div
                        key={item.title}
                        className="rounded-[20px] border border-white/[0.07] bg-black/[0.18] p-4"
                      >
                        <div
                          className={cn(
                            "mb-3 h-1 w-8 rounded-full",
                            tone.soft
                          )}
                        />

                        <div
                          className="text-xs font-medium text-white/80"
                        >
                          {item.title}
                        </div>

                        <div
                          className="mt-1.5 text-xs leading-6 text-white/35"
                        >
                          {item.text}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.article>
            </section>

            {/* =================================================
                LATEST
            ================================================= */}

            <section
              id="all-posts"
              className="scroll-mt-28 space-y-6"
            >
              <div
                className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/35"
              >
                <BookOpen className="size-4 text-purple-300" />
                Latest Updates
              </div>

              <div className="grid gap-4">
                {BLOG_POSTS.filter(
                  (post) => !post.featured
                ).map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{
                      opacity: 0,
                      y: 18,
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
                      duration: 0.45,
                      delay: index * 0.06,
                    }}
                    className="group relative  rounded-[24px] border border-white/[0.08] bg-white/[0.016] p-6 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.024]"
                  >
                    <div
                      className="mb-3 flex flex-wrap items-center gap-2 text-[11px] text-white/30"
                    >
                      <span className="text-white/55">
                        {post.category}
                      </span>

                      <span>•</span>

                      <span>{post.date}</span>

                      <span>•</span>

                      <span>{post.readTime}</span>
                    </div>

                    <h3
                      className="text-xl font-medium tracking-[-0.025em] text-white/85 transition-colors group-hover:text-white"
                    >
                      {post.title}
                    </h3>

                    <p
                      className="mt-2 max-w-3xl text-sm leading-7 text-white/40"
                    >
                      {post.excerpt}
                    </p>

                    <div
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-rose-300/70 transition-colors group-hover:text-rose-200"
                    >
                      Read update

                      <ArrowRight
                        className="size-3.5 transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* =================================================
                MODEL CAPABILITIES
            ================================================= */}

            <section
              id="performance"
              className="scroll-mt-28 space-y-6"
            >
              <div>
                <h2
                  className="flex items-center gap-3 text-2xl font-medium tracking-[-0.03em] text-white/90"
                >
                  <span
                    className="flex size-9 items-center justify-center rounded-xl border border-rose-300/10 bg-rose-300/[0.06] text-rose-200"
                  >
                    <BarChart3 className="size-4.5" />
                  </span>

                  Model Capabilities
                </h2>

                <p
                  className="mt-3 max-w-3xl text-sm leading-7 text-white/40"
                >
                  A transparent capability map — not a
                  fabricated cross-vendor benchmark.
                  Latency, MOS, WER and reasoning scores
                  will be shown only after Miransas runs
                  the same evaluation methodology across
                  every system.
                </p>
              </div>

              {/* capability table */}

              <div
                className=" rounded-[26px] border border-white/[0.08] bg-white/[0.016] backdrop-blur-xl"
              >
                <div className="overflow-x-auto">
                  <div className="min-w-[680px] p-5 sm:p-7">
                    <div
                      className="grid grid-cols-[1.6fr_repeat(4,minmax(110px,1fr))] border-b border-white/[0.07] pb-3 text-[9px] uppercase tracking-[0.16em] text-white/25"
                    >
                      <span>Capability</span>

                      <span className="text-center">
                        Miransas
                      </span>

                      <span className="text-center">
                        GPT
                      </span>

                      <span className="text-center">
                        Gemini
                      </span>

                      <span className="text-center">
                        Grok
                      </span>
                    </div>

                    {CAPABILITIES.map((row) => (
                      <CapabilityRow
                        key={row.label}
                        label={row.label}
                        values={row.values}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* model facts */}

              <div
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                {MODEL_FACTS.map((fact, index) => {
                  const Icon = fact.icon;

                  const tone =
                    getToneClasses(
                      fact.accent
                    );

                  return (
                    <motion.div
                      key={fact.label}
                      initial={{
                        opacity: 0,
                        y: 18,
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
                        duration: 0.45,
                        delay: index * 0.06,
                      }}
                      className="rounded-[22px] border border-white/[0.08] bg-white/[0.016] p-5"
                    >
                      <div
                        className={cn(
                          "mb-4 flex size-9 items-center justify-center rounded-xl border",
                          tone.soft,
                          tone.border
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-4",
                            tone.text
                          )}
                        />
                      </div>

                      <div
                        className="text-[9px] uppercase tracking-[0.18em] text-white/25"
                      >
                        {fact.label}
                      </div>

                      <div
                        className="mt-1.5 text-xl font-semibold tracking-[-0.025em] text-white/85"
                      >
                        {fact.value}
                      </div>

                      <div
                        className="mt-1 text-xs leading-5 text-white/35"
                      >
                        {fact.detail}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* benchmark note */}

              <div
                className="relative  rounded-[22px] border border-purple-300/10 bg-purple-300/[0.025] p-5"
              >
                <div
                  className="absolute right-[-40px] top-[-50px] size-32 rounded-full bg-purple-400/[0.08] blur-3xl"
                />

                <p
                  className="relative text-xs leading-7 text-white/40"
                >
                  <strong className="text-white/70">
                    Benchmark policy:
                  </strong>{" "}
                  vendor capabilities are presented as
                  documented capabilities. Internal
                  Miransas metrics will be labeled
                  separately with the evaluation date,
                  hardware, dataset and methodology.
                </p>
              </div>
            </section>

            {/* =================================================
                LANGUAGES
            ================================================= */}

            <section
              id="roadmap"
              className="scroll-mt-28 space-y-6"
            >
              <div
                className="rounded-[28px] border border-lime-300/10 bg-gradient-to-br from-lime-300/[0.025] via-transparent to-purple-300/[0.025] p-6 sm:p-7"
              >
                <div
                  className="flex flex-col gap-5 sm:flex-row"
                >
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-lime-300/10 bg-lime-300/[0.05] text-lime-200"
                  >
                    <Mic className="size-5" />
                  </div>

                  <div>
                    <div
                      className="mb-2 text-[10px] uppercase tracking-[0.18em] text-lime-200/50"
                    >
                      Language research
                    </div>

                    <h3
                      className="text-xl font-medium tracking-[-0.025em] text-white/90"
                    >
                      Uzbek — Miransas Native Training Track
                    </h3>

                    <p
                      className="mt-3 max-w-3xl text-sm leading-7 text-white/40"
                    >
                      Uzbek is being treated as a first-class
                      training and evaluation target rather
                      than simply relying on a generic
                      multilingual checkpoint. The program
                      focuses on native pronunciation, phoneme
                      coverage, prosody, speaker consistency
                      and real-world conversational speech.
                    </p>

                    <div
                      className="mt-5 flex flex-wrap gap-2"
                    >
                      {[
                        "Native data",
                        "Speaker evaluation",
                        "Phoneme coverage",
                        "Prosody",
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-lime-300/10 bg-lime-300/[0.04] px-2.5 py-1 text-[10px] text-lime-200/60"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <aside
            className="hidden w-64 shrink-0 lg:block self-start sticky top-32"
          >
            <div className="">
              <div
                className="border-l border-white/[0.08] pl-5"
              >
                <span
                  className="mb-3 block text-[10px] font-medium uppercase tracking-[0.18em] text-white/25"
                >
                  On this page
                </span>

                <nav
                  className="flex flex-col gap-1"
                >
                  {NAV_ITEMS.map((item) => {
                    const active =
                      activeSection === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          scrollTo(item.id)
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
                    );
                  })}
                </nav>

                {/* direction card */}

                <div
                  className="mt-8 rounded-[22px] border border-white/[0.08] bg-white/[0.018] p-4"
                >
                  <div
                    className="flex items-center gap-2 text-xs font-medium text-white/70"
                  >
                    <div
                      className="flex size-6 items-center justify-center rounded-lg bg-lime-300/[0.06] text-lime-200"
                    >
                      <CheckCircle2 className="size-3.5" />
                    </div>

                    Current direction
                  </div>

                  <p
                    className="mt-2 text-[11px] leading-6 text-white/35"
                  >
                    New voice contributors + native Uzbek
                    research + global multilingual evaluation.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}