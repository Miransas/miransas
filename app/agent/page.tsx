import type { Metadata } from 'next';
import Agent from './agent.mdx';
import { PageIntro, PageAction } from '@/components/pages/page-intro';
import { Reveal } from '@/components/shared/reval';

export const metadata: Metadata = { alternates: { canonical: '/agent' }, title: 'Voice Agent', description: 'The direction of Miransas conversational voice infrastructure: sessions, voice input and useful actions. In development.' };

export default function AgentPage() {
  return (
    <div className="mx-auto max-w-6xl min-w-0 px-6 py-16 md:py-24">
      <PageIntro eyebrow="Conversational infrastructure / in development" title="A conversation with a next step." description="We are developing a self-hosted voice agent that connects spoken requests to useful workflows. The goal is clear conversation and reliable session handling, with orders and appointments as intended use cases.">
        <div className="mt-8 flex flex-wrap gap-3">
          <PageAction href="/news/voice-agent" primary>
            Read the engineering note
          </PageAction>
          <PageAction href="/contact">Talk to the team</PageAction>
        </div>
      </PageIntro>
      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="max-w-3xl min-w-0">
          <Agent />
        </div>
        <aside className="border-border self-start border-l pl-6 lg:sticky lg:top-28">
          <Reveal>
            <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">Release state</p>
            <h2 className="mt-4 text-lg font-medium">Building the foundations.</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-7">The agent follows the Miralas core. There is no public release date or production API advertised here.</p>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
