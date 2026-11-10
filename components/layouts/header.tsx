/* eslint-disable @next/next/no-img-element */
'use client';

import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { HEADER_MENU } from '@/constants/navbar';
import { cn } from '@/lib/utils';
import { ModeToggle } from '../provider/mode-toggle';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobilePath, setMobilePath] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const open = mobilePath === pathname;
  const headerRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const activeDropdown = headerRef.current?.querySelector<HTMLButtonElement>('[data-nav-trigger][aria-expanded="true"]');
      setOpenMenu(null);
      activeDropdown?.focus();
      if (open) {
        setMobilePath(null);
        menuButtonRef.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 1280) setMobilePath(null);
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', escape);
    window.addEventListener('resize', resize);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', escape);
      window.removeEventListener('resize', resize);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = mobileRef.current;
    const focusable = () => Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusable()[0]?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = focusable();
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && (document.activeElement === first || !panel?.contains(document.activeElement))) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !panel?.contains(document.activeElement))) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', trapFocus);
    };
  }, [open]);

  return (
    <header ref={headerRef} className={cn('fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300', scrolled ? 'border-border bg-background/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] backdrop-blur-xl' : 'bg-background/60 border-transparent backdrop-blur-md', open && 'bg-background')}>
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-6">
          <Link href="/" aria-label="Miransas home">
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
          </Link>
          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {HEADER_MENU.map((menu) => {
              const isOpen = openMenu === menu.label;
              const isActive = menu.items.some((item) => item.href.startsWith('/') && pathname === item.href.replace(/\/$/, ''));
              const id = `nav-${menu.label.toLowerCase()}`;
              return (
                <div
                  key={menu.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(menu.label)}
                  onMouseLeave={(event) => {
                    if (!event.currentTarget.contains(document.activeElement)) setOpenMenu(null);
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpenMenu(null);
                  }}
                >
                  <button
                    type="button"
                    data-nav-trigger
                    className={cn('inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors', isOpen || isActive ? 'bg-secondary/70 text-foreground' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground')}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpenMenu(isOpen ? null : menu.label)}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        setOpenMenu(menu.label);
                        requestAnimationFrame(() => document.getElementById(id)?.querySelector<HTMLAnchorElement>('a')?.focus());
                      }
                    }}
                  >
                    {menu.label}
                    <ChevronDown aria-hidden className={cn('size-3.5 transition-transform', isOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div id={id} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.16 }} className="absolute top-full left-0 z-50 w-72 pt-2">
                        <div className="border-border bg-popover text-popover-foreground rounded-2xl border p-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                          {menu.items.map((item) => (
                            <Link key={item.label} href={item.href} onClick={() => setOpenMenu(null)} aria-current={pathname === item.href ? 'page' : undefined} className="hover:bg-secondary aria-[current=page]:bg-secondary block rounded-lg px-3.5 py-3 transition-colors">
                              <span className="block text-sm font-medium">{item.label}</span>
                              {'hint' in item && <span className="text-muted-foreground mt-1 block text-xs leading-relaxed">{item.hint}</span>}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ModeToggle />
          <Link href="/contact" className="text-muted-foreground hover:text-foreground hidden min-h-11 items-center px-3 text-sm transition-colors sm:inline-flex">
            Get in touch
          </Link>
          <Link href="/about" className="group bg-primary text-primary-foreground inline-flex min-h-11 items-center gap-2 rounded-lg px-3.5 text-xs font-medium transition-opacity hover:opacity-85 sm:px-4">
            Get Started
            <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button ref={menuButtonRef} type="button" className="border-border bg-card text-foreground hover:bg-secondary inline-flex size-11 items-center justify-center rounded-xl border xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setMobilePath(open ? null : pathname)}>
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div ref={mobileRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation" data-lenis-prevent className="border-border bg-background fixed inset-x-0 top-[var(--header-h)] h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain border-t px-6 py-6 xl:hidden" initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.18 }}>
            <div className="border-border mb-8 flex items-center justify-between border-b pb-5">
              <span className="text-sm font-medium">Navigation</span>
              <button
                type="button"
                onClick={() => {
                  setMobilePath(null);
                  menuButtonRef.current?.focus();
                }}
                className="hover:bg-secondary inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm"
              >
                Close
                <X aria-hidden className="size-4" />
              </button>
            </div>
            <nav className="grid gap-8 sm:grid-cols-2" aria-label="Mobile">
              {HEADER_MENU.map((menu) => (
                <div key={menu.label}>
                  <p className="text-muted-foreground mb-2 font-mono text-xs tracking-wider uppercase">{menu.label}</p>
                  <div className="flex flex-col">
                    {menu.items.map((item) => (
                      <Link key={item.label} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} className="hover:bg-secondary aria-[current=page]:bg-secondary rounded-lg px-3 py-3" onClick={() => setMobilePath(null)}>
                        <span className="block text-base font-medium">{item.label}</span>
                        {'hint' in item && <span className="text-muted-foreground mt-1 block text-xs">{item.hint}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            <div className="border-border mt-8 flex items-center justify-between border-t py-5">
              <span className="text-muted-foreground text-sm">Appearance</span>
              <ModeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
