"use client";

import { useState } from "react";

const groups = {
  General: [
     {
    id: "01",
    q: "What exactly does Miransas build?",
    a:
      "High-performance software systems: indie games (Project Sad), secure infrastructure (Binboi), and algorithmic engines (Rust Chess Engine). Every project is built with obsessive attention to performance and long-term maintainability.",
  },
  {
    id: "02",
    q: "Do I need technical knowledge to work with you?",
    a:
      "Not at all. Whether you're a technical founder or a business owner, we translate your vision into working systems. No jargon, no unnecessary complexity — just clear communication and shipped code.",
  },
  {
    id: "03",
    q: "Can you integrate with our existing stack?",
    a:
      "Absolutely. We specialize in seamless integrations using modern APIs, webhooks, gRPC, and custom protocols. Go, Rust, Next.js — we speak your stack's language fluently.",
  },
  {
    id: "04",
    q: "How does the engagement process work?",
    a:
      "1. Discovery: We understand your problem deeply. 2. Design: Wireframes and architecture. 3. Build: Iterative development with weekly demos. 4. Ship: Production deployment with monitoring. No surprises, no scope creep.",
  },
  {
    id: "05",
    q: "Do you provide ongoing support?",
    a:
      "Yes. We don't abandon ship after launch. All plans include a support window, and we offer retainer agreements for continuous improvement, security patches, and feature development as your product scales.",
  },
  {
    id: "06",
    q: "Are you really a solo studio?",
    a:
      "Yes. Miransas is intentionally a one-person operation. This means direct communication with the engineer building your project, no handoffs, no account managers, and no bureaucracy. Just craft.",
  },
  ],
  "Community & Features": [
    {
      q: "Can members access courses and chat with one login?",
      a: "Yes. Courses, events, discussions, and the member directory all live in the same branded space under one login.",
    },
    {
      q: "Do you support live events?",
      a: "You can publish events, collect RSVPs, and keep recaps next to the rest of the community — without a second calendar tool.",
    },
  ],
  "Privacy & Access": [
    {
      q: "Will members see Fora's branding?",
      a: "No. They sign up and sign in inside your branded space. They never see Fora's name.",
    },
    {
      q: "Can I use my own domain?",
      a: "Starter includes a Fora subdomain. Pro and Enterprise include a custom domain you own.",
    },
  ],
} as const;

type Group = keyof typeof groups;

export function Faq() {
  const [group, setGroup] = useState<Group>("General");
  const [open, setOpen] = useState(0);
  const items = groups[group];

  return (
    <section className=" px-6 pb-28 mt-10 bg-black "id="faq" >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-5 text-3xl tracking-[-0.04em] text-[#fff3f0] md:text-5xl">
            Answers to the questions that come up most.
          </h2>
          <p className="mt-5 text-sm leading-6 text-white/55">
            Learn how Fora works, what&apos;s included in the beta, what your
            members experience, and what to expect as the platform grows.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {(Object.keys(groups) as Group[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setGroup(key);
                  setOpen(0);
                }}
                className={`rounded-full px-3 py-1.5 text-xs ${
                  group === key
                    ? "bg-[#fff3f0] text-black"
                    : "bg-white/6 text-white/65"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
          <div className="mt-10 rounded-3xl border border-white/8 bg-[#111] p-6">
            <p className="text-lg text-[#fff3f0]">Got questions?</p>
            <p className="mt-2 text-sm text-white/50">
              Can&apos;t find what you&apos;re looking for? Reach out — we&apos;re
              fast.
            </p>
            <a href="#contact" className="mt-4 inline-block text-sm text-[#c9f8fa]">
              Contact us →
            </a>
          </div>
        </div>

        <div className="divide-y divide-white/8 rounded-[28px]  px-6">
          {items.map((item, index) => (
            <button
              key={item.q}
              onClick={() => setOpen(index === open ? -1 : index)}
              className="block w-full py-5 text-left cursor-pointer "
            >
              <span className="flex items-center justify-between gap-4 text-[15px] text-[#fff3f0]">
                {item.q}
                <span className="text-white/40">{open === index ? "–" : "+"}</span>
              </span>
              {open === index ? (
                <span className="mt-3 block text-sm leading-6 text-white/55">
                  {item.a}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}