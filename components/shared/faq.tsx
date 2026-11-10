/*
 Copy Right Miransas
*/

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import { Reveal } from './reval';
import { groups } from '../../constants/faq';

type Group = keyof typeof groups;

export function Faq() {
  const [group, setGroup] = useState<Group>('General');
  const [open, setOpen] = useState<number | null>(0);
  const items = groups[group] || [];
  const groupId = group.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <section className="bg-background relative w-full py-24" id="faq">
      <div className="container-page">
        <Reveal className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="flex flex-col justify-between">
            <div>
              <div className="border-border bg-card/60 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs backdrop-blur-md">
                <HelpCircle className="text-primary size-3.5" />
                <span>FAQ</span>
              </div>
              <h2 className="text-foreground mt-4 text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl md:text-5xl">Answers to the questions that come up most.</h2>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">Learn how Miransas works, what&#39;s included, and what to expect as the platform grows.</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {(Object.keys(groups) as Group[]).map((key) => {
                  const isActive = group === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setGroup(key);
                        setOpen(0);
                      }}
                      className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${isActive ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="border-border bg-card mt-10 rounded-2xl border p-6 shadow-sm backdrop-blur-xl">
              <h3 className="text-foreground text-base font-semibold">Got questions?</h3>
              <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed sm:text-sm">Can&#39;t find what you&#39;re looking for? Reach out — the team will read your message.</p>
              <a href="/contact" className="group text-primary mt-4 inline-flex items-center gap-2 text-xs font-semibold transition-all hover:underline">
                <span>Contact us</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {items.map((item, index) => {
              const isOpen = open === index;

              return (
                <div key={item.q} className="border-border bg-card hover:border-border overflow-hidden rounded-4xl  backdrop-blur-md transition-colors">
                  <button type="button" id={`faq-trigger-${groupId}-${index}`} aria-expanded={isOpen} aria-controls={`faq-answer-${groupId}-${index}`} onClick={() => setOpen(isOpen ? null : index)} className="hover:bg-secondary/40 flex w-full items-center rounded-4xl justify-between gap-4 p-5 text-left transition-colors sm:p-6">
                    <span className="text-foreground text-sm leading-snug font-medium sm:text-base">{item.q}</span>
                    <div className={`bg-background flex size-7 shrink-0 items-center justify-center rounded-4xl transition-transform duration-200 ${isOpen ? 'border-primary/50 text-foreground rotate-180' : 'text-muted-foreground'}`}>
                      <ChevronDown className="size-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={`faq-answer-${groupId}-${index}`} role="region" aria-labelledby={`faq-trigger-${groupId}-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }}>
                        <div className="text-muted-foreground px-5 pb-6 text-xs leading-relaxed sm:px-6 sm:text-sm">{item.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
