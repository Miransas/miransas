"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { PRODUCT_MENU, ROUTES } from "@/content";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

export function SiteHeader() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const reduce = useReducedMotion();

  // ─────────────────────────────────────────────────────────────
  // Scroll Takibi
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // Rota Değiştiğinde Menüleri Kapat
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  // ─────────────────────────────────────────────────────────────
  // Mobil Menü Açıkken Body Scroll Kilitle
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-200",
        // Scroll edildiğinde buzlu cam / gölgeli arka plan
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-border/40 shadow-[0_1px_0_0_rgb(10_10_10/0.08)]"
          : "bg-bg",
        // Mobil menü açıldığında tam opak arka plan
        open && "bg-bg backdrop-blur-none",
      )}
    >
      {/* ─────────────────────────────────────────────────────────
          Desktop / Main Header
      ───────────────────────────────────────────────────────── */}

      <div className="container-page flex h-[3.75rem] items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href={ROUTES.home}
          className="shrink-0"
          aria-label="Miralas home"
        >
          <img src="/icons/logo.png" alt="" className="w-20" />
        </Link>
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary"
        >
          {/* Products */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-[14px] text-fg"
              aria-expanded={productsOpen}
            >
              Products
              <ChevronDown
                className={cn(
                  "size-3.5 text-faint transition-transform duration-200",
                  productsOpen && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={
                    reduce
                      ? false
                      : {
                        opacity: 0,
                        y: 6,
                      }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 6,
                  }}
                  transition={{
                    duration: 0.16,
                  }}
                  className="absolute left-0 top-full pt-3"
                >
                  <div className="w-72 rounded-2xl bg-bg p-2 shadow-[0_8px_40px_rgb(10_10_10/0.12)] ring-1 ring-border">
                    {PRODUCT_MENU.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-card"
                      >
                        <p className="text-sm font-medium text-stone-200">
                          {item.label}
                        </p>
                        <p className="text-xs text-stone-400">
                          {item.hint}
                        </p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Developer */}
          <Link
            href={ROUTES.developer}
            className="text-[14px] text-fg transition-colors hover:text-stone-500"
          >
            Developer
          </Link>

          {/* Company */}
          <Link
            href={ROUTES.company}
            className="text-[14px] text-fg transition-colors hover:text-stone-500"
          >
            Company
          </Link>

          {/* News */}
          <Link
            href={ROUTES.news}
            className="text-[14px] text-fg transition-colors hover:text-stone-500"
          >
            News
          </Link>
        </nav>

        {/* ───────────────────────────────────────────────────────
            Right Side
        ─────────────────────────────────────────────────────── */}

        <div className="flex items-center gap-2">
          {/* Contact Sales */}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <a
              href={ROUTES.console.studio}
              target="_blank"
              rel="noreferrer"
            >
              Contact Sales
            </a>
          </Button>

          {/* Try for free */}
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex"
          >
            <a
              href={ROUTES.console.auth}
              target="_blank"
              rel="noreferrer"
            >
              Try for free
            </a>
          </Button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="relative flex size-11 items-center justify-center text-fg lg:hidden"
            aria-label={
              open ? "Close menu" : "Open menu"
            }
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          Mobile Navigation
      ───────────────────────────────────────────────────────── */}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-[3.75rem] z-40 overflow-y-auto bg-bg lg:hidden"
            initial={
              reduce
                ? false
                : {
                  opacity: 0,
                }
            }
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <nav
              className="container-page flex flex-col gap-1 py-8"
              aria-label="Mobile"
            >
              {/* Products */}
              <div className="mb-2">
                <p className="px-1 py-2 text-sm font-medium text-muted">
                  Products
                </p>

                {PRODUCT_MENU.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex min-h-12 flex-col justify-center py-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-xl font-medium tracking-tight">
                      {item.label}
                    </span>
                    <span className="text-sm text-muted">
                      {item.hint}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Developer */}
              <Link
                href={ROUTES.developer}
                className="flex min-h-12 items-center text-xl font-medium"
                onClick={() => setOpen(false)}
              >
                Developer
              </Link>

              {/* Company */}
              <Link
                href={ROUTES.company}
                className="flex min-h-12 items-center text-xl font-medium"
                onClick={() => setOpen(false)}
              >
                Company
              </Link>

              {/* News */}
              <Link
                href={ROUTES.news}
                className="flex min-h-12 items-center text-xl font-medium"
                onClick={() => setOpen(false)}
              >
                News
              </Link>

              {/* CTA */}
              <a
                href={ROUTES.console.auth}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-fg"
              >
                Try for free
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}