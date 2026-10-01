/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowRight, ChevronDown, Menu, X, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { HEADER_MENU } from "@/constants/navbar";
import { cn } from "@/lib/utils";
import { GlowButton } from "../ui/glow-button";
import { ModeToggle } from "../provider/mode-toggle";

const EXTERNAL_LINKS = {
  sales: "https://console.example.com/studio",
  tryFree: "https://console.example.com/auth",
};

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50  transition-all duration-300",
        scrolled
          ? " bg-background/80 backdrop-blur-xl shadow-2xl"
          : "bg-background/40 backdrop-blur-md",
        open && "bg-background backdrop-blur-none"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-8">
        
        {/* Sol Taraf: Logo ve Navigasyon */}
        <div className="flex items-center gap-8 lg:gap-10">
          <Link
            href="/"
            className="flex items-center shrink-0 transition-transform active:scale-95 hover:opacity-90"
            aria-label="Home"
          >
            <img
              src="/icons/logo.png"
              alt="Logo"
              className="h-12 w-auto object-contain "
            />
          </Link>

          {/* Masaüstü Navigasyon */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {HEADER_MENU.map((menu) => {
              const isOpen = openMenu === menu.label;

              return (
                <div
                  key={menu.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(menu.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none",
                      isOpen
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    )}
                    aria-expanded={isOpen}
                    onClick={() => setOpenMenu(isOpen ? null : menu.label)}
                  >
                    <span>{menu.label}</span>
                    <ChevronDown
                      className={cn(
                        "size-3.5 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-180 text-foreground"
                      )}
                    />
                  </button>

                  {/* Dropdown Menü */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-0 top-full pt-2 w-80 z-50"
                      >
                        <div className="overflow-hidden rounded-2xl border border-border bg-card/95 p-2 shadow-2xl backdrop-blur-2xl">
                          {menu.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="group block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-secondary"
                            >
                              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                {item.label}
                              </p>
                              {"hint" in item && (
                                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                                  {item.hint}
                                </p>
                              )}
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

        {/* Sağ Taraf: Aksiyon Butonları */}
        <div className="flex items-center gap-3">
          {/* <ModeToggle/> */}
          <Link
            href={EXTERNAL_LINKS.sales}
            className="group hidden items-center gap-2 rounded-full border border-border bg-secondary/80 px-4 h-9 text-xs font-medium text-foreground transition-all hover:border-primary/50 hover:bg-secondary sm:inline-flex"
          >
            <span>Get in touch</span>
            <ArrowRight className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>

          <GlowButton size="sm" href="/about">
            Get Started
          </GlowButton>

          {/* Mobil Menü Butonu */}
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((val) => !val)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobil Menü Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-background px-6 py-8 lg:hidden border-t border-border"
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-8" aria-label="Mobile">
              {HEADER_MENU.map((menu) => (
                <div key={menu.label}>
                  <p className="mb-3 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    {menu.label}
                  </p>
                  <div className="flex flex-col gap-1 pl-2 border-l border-border">
                    {menu.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary"
                        onClick={() => setOpen(false)}
                      >
                        <span className="block text-base font-medium text-foreground">
                          {item.label}
                        </span>
                        {"hint" in item && (
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {item.hint}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t border-border flex flex-col gap-3">
                <GlowButton href={EXTERNAL_LINKS.tryFree} size="lg" className="w-full">
                  Get Started
                </GlowButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}