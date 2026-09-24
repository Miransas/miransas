"use client";

import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { HEADER_MENU } from "@/constants";
import { cn } from "@/lib/utils";

import { GlowButton } from "../ui/glow-button";

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
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300",
        scrolled
          ? "border-border/40 bg-bg/80 backdrop-blur-xl shadow-md"
          : "bg-bg/40 backdrop-blur-md",
        open && "bg-bg backdrop-blur-none"
      )}
    >
      <div className="container-page flex h-16 md:h-16 items-center justify-between gap-8 px-4 md:px-8">
        {/* Sol Taraf: Logo ve Navigasyon */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="flex items-center shrink-0 transition-transform active:scale-95 hover:opacity-90"
            aria-label="Home"
          >
            <img
              src="/icons/logo.png"
              alt="Logo"
              className="w-14 object-contain block"
            />
          </Link>

          {/* Masaüstü Navigasyon */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
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
                    className="inline-flex items-center gap-1.5 text-sm md:text-[15px] font-medium text-fg/80 transition-colors hover:text-fg focus-visible:outline-none"
                    aria-expanded={isOpen}
                    onClick={() => setOpenMenu(isOpen ? null : menu.label)}
                  >
                    {menu.label}
                    <ChevronDown className={cn("size-4 text-fg/60 transition-transform duration-200", isOpen && "rotate-180 text-fg")} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full pt-3"
                      >
                        <div className="w-80 rounded-2xl border border-border/60 bg-bg/95 p-2 shadow-2xl backdrop-blur-2xl">
                          {menu.items.map((item) => (
                            <Link key={item.label} href={item.href} className="block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-fg/5">
                              <p className="text-sm font-semibold text-fg">{item.label}</p>
                              {"hint" in item && <p className="text-xs text-fg/60 mt-0.5">{item.hint}</p>}
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
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href={EXTERNAL_LINKS.sales}
            className="group hidden items-center gap-2 rounded-full border border-border/70 bg-fg/5 px-4 h-10 text-sm font-medium text-fg transition-all hover:border-border hover:bg-fg/10 sm:inline-flex"
          >
            <span>Get in touch</span>
            <ArrowRight className="size-4 text-fg/70 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-fg" />
          </Link>

          <GlowButton size="sm" href="/about" color="rose">
            Get Started
          </GlowButton>

          {/* Mobil Menü Butonu */}
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xl text-fg/80 transition-colors hover:bg-fg/5 hover:text-fg lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((val) => !val)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-bg px-6 py-8 lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-8" aria-label="Mobile">
              {HEADER_MENU.map((menu) => (
                <div key={menu.label}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg/50">
                    {menu.label}
                  </p>
                  <div className="flex flex-col gap-1">
                    {menu.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="rounded-xl px-2.5 py-2.5 transition-colors hover:bg-fg/5"
                        onClick={() => setOpen(false)}
                      >
                        <span className="block text-lg font-medium text-fg">{item.label}</span>
                        {"hint" in item && <span className="mt-0.5 block text-sm text-fg/60">{item.hint}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t border-border/40 flex flex-col gap-3">
                <GlowButton href={EXTERNAL_LINKS.tryFree} color="rose" size="lg" className="w-full">
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