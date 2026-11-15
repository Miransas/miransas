/* eslint-disable @next/next/no-img-element */
'use client';

import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { HEADER_MENU } from '@/constants/navbar';
import { cn } from '@/lib/utils';
import { ModeToggle } from '../provider/mode-toggle';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PILL_SPRING: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 34,
  mass: 0.7,
};

export function SiteHeader() {
  const pathname = usePathname();
  // Header remains truly transparent while the homepage hero is behind it.
  const [heroVisible, setHeroVisible] = useState(pathname === '/');
  const [mobilePath, setMobilePath] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const open = mobilePath === pathname;
  const headerRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
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
        headerRef.current?.querySelector<HTMLElement>('[data-header-content]')
          ?.offsetHeight ?? 72;
      const rect = hero.getBoundingClientRect();
      // Only go opaque when the hero's bottom crosses the fixed header.
      const coversHeader =
        rect.top <= headerHeight && rect.bottom > headerHeight;
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
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const activeDropdown = headerRef.current?.querySelector<HTMLButtonElement>(
        '[data-nav-trigger][aria-expanded="true"]',
      );
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
    const focusable = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      );
    focusable()[0]?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = focusable();
      const first = items[0];
      const last = items.at(-1);
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          !panel?.contains(document.activeElement))
      ) {
        event.preventDefault();
        last?.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !panel?.contains(document.activeElement))
      ) {
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
      {/* Küçülme/daralma olmadan tam genişlikte kalan, sadece yüzey dokusu değişen bar */}
      <div
        data-header-surface
        className={cn(
          'pointer-events-auto w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
          surfaced
            ? 'border-border/50 bg-background/82 shadow-[0_10px_36px_rgba(0,0,0,0.05)] backdrop-blur-2xl dark:border-white/[0.07] dark:bg-[#08080a]/82 dark:shadow-[0_12px_40px_rgba(0,0,0,0.38)]'
            : 'border-transparent bg-transparent shadow-none backdrop-blur-none',
        )}
      >
        <div
          data-header-content
          className="container-page flex h-[var(--header-h)] mx-auto items-center justify-between gap-4"
        >
          <div className="flex min-w-0 items-center gap-6">
            <Link
              href="/"
              aria-label="Miransas home"
              className="transition-opacity duration-300 hover:opacity-85"
            >
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

            <nav
              className="hidden items-center gap-1 xl:flex"
              aria-label="Primary"
              onMouseLeave={() => setHoveredMenu(null)}
            >
              {HEADER_MENU.map((menu) => {
                const isOpen = openMenu === menu.label;
                const isActive = menu.items.some(
                  (item) =>
                    item.href.startsWith('/') &&
                    pathname === item.href.replace(/\/$/, ''),
                );
                const showPill =
                  hoveredMenu === menu.label ||
                  (hoveredMenu === null && (isOpen || isActive));
                const id = `nav-${menu.label.toLowerCase()}`;

                return (
                  <div
                    key={menu.label}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredMenu(menu.label);
                      setOpenMenu(menu.label);
                    }}
                    onMouseLeave={(event) => {
                      if (
                        !event.currentTarget.contains(document.activeElement)
                      ) {
                        setOpenMenu(null);
                      }
                    }}
                    onBlur={(event) => {
                      if (
                        !event.currentTarget.contains(
                          event.relatedTarget as Node,
                        )
                      ) {
                        setOpenMenu(null);
                      }
                    }}
                  >
                    <button
                      type="button"
                      data-nav-trigger
                      className={cn(
                        'relative inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60',
                        isOpen || isActive || hoveredMenu === menu.label
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                      aria-expanded={isOpen}
                      aria-controls={id}
                      onClick={() => setOpenMenu(isOpen ? null : menu.label)}
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowDown') {
                          event.preventDefault();
                          setOpenMenu(menu.label);
                          requestAnimationFrame(() =>
                            document
                              .getElementById(id)
                              ?.querySelector<HTMLAnchorElement>('a')
                              ?.focus(),
                          );
                        }
                      }}
                    >
                      {showPill && (
                        <motion.span
                          layoutId="header-nav-pill"
                          transition={reduce ? { duration: 0 } : PILL_SPRING}
                          className="absolute inset-0 -z-10 rounded-full bg-secondary/75 dark:bg-white/[0.07]"
                        />
                      )}
                      <span className="relative z-10">{menu.label}</span>
                      <ChevronDown
                        aria-hidden
                        className={cn(
                          'relative z-10 size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                          isOpen && 'rotate-180',
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={id}
                          initial={
                            reduce
                              ? false
                              : {
                                opacity: 0,
                                y: 8,
                                scale: 0.97,
                                filter: 'blur(4px)',
                              }
                          }
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: 'blur(0px)',
                          }}
                          exit={
                            reduce
                              ? { opacity: 0 }
                              : {
                                opacity: 0,
                                y: 4,
                                scale: 0.985,
                                filter: 'blur(2px)',
                              }
                          }
                          transition={{
                            duration: reduce ? 0 : 0.24,
                            ease: EASE_OUT_EXPO,
                          }}
                          className="absolute top-full left-0 z-50 w-76 origin-top-left pt-2.5"
                        >
                          <div className="rounded-3xl border border-border/60 bg-popover/95 p-2 text-popover-foreground shadow-[0_24px_64px_rgba(0,0,0,0.14)] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#0d0d10]/95 dark:shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
                            {menu.items.map((item, idx) => (
                              <motion.div
                                key={item.label}
                                initial={
                                  reduce ? false : { opacity: 0, y: 4 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: reduce ? 0 : 0.2,
                                  delay: reduce ? 0 : idx * 0.025,
                                  ease: EASE_OUT_EXPO,
                                }}
                              >
                                <Link
                                  href={item.href}
                                  onClick={() => setOpenMenu(null)}
                                  aria-current={
                                    pathname === item.href ? 'page' : undefined
                                  }
                                  className="group/item block rounded-2xl px-3.5 py-3 transition-colors duration-200 hover:bg-secondary/80 aria-[current=page]:bg-secondary dark:hover:bg-white/[0.06]"
                                >
                                  <span className="flex items-center justify-between text-sm font-medium text-foreground">
                                    {item.label}
                                    <ArrowRight
                                      aria-hidden
                                      className="size-3.5 -translate-x-1 opacity-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:translate-x-0 group-hover/item:opacity-60"
                                    />
                                  </span>
                                  {'hint' in item && (
                                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                                      {item.hint}
                                    </span>
                                  )}
                                </Link>
                              </motion.div>
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
            <Link
              href="/contact"
              className="hidden min-h-10 items-center rounded-full px-3.5 text-sm text-muted-foreground transition-colors duration-200 hover:bg-secondary/60 hover:text-foreground sm:inline-flex dark:hover:bg-white/[0.06]"
            >
              Get in touch
            </Link>
            <Link
              href="/about"
              className="group inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground transition-[transform,opacity,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-92 hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)] active:scale-[0.98]"
            >
              Get Started
              <ArrowRight
                aria-hidden
                className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
              />
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-2xl bg-secondary/55 text-foreground transition-colors duration-200 hover:bg-secondary xl:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setMobilePath(open ? null : pathname)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={reduce ? false : { rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                  >
                    <X aria-hidden className="size-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={reduce ? false : { rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                  >
                    <Menu aria-hidden className="size-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={mobileRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            data-lenis-prevent
            className="pointer-events-auto fixed inset-x-0 top-[var(--header-h)] h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain border-t border-border/50 bg-background/96 px-6 py-6 shadow-[0_24px_75px_rgba(0,0,0,0.2)] backdrop-blur-2xl xl:hidden dark:border-white/[0.07] dark:bg-[#08080a]/96"
            initial={
              reduce ? false : { opacity: 0, y: -12, filter: 'blur(6px)' }
            }
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: -8, filter: 'blur(4px)' }
            }
            transition={{ duration: reduce ? 0 : 0.28, ease: EASE_OUT_EXPO }}
          >
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-8 flex items-center justify-between border-b border-border/50 pb-5 dark:border-white/[0.07]">
                <span className="text-sm font-medium">Navigation</span>
                <button
                  type="button"
                  onClick={() => {
                    setMobilePath(null);
                    menuButtonRef.current?.focus();
                  }}
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm transition-colors hover:bg-secondary"
                >
                  Close
                  <X aria-hidden className="size-4" />
                </button>
              </div>
              <nav className="grid gap-8 sm:grid-cols-2" aria-label="Mobile">
                {HEADER_MENU.map((menu, menuIdx) => (
                  <motion.div
                    key={menu.label}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.24,
                      delay: reduce ? 0 : menuIdx * 0.04,
                      ease: EASE_OUT_EXPO,
                    }}
                  >
                    <p className="mb-2 font-mono text-xs tracking-wider text-muted-foreground uppercase">
                      {menu.label}
                    </p>
                    <div className="flex flex-col">
                      {menu.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          aria-current={
                            pathname === item.href ? 'page' : undefined
                          }
                          className="rounded-xl px-3 py-3 transition-colors hover:bg-secondary aria-[current=page]:bg-secondary"
                          onClick={() => setMobilePath(null)}
                        >
                          <span className="block text-base font-medium">
                            {item.label}
                          </span>
                          {'hint' in item && (
                            <span className="mt-1 block text-xs text-muted-foreground">
                              {item.hint}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-8 flex items-center justify-between border-t border-border/50 py-5 dark:border-white/[0.07]">
                <span className="text-sm text-muted-foreground">
                  Appearance
                </span>
                <ModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}