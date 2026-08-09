"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
      // { label: "Careers", href: "/careers" },
      // { label: "Miransas UI", href: "https://ui.miransas.com" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact", href: "/contact" },
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
      { label: "Privacy", href: "https://privacy.miransas.com" },
      { label: "Terms", href: "https://privacy.miransas.com/terms" },
      { label: "Cookies", href: "https://privacy.miransas.com/cookies" },
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
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#8cff2e]/[0.035] blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-12">
        {/* CTA */}
        <div className="pt-20 md:pt-28">
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0b0b0b] px-7 py-12 transition-all duration-500 hover:border-white/[0.14] md:px-14 md:py-16">
            {/* Grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            {/* Glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#8cff2e]/[0.06] blur-[100px] transition-all duration-700 group-hover:bg-[#8cff2e]/[0.1]" />

            {/* Background word */}
            <div className="pointer-events-none absolute -bottom-6 left-5 select-none md:left-10">
              <span className="text-[80px] font-bold leading-none tracking-[-0.08em] text-white/[0.025] sm:text-[120px] md:text-[190px]">
                MIRANSAS
              </span>
            </div>

            <div className="relative z-10 flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8cff2e]/20 bg-[#8cff2e]/[0.06] px-3 py-1.5 text-xs font-medium text-[#b7ff7a]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8cff2e] shadow-[0_0_10px_#8cff2e]" />
                  Miransas
                </div>

                <h2 className="max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-7xl">
                  Build what comes
                  <br />
                  <span className="text-white/30">next.</span>
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
                  Secure software, intelligent systems, and infrastructure
                  engineered for the long run.
                </p>
              </div>

              <Link
                href="/contact"
                aria-label="Contact Miransas"
                className="group/button inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-black transition-all duration-300 hover:scale-105 hover:bg-[#8cff2e]"
              >
                <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover/button:-translate-y-1 group-hover/button:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid grid-cols-1 gap-14 py-16 md:grid-cols-2 lg:grid-cols-5 lg:gap-10 lg:py-24">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex">
              <Image
                src="/assets/logo.png"
                alt="Miransas"
                width={52}
                height={52}
                className="rounded-xl"
              />
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/40">
              Designed around three frames and three circles.
              <br />
              Built for the future.
            </p>

            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Links */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/30">
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
                        className="group/link inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors duration-200 hover:text-white"
                      >
                        {item.label}

                        {external && (
                          <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:opacity-60" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-6 border-t border-white/[0.08] py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-white/35">
              © {currentYear} Miransas. All rights reserved.
            </p>

            <p className="text-xs text-white/20">
              Secure • Connect • Evolve
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-white/40 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.07] hover:text-white"
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