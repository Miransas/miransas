"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, Network, Cpu, Sparkles } from "lucide-react";
import { Globe, } from "./globe";
import OrbVoice from "./orb-voice";
import VoiceDemo from "./voice-demo";

const VOICE_STEPS = [
  {
    id: "real-world",
    icon: Network,
    title: "Trained for the real world",
    description:
      "Real calls are messy. Miralas handles the interruptions, the half-remembered order numbers, and the 'actually, one more thing.'",
    highlights: [
      "Sees every request through — from hello to resolved.",
      "Pulls up records, checks policy, and takes action mid-conversation.",
    ],
  },
  {
    id: "no-wait",
    icon: Cpu,
    title: "Smart, without the wait",
    description:
      "Most voice AI trades intelligence for speed. Miralas doesn't — real reasoning, with answers in under a second.",
    highlights: [
      "Trained on the hardest calls we could find.",
      "Clear through background noise and strong accents in 25+ languages.",
    ],
  },
  {
    id: "turn-taking",
    icon: Sparkles,
    title: "Natural turn-taking & interrupt",
    description:
      "Understands when to speak and when to listen. Stops instantly when interrupted without losing context or intent.",
    highlights: [
      "Sub-150ms response pipeline for seamless flow.",
      "Dynamic context preservation across complex dialogs.",
    ],
  },
];

// Sol taraftaki metin bloğu
function StepTextItem({
  step,
  index,
  setActiveIndex,
  children,
}: {
  step: (typeof VOICE_STEPS)[0];
  index: number;
  setActiveIndex: (i: number) => void;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Metin ekran ortasına yaklaştığında aktifleşir
  const isInView = useInView(ref, {
    amount: 0.5,
    margin: "-20% 0px -20% 0px",
  });

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className={`min-h-[60vh] lg:min-h-[75vh] flex flex-col justify-center transition-opacity duration-500 py-8 ${isInView ? "opacity-100" : "opacity-30"
        }`}
    >
      <div className="space-y-4 max-w-lg">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-stone-200" />
          <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            {step.title}
          </h3>
        </div>

        <p className="text-stone-300 text-base md:text-lg leading-relaxed font-normal">
          {step.description}
        </p>

        <ul className="space-y-3 pt-2">
          {step.highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-stone-400">
              <Check className="w-4 h-4 text-stone-200 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* MOBİL İÇİN BİLEŞEN ALANI: Sadece mobil görünümde metnin altına basar */}
        <div className="block lg:hidden pt-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// Sağ taraftaki container içeriği
function DynamicComponentSlot({ activeIndex }: { activeIndex: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 p-6"
      >

        {/* ======================================================
          BURAYA SİZİN KENDİ BİLEŞENLERİNİZ IMPORT EDİLİP GELECEK: */}
         
        {activeIndex === 0 && <Globe />}

        {activeIndex === 1 && <OrbVoice hoverIntensity={2} rotateOnHover hue={272} forceHoverState={false} backgroundColor="#000000" /> }
       
          {activeIndex === 2 && <VoiceDemo/>}
        

        {/* <div className="px-3 py-1 rounded-full border border-stone-800 bg-stone-900 text-stone-300 text-xs font-mono">
          COMPONENT #{activeIndex + 1}
        </div>
        <p className="text-xs text-stone-400 max-w-xs">
          Active Feature: <span className="text-stone-200">{VOICE_STEPS[activeIndex].id}</span>
        </p> */}
      </motion.div>
    </AnimatePresence>
  );
}

export function VoiceSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative">

          {/* SOL TARAF: Akan Metinler */}
          <div className="w-full lg:w-1/2">
            {VOICE_STEPS.map((step, index) => (
              <StepTextItem
                key={step.id}
                step={step}
                index={index}
                setActiveIndex={setActiveIndex}
              >
                {/* Mobilde her metnin altına çıkan dinamik bileşen kutusu */}
                <div className="w-full h-64 rounded-xl border border-stone-800 bg-stone-900/30 overflow-hidden">
                  <DynamicComponentSlot activeIndex={index} />
                </div>
              </StepTextItem>
            ))}
          </div>

          {/* SAĞ TARAF: Masaüstü Sabit (Sticky) Bileşen */}
          <div className="hidden lg:block w-1/2 sticky top-[calc(50vh-240px)] h-[480px]">
            <div className="w-full h-full rounded-2xl backdrop-blur-md relative overflow-hidden flex flex-col justify-center items-center shadow-2xl">
              <DynamicComponentSlot activeIndex={activeIndex} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}