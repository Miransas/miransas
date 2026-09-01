"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, Network, Cpu, Sparkles, Mic2, Zap, Waves } from "lucide-react";
import { Globe, } from "./globe";
import OrbVoice from "./orb-voice";
import VoiceDemo from "./voice-demo";

const VOICE_STEPS = [
  {
    id: "voice-agent",
    icon: Waves,
    eyebrow: "Voice Agents",
    title: "Trained for the real world, not the demo.",
    description:
      "Real calls are messy. Customers ramble, interrupt, change their mind mid-sentence, forget order numbers, and say “actually, one more thing.” Miralas doesn't just handle it — it was trained on it. We fine-tune on 40,000+ hours of actual customer service calls, so our agents resolve issues like your best human rep.",
    highlights: [
      "End-to-end call resolution — from hello to resolved, zero handoff to a human.",
      "Pulls CRM records, checks policy, books appointments and issues refunds mid-call.",
      "Scales from 10 to 10,000 concurrent calls on the same inference stack.",
      "Trained on real customer audio, never synthetic data.",
    ],
  },
  {
    id: "tts-clone",
    icon: Mic2,
    eyebrow: "Studio TTS & Voice Clone",
    title: "Your voice, cloned. Every language, fluent.",
    description:
      "Most AI voices sound like everyone else's. Miralas builds its own TTS models from scratch and lets you clone any voice — yours, a brand character, a native speaker — from as little as 60 seconds of audio. Native Uzbek, Turkish, English, Arabic and 21 other languages, all trained in-house so you're never locked into a third-party provider.",
    highlights: [
      "Voice cloning in under 60 seconds of clean audio — indistinguishable from the original.",
      "Native Uzbek model — the first production-ready Uzbek TTS from a commercial lab.",
      "First-token latency under 95ms, streaming-first architecture for real-time agents.",
      "Full ownership: we own the models, the weights and the inference pipeline.",
    ],
  },
  {
    id: "voice-ai",
    icon: Zap,
    eyebrow: "Voice AI",
    title: "Conversations that feel human.",
    description:
      "A voice AI that feels slow is a voice AI that gets hung up on. Miralas runs an end-to-end response pipeline under 150ms — faster than most humans can react. It detects when to speak, when to listen, and when to get interrupted — without losing a single word of context.",
    highlights: [
      "Sub-150ms voice-to-voice latency, tuned for live conversational flow.",
      "Instant interrupt detection — stops speaking without losing context or intent.",
      "Crystal clear through background noise, cross-talk and strong regional accents.",
      "Dynamic context preservation across 100+ turn conversations.",
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