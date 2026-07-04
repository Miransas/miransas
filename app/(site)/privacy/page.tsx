"use client";

import { useState } from "react";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Globe,
  Clock,
  Trash2,
  UserX,
  ArrowRight,
  Sparkles,
  Mail,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const dataTypes = [
  {
    category: "Account Data",
    collected: "Email, username, password hash",
    purpose: "Authentication, account management",
    retention: "Until account deletion + 30 days",
    legalBasis: "Contract necessity",
  },
  {
    category: "Usage Data",
    collected: "IP address, browser type, pages visited, time spent",
    purpose: "Service improvement, security monitoring",
    retention: "14 months (anonymized after 30 days)",
    legalBasis: "Legitimate interest",
  },
  {
    category: "Payment Data",
    collected: "None — handled by Stripe",
    purpose: "N/A",
    retention: "N/A",
    legalBasis: "N/A",
  },
  {
    category: "Communication",
    collected: "Email content, support tickets",
    purpose: "Customer support, issue resolution",
    retention: "3 years",
    legalBasis: "Legitimate interest",
  },
];

const rights = [
  {
    title: "Right to Access",
    desc: "You can request a copy of all personal data we hold about you. We provide this within 30 days, free of charge.",
    icon: Eye,
  },
  {
    title: "Right to Erasure",
    desc: "You can request complete deletion of your account and associated data. We process this within 30 days, with 30-day backup retention.",
    icon: Trash2,
  },
  {
    title: "Right to Portability",
    desc: "You can request your data in a machine-readable format (JSON) for transfer to another service.",
    icon: Database,
  },
  {
    title: "Right to Object",
    desc: "You can opt out of analytics tracking at any time via our cookie consent banner or browser settings.",
    icon: UserX,
  },
];

const processors = [
  {
    name: "Vercel",
    role: "Hosting & CDN",
    location: "USA (EU data residency available)",
    data: "IP addresses, access logs",
  },
  {
    name: "Stripe",
    role: "Payment processing",
    location: "USA",
    data: "No card data — tokenized only",
  },
  {
    name: "Google Analytics",
    role: "Usage analytics",
    location: "USA",
    data: "Anonymized IP, page views, events",
  },
];

export default function PrivacyPolicyPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>("collection");

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <main className="w-full bg-black selection:bg-neutral-800 selection:text-white">
      
      {/* ===== HERO ===== */}
      <section className="relative border-b border-white/10 pb-24 pt-32 md:pt-40">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur-xl">
            <Sparkles className="size-4 text-amber-400" />
            Legal
          </div>
          
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Privacy Policy.
          </h1>
          
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            We collect the minimum data necessary, store it securely, and delete it 
            when no longer needed. No surprises, no hidden clauses, no data selling.
          </p>
          
          <div className="mt-8 flex items-center gap-3 text-sm text-neutral-500">
            <CheckCircle2 className="size-4 text-emerald-400" />
            Last updated: July 4, 2026
            <span className="mx-2 text-neutral-700">|</span>
            <Shield className="size-4 text-amber-400" />
            GDPR & KVKK Compliant
          </div>
        </div>
      </section>

      {/* ===== PRINCIPLES ===== */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Principles
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Data minimalism.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Lock, title: "Encrypted", desc: "AES-256 at rest, TLS 1.3 in transit" },
              { icon: Eye, title: "Transparent", desc: "You know exactly what we collect" },
              { icon: Clock, title: "Temporary", desc: "Auto-deleted when no longer needed" },
              { icon: UserX, title: "Yours", desc: "Export or delete anytime" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-3xl bg-[#111] p-8 transition-all duration-500 hover:bg-[#1a1a1a]"
                >
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl transition-all group-hover:bg-amber-500/20" />
                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="size-6 text-amber-400" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-500">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== DATA TABLE ===== */}
      <section className="relative bg-[#F6F5F2] py-32 text-neutral-900">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Collection
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              What we collect.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-neutral-500">
              Complete transparency about every data point, why we need it, and how long we keep it.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="hidden grid-cols-12 gap-4 border-b border-neutral-200 bg-neutral-50 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 md:grid">
              <div className="col-span-3">Category</div>
              <div className="col-span-3">Collected</div>
              <div className="col-span-3">Purpose</div>
              <div className="col-span-2">Retention</div>
              <div className="col-span-1">Basis</div>
            </div>
            {dataTypes.map((data) => (
              <div
                key={data.category}
                className="grid grid-cols-1 gap-2 border-b border-neutral-100 px-6 py-5 text-sm transition-colors hover:bg-neutral-50 md:grid-cols-12 md:gap-4"
              >
                <div className="font-semibold md:col-span-3">{data.category}</div>
                <div className="text-neutral-600 md:col-span-3">{data.collected}</div>
                <div className="text-neutral-600 md:col-span-3">{data.purpose}</div>
                <div className="text-neutral-500 md:col-span-2">{data.retention}</div>
                <div className="text-neutral-500 md:col-span-1">{data.legalBasis}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RIGHTS: Accordion ===== */}
      <section className="relative py-32 text-white">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Your Rights
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Control your data.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {rights.map((right, i) => {
              const Icon = right.icon;
              const isExpanded = expandedSection === `right-${i}`;

              return (
                <div
                  key={right.title}
                  className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                    isExpanded
                      ? "border-white/20 bg-[#111]"
                      : "border-white/10 bg-[#0a0a0a] hover:border-white/15"
                  }`}
                >
                  <button
                    onClick={() => toggleSection(`right-${i}`)}
                    className="flex w-full items-center justify-between p-6 md:p-8"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                        <Icon className="size-6 text-amber-400" />
                      </div>
                      <h3 className="text-lg font-semibold md:text-xl">{right.title}</h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                      {isExpanded ? (
                        <ChevronUp className="size-5 text-neutral-400" />
                      ) : (
                        <ChevronDown className="size-5 text-neutral-400" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="border-t border-white/10 px-6 pb-6 pt-4 md:px-8 md:pb-8">
                      <p className="leading-relaxed text-neutral-400">{right.desc}</p>
                      <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300">
                        Exercise this right <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PROCESSORS ===== */}
      <section className="relative bg-[#F6F5F2] py-32 text-neutral-900">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Subprocessors
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Who we trust.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-neutral-500">
              We use a minimal set of third-party services. Each is vetted for security, 
              privacy practices, and data residency options.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {processors.map((proc) => (
              <div
                key={proc.name}
                className="rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{proc.name}</h3>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                    {proc.location}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-amber-600">{proc.role}</p>
                <div className="mt-6 space-y-2">
                  <p className="text-sm text-neutral-500">
                    <span className="font-medium text-neutral-700">Data:</span> {proc.data}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="relative border-t border-white/10 py-32 text-white">
        <div className="mx-auto max-w-[90rem] px-6 text-center md:px-12">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Data protection officer.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
            For privacy-related requests, data subject access requests, or 
            compliance questions, contact our DPO directly.
          </p>
          <a
            href="mailto:privacy@miransas.com"
            className="group mt-12 inline-flex h-14 items-center gap-3 rounded-full bg-white px-8 text-base font-semibold text-black transition-all hover:bg-neutral-200 hover:scale-[1.02]"
          >
            <Mail className="size-5" />
            privacy@miransas.com
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-6 text-sm text-neutral-600">
            Response time: 72 hours for acknowledgment, 30 days for resolution.
          </p>
        </div>
      </section>
    </main>
  );
}