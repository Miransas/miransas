import { ContentTheme } from '@/components/shared/content-theme';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HeroEnter, Reveal } from '@/components/shared/reval';
import CrystalizedBall from '@/components/visuals/crystalized-ball';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { createPageMetadata, getBreadcrumbJsonLd } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Lab — Visual Systems, Shaders & Voice Interaction',
  description:
    'An evolving collection of Miransas engineering experiments, real-time WebGL visual systems, procedural particle shaders, and voice interaction studies.',
  path: '/lab',
});

const themes = [
  {
    number: '01',
    title: 'Real-time visual systems',
    text: 'We explore how light, particles and procedural forms can become expressive digital materials. The focus is on systems that respond continuously while staying considerate of the devices people use.',
  },
  {
    number: '02',
    title: 'Interaction and motion',
    text: 'Timing changes how an interface feels. We explore transitions, feedback and movement that help people understand a system, with room for quieter experiences and reduced motion.',
  },
  {
    number: '03',
    title: 'Voice and intelligent interfaces',
    text: 'We are interested in the space between listening, understanding and responding. That means exploring how voice and language can fit naturally into useful software, without adding unnecessary complexity.',
  },
];

export default function LabPage() {
  return (
    <div className="surface-page text-foreground px-6 pt-20 pb-24 md:px-12 md:pb-32 lg:pt-28">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Lab', path: '/lab' },
        ])}
      />
      <div className="mx-auto max-w-7xl">
        <HeroEnter>
          <span className="text-prominent block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
            MIRANSAS / LAB
          </span>
          <h1 className="text-heading mt-6 max-w-4xl text-[2.75rem] leading-[1.03] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem]">
            A space for
            <br className="hidden sm:block" /> what comes next.
          </h1>
          <p className="text-secondary-copy mt-6 max-w-xl text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]">
            An evolving collection of engineering experiments, visual systems, and ideas we&apos;re exploring.
          </p>
        </HeroEnter>
      <ContentTheme>

          <section
            aria-labelledby="featured-study"
            className="grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16"
          >
            <Reveal className="max-w-md">
              <span className="text-prominent block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
                FEATURED STUDY / 001
              </span>
              <h2
                id="featured-study"
                className="text-heading mt-4 text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]"
              >
                A field of possibilities.
              </h2>
              <p className="text-supporting-copy mt-5 text-[15px] leading-[1.6] sm:text-base">
                A continuous study of light and particle motion. Different appearances reveal how a few changes in rhythm, color and interaction can shift the character of the same system.
              </p>
              <Link
                href="/lab/visuals"
                className="mt-7 inline-flex min-h-11 items-center gap-3 rounded-xl bg-[#3847ff] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
              >
                Enter the visual playground{' '}
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </Reveal>
            <figure className="surface-card rounded-4xl p-6">
              <div className="mx-auto aspect-square w-full max-w-[600px]">
                <CrystalizedBall
                  preset="abyss"
                  color="#3847ff"
                  speed={0.5}
                  glow={0.34}
                  sparks={0.12}
                />
              </div>
              <figcaption className="text-supporting-copy mt-2 text-center text-xs leading-[1.45] tracking-[0.12em] uppercase">
                CRYSTAL FIELD — A REAL-TIME VISUAL STUDY
              </figcaption>
            </figure>
          </section>

          <section aria-labelledby="explorations-title" className="pt-8 md:pt-16">
            <Reveal>
              <span className="text-prominent block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
                AREAS OF EXPLORATION
              </span>
              <h2
                id="explorations-title"
                className="text-heading mt-4 max-w-2xl text-3xl leading-[1.06] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]"
              >
                Questions worth spending time with.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5">
              {themes.map((theme) => (
                <Reveal
                  key={theme.number}
                  className="surface-card grid items-start gap-5 rounded-3xl p-6 sm:p-8 md:grid-cols-[72px_1fr_1.2fr] md:gap-10"
                >
                  <span className="text-prominent pt-1 font-mono text-xs leading-[1.45] sm:text-[13px]">
                    {theme.number} / 03
                  </span>
                  <h3 className="text-heading max-w-xs text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem]">
                    {theme.title}
                  </h3>
                  <p className="text-supporting-copy max-w-lg text-[15px] leading-[1.6] sm:text-base">
                    {theme.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </section>
      </ContentTheme>
      </div>
    </div>
  );
}
