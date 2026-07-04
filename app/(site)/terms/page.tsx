"use client";

import {
  FileText,
  Scale,
  AlertTriangle,
  Ban,
  Shield,
  Globe,
  Clock,
  Lock,
  ArrowRight,
  Sparkles,
  Mail,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Gavel,
} from "lucide-react";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: CheckCircle2,
    content: `By accessing or using Miransas services (miransas.com, console.miransas.com, app.binboi.com, and any related APIs), you agree to be bound by these Terms of Use. If you do not agree, do not use our services. These terms apply to all visitors, users, and others who access the service.`,
  },
  {
    id: "eligibility",
    title: "Eligibility",
    icon: Shield,
    content: `You must be at least 18 years old to use Miransas services. By using the service, you represent and warrant that you are of legal age to form a binding contract. If you are using the service on behalf of an organization, you represent that you have authority to bind that organization.`,
  },
  {
    id: "accounts",
    title: "Account Security",
    icon: Lock,
    content: `You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Miransas is not liable for any loss or damage arising from your failure to comply with security obligations. We reserve the right to suspend accounts showing suspicious activity.`,
  },
  {
    id: "conduct",
    title: "Prohibited Conduct",
    icon: Ban,
    content: `You may not use Miransas services for: illegal activities, distributing malware, unauthorized access attempts, data scraping, DDoS attacks, cryptocurrency mining, or any activity that harms our infrastructure or other users. We actively monitor for abuse and reserve the right to terminate without notice.`,
  },
  {
    id: "ip",
    title: "Intellectual Property",
    icon: FileText,
    content: `Miransas retains all rights to our software, trademarks, and content. Open source projects are licensed under their respective licenses (MIT, Apache 2.0, etc.). You may not use our trademarks without written permission. User-generated content remains yours, but you grant us a license to host and display it.`,
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: Scale,
    content: `Miransas services are provided "as is" without warranties of any kind. We are not liable for indirect, incidental, special, or consequential damages. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim, or $100 if no payment was made.`,
  },
  {
    id: "termination",
    title: "Termination",
    icon: XCircle,
    content: `We may terminate or suspend your access immediately, without prior notice, for any reason, including breach of these terms. Upon termination, your right to use the service ceases immediately. Provisions that by nature should survive termination shall survive.`,
  },
  {
    id: "governing",
    title: "Governing Law",
    icon: Gavel,
    content: `These terms shall be governed by the laws of the Republic of Turkey, without regard to conflict of law provisions. Any dispute shall be resolved in the courts of Izmir, Turkey. For EU users, mandatory consumer protection laws apply.`,
  },
];

export default function TermsPage() {
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
            Terms of Use.
          </h1>
          
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            Clear rules for using Miransas services. No legalese, no hidden traps. 
            Just what you can expect from us, and what we expect from you.
          </p>
          
          <div className="mt-8 flex items-center gap-3 text-sm text-neutral-500">
            <CheckCircle2 className="size-4 text-emerald-400" />
            Last updated: July 4, 2026
            <span className="mx-2 text-neutral-700">|</span>
            <Scale className="size-4 text-amber-400" />
            Governing law: Turkey
          </div>
        </div>
      </section>

      {/* ===== TABLE OF CONTENTS ===== */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="rounded-3xl bg-[#111] p-8 md:p-12">
            <h2 className="text-xl font-semibold text-white">Quick Navigation</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex items-center gap-3 rounded-2xl bg-white/5 p-4 transition-all hover:bg-white/10"
                  >
                    <Icon className="size-5 text-amber-400" />
                    <span className="text-sm font-medium text-neutral-300 transition-colors group-hover:text-white">
                      {section.title}
                    </span>
                    <ChevronRight className="ml-auto size-4 text-neutral-600 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-400" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTIONS ===== */}
      <section className="relative pb-32">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="space-y-16">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 rounded-3xl bg-[#0a0a0a] p-8 md:p-12 lg:p-16"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                      <Icon className="size-7 text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-neutral-600">0{i + 1}</span>
                        <h2 className="text-2xl font-semibold text-white md:text-3xl">
                          {section.title}
                        </h2>
                      </div>
                      <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-neutral-400">
                        {section.content.split(". ").map((sentence, idx) => (
                          <p key={idx}>{sentence.trim()}{!sentence.endsWith(".") && "."}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== ACCEPTANCE ===== */}
      <section className="relative bg-[#F6F5F2] py-32 text-neutral-900">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Agreement
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Your acceptance.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white p-8 shadow-sm md:p-12">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="size-6 shrink-0 text-amber-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Important Notice</h3>
                    <p className="mt-3 leading-relaxed text-neutral-500">
                      By continuing to use Miransas services, you acknowledge that you have read, 
                      understood, and agree to these Terms of Use. If you are using our services 
                      on behalf of an organization, you represent that you have authority to bind 
                      that organization to these terms.
                    </p>
                    <p className="mt-4 leading-relaxed text-neutral-500">
                      We may update these terms from time to time. We will notify you of any material 
                      changes via email or through our services. Continued use after changes constitutes 
                      acceptance of the new terms.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700">
                        Version 2.1
                      </span>
                      <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700">
                        Effective: July 4, 2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="relative border-t border-white/10 py-32 text-white">
        <div className="mx-auto max-w-[90rem] px-6 text-center md:px-12">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Legal questions?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
            For legal inquiries, DMCA notices, or contractual questions, 
            contact our legal team directly.
          </p>
          <a
            href="mailto:legal@miransas.com"
            className="group mt-12 inline-flex h-14 items-center gap-3 rounded-full bg-white px-8 text-base font-semibold text-black transition-all hover:bg-neutral-200 hover:scale-[1.02]"
          >
            <Mail className="size-5" />
            legal@miransas.com
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}