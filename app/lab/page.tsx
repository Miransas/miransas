import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HeroEnter, Reveal } from '@/components/shared/reval';
import CrystalizedBall from '@/components/visuals/crystalized-ball';

export const metadata: Metadata = {
  title: 'Lab',
  description: 'An evolving collection of engineering experiments, visual systems, and ideas Miransas is exploring.',
  alternates: { canonical: '/lab' },
  openGraph: { title: 'Lab | Miransas', description: 'A space for what comes next. Explore visual systems, interaction and voice interfaces.', url: '/lab' },
};

const themes = [
  { number: '01', title: 'Real-time visual systems', text: 'We explore how light, particles and procedural forms can become expressive digital materials. The focus is on systems that respond continuously while staying considerate of the devices people use.' },
  { number: '02', title: 'Interaction and motion', text: 'Timing changes how an interface feels. We explore transitions, feedback and movement that help people understand a system, with room for quieter experiences and reduced motion.' },
  { number: '03', title: 'Voice and intelligent interfaces', text: 'We are interested in the space between listening, understanding and responding. That means exploring how voice and language can fit naturally into useful software, without adding unnecessary complexity.' },
];

export default function LabPage() {
  return (
    <div className="bg-background px-6 pb-24 pt-20 text-foreground md:px-12 md:pb-32 lg:pt-28">
      <div className="mx-auto max-w-7xl">
        <HeroEnter>
          <p className="font-mono text-[11px] tracking-[.2em] text-muted-foreground">MIRANSAS / LAB</p>
          <h1 className="mt-7 max-w-4xl text-[clamp(3rem,7vw,6.25rem)] leading-[1.04] tracking-[-.055em]">A space for<br className="hidden sm:block" /> what comes next.</h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">An evolving collection of engineering experiments, visual systems, and ideas we&apos;re exploring.</p>
        </HeroEnter>

        <section aria-labelledby="featured-study" className="grid items-center gap-2 py-14 sm:py-20 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <Reveal className="max-w-md">
            <p className="font-mono text-[10px] tracking-[.18em] text-muted-foreground">FEATURED STUDY / 001</p>
            <h2 id="featured-study" className="mt-5 text-3xl tracking-[-.04em] sm:text-4xl">A field of possibilities.</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">A continuous study of light and particle motion. Different appearances reveal how a few changes in rhythm, color and interaction can shift the character of the same system.</p>
            <Link href="/lab/visuals" className="mt-7 inline-flex min-h-11 items-center gap-4 rounded-lg py-2 text-sm font-medium underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">Enter the visual playground <ArrowUpRight className="size-4" aria-hidden /></Link>
          </Reveal>
          <figure>
            <div className="mx-auto aspect-square w-full max-w-[640px]"><CrystalizedBall preset="abyss" color="#6B9EEA" speed={.5} glow={.34} sparks={.12} /></div>
            <figcaption className="text-center font-mono text-[10px] tracking-[.12em] text-muted-foreground">CRYSTAL FIELD — A REAL-TIME VISUAL STUDY</figcaption>
          </figure>
        </section>

        <section aria-labelledby="explorations-title" className="pt-8 md:pt-16">
          <Reveal><p className="font-mono text-[11px] tracking-[.2em] text-muted-foreground">AREAS OF EXPLORATION</p><h2 id="explorations-title" className="mt-5 max-w-lg text-3xl tracking-[-.04em] sm:text-4xl">Questions worth spending time with.</h2></Reveal>
          <div className="mt-14 space-y-14 md:space-y-20">
            {themes.map(theme => (
              <Reveal key={theme.number} className="grid gap-5 md:grid-cols-[64px_1fr_1fr] md:gap-10">
                <span className="pt-1 font-mono text-xs text-muted-foreground">{theme.number}</span>
                <h3 className="max-w-xs text-2xl leading-tight tracking-[-.035em] md:text-3xl">{theme.title}</h3>
                <p className="max-w-lg text-sm leading-8 text-muted-foreground">{theme.text}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
