import Link from "next/link";
import type React from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Stat = {
  value: string;
  label: string;
};

type Card = {
  title: string;
  text: string;
  icon?: LucideIcon;
  meta?: string;
};

type Action = {
  label: string;
  href: string;
};

type RoutePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: Action;
  secondaryAction?: Action;
  stats?: Stat[];
  cards?: Card[];
  checklist?: string[];
  children?: React.ReactNode;
};

export function RoutePage({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  stats = [],
  cards = [],
  checklist = [],
  children,
}: RoutePageProps) {
  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-6 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#8CFF2E]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8CFF2E]">
              {eyebrow}
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              {description}
            </p>
            {(primaryAction || secondaryAction) && (
              <div className="mt-10 flex flex-wrap gap-3">
                {primaryAction && (
                  <Link
                    href={primaryAction.href}
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-[#8CFF2E]"
                  >
                    {primaryAction.label}
                    <ArrowRight className="size-4" />
                  </Link>
                )}
                {secondaryAction && (
                  <Link
                    href={secondaryAction.href}
                    className="inline-flex h-12 items-center rounded-full border border-white/10 px-6 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.04]"
                  >
                    {secondaryAction.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl shadow-black/30">
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">
                Miransas
              </span>
              <span className="size-2 rounded-full bg-[#8CFF2E]" />
            </div>
            <div className="grid gap-3">
              {(checklist.length ? checklist : ["Focused scope", "Modern interface", "Launch-ready system"]).map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <CheckCircle2 className="size-4 shrink-0 text-[#8CFF2E]" />
                  <span className="text-sm text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {stats.length > 0 && (
        <section className="mx-auto grid max-w-7xl gap-4 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6">
              <div className="text-4xl font-semibold text-white">{stat.value}</div>
              <div className="mt-2 text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </section>
      )}

      {cards.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards.map(({ title: cardTitle, text, icon: Icon, meta }) => (
              <article key={cardTitle} className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6">
                <div className="mb-10 flex items-center justify-between">
                  {Icon ? (
                    <div className="flex size-12 items-center justify-center rounded-xl bg-white/[0.04] text-[#8CFF2E]">
                      <Icon className="size-5" />
                    </div>
                  ) : (
                    <span className="size-12 rounded-xl bg-white/[0.04]" />
                  )}
                  {meta && <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">{meta}</span>}
                </div>
                <h2 className="text-xl font-semibold text-white">{cardTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {children}
    </main>
  );
}
