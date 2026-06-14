import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, } from "lucide-react"
import { projects, projectBySlug } from "@/constants/projects"
import { FaGithub } from "react-icons/fa"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const project = projectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.name} — Miransas`,
    description: project.tagline,
  }
}

const statusConfig = {
  live: { label: "LIVE", color: "text-[#8CFF2E]", dot: "bg-[#8CFF2E]" },
  wip: { label: "WIP", color: "text-amber-400", dot: "bg-amber-400" },
  paused: { label: "PAUSED", color: "text-zinc-500", dot: "bg-zinc-500" },
} as const

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params
  const project = projectBySlug(slug)
  if (!project) notFound()

  const status = statusConfig[project.status]

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <Link
        href="/projects"
        className="mb-12 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        All projects
      </Link>

      <div className="mb-8 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${status.dot}`} />
        <span className={`font-mono text-xs tracking-wider ${status.color}`}>
          {status.label}
        </span>
      </div>

      <h1 className="mb-3 text-5xl font-bold text-white sm:text-6xl">
        {project.name}
      </h1>
      <p className="mb-12 text-xl text-zinc-400">{project.tagline}</p>

      <p className="mb-12 text-base leading-relaxed text-zinc-300">
        {project.longDescription}
      </p>

      <div className="mb-12">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-500">
          Highlights
        </h2>
        <ul className="space-y-3">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-sm text-zinc-400">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#8CFF2E]" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-12">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-500">
          Tech
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/[0.02] px-3 py-1.5 text-sm text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {project.links.website && (
          <a
            href={project.links.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#8CFF2E] px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Visit site
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
        {project.links.docs && (
          <a
            href={project.links.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/20"
          >
            Docs
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/20"
          >
            <FaGithub className="h-4 w-4" />
            GitHub
          </a>
        )}
      </div>
    </div>
  )
}
