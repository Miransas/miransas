import { Mic2, Waves, Zap } from "lucide-react";
import { FaDiscord, FaGithub, FaX, FaYoutube } from "react-icons/fa6";

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

export const RESOURCE_MENU = [
  { label: "Blog", href: "https://blog.miransas.com", isExternal: true },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
  // { label: "Help", href: "/developers" },
] as const;

export const EXPLORE_MENU = [
  { label: "News", href: "/news" },
  { label: "Models", href: "/models" },
  { label: "Agent", href: "/agent" },
] as const;

export const COMPANY_MENU = [
    { label: "About", href: "/about" },
  { label: "Developers", href: "/developers" },
  { label: "Careers", href: "/careers" },

] as const;

export const PROJECT_MENU = [
    { label: "Miralas", href: "/projects/miralas" },


] as const;

export const HEADER_MENU = [
  { label: "Products", items: PRODUCT_MENU },
  { label: "Explore", items: EXPLORE_MENU },
  { label: "Resources", items: RESOURCE_MENU },
  { label: "Company", items: COMPANY_MENU },
  { label:  "Projects", items: PROJECT_MENU}
] as const;

export const FOOTER_NAV = [
  {
    title: "Platform",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Voice Agents", href: "/#voice-agents" },
      { label: "FAQ", href: "/#faq" },
      { label: "Issues", href: "https://github.com/Miransas/miransas/issues/new", isExternal: true },
      { label: "Discussions", href: "https://github.com/orgs/Miransas/discussions/new/choose", isExternal: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/developers" },
      { label: "Blog", href: "https://blog.miransas.com", isExternal: true },
      { label: "Support", href: "/contact" },
      { label: "Terms of Service", href: "https://privacy.miransas.com/terms", isExternal: true },
      { label: "Privacy Policy", href: "https://privacy.miransas.com/privacy", isExternal: true },
      { label: "Security", href: "https://privacy.miransas.com/security", isExternal: true },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "News", href: "/news" },
      { label: "Models", href: "/models" },
      { label: "Agent", href: "/agent" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Developers", href: "/developers" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "System Status", href: "https://status.miransas.com", isExternal: true },
    ],
  },
  {
    title: "Miralas AI",
    links: [
      { label: "Miralas Overview", href: "https://miralas.io", isExternal: true },
      { label: "Dashboard Console", href: "https://console.miralas.io", isExternal: true },
      { label: "Studio TTS", href: "https://console.miralas.io/studio/tts", isExternal: true },
      { label: "Live Streams", href: "https://console.miralas.io/studio/streams", isExternal: true },
    ],
  },
] as const;

export const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com/miransaas", icon: FaX },
  { label: "GitHub", href: "https://github.com/Miransas", icon: FaGithub },
  { label: "Discord", href: "https://discord.gg/miransas", icon: FaDiscord },
  { label: "YouTube", href: "https://youtube.com/@miransaas", icon: FaYoutube },
] as const;



const VOICE_STEPS = [
  {
    id: "voice-agent",
    icon: Waves,
    eyebrow: "Sesli Ajanlar",
    title: "Trained for the real world, not the demo.",
    description:
      "Real calls are messy. Customers ramble, interrupt, change their mind mid-sentence, forget order numbers, and say “actually, one more thing.” Miralas doesn't just handle it — it was trained on it. Our agents are fine-tuned on 40,000+ hours of real customer service calls.",
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
      "Most AI voices sound like everyone else's. Miralas builds its own TTS models from scratch and lets you clone any voice from as little as 60 seconds of audio. Native Uzbek, Turkish, English, Arabic and 21 other languages are trained in-house.",
    highlights: [
      "Voice cloning in under 60 seconds of clean audio — indistinguishable from the original.",
      "Native Uzbek model — a production-ready Uzbek TTS model.",
      "First-token latency under 95ms, streaming-first architecture for real-time agents.",
      "Full ownership: we own the models, the weights and the inference pipeline.",
    ],
  },
  {
    id: "voice-ai",
    icon: Zap,
    eyebrow: "Sesli Yapay Zeka",
    title: "Conversations that feel human.",
    description:
      "A voice AI that feels slow is a voice AI that gets hung up on. Miralas runs an end-to-end response pipeline under 150ms. It detects when to speak, listen, and get interrupted without losing context.",
    highlights: [
      "Sub-150ms voice-to-voice latency, tuned for live conversational flow.",
      "Instant interrupt detection — stops speaking without losing context or intent.",
      "Crystal clear through background noise, cross-talk and strong regional accents.",
      "Dynamic context preservation across 100+ turn conversations.",
    ],
  },
];
