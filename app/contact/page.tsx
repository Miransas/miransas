"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bug,
  Send,
  ChevronDown,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  CheckCircle2,
  Mail,
  ArrowUpRight,
  Terminal,
  MessageSquare,
  LifeBuoy
} from "lucide-react";


// FAQ Data
const FAQS = [
  {
    id: 1,
    question: "How fast is Miralas real-time neural voice synthesis?",
    answer:
      "Our ultra-low latency audio pipeline delivers sub-200ms audio generation over WebSocket streams, making it ideal for interactive conversational AI and live voice applications."
  },
  {
    id: 2,
    question: "How is my voice actor data protected and licensed?",
    answer:
      "All voice samples and trained models are encrypted at rest and in transit. Miransas strictly enforces commercial usage agreements and royalty protection for all custom voice actors."
  },
  {
    id: 3,
    question: "Can I self-host Miransas audio engines on-premises?",
    answer:
      "Yes. Enterprise tier customers can deploy isolated Docker/Kubernetes container instances with dedicated GPU acceleration on private infrastructure."
  },
  {
    id: 4,
    question: "What audio formats and sample rates are supported?",
    answer:
      "We support high-fidelity output up to 24-bit / 48kHz in PCM, WAV, MP3, and OGG formats with customizable compression ratios."
  }
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bugReportActive, setBugReportActive] = useState(false);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-black text-white  py-16 px-4 sm:px-6 lg:px-8 ">
      {/* <div style={{ width: '100%', height: '1250px', position: 'absolute' }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#f2ecec"
          raysSpeed={1.3}
          lightSpread={0.8}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0.1}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1.8}
          saturation={1}
        />
      </div> */}

      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-semibold tracking-wider uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Miransas Support & Enquiries
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white"
          >
            How can we help your team build?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-base sm:text-lg leading-relaxed"
          >
            Have questions about Miralas voice models, API pricing, or technical infrastructure? Reach out directly or submit a system diagnostic report.
          </motion.p>
        </div>

        {/* Top Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Status / Quick Contact */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">System Operational</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                All AI voice synthesis clusters and API endpoints are running normally at sub-200ms latency.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              99.98% Uptime Last 30 Days
            </div>
          </div>

          {/* Bug & Problem Card (Interactive) */}
          <div className={`border rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between transition-all relative overflow-hidden ${bugReportActive
              ? "bg-rose-950/20 border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.15)]"
              : "bg-white/[0.03] border-white/10 hover:border-rose-500/40"
            }`}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Bug className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Bug & Issue Report</h3>
                <span className="text-[10px] font-mono uppercase bg-rose-500/20 border border-rose-500/30 text-rose-300 px-2 py-0.5 rounded-full">
                  Priority
                </span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Found an issue with audio synthesis, API latency, or dashboard controls? Send a high-priority ticket directly to engineering.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => setBugReportActive(!bugReportActive)}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                {bugReportActive ? "Cancel Bug Mode" : "File a Bug Ticket"}
              </button>
            </div>
          </div>

          {/* Direct Mail Card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Enterprise Sales</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Need custom neural model training, voice licensing, or volume SLA commitments?
              </p>
            </div>
            <div className="pt-4">
              <a
                href="mailto:contact@miransas.com"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-rose-400 transition-colors"
              >
                contact@miransas.com
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Main Content: Contact Form & FAQ Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 sm:p-8 relative shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
              <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400">
                {bugReportActive ? <Terminal className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {bugReportActive ? "Report a Technical Issue" : "Send us a Message"}
                </h2>
                <p className="text-xs text-white/40">
                  {bugReportActive
                    ? "Submitting to Miransas core engineering team"
                    : "Fill out the form below and we will get back within 24 hours"}
                </p>
              </div>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-rose-500/20 border border-rose-500/40 text-rose-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                <p className="text-sm text-white/60 max-w-sm mx-auto">
                  Thank you for reaching out to Miransas. Our team will review your inquiry and respond shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-white/70 tracking-wide uppercase">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Sardorbek Azimov"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-white/70 tracking-wide uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sardor@miransas.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-white/70 tracking-wide uppercase">
                      Category
                    </label>
                    <select
                      defaultValue={bugReportActive ? "bug" : "general"}
                      className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500/50 transition-all"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="bug">Bug & Technical Issue</option>
                      <option value="licensing">Voice Rights & Licensing</option>
                      <option value="enterprise">Enterprise API & Dedicated Infra</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-white/70 tracking-wide uppercase">
                      System Environment
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Next.js 16 / Python TTS Worker"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/70 tracking-wide uppercase">
                    Message / Diagnostic Details
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder={
                      bugReportActive
                        ? "Please describe the bug, expected behavior, and steps or log traces to reproduce..."
                        : "How can Miransas help you with AI audio synthesis?"
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500/50 focus:bg-white/10 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-semibold text-sm transition-all shadow-lg shadow-rose-500/25 active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {bugReportActive ? "Submit Bug Ticket" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* FAQ Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-xl text-white/70 border border-white/10">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
                <p className="text-xs text-white/40">Quick answers about Miransas platform</p>
              </div>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                    >
                      <span className="text-sm font-medium text-white/90">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-white/50 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-rose-400" : ""
                          }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-5 pb-5 text-xs sm:text-sm text-white/60 leading-relaxed border-t border-white/5 pt-3">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Support Callout Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center gap-4">
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 shrink-0">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">Need custom integration support?</h4>
                <p className="text-xs text-white/50">
                  Our core engineers are available for architecture reviews and custom dataset pipelines.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}