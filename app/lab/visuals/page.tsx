import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { HeroEnter } from '@/components/shared/reval';
import { VisualPlayground } from '@/components/visuals/visual-playground';

export const metadata: Metadata = {
  title: 'Visual Playground',
  description: 'Explore Crystal Field, an interactive Miransas Lab study of light, particles and motion with eight visual appearances.',
  alternates: { canonical: '/lab/visuals' },
  openGraph: { title: 'Visual Playground | Miransas', description: 'Explore light, particles and motion in the Miransas Lab.', url: '/lab/visuals' },
};

export default function LabVisualsPage() {
  return (
    <div className="bg-background px-6 pb-24 pt-12 text-foreground md:px-12 md:pb-32 lg:pt-16">
      <div className="mx-auto max-w-7xl">
        <Link href="/lab" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-xs text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"><ArrowLeft className="size-3.5" aria-hidden />Back to the Lab</Link>
        <HeroEnter className="mt-8">
          <p className="font-mono text-[11px] tracking-[.2em] text-muted-foreground">MIRANSAS LAB / VISUAL SYSTEMS</p>
          <h1 className="mt-5 text-[clamp(2.8rem,6vw,5rem)] leading-[1.06] tracking-[-.055em]">Crystal field.</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">Explore light, motion and particle behavior. Choose an appearance, adjust the pace, or let the system move on its own.</p>
        </HeroEnter>
        <VisualPlayground />
      </div>
    </div>
  );
}
