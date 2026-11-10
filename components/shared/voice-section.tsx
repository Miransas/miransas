'use client';

import { useMediaQuery } from '@/lib/use-media-query';
import { Reveal } from './reval';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

import LiveVoiceStream from './voice-demo';
import Shdr02 from '../ui/shdr-02';
import RobotEyes from './RobotEyes';
import { VOICE_STEPS } from '../../constants/voice-sections';

// Sol taraftaki metin bloğu
function StepTextItem({ step, index, setActiveIndex, children }: { step: (typeof VOICE_STEPS)[0]; index: number; setActiveIndex: (i: number) => void; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Metin ekran ortasına yaklaştığında aktifleşir
  const isInView = useInView(ref, {
    amount: 0.5,
    margin: '-20% 0px -20% 0px',
  });

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  const Icon = step.icon;

  return (
    <div ref={ref} className="flex min-h-[60vh] flex-col justify-center py-8 lg:min-h-[75vh]">
      <Reveal className="max-w-lg space-y-4">
        <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">{step.eyebrow}</p>
        <div className="flex items-center gap-3">
          <Icon className="text-foreground h-5 w-5" />
          <h3 className="text-foreground text-2xl font-semibold tracking-tight md:text-3xl">{step.title}</h3>
        </div>

        <p className="text-muted-foreground text-base leading-relaxed font-normal md:text-lg">{step.description}</p>

        <ul className="space-y-3 pt-2">
          {step.highlights.map((item, i) => (
            <li key={i} className="text-muted-foreground flex items-start gap-3 text-sm">
              <Check className="text-foreground mt-0.5 h-4 w-4 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="block pt-6 lg:hidden">{children}</div>
      </Reveal>
    </div>
  );
}

// Sağ taraftaki container içeriği
function DynamicComponentSlot({ activeIndex }: { activeIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: '160px' });
  return (
    <div ref={ref} className="h-full w-full">
      {visible && (
        <AnimatePresence mode="wait">
          <motion.div key={activeIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2, ease: 'easeOut' }} className="voice-visual flex h-full w-full min-w-0 flex-col items-center justify-center space-y-4 p-2 sm:p-4">
            {activeIndex === 0 && <RobotEyes />}

            {activeIndex === 1 && (
              <Shdr02
                size={400}
                style={{ width: 'min(100%, 400px)', height: 'auto', aspectRatio: '1' }}
                state="speaking"
                params={{ speed: 0.7 }}
                statePresets={{
                  idle: { speed: 0.5 },
                  thinking: { speed: 0.7 },
                  speaking: { speed: 0.9 },
                }}
                stateVolumes={{
                  idle: { input: 0, output: 0.2 },
                  thinking: { input: 0.1, output: 0.45 },
                  speaking: { input: 0.2, output: 0.8 },
                }}
                volumes={{ input: 0, output: 0.6 }}
                wrapper="ring"
                wrapperColor="currentColor"
                paused={false}
                pauseOffscreen
                maxDpr={1.5}
                ariaLabel="Assistant status"
                className="border-none"
              />
            )}

            {activeIndex === 2 && <LiveVoiceStream />}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export function VoiceSection() {
  const desktop = useMediaQuery('(min-width: 1024px)');
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="voice-agents" className="bg-background text-foreground relative py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="relative flex flex-col items-start gap-12 lg:flex-row lg:gap-16">
          <div className="w-full lg:w-1/2">
            {VOICE_STEPS.map((step, index) => (
              <StepTextItem key={step.id} step={step} index={index} setActiveIndex={setActiveIndex}>
                <div className="h-[460px] w-full overflow-hidden">{!desktop && <DynamicComponentSlot activeIndex={index} />}</div>
              </StepTextItem>
            ))}
          </div>
          <div className="sticky top-[calc(50vh-240px)] hidden h-[480px] w-1/2 lg:block">
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden backdrop-blur-md">{desktop && <DynamicComponentSlot activeIndex={activeIndex} />}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
