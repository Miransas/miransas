"use client";

import { useState } from "react";
import { Cookie, Shield, Settings, ChevronDown, ChevronUp, ArrowRight, Sparkles, Mail } from "lucide-react";

const cookieTypes = [
  {
    id: "essential",
    title: "Essential Cookies",
    icon: Shield,
    required: true,
    description: "These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you such as setting your privacy preferences, logging in, or filling in forms.",
    cookies: [
      { name: "miransas_session", purpose: "Maintains your session state across page navigation", duration: "Session" },
      { name: "csrf_token", purpose: "Security token to prevent cross-site request forgery", duration: "Session" },
      { name: "cookie_consent", purpose: "Stores your cookie preference settings", duration: "1 year" },
    ],
  },
  {
    id: "functional",
    title: "Functional Cookies",
    icon: Settings,
    required: false,
    description: "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.",
    cookies: [
      { name: "theme_preference", purpose: "Remembers your dark/light mode preference", duration: "1 year" },
      { name: "language", purpose: "Stores your preferred language setting", duration: "1 year" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics Cookies",
    icon: Cookie,
    required: false,
    description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular.",
    cookies: [
      { name: "_ga", purpose: "Google Analytics - distinguishes users", duration: "2 years" },
      { name: "_gid", purpose: "Google Analytics - distinguishes users for 24h", duration: "24 hours" },
      { name: "_gat", purpose: "Google Analytics - throttles request rate", duration: "1 minute" },
    ],
  },
];

const services = [
  {
    name: "miransas.com",
    type: "Public Website",
    status: "Active",
    cookies: "Essential, Functional, Analytics",
    data: "IP address, browser type, pages visited, time spent",
  },
  {
    name: "console.miransas.com",
    type: "Developer Dashboard",
    status: "Authenticated",
    cookies: "Essential, Functional",
    data: "Account ID, session tokens, API usage metrics",
  },
  {
    name: "app.binboi.com",
    type: "Infrastructure Platform",
    status: "Authenticated",
    cookies: "Essential only",
    data: "Connection logs, tunnel metadata, error traces",
  },
];

export default function CookiePolicyPage() {
  const [expanded, setExpanded] = useState<string | null>("essential");

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
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
            Cookie Policy.
          </h1>
          
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            Transparency about what data we collect, how we use it, and why. 
            No dark patterns. No hidden trackers. Just clear engineering.
          </p>
          
          <div className="mt-8 flex items-center gap-3 text-sm text-neutral-500">
            <Shield className="size-4 text-emerald-400" />
            Last updated: July 4, 2026
          </div>
        </div>
      </section>

      {/* ===== OVERVIEW ===== */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Overview
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                What are cookies?
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-6 text-lg leading-relaxed text-neutral-400">
                <p>
                  Cookies are small text files that are placed on your device when you visit a website. 
                  They are widely used to make websites work more efficiently, as well as to provide 
                  information to the site owners.
                </p>
                <p>
                  At Miransas, we use cookies sparingly. We believe in collecting only what we need, 
                  storing it securely, and being transparent about every byte we keep. No third-party 
                  advertising cookies. No tracking pixels from social networks. No data brokers.
                </p>
                <p>
                  This policy applies to all Miransas properties: our public website, developer 
                  console, and infrastructure platforms. Each service has different cookie requirements 
                  based on its function.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES TABLE ===== */}
      <section className="relative bg-[#F6F5F2] py-32 text-neutral-900">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Scope
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Where this applies.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-neutral-500">
              Miransas operates multiple services. Cookie usage varies by platform based on 
              authentication requirements and functionality.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="grid grid-cols-12 gap-4 border-b border-neutral-200 bg-neutral-50 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <div className="col-span-3">Service</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-3">Cookies Used</div>
              <div className="col-span-2">Data Collected</div>
            </div>
            {services.map((service) => (
              <div
                key={service.name}
                className="grid grid-cols-12 gap-4 border-b border-neutral-100 px-6 py-5 text-sm transition-colors hover:bg-neutral-50"
              >
                <div className="col-span-3 font-semibold">{service.name}</div>
                <div className="col-span-2 text-neutral-600">{service.type}</div>
                <div className="col-span-2">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      service.status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
                <div className="col-span-3 text-neutral-600">{service.cookies}</div>
                <div className="col-span-2 text-neutral-500">{service.data}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COOKIE TYPES: Accordion ===== */}
      <section className="relative py-32 text-white">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Details
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Cookie breakdown.
            </h2>
          </div>

          <div className="space-y-4">
            {cookieTypes.map((type) => {
              const Icon = type.icon;
              const isExpanded = expanded === type.id;

              return (
                <div
                  key={type.id}
                  className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                    isExpanded
                      ? "border-white/20 bg-[#111]"
                      : "border-white/10 bg-[#0a0a0a] hover:border-white/15"
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(type.id)}
                    className="flex w-full items-center justify-between p-6 md:p-8"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                        <Icon className="size-6 text-amber-400" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold md:text-xl">
                          {type.title}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-500">
                          {type.cookies.length} cookies
                          {type.required && (
                            <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-neutral-400">
                              Required
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all ${
                        isExpanded ? "bg-white/10" : ""
                      }`}
                    >
                      {isExpanded ? (
                        <ChevronUp className="size-5 text-neutral-400" />
                      ) : (
                        <ChevronDown className="size-5 text-neutral-400" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? "max-h-[600px]" : "max-h-0"
                    }`}
                  >
                    <div className="border-t border-white/10 px-6 pb-8 pt-6 md:px-8">
                      <p className="text-base leading-relaxed text-neutral-400">
                        {type.description}
                      </p>

                      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                        <div className="grid grid-cols-12 gap-4 border-b border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                          <div className="col-span-3">Cookie Name</div>
                          <div className="col-span-7">Purpose</div>
                          <div className="col-span-2">Duration</div>
                        </div>
                        {type.cookies.map((cookie) => (
                          <div
                            key={cookie.name}
                            className="grid grid-cols-12 gap-4 border-b border-white/5 px-4 py-3 text-sm transition-colors hover:bg-white/5"
                          >
                            <div className="col-span-3 font-mono text-amber-400">
                              {cookie.name}
                            </div>
                            <div className="col-span-7 text-neutral-400">
                              {cookie.purpose}
                            </div>
                            <div className="col-span-2 text-neutral-500">
                              {cookie.duration}
                            </div>
                          </div>
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

      {/* ===== MANAGEMENT ===== */}
      <section className="relative bg-[#F6F5F2] py-32 text-neutral-900">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Your Control
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Managing cookies.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-8">
                <div className="rounded-2xl bg-white p-8 shadow-sm">
                  <h3 className="text-lg font-semibold">Browser Settings</h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-500">
                    You can set your browser to refuse all or some browser cookies, or to alert you 
                    when websites set or access cookies. If you disable or refuse cookies, please 
                    note that some parts of this website may become inaccessible or not function properly.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-8 shadow-sm">
                  <h3 className="text-lg font-semibold">Our Cookie Banner</h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-500">
                    When you first visit miransas.com, we present a clear cookie consent banner. 
                    You can accept all, reject non-essential, or customize your preferences. 
                    Your choice is stored for 1 year and can be changed at any time by clicking 
                    the cookie icon in the footer.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-8 shadow-sm">
                  <h3 className="text-lg font-semibold">Third-Party Services</h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-500">
                    We do not use third-party advertising cookies. Our only external service is 
                    Google Analytics (anonymized IP, data retention 14 months), which you can 
                    opt out of via our consent banner. console.miransas.com and app.binboi.com 
                    do not use any third-party analytics.
                  </p>
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
            Questions about cookies?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
            If you have any questions about our use of cookies or other technologies, 
            please contact us directly.
          </p>
          <a
            href="mailto:privacy@miransas.com"
            className="group mt-12 inline-flex h-14 items-center gap-3 rounded-full bg-white px-8 text-base font-semibold text-black transition-all hover:bg-neutral-200 hover:scale-[1.02]"
          >
            <Mail className="size-5" />
            privacy@miransas.com
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}