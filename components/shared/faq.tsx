"use client";

import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What exactly does Miransas build?",
    answer:
      "High-performance software systems: indie games (Project Sad), secure infrastructure (Binboi), and algorithmic engines (Rust Chess Engine). Every project is built with obsessive attention to performance and long-term maintainability.",
  },
  {
    question: "Do I need technical knowledge to work with you?",
    answer:
      "Not at all. Whether you're a technical founder or a business owner, we translate your vision into working systems. No jargon, no unnecessary complexity — just clear communication and shipped code.",
  },
  {
    question: "Can you integrate with our existing stack?",
    answer:
      "Absolutely. We specialize in seamless integrations using modern APIs, webhooks, gRPC, and custom protocols. Go, Rust, Next.js — we speak your stack's language fluently.",
  },
  {
    question: "How does the engagement process work?",
    answer:
      "1. Discovery: We understand your problem deeply. 2. Design: Wireframes and architecture. 3. Build: Iterative development with weekly demos. 4. Ship: Production deployment with monitoring. No surprises, no scope creep.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. We don't abandon ship after launch. All plans include a support window, and we offer retainer agreements for continuous improvement, security patches, and feature development as your product scales.",
  },
  {
    question: "Are you really a solo studio?",
    answer:
      "Yes. Miransas is intentionally a one-person operation. This means direct communication with the engineer building your project, no handoffs, no account managers, and no bureaucracy. Just craft.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#030303] px-6 py-32 text-white lg:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-lime-400/[0.035] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/[0.025] blur-[120px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-28">
        {/* Left */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-neutral-400 backdrop-blur-xl">
            <Sparkles className="size-4 text-lime-300" />
            Common questions
          </div>

          <h2 className="text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            Questions?
            <br />
            <span className="text-neutral-600">We've got answers.</span>
          </h2>

          <p className="mt-8 max-w-lg text-lg leading-8 text-neutral-500">
            Can't find what you're looking for? Reach out directly —
            you'll talk to the engineer, not a support bot.
          </p>

          {/* CTA */}
          <div className="group relative mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl transition-all duration-500 hover:border-lime-300/20 hover:bg-white/[0.055]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-lime-400/[0.07] blur-3xl transition-all duration-700 group-hover:bg-lime-400/[0.12]" />

            <div className="relative z-10">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to build something that lasts?
              </h3>

              <p className="mt-5 max-w-md text-sm leading-7 text-neutral-500 sm:text-base">
                No sales calls, no demos, no enterprise contracts. Pick a
                direction, describe your project, and let's build.
              </p>

              <a
                href="/contact"
                className="group/button mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-lime-200 hover:shadow-[0_0_35px_rgba(190,242,100,0.15)]"
              >
                <MessageSquare className="size-4" />
                Start a project
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Right — FAQ */}
        <div className="flex flex-col justify-center">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] backdrop-blur-xl">
            {faqs.map((item, index) => {
              const isOpen = open === index;

              return (
                <div
                  key={item.question}
                  className="border-b border-white/[0.07] last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="group flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition-colors duration-300 hover:bg-white/[0.025] sm:px-8"
                  >
                    <span
                      className={`text-base font-medium transition-colors duration-300 sm:text-lg ${
                        isOpen
                          ? "text-white"
                          : "text-neutral-300 group-hover:text-white"
                      }`}
                    >
                      {item.question}
                    </span>

                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 border-lime-300/20 bg-lime-300 text-black shadow-[0_0_25px_rgba(190,242,100,0.12)]"
                          : "border-white/10 bg-white/[0.04] text-neutral-500 group-hover:border-white/20 group-hover:text-white"
                      }`}
                    >
                      <ChevronDown className="size-4" />
                    </div>
                  </button>

                  <div
                    className={`grid overflow-hidden transition-all duration-500 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="max-w-2xl px-6 pb-7 pr-14 text-sm leading-7 text-neutral-500 sm:px-8 sm:pb-8 sm:text-base">
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