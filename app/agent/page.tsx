import type { Metadata } from 'next';
import Agent from './agent.mdx';
import { PageIntro, PageAction } from '@/components/pages/page-intro';
import { Reveal } from '@/components/shared/reval';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { createPageMetadata, getBreadcrumbJsonLd } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Voice Agent — Conversational Voice Infrastructure',
  description:
    'Explore the direction of Miransas conversational voice infrastructure: self-hosted sessions, voice input, and structured workflows currently in development.',
  path: '/agent',
});

export default function AgentPage() {
  return (
    <div className="mx-auto max-w-6xl min-w-0 px-6 py-16 md:py-24">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Voice Agent', path: '/agent' },
        ])}
      />
      <PageIntro
        eyebrow="Conversational infrastructure / in development"
        title="A conversation with a next step."
        description="We are developing a self-hosted voice agent that connects spoken requests to useful workflows. The goal is clear conversation and reliable session handling, with orders and appointments as intended use cases."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <PageAction href="/news/voice-agent" primary>
            Read the engineering note
          </PageAction>
          <PageAction href="/contact">Talk to the team</PageAction>
        </div>
      </PageIntro>
      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="max-w-3xl min-w-0">
          <Agent />
        </div>
        <aside className="self-start lg:sticky lg:top-28">
          <Reveal className="surface-blue-gradient rounded-3xl p-6">
            <span className="text-prominent block font-mono text-xs leading-[1.45] tracking-[0.12em] uppercase sm:text-[13px]">
              Release state
            </span>
            <h2 className="text-heading mt-3 text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl">
              Building the foundations.
            </h2>
            <p className="text-secondary-copy mt-3 text-[15px] leading-[1.6] sm:text-base">
              The agent follows the Miralas core. There is no public release date or production API advertised here.
            </p>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
