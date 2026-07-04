"use client";

import { useState } from "react";
import {
  Mail,
  MapPin,
  MessageSquare,
  ArrowRight,
  Send,
  Sparkles,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    val: "contact@miransas.com",
    href: "mailto:contact@miransas.com",
    desc: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Location",
    val: "Izmir, Turkey",
    href: "#",
    desc: "Remote-first, global reach",
  },
  {
    icon: MessageSquare,
    title: "Support",
    val: "portal.miransas.com",
    href: "https://portal.miransas.com",
    desc: "For existing clients",
  },
];

const services = [
  "Game Development",
  "Infrastructure & Backend",
  "Performance Engineering",
  "Full-Stack Development",
  "System Architecture",
  "Consulting",
];

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  return (
    <main className="w-full bg-black selection:bg-neutral-800 selection:text-white">
      
      {/* ===== HERO: Minimal, no shader, just clean typography ===== */}
      <section className="relative border-b border-white/10 py-32 md:py-40">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur-xl">
            <Sparkles className="size-4 text-amber-400" />
            Start a project
          </div>
          
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Let's build
            <br />
            <span className="text-neutral-500">something lasting.</span>
          </h1>
          
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            We're selective about projects. If you value precision over speed, 
            and quality over quantity, we should talk.
          </p>
        </div>
      </section>

      {/* ===== CONTACT INFO: Clean cards, not list ===== */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Contact
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              How to reach us.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="group relative overflow-hidden rounded-3xl bg-[#111] p-8 transition-all duration-500 hover:bg-[#1a1a1a] md:p-10"
                >
                  {/* Hover glow */}
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl transition-all group-hover:bg-amber-500/20" />
                  
                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition-colors group-hover:bg-white/20">
                      <Icon className="size-6 text-amber-400" />
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        {item.title}
                      </p>
                      <p className="mt-2 text-xl font-semibold text-white transition-colors group-hover:text-amber-400">
                        {item.val}
                      </p>
                      <p className="mt-2 text-sm text-neutral-500">
                        {item.desc}
                      </p>
                    </div>
                    
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors group-hover:text-white">
                      Get in touch
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FORM SECTION: Ivory background, dark form ===== */}
      <section className="relative bg-[#F6F5F2] py-32 text-neutral-900">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
            
            {/* Left: Context */}
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Project Brief
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Tell us about your vision.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-500">
                We take on a limited number of projects each quarter. 
                The more detail you provide, the better we can assess fit.
              </p>
              
              <div className="mt-10">
                <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                  Typical response time
                </p>
                <div className="flex items-center gap-3 rounded-2xl bg-neutral-200 px-5 py-4">
                  <Clock className="size-5 text-neutral-600" />
                  <span className="text-sm font-medium text-neutral-700">Within 24-48 hours</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-8">
              <div className="rounded-[2.5rem] bg-[#111] p-8 md:p-12 lg:p-16 text-white">
                <form className="flex flex-col gap-8">
                  
                  {/* Name + Company */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-base text-white outline-none transition-all placeholder:text-neutral-600 focus:border-amber-500/50 focus:bg-white/10"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Company
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-base text-white outline-none transition-all placeholder:text-neutral-600 focus:border-amber-500/50 focus:bg-white/10"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-base text-white outline-none transition-all placeholder:text-neutral-600 focus:border-amber-500/50 focus:bg-white/10"
                      placeholder="john@company.com"
                    />
                  </div>

                  {/* Services */}
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      What do you need help with?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                            selectedServices.includes(service)
                              ? "bg-amber-500 text-black"
                              : "border border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Project Details
                    </label>
                    <textarea
                      rows={5}
                      className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-base text-white outline-none transition-all placeholder:text-neutral-600 focus:border-amber-500/50 focus:bg-white/10 resize-none"
                      placeholder="Tell us about your goals, timeline, budget, and any specific requirements..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-between rounded-2xl bg-white py-5 px-8 text-base font-semibold text-black transition-all hover:bg-neutral-200 hover:scale-[1.01]"
                  >
                    <span className="flex items-center gap-3">
                      <Send className="size-5" />
                      Submit Project Brief
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10 transition-all group-hover:bg-black/20">
                      <ArrowRight className="size-5" />
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}