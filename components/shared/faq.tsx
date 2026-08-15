"use client";

import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    id: "01",
    question: "What exactly does Miransas build?",
    answer:
      "High-performance software systems: indie games (Project Sad), secure infrastructure (Binboi), and algorithmic engines (Rust Chess Engine). Every project is built with obsessive attention to performance and long-term maintainability.",
  },
  {
    id: "02",
    question: "Do I need technical knowledge to work with you?",
    answer:
      "Not at all. Whether you're a technical founder or a business owner, we translate your vision into working systems. No jargon, no unnecessary complexity — just clear communication and shipped code.",
  },
  {
    id: "03",
    question: "Can you integrate with our existing stack?",
    answer:
      "Absolutely. We specialize in seamless integrations using modern APIs, webhooks, gRPC, and custom protocols. Go, Rust, Next.js — we speak your stack's language fluently.",
  },
  {
    id: "04",
    question: "How does the engagement process work?",
    answer:
      "1. Discovery: We understand your problem deeply. 2. Design: Wireframes and architecture. 3. Build: Iterative development with weekly demos. 4. Ship: Production deployment with monitoring. No surprises, no scope creep.",
  },
  {
    id: "05",
    question: "Do you provide ongoing support?",
    answer:
      "Yes. We don't abandon ship after launch. All plans include a support window, and we offer retainer agreements for continuous improvement, security patches, and feature development as your product scales.",
  },
  {
    id: "06",
    question: "Are you really a solo studio?",
    answer:
      "Yes. Miransas is intentionally a one-person operation. This means direct communication with the engineer building your project, no handoffs, no account managers, and no bureaucracy. Just craft.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-[#030303] px-6 py-32 text-white lg:px-8">
      {/* Ambient Glows - Harmonized Amber & Neutral Warmth */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-amber-500/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-80 w-80 rounded-full bg-amber-500/[0.03] blur-[120px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        
        {/* Left Column */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-300 backdrop-blur-xl">
              <Sparkles className="size-4 text-amber-400" />
              Common questions
            </div>

            <h2 className="text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
              Questions?
              <br />
              <span className="bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutral-700 bg-clip-text text-transparent">
                We've got answers.
              </span>
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-neutral-400">
              Can't find what you're looking for? Reach out directly —
              you'll talk to the engineer, not a support bot.
            </p>
          </div>

          {/* CTA Card with Amber Glow */}
          <div className="group relative mt-12 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-8 backdrop-blur-xl transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:bg-amber-500/20" />

            <div className="relative z-10">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <HelpCircle className="size-5" />
              </div>

              <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Ready to build something that lasts?
              </h3>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400 sm:text-base">
                No sales calls, no demos, no enterprise contracts. Pick a
                direction, describe your project, and let's build.
              </p>

              <a
                href="/contact"
                className="group/button mt-8 inline-flex items-center gap-3 rounded-2xl bg-amber-400 px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] group-hover/button:scale-[1.02]"
              >
                <MessageSquare className="size-4" />
                Start a project
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column — FAQ Accordion */}
        <div className="flex flex-col justify-center">
          <div className="divide-y divide-white/10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
            {faqs.map((item, index) => {
              const isOpen = open === index;

              return (
                <div
                  key={item.question}
                  className={`transition-colors duration-300 ${
                    isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="group flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition-all duration-300 sm:px-8"
                  >
                    <div className="flex items-center gap-4">
                      {/* Numbering Indicator */}
                      <span className={`font-mono text-xs font-semibold transition-colors duration-300 ${
                        isOpen ? "text-amber-400" : "text-neutral-600 group-hover:text-neutral-400"
                      }`}>
                        {item.id}
                      </span>
                      <span
                        className={`text-base font-medium transition-colors duration-300 sm:text-lg ${
                          isOpen
                            ? "text-white"
                            : "text-neutral-300 group-hover:text-white"
                        }`}
                      >
                        {item.question}
                      </span>
                    </div>

                    {/* Chevron Icon Container */}
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500 ${
                        isOpen
                          ? "rotate-180 border-amber-500/30 bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                          : "border-white/10 bg-white/5 text-neutral-400 group-hover:border-white/20 group-hover:text-white"
                      }`}
                    >
                      <ChevronDown className="size-4 transition-transform duration-300" />
                    </div>
                  </button>

                  {/* Smooth Animated Accordion Height */}
                  <div
                    className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="pl-14 pr-6 pb-7 text-sm leading-relaxed text-neutral-400 sm:pr-8 sm:pb-8 sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}