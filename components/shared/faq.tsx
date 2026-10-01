"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import { groups } from "../../constants/faq";

type Group = keyof typeof groups;

export function Faq() {
  const [group, setGroup] = useState<Group>("General");
  const [open, setOpen] = useState<number | null>(0);
  const items = groups[group] || [];

  return (
    <section className="relative w-full bg-[#050505] py-24 border-t border-border/40" id="faq">
      <div className="container-page">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          
          {/* Sol Kolon: Başlık, Kategori Tabları ve İletişim Kutusu */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1 text-xs font-mono text-muted-foreground backdrop-blur-md">
                <HelpCircle className="size-3.5 text-primary" />
                <span>FAQ</span>
              </div>

              {/* Title */}
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-[1.1]">
                Answers to the questions that come up most.
              </h2>

              {/* Subtitle */}
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Learn how Miransas works, what's included, and what to expect as the platform grows.
              </p>

              {/* Kategori Tabları (Amber Temasına Uygun) */}
              <div className="mt-8 flex flex-wrap gap-2">
                {(Object.keys(groups) as Group[]).map((key) => {
                  const isActive = group === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setGroup(key);
                        setOpen(0);
                      }}
                      className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                          : "border border-border bg-card/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* İletişim Kartı */}
            <div className="mt-10 rounded-2xl border border-border bg-card/60 backdrop-blur-xl p-6 shadow-sm">
              <h3 className="text-base font-semibold text-foreground">Got questions?</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Can't find what you're looking for? Reach out — our support team responds quickly.
              </p>
              <a
                href="#contact"
                className="group mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-all hover:underline"
              >
                <span>Contact us</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Sağ Kolon: Akordeon Soru-Cevap Listesi */}
          <div className="flex flex-col gap-3">
            {items.map((item, index) => {
              const isOpen = open === index;

              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-2xl border border-border/70 bg-card/40 backdrop-blur-md transition-colors hover:border-border"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:bg-secondary/40"
                  >
                    <span className="text-sm sm:text-base font-medium text-foreground leading-snug">
                      {item.q}
                    </span>
                    <div
                      className={`flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-background transition-transform duration-200 ${
                        isOpen ? "rotate-180 border-primary/50 text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <ChevronDown className="size-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="border-t border-border/40 px-5 pb-5 pt-3 sm:px-6 sm:pb-6 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}