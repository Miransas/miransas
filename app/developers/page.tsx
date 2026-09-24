"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Code2,
  Cpu,
  ExternalLink,

  Globe2,
  Layers3,
  MessageSquareCode,
  Network,
  Play,
  Radio,
  Server,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

import { motion } from "motion/react";

import { useState } from "react";
import { FaGithub } from "react-icons/fa6";

/* =========================================================
   STACK
========================================================= */

const STACK = [
  {
    name: "Rust",
    label: "Backend runtime",
    description:
      "High-performance services, realtime workloads, and infrastructure.",
    icon: Server,
    accent: "rose",
  },

  {
    name: "Python",
    label: "AI & research",
    description:
      "Training pipelines, experiments, model tooling, and evaluation.",
    icon: Cpu,
    accent: "lime",
  },

  {
    name: "gRPC",
    label: "Service transport",
    description:
      "Fast communication between services and intelligent runtime layers.",
    icon: Network,
    accent: "purple",
  },

  {
    name: "TypeScript",
    label: "Product layer",
    description:
      "Typed application logic across web interfaces and developer tools.",
    icon: Braces,
    accent: "neutral",
  },

  {
    name: "React",
    label: "UI",
    description:
      "Interactive product experiences built around intelligent systems.",
    icon: Code2,
    accent: "purple",
  },

  {
    name: "AI",
    label: "Intelligence layer",
    description:
      "Voice, language, agents, and the systems connecting them.",
    icon: Sparkles,
    accent: roseAccent(),
  },
];

/* =========================================================
   ARCHITECTURE
========================================================= */

const ARCHITECTURE = [
  {
    number: "01",
    title: "AI",
    description:
      "Models, inference, voice, language and intelligence.",
    icon: Sparkles,
    accent: "purple",
  },

  {
    number: "02",
    title: "Runtime",
    description:
      "Fast services and execution layers built in Rust.",
    icon: Server,
    accent: "rose",
  },

  {
    number: "03",
    title: "gRPC",
    description:
      "Low-overhead communication between services.",
    icon: Network,
    accent: "lime",
  },

  {
    number: "04",
    title: "Product",
    description:
      "Interfaces that turn infrastructure into useful experiences.",
    icon: Layers3,
    accent: "purple",
  },
];

/* =========================================================
   CODE SAMPLE
========================================================= */

const CODE_LINES = [
  'import { Agent } from "@miransas/agents";',
  "",
  'const agent = new Agent({',
  '  voice: "natural",',
  '  language: "tr",',
  '  actions: ["book", "answer"],',
  "});",
  "",
  "await agent.connect();",
];

/* =========================================================
   HELPERS
========================================================= */

function roseAccent() {
  return "rose";
}

function getAccent(accent: string) {
  switch (accent) {
    case "rose":
      return {
        icon:
          "border-rose-300/10 bg-rose-300/[0.06] text-rose-200",
        glow:
          "bg-rose-400/[0.06]",
        text:
          "text-rose-200",
        line:
          "bg-rose-300/60",
      };

    case "purple":
      return {
        icon:
          "border-purple-300/10 bg-purple-300/[0.06] text-purple-200",
        glow:
          "bg-purple-400/[0.06]",
        text:
          "text-purple-200",
        line:
          "bg-purple-300/60",
      };

    case "lime":
      return {
        icon:
          "border-lime-300/10 bg-lime-300/[0.06] text-lime-200",
        glow:
          "bg-lime-300/[0.05]",
        text:
          "text-lime-200",
        line:
          "bg-lime-300/60",
      };

    default:
      return {
        icon:
          "border-white/10 bg-white/[0.035] text-white/60",
        glow:
          "bg-white/[0.025]",
        text:
          "text-white/65",
        line:
          "bg-white/30",
      };
  }
}

/* =========================================================
   DEVELOPER PAGE
========================================================= */

export default function DeveloperPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        CODE_LINES.join("\n")
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main
      className="
        relative
        min-h-screen

        overflow-hidden

        bg-[#020203]

        text-white
      "
    >
      {/* =====================================================
          GLOBAL ATMOSPHERE
      ===================================================== */}

      <div
        className="
          pointer-events-none

          fixed
          inset-0

          z-0

          overflow-hidden
        "
      >
        {/* rose */}

        <motion.div
          animate={{
            x: [0, 12, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute

            left-[-120px]
            top-[8%]

            size-[420px]

            rounded-full

            bg-rose-400/[0.035]

            blur-[140px]
          "
        />

        {/* purple */}

        <motion.div
          animate={{
            x: [0, -14, 0],
            y: [0, 12, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute

            right-[-140px]
            top-[14%]

            size-[480px]

            rounded-full

            bg-purple-400/[0.045]

            blur-[150px]
          "
        />

        {/* lime */}

        <div
          className="
            absolute

            left-1/2
            bottom-[-180px]

            h-[450px]
            w-[680px]

            -translate-x-1/2

            rounded-full

            bg-lime-300/[0.014]

            blur-[150px]
          "
        />

        <div
          className="
            absolute
            inset-0

            bg-[radial-gradient(
              circle_at_center,
              transparent_0%,
              rgba(0,0,0,0.10)_48%,
              rgba(0,0,0,0.5)_100%
            )]
          "
        />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          z-10

          mx-auto

          max-w-7xl

          px-6

          pb-24
          pt-28

          sm:pb-32
          sm:pt-36

          lg:px-8
          lg:pt-40
        "
      >
        <div
          className="
            grid

            items-center

            gap-16

            lg:grid-cols-[0.9fr_1.1fr]

            lg:gap-20
          "
        >
          {/* =================================================
              LEFT HERO
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <div
              className="
                inline-flex

                items-center
                gap-2

                rounded-full

                border
                border-white/10

                bg-white/[0.025]

                px-3
                py-1.5

                text-[10px]

                uppercase

                tracking-[0.22em]

                text-white/40

                backdrop-blur-xl
              "
            >
              <Terminal
                className="
                  size-3.5

                  text-lime-200
                "
              />

              Miransas Developers
            </div>

            <h1
              className="
                mt-7

                max-w-2xl

                text-[46px]

                leading-[0.96]

                tracking-[-0.06em]

                text-[#fff3f0]

                sm:text-[58px]

                md:text-[70px]

                lg:text-[78px]
              "
            >
              Built for
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-[#EFEFEF]
                  via-purple-200
                  to-rose-200

                  bg-clip-text

                  text-transparent
                "
              >
                builders.
              </span>
            </h1>

            <p
              className="
                mt-7

                max-w-xl

                text-sm

                leading-7

                text-white/45

                sm:text-base
              "
            >
              AI infrastructure, voice systems, fast
              backends, service communication, and
              interfaces that turn complex technology
              into usable products.
            </p>

            {/* Stack line */}

            <div
              className="
                mt-8

                flex

                flex-wrap

                items-center

                gap-x-2
                gap-y-2

                text-[10px]

                uppercase

                tracking-[0.13em]

                text-white/30
              "
            >
              {[
                "Rust",
                "Python",
                "AI",
                "gRPC",
                "TypeScript",
                "React",
              ].map((item, index) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      rounded-full

                      border
                      border-white/[0.08]

                      bg-white/[0.018]

                      px-2.5
                      py-1.5
                    "
                  >
                    {item}
                  </span>

                  {index < 5 && (
                    <span className="text-white/10">
                      /
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}

            <div
              className="
                mt-9

                flex

                flex-wrap

                gap-3
              "
            >
              <a
                href="https://github.com/miransas"
                target="_blank"
                rel="noreferrer"
                className="
                  group

                  inline-flex

                  items-center
                  gap-2

                  rounded-full

                  bg-[#EFEFEF]

                  px-5
                  py-3

                  text-sm

                  font-medium

                  text-[#080808]

                  transition

                  hover:bg-white
                "
              >
                <FaGithub className="size-4" />

                GitHub

                <ArrowUpRight
                  className="
                    size-3.5

                    transition-transform

                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </a>

              <a
                href="#architecture"
                className="
                  inline-flex

                  items-center
                  gap-2

                  rounded-full

                  border
                  border-white/10

                  bg-white/[0.02]

                  px-5
                  py-3

                  text-sm

                  text-white/55

                  backdrop-blur-xl

                  transition

                  hover:border-white/20
                  hover:text-white
                "
              >
                Explore stack

                <ArrowRight className="size-4" />
              </a>
            </div>
          </motion.div>

          {/* =================================================
              CODE TERMINAL
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              rotateX: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: 0,
            }}
            transition={{
              delay: 0.1,
              duration: 0.9,
              ease: "easeOut",
            }}
            className="
              relative

              [perspective:1200px]
            "
          >
            <div
              className="
                absolute
                -inset-8

                rounded-full

                bg-purple-400/[0.045]

                blur-[90px]
              "
            />

            <div
              className="
                relative

                overflow-hidden

                rounded-[30px]

                border
                border-white/[0.10]

                bg-[#070708]/80

                shadow-[0_40px_120px_rgba(0,0,0,0.45)]

                backdrop-blur-2xl
              "
            >
              {/* terminal header */}

              <div
                className="
                  flex

                  items-center
                  justify-between

                  border-b
                  border-white/[0.07]

                  px-5
                  py-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      size-2

                      rounded-full

                      bg-rose-300/70
                    "
                  />

                  <span
                    className="
                      size-2

                      rounded-full

                      bg-purple-300/70
                    "
                  />

                  <span
                    className="
                      size-2

                      rounded-full

                      bg-lime-300/70
                    "
                  />
                </div>

                <div
                  className="
                    text-[9px]

                    uppercase

                    tracking-[0.18em]

                    text-white/25
                  "
                >
                  agent.ts
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="
                    text-[10px]

                    text-white/30

                    transition

                    hover:text-white/70
                  "
                >
                  {copied
                    ? "Copied"
                    : "Copy"}
                </button>
              </div>

              {/* code */}

              <div
                className="
                  overflow-x-auto

                  p-6

                  sm:p-8
                "
              >
                <div
                  className="
                    mb-6

                    flex
                    items-center
                    gap-2

                    text-[10px]

                    uppercase

                    tracking-[0.16em]

                    text-white/25
                  "
                >
                  <Code2 className="size-3.5" />

                  Build with Miransas
                </div>

                <pre
                  className="
                    font-mono

                    text-[12px]

                    leading-7

                    text-white/55

                    sm:text-[13px]
                  "
                >
                  {CODE_LINES.map(
                    (line, index) => (
                      <div
                        key={index}
                        className="
                          flex

                          min-w-max
                        "
                      >
                        <span
                          className="
                            mr-5

                            select-none

                            text-white/10
                          "
                        >
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span>
                          {highlightCode(
                            line
                          )}
                        </span>
                      </div>
                    )
                  )}
                </pre>
              </div>

              {/* footer */}

              <div
                className="
                  grid

                  grid-cols-3

                  border-t
                  border-white/[0.07]
                "
              >
                {[
                  {
                    icon: Zap,
                    label: "Fast",
                  },
                  {
                    icon: Network,
                    label: "Connected",
                  },
                  {
                    icon: Radio,
                    label: "Realtime",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="
                        flex

                        items-center
                        justify-center

                        gap-2

                        border-r
                        border-white/[0.07]

                        py-4

                        last:border-r-0
                      "
                    >
                      <Icon
                        className="
                          size-3.5

                          text-white/25
                        "
                      />

                      <span
                        className="
                          text-[10px]

                          text-white/30
                        "
                      >
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          ARCHITECTURE
      ===================================================== */}

      <section
        id="architecture"
        className="
          relative
          z-10

          border-t
          border-white/[0.06]
        "
      >
        <div
          className="
            mx-auto

            max-w-7xl

            px-6

            py-24

            lg:px-8
            lg:py-32
          "
        >
          <div className="max-w-2xl">
            <p
              className="
                text-[10px]

                uppercase

                tracking-[0.22em]

                text-white/25
              "
            >
              Architecture
            </p>

            <h2
              className="
                mt-4

                text-3xl

                font-medium

                tracking-[-0.045em]

                text-white/90

                sm:text-4xl
                md:text-5xl
              "
            >
              From intelligence
              to interface.
            </h2>

            <p
              className="
                mt-4

                text-sm

                leading-7

                text-white/40
              "
            >
              The stack is designed as connected
              layers rather than isolated tools.
            </p>
          </div>

          {/* architecture flow */}

          <div
            className="
              relative

              mt-14

              grid

              gap-4

              md:grid-cols-2

              lg:grid-cols-4
            "
          >
            {ARCHITECTURE.map(
              (item, index) => {
                const Icon = item.icon;
                const accent =
                  getAccent(
                    item.accent
                  );

                return (
                  <div
                    key={item.number}
                    className="
                      relative
                    "
                  >
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
                      transition={{
                        duration: 0.55,
                        delay:
                          index * 0.08,
                      }}
                      className="
                        group

                        relative

                        min-h-[250px]

                        overflow-hidden

                        rounded-[28px]

                        border
                        border-white/[0.08]

                        bg-white/[0.016]

                        p-6

                        backdrop-blur-xl

                        transition

                        hover:border-white/[0.14]
                      "
                    >
                      <div
                        className={`
                          absolute

                          -right-12
                          -top-12

                          size-32

                          rounded-full

                          ${accent.glow}

                          blur-3xl
                        `}
                      />

                      <div
                        className="
                          relative

                          flex

                          items-center
                          justify-between
                        "
                      >
                        <div
                          className={`
                            flex

                            size-10

                            items-center
                            justify-center

                            rounded-xl

                            border

                            ${accent.icon}
                          `}
                        >
                          <Icon className="size-4.5" />
                        </div>

                        <span
                          className="
                            font-mono

                            text-[10px]

                            text-white/20
                          "
                        >
                          {item.number}
                        </span>
                      </div>

                      <div className="relative mt-10">
                        <h3
                          className="
                            text-lg

                            font-medium

                            tracking-[-0.025em]

                            text-white/85
                          "
                        >
                          {item.title}
                        </h3>

                        <div
                          className={`
                            mt-4

                            h-px
                            w-8

                            ${accent.line}

                            opacity-60
                          `}
                        />

                        <p
                          className="
                            mt-4

                            text-xs

                            leading-6

                            text-white/35
                          "
                        >
                          {item.description}
                        </p>
                      </div>
                    </motion.div>

                    {index <
                      ARCHITECTURE.length -
                      1 && (
                        <ArrowRight
                          className="
                          absolute

                          -right-3
                          top-1/2

                          z-20

                          hidden

                          size-4

                          -translate-y-1/2

                          text-white/15

                          lg:block
                        "
                        />
                      )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNOLOGY STACK
      ===================================================== */}

      <section className="relative z-10">
        <div
          className="
            mx-auto

            max-w-7xl

            px-6

            py-24

            lg:px-8
            lg:py-32
          "
        >
          <div className="max-w-2xl">
            <p
              className="
                text-[10px]

                uppercase

                tracking-[0.22em]

                text-white/25
              "
            >
              The stack
            </p>

            <h2
              className="
                mt-4

                text-3xl

                font-medium

                tracking-[-0.045em]

                text-white/90

                sm:text-4xl
              "
            >
              The tools behind the work.
            </h2>
          </div>

          <div
            className="
              mt-12

              grid

              gap-4

              sm:grid-cols-2

              lg:grid-cols-3
            "
          >
            {STACK.map(
              (item, index) => {
                const Icon = item.icon;

                /*
                 * AI uses the normal rose accent here.
                 */
                const accent =
                  getAccent(
                    item.accent as string
                  );

                return (
                  <motion.div
                    key={item.name}
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
                      margin: "-50px",
                    }}
                    transition={{
                      duration: 0.5,
                      delay:
                        index * 0.06,
                    }}
                    className="
                      group

                      relative

                      overflow-hidden

                      rounded-[26px]

                      border
                      border-white/[0.08]

                      bg-white/[0.016]

                      p-6

                      backdrop-blur-xl

                      transition

                      hover:border-white/[0.14]
                      hover:bg-white/[0.023]
                    "
                  >
                    <div
                      className={`
                        absolute

                        -right-12
                        -top-12

                        size-36

                        rounded-full

                        ${accent.glow}

                        blur-3xl

                        opacity-40

                        transition-opacity

                        group-hover:opacity-80
                      `}
                    />

                    <div
                      className={`
                        relative

                        flex
                        size-10

                        items-center
                        justify-center

                        rounded-xl

                        border

                        ${accent.icon}
                      `}
                    >
                      <Icon className="size-4.5" />
                    </div>

                    <div
                      className="
                        relative

                        mt-7
                      "
                    >
                      <div
                        className="
                          text-[9px]

                          uppercase

                          tracking-[0.18em]

                          text-white/25
                        "
                      >
                        {item.label}
                      </div>

                      <h3
                        className="
                          mt-2

                          text-xl

                          font-medium

                          tracking-[-0.03em]

                          text-white/90
                        "
                      >
                        {item.name}
                      </h3>

                      <p
                        className="
                          mt-3

                          text-xs

                          leading-6

                          text-white/35
                        "
                      >
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          DEVELOPER RESOURCES
      ===================================================== */}

      <section
        className="
          relative
          z-10

          border-t
          border-white/[0.06]
        "
      >
        <div
          className="
            mx-auto

            max-w-7xl

            px-6

            py-24

            lg:px-8
            lg:py-32
          "
        >
          <div
            className="
              grid

              gap-4

              md:grid-cols-3
            "
          >
            {/* GitHub */}

            <motion.a
              href="https://github.com/miransas"
              target="_blank"
              rel="noreferrer"
              whileHover={{
                y: -4,
              }}
              className="
                group

                relative

                overflow-hidden

                rounded-[28px]

                border
                border-white/[0.08]

                bg-white/[0.016]

                p-6

                transition-all

                hover:border-white/[0.14]
                hover:bg-white/[0.023]
              "
            >
              <FaGithub
                className="
                  size-5

                  text-white/55

                  transition

                  group-hover:text-white
                "
              />

              <h3
                className="
                  mt-8

                  text-base

                  font-medium

                  text-white/85
                "
              >
                GitHub
              </h3>

              <p
                className="
                  mt-2

                  text-xs

                  leading-6

                  text-white/35
                "
              >
                Repositories, experiments,
                infrastructure and projects.
              </p>

              <ArrowUpRight
                className="
                  absolute

                  bottom-6
                  right-6

                  size-4

                  text-white/15

                  transition

                  group-hover:text-white/60
                "
              />
            </motion.a>

            {/* X */}

            <motion.a
              href="https://x.com/miransaas"
              target="_blank"
              rel="noreferrer"
              whileHover={{
                y: -4,
              }}
              className="
                group

                relative

                overflow-hidden

                rounded-[28px]

                border
                border-white/[0.08]

                bg-white/[0.016]

                p-6

                transition-all

                hover:border-white/[0.14]
                hover:bg-white/[0.023]
              "
            >
              <span
                className="
                  text-lg

                  text-white/55

                  transition

                  group-hover:text-white
                "
              >
                𝕏
              </span>

              <h3
                className="
                  mt-8

                  text-base

                  font-medium

                  text-white/85
                "
              >
                X
              </h3>

              <p
                className="
                  mt-2

                  text-xs

                  leading-6

                  text-white/35
                "
              >
                Build logs, research notes,
                releases, and ideas.
              </p>

              <ArrowUpRight
                className="
                  absolute

                  bottom-6
                  right-6

                  size-4

                  text-white/15

                  transition

                  group-hover:text-white/60
                "
              />
            </motion.a>

            {/* Instagram */}

            <motion.a
              href="https://instagram.com/miransaas"
              target="_blank"
              rel="noreferrer"
              whileHover={{
                y: -4,
              }}
              className="
                group

                relative

                overflow-hidden

                rounded-[28px]

                border
                border-white/[0.08]

                bg-white/[0.016]

                p-6

                transition-all

                hover:border-white/[0.14]
                hover:bg-white/[0.023]
              "
            >
              <Globe2
                className="
                  size-5

                  text-white/55

                  transition

                  group-hover:text-white
                "
              />

              <h3
                className="
                  mt-8

                  text-base

                  font-medium

                  text-white/85
                "
              >
                Instagram
              </h3>

              <p
                className="
                  mt-2

                  text-xs

                  leading-6

                  text-white/35
                "
              >
                Product visuals, experiments,
                behind the scenes, and progress.
              </p>

              <ArrowUpRight
                className="
                  absolute

                  bottom-6
                  right-6

                  size-4

                  text-white/15

                  transition

                  group-hover:text-white/60
                "
              />
            </motion.a>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section
        className="
          relative
          z-10

          border-t
          border-white/[0.06]
        "
      >
        <div
          className="
            mx-auto

            max-w-4xl

            px-6

            py-28

            text-center

            md:py-36
          "
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
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div
              className="
                mx-auto

                flex
                size-12

                items-center
                justify-center

                rounded-2xl

                border
                border-white/10

                bg-white/[0.025]
              "
            >
              <MessageSquareCode
                className="
                  size-5

                  text-white/55
                "
              />
            </div>

            <p
              className="
                mt-7

                text-[10px]

                uppercase

                tracking-[0.22em]

                text-white/25
              "
            >
              For developers
            </p>

            <h2
              className="
                mt-4

                text-3xl

                font-medium

                tracking-[-0.045em]

                text-white/90

                sm:text-4xl

                md:text-5xl
              "
            >
              Build something
              worth shipping.
            </h2>

            <p
              className="
                mx-auto

                mt-4

                max-w-xl

                text-sm

                leading-7

                text-white/40
              "
            >
              Explore the code, follow the work,
              and see where Miransas is going next.
            </p>

            <div
              className="
                mt-8

                flex

                flex-wrap

                justify-center

                gap-3
              "
            >
              <a
                href="https://github.com/miransas"
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex

                  items-center
                  gap-2

                  rounded-full

                  bg-[#EFEFEF]

                  px-5
                  py-3

                  text-sm

                  font-medium

                  text-black

                  transition

                  hover:bg-white
                "
              >
                <FaGithub className="size-4" />
                Open GitHub

                <ExternalLink className="size-3.5" />
              </a>

              <a
                href="/contact"
                className="
                  inline-flex

                  items-center
                  gap-2

                  rounded-full

                  border
                  border-white/10

                  bg-white/[0.02]

                  px-5
                  py-3

                  text-sm

                  text-white/55

                  transition

                  hover:border-white/20
                  hover:text-white
                "
              >
                Talk to us

                <ArrowRight className="size-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   SIMPLE CODE HIGHLIGHTER
========================================================= */

function highlightCode(line: string) {
  if (!line) {
    return <span>&nbsp;</span>;
  }

  const parts = line.split(
    /(\bimport\b|\bconst\b|\bawait\b|"[^"]*"|'[^']*'|\bnew\b)/
  );

  return (
    <>
      {parts.map((part, index) => {
        const isKeyword =
          [
            "import",
            "const",
            "await",
            "new",
          ].includes(part);

        const isString =
          (part.startsWith('"') &&
            part.endsWith('"')) ||
          (part.startsWith("'") &&
            part.endsWith("'"));

        if (isKeyword) {
          return (
            <span
              key={index}
              className="text-purple-300"
            >
              {part}
            </span>
          );
        }

        if (isString) {
          return (
            <span
              key={index}
              className="text-rose-200"
            >
              {part}
            </span>
          );
        }

        return (
          <span key={index}>
            {part}
          </span>
        );
      })}
    </>
  );
}