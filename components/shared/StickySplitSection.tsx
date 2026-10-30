
"use client";

import { motion, type Variants } from "framer-motion";

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const capabilities = [
  {
    number: "01",
    category: "SPEECH GENERATION",
    title: "Text to Speech",
    description:
      "Turn written content into natural-sounding speech for applications, products, and digital experiences.",
  },
  {
    number: "02",
    category: "SPEECH RECOGNITION",
    title: "Speech to Text",
    description:
      "Convert spoken audio into text for transcription, search, and voice-driven workflows.",
  },
  {
    number: "03",
    category: "VOICE IDENTITY",
    title: "Voice Cloning",
    description:
      "Build voice experiences around a consistent voice identity, with permission from the voice owner.",
  },
  {
    number: "04",
    category: "LIVE AUDIO",
    title: "Real-time Voice",
    description:
      "Create interactive experiences where audio can move through your product in real time.",
  },
  {
    number: "05",
    category: "DEVELOPER INFRASTRUCTURE",
    title: "API & Infrastructure",
    description:
      "Connect voice capabilities to your applications through a developer-focused integration layer.",
  },
];

export default function StickySplitSection() {
  return (
    <section className="relative isolate w-full overflow-clip bg-[#050505] px-5 py-24 text-white sm:px-8 md:py-32 lg:px-12">

      {/* Subtle background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#9BAF8A]/[0.055] blur-[140px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-24">

        {/* LEFT — Sticky content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={revealVariants}
          className="self-start lg:sticky lg:top-32"
        >
          <div className="mb-7 inline-flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3B18A]" />

            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
              Voice AI Infrastructure
            </span>
          </div>

          <h2 className="max-w-[15ch] text-[2.65rem] font-medium leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.65rem]">
            Give your product a voice.
          </h2>

          <p className="mt-7 max-w-md text-base leading-8 text-zinc-400 sm:text-lg">
            Miransas brings speech generation, transcription, and voice
            experiences together in a developer-focused platform.
          </p>

          <a
            href="#voice-capabilities"
            className="group mt-9 inline-flex items-center gap-3 rounded-full border border-white/15 bg-[#0D59FF] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-[#A3B18A]/40 hover:bg-white/[0.08]"
          >
            Explore capabilities

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>

        {/* RIGHT — Capabilities */}
        <div
          id="voice-capabilities"
          className="flex scroll-mt-28 flex-col gap-4"
        >
          {capabilities.map((item, index) => (
            <motion.article
              key={item.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={revealVariants}
              transition={{ delay: index * 0.07 }}
              className="group rounded-2xl cursor-pointer p-6 transition-colors duration-300 hover:border-[#A3B18A]/30 hover:bg-white/[0.04] sm:p-8"
            >
              <div className="mb-8 flex items-center justify-between gap-4">
                <span className="text-xs font-medium tracking-[0.16em] text-[#86868C]">
                  {item.category}
                </span>

                <span className="font-mono text-xs text-zinc-600 transition-colors duration-300 group-hover:text-[#A3B18A]">
                  {item.number}
                </span>
              </div>

              <h3 className="text-2xl font-medium tracking-tight text-[#F5F5F7] sm:text-[1.75rem]">
                {item.title}
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#6E6E74] sm:text-base">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
