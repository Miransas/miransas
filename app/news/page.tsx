"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Languages,
  Radio,
  Volume2,
  Mic,
  Check,
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  Layers,
} from "lucide-react";
import { main } from "framer-motion/client";

/* =========================================================
TYPES & TYPESAFE HELPERS
========================================================= */

type Accent = "rose" | "purple" | "lime" | "neutral" | "teal";

const NAV_ITEMS = [
  { id: "featured", label: "Featured Update" },
  { id: "all-posts", label: "Latest Updates" },
  { id: "performance", label: "Model Capabilities" },
  { id: "roadmap", label: "Languages & Uzbek" },
];

const BLOG_POSTS = [
  {
    id: "post-1",
    category: "Voice Team",
    date: "September 09, 2026",
    readTime: "3 min read",
    title: "A New Chapter for the Miransas Voice Team",
    excerpt:
      "Our voice program continues with Guliruhsar now leading recordings, with Malika set to join the team soon.",
    featured: true,
  },
  {
    id: "post-2",
    category: "Research",
    date: "August 31, 2026",
    readTime: "5 min read",
    title: "Why Uzbek Is a First-Class Training Track for Miransas",
    excerpt:
      "Instead of treating Uzbek as a translation afterthought, Miransas is building language-specific data, phoneme coverage and evaluation around native speech.",
    featured: false,
  },
  {
    id: "post-3",
    category: "Multilingual",
    date: "August 28, 2026",
    readTime: "4 min read",
    title: "Adding More Global Languages to the Evaluation Lab",
    excerpt:
      "English, Spanish, Chinese, Hindi, Arabic, Japanese, Korean, French, German, Portuguese, Turkish and Russian are now part of the broader comparison set.",
    featured: false,
  },
  {
    id: "post-4",
    category: "Models",
    date: "August 25, 2026",
    readTime: "6 min read",
    title: "Miransas and the Next Generation of Voice AI",
    excerpt:
      "We are comparing Miransas with GPT-Realtime, Gemini Live, Grok Voice and the Chatterbox baseline using transparent capability categories rather than invented leaderboard numbers.",
    featured: false,
  },
  {
    id: "post-5",
    category: "Engineering",
    date: "August 22, 2026",
    readTime: "7 min read",
    title: "Inside the Miransas Training Pipeline",
    excerpt:
      "From clean speech data and speaker embeddings to evaluation and inference, this is the direction behind our next voice models.",
    featured: false,
  },
];

const STATS = [
  {
    icon: Cpu,
    label: "Miransas baseline",
    value: "500M",
    subtext: "Chatterbox Multilingual V3",
    accent: "purple" as Accent,
  },
  {
    icon: Languages,
    label: "Baseline coverage",
    value: "23+",
    subtext: "Chatterbox multilingual languages",
    accent: "lime" as Accent,
  },
  {
    icon: Radio,
    label: "Audio",
    value: "Realtime",
    subtext: "Voice AI evaluation stack",
    accent: "rose" as Accent,
  },
  {
    icon: Mic,
    label: "Uzbek",
    value: "Native",
    subtext: "Miransas training direction",
    accent: "teal" as Accent,
  },
];

const CAPABILITIES = [
  { label: "Realtime audio", values: ["✓", "✓", "✓", "✓"] },
  { label: "Audio input / output", values: ["✓", "✓", "✓", "✓"] },
  { label: "Voice cloning", values: ["✓", "—", "—", "—"] },
  { label: "Open-source baseline", values: ["✓", "—", "—", "—"] },
  { label: "Custom language training", values: ["✓", "—", "—", "—"] },
  { label: "Uzbek training track", values: ["✓", "—", "—", "—"] },
];

const MODEL_HEADERS = [
  "Miransas",
  "GPT-Realtime",
  "Gemini Live",
  "Grok Voice",
];

function getToneClasses(accent: Accent) {
  switch (accent) {
    case "rose":
      return {
        text: "text-rose-400",
        soft: "bg-rose-500/10",
        border: "border-rose-500/20",
        badge: "bg-rose-500/15 text-rose-300 border-rose-500/30",
      };
    case "purple":
      return {
        text: "text-purple-400",
        soft: "bg-purple-500/10",
        border: "border-purple-500/20",
        badge: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      };
    case "lime":
      return {
        text: "text-lime-400",
        soft: "bg-lime-500/10",
        border: "border-lime-500/20",
        badge: "bg-lime-500/15 text-lime-300 border-lime-500/30",
      };
    case "teal":
      return {
        text: "text-[#17c9b6]",
        soft: "bg-[#17c9b6]/10",
        border: "border-[#17c9b6]/20",
        badge: "bg-[#17c9b6]/15 text-[#8ff0e4] border-[#17c9b6]/30",
      };
    default:
      return {
        text: "text-stone-300",
        soft: "bg-white/[0.04]",
        border: "border-white/[0.08]",
        badge: "bg-white/10 text-stone-200 border-white/10",
      };
  }
}

/* =========================================================
MAIN COMPONENT
========================================================= */

export default function NewsPage() {
  const [activeSection, setActiveSection] = useState("featured");

  // ScrollSpy ile hangi section görünüyorsa TOC'ta aktif yapma
  useEffect(() => {
    const handleScroll = () => {
      const observerMargin = window.innerHeight * 0.35;
      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= observerMargin && rect.bottom >= 0) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };


    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);



  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.filter((p) => !p.featured);
  return (
  <main>
      <header className="relative z-10 pt-20 pb-12 border-b border-stone-800/60 bg-gradient-to-b from-stone-950 to-transparent">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#17c9b6] uppercase mb-4">
        <Sparkles className="w-4 h-4"/>
        <span>Miransas Newsroom & Research</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-3xl leading-[1.1]">
        Voice AI Research, Releases & Insights
      </h1>
      <p className="mt-4 text-lg text-stone-400 max-w-2xl leading-relaxed">
        Follow our journey building real-time multilingual voice models, native Uzbek dataset engineering, and next-generation speech pipelines.
      </p>
    </div>
  </header>


  <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12">
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

    
      <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 z-20">
        <div className="p-5 rounded-2xl border border-stone-800/80 bg-stone-950/70 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-stone-800/60 text-xs font-mono font-medium text-stone-400 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#17c9b6]"/>
            <span>On This Page</span>
          </div>

          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`whitespace-nowrap lg:whitespace-normal flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 text-left ${
                    isActive
                      ? "bg-[#17c9b6]/15 text-[#8ff0e4] border border-[#17c9b6]/30 shadow-[0_0_15px_rgba(23,201,182,0.1)]"
                      : "text-stone-400 hover:text-stone-200 hover:bg-stone-900/60 border border-transparent"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeTocDot"
                      className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#17c9b6]"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className="flex-1 w-full space-y-24">

    
        <section id="featured" className="scroll-mt-28">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Featured Update
            </h2>
            <span className="h-px bg-stone-800/80 flex-1 ml-4" />
          </div>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative rounded-3xl border border-stone-800/80 bg-stone-950/50 backdrop-blur-md p-8 md:p-10 hover:border-[#17c9b6]/40 transition-all duration-300 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#17c9b6]/[0.03] rounded-full blur-3xl pointer-events-none group-hover:bg-[#17c9b6]/[0.06] transition-colors duration-500" />

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-400 mb-6">
              <span className="px-3 py-1 rounded-full bg-[#17c9b6]/15 text-[#8ff0e4] border border-[#17c9b6]/30 font-semibold">
                {featuredPost.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5"/>
                {featuredPost.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5"/>
                {featuredPost.readTime}
              </span>
            </div>

            <h3 className="text-2xl md:text-4xl font-semibold text-white group-hover:text-[#8ff0e4] transition-colors leading-snug tracking-tight">
              {featuredPost.title}
            </h3>

            <p className="mt-4 text-stone-300 text-base md:text-lg leading-relaxed max-w-3xl">
              {featuredPost.excerpt}
            </p>

            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-[#17c9b6] group-hover:translate-x-1 transition-transform duration-200">
              <span>Read full announcement</span>
              <ArrowRight className="w-4 h-4"/>
            </div>
          </motion.article>
        </section>

      
        <section id="all-posts" className="scroll-mt-28">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Latest Research & Updates
            </h2>
            <span className="h-px bg-stone-800/80 flex-1 ml-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group rounded-2xl border border-stone-800/80 bg-stone-950/40 p-6 flex flex-col justify-between hover:border-stone-700 hover:bg-stone-900/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-4">
                    <span className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-stone-100 group-hover:text-[#17c9b6] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-stone-400 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-900 flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>{post.date}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#17c9b6] group-hover:translate-x-0.5 transition-all"/>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

       
        <section id="performance" className="scroll-mt-28">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Model Capabilities & Baseline Stats
            </h2>
            <span className="h-px bg-stone-800/80 flex-1 ml-4" />
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              const tone = getToneClasses(stat.accent);
              return (
                <div
                  key={stat.label}
                  className={`p-5 rounded-2xl border bg-stone-950/60 backdrop-blur-md ${tone.border} relative overflow-hidden group`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-xl ${tone.soft} ${tone.text}`}>
                      <Icon className="w-4 h-4"/>
                    </div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-3xl font-semibold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-stone-400 font-mono leading-tight">
                    {stat.subtext}
                  </div>
                </div>
              );
            })}
          </div>

      
          <div className="rounded-2xl border border-stone-800/80 bg-stone-950/60 backdrop-blur-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-stone-800/80">
              <h3 className="text-lg font-semibold text-white">Transparent Capability Matrix</h3>
              <p className="text-sm text-stone-400 mt-1">
                Direct comparison of foundational features without inflated benchmarks.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-stone-800/80 bg-stone-900/40 text-xs font-mono text-stone-400 uppercase">
                    <th className="py-4 px-6 font-medium">Capability</th>
                    {MODEL_HEADERS.map((header, idx) => (
                      <th
                        key={header}
                        className={`py-4 px-4 font-medium text-center ${
                          idx === 0 ? "text-[#17c9b6] bg-[#17c9b6]/[0.03]" : ""
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-900 text-stone-300">
                  {CAPABILITIES.map((cap) => (
                    <tr key={cap.label} className="hover:bg-stone-900/30 transition-colors">
                      <td className="py-4 px-6 font-medium text-stone-200">
                        {cap.label}
                      </td>
                      {cap.values.map((val, idx) => (
                        <td
                          key={idx}
                          className={`py-4 px-4 text-center font-mono ${
                            idx === 0 ? "bg-[#17c9b6]/[0.02]" : ""
                          }`}
                        >
                          {val === "✓" ? (
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${idx === 0 ? "bg-[#17c9b6]/20 text-[#17c9b6]" : "bg-stone-800 text-stone-300"}`}>
                              <Check className="w-3.5 h-3.5"/>
                            </span>
                          ) : (
                            <span className="text-stone-400">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      
        <section id="roadmap" className="scroll-mt-28">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Languages & Uzbek Training Track
            </h2>
            <span className="h-px bg-stone-800/80 flex-1 ml-4" />
          </div>

          <div className="rounded-3xl border border-stone-800/80 bg-gradient-to-br from-stone-950 via-stone-900/40 to-stone-950 p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#17c9b6]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17c9b6]/10 border border-[#17c9b6]/30 text-[#8ff0e4] text-xs font-mono mb-4">
                <Mic className="w-3.5 h-3.5"/>
                <span>Native Speech Focus</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                Uzbek as a First-Class Language Track
              </h3>

              <p className="mt-4 text-stone-300 text-base leading-relaxed">
                Most global voice models handle regional languages through generic translation layers. Miransas builds native phoneme coverage, local dialect accents, and custom dataset pipelines specifically optimized for Uzbek alongside 23+ global languages.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "Uzbek (Native Track)",
                  "English",
                  "Turkish",
                  "Spanish",
                  "Chinese",
                  "Arabic",
                  "Hindi",
                  "German",
                  "Russian",
                  "+ 15 More",
                ].map((lang, idx) => (
                  <span
                    key={lang}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                      idx === 0
                        ? "bg-[#17c9b6] text-black font-semibold shadow-[0_0_15px_rgba(23,201,182,0.4)]"
                        : "bg-stone-900 border border-stone-800 text-stone-300"
                    }`}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
        </section>

      </main>
      
    </div>
  </div>
  </main>
   )

}

