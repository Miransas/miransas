"use client";

import { useState } from "react";
import {
  Search,
  MessageCircle,
  BookOpen,
  Bug,
  Shield,
  Zap,
  ChevronRight,
  ArrowRight,
  Clock,
  CheckCircle2,
  X,
  Sparkles,
  Mail,
  FileText,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

const categories = [
  {
    icon: BookOpen,
    title: "Getting Started",
    desc: "Onboarding, setup guides, and first steps",
    articles: 12,
    color: "amber",
  },
  {
    icon: Zap,
    title: "API & Integration",
    desc: "Endpoints, webhooks, and SDK references",
    articles: 24,
    color: "amber",
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    desc: "Compliance, encryption, and best practices",
    articles: 8,
    color: "amber",
  },
  {
    icon: Bug,
    title: "Troubleshooting",
    desc: "Common issues, errors, and debug guides",
    articles: 18,
    color: "amber",
  },
];

const popularQuestions = [
  {
    q: "How do I get started with Miransas Core?",
    a: "Start by cloning our repository and following the setup guide in the documentation. You'll need Node.js 18+ and a valid API key.",
    category: "Getting Started",
  },
  {
    q: "What infrastructure does Binboi use?",
    a: "Binboi runs on a custom Go-based server architecture with automatic load balancing, TLS termination, and zero-downtime deployments.",
    category: "API & Integration",
  },
  {
    q: "Is Project Sad available for early access?",
    a: "Currently in closed alpha. Join the waitlist through your dashboard and we'll notify you when slots open.",
    category: "Getting Started",
  },
  {
    q: "How is my data encrypted?",
    a: "All data is encrypted at rest using AES-256 and in transit via TLS 1.3. We never store plaintext credentials or payment information.",
    category: "Security & Privacy",
  },
  {
    q: "Can I self-host the Rust Engine?",
    a: "Yes. The evaluation engine is open-source under MIT license. Build from source or use our precompiled binaries.",
    category: "API & Integration",
  },
  {
    q: "What should I do if I encounter a bug?",
    a: "Report via our GitHub Issues page with reproduction steps, environment details, and expected vs actual behavior.",
    category: "Troubleshooting",
  },
];

const quickActions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    desc: "Talk to our team in real-time",
    status: "Online",
    href: "#chat",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "Response within 24 hours",
    status: "Available",
    href: "mailto:support@miransas.com",
  },
  {
    icon: FileText,
    title: "Status Page",
    desc: "Check system health",
    status: "All systems operational",
    href: "/status",
  },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredQuestions = popularQuestions.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === null || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="w-full bg-black selection:bg-neutral-800 selection:text-white">
      
      {/* ===== HERO: Search-focused ===== */}
      <section className="relative border-b border-white/10 pb-32 pt-32 md:pt-40">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur-xl">
            <HelpCircle className="size-4 text-amber-400" />
            Help Center
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            How can we
            <br />
            <span className="text-neutral-500">help you today?</span>
          </h1>

          {/* Search Bar */}
          <div className="relative mt-12 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation, FAQs, or troubleshooting guides..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-5 pl-14 pr-12 text-base text-white outline-none transition-all placeholder:text-neutral-600 focus:border-amber-500/50 focus:bg-white/10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-500 hover:text-white"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-neutral-500">
                {filteredQuestions.length} result
                {filteredQuestions.length !== 1 ? "s" : ""} found
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ===== QUICK ACTIONS: Status cards ===== */}
      <section className="relative -mt-16 z-10">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.title}
                  href={action.href}
                  className="group relative overflow-hidden rounded-2xl bg-[#111] p-6 transition-all duration-500 hover:bg-[#1a1a1a] md:p-8"
                >
                  <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-amber-500/10 blur-2xl transition-all group-hover:bg-amber-500/20" />
                  
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="size-5 text-amber-400" />
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      {action.status}
                    </span>
                  </div>
                  
                  <div className="relative z-10 mt-4">
                    <h3 className="text-lg font-semibold text-white">{action.title}</h3>
                    <p className="mt-1 text-sm text-neutral-500">{action.desc}</p>
                  </div>
                  
                  <div className="relative z-10 mt-4 flex items-center gap-1 text-sm font-medium text-neutral-400 transition-colors group-hover:text-white">
                    Get help
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES: Filter pills + cards ===== */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Browse by topic
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Documentation.
              </h2>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  selectedCategory === null
                    ? "bg-white text-black"
                    : "border border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.title}
                  onClick={() => setSelectedCategory(cat.title)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    selectedCategory === cat.title
                      ? "bg-amber-500 text-black"
                      : "border border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.title}
                  onClick={() => setSelectedCategory(
                    selectedCategory === cat.title ? null : cat.title
                  )}
                  className="group relative overflow-hidden rounded-3xl bg-[#111] p-8 text-left transition-all duration-500 hover:bg-[#1a1a1a] md:p-10"
                >
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl transition-all group-hover:bg-amber-500/20" />
                  
                  <div className="relative z-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 transition-colors group-hover:bg-white/20">
                      <Icon className="size-7 text-amber-400" />
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-white">{cat.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                        {cat.desc}
                      </p>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm text-neutral-600">
                        {cat.articles} articles
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-all group-hover:bg-white/10">
                        <ChevronRight className="size-4 text-neutral-400 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ: Accordion ===== */}
      <section className="relative bg-[#F6F5F2] py-32 text-neutral-900">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Popular questions
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Frequently asked.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {filteredQuestions.map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 ${
                  openQuestion === i
                    ? "border-neutral-300 bg-white shadow-lg"
                    : "border-neutral-200 bg-white/50 hover:border-neutral-300"
                }`}
              >
                <button
                  onClick={() => setOpenQuestion(openQuestion === i ? null : i)}
                  className="flex w-full items-start justify-between p-6 text-left md:p-8"
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      {item.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold leading-snug md:text-xl">
                      {item.q}
                    </h3>
                  </div>
                  <div
                    className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                      openQuestion === i
                        ? "bg-black text-white"
                        : "bg-neutral-200 text-neutral-600"
                    }`}
                  >
                    <ChevronRight
                      className={`size-4 transition-transform ${
                        openQuestion === i ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openQuestion === i ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 md:px-8 md:pb-8">
                    <div className="border-t border-neutral-200 pt-4">
                      <p className="leading-relaxed text-neutral-600">
                        {item.a}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-neutral-400">
                        <CheckCircle2 className="size-4 text-emerald-500" />
                        Verified answer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="rounded-2xl border border-neutral-200 bg-white/50 p-12 text-center">
              <Search className="mx-auto size-8 text-neutral-400" />
              <h3 className="mt-4 text-lg font-semibold">No results found</h3>
              <p className="mt-2 text-neutral-500">
                Try different keywords or browse by category above.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Clear filters
                <X className="size-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA: Still need help? ===== */}
      <section className="relative py-32 text-white">
        <div className="mx-auto max-w-[90rem] px-6 text-center md:px-12">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Still need help?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
            Our engineering team is available for complex technical questions, 
            custom integrations, and enterprise support.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:support@miransas.com"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-8 text-base font-semibold text-black transition-all hover:bg-neutral-200 hover:scale-[1.02]"
            >
              <Mail className="size-5" />
              Email Support
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://github.com/miransas/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10"
            >
              <ExternalLink className="size-5" />
              GitHub Issues
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}