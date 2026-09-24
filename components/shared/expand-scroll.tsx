"use client";

import React from "react";
import {
  Search,
  PenTool,
  Settings,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

import ScrollExpand from "../ScrollExpand";

/* =========================================================
   FEATURE DATA
========================================================= */

const featuresData = [
  {
    id: "01",
    title: "Discovery & Audit",
    description:
      "We analyze your business workflows, bottlenecks, and revenue opportunities.",
    icon: Search,
    preview: {
      header: "Workflow Audit",
      badge: "Completed",
      accent: "rose",
      items: [
        {
          label: "Bottlenecks",
          value: "Identified",
          tone: "neutral",
        },
        {
          label: "ROI Target",
          value: "3.4x",
          tone: "purple",
        },
        {
          label: "Data Audit",
          value: "Verified",
          tone: "lime",
        },
      ],
    },
  },

  {
    id: "02",
    title: "Automation Blueprint",
    description:
      "We design a detailed automation architecture aligned with your KPIs.",
    icon: PenTool,
    preview: {
      header: "Blueprint Spec",
      badge: "v2.4 Active",
      accent: "purple",
      items: [
        {
          label: "Architecture",
          value: "Event-driven",
          tone: "neutral",
        },
        {
          label: "Latency",
          value: "< 45ms",
          tone: "lime",
        },
        {
          label: "Triggers",
          value: "14 active",
          tone: "rose",
        },
      ],
    },
  },

  {
    id: "03",
    title: "Build & Integration",
    description:
      "Our engineers implement AI systems and integrate with existing tools.",
    icon: Settings,
    preview: {
      header: "API Connectors",
      badge: "Live Sync",
      accent: "lime",
      items: [
        {
          label: "REST / gRPC",
          value: "Connected",
          tone: "lime",
        },
        {
          label: "Auth Layer",
          value: "OAuth 2.0",
          tone: "neutral",
        },
        {
          label: "Webhooks",
          value: "99.99%",
          tone: "lime",
        },
      ],
    },
  },

  {
    id: "04",
    title: "Testing & Scaling",
    description:
      "Continuous testing, data validation, and real-time system refinement.",
    icon: RefreshCw,
    preview: {
      header: "System Health",
      badge: "Optimal",
      accent: "rose",
      items: [
        {
          label: "Stress Test",
          value: "Passed",
          tone: "lime",
        },
        {
          label: "Failover",
          value: "Auto-scale",
          tone: "neutral",
        },
        {
          label: "Uptime SLA",
          value: "99.9%",
          tone: "purple",
        },
      ],
    },
  },
];

/* =========================================================
   TRUST BADGES
========================================================= */

const badges = [
  {
    label: "SOC 2 Type II",
    icon: ShieldCheck,
  },
  {
    label: "GDPR ready",
    icon: CheckCircle2,
  },
  {
    label: "ISO 27001",
    icon: Zap,
  },
  {
    label: "High Availability",
    icon: Globe,
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getTone(tone: string) {
  switch (tone) {
    case "lime":
      return "text-lime-300";

    case "purple":
      return "text-purple-300";

    case "rose":
      return "text-rose-300";

    default:
      return "text-white/70";
  }
}

function getAccent(accent: string) {
  switch (accent) {
    case "purple":
      return {
        icon:
          "bg-purple-300/10 text-purple-200 border-purple-300/10",
        glow:
          "bg-purple-400/10",
        line:
          "bg-purple-300/50",
      };

    case "lime":
      return {
        icon:
          "bg-lime-300/10 text-lime-200 border-lime-300/10",
        glow:
          "bg-lime-300/10",
        line:
          "bg-lime-300/50",
      };

    default:
      return {
        icon:
          "bg-rose-300/10 text-rose-200 border-rose-300/10",
        glow:
          "bg-rose-300/10",
        line:
          "bg-rose-300/50",
      };
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function ExpandScroll() {
  return (
    <main
      className="relative min-h-screen bg-[#020203] text-white"
    >
      {/* =====================================================
          SCROLL EXPAND
      ===================================================== */}

      <ScrollExpand
        src="https://res.cloudinary.com/dwdk20m6q/image/upload/v1790186440/PhotoshopExtension_Image_2_hpiyxq.png"
        alt="Miransas — independent software studio"
        scrollHint="Scroll to see what's live"
        title="Independent by design"
        useWindowScroll
      >
        <div
          className="relative min-h-[125vh] w-full overflow-hidden px-5 py-24 sm:px-6 sm:py-28 md:py-32 lg:px-8 lg:py-36"
        >

          {/* =================================================
              CONTENT WRAPPER
          ================================================= */}

          <div
            className="relative z-10 mx-auto w-full max-w-7xl"
          >


            {/* =================================================
                FEATURE GRID
            ================================================= */}

            <div
              className="relative mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-4"
            >
              {featuresData.map((item, index) => {
                const MainIcon = item.icon;
                const accent = getAccent(
                  item.preview.accent
                );

                return (
                  <motion.article
                    key={item.id}
                    initial={{
                      opacity: 0,
                      y: 32,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      margin: "-80px",
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    className="group relative flex min-h-[410px] flex-col justify-between overflow-hidden rounded-[30px] border border-white/[0.11] bg-[#080809]/55 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.30)] backdrop-blur-2xl transition-all duration-300 hover:border-white/[0.18] hover:bg-[#080809]/65"
                  >


                    <div
                      className={`
                        pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full ${accent.glow} opacity-50 blur-[70px] transition-opacity duration-500 group-hover:opacity-80`}
                    />
                    <span
                      className="absolute right-5 top-4 text-[9px] tracking-[0.2em] text-white/20"
                    >
                      {item.id}
                    </span>


                    <div
                      className="relative rounded-[22px] border border-white/[0.09] bg-[#050506]/60 p-4 backdrop-blur-2xl"
                    >
                      {/* widget header */}

                      <div
                        className="mb-4 flex items-center justify-between border-b border-white/[0.07] pb-3"
                      >
                        <div
                          className="flex items-center gap-2.5"
                        >
                          <div
                            className={`
                              flex h-7 w-7 items-center justify-center rounded-xl border
                              ${accent.icon}
                            `}
                          >
                            <MainIcon size={14} />
                          </div>

                          <span
                            className="text-xs font-medium text-white/75"
                          >
                            {item.preview.header}
                          </span>
                        </div>

                        <span
                          className="rounded-full border border-white/[0.09] bg-white/[0.035] px-2 py-1 text-[9px] font-medium text-white/45"
                        >
                          {item.preview.badge}
                        </span>
                      </div>

                      {/* widget values */}

                      <div className="space-y-3">
                        {item.preview.items.map(
                          (row, rowIndex) => (
                            <div
                              key={rowIndex}
                              className="flex items-center justify-between gap-3"
                            >
                              <span
                                className="text-[11px] text-white/30"
                              >
                                {row.label}
                              </span>

                              <span
                                className={`
                                  text-[11px]

                                  font-medium

                                  ${getTone(row.tone)}
                                `}
                              >
                                {row.value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div
                      className="relative mt-8 px-1"
                    >
                      {/* accent line */}

                      <div
                        className={`
                          mb-4 h-pxw-10 ${accent.line} opacity-50 transition-all duration-300 group-hover:w-16
                        `}
                      />

                      <h3
                        className="text-base font-medium tracking-[-0.02em] text-white/90"
                      >
                        {item.title}
                      </h3>

                      <p
                        className="mt-2 text-xs leading-6 text-white/45"
                      >
                        {item.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
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
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
              }}
              className="mx-auto mt-12 max-w-4xl"
            >
              <div
                className="flex flex-col gap-5 rounded-[24px] border border-white/[0.08] bg-black/[0.22] px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span
                    className="text-[9px] uppercase tracking-[0.22em] text-white/25"
                  >
                    System state
                  </span>

                  <p
                    className="mt-1 text-sm text-white/65"
                  >
                    All systems operational
                  </p>
                </div>

                <div
                  className="flex items-center gap-3"
                >
                  <span
                    className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_12px_rgba(181,255,54,0.65)]"
                  />

                  <span
                    className="text-[11px] text-white/35"
                  >
                    Miransas infrastructure
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="h-[38vh]" />
          </div>
        </div>
      </ScrollExpand>
    </main>
  );
}