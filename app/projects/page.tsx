import { ContentTheme } from '@/components/shared/content-theme';
import type { Metadata } from 'next';
import Link from 'next/link';
import Projects from './projects.mdx';
import { PageIntro, PageAction } from '@/components/pages/page-intro';
import { Reveal } from '@/components/shared/reval';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { createPageMetadata, getBreadcrumbJsonLd } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Projects — Miralas Voice AI, Binboi & Systems',
  description:
    'Explore the Miransas project map: Miralas voice AI platform, Conversational Voice Agent, Binboi self-hosted tunneling, and native developer infrastructure.',
  path: '/projects',
});

const projects = [
  {
    name: 'Binboi',
    category: 'Developer infrastructure',
    description:
      'A self-hosted ngrok alternative, with a Go backend and Next.js frontend.',
    state: 'Live in production',
    href: 'https://binboi.com',
  },
  {
    name: 'VS Code Uzbek Language Pack',
    category: 'Developer experience',
    description: 'An Uzbek translation of the Visual Studio Code interface.',
    state: 'Published on the Marketplace',
    href: '/news/built-so-far',
  },
  {
    name: 'Miransas Pulse',
    category: 'Native software',
    description:
      'A native macOS system monitor written in C, Objective-C and Cocoa.',
    state: 'Built',
    href: '/news/built-so-far',
  },
  {
    name: 'Miransas Chess',
    category: 'Engineering',
    description: 'A chess engine written in Rust.',
    state: 'In development',
    href: '/news/built-so-far',
  },
  {
    name: 'CourierX',
    category: 'Developer infrastructure',
    description: 'A self-hosted email API in Rust. Paused to focus on Miralas.',
    state: 'Paused',
    href: '/news/built-so-far',
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl min-w-0 px-6 py-16 md:py-24">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />
      <PageIntro
        eyebrow="Selected work / project notes"
        title="One studio. A connected body of work."
        description="Voice AI is our current focus. Developer infrastructure and native software are part of the engineering work that brought us here."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <PageAction href="/news/built-so-far" primary>
            Read the project history
          </PageAction>
          <PageAction href="https://github.com/Miransas">
            Explore the source
          </PageAction>
        </div>
      </PageIntro>
      <ContentTheme>

        <section
          id="miralas"
          aria-labelledby="miralas-title"
          className="scroll-mt-28 py-10 md:py-16"
        >
          <Reveal className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="surface-card rounded-4xl p-8 sm:p-10">
              <span className="text-prominent block text-xs leading-[1.45] tracking-[0.12em] uppercase sm:text-[13px]">
                Current focus · in development
              </span>
              <h2
                id="miralas-title"
                className="text-heading mt-4 text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]"
              >
                Miralas
              </h2>
              <p className="text-supporting-copy mt-5 max-w-xl text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]">
                Voice AI in development for streamers and content creators. Multilingual text-to-speech is the current baseline. Uzbek speech and speech-to-speech remain research directions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PageAction href="/news/miralas-status" primary>
                  Read the development update
                </PageAction>
                <PageAction href="https://miralas.io">Visit Miralas</PageAction>
              </div>
            </div>

            <div className="surface-card flex flex-col justify-center rounded-4xl p-8 sm:p-10">
              <span className="text-prominent block text-xs leading-[1.45] tracking-[0.12em] uppercase sm:text-[13px]">
                Next in the sequence
              </span>
              <h3 className="text-heading mt-4 text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem]">
                Voice Agent
              </h3>
              <p className="text-supporting-copy mt-4 text-[15px] leading-[1.6] sm:text-base">
                Conversational voice infrastructure for businesses. Sessions, orders and appointments are intended use cases; the project follows the Miralas core.
              </p>
              <Link
                href="/agent"
                className="text-heading mt-6 inline-flex min-h-11 w-fit items-center rounded-xl text-sm font-medium underline decoration-[#3847ff] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
              >
                Explore the agent direction →
              </Link>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="project-map" className="py-12">
          <Reveal>
            <h2
              id="project-map"
              className="text-heading text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]"
            >
              The wider project map.
            </h2>
            <p className="text-supporting-copy mt-4 max-w-2xl text-[15px] leading-[1.6] sm:text-base">
              Project states follow the notes published on 1 November 2026. Read the original update for the context behind each project.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {projects.map((project, index) => (
              <Reveal
                key={project.name}
                delay={(index % 2) * 0.04}
                className="surface-card grid items-center gap-4 rounded-3xl p-6 transition-colors duration-300 sm:p-8 md:grid-cols-[0.9fr_1.3fr_0.7fr]"
              >
                <div>
                  <span className="text-prominent block text-xs leading-[1.45] tracking-[0.12em] uppercase sm:text-[13px]">
                    {project.category}
                  </span>
                  <h3 className="text-heading mt-2 text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem]">
                    <Link
                      href={project.href}
                      className="rounded-xl underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
                    >
                      {project.name}
                    </Link>
                  </h3>
                </div>
                <p className="text-supporting-copy text-[15px] leading-[1.6] sm:text-base">
                  {project.description}
                </p>
                <span className="text-prominent text-xs leading-[1.45] sm:text-[13px] md:text-right">
                  {project.state}
                </span>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="mt-8 max-w-3xl">
          <Projects />
        </div>
      </ContentTheme>
    </div>
  );
}
