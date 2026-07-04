"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaInstagram, FaX, FaYoutube } from "react-icons/fa6";

const currentYear = new Date().getFullYear();

const footerLinks = [
  {
    title: "",
    links: [
      // { label: "Overview", href: "/" },
      // { label: "Features", href: "/features" },
      // { label: "Pricing", href: "/pricing" },
      // { label: "Testimonials", href: "/testimonials" },
      // { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "About",
    links: [
       { label: "Overview", href: "/" },
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Our Story", href: "/about" },
      // { label: "Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Ui ", href: "https://ui.miransas.com" },

    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Support", href: "/support" },
      // { label: "Live Chat", href: "/chat" },
      // { label: "Help Center", href: "/help" },
      { label: "Report Issue", href: "https://github.com/Miransas/miransas/issues/new" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      // { label: "Licenses", href: "/licenses" },
      { label: "Security", href: "/security" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,#2d2a25,transparent_55%)]" />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-12">
        {/* CTA Card */}
        <div className="pt-16 md:pt-24">
          <div className="relative overflow-hidden rounded-3xl bg-[#111] px-8 py-12 md:px-16 md:py-16">
            {/* Giant Background Text inside card */}
            <div className="pointer-events-none absolute bottom-0 left-0 select-none">
              <span className="text-[100px] font-bold leading-none tracking-tighter text-white/[0.04] md:text-[220px]">
                MIRANSAS
              </span>
            </div>

            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <h2 className="max-w-xl text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
                Three Frames • Three Circles <br className="hidden md:block" />
                Secure • Connect • Evolve
              </h2>
              <Link
                href="/contact"
                aria-label="Contact Miransas"
                className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-black transition-all hover:scale-105 hover:bg-neutral-200 md:h-16 md:w-16"
              >
                <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section: Grid Links */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          {/* Brand Info Column */}
          <div className="flex flex-col items-start lg:col-span-2">
            <Image
              src="/icons/logo.png"
              alt="Miransas Logo"
              width={80}
              height={80}
              className="mb-6 rounded-xl p-1.5 text-black"
            />
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/50">
              Designed around three frames and three circles.
              Built for the future.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded bg-yellow-400">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
              Get started
            </Link>
          </div>

          {/* Navigation Links Columns */}
          {footerLinks.map((group) => (
            <div key={group.title} className="lg:col-span-1">
              <h3 className="mb-6 text-sm font-medium text-white/40">
                {group.title}
              </h3>
              <ul className="flex flex-col space-y-3">
                {group.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright & Socials */}
        <div className="flex flex-col items-center justify-between border-t border-white/10 py-8 text-sm text-white/50 md:flex-row">
          <p>&copy; {currentYear} Miransas. All rights reserved.</p>
          <div className="mt-4 flex items-center gap-4 md:mt-0">
            <Link href={"https://twitter.com/miransaas"} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              <span className="sr-only">Twitter</span>
              <FaX className="h-5 w-5" />
            </Link>
            <Link href={"https://www.instagram.com/miransaas"} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              <span className="sr-only">Instagram</span>
              <FaInstagram className="h-5 w-5" />
            </Link>
            <Link href={"https://www.github.com/miransas"} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              <span className="sr-only">GitHub</span>
              <FaGithub className="h-5 w-5" />
            </Link>
            <Link href={"https://www.youtube.com/@miransaas"} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              <span className="sr-only">YouTube</span>
              <FaYoutube className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}