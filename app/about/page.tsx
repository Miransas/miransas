"use client";

import {
  ArrowUpRight,
  BrainCircuit,
  Cpu,
  Globe2,
  HeartHandshake,
  Layers3,
  Sparkles,
  Target,
  Users,
  Waypoints,
} from "lucide-react";

import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";

import {
  useRef,
  type ComponentType,
} from "react";
import RobotEyes from "../../components/shared/RobotEyes";



/* =========================================================
   TYPES
========================================================= */

type IconComponent = ComponentType<{
  className?: string;
}>;

type AboutBlock = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: IconComponent;
  accent:
    | "rose"
    | "purple"
    | "lime"
    | "neutral";
};

/* =========================================================
   CONTENT
   Metinleri sonradan rahatça değiştir.
========================================================= */

const ABOUT_BLOCKS: AboutBlock[] = [
  {
    number: "01",
    eyebrow: "Who we are",
    title: "A small team building useful intelligence.",
    description:
      "Miransas is an independent technology studio focused on voice, conversational AI, and intelligent software experiences.",
    icon: Users,
    accent: "rose",
  },

  {
    number: "02",
    eyebrow: "What we build",
    title: "Interfaces that can listen, understand, and act.",
    description:
      "We build systems where AI is not just a chat box, but a useful layer inside products, services, and everyday workflows.",
    icon: BrainCircuit,
    accent: "purple",
  },

  {
    number: "03",
    eyebrow: "How we think",
    title: "Technology should feel natural.",
    description:
      "The best AI experiences disappear into the product. We care about clarity, responsiveness, good interaction design, and technology that feels human.",
    icon: HeartHandshake,
    accent: "lime",
  },

  {
    number: "04",
    eyebrow: "Where we're going",
    title: "From voice models to intelligent agents.",
    description:
      "Our long-term direction is to connect voice, language, automation, and action into experiences people can actually use.",
    icon: Target,
    accent: "neutral",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getAccent(
  accent: AboutBlock["accent"]
) {
  switch (accent) {
    case "rose":
      return {
        icon:
          "border-rose-300/10 bg-rose-300/[0.06] text-rose-200",
        glow:
          "bg-rose-400/[0.05]",
        line:
          "bg-rose-300/60",
      };

    case "purple":
      return {
        icon:
          "border-purple-300/10 bg-purple-300/[0.06] text-purple-200",
        glow:
          "bg-purple-400/[0.05]",
        line:
          "bg-purple-300/60",
      };

    case "lime":
      return {
        icon:
          "border-lime-300/10 bg-lime-300/[0.06] text-lime-200",
        glow:
          "bg-lime-300/[0.04]",
        line:
          "bg-lime-300/60",
      };

    default:
      return {
        icon:
          "border-white/10 bg-white/[0.035] text-white/60",
        glow:
          "bg-white/[0.025]",
        line:
          "bg-white/30",
      };
  }
}

/* =========================================================
   ABOUT PAGE
========================================================= */

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const robotY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -70]
  );

  const robotScale = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 0.94]
  );

  const centerGlowOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.5],
      [1, 0.55]
    );

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#020203] text-white"
    >
      {/* =====================================================
          GLOBAL ATMOSPHERE
      ===================================================== */}

      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute left-[-140px] top-[8%] h-[420px] w-[420px] rounded-full bg-rose-400/[0.03] blur-[140px]"
        />

        <div
          className="absolute right-[-160px] top-[18%] h-[480px] w-[480px] rounded-full bg-purple-400/[0.04] blur-[150px]"
        />

        <div
          className="absolute left-1/2 top-[42%] h-[550px] w-[750px] -translate-x-1/2 rounded-full bg-lime-300/[0.012] blur-[160px]"
        />

        <div
          className="absolute inset-0 bg-[radial-gradient( circle_at_center, transparent_0%, rgba(0,0,0,0.08)_48%, rgba(0,0,0,0.48)_100% )]"
        />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        ref={heroRef}
        className="relative z-10 min-h-[105vh] overflow-hidden"
      >
        <div
          className="mx-auto flex min-h-[105vh] max-w-7xl flex-col px-6 pb-20 pt-28 lg:px-8 lg:pt-36"
        >
          {/* -----------------------------------------------
              TOP LABEL
          ------------------------------------------------ */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/40 backdrop-blur-xl"
          >
            <Sparkles className="size-3.5 text-purple-200" />

            About Miransas
          </motion.div>

          {/* -----------------------------------------------
              TITLE
          ------------------------------------------------ */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.08,
              duration: 0.75,
            }}
            className="relative z-10 mx-auto mt-7 max-w-3xl text-center"
          >
            <h1
              className="text-[44px] leading-[0.98] tracking-[-0.06em] text-[#fff3f0] sm:text-[58px] md:text-[70px] lg:text-[78px]"
            >
              We build technology
              <br />

              <span
                className="bg-gradient-to-r from-[#EFEFEF] via-purple-200 to-rose-200 bg-clip-text text-transparent"
              >
                that feels alive.
              </span>
            </h1>

            <p
              className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base"
            >
              Miransas is an independent software studio
              exploring what happens when artificial
              intelligence becomes a natural part of
              everyday products and services.
            </p>
          </motion.div>

          {/* -----------------------------------------------
              ROBOT
          ------------------------------------------------ */}

          <motion.div
            style={{
              y: robotY,
              scale: robotScale,
            }}
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.9,
              ease: "easeOut",
            }}
            className="relative mx-auto mt-8 flex flex-1 items-end justify-center lg:mt-0"
          >
            {/* central glow */}

            <motion.div
              style={{
                opacity:
                  centerGlowOpacity,
              }}
              className="pointer-events-none absolute bottom-[8%] left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-purple-400/[0.05] blur-[110px]"
            />

            <div
              className="relative z-10 h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] md:h-[590px] md:w-[590px]"
            >
              <RobotEyes />
            </div>
          </motion.div>

          {/* -----------------------------------------------
              SCROLL LINE
          ------------------------------------------------ */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
              duration: 0.7,
            }}
            className="mx-auto mt-2 flex flex-col items-center gap-2"
          >
            <span
              className="text-[9px] uppercase tracking-[0.24em] text-white/20"
            >
              Scroll to explore
            </span>

            <span
              className="h-8 w-px bg-gradient-to-b from-white/25 to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section
        className="relative z-10 border-t border-white/[0.06]"
      >
        <div
          className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-[0.7fr_1.3fr] md:items-start lg:px-8 lg:py-32"
        >
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.22em] text-white/25"
            >
              The idea
            </span>

            <h2
              className="mt-4 max-w-sm text-3xl font-medium tracking-[-0.04em] text-white/90 sm:text-4xl"
            >
              AI should become
              useful before it
              becomes impressive.
            </h2>
          </motion.div>

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
              amount: 0.25,
            }}
            transition={{
              delay: 0.08,
            }}
            className="max-w-2xl space-y-5 text-sm leading-7 text-white/45 sm:text-base"
          >
            <p>
              Miransas explores voice, language,
              automation, and agent-based software
              with one simple goal: build systems
              people can actually use.
            </p>

            <p>
              We care about the experience around the
              model as much as the model itself. A
              powerful system should still feel clear,
              fast, approachable, and intentional.
            </p>

            <p>
              Our work moves between research and
              product — from voice models and
              multilingual speech to the interfaces
              that turn those capabilities into useful
              experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          WHAT / WHO / HOW
      ===================================================== */}

      <section
        className="relative z-10"
      >
        <div
          className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20"
        >
          <div
            className="grid gap-4 md:grid-cols-2"
          >
            {ABOUT_BLOCKS.map(
              (block, index) => {
                const Icon = block.icon;

                const accent =
                  getAccent(
                    block.accent
                  );

                return (
                  <motion.article
                    key={block.number}
                    initial={{
                      opacity: 0,
                      y: 30,
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
                      duration: 0.6,
                      delay:
                        index * 0.07,
                    }}
                    className="group relative min-h-[330px] overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.016] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.023] sm:p-7"
                  >
                    {/* glow */}

                    <div
                      className={`pointer-events-none absolute -right-20 -top-20 size-48 rounded-full ${accent.glow} blur-[80px] opacity-50 transition-opacity group-hover:opacity-100`}
                    />

                    {/* top */}

                    <div
                      className="relative flex items-center justify-between"
                    >
                      <div
                        className={`flex size-11 items-center justify-center rounded-2xl border ${accent.icon}`}
                      >
                        <Icon className="size-5" />
                      </div>

                      <span
                        className="text-[10px] font-mono tracking-[0.15em] text-white/20"
                      >
                        {block.number}
                      </span>
                    </div>

                    {/* content */}

                    <div
                      className="relative mt-14"
                    >
                      <span
                        className="text-[9px] uppercase tracking-[0.2em] text-white/25"
                      >
                        {block.eyebrow}
                      </span>

                      <h3
                        className="mt-3 max-w-md text-2xl font-medium leading-tight tracking-[-0.035em] text-white/90"
                      >
                        {block.title}
                      </h3>

                      <div
                        className={`mt-5 h-px w-8 ${accent.line} opacity-60 transition-all group-hover:w-14`}
                      />

                      <p
                        className="mt-4 max-w-lg text-sm leading-7 text-white/40"
                      >
                        {block.description}
                      </p>
                    </div>

                    {/* corner arrow */}

                    <ArrowUpRight
                      className="absolute bottom-6 right-6 size-4 text-white/15 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/55"
                    />
                  </motion.article>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUES STRIP
      ===================================================== */}

      <section
        className="relative z-10 border-y border-white/[0.06]"
      >
        <div
          className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              icon: Sparkles,
              label: "Curious",
              text: "We explore what is possible.",
              accent: "purple" as const,
            },
            {
              icon: Target,
              label: "Intentional",
              text: "We build with a reason.",
              accent: "rose" as const,
            },
            {
              icon: Waypoints,
              label: "Practical",
              text: "Useful beats impressive.",
              accent: "lime" as const,
            },
            {
              icon: Globe2,
              label: "Open",
              text: "Built for a global audience.",
              accent: "neutral" as const,
            },
          ].map((item, index) => {
            const Icon = item.icon;
            const accent =
              getAccent(
                item.accent
              );

            return (
              <motion.div
                key={item.label}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.06,
                }}
                className="border-white/[0.06] p-6 sm:border-b sm:last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <div
                  className={`flex size-8 items-center justify-center rounded-xl border ${accent.icon}`}
                >
                  <Icon className="size-4" />
                </div>

                <h3
                  className="mt-5 text-sm font-medium text-white/80"
                >
                  {item.label}
                </h3>

                <p
                  className="mt-1 text-xs leading-6 text-white/30"
                >
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          FINAL STATEMENT
      ===================================================== */}

      <section
        className="relative z-10 overflow-hidden"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/[0.035] blur-[120px]"
        />

        <div
          className="mx-auto max-w-4xl px-6 py-28 text-center md:py-36"
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
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div
              className="mx-auto flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.025]"
            >
              <Cpu className="size-5 text-white/50" />
            </div>

            <p
              className="mt-7 text-[10px] uppercase tracking-[0.22em] text-white/25"
            >
              The next chapter
            </p>

            <h2
              className="mx-auto mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] text-white/90 sm:text-4xl md:text-5xl"
            >
              We're still early.
              <br />
              That's the interesting part.
            </h2>

            <p
              className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/40"
            >
              More voices, more languages, smarter agents,
              and more useful ways to interact with software
              are already on the way.
            </p>

            <div
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-[10px] uppercase tracking-[0.17em] text-white/30"
            >
              <span
                className="size-1.5 rounded-full bg-lime-300 shadow-[0_0_10px_rgba(181,255,54,.7)]"
              />

              Building in public
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}