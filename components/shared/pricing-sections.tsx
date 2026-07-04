"use client";

import { Grid, Sparkles, User, MonitorPlay } from "lucide-react";

const pricingPlans = [
  {
    id: "starter",
    category: "Starter",
    status: "All slots booked for November.",
    statusTheme: "text-red-500 bg-red-50",
    title: "Miransas Starter",
    subtitle: "for Solo Builders & Indie Devs",
    price: "$9",
    billing: "/mo",
    theme: "light",
    layout: "vertical",
    testimonial: {
      name: "Alex Chen, Indie Dev",
      quote: "Perfect ecosystem to start with!",
    },
    features: [
      "1 Active Project",
      "Community Support",
      "Basic Analytics Dashboard",
      "Shared Infrastructure",
      "API Access (100 req/day)",
      "Standard SSL & Security",
    ],
  },
  {
    id: "pro",
    category: "Pro Tier",
    status: "2 Spots Available",
    statusTheme: "text-emerald-400 bg-emerald-500/20",
    title: "Miransas Pro",
    subtitle: "for Production Systems",
    price: "$19",
    billing: "/mo",
    theme: "dark",
    layout: "vertical",
    testimonial: {
      name: "Sarah Jenkins, CTO",
      quote: "Saved us countless DevOps hours!",
    },
    features: [
      "5 Active Projects",
      "Priority Email Support",
      "Advanced Analytics & Logs",
      "Dedicated Resources",
      "Custom Domains & CDN",
      "CI/CD Pipeline Included",
    ],
  },
  {
    id: "game-dev",
    category: "Game Dev",
    status: "Available on Steam & Epic.",
    statusTheme: "text-red-500 bg-red-50",
    title: "Project Sad Engine",
    subtitle: "Everything to ship your indie game",
    price: "$15",
    billing: "One-time",
    note: "Single purchase license for full assets",
    theme: "light",
    layout: "horizontal",
    features: [
      "Full Game Engine Access",
      "Asset Pipeline & Build Tools",
      "Multi-platform Exports",
      "Steam/Console Ready",
      "Cloud Save & Sync System",
      "Player Analytics Dashboard",
      "Mod Support Framework",
      "100% Royalty Free",
    ],
  },
];

export default function PricingSection() {
  const topPlans = pricingPlans.filter((p) => p.layout === "vertical");
  const bottomPlans = pricingPlans.filter((p) => p.layout === "horizontal");

  return (
    <section className="bg-[#f3f3f3] py-24 font-sans text-neutral-900">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Header - Görseldeki gibi hizalandı */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-800">
            Miransas Ecosystem
          </h2>
          <p className="text-sm font-medium text-neutral-600">
            Doubts? Reach out to us at{" "}
            <a href="mailto:contact@miransas.com" className="text-emerald-600 underline underline-offset-4 decoration-emerald-600/30 hover:decoration-emerald-600">
              contact@miransas.com
            </a>
          </p>
        </div>

        {/* Top Row: 2 Cards (Light & Dark) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
          {topPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between overflow-hidden rounded-[2rem] p-8 ${
                plan.theme === "dark"
                  ? "bg-gradient-to-b from-[#2a2a2a] to-[#121212] text-white shadow-xl"
                  : "bg-white text-neutral-900 shadow-sm"
              }`}
            >
              <div>
                {/* Etiketler */}
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className={`text-sm font-medium ${plan.theme === "dark" ? "text-neutral-300" : "text-neutral-600"}`}>
                    {plan.category}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${plan.statusTheme}`}>
                    {plan.status}
                  </span>
                </div>

                {/* Başlık */}
                <h3 className="text-2xl font-semibold tracking-tight">{plan.title}</h3>
                <p className={`mt-1 text-sm ${plan.theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
                  {plan.subtitle}
                </p>
              </div>

              {/* Fiyat ve Testimonial Bölümü (Yan Yana) */}
              <div className="my-8 flex items-center justify-between border-b pb-8 border-neutral-200/20">
                <div className="flex flex-col gap-3">
                  <div>
                    <span className="text-4xl font-bold tracking-tighter">{plan.price}</span>
                    <span className="text-lg font-medium text-neutral-500">{plan.billing}</span>
                  </div>
                  <button className="flex w-max items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105 border border-neutral-800">
                    <div className="flex items-center justify-center rounded bg-amber-400 p-1">
                      <Grid className="h-3 w-3 text-black" />
                    </div>
                    Select Plan
                  </button>
                </div>

                {/* Mini Testimonial */}
                <div className="flex max-w-[140px] flex-col items-end text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[11px] font-semibold ${plan.theme === "dark" ? "text-neutral-300" : "text-neutral-700"}`}>
                      {plan.testimonial?.name}
                    </span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 overflow-hidden">
                      <User className="h-4 w-4 text-neutral-500" />
                    </div>
                  </div>
                  <p className={`text-[11px] leading-tight ${plan.theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
                    {plan.testimonial?.quote}
                  </p>
                </div>
              </div>

              {/* Özellikler (2 Sütun) */}
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${plan.theme === "dark" ? "bg-neutral-600" : "bg-neutral-300"}`} />
                    <span className={`text-xs font-medium ${plan.theme === "dark" ? "text-neutral-400" : "text-neutral-500"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row: Horizontal Card (Oyun Assetleri / Steam - Epic) */}
        {bottomPlans.map((plan) => (
          <div
            key={plan.id}
            className="relative flex flex-col overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between gap-8"
          >
            {/* Sol Kısım: Başlık ve Fiyat */}
            <div className="flex flex-col justify-between lg:w-1/3">
              <div>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-neutral-600">{plan.category}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${plan.statusTheme}`}>
                    {plan.status}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{plan.title}</h3>
                <p className="mt-1 text-sm text-neutral-500">{plan.subtitle}</p>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <div>
                  <span className="text-4xl font-bold tracking-tighter">{plan.price}</span>
                  <span className="ml-1 text-lg font-medium text-neutral-500">{plan.billing}</span>
                  <p className="text-xs text-neutral-400 mt-1">{plan.note}</p>
                </div>
                <button className="flex w-max items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105">
                  <div className="flex items-center justify-center rounded bg-amber-400 p-1">
                    <MonitorPlay className="h-3 w-3 text-black" />
                  </div>
                  Get on Steam
                </button>
              </div>
            </div>

            {/* Sağ Kısım: Özellikler (2 Sütun, Grid) */}
            <div className="lg:w-3/5 rounded-2xl bg-[#fafafa] p-6 border border-neutral-100">
              <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" />
                    <span className="text-xs font-medium text-neutral-500">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}