"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { FOOTER_NAV, SOCIAL_LINKS } from "@/constants/footer";
import { AvatarGroupDemo } from "../shared/avatar-grup";

export function SiteFooter() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentYear = currentTime ? currentTime.getFullYear() : new Date().getFullYear();
  const formattedTime = currentTime ? currentTime.toLocaleTimeString("tr-TR") : "--:--:--";

  const handleAnchorClick = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("/#")) return;

    const targetId = href.replace("/#", "");
    const element = document.getElementById(targetId);

    if (!element) return;

    e.preventDefault();
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.pushState(null, "", href);
  };

  return (
    <footer className="relative w-full overflow-hidden bg-black text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-20 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">

          {/* ───────────────────────────────────────────────────
              SOL TARAF: MARKA, SOSYAL MEDYA VE TOPLULUK
          ─────────────────────────────────────────────────── */}
          <div className="flex flex-col max-w-sm shrink-0">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-4 transition-opacity hover:opacity-80"
              aria-label="Miransas home"
            >
              <img
                src="/icons/logo.png"
                alt="Miransas"
                className="w-12 object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                Miransas
              </span>
            </Link>

            {/* Açıklama (Çift yazım düzeltildi) */}
            <p className="text-sm text-stone-400/90 leading-relaxed mb-6">
              Building next-generation voice AI and real-time audio intelligence infrastructure for modern applications.
            </p>

            {/* Sosyal İkonlar */}
            <div className="flex items-center gap-2.5 mb-8">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-stone-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>

            {/* Topluluk Rozeti */}
            <div className="flex items-center gap-3 p-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm w-fit">
              <AvatarGroupDemo />
              <div className="text-xs">
                <p className="font-medium text-stone-200">Developers Media Actors</p>
                <p className="text-stone-500">Building with Miransas</p>
              </div>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────
              SAĞ TARAF: NAVİGASYON KOLONLARI
          ─────────────────────────────────────────────────── */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
            {FOOTER_NAV.map((column) => (
              <div key={column.title}>
                <h3 className="mb-5 text-sm font-semibold text-stone-200 tracking-wide">
                  {column.title}
                </h3>

                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {"isExternal" in link ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1 text-sm text-stone-400 transition-colors duration-200 hover:text-white"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="size-3.5 text-stone-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={(e) => handleAnchorClick(e, link.href)}
                          className="text-sm text-stone-400 transition-colors duration-200 hover:text-white"
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

        {/* ───────────────────────────────────────────────────
            ALT ÇİZGİ, TELİF HAKKI, SAAT VE BİLDİRİM
        ─────────────────────────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">

          {/* Sol Kısım: Telif Hakkı ve Canlı Saat */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>© 2023–{currentYear} Miransas Inc. All rights reserved.</p>

            <span className="hidden md:block w-1 h-1 rounded-full bg-stone-600"></span>
            <p className="font-mono text-stone-400 flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formattedTime}
            </p>
          </div>

          {/* Sağ Kısım: Sistem Durumu Rozeti (Çift yazı düzeltildi) */}
          <a
            href="https://status.miransas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-colors hover:bg-emerald-500/15"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium">All systems operational</span>
          </a>

        </div>
      </div>
    </footer>
  );
}