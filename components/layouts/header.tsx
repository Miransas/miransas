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
  // Header remains truly transparent while the homepage hero is behind it.
  // On other routes, and after the next section reaches the header, it floats.
  const [heroVisible, setHeroVisible] = useState(pathname === '/');
  const [mobilePath, setMobilePath] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const open = mobilePath === pathname;
  const headerRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    // NewHero must expose data-site-hero on its root <section>.
    // Do not use scrollY: a tall hero can be partially scrolled and still
    // occupy the space behind the header.
    if (pathname !== '/') return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.querySelector<HTMLElement>('[data-site-hero]');
      if (!hero) {
        setHeroVisible(false);
        return;
      }
      const headerHeight =
        headerRef.current?.querySelector<HTMLElement>('[data-header-content]')?.offsetHeight ?? 72;
      const rect = hero.getBoundingClientRect();
      // Only go opaque when the hero's bottom crosses the fixed header.
      const coversHeader = rect.top <= headerHeight && rect.bottom > headerHeight;
      setHeroVisible(coversHeader);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const overHero = pathname === '/' && heroVisible;
  const surfaced = !overHero || open;

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
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full"
    >
      {/* Surface changes shape only after the hero leaves the header area. */}
      <div
        data-header-surface
        className={cn(
          'pointer-events-auto mx-auto transition-[width,max-width,margin,background-color,border-radius,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
          surfaced
            ? 'mt-3 w-[calc(100%-1.5rem)] max-w-[1320px] rounded-4xl bg-background/90 shadow-[0_14px_48px_rgba(0,0,0,0.09)] backdrop-blur-2xl hover:shadow-[0_18px_55px_rgba(0,0,0,0.12)] dark:bg-[#121212]/90 dark:shadow-[0_14px_48px_rgba(0,0,0,0.34)]'
            : 'mt-0 w-full max-w-[100vw] rounded-none bg-transparent shadow-none backdrop-blur-none',
        )}
      >
      <div data-header-content className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
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
                    className={cn('inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-[background-color,color,transform] duration-300 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60', isOpen || isActive ? 'bg-secondary/70 text-foreground' : 'text-muted-foreground hover:bg-secondary/55 hover:text-foreground')}
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
                        <div className="rounded-3xl bg-popover/95 p-2 text-popover-foreground shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
                          {menu.items.map((item) => (
                            <Link key={item.label} href={item.href} onClick={() => setOpenMenu(null)} aria-current={pathname === item.href ? 'page' : undefined} className="block rounded-2xl px-3.5 py-3 transition-[background-color,transform] duration-200 hover:translate-x-0.5 hover:bg-secondary aria-[current=page]:bg-secondary">
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
          <Link href="/contact" className="hidden min-h-11 items-center rounded-full px-3 text-sm text-muted-foreground transition-colors duration-300 hover:bg-secondary/50 hover:text-foreground sm:inline-flex">
            Get in touch
          </Link>
          <Link href="/about" className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-3.5 text-xs font-medium text-primary-foreground transition-[transform,opacity,box-shadow] duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg sm:px-4">
            Get Started
            <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button ref={menuButtonRef} type="button" className="inline-flex size-11 items-center justify-center rounded-2xl bg-secondary/55 text-foreground transition-colors duration-300 hover:bg-secondary xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setMobilePath(open ? null : pathname)}>
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div ref={mobileRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation" data-lenis-prevent className="pointer-events-auto fixed inset-x-3 top-[calc(var(--header-h)+1.25rem)] h-[calc(100dvh-var(--header-h)-2rem)] overflow-y-auto overscroll-contain rounded-4xl bg-background/98 px-6 py-6 shadow-[0_24px_75px_rgba(0,0,0,0.2)] backdrop-blur-2xl xl:hidden" initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.18 }}>
            <div className="mb-8 flex items-center justify-between pb-5">
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
            <div className="mt-8 flex items-center justify-between py-5">
              <span className="text-muted-foreground text-sm">Appearance</span>
              <ModeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
