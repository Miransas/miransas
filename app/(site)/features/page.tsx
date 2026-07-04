import Link from "next/link"
import { ArrowRight, Bot, Code2, Gauge, Layers, ShieldCheck, Workflow } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Websites that ship",
    description: "Landing pages, dashboards, product pages, and marketing systems built with clean Next.js foundations.",
  },
  {
    icon: Workflow,
    title: "Workflow automation",
    description: "Internal tools and automations that remove repeated work from your support, sales, and operations stack.",
  },
  {
    icon: Bot,
    title: "AI product layers",
    description: "AI assistants, content pipelines, and agent-style flows designed around real business processes.",
  },
  {
    icon: Gauge,
    title: "Performance focused",
    description: "Fast pages, lean interfaces, and practical architecture choices for products that need to feel sharp.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description: "Authentication, permissions, observability, and deployment practices considered from the first build.",
  },
  {
    icon: Layers,
    title: "Product systems",
    description: "Reusable components, admin panels, design systems, and docs so your team can keep moving after launch.",
  },
]

export const metadata = {
  title: "Features — Miransas",
  description: "What Miransas builds for founders, teams, and growing companies.",
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-32 text-white">
      <section className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8CFF2E]">Features</p>
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
              Everything Miransas can build into your digital product.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              We combine design, engineering, infrastructure, and AI workflows to turn rough ideas into polished systems.
            </p>
          </div>
          <Link href="/contact" className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-[#8CFF2E]">
            Start project <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6">
              <div className="mb-8 flex size-12 items-center justify-center rounded-xl bg-white/[0.04] text-[#8CFF2E]">
                <Icon className="size-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
