import Link from 'next/link'
import { ArrowRight, CheckCircle2, Code2, Rocket, ShieldCheck, Sparkles } from 'lucide-react'

import BentoSection from '../../components/shared/BentoSection'
import FAQ from '../../components/shared/faq'
import { Hero } from '../../components/shared/hero'
import { projects } from '../../constants/projects'
import HeroProjects from '../../components/shared/hero-projects'
import PricingSection from '../../components/shared/pricing-sections'

const services = [
  {
    icon: Code2,
    title: 'Product engineering',
    text: 'Web apps, dashboards, internal tools, and SaaS foundations built with clean Next.js and typed backend systems.',
  },
  {
    icon: Sparkles,
    title: 'AI workflows',
    text: 'Automation layers, assistants, and agent-like flows that connect real business operations instead of staying as demos.',
  },
  {
    icon: ShieldCheck,
    title: 'Infrastructure',
    text: 'Secure auth, deployment, observability, APIs, databases, and edge-ready systems for products that need to survive launch.',
  },
]

const process = [
  'Scope the sharpest version of the idea',
  'Design the interface and product flow',
  'Build the core system in focused sprints',
  'Launch, measure, and keep improving',
]

const page = () => {
  const featuredProjects = projects.slice(0, 3)

  return (
    <div className="bg-[#030303]">
      <Hero />
      <HeroProjects />
      <section className="mx-auto max-w-7xl px-6 py-24 text-white lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8CFF2E]">
              What we build
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              Clean digital systems for people who want to ship.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-zinc-400">
            Miransas blends product design, software engineering, automation,
            and infrastructure into one practical studio process. No empty
            pages, no vague decks, just working systems with a strong visual
            language.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {services.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6">
              <div className="mb-10 flex size-12 items-center justify-center rounded-xl bg-white/[0.04] text-[#8CFF2E]">
                <Icon className="size-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
            </article>
          ))}
        </div>
      </section>
       <PricingSection/>
      <BentoSection />
        
      <section className="mx-auto max-w-7xl px-6 py-24 text-white lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white p-8 text-black md:p-12">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#8CFF2E]/40 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                <Rocket className="size-3.5" />
                Build with Miransas
              </div>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Have an idea worth making real?
              </h2>
              <div className="mt-6 grid gap-3 text-sm text-zinc-700 sm:grid-cols-3">
                {['Fast first version', 'Modern UI system', 'Launch support'].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-black" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <Link href="/contact" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-zinc-800">
              Contact us <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  )
}

export default page
