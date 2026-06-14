import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/constants/projects"

const statusConfig = {
  live: { label: "LIVE", color: "text-[#8CFF2E]", dot: "bg-[#8CFF2E]" },
  wip: { label: "WIP", color: "text-amber-400", dot: "bg-amber-400" },
  paused: { label: "PAUSED", color: "text-zinc-500", dot: "bg-zinc-500" },
} as const

export function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status]

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#8CFF2E]/40 hover:bg-white/[0.04]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${status.dot}`} />
          <span className={`font-mono text-xs tracking-wider ${status.color}`}>
            {status.label}
          </span>
        </div>
        <ArrowUpRight
          className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-[#8CFF2E]"
          strokeWidth={1.5}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-white">{project.name}</h3>
        <p className="text-sm text-zinc-400">{project.tagline}</p>
      </div>

      <p className="text-sm leading-relaxed text-zinc-500">
        {project.description}
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 text-xs text-zinc-400"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  )
}
