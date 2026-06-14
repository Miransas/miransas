import { ProjectCard } from "@/components/projects/project-card"
import { projects } from "@/constants/projects"

export const metadata = {
  title: "Projects — Miransas",
  description: "Independent products built by Sardor Azimov under Miransas.",
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-12 sm:mb-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#8CFF2E]">
          Projects
        </p>
        <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
          Products built by Miransas
        </h1>
        <p className="max-w-2xl text-lg text-zinc-400">
          A collection of independent tools and products, each shipped solo.
          Some are paid, some are open source, all are built from scratch.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
