'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Layers,
  Mail,
  Newspaper,
  Plus,
  Terminal,
  type LucideIcon,
} from 'lucide-react';
import { SUPPORT_FAQ_ITEMS } from '@/lib/support-faq';

type QuickLink = {
  title: string;
  label: string;
  href: string;
  external?: boolean;
  icon: LucideIcon;
};

const QUICK_LINKS: QuickLink[] = [
  {
    title: 'Check if our services are running',
    label: 'status.miransas.com',
    href: 'https://status.miransas.com',
    external: true,
    icon: Activity,
  },
  {
    title: 'Use Binboi',
    label: 'binboi.com',
    href: 'https://binboi.com',
    external: true,
    icon: Terminal,
  },
  {
    title: 'Learn about Miralas',
    label: 'Miralas Overview',
    href: '/projects#miralas',
    icon: Layers,
  },
  {
    title: 'Read product updates',
    label: 'Miransas News',
    href: '/news',
    icon: Newspaper,
  },
  {
    title: 'Reach the team',
    label: 'Contact',
    href: '/contact',
    icon: Mail,
  },
];

const SUPPORT_CHECKLIST = [
  'Which product you are using.',
  'What you expected to happen and what happened instead.',
  'Screenshots or error messages, if you have them.',
  'Your browser or operating system, for website problems.',
];

export function SupportView() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#EFEFEF] pt-16 pb-24 text-[#1d1d1f] md:pt-24 md:pb-32 dark:bg-[#050505] dark:text-white">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Hero */}
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2.5">
            <span aria-hidden className="size-1.5 rounded-xl bg-[#0d4bfa]" />
            <span className="text-xs font-medium tracking-[0.12em] text-neutral-700 uppercase sm:text-[13px] dark:text-[#D1D1D1]">
              SUPPORT
            </span>
          </div>

          <h1 className="mt-4 text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-5xl lg:text-[4rem] dark:text-white">
            Answers, status, and direct help.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-[1.6] text-neutral-600 sm:text-lg dark:text-[#6E6E74]">
            Check service status, explore common questions about Miralas and our
            research, or see what to include when reaching out.
          </p>
        </header>

        {/* Quick Links */}
        <section aria-labelledby="quick-links" className="mt-14 md:mt-18">
          <div className="mb-7">
            <span className="text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase dark:text-[#6E6E74]">
              Shortcuts
            </span>
            <h2
              id="quick-links"
              className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#1d1d1f] sm:text-3xl dark:text-white"
            >
              Quick links
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {QUICK_LINKS.map((item) => {
              const Icon = item.icon;
              const classes =
                'group flex flex-col justify-between rounded-3xl bg-white p-6 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#F7F8FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:bg-[#000103] dark:hover:bg-[#03050d]';

              const inner = (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-[#0d4bfa]/10 text-[#0d4bfa] dark:bg-[#0d4bfa]/15 dark:text-[#6b93ff]">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <ArrowUpRight
                      className="size-4 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0d4bfa] dark:text-[#6E6E74]"
                      aria-hidden
                    />
                  </div>

                  <div className="mt-6">
                    <p className="text-sm leading-snug text-neutral-600 dark:text-[#6E6E74]">
                      {item.title}
                    </p>
                    <span className="mt-2 block text-sm font-semibold text-[#1d1d1f] dark:text-[#D1D1D1]">
                      {item.label}
                    </span>
                  </div>
                </>
              );

              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes}
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <Link key={item.label} href={item.href} className={classes}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Borderless FAQ Accordion */}
        <section aria-labelledby="support-faq" className="mt-16 md:mt-24">
          <div className="mb-8 max-w-2xl">
            <span className="text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase dark:text-[#6E6E74]">
              FAQ
            </span>
            <h2
              id="support-faq"
              className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#1d1d1f] sm:text-4xl dark:text-white"
            >
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-3">
            {SUPPORT_FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              const triggerId = `support-faq-trigger-${item.id}`;
              const panelId = `support-faq-panel-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl transition-colors duration-300 ${
                    isOpen
                      ? 'bg-[radial-gradient(125%_115%_at_100%_0%,rgba(13,75,250,0.12)_0%,#FFFFFF_68%)] dark:bg-[radial-gradient(125%_115%_at_0%_0%,rgba(13,75,250,0.26)_0%,#000103_68%)]'
                      : 'bg-white hover:bg-[#F7F8FC] dark:bg-[#000103] dark:hover:bg-[#03050d]'
                  }`}
                >
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 rounded-3xl px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] md:px-8 md:py-6"
                  >
                    <span
                      className={`text-base font-medium tracking-[-0.01em] transition-colors sm:text-lg ${
                        isOpen
                          ? 'text-[#1d1d1f] dark:text-white'
                          : 'text-neutral-800 dark:text-[#D1D1D1]'
                      }`}
                    >
                      {item.question}
                    </span>

                    <span
                      aria-hidden
                      className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                        isOpen
                          ? 'bg-[#0d4bfa]/15 text-[#0d4bfa] dark:bg-[#0d4bfa]/25 dark:text-[#89abff]'
                          : 'bg-black/[0.05] text-neutral-600 dark:bg-white/[0.06] dark:text-[#D1D1D1]'
                      }`}
                    >
                      <Plus
                        className={`size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[15px] leading-[1.68] text-neutral-600 sm:text-base md:px-8 md:pb-7 dark:text-[#D1D1D1]">
                        {item.segments.map((seg, sIdx) => {
                          if (seg.type === 'text') {
                            return <span key={sIdx}>{seg.value}</span>;
                          }
                          if (seg.external) {
                            return (
                              <a
                                key={sIdx}
                                href={seg.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-xl font-medium text-[#0d4bfa] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:text-[#6b93ff]"
                              >
                                {seg.text}
                              </a>
                            );
                          }
                          return (
                            <Link
                              key={sIdx}
                              href={seg.href}
                              className="rounded-xl font-medium text-[#0d4bfa] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa] dark:text-[#6b93ff]"
                            >
                              {seg.text}
                            </Link>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contacting Support + Warning & Response Times */}
        <section className="mt-16 grid grid-cols-1 gap-5 md:mt-24 lg:grid-cols-12">
          {/* Left: Checklist */}
          <article className="rounded-4xl bg-white p-8 md:p-10 lg:col-span-7 dark:bg-[#000103]">
            <span className="text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase dark:text-[#6E6E74]">
              Checklist
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#1d1d1f] sm:text-3xl dark:text-white">
              Contacting support
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-neutral-600 dark:text-[#6E6E74]">
              When you write, include:
            </p>

            <ol className="mt-6 space-y-3">
              {SUPPORT_CHECKLIST.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-4 rounded-xl bg-[#EFEFEF]/70 p-4 dark:bg-[#050505]"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-[#0d4bfa]/12 font-mono text-xs font-semibold text-[#0d4bfa] dark:bg-[#0d4bfa]/20 dark:text-[#89abff]">
                    0{i + 1}
                  </span>
                  <span className="pt-0.5 text-[15px] leading-[1.55] text-neutral-800 dark:text-[#D1D1D1]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-7">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0d4bfa] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4bfa]"
              >
                <span>Go to Contact page</span>
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          </article>

          {/* Right: Security Callout + Response Times */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            <article className="rounded-4xl bg-[radial-gradient(120%_110%_at_100%_0%,rgba(245,158,11,0.14)_0%,#FFFFFF_70%)] p-8 dark:bg-[radial-gradient(120%_110%_at_0%_0%,rgba(245,158,11,0.16)_0%,#000103_70%)]">
              <span className="flex size-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-white">
                Protect your credentials
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.65] text-neutral-700 dark:text-[#D1D1D1]">
                Never send passwords, API keys, or tokens in a message. If you
                shared one by mistake, tell us and rotate it right away.
              </p>
            </article>

            <article className="flex flex-1 flex-col justify-between rounded-4xl bg-[radial-gradient(125%_115%_at_100%_0%,rgba(13,75,250,0.12)_0%,#FFFFFF_68%)] p-8 dark:bg-[radial-gradient(125%_115%_at_0%_0%,rgba(13,75,250,0.26)_0%,#000103_68%)]">
              <div>
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#0d4bfa]/12 text-[#0d4bfa] dark:bg-[#0d4bfa]/20 dark:text-[#89abff]">
                  <Clock className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-white">
                  Response times
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-neutral-700 dark:text-[#D1D1D1]">
                  We are a small team. We read every message, and product and
                  security issues come first, but we cannot promise a reply time
                  for each one.
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
