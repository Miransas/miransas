"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import {
  FaGithub,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const currentYear = new Date().getFullYear();

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Overview", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "https://blog.miransas.com" },
    ],
  },
  {
    title: "Contact & Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Support", href: "/support" },
      {
        label: "Report an issue",
        href: "https://github.com/Miransas/miransas/issues/new",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "https://privacy.miransas.com" },
      { label: "Terms of Service", href: "https://privacy.miransas.com/terms" },
      { label: "Cookie Policy", href: "https://privacy.miransas.com/cookies" },
      { label: "Security", href: "https://privacy.miransas.com/security" },
    ],
  },
];

const socials = [
  {
    label: "X",
    href: "https://twitter.com/miransaas",
    icon: FaXTwitter,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/miransaas",
    icon: FaInstagram,
  },
  {
    label: "GitHub",
    href: "https://github.com/miransas",
    icon: FaGithub,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@miransaas",
    icon: FaYoutube,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#030303] text-white">
      {/* Harmonized Warm Ambient Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-amber-500/[0.04] blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-amber-500/[0.02] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-12">
        {/* Main CTA Section */}
        <div className="pt-20 md:pt-28">
          <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] px-7 py-12 transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_0_50px_rgba(245,158,11,0.06)] md:px-14 md:py-16">
            {/* Grid Pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            {/* Subtle Amber Glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-500/10 blur-[110px] transition-all duration-700 group-hover:scale-125 group-hover:bg-amber-500/20" />

            {/* Background Branding Watermark */}
            <div className="pointer-events-none absolute -bottom-6 left-5 select-none md:left-10">
              <span className="text-[80px] font-bold leading-none tracking-[-0.08em] text-white/[0.02] sm:text-[120px] md:text-[190px]">
                MIRANSAS
              </span>
            </div>

            <div className="relative z-10 flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                  </span>
                  Miransas Parent Studio
                </div>

                <h2 className="max-w-3xl text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
                  Build what comes
                  <br />
                  <span className="bg-gradient-to-r from-neutral-400 via-neutral-600 to-neutral-700 bg-clip-text text-transparent">
                    next.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                  Secure software, intelligent systems, and infrastructure
                  engineered for performance and longevity.
                </p>
              </div>

              <Link
                href="/contact"
                aria-label="Contact Miransas"
                className="group/button inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-black transition-all duration-300 hover:scale-110 hover:bg-amber-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
              >
                <ArrowUpRight className="h-7 w-7 transition-transform duration-300 group-hover/button:-translate-y-1 group-hover/button:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Links & Brand Info */}
        <div className="grid grid-cols-1 gap-14 py-16 md:grid-cols-2 lg:grid-cols-5 lg:gap-10 lg:py-24">
          {/* Main Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <Image
                src="/icons/logo.png"
                alt="Miransas Studio Logo"
                width={48}
                height={48}
                className="rounded-xl border border-white/10 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                Miransas
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-neutral-400">
              Parent entity overseeing engineering studios, game products, and AI infrastructure. Built for resilience and speed.
            </p>

            <Link
              href="/contact"
              className="group/link mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition-all hover:gap-3 hover:text-amber-300"
            >
              Start a project with Miransas
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </Link>
          </div>

          {/* Nav Links */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {group.title}
              </h3>

              <ul className="space-y-3.5">
                {group.links.map((item) => {
                  const external = item.href.startsWith("http");

                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="group/item inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-200 hover:text-amber-300"
                      >
                        {item.label}

                        {external && (
                          <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:opacity-100" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-neutral-400">
              © {currentYear} Miransas Inc. All rights reserved.
            </p>
            <p className="text-xs text-neutral-600 font-mono">
              Engineered with Rust
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] text-neutral-400 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-400"
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
}