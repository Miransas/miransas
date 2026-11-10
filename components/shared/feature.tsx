'use client';

import { Reveal } from './reval';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const tabs = [
  {
    id: 'agents',
    label: 'Voice Agents',
    copy: 'Explore how voice input, conversation and useful actions could work together.',
    videoUrl: 'https://res.cloudinary.com/dwdk20m6q/video/upload/v1787438529/150883-799711528_gfea37.mp4',
  },
  {
    id: 'cloning',
    label: 'Voice Cloning',
    copy: 'Explore voice identity from an authorized reference recording.',
    videoUrl: 'https://res.cloudinary.com/dwdk20m6q/video/upload/v1788896592/6491689-uhd_4096_2160_25fps_neo9ck.mp4',
  },
  {
    id: 'tts',
    label: 'Studio TTS',
    copy: 'Explore expressive speech, with language coverage determined by the model.',
    videoUrl: 'https://res.cloudinary.com/dwdk20m6q/video/upload/v1788896598/8084507-uhd_3840_2160_25fps_raxool.mp4',
  },
  {
    id: 'infrastructure',
    label: 'Low Latency',
    copy: 'Built around streaming audio and developer-focused infrastructure.',
    videoUrl: 'https://res.cloudinary.com/dwdk20m6q/video/upload/v1788895956/infra-demo_ftsho7.mov',
  },
] as const;

export function Features() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<(typeof tabs)[number]['id']>('agents');
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <section id="capabilities" className="bg-background px-6 pb-24">
      <Reveal className="mx-auto max-w-6xl">
        <p className="text-muted-foreground text-[12px] tracking-[0.22em] uppercase">Core Capabilities</p>
        <h2 className="text-foreground mt-5 max-w-2xl text-3xl tracking-[-0.04em] md:text-5xl md:leading-[1.15]">From voice research to useful interfaces.</h2>
        <p className="text-muted-foreground mt-5 max-w-xl text-[15px] leading-7">We are bringing speech generation, voice identity and conversational infrastructure into a coherent developer experience.</p>
        <div className="mt-10 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button key={tab.id} type="button" aria-pressed={active === tab.id} aria-controls="capability-preview" onClick={() => setActive(tab.id)} className={`rounded-full px-4 py-1.5 text-sm transition-all duration-300 ${active === tab.id ? 'bg-primary text-primary-foreground font-medium' : 'bg-card text-muted-foreground hover:bg-secondary'}`}>
              {tab.label}
            </button>
          ))}
        </div>
        <motion.div id="capability-preview" key={current.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="border-border bg-card mt-8 overflow-hidden rounded-[24px] border">
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="border-border relative min-h-[320px] border-b bg-black md:border-r md:border-b-0">
              <video key={current.videoUrl} src={current.videoUrl} autoPlay={!reduce} controls={Boolean(reduce)} aria-label={`${current.label} demonstration`} preload="none" loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-90" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-foreground text-xl tracking-tight">{current.copy}</p>
              <p className="text-muted-foreground mt-4 text-sm leading-6">Visual study · illustrative footage. Follow our engineering notes for product availability and implementation details.</p>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
