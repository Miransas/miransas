"use client";

import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { PRODUCT_MENU } from "@/content";
import { cn } from "@/lib/utils";

import { GlowButton } from "../ui/glow-button";

const NAV_LINKS = [
  { label: "Privacy", href: "https://privacy.miransas.com" },
  { label: "Models", href: "/models" },
  { label: "Blog", href: "https://blog.miransas.com" },
  { label: "News", href: "/news" },
];

const EXTERNAL_LINKS = {
  sales: "https://console.example.com/studio",
  tryFree: "https://console.example.com/auth",
};

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
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
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-sm md:text-[15px] font-medium text-fg/80 transition-colors hover:text-fg focus-visible:outline-none"
                aria-expanded={productsOpen}
              >
                Products
                <ChevronDown
                  className={cn(
                    "size-4 text-fg/60 transition-transform duration-200",
                    productsOpen && "rotate-180 text-fg"
                  )}
                />
              </button>

              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="w-80 rounded-2xl border border-border/60 bg-bg/95 p-2 shadow-2xl backdrop-blur-2xl">
                      {PRODUCT_MENU.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-fg/5"
                        >
                          <p className="text-sm font-semibold text-fg">{item.label}</p>
                          <p className="text-xs text-fg/60 mt-0.5">{item.hint}</p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Düz Linkler */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm md:text-[15px] font-medium text-fg/80 transition-colors hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
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
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg/50">
                  Products
                </p>
                <div className="flex flex-col gap-2">
                  {PRODUCT_MENU.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="rounded-xl p-2.5 transition-colors hover:bg-fg/5"
                      onClick={() => setOpen(false)}
                    >
                      <span className="block text-lg font-medium text-fg">{item.label}</span>
                      <span className="block text-sm text-fg/60 mt-0.5">{item.hint}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg/50">
                  Navigation
                </p>
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-xl px-2.5 py-2.5 text-lg font-medium text-fg transition-colors hover:bg-fg/5"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

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