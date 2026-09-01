import { Mic2, Waves, Zap } from "lucide-react";

export const ROUTES = {
  home: "/",
  developer: "/developer",
  model: "/model",

  products: {
    studio: "https://console.miralas.io/studio",
    tts: "https://console.miralas.io/tts",
    voiceClone: "https://console.miralas.io/voice-clone",
    realtime: "https://console.miralas.io/realtime",
  },

  console: {
    studio: "https://console.miralas.io/studio",
    auth: "https://console.miralas.io/auth",
  },
} as const;

export const PRODUCT_MENU = [
  {
    label: "Studio",
    hint: "Create and manage AI voices",
    href: ROUTES.products.studio,
  },
  {
    label: "Text to Speech",
    hint: "Generate natural AI speech",
    href: ROUTES.products.tts,
  },
  {
    label: "Voice Clone",
    hint: "Create your own AI voice",
    href: ROUTES.products.voiceClone,
  },
  {
    label: "Realtime",
    hint: "Build real-time voice experiences",
    href: ROUTES.products.realtime,
  },
] as const;



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
