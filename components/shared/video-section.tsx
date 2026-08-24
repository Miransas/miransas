"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { ShaderTone } from "../shaders/glass-shader-card";
import { Reveal } from "./reval";



const TONES: ShaderTone[] = ["navy", "coral", "cream"];

export function VideoSections() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section className="bg-void">
        <div className="px-4 py-6 md:p-[100px]">
          <VideoFrame className="aspect-video overflow-hidden rounded-[22px] md:rounded-[28px]" />
        </div>
        <CardRow />
      </section>
    );
  }

  return (
    <section className="bg-void">
      <PinnedVideo />
      <CardRow />
    </section>
  );
}

function PinnedVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const [maxInset, setMaxInset] = useState(100);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setMaxInset(mq.matches ? 100 : 16);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const inset = useTransform(scrollYProgress, [0.08, 0.78], [0, maxInset]);
  const radius = useTransform(scrollYProgress, [0.08, 0.78], [0, 28]);
  const scale = useTransform(scrollYProgress, [0.08, 0.78], [1.08, 1]);

  return (
    <div ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-void">
        <motion.div
          style={{
            position: "absolute",
            top: inset,
            right: inset,
            bottom: inset,
            left: inset,
            borderRadius: radius,
          }}
          className="overflow-hidden bg-navy shadow-[0_40px_80px_-32px_rgba(0,0,0,0.55)]"
        >
          <motion.div style={{ scale }} className="h-full w-full">
            <VideoFrame className="h-full w-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function VideoFrame({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const src = window.matchMedia("(max-width: 767px)").matches
      ? "https://res.cloudinary.com/dwdk20m6q/video/upload/v1787512184/229254_medium_qc3ckw.mp4"
      : "https://res.cloudinary.com/dwdk20m6q/video/upload/v1787512184/229254_medium_qc3ckw.mp4";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!el.src.endsWith(src)) el.src = src;
          setActive(true);
          void el.play().catch(() => {});
        } else {
          el.pause();
          setActive(false);
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  if (reduce) {
    return (
      <img
        src="/media/studio.jpg"
        alt=""
        width={1280}
        height={720}
        decoding="async"
        className={`object-cover ${className ?? ""}`}
      />
    );
  }

  return (
    <video
      ref={ref}
      className={`object-cover ${className ?? ""}`}
      muted
      loop
      playsInline
      preload="none"
      poster="/media/studio.jpg"
      width={1280}
      height={720}
      src={"https://res.cloudinary.com/dwdk20m6q/video/upload/v1787512184/229254_medium_qc3ckw.mp4"}
      disablePictureInPicture
      disableRemotePlayback
      aria-label="Fora community space on a studio screen"
      aria-hidden={!active}
    />
  );
}

// function CardRow() {
//   return (
//     <div className="bg-void px-5 pb-24 pt-6 md:px-8 md:pb-32 md:pt-10">
//       <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
//         {VIDEO_CARDS.map((card, i) => (
//           <Reveal key={card.title} delay={i * 0.08}>
//             <GlassShaderCard
//               tone={TONES[i] ?? "navy"}
//               kicker={card.kicker}
//               title={card.title}
//               body={card.body}
//             />
//           </Reveal>
//         ))}
//       </div>
//     </div>
//   );
// }

function CardRow() {
  return (
    <div className="bg-void px-5 pb-24 pt-6 md:px-8 md:pb-32 md:pt-10">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {VIDEO_CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.08}>
            <article className="h-full rounded-[22px] border border-white/10 bg-[#0a0a0a] p-6 md:p-7">
              <p className="font-mono text-[11px] tracking-wide text-coral-2">
                {card.kicker}
              </p>
              <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight text-cream">
                {card.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-cream/65">
                {card.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export const VIDEO_CARDS = [
  {
    kicker: "01",
    title: "High-Fidelity Voice Cloning",
    body: "Upload a brief audio sample to replicate your exact vocal identity—timbre, pitch, and accent. Maintain consistent brand voice across marketing campaigns, e-learning platforms, and podcasts.",
    badge: "Neural Cloning",
    metrics: "99.2% Similarity Score"
  },
  {
    kicker: "02",
    title: "Ultra-Low Latency Speech Generation",
    body: "Convert complex text to natural audio streams in milliseconds. Engine-optimized for native Uzbek phonetics, regional cadence, and emotional inflection without robotic pauses.",
    badge: "Streaming TTS",
    metrics: "<150ms Latency"
  },
  {
    kicker: "03",
    title: "Conversational AI Voice Layer",
    body: "Upgrade text-only chatbots into real-time voice agents. Delivers expressive, studio-quality speech output that mimics natural human back-and-forth interaction.",
    badge: "Interactive Voice",
    metrics: "24kHz HD Audio"
  },
] as const;