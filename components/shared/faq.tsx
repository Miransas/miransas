'use client';

import { useState } from 'react';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import { Reveal } from './reval';
import { groups } from '../../constants/faq';

type Group = keyof typeof groups;

export function Faq() {
  const [group, setGroup] = useState<Group>('General');
  const [open, setOpen] = useState<number | null>(0);
  const items = groups[group] || [];
  const groupId = group.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <section className="surface-page relative w-full py-24" id="faq">
      <div className="container-page">
        <Reveal className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="flex flex-col justify-between">
            <div>
              <div className="surface-blue-gradient text-prominent inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
                <HelpCircle className="size-3.5 text-[#3847ff]" />
                <span>FAQ</span>
              </div>
              <h2 className="text-heading mt-5 text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]">
                Answers to the questions that come up most.
              </h2>
              <p className="text-secondary-copy mt-5 text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]">
                Learn how Miransas works, what&#39;s included, and what to expect as the platform grows.
              </p>
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
                      className={`rounded-xl px-4 py-2 text-xs font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] sm:text-[13px] ${
                        isActive
                          ? 'bg-[#3847ff] text-white'
                          : 'surface-card hover:surface-card-elevated text-prominent'
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="surface-blue-gradient mt-10 rounded-3xl p-6 sm:p-8">
              <h3 className="text-heading text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem]">
                Got questions?
              </h3>
              <p className="text-secondary-copy mt-2 text-[15px] leading-[1.6] sm:text-base">
                Can&#39;t find what you&#39;re looking for? Reach out — the team will read your message.
              </p>
              <a
                href="/contact"
                className="group text-heading mt-4 inline-flex items-center gap-2 rounded-xl text-xs font-semibold transition-all hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] sm:text-[13px]"
              >
                <span>Contact us</span>
                <ArrowRight className="size-3.5 text-[#3847ff] transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            {items.map((item, index) => {
              const isOpen = open === index;

              return (
                <div
                  key={item.q}
                  className={`overflow-hidden rounded-3xl transition-all duration-300 ${
                    isOpen ? 'surface-blue-gradient' : 'surface-card hover-surface-blue-gradient'
                  }`}
                >
                  <button
                    type="button"
                    id={`faq-trigger-${groupId}-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${groupId}-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 rounded-3xl p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] sm:p-6"
                  >
                    <span
                      className={`text-base leading-[1.5] font-medium sm:text-lg ${
                        isOpen ? 'text-heading' : 'text-prominent'
                      }`}
                    >
                      {item.q}
                    </span>
                    <div
                      className={`surface-card-elevated flex size-8 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#3847ff]' : 'text-secondary-copy'
                      }`}
                    >
                      <ChevronDown className="size-4" />
                    </div>
                  </button>

                  <div
                    id={`faq-answer-${groupId}-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${groupId}-${index}`}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-prominent px-5 pb-6 text-[15px] leading-[1.6] sm:px-6 sm:text-base">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
