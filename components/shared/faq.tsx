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
              <div className="text-prominent inline-flex items-center gap-2 rounded-xl bg-[#0d4bfa]/10 px-3.5 py-1.5 text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px] dark:bg-[#0d4bfa]/15">
                <HelpCircle className="size-3.5 text-[#0d4bfa]" />
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
                      className={`rounded-xl px-4 py-2 text-xs font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] sm:text-[13px] ${
                        isActive
                          ? 'bg-[#0d4bfa] text-white'
                          : 'text-prominent border border-black/[0.08] bg-white hover:border-black/[0.16] hover:bg-[#F7F8FC] dark:border-white/10 dark:bg-[#0a0a0a] dark:hover:border-white/20 dark:hover:bg-[#121214]'
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="relative mt-10 overflow-hidden rounded-3xl border border-[#0d4bfa]/20 bg-white p-6 sm:p-8 dark:border-[#0d4bfa]/30 dark:bg-[#0a0a0a]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-4xl bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.09)_0%,rgba(13,75,250,0.03)_42%,transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.16)_0%,rgba(13,75,250,0.05)_42%,transparent_70%)]"
              />
              <div className="relative z-10">
                <h3 className="text-heading text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem]">
                  Got questions?
                </h3>
                <p className="text-secondary-copy mt-2 text-[15px] leading-[1.6] sm:text-base">
                  Can&#39;t find what you&#39;re looking for? Reach out — the team will read your message.
                </p>
                <a
                  href="/contact"
                  className="group text-heading mt-4 inline-flex items-center gap-2 rounded-xl text-xs font-semibold transition-all hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] sm:text-[13px]"
                >
                  <span>Contact us</span>
                  <ArrowRight className="size-3.5 text-[#0d4bfa] transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            {items.map((item, index) => {
              const isOpen = open === index;

              return (
                <div
                  key={item.q}
                  className={`relative overflow-hidden rounded-3xl transition-colors duration-300 ${
                    isOpen
                      ? 'border border-[#0d4bfa]/20 bg-white dark:border-[#0d4bfa]/30 dark:bg-[#0a0a0a]'
                      : 'border border-black/[0.07] bg-white hover:border-black/[0.15] hover:bg-[#F7F8FC] dark:border-white/[0.09] dark:bg-[#0a0a0a] dark:hover:border-white/[0.18] dark:hover:bg-[#121214]'
                  }`}
                >
                  {isOpen && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-4xl bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.08)_0%,rgba(13,75,250,0.025)_45%,transparent_72%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,rgba(13,75,250,0.16)_0%,rgba(13,75,250,0.05)_45%,transparent_72%)]"
                    />
                  )}
                  <button
                    type="button"
                    id={`faq-trigger-${groupId}-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${groupId}-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="relative z-10 flex w-full items-center justify-between gap-4 rounded-3xl p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] sm:p-6"
                  >
                    <span
                      className={`text-base leading-[1.5] font-medium sm:text-lg ${
                        isOpen ? 'text-heading' : 'text-prominent'
                      }`}
                    >
                      {item.q}
                    </span>
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-180 bg-[#0d4bfa]/15 text-[#0d4bfa] dark:bg-[#0d4bfa]/25'
                          : 'text-secondary-copy bg-[#F7F8FC] dark:bg-[#121214]'
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
                    className={`relative z-10 grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
