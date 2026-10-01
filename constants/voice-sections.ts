import { Mic2, Waves, Zap } from "lucide-react";

export const VOICE_STEPS = [
  {
    id: "voice-agent",
    icon: Waves,
    eyebrow: "Voice Agents",
    title: "Trained for the real world, not the demo.",
    description:
      "Real calls are messy. Customers ramble, interrupt, change their mind mid-sentence, and forget order numbers. Miralas does not just handle it — it was trained on it.",
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
      "Miralas builds its own TTS models from scratch and lets you clone any voice from as little as 60 seconds of audio. Native Uzbek, Turkish, English, Arabic and 21 other languages are trained in-house.",
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
    eyebrow: "Voice AI",
    title: "Conversations that feel human.",
    description:
      "Miralas uçtan uca yanıt hattını 150 ms'nin altında çalıştırır. Ne zaman konuşacağını, dinleyeceğini ve sözünün kesildiğini bağlamı kaybetmeden anlar.",
    highlights: [
      "Canlı konuşma akışı için ayarlanmış, 150 ms'nin altında sesten sese gecikme.",
      "Anında söz kesme algılama; bağlamı ve amacı kaybetmeden konuşmayı durdurur.",
      "Arka plan gürültüsünde ve güçlü bölgesel aksanlarda net ses.",
      "100'den fazla dönüşlü konuşmalarda dinamik bağlam koruma.",
    ],
  },
];

