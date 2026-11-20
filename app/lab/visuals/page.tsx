import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { HeroEnter } from '@/components/shared/reval';
import { VisualPlayground } from '@/components/visuals/visual-playground';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { createPageMetadata, getBreadcrumbJsonLd } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Visual Playground — Crystal Field Particle Study',
  description:
    'Explore Crystal Field in the Miransas Lab: an interactive real-time WebGL study of light, particles, and procedural motion across eight visual presets.',
  path: '/lab/visuals',
});

export default function LabVisualsPage() {
  return (
    <div className="surface-page text-foreground px-6 pt-12 pb-24 md:px-12 md:pb-32 lg:pt-16">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Lab', path: '/lab' },
          { name: 'Visual Playground', path: '/lab/visuals' },
        ])}
      />
      <div className="mx-auto max-w-7xl">
        <Link
          href="/lab"
          className="surface-card hover:surface-card-elevated text-prominent inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] sm:text-[13px]"
        >
          <ArrowLeft className="size-3.5 text-[#3847ff]" aria-hidden />
          Back to the Lab
        </Link>
        <HeroEnter className="mt-8">
          <span className="text-prominent block text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
            MIRANSAS LAB / VISUAL SYSTEMS
          </span>
          <h1 className="text-heading mt-5 text-[2.75rem] leading-[1.03] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem]">
            Crystal field.
          </h1>
          <p className="text-secondary-copy mt-5 max-w-xl text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]">
            Explore light, motion and particle behavior. Choose an appearance, adjust the pace, or let the system move on its own.
          </p>
        </HeroEnter>
        <VisualPlayground />
      </div>
    </div>
  );
}
