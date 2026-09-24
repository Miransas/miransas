"use client";

import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  FileText,
  Headphones,
  MessageCircle,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const topics = [
  {
    title: "Getting started",
    description:
      "Set up your workspace, voices, and first synthesis flow.",
    icon: Sparkles,
    accent: "rose",
  },
  {
    title: "Voice cloning",
    description:
      "Learn how to create, manage, and refine custom voices.",
    icon: Headphones,
    accent: "purple",
  },
  {
    title: "API & integrations",
    description:
      "Connect Miransas to your applications and existing workflows.",
    icon: Server,
    accent: "lime",
  },
  {
    title: "Account & billing",
    description:
      "Manage plans, billing details, usage, and workspace settings.",
    icon: ShieldCheck,
    accent: "neutral",
  },
];

const quickLinks = [
  {
    title: "Documentation",
    description:
      "Guides, references, and implementation details.",
    icon: BookOpen,
  },
  {
    title: "API Reference",
    description:
      "Endpoints, authentication, requests, and responses.",
    icon: FileText,
  },
  {
    title: "System status",
    description:
      "Check current service availability and incidents.",
    icon: CheckCircle2,
  },
];

const faqs = [
  {
    question: "How do I get started with Miransas?",
    answer:
      "Create your workspace, choose a voice workflow, and follow the onboarding steps to create your first synthesis.",
  },
  {
    question: "Can I use my own voice?",
    answer:
      "Yes. Custom voice workflows can be configured through the voice section of your workspace.",
  },
  {
    question: "Where can I find API credentials?",
    answer:
      "API credentials are managed inside your workspace settings under the developer and API section.",
  },
  {
    question: "How can I contact the support team?",
    answer:
      "You can reach the team through the contact form or support channel provided in your workspace.",
  },
];

function getAccent(accent: string) {
  switch (accent) {
    case "rose":
      return {
        icon:
          "border-rose-300/10 bg-rose-300/10 text-rose-200",
        glow: "bg-rose-400/10",
        line: "bg-rose-300/50",
      };

    case "purple":
      return {
        icon:
          "border-purple-300/10 bg-purple-300/10 text-purple-200",
        glow: "bg-purple-400/10",
        line: "bg-purple-300/50",
      };

    case "lime":
      return {
        icon:
          "border-lime-300/10 bg-lime-300/10 text-lime-200",
        glow: "bg-lime-300/10",
        line: "bg-lime-300/50",
      };

    default:
      return {
        icon:
          "border-white/10 bg-white/5 text-white/70",
        glow: "bg-white/5",
        line: "bg-white/30",
      };
  }
}

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="relative min-h-screen overflow-hidden mx-auto max-w-6xl bg-[#020203] text-white">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[-120px] top-[10%] h-[420px] w-[420px] rounded-full bg-rose-400/[0.045] blur-[130px]"
        />

        <div
          className="absolute right-[-140px] top-[18%] h-[460px] w-[460px] rounded-full bg-purple-400/[0.05] blur-[140px]"
        />

        <div
          className="absolute left-1/2 top-[55%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-lime-300/[0.012] blur-[150px]"
        />

        <div
          className="absolute inset-0 bg-[radial-gradient( circle_at_center, transparent_0%, rgba(0,0,0,0.12)_55%, rgba(0,0,0,0.4)_100% )]"
        />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:pb-28 md:pt-36">
          <motion.div
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
            className="mx-auto max-w-3xl text-center"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/45 backdrop-blur-xl"
            >
              <CircleHelp size={12} />
              Miransas Support
            </span>

            <h1
              className="mt-7 text-[42px] leading-[1] tracking-[-0.055em] text-[#fff3f0] sm:text-[54px] md:text-[68px]"
            >
              Need a hand?
            </h1>

            <p
              className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/50 sm:text-base"
            >
              Find documentation, explore common questions,
              or reach out to the Miransas support team.
            </p>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.15,
              duration: 0.75,
              ease: "easeOut",
            }}
            className="mx-auto mt-10 max-w-2xl"
          >
            <div
              className="group relative overflow-hidden rounded-[24px] border border-white/[0.11] bg-black/[0.35] shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-400/[0.06] blur-3xl transition-opacity group-focus-within:opacity-100"
              />

              <div className="relative flex items-center px-5">
                <Search
                  size={19}
                  className="shrink-0 text-white/30"
                />

                <input
                  type="text"
                  placeholder="Search documentation, guides, and answers..."
                  className="w-full bg-transparent px-4 py-5 text-sm text-white outline-none placeholder:text-white/25"
                />

                <kbd
                  className="hidden rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] text-white/30 sm:block"
                >
                  ⌘ K
                </kbd>
              </div>
            </div>
          </motion.div>
          <div
            className="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-2"
          >
            {[
              "Voice cloning",
              "API",
              "Billing",
              "Getting started",
            ].map((item, index) => (
              <motion.button
                key={item}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.28 + index * 0.06,
                }}
                type="button"
                className="rounded-full border border-white/8 bg-white/[0.025] px-3 py-1.5 text-[11px] text-white/40 transition hover:border-white/15 hover:bg-white/[0.05] hover:text-white/70"
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TOPICS
      ===================================================== */}

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.22em] text-white/30"
              >
                Popular topics
              </p>

              <h2
                className="mt-3 text-2xl font-medium tracking-[-0.035em] text-white/90 sm:text-3xl"
              >
                Start where it matters.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              const accent = getAccent(topic.accent);

              return (
                <motion.a
                  key={topic.title}
                  href="#"
                  initial={{
                    opacity: 0,
                    y: 28,
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
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="group relative overflow-hidden min-h-[255px] rounded-[28px] border border-white/[0.09] bg-white/[0.018] p-5 backdrop-blur-xl transition-colors hover:border-white/[0.15] hover:bg-white/[0.028]"
                >
                  <div
                    className={`absolute -right-16 -top-16 h-36 w-36 rounded-full ${accent.glow} blur-3xl`}
                  />

                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-2xl border ${accent.icon}`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="relative mt-10">
                    <div
                      className={`mb-3 h-px w-8 ${accent.line} opacity-60 transition-all duration-300 group-hover:w-12`}
                    />

                    <h3
                      className="text-base font-medium tracking-[-0.02em] text-white/90"
                    >
                      {topic.title}
                    </h3>

                    <p
                      className="mt-2 text-xs leading-6 text-white/40"
                    >
                      {topic.description}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="absolute bottom-5 right-5 text-white/20 transition group-hover:text-white/65"
                  />
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK LINKS
      ===================================================== */}

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div
            className="grid grid-cols-1 overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.018] md:grid-cols-3"
          >
            {quickLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={item.title}
                  href="#"
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
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className={`group relative p-6 transition hover:bg-white/[0.025] ${ index !== 2 ? "border-b border-white/[0.08] md:border-b-0 md:border-r" : "" }`}
                >
                  <div
                    className="flex items-center justify-between"
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-white/55"
                    >
                      <Icon size={16} />
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="text-white/20 transition group-hover:text-white/70"
                    />
                  </div>

                  <h3
                    className="mt-8 text-sm font-medium text-white/85"
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mt-2 text-xs leading-6 text-white/40"
                  >
                    {item.description}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="relative z-10">
        <div className="mx-auto max-w-4xl px-6 py-24">
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
            }}
            transition={{
              duration: 0.65,
            }}
          >
            <p
              className="text-center text-[10px] uppercase tracking-[0.22em] text-white/30"
            >
              Frequently asked
            </p>

            <h2
              className="mt-4 text-center text-2xl font-medium tracking-[-0.035em] text-white/90 sm:text-3xl"
            >
              Common questions.
            </h2>
          </motion.div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <motion.div
                  key={faq.question}
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
                    margin: "-40px",
                  }}
                  transition={{
                    delay: index * 0.06,
                    duration: 0.5,
                  }}
                  className="overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.018] backdrop-blur-xl"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(
                        isOpen ? null : index
                      )
                    }
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left"
                  >
                    <span
                      className="text-sm font-medium text-white/80"
                    >
                      {faq.question}
                    </span>

                    <motion.span
                      animate={{
                        rotate: isOpen ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="shrink-0 text-white/35"
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
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
                      >
                        <div
                          className="border-t border-white/[0.06] px-5 pb-5 pt-4"
                        >
                          <p
                            className="max-w-3xl text-sm leading-7 text-white/40"
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      <section className="relative z-10">
        <div className="mx-auto max-w-5xl px-6 pb-28 pt-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative overflow-hidden rounded-[32px] border border-white/[0.10] bg-white/[0.018] p-8 text-center backdrop-blur-2xl sm:p-12"
          >
            <div
              className="pointer-events-none absolute left-1/2 top-[-120px] h-[260px] w-[420px] -translate-x-1/2 rounded-full bg-purple-400/[0.07] blur-[100px]"
            />

            <div className="relative">
              <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70"
              >
                <MessageCircle size={20} />
              </div>

              <h2
                className="mt-6 text-2xl font-medium tracking-[-0.035em] text-white/90 sm:text-3xl"
              >
                Still need help?
              </h2>

              <p
                className="mx-auto mt-3 max-w-lg text-sm leading-7 text-white/40"
              >
                Tell us what you're building and what
                you're running into. We'll take it from there.
              </p>

              <div className="mt-7">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#EFEFEF] px-5 py-2.5 text-sm font-medium text-[#080808] shadow-[0_0_30px_rgba(239,239,239,0.08)] transition hover:bg-white"
                >
                  Contact support
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FOOTER FADE
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/30 to-transparent"
      />
    </main>
  );
}