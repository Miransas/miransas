import Models from './models.mdx';
import { Callout } from '@/components/provider/Callout';
import { PageIntro, PageAction } from '@/components/pages/page-intro';
import type { Metadata } from 'next';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { createPageMetadata, getBreadcrumbJsonLd } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Speech Models — Chatterbox & Uzbek Speech Research',
  description:
    'Technical notes on the Chatterbox Multilingual 23-language baseline, pinned artifact verification, permission-based voice cloning, and Uzbek speech research.',
  path: '/models',
});

export default function ModelsPage() {
  return (
    <div className="mx-auto max-w-5xl min-w-0 px-6 py-16 md:py-24">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Speech Models', path: '/models' },
        ])}
      />
      <PageIntro
        eyebrow="Model notes / open-source foundations"
        title="Chatterbox, in context."
        description="A look at the open-source speech family described in our voice-layer notes. Upstream model capabilities and Miransas product availability are separate questions."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <PageAction href="https://github.com/resemble-ai/chatterbox" primary>
            Read the upstream documentation
          </PageAction>
          <PageAction href="/news/chatterbox">Our integration note</PageAction>
        </div>
      </PageIntro>
      <div className="mt-12 max-w-3xl min-w-0">
        <Models components={{ Callout }} />
      </div>
    </div>
  );
}
