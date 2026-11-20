/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Link from 'next/link';
import { useEffect, useState, type MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FOOTER_NAV, SOCIAL_LINKS } from '@/constants/footer';

export function SiteFooter() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentYear = currentTime ? Number(currentTime.toLocaleDateString('en-US', { timeZone: 'Europe/Istanbul', year: 'numeric' })) : new Date().getFullYear();
  const formattedTime = currentTime ? currentTime.toLocaleTimeString('en-GB', { timeZone: 'Europe/Istanbul' }) + ' TRT' : '--:--:--';

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('/#') || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const targetId = href.replace('/#', '');
    const element = document.getElementById(targetId);

    if (!element) return;

    e.preventDefault();
    element.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    });

    window.history.pushState(null, '', href);
  };

  return (
    <footer className="surface-page text-foreground relative w-full overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-20 lg:px-12">
        <div className="flex flex-col justify-between gap-12 xl:flex-row xl:gap-16">
          <div className="flex w-full max-w-sm shrink-0 flex-col xl:max-w-[260px]">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-3 rounded-xl transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
              aria-label="Miransas home"
            >
              <span className="shrink-0">
                <img
                  src="/icons/logo-dark.png"
                  alt="Miransas"
                  width={44}
                  height={44}
                  className="block size-11 object-contain dark:hidden"
                />

                <img
                  src="/icons/logo-white.png"
                  alt="Miransas"
                  width={44}
                  height={44}
                  className="hidden size-11 object-contain dark:block"
                />
              </span>
              <span className="text-heading text-xl font-semibold tracking-tight">Miransas</span>
            </Link>

            <p className="text-secondary-copy mb-6 text-[15px] leading-[1.6] sm:text-base">
              Building voice AI, researching Uzbek speech and developing the infrastructure behind them.
            </p>

            <div className="mb-8 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="surface-card hover-surface-blue-gradient text-prominent hover:text-heading flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-5">
            {FOOTER_NAV.map((column) => (
              <div key={column.title}>
                <h3 className="text-heading mb-5 text-sm font-semibold tracking-wide">{column.title}</h3>

                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {'isExternal' in link ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group text-secondary-copy hover:text-prominent inline-flex items-center gap-1 rounded-xl text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="text-secondary-copy group-hover:text-prominent size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={(e) => handleAnchorClick(e, link.href)}
                          className="text-secondary-copy hover:text-prominent rounded-xl text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="text-secondary-copy mt-16 flex flex-col items-center justify-between gap-4 pt-8 text-xs md:flex-row">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <p className="text-secondary-copy text-xs leading-[1.45] sm:text-[13px]">© {currentYear} Miransas. All rights reserved.</p>

            <span className="hidden h-1 w-1 rounded-xl bg-[#3847ff] md:block" />
            <p className="text-secondary-copy flex items-center gap-2 font-mono text-xs leading-[1.45] sm:text-[13px]">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formattedTime}
            </p>
          </div>

          <a
            href="https://status.miransas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="surface-card hover-surface-blue-gradient text-prominent inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs leading-[1.45] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] sm:text-[13px]"
          >
            <span className="h-2 w-2 rounded-xl bg-[#3847ff]" />
            <span className="font-medium">System status</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
