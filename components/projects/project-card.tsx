import Link from "next/link"
import { ArrowUpRight, Box, CheckCircle2 } from "lucide-react"
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
      className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#8CFF2E]/40 hover:bg-[#101010]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#8CFF2E]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

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

      <div className="mt-8 flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#8CFF2E]">
        <Box className="size-5" />
      </div>

      <div className="relative mt-6 flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-white">{project.name}</h3>
        <p className="text-sm text-zinc-400">{project.tagline}</p>
      </div>

      <p className="relative text-sm leading-relaxed text-zinc-500">
        {project.description}
      </p>

      <div className="relative mt-2 flex items-center gap-2 text-xs text-zinc-500">
        <CheckCircle2 className="size-3.5 text-[#8CFF2E]" />
        Click to view full case page
      </div>

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
