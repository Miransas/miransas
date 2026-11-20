import type { Metadata } from 'next';
import Developers from './developers.mdx';
import { PageIntro, PageAction } from '@/components/pages/page-intro';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { createPageMetadata, getBreadcrumbJsonLd } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Developers — Voice AI Architecture & Miralas Notes',
  description:
    'Miransas developer resources, Rust API and Python gRPC voice worker architecture notes, model integration documentation, and planned Miralas API direction.',
  path: '/developers',
});

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-6xl min-w-0 px-6 py-16 md:py-24">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Developers', path: '/developers' },
        ])}
      />
      <PageIntro
        eyebrow="Developer resources"
        title="Build with the whole system in mind."
        description="Voice models are one part of the work. Interfaces, streaming, sessions and infrastructure make them useful. Start with the resources available today, then explore what we are developing."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <PageAction href="/models" primary>
            Read the model notes
          </PageAction>
          <PageAction href="https://github.com/Miransas">
            Explore GitHub
          </PageAction>
        </div>
      </PageIntro>
      <div className="surface-blue-gradient mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl px-6 py-5 text-sm">
        <span className="text-heading font-semibold">Miralas public API</span>
        <span className="text-prominent font-mono text-xs sm:text-[13px]">
          Planned · no public endpoint or SDK release
        </span>
      </div>
      <div className="mt-12 max-w-3xl">
        <Developers />
      </div>
    </div>
  );
}
