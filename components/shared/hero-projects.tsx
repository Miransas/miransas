"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Miransas Architecture",
    description: "Scalable web platform built for modern digital products and high-traffic handling.",
    span: "md:col-span-7",
    mediaType: "video",
    mediaSrc: "/videos/miransas-demo.mp4",
    fallbackBg: "bg-neutral-200",
    tags: ["Rust", "C ", "Go", "C++"],
    textPosition: "bottom-left",
  },
  {
    title: "Binboi Server",
    description: "Advanced server and client components tailored for seamless communication.",
    span: "md:col-span-5",
    mediaType: "image",
    mediaSrc: "/projects/binboi.png",
    fallbackBg: "bg-neutral-300",
    tags: ["Go", "Networking"],
    textPosition: "bottom-left",
  },
  {
    title: "Project Sad",
    description: "Independent game featuring custom assets, deep narrative, and dynamic UI systems.",
    span: "md:col-span-5",
    mediaType: "video",
    mediaSrc: "/games/lostsignal-1.png",
    fallbackBg: "bg-neutral-200",
    tags: ["Game Dev", "Story Elements"],
    textPosition: "bottom-left",
  },
  {
    title: "Rust Chess Engine",
    description: "High-performance evaluation engine currently pushing 1600+ Elo.",
    span: "md:col-span-7",
    mediaType: "image",
    mediaSrc: "/chess.png",
    fallbackBg: "bg-neutral-300",
    tags: ["Rust", "Algorithms"],
    textPosition: "bottom-left",
  },
  {
    title: "Mail Sender Service",
    description: "Reliable and scalable email sending infrastructure.",
    span: "md:col-span-8",
    mediaType: "image",
    mediaSrc: "/mail-sender.png",
    fallbackBg: "bg-neutral-200",
    tags: ["Supabase", "MongoDB"],
    textPosition: "bottom-left",
  },
  {
    title: "Tunneling Service",
    description: "Secure, fast, and reliable internal networking infrastructure.",
    span: "md:col-span-4",
    mediaType: "video",
    mediaSrc: "/videos/tunneling.mp4",
    fallbackBg: "bg-neutral-300",
    tags: ["Go", "Infrastructure"],
    textPosition: "bottom-left",
  },
];

export default function HeroProjects() {
  return (
    <section className="relative overflow-hidden bg-[#F6F5F2] py-20 text-neutral-900 md:py-28">
      
      {/* Background Text */}
      <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 select-none">
        <h1 className="text-[18vw] font-bold leading-none tracking-tighter text-black/[0.03] md:text-[200px]">
          Projects
        </h1>
      </div>

      <div className="relative mx-auto max-w-[90rem] px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between md:mb-16">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Selected Work
          </h2>
          <Link
            href="/projects"
            className="hidden items-center gap-1 text-base font-medium text-neutral-500 transition-colors hover:text-black md:flex md:text-lg"
          >
            View all projects <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid - 12 columns with proper spanning */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5 lg:gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`group relative flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${project.span}`}
            >
              {/* Media Container - NO padding, full bleed */}
              <div
                className={`relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] md:aspect-auto md:h-[340px] lg:h-[400px] ${project.fallbackBg}`}
              >
                {project.mediaType === "video" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={project.mediaSrc}
                  />
                ) : (
                  <img
                    src={project.mediaSrc}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                {/* Dark overlay that gets stronger on hover */}
                <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/40" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  {/* Tags */}
                  <div className="mb-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm md:px-4 md:text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-white md:text-2xl lg:text-3xl">
                    {project.title}
                  </h3>

                  {/* Description - shows on hover */}
                  <p className="max-w-md text-sm text-neutral-200 opacity-0 transition-all duration-500 group-hover:opacity-100 md:text-base">
                    {project.description}
                  </p>

                  {/* View Project link */}
                  <div className="mt-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-white">
                      View Project <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom info bar (visible without hover) */}
              <div className="flex items-center justify-between p-4 md:p-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-neutral-900">
                    {project.title}
                  </span>
                </div>
                <Link
                  href={`/projects/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200 md:h-10 md:w-10"
                >
                  <ArrowUpRight className="h-4 w-4 text-neutral-600" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-neutral-800"
          >
            View all projects <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}