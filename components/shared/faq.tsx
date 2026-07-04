"use client";

import { ChevronDown, Sparkles, ArrowRight, MessageSquare } from "lucide-react";
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
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="bg-[#F6F5F2] py-32">
      <div className="mx-auto max-w-[90rem] px-6 md:px-12">
        <div className="grid gap-24 lg:grid-cols-2">
          
          {/* Left Side */}
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-500 shadow-sm">
              <Sparkles className="size-4 text-amber-500" />
              Common questions
            </div>
            
            <h2 className="text-5xl font-semibold leading-[0.95] tracking-tight text-neutral-900 md:text-6xl">
              Questions?
              <br />
              <span className="text-neutral-400">We've got answers.</span>
            </h2>

            <p className="mt-8 text-lg text-neutral-500">
              Can't find what you're looking for? Reach out directly — 
              you'll talk to the engineer, not a support bot.
            </p>

            <div className="mt-12 rounded-[2.5rem] bg-white p-10 shadow-sm ring-1 ring-neutral-200">
              <h3 className="text-3xl font-semibold leading-snug text-neutral-900">
                Ready to build something that lasts?
              </h3>

              <p className="mt-6 text-base leading-relaxed text-neutral-500">
                No sales calls, no demos, no enterprise contracts. Pick a plan, 
                describe your project, and we'll start building within 48 hours.
              </p>

              <a
                href="/contact"
                className="group mt-10 inline-flex items-center gap-3 rounded-2xl bg-black px-8 py-4 text-base font-medium text-white transition-all hover:bg-neutral-800 hover:scale-[1.02]"
              >
                <MessageSquare className="size-5" />
                Start a project
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className="flex flex-col justify-center">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="border-b border-neutral-200 py-6 first:pt-0"
              >
                <button
                  onClick={() => setOpen(open === index ? -1 : index)}
                  className="group flex w-full items-center justify-between text-left gap-4"
                >
                  <span className="pr-2 text-lg font-semibold text-neutral-900 transition-colors group-hover:text-neutral-600">
                    {item.question}
                  </span>

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      open === index
                        ? "bg-black text-white rotate-180"
                        : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200"
                    }`}
                  >
                    <ChevronDown className="h-5 w-5 transition-transform duration-300" />
                  </div>
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    open === index
                      ? "grid-rows-[1fr] pt-4 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pr-16 text-base leading-relaxed text-neutral-500">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}