'use client';

import { motion, type Variants } from 'framer-motion';

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
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
    number: '01',
    category: 'SPEECH GENERATION',
    title: 'Text to Speech',
    description: 'Turn written content into natural-sounding speech for applications, products, and digital experiences.',
  },
  {
    number: '02',
    category: 'SPEECH RECOGNITION',
    title: 'Speech to Text',
    description: 'Convert spoken audio into text for transcription, search, and voice-driven workflows.',
  },
  {
    number: '03',
    category: 'VOICE IDENTITY',
    title: 'Voice Cloning',
    description: 'Build voice experiences around a consistent voice identity, with permission from the voice owner.',
  },
  {
    number: '04',
    category: 'LIVE AUDIO',
    title: 'Real-time Voice',
    description: 'Create interactive experiences where audio can move through your product in real time.',
  },
  {
    number: '05',
    category: 'DEVELOPER INFRASTRUCTURE',
    title: 'API & Infrastructure',
    description: 'Connect voice capabilities to your applications through a developer-focused integration layer.',
  },
];

export default function StickySplitSection() {
  return (
    <section className="text-foreground relative isolate w-full px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-24">
        {/* The sticky column stays in native document flow. */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={revealVariants} className="self-start lg:sticky lg:top-32">
          <div className="mb-7 inline-flex items-center gap-3">
            <span className="bg-foreground h-1.5 w-1.5 rounded-full" />

            <span className="text-muted-foreground text-[11px] font-medium tracking-[0.2em] uppercase">Voice AI Infrastructure</span>
          </div>

          <h2 className="text-foreground max-w-[15ch] text-[2.65rem] leading-[1.08] font-medium tracking-[-0.045em] sm:text-5xl lg:text-[3.65rem]">Give your product a voice.</h2>

          <p className="text-muted-foreground mt-7 max-w-md text-base leading-8 sm:text-lg">Miransas brings speech generation, transcription, and voice experiences together in a developer-focused platform.</p>

          <a href="#voice-capabilities" className="group border-border bg-primary text-primary-foreground mt-9 inline-flex items-center gap-3 rounded-full border px-6 py-3.5 text-sm font-medium transition-opacity duration-300 hover:opacity-85">
            Explore capabilities
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>

        {/* RIGHT — Capabilities */}
        <div id="voice-capabilities" className="flex scroll-mt-28 flex-col">
          {capabilities.map((item, index) => (
            <motion.article key={item.number} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealVariants} transition={{ delay: index * 0.07 }} className="group border-border border-t py-8 sm:py-10">
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="text-muted-foreground text-xs font-medium tracking-[0.16em]">{item.category}</span>

                <span className="text-muted-foreground group-hover:text-foreground font-mono text-xs transition-colors duration-300">{item.number}</span>
              </div>

              <h3 className="text-foreground text-2xl font-medium tracking-tight sm:text-[1.75rem]">{item.title}</h3>

              <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-7 sm:text-base">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
