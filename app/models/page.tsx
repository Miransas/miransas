"use client"
import { motion } from 'framer-motion'
import { ArrowRight, BrainCircuit, Cpu, Languages, LucideIcon, Mic, Monitor, Network, Radio, Volume2 } from 'lucide-react'
import React from 'react'





const reveal = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-8 mt-10">
      <div className="mb-3 flex items-center gap-3">
        <span className="h-px w-6 bg-white/40" />

        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
          {eyebrow}
        </span>
      </div>

      <h2 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
        {title}
      </h2>
    </div>
  );
}

const page = () => {
  return (
    <div className='mx-auto p-1 max-w-5xl'>

      {/* ===============================================
    MODELS
================================================ */}

      <section
        id="models"
        className="scroll-mt-28"
      >
        <SectionHeading
          eyebrow="03 / Models"
          title="The models behind the voice."
          
        />

        <p className="mb-8 max-w-2xl text-sm leading-7 text-stone-500">
          The AI models powering the Miransas voice technology
          stack, selected for their capabilities and integration
          into our infrastructure.
        </p>

        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={reveal}
          className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0b0b] transition-colors duration-300 hover:border-white/[0.15]"
        >
          {/* Ambient background */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/[0.025] blur-[100px]" />

          <div className="relative z-10 p-7 md:p-10">

            {/* Model header */}

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.045]">
                  <BrainCircuit className="h-7 w-7 text-stone-200" />
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
                    TTS / Multilingual
                  </span>

                  <h3 className="mt-2 text-2xl font-medium tracking-tight text-white md:text-3xl">
                    Chatterbox Multilingual V3
                  </h3>

                  <p className="mt-1 text-xs text-stone-500">
                    Developed by Resemble AI
                  </p>
                </div>

              </div>

              <span className="w-fit rounded-full border border-white/[0.12] bg-white/[0.045] px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-stone-300">
                Selected TTS Model
              </span>

            </div>

            {/* Description */}

            <p className="mt-8 max-w-3xl text-sm leading-8 text-stone-400">
              An open-source multilingual text-to-speech model
              designed for expressive speech generation and
              voice cloning. Chatterbox Multilingual V3 is
              the selected model for the Miransas TTS direction.
            </p>

            {/* Model specifications */}

            <div className="mt-10 grid grid-cols-2 gap-4 border-y border-white/[0.07] py-7 md:grid-cols-3">

              <div>
                <div className="flex items-center gap-2 text-stone-500">
                  <Cpu className="h-3.5 w-3.5" />
                  <span className="text-[10px] uppercase tracking-[0.16em]">
                    Parameters
                  </span>
                </div>

                <p className="mt-3 text-3xl font-medium tracking-tight text-white">
                  500M
                </p>

                <p className="mt-1 text-xs text-stone-600">
                  Model size
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-stone-500">
                  <Languages className="h-3.5 w-3.5" />
                  <span className="text-[10px] uppercase tracking-[0.16em]">
                    Languages
                  </span>
                </div>

                <p className="mt-3 text-3xl font-medium tracking-tight text-white">
                  23
                </p>

                <p className="mt-1 text-xs text-stone-600">
                  Officially listed languages
                </p>
              </div>

              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 text-stone-500">
                  <Mic className="h-3.5 w-3.5" />
                  <span className="text-[10px] uppercase tracking-[0.16em]">
                    Capabilities
                  </span>
                </div>

                <p className="mt-3 text-xl font-medium tracking-tight text-white">
                  TTS + Voice Cloning
                </p>

                <p className="mt-1 text-xs text-stone-600">
                  Speech generation
                </p>
              </div>

            </div>

            {/* Model architecture */}

            <div className="mt-8">

              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
                Model Architecture
              </span>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <span className="text-xs font-medium text-white">
                    T3
                  </span>

                  <p className="mt-2 text-xs leading-6 text-stone-500">
                    Text-to-speech token generation.
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <span className="text-xs font-medium text-white">
                    S3Gen
                  </span>

                  <p className="mt-2 text-xs leading-6 text-stone-500">
                    Audio generation decoder using flow matching.
                  </p>
                </div>

              </div>
            </div>

            {/* Language disclaimer */}

            <div className="mt-8 flex gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">

              <Languages className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />

              <div>
                <p className="text-xs font-medium text-stone-200">
                  Language availability
                </p>

                <p className="mt-2 text-xs leading-6 text-stone-500">
                  Uzbek is not included in the officially listed
                  languages of this model. Uzbek-specific speech
                  support remains a separate Miransas development
                  objective.
                </p>
              </div>

            </div>

            {/* Attribution */}

            <div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-5">

              <span className="text-[10px] uppercase tracking-[0.16em] text-stone-600">
                External model · Resemble AI
              </span>

              <a
                href="https://github.com/resemble-ai/chatterbox"
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 text-xs text-stone-400 transition-colors hover:text-white"
              >
                Model documentation

                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
              </a>

            </div>

          </div>
        </motion.article>
      </section>

    </div>
  )
}

export default page