import type { Metadata } from 'next';
import Link from 'next/link';
import Projects from './projects.mdx';
import { PageIntro, PageAction } from '@/components/pages/page-intro';
import { Reveal } from '@/components/shared/reval';

export const metadata: Metadata = { alternates: { canonical: '/projects' }, title: 'Projects', description: 'The Miransas project map: voice AI, developer infrastructure and native software, with documented development states.' };

const projects = [
  { name: 'Binboi', category: 'Developer infrastructure', description: 'A self-hosted ngrok alternative, with a Go backend and Next.js frontend.', state: 'Live in production', href: 'https://binboi.com' },
  { name: 'VS Code Uzbek Language Pack', category: 'Developer experience', description: 'An Uzbek translation of the Visual Studio Code interface.', state: 'Published on the Marketplace', href: '/news/built-so-far' },
  { name: 'Miransas Pulse', category: 'Native software', description: 'A native macOS system monitor written in C, Objective-C and Cocoa.', state: 'Built', href: '/news/built-so-far' },
  { name: 'Miransas Chess', category: 'Engineering', description: 'A chess engine written in Rust.', state: 'In development', href: '/news/built-so-far' },
  { name: 'CourierX', category: 'Developer infrastructure', description: 'A self-hosted email API in Rust. Paused to focus on Miralas.', state: 'Paused', href: '/news/built-so-far' },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl min-w-0 px-6 py-16 md:py-24">
      <PageIntro eyebrow="Selected work / project notes" title="One studio. A connected body of work." description="Voice AI is our current focus. Developer infrastructure and native software are part of the engineering work that brought us here.">
        <div className="mt-8 flex flex-wrap gap-3">
          <PageAction href="/news/built-so-far" primary>
            Read the project history
          </PageAction>
          <PageAction href="https://github.com/Miransas">Explore the source</PageAction>
        </div>
      </PageIntro>
      <section id="miralas" aria-labelledby="miralas-title" className="border-border scroll-mt-28 border-b py-16 md:py-24">
        <Reveal className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">Current focus · in development</p>
            <h2 id="miralas-title" className="mt-5 text-5xl font-medium tracking-tight sm:text-6xl">
              Miralas
            </h2>
            <p className="text-muted-foreground mt-6 max-w-xl text-base leading-8">Native Uzbek voice AI for streamers and content creators. Voice cloning, text-to-speech and speech-to-speech are the core areas of development.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PageAction href="/news/miralas-status">Read the development update</PageAction>
              <PageAction href="https://miralas.io">Visit Miralas</PageAction>
            </div>
          </div>
          <div className="border-border flex flex-col justify-center border-l pl-6 sm:pl-10">
            <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">Next in the sequence</p>
            <h3 className="mt-5 text-3xl font-medium tracking-tight">Voice Agent</h3>
            <p className="text-muted-foreground mt-5 text-sm leading-7">Conversational voice infrastructure for businesses. Sessions, orders and appointments are intended use cases; the project follows the Miralas core.</p>
            <Link href="/agent" className="mt-6 inline-flex min-h-11 w-fit items-center text-sm font-medium underline underline-offset-4">
              Explore the agent direction →
            </Link>
          </div>
        </Reveal>
      </section>
      <section aria-labelledby="project-map" className="py-16">
        <Reveal>
          <h2 id="project-map" className="text-3xl font-medium tracking-tight">
            The wider project map.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-7">Project states follow the notes published on 1 November 2026. Read the original update for the context behind each project.</p>
        </Reveal>
        <div className="mt-10">
          {projects.map((project, index) => (
            <Reveal key={project.name} delay={(index % 2) * 0.04} className="border-border grid gap-4 border-t py-8 md:grid-cols-[0.9fr_1.3fr_0.7fr]">
              <div>
                <p className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">{project.category}</p>
                <h3 className="mt-3 text-xl font-medium">
                  <Link href={project.href} className="underline-offset-4 hover:underline">
                    {project.name}
                  </Link>
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-7">{project.description}</p>
              <p className="text-muted-foreground font-mono text-xs leading-6 md:text-right">{project.state}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <div className="max-w-3xl">
        <Projects />
      </div>
    </div>
  );
}
