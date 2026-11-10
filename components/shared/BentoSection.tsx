'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bentoitems } from '../../constants/bento';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS (Scroll Animasyonları)
───────────────────────────────────────────────────────────── */
const headerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const card = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

const textStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const inner = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const visual = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, delay: 0.15, ease: EASE },
  },
};

/* ─────────────────────────────────────────────────────────────
   MOCK VISUALS (Sahte Arayüz Bileşenleri)
───────────────────────────────────────────────────────────── */

function Waveform({ bars = 28, color = 'bg-foreground/50' }: { bars?: number; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: '100px' });
  return (
    <div ref={ref} className="flex h-9 items-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => (
        <span key={i} className={`waveform-bar w-[3px] rounded-full ${color}`} style={{ height: `${(20 + Math.abs(Math.sin(i * 0.55)) * 80).toFixed(3)}%`, animationDelay: `${i * 0.05}s`, animationPlayState: visible ? 'running' : 'paused' }} />
      ))}
    </div>
  );
}

function AgentMock() {
  return (
    <div className="border-border bg-card flex h-full min-h-[280px] flex-col overflow-hidden rounded-[20px] border p-5 backdrop-blur-sm">
      <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="bg-foreground/10 absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
            <span className="bg-foreground/10 relative inline-flex h-2 w-2 rounded-full" />
          </span>
          Sample call · Support
        </span>
        <span className="tracking-wider tabular-nums">Example conversation</span>
      </div>

      <div className="mt-6 space-y-4 text-[13px] leading-relaxed">
        <div className="bg-secondary border-border text-muted-foreground max-w-[85%] rounded-2xl rounded-tl-sm border px-4 py-2.5">Hi, I need to change the delivery address for order #48213.</div>
        <div className="bg-foreground/10 border-border text-foreground ml-auto max-w-[85%] rounded-2xl rounded-tr-sm border px-4 py-2.5">Of course — I&#39;ve pulled up order #48213. What&#39;s the new address?</div>
      </div>

      <div className="mt-auto pt-6">
        <Waveform />
        <div className="text-muted-foreground mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
          <span>agent-2 · intent: change_address</span>
          <span className="text-foreground flex items-center gap-1">
            resolved <span className="text-[10px]">✓</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function TtsMock() {
  const voices = [
    { lang: 'UZ', name: 'Dilnoza', active: true },
    { lang: 'EN', name: 'Ava', active: false },
    { lang: 'TR', name: 'Mert', active: false },
  ];

  return (
    <div className="border-border bg-card flex h-full min-h-[280px] flex-col overflow-hidden rounded-[20px] border p-5 backdrop-blur-sm">
      <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
        <span>Studio TTS</span>
        <span className="border-border bg-secondary text-muted-foreground rounded-full border px-2.5 py-1">Example voice</span>
      </div>

      <p className="border-border bg-secondary text-muted-foreground mt-6 rounded-xl border px-4 py-4 text-[14px] leading-6 italic">&ldquo;Assalomu alaykum! Buyurtmangiz yo&#39;lga chiqdi.&rdquo;</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {voices.map((v) => (
          <span key={v.lang} className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${v.active ? 'bg-foreground/10 border-border text-foreground border' : 'bg-secondary text-muted-foreground hover:text-muted-foreground border border-transparent'}`}>
            {v.lang} · {v.name}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <Waveform bars={34} />
        <div className="text-muted-foreground mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
          <span>Speech preview</span>
          <span>Sample audio</span>
        </div>
      </div>
    </div>
  );
}

function VoiceCloneMock() {
  return (
    <div className="border-border bg-card flex h-full min-h-[280px] flex-col overflow-hidden rounded-[20px] border p-5 backdrop-blur-sm">
      <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
        <span>Voice cloning concept</span>
        <span className="text-foreground flex items-center gap-1.5">
          <span className="bg-foreground/10 h-1.5 w-1.5 animate-pulse rounded-full" />
          Example workflow
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="border-border bg-secondary hover:bg-secondary rounded-xl border p-3.5 transition-colors">
          <div className="text-muted-foreground mb-3 flex items-center justify-between font-mono text-[10.5px]">
            <span>Reference audio</span>
            <span>speaker_01.wav</span>
          </div>
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="bg-secondary text-muted-foreground hover:bg-secondary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] transition-colors">
              ▶
            </span>
            <div className="flex-1 opacity-40">
              <Waveform bars={14} color="bg-foreground/50" />
            </div>
          </div>
        </div>
        <div className="relative flex justify-center py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="border-border w-full border-t border-dashed"></div>
          </div>
          <div className="bg-card text-muted-foreground relative px-3 font-mono text-[10px] tracking-widest uppercase">generating</div>
        </div>
        <div className="border-border bg-foreground/10 rounded-xl border p-3.5">
          <div className="text-foreground mb-3 flex items-center justify-between font-mono text-[10.5px]">
            <span>Synthesized Output</span>
            <span>Example output</span>
          </div>
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="bg-foreground/10 text-foreground hover:bg-foreground/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] transition-colors">
              ▶
            </span>
            <div className="flex-1">
              <Waveform bars={14} color="bg-foreground/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────────── */

export function Bento() {
  return (
    <section id="features" className="bg-background relative overflow-hidden px-6 pt-24 pb-28">
      <div className="relative mx-auto max-w-6xl">
        <motion.div variants={headerStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="flex flex-col items-center text-center md:items-start md:text-left">
          <motion.p variants={fadeUp} className="text-muted-foreground text-[12px] font-medium tracking-[0.22em] uppercase">
            What we build
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-foreground mt-5 max-w-2xl text-4xl tracking-tight md:text-5xl lg:text-6xl">
            Voice first. <span className="text-muted-foreground">Never voice only.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground mt-6 max-w-2xl text-[16px] leading-relaxed">
            Our work connects voice interfaces, speech models and the systems that carry audio between them. These illustrative studies show the direction; they are not live product interfaces.
          </motion.p>
        </motion.div>
        <div className="mt-16 space-y-6">
          {Bentoitems.map((item, index) => (
            <motion.div key={item.tag} variants={card} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="group border-border bg-card hover:border-border hover:bg-card grid overflow-hidden rounded-[32px] border transition-colors duration-500 md:grid-cols-2">
              <motion.div variants={textStagger} className={`flex flex-col justify-center p-8 md:p-14 ${index === 1 ? 'md:order-2' : ''}`}>
                <motion.p variants={inner} className="text-foreground text-[12px] font-semibold tracking-[0.2em] uppercase">
                  {item.tag}
                </motion.p>
                <motion.h3 variants={inner} className="text-foreground mt-4 text-2xl font-medium tracking-tight md:text-[32px] md:leading-[1.2]">
                  {item.title}
                </motion.h3>
                <motion.p variants={inner} className="text-muted-foreground mt-5 text-[15px] leading-relaxed">
                  {item.body}
                </motion.p>
                <motion.p variants={inner} className="text-muted-foreground mt-8 font-mono text-[13px]">
                  {item.aside}
                </motion.p>
              </motion.div>
              <motion.div variants={visual} className={`relative flex min-h-[320px] items-center justify-center p-6 md:p-10 ${index === 1 ? 'md:order-1' : ''}`}>
                <div className="bg-foreground/10 pointer-events-none absolute top-1/2 left-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

                <div className="relative z-10 w-full max-w-md min-w-0">
                  <p className="text-muted-foreground mb-3 font-mono text-[10px] tracking-wider uppercase">Illustrative interface · sample data</p>
                  {item.visual === 'agents' ? <AgentMock /> : item.visual === 'tts' ? <TtsMock /> : <VoiceCloneMock />}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
