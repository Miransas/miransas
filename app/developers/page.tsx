import type { Metadata } from 'next';
import Developers from './developers.mdx';
import { PageIntro, PageAction } from '@/components/pages/page-intro';

export const metadata: Metadata = { alternates: { canonical: '/developers' }, title: 'Developers', description: 'Miransas developer resources, model integration notes and the planned direction of the Miralas API.' };

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-6xl min-w-0 px-6 py-16 md:py-24">
      <PageIntro eyebrow="Developer resources" title="Build with the whole system in mind." description="Voice models are one part of the work. Interfaces, streaming, sessions and infrastructure make them useful. Start with the resources available today, then explore what we are developing.">
        <div className="mt-8 flex flex-wrap gap-3">
          <PageAction href="/models" primary>
            Read the model notes
          </PageAction>
          <PageAction href="https://github.com/Miransas">Explore GitHub</PageAction>
        </div>
      </PageIntro>
      <div className="border-border mt-10 flex flex-wrap justify-between gap-4 border-y py-5 text-sm">
        <span className="font-medium">Miralas public API</span>
        <span className="text-muted-foreground">Planned · no public endpoint or SDK release</span>
      </div>
      <div className="mt-12 max-w-3xl">
        <Developers />
      </div>
    </div>
  );
}
