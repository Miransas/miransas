
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import {
  ArrowRight,
  BrainCircuit,
  Cpu,
  Languages,
  Layers,
  Mic,
  Monitor,
  Network,
  Radio,
  Sparkles,
  Volume2,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type NavItem = {
  id: string;
  label: string;
};

type ProductArea = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

type TechnicalPillar = {
  number: string;
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const NAV_ITEMS: NavItem[] = [
  { id: "featured", label: "Our Direction" },
  { id: "product-areas", label: "Product Areas" },
  { id: "engineering", label: "Engineering" },
  { id: "language-focus", label: "Language Focus" },
];

const PRODUCT_AREAS: ProductArea[] = [
  {
    number: "01",
    title: "Text to Speech",
    description:
      "Transform written content into natural-sounding speech through AI-powered voice technology.",
    icon: Volume2,
  },
  {
    number: "02",
    title: "Speech to Text",
    description:
      "Turn spoken language into text through speech recognition and audio processing.",
    icon: Radio,
  },
  {
    number: "03",
    title: "Voice Cloning",
    description:
      "Explore voice identity and personalized voice reproduction workflows.",
    icon: Mic,
  },
  {
    number: "04",
    title: "Real-time Voice",
    description:
      "Build responsive voice experiences designed around low-latency interaction.",
    icon: Network,
  },
];

const TECHNICAL_PILLARS: TechnicalPillar[] = [
  {
    number: "01",
    label: "Core Backend",
    value: "Rust",
    description:
      "The foundation for backend services, performance-sensitive operations and core application logic.",
    icon: Cpu,
  },
  {
    number: "02",
    label: "Communication",
    value: "gRPC",
    description:
      "Service-to-service communication designed around clearly defined interfaces.",
    icon: Network,
  },
  {
    number: "03",
    label: "Model Integration",
    value: "Python",
    description:
      "The model-side layer for connecting AI models and inference workflows.",
    icon: BrainCircuit,
  },
  {
    number: "04",
    label: "Product Interface",
    value: "Next.js",
    description:
      "The web application experience, built with Next.js, TypeScript and Tailwind CSS.",
    icon: Monitor,
  },
];

/* =========================================================
   ANIMATION
========================================================= */

const reveal = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-3">
        <span className="h-px w-6 bg-white/40" />

        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
          {eyebrow}
        </span>
      </div>

      <h2 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function NewsPage() {
  const [activeSection, setActiveSection] = useState("featured");

  /* ---------------------------------------------------------
     SCROLL SPY
  --------------------------------------------------------- */

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  /* ---------------------------------------------------------
     NAVIGATION
  --------------------------------------------------------- */

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    setActiveSection(id);

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen  bg-[#0a0a0a] text-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <header className="relative border-b border-white/[0.07]">

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.035),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 md:px-12 md:pb-24 md:pt-40">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
          >
            <div className="mb-7 flex items-center gap-3">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04]">
                <Sparkles className="h-4 w-4 text-stone-300" />
              </div>

              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-400">
                Miransas / Journal
              </span>

            </div>

            <h1 className="max-w-4xl text-4xl font-medium leading-[1.12] tracking-[-0.045em] text-white md:text-6xl lg:text-7xl">
              Engineering the future
              <br />
              of voice AI.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-stone-400 md:text-lg">
              Explore the ideas, engineering principles and product
              direction behind Miransas — building voice technology
              with a focus on language, infrastructure and thoughtful
              design.
            </p>

            <button
              onClick={() => scrollToSection("featured")}
              className="group mt-9 inline-flex items-center gap-3 text-sm font-medium text-white transition-colors hover:text-stone-400"
            >
              Discover our approach

              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.12] transition-all group-hover:border-white/30 group-hover:bg-white/[0.06]">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          </motion.div>

          {/* INFORMATION */}

          <div className="mt-20 grid grid-cols-1 gap-6 border-t border-white/[0.07] pt-6 sm:grid-cols-3">

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-600">
                Focus
              </span>
              <p className="mt-2 text-sm text-stone-300">
                Voice AI Infrastructure
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-600">
                Engineering
              </span>
              <p className="mt-2 text-sm text-stone-300">
                Rust · gRPC · Python
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-600">
                Language Focus
              </span>
              <p className="mt-2 text-sm text-stone-300">
                Uzbek Language
              </p>
            </div>

          </div>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">

        <div className="flex flex-col items-start gap-14 lg:flex-row lg:gap-20">

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="sticky top-24 z-20 w-full shrink-0 lg:w-56">

            <div className="rounded-2xl  p-4 backdrop-blur-xl">

              <div className="mb-4 flex items-center gap-2 border-b border-white/[0.07] pb-4">

                <Layers className="h-3.5 w-3.5 text-stone-400" />

                <span className="text-[10px] font-medium uppercase tracking-[0.19em] text-stone-500">
                  Explore
                </span>

              </div>

              <nav
                aria-label="Page navigation"
                className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible"
              >

                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={`group flex shrink-0 items-center justify-between gap-4 rounded-xl border px-3 py-3 text-left text-xs transition-all duration-200 ${
                        isActive
                          ? "border-white/[0.08] bg-white/[0.055] text-white"
                          : "border-transparent text-stone-500 hover:bg-white/[0.035] hover:text-stone-200"
                      }`}
                    >
                      <span>{item.label}</span>

                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all ${
                          isActive
                            ? "bg-white"
                            : "bg-transparent"
                        }`}
                      />
                    </button>
                  );
                })}

              </nav>
            </div>

            <div className="mt-4 hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-4 lg:block">

              <span className="text-[9px] uppercase tracking-[0.2em] text-stone-600">
                MIRANSAS
              </span>

              <p className="mt-2 text-xs leading-6 text-stone-500">
                Secure. Connect. Evolve.
              </p>

            </div>
          </aside>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="min-w-0 flex-1 space-y-28">

            {/* ===============================================
                FEATURED
            =============================================== */}

            <section
              id="featured"
              className="scroll-mt-28"
            >

              <SectionHeading
                eyebrow="01 / Our Direction"
                title="Built with a clear purpose."
              />

              <motion.article
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={reveal}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0b0b] p-7 transition-colors duration-300 hover:border-white/[0.14] md:p-10"
              >

                <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/[0.025] blur-[100px]" />

                <div className="relative z-10">

                  <div className="mb-8 flex flex-wrap items-center gap-3">

                    <span className="rounded-full border border-white/[0.10] bg-white/[0.045] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-stone-300">
                      Project Foundation
                    </span>

                    <span className="text-[10px] uppercase tracking-[0.15em] text-stone-600">
                      Origin & Vision
                    </span>

                  </div>

                  <h3 className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.035em] text-white md:text-5xl">
                    A voice platform shaped by an overlooked language.
                  </h3>

                  <p className="mt-6 max-w-3xl text-sm leading-8 text-stone-400 md:text-base">
                    Miransas began with a simple observation:
                    Uzbek was not adequately supported by many of
                    the voice AI tools available at the time.
                    That gap became the starting point for a broader
                    vision — building voice experiences with language
                    as a priority, supported by carefully designed
                    software architecture.
                  </p>

                  <div className="mt-12 grid gap-8 border-t border-white/[0.07] pt-8 md:grid-cols-3">

                    <div>
                      <span className="text-[10px] uppercase tracking-[0.19em] text-stone-600">
                        The Motivation
                      </span>

                      <p className="mt-3 text-sm leading-6 text-stone-300">
                        Making voice technology more accessible
                        to underserved languages.
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-[0.19em] text-stone-600">
                        The Approach
                      </span>

                      <p className="mt-3 text-sm leading-6 text-stone-300">
                        Treating architecture as the foundation
                        of a reliable product.
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-[0.19em] text-stone-600">
                        The Direction
                      </span>

                      <p className="mt-3 text-sm leading-6 text-stone-300">
                        Bringing speech technology, model
                        integration and product design together.
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={() => scrollToSection("engineering")}
                    className="mt-10 inline-flex items-center gap-2 text-xs font-medium text-stone-300 transition-colors hover:text-white"
                  >
                    Explore the engineering approach
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                </div>
              </motion.article>
            </section>

            {/* ===============================================
                PRODUCT AREAS
            =============================================== */}

            <section
              id="product-areas"
              className="scroll-mt-28"
            >

              <SectionHeading
                eyebrow="02 / Product Areas"
                title="Designed around the voice."
              />

              <p className="mb-8 max-w-2xl text-sm leading-7 text-stone-500">
                These are the core areas shaping the Miransas
                product direction. They describe the scope of
                the platform, not a claim that every capability
                is currently available.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {PRODUCT_AREAS.map((area, index) => {
                  const Icon = area.icon;

                  return (
                    <motion.article
                      key={area.number}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                      variants={reveal}
                      transition={{
                        delay: index * 0.06,
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0b0b] p-6 transition-all duration-300 hover:border-white/[0.16] hover:bg-[#101010]"
                    >

                      <div className="mb-8 flex items-center justify-between">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-stone-300 transition-colors group-hover:bg-white/[0.08] group-hover:text-white">
                          <Icon className="h-[18px] w-[18px]" />
                        </div>

                        <span className="font-mono text-[10px] text-stone-600">
                          {area.number}
                        </span>

                      </div>

                      <h3 className="text-lg font-medium tracking-tight text-white">
                        {area.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-stone-500">
                        {area.description}
                      </p>

                      <div className="mt-7 h-px w-full bg-white/[0.05] transition-colors group-hover:bg-white/[0.12]" />

                    </motion.article>
                  );
                })}

              </div>
            </section>

            {/* ===============================================
                ENGINEERING
            =============================================== */}

            <section
              id="engineering"
              className="scroll-mt-28"
            >

              <SectionHeading
                eyebrow="03 / Engineering"
                title="Architecture before scale."
              />

              <p className="mb-8 max-w-2xl text-sm leading-7 text-stone-500">
                Miransas follows a clear separation of responsibilities
                across its product interface, backend services and
                model integration layer.
              </p>

              {/* TECHNICAL STACK */}

              <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0b0b]">

                <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5 md:px-8">

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
                      Technical Foundation
                    </span>

                    <h3 className="mt-2 text-lg font-medium text-white">
                      Core technology stack
                    </h3>
                  </div>

                  <Layers className="h-5 w-5 text-stone-500" />

                </div>

                <div className="divide-y divide-white/[0.05]">

                  {TECHNICAL_PILLARS.map((pillar, index) => {
                    const Icon = pillar.icon;

                    return (
                      <motion.div
                        key={pillar.number}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={reveal}
                        transition={{
                          delay: index * 0.05,
                        }}
                        className="group grid grid-cols-[42px_1fr] gap-4 px-6 py-7 transition-colors hover:bg-white/[0.02] md:grid-cols-[48px_150px_1fr] md:items-center md:gap-6 md:px-8"
                      >

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-stone-400 transition-colors group-hover:bg-white/[0.08] group-hover:text-white">
                          <Icon className="h-[18px] w-[18px]" />
                        </div>

                        <div>
                          <span className="block text-[9px] uppercase tracking-[0.18em] text-stone-600">
                            {pillar.label}
                          </span>

                          <span className="mt-1 block text-lg font-medium tracking-tight text-white">
                            {pillar.value}
                          </span>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                          <p className="text-sm leading-7 text-stone-500">
                            {pillar.description}
                          </p>
                        </div>

                      </motion.div>
                    );
                  })}

                </div>
              </div>

              {/* ENGINEERING PRINCIPLE */}

              <div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 md:p-8">

                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
                  Engineering Principle
                </span>

                <p className="mt-4 max-w-3xl text-xl font-medium leading-8 tracking-tight text-stone-200 md:text-2xl">
                  Every component should have a clear responsibility.
                  Every connection should have a purpose.
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-500">
                  The goal is not to choose technologies because
                  they are popular. It is to build a system whose
                  components work together without unnecessary
                  complexity.
                </p>

              </div>
            </section>

            {/* ===============================================
                LANGUAGE FOCUS
            =============================================== */}

            <section
              id="language-focus"
              className="scroll-mt-28"
            >

              <SectionHeading
                eyebrow="04 / Language Focus"
                title="Uzbek deserves more than an afterthought."
              />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={reveal}
                className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0b0b]"
              >

                <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/[0.025] blur-[100px]" />

                <div className="relative z-10 p-7 md:p-10">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.04] text-stone-300">
                    <Languages className="h-5 w-5" />
                  </div>

                  <div className="mt-9 max-w-3xl">

                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
                      A Core Language Priority
                    </span>

                    <h3 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.035em] text-white md:text-4xl">
                      Language is more than translation.
                    </h3>

                    <p className="mt-6 text-sm leading-8 text-stone-400 md:text-base">
                      The original motivation behind Miransas was
                      the lack of meaningful Uzbek support across
                      popular voice AI tools. That experience
                      shaped an important principle: language
                      quality should be considered from the
                      beginning, not added as an afterthought.
                    </p>

                    <p className="mt-4 text-sm leading-8 text-stone-400 md:text-base">
                      The long-term direction is to approach Uzbek
                      through language-specific speech data,
                      phonetic characteristics, regional variation
                      and native-speaker evaluation — rather than
                      relying on translation alone.
                    </p>

                  </div>

                  <div className="mt-12 flex flex-col gap-6 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-stone-600">
                        Primary Language Focus
                      </span>

                      <p className="mt-2 text-2xl font-medium tracking-tight text-white">
                        Uzbek
                      </p>
                    </div>

                    <div className="max-w-sm">
                      <p className="text-xs leading-6 text-stone-500">
                        Language support and model quality will be
                        communicated based on actual implementation
                        and evaluation, not assumed capability.
                      </p>
                    </div>

                  </div>
                </div>
              </motion.div>
            </section>

            {/* ===============================================
                FOOTER
            =============================================== */}

            <footer className="border-t border-white/[0.07] pt-8">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <span className="text-sm font-medium tracking-wide text-white">
                    MIRANSAS
                  </span>

                  <p className="mt-2 text-xs text-stone-600">
                    Building with purpose.
                  </p>
                </div>

                <span className="text-[10px] uppercase tracking-[0.18em] text-stone-600">
                  Research · Engineering · Voice AI
                </span>

              </div>
            </footer>

          </div>
        </div>
      </div>
    </main>
  );
}
