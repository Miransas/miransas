"use client";

import {
  ArrowRight,
  Bot,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  Coffee,
  Globe2,
  Headphones,
  Lock,
  MessageCircle,
  Mic,
  MonitorSmartphone,
  Phone,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  Stethoscope,
  X,
} from "lucide-react";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useEffect, useState } from "react";

/* =========================================================
   AGENT USE CASES
========================================================= */

const USE_CASES = [
  {
    id: "mobile",
    label: "Mobile",
    title: "Your agent in your pocket.",
    description:
      "Voice and conversational AI designed to live inside mobile experiences.",
    icon: MonitorSmartphone,
    accent: "purple",
  },

  {
    id: "web",
    label: "Web",
    title: "Talk to your website.",
    description:
      "Turn a website visitor into a conversation instead of another static form.",
    icon: Globe2,
    accent: "rose",
  },

  {
    id: "business",
    label: "Business",
    title: "Your always-on receptionist.",
    description:
      "Answer questions, route requests, and handle repetitive conversations automatically.",
    icon: Building2,
    accent: "lime",
  },

  {
    id: "cafe",
    label: "Café",
    title: "Take the next order.",
    description:
      "Help customers with menus, opening hours, orders, and reservations.",
    icon: Coffee,
    accent: "rose",
  },

  {
    id: "clinic",
    label: "Clinic",
    title: "Make booking effortless.",
    description:
      "Guide patients through questions, availability, and appointment requests.",
    icon: Stethoscope,
    accent: "purple",
  },

  {
    id: "booking",
    label: "Booking",
    title: "Turn conversations into bookings.",
    description:
      "Let customers ask, decide, and reserve without leaving the conversation.",
    icon: CalendarDays,
    accent: "lime",
  },
];

/* =========================================================
   CAPABILITY LIST
========================================================= */

const CAPABILITIES = [
  "Voice conversations",
  "Web & mobile agents",
  "Bookings & reservations",
  "Business workflows",
  "Customer support",
  "Multilingual experiences",
];

/* =========================================================
   HELPERS
========================================================= */

function getAccent(accent: string) {
  switch (accent) {
    case "purple":
      return {
        icon:
          "border-purple-300/10 bg-purple-300/[0.07] text-purple-200",
        glow:
          "bg-purple-400/[0.08]",
        text:
          "text-purple-200",
        line:
          "bg-purple-300/50",
      };

    case "rose":
      return {
        icon:
          "border-rose-300/10 bg-rose-300/[0.07] text-rose-200",
        glow:
          "bg-rose-400/[0.08]",
        text:
          "text-rose-200",
        line:
          "bg-rose-300/50",
      };

    case "lime":
      return {
        icon:
          "border-lime-300/10 bg-lime-300/[0.07] text-lime-200",
        glow:
          "bg-lime-300/[0.07]",
        text:
          "text-lime-200",
        line:
          "bg-lime-300/50",
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
          "bg-white/30",
      };
  }
}

/* =========================================================
   FLOATING ORB
========================================================= */

function FloatingOrb({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: [0.96, 1.04, 0.96],
        y: [0, -8, 0],
      }}
      transition={{
        opacity: {
          duration: 0.8,
          delay,
        },
        scale: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className={`pointer-events-none absolute rounded-full blur-3xl ${className ?? ""}`}
    />
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function AgentPage() {
  const [activeUseCase, setActiveUseCase] =
    useState("mobile");

  const selectedUseCase =
    USE_CASES.find(
      (item) => item.id === activeUseCase
    ) ?? USE_CASES[0];

  /* -------------------------------------------------------
     Hero card mouse parallax
  ------------------------------------------------------- */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 120,
    damping: 18,
  });

  const springY = useSpring(mouseY, {
    stiffness: 120,
    damping: 18,
  });

  const rotateX = useTransform(
    springY,
    [-0.5, 0.5],
    [3, -3]
  );

  const rotateY = useTransform(
    springX,
    [-0.5, 0.5],
    [-4, 4]
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    mouseX.set(
      (event.clientX - rect.left) /
      rect.width -
      0.5
    );

    mouseY.set(
      (event.clientY - rect.top) /
      rect.height -
      0.5
    );
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    document.title = "Miransas Agents";
  }, []);

  const accent = getAccent(
    selectedUseCase.accent
  );

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#020203] text-white"
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <FloatingOrb
          delay={0.15}
          className="left-[-120px] top-[10%] size-[420px] bg-rose-400/[0.035]"
        />

        <FloatingOrb
          delay={0.3}
          className="right-[-120px] top-[12%] size-[480px] bg-purple-400/[0.045]"
        />

        <FloatingOrb
          delay={0.45}
          className="bottom-[-180px] left-1/2 size-[520px] -translate-x-1/2 bg-lime-300/[0.015]"
        />

        <div
          className="absolute inset-0 bg-[radial-gradient( ellipse_at_center, transparent_0%, rgba(0,0,0,0.10)_42%, rgba(0,0,0,0.50)_100% )]"
        />

        <div
          className="absolute inset-0 bg-[linear-gradient( to_bottom, rgba(255,255,255,0.015), transparent_25% )]"
        />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-28 sm:pb-28 sm:pt-36 lg:px-8 lg:pb-32 lg:pt-40"
      >
        <div
          className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24"
        >
          {/* =================================================
              LEFT
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
            {/* eyebrow */}

            <div
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/45 backdrop-blur-xl"
            >
              <Sparkles className="size-3.5 text-purple-200" />

              Miransas Agents

              <span
                className="rounded-full border border-lime-300/10 bg-lime-300/[0.05] px-2 py-0.5 text-[8px] tracking-[0.14em] text-lime-200/60"
              >
                SOON
              </span>
            </div>

            {/* title */}

            <h1
              className="mx-auto mt-7 max-w-2xl text-[44px] leading-[0.96] tracking-[-0.06em] text-[#fff3f0] sm:text-[58px] md:text-[70px] lg:text-[76px]"
            >
              Your AI,
              <br />

              <span
                className="bg-gradient-to-r from-[#EFEFEF] via-purple-200 to-rose-200 bg-clip-text text-transparent"
              >
                everywhere.
              </span>
            </h1>

            {/* subtitle */}

            <p
              className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/50 sm:text-base"
            >
              Build AI agents that can talk, answer,
              guide, book, and help — wherever your
              customers already are.
            </p>

            {/* use-case chips */}

            <div
              className="mt-7 flex flex-wrap gap-2"
            >
              {[
                "Mobile",
                "Web",
                "Café",
                "Clinic",
                "Booking",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/[0.08] bg-white/[0.018] px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] text-white/30"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* capability list */}

            <div
              className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {CAPABILITIES.map(
                (item, index) => (
                  <motion.div
                    key={item}
                    initial={{
                      opacity: 0,
                      x: -12,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay:
                        0.35 +
                        index * 0.05,
                      duration: 0.45,
                    }}
                    className="flex items-center gap-2 text-xs text-white/40"
                  >
                    <span
                      className="flex size-5 items-center justify-center rounded-full border border-lime-300/10 bg-lime-300/[0.04] text-lime-200/60"
                    >
                      <Check className="size-3" />
                    </span>

                    {item}
                  </motion.div>
                )
              )}
            </div>

            {/* CTA */}

            <div
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById("use-cases")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#EFEFEF] px-5 py-3 text-sm font-medium text-[#080808] transition hover:bg-white"
              >
                Explore use cases

                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </button>

              <span
                className="text-[10px] uppercase tracking-[0.18em] text-white/25"
              >
                Coming soon
              </span>
            </div>
          </motion.div>

          {/* =================================================
              RIGHT / AGENT DEMO
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.15,
              duration: 0.9,
              ease: "easeOut",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1200,
            }}
            className="relative mx-auto w-full max-w-[620px]"
          >
            {/* outer glow */}

            <div
              className="pointer-events-none absolute -inset-10 rounded-full bg-purple-400/[0.05] blur-[90px]"
            />

            {/* demo card */}

            <div
              className="relative overflow-hidden rounded-[34px] border border-white/[0.11] bg-[#070708]/75 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            >
              {/* top bar */}

              <div
                className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4"
              >
                <div
                  className="flex items-center gap-3"
                >
                  <div
                    className="flex size-9 items-center justify-center rounded-xl border border-purple-300/10 bg-purple-300/[0.06]"
                  >
                    <Bot
                      className="size-4 text-purple-200"
                    />
                  </div>

                  <div>
                    <p
                      className="text-xs font-medium text-white/80"
                    >
                      Miransas Agent
                    </p>

                    <p
                      className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-white/25"
                    >
                      Interactive preview
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-2 rounded-full border border-lime-300/10 bg-lime-300/[0.035] px-2.5 py-1"
                >
                  <span
                    className="size-1.5 rounded-full bg-lime-300 shadow-[0_0_10px_rgba(181,255,54,.8)]"
                  />

                  <span
                    className="text-[9px] text-lime-200/60"
                  >
                    Coming soon
                  </span>
                </div>
              </div>

              {/* voice area */}

              <div
                className="relative min-h-[430px] overflow-hidden px-6 py-7 sm:min-h-[470px] sm:px-8 sm:py-8"
              >
                {/* decorative rings */}

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute left-1/2 top-[47%] size-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/[0.07]"
                />

                <motion.div
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute left-1/2 top-[47%] size-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-rose-300/[0.06]"
                />

                {/* center */}

                <div
                  className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div
                    animate={{
                      scale: [
                        1,
                        1.05,
                        1,
                      ],
                      opacity: [
                        0.55,
                        0.8,
                        0.55,
                      ],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -inset-12 rounded-full bg-purple-400/[0.055] blur-3xl"
                  />

                  <div
                    className="relative flex size-24 items-center justify-center rounded-full border border-white/[0.11] bg-[#0b0b0c] shadow-[0_0_60px_rgba(190,140,255,0.08)]"
                  >
                    <Mic
                      className="size-8 text-white/65"
                    />
                  </div>
                </div>

                {/* top status */}

                <div
                  className="relative flex items-center justify-center gap-2"
                >
                  <span
                    className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white/30"
                  >
                    Voice agent
                  </span>
                </div>

                {/* conversation preview */}

                <div
                  className="absolute bottom-7 left-6 right-6 sm:left-8 sm:right-8"
                >
                  <div
                    className="grid gap-3"
                  >
                    <div
                      className="ml-auto max-w-[82%] rounded-[20px] rounded-br-md border border-white/[0.07] bg-white/[0.035] px-4 py-3"
                    >
                      <p
                        className="text-xs leading-5 text-white/55"
                      >
                        Can I book a table for
                        tomorrow evening?
                      </p>
                    </div>

                    <div
                      className="max-w-[86%] rounded-[20px] rounded-bl-md border border-purple-300/10 bg-purple-300/[0.035] px-4 py-3"
                    >
                      <p
                        className="text-xs leading-5 text-white/65"
                      >
                        Absolutely. I can help
                        find an available time
                        and take care of the
                        reservation.
                      </p>
                    </div>

                    <div
                      className="mt-1 flex items-center gap-2"
                    >
                      <button
                        type="button"
                        disabled
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-xs text-white/35 opacity-80"
                      >
                        <Lock className="size-3.5" />

                        Demo locked
                      </button>

                      <button
                        type="button"
                        disabled
                        className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.025] text-white/25"
                        aria-label="Send"
                      >
                        <Send className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* bottom bar */}

              <div
                className="grid grid-cols-3 border-t border-white/[0.07]"
              >
                {[
                  {
                    icon: Mic,
                    label: "Voice",
                  },
                  {
                    icon: MessageCircle,
                    label: "Chat",
                  },
                  {
                    icon: Phone,
                    label: "Calls",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-center gap-2 border-r border-white/[0.07] px-3 py-4 last:border-r-0"
                    >
                      <Icon
                        className="size-3.5 text-white/25"
                      />

                      <span
                        className="text-[10px] text-white/30"
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
          USE CASES
      ===================================================== */}

      <section
        id="use-cases"
        className="relative z-10 border-t border-white/[0.06] bg-black/[0.10]"
      >
        <div
          className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
        >
          {/* heading */}

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
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
            }}
            className="max-w-2xl"
          >
            <div
              className="mb-4 text-[10px] uppercase tracking-[0.22em] text-white/25"
            >
              One agent. Many places.
            </div>

            <h2
              className="text-3xl font-medium tracking-[-0.045em] text-white/90 sm:text-4xl md:text-5xl"
            >
              Wherever your
              customers are.
            </h2>

            <p
              className="mt-4 max-w-xl text-sm leading-7 text-white/40"
            >
              From a mobile app to a local café,
              the same intelligence can become a
              different experience for every context.
            </p>
          </motion.div>

          {/* layout */}

          <div
            className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
          >
            {/* category selector */}

            <div
              className="rounded-[30px] border border-white/[0.08] bg-white/[0.015] p-3 backdrop-blur-xl"
            >
              <div className="grid gap-1">
                {USE_CASES.map(
                  (item) => {
                    const Icon =
                      item.icon;

                    const active =
                      activeUseCase ===
                      item.id;

                    const itemAccent =
                      getAccent(
                        item.accent
                      );

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setActiveUseCase(
                            item.id
                          )
                        }
                        className={`
                          group

                          flex
                          w-full

                          items-center

                          gap-4

                          rounded-2xl

                          px-4
                          py-3.5

                          text-left

                          transition-all
                          duration-250

                          ${active
                            ? `
                                border
                                border-white/[0.08]
                                bg-white/[0.035]
                              `
                            : `
                                hover:bg-white/[0.02]
                              `
                          }
                        `}
                      >
                        <span
                          className={`flex size-9 shrink-0 items-center justify-center rounded-xl border ${active ? itemAccent.icon : "border-white/[0.07] bg-white/[0.018] text-white/25"}`}
                        >
                          <Icon
                            className="size-4"
                          />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span
                            className={`block text-xs font-medium ${active ? "text-white/85" : "text-white/40"}`}
                          >
                            {item.label}
                          </span>

                          <span
                            className="mt-0.5 block text-[10px] text-white/20"
                          >
                            {item.title}
                          </span>
                        </span>

                        <ChevronRight
                          className={`
                            size-4

                            shrink-0

                            transition-transform

                            ${active
                              ? `
                                  translate-x-0
                                  text-white/45
                                `
                              : `
                                  -translate-x-1
                                  text-white/10
                                `
                            }
                          `}
                        />
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* selected use case */}

            <motion.div
              key={selectedUseCase.id}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
              }}
              className="relative min-h-[430px] overflow-hidden rounded-[30px] border border-white/[0.09] bg-white/[0.018] p-7 backdrop-blur-xl sm:p-9"
            >
              {/* glow */}

              <div
                className={`pointer-events-none absolute -right-24 -top-24 size-64 rounded-full ${accent.glow} blur-[100px]`}
              />

              {/* top */}

              <div
                className="relative flex items-start justify-between gap-5"
              >
                <div
                  className={`flex size-11 items-center justify-center rounded-2xl border ${accent.icon}`}
                >
                  <selectedUseCase.icon className="size-5" />
                </div>

                <div
                  className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] text-white/25"
                >
                  Coming soon
                </div>
              </div>

              {/* title */}

              <div className="relative mt-14">
                <span
                  className="text-[10px] uppercase tracking-[0.2em] text-white/25"
                >
                  {selectedUseCase.label}
                </span>

                <h3
                  className="mt-3 max-w-xl text-3xl font-medium tracking-[-0.04em] text-white/90 sm:text-4xl"
                >
                  {selectedUseCase.title}
                </h3>

                <p
                  className="mt-4 max-w-lg text-sm leading-7 text-white/40"
                >
                  {selectedUseCase.description}
                </p>
              </div>

              {/* visual workflow */}

              <div
                className="relative mt-12 grid grid-cols-3 gap-3"
              >
                {[
                  {
                    label: "Customer",
                    icon: UserIcon,
                  },
                  {
                    label: "Agent",
                    icon: Bot,
                  },
                  {
                    label: "Action",
                    icon: Sparkles,
                  },
                ].map((step, index) => {
                  const StepIcon =
                    step.icon;

                  return (
                    <div
                      key={step.label}
                      className="relative rounded-[20px] border border-white/[0.07] bg-black/[0.18] p-4"
                    >
                      <div
                        className="flex size-8 items-center justify-center rounded-xl bg-white/[0.035] text-white/40"
                      >
                        <StepIcon className="size-4" />
                      </div>

                      <p
                        className="mt-4 text-[10px] uppercase tracking-[0.14em] text-white/30"
                      >
                        0{index + 1}
                      </p>

                      <p
                        className="mt-1 text-xs text-white/65"
                      >
                        {step.label}
                      </p>

                      {index <
                        2 && (
                          <ArrowRight
                            className="absolute -right-3 top-1/2 z-10 hidden size-4 -translate-y-1/2 text-white/20 sm:block"
                          />
                        )}
                    </div>
                  );
                })}
              </div>

              {/* locked badge */}

              <div
                className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/[0.32] px-3 py-1.5 backdrop-blur-xl"
              >
                <Lock
                  className="size-3 text-white/25"
                />

                <span
                  className="text-[9px] uppercase tracking-[0.14em] text-white/30"
                >
                  Demo locked
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section
        className="relative z-10 border-t border-white/[0.06]"
      >
        <div
          className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
        >
          <div
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: Mic,
                title: "Natural conversations",
                text:
                  "Voice-first interactions that feel closer to a real conversation than a form.",
                accent: "purple",
              },

              {
                icon: CalendarDays,
                title: "Actions, not just answers",
                text:
                  "Agents can be designed around bookings, requests, support, and business workflows.",
                accent: "lime",
              },

              {
                icon: Globe2,
                title: "Built for multilingual experiences",
                text:
                  "Create experiences that can reach customers across languages and channels.",
                accent: "rose",
              },

              {
                icon: Headphones,
                title: "Voice-native support",
                text:
                  "Handle repetitive conversations while keeping the experience personal.",
                accent: "purple",
              },

              {
                icon: Store,
                title: "Made for real businesses",
                text:
                  "Cafés, clinics, stores, services, teams, and any place customers need answers.",
                accent: "lime",
              },

              {
                icon: ShieldCheck,
                title: "Designed with control",
                text:
                  "Define what your agent can say, do, and hand off before it ever goes live.",
                accent: "rose",
              },
            ].map((item, index) => {
              const Icon =
                item.icon;

              const itemAccent =
                getAccent(
                  item.accent
                );

              return (
                <motion.div
                  key={item.title}
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
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  className="group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.016] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.13] hover:bg-white/[0.023]"
                >
                  <div
                    className={`absolute -right-16 -top-16 size-36 rounded-full ${itemAccent.glow} blur-3xl opacity-40 transition-opacity group-hover:opacity-70`}
                  />

                  <div
                    className={`relative flex size-10 items-center justify-center rounded-xl border ${itemAccent.icon}`}
                  >
                    <Icon className="size-4.5" />
                  </div>

                  <div
                    className={`relative mt-8 mb-3 h-px w-8 ${itemAccent.line} opacity-60 transition-all group-hover:w-12`}
                  />

                  <h3
                    className="relative text-sm font-medium text-white/85"
                  >
                    {item.title}
                  </h3>

                  <p
                    className="relative mt-2 text-xs leading-6 text-white/40"
                  >
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          COMING SOON CTA
      ===================================================== */}

      <section
        className="relative z-10 border-t border-white/[0.06]"
      >
        <div
          className="mx-auto max-w-5xl px-6 py-28 text-center lg:py-36"
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
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative"
          >
            {/* glow */}

            <div
              className="pointer-events-none absolute left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/[0.05] blur-[110px]"
            />

            <div
              className="relative mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.025]"
            >
              <Bot
                className="size-6 text-white/60"
              />
            </div>

            <div
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-lime-300/10 bg-lime-300/[0.035] px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-lime-200/55"
            >
              <span
                className="size-1.5 rounded-full bg-lime-300"
              />

              Coming soon
            </div>

            <h2
              className="mt-5 text-3xl font-medium tracking-[-0.045em] text-white/90 sm:text-4xl md:text-5xl"
            >
              The agent layer is coming.
            </h2>

            <p
              className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/40"
            >
              Voice, chat, actions, bookings and
              business workflows — all connected
              through one intelligent experience.
            </p>

            <div
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
            >
              {[
                "Voice",
                "Chat",
                "Actions",
                "Bookings",
                "Multilingual",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/[0.08] bg-white/[0.018] px-3 py-1.5 text-[10px] text-white/30"
                >
                  {item}
                </span>
              ))}
            </div>

            <div
              className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.018] px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-white/30"
            >
              <Lock className="size-3.5" />

              Product preview locked
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   SMALL ICON HELPER
========================================================= */

function UserIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
    >
      <circle cx="12" cy="8" r="3.5" />
      <path
        d="M5.5 20c.7-3.2 3-5 6.5-5s5.8 1.8 6.5 5"
        strokeLinecap="round"
      />
    </svg>
  );
}