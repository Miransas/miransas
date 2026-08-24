"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const tabs = [
  {
    id: "community",
    label: "Community",
    copy: "Post, discuss, react — the feed your members live in.",
  },
  {
    id: "courses",
    label: "Courses",
    copy: "Chapters, lessons, and progress — taught inside the community.",
  },
  {
    id: "events",
    label: "Events",
    copy: "Live sessions, RSVPs, and recaps without a second tool.",
  },
  {
    id: "members",
    label: "Members",
    copy: "Profiles, directory, and a space that feels like theirs.",
  },
] as const;

export function Features() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("community");
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <section id="features" className="bg-black px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">Core Features</p>
        <h2 className="mt-5 max-w-2xl text-3xl tracking-[-0.04em] text-[#fff3f0] md:text-5xl md:leading-[1.15]">
          One platform to run your entire community.
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/60">
          Fora brings your courses, events, discussions, and members into one
          space, so you stop switching between tools and start spending time
          with your community.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                active === tab.id
                  ? "bg-[#fff3f0] text-black"
                  : "bg-white/6 text-white/70 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 overflow-hidden rounded-[24px] border border-white/10 bg-[#111]"
        >
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <div
              className="min-h-[320px]"
              style={{
                background:
                  "radial-gradient(120% 90% at 50% 0%, #1b2228 0%, #353f44 42%, #d39794 100%)",
              }}
            />
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-xl tracking-tight text-[#fff3f0]">
                {current.copy}
              </p>
              <p className="mt-4 text-sm leading-6 text-white/55">
                Everything stays under your brand, on your domain, with one
                login for every part of the experience.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}