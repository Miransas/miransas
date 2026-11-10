/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Link from 'next/link';
import { useEffect, useState, type MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FOOTER_NAV, SOCIAL_LINKS } from '@/constants/footer';
import { AvatarGroupDemo } from '../shared/avatar-grup';

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
    <footer className="border-border bg-background text-foreground relative w-full overflow-hidden border-t">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-20 lg:px-12">
        <div className="flex flex-col justify-between gap-12 xl:flex-row xl:gap-16">
          <div className="flex w-full max-w-sm shrink-0 flex-col xl:max-w-[260px]">
            {/* Logo */}
            <Link href="/" className="mb-4 inline-flex items-center gap-3 transition-opacity hover:opacity-80" aria-label="Miransas home">
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
              <span className="text-foreground text-xl font-bold tracking-tight">Miransas</span>
            </Link>

            {/* Açıklama (Çift yazım düzeltildi) */}
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">Building next-generation voice AI and real-time audio intelligence infrastructure for modern applications.</p>

            {/* Sosyal İkonlar */}
            <div className="mb-8 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="border-border bg-card text-muted-foreground hover:border-input hover:bg-secondary hover:text-foreground flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200">
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>

            {/* Topluluk Rozeti */}
            <div className="border-border bg-card/70 flex w-fit items-center gap-3 rounded-2xl border p-3 backdrop-blur-sm">
              <AvatarGroupDemo />
              <div className="text-xs">
                <p className="text-foreground font-medium">Engineering & voice</p>
                <p className="text-muted-foreground">Building with Miransas</p>
              </div>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────
              SAĞ TARAF: NAVİGASYON KOLONLARI
          ─────────────────────────────────────────────────── */}
          <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-5">
            {FOOTER_NAV.map((column) => (
              <div key={column.title}>
                <h3 className="text-foreground mb-5 text-sm font-semibold tracking-wide">{column.title}</h3>

                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {'isExternal' in link ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors duration-200">
                          <span>{link.label}</span>
                          <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : (
                        <Link href={link.href} onClick={(e) => handleAnchorClick(e, link.href)} className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200">
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

        {/* ───────────────────────────────────────────────────
            ALT ÇİZGİ, TELİF HAKKI, SAAT VE BİLDİRİM
        ─────────────────────────────────────────────────── */}
        <div className="border-border text-muted-foreground mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs md:flex-row">
          {/* Sol Kısım: Telif Hakkı ve Canlı Saat */}
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <p>© {currentYear} Miransas. All rights reserved.</p>

            <span className="hidden h-1 w-1 rounded-full bg-stone-600 md:block"></span>
            <p className="text-muted-foreground flex items-center gap-2 font-mono">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formattedTime}
            </p>
          </div>

          {/* Sağ Kısım: Sistem Durumu Rozeti (Çift yazı düzeltildi) */}
          <a href="https://status.miransas.com" target="_blank" rel="noopener noreferrer" className="border-border bg-card text-muted-foreground hover:bg-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors">
            <span className="h-2 w-2 rounded-full bg-stone-500" />
            <span className="font-medium">System status</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
