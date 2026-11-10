import type { Metadata } from 'next';
import Careers from './careers.mdx';
import { PageIntro, PageAction } from '@/components/pages/page-intro';

export const metadata: Metadata = { alternates: { canonical: '/careers' }, title: 'Careers', description: 'How Miransas approaches engineering and voice work. Current openings and ways to express an interest.' };

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-6xl min-w-0 px-6 py-16 md:py-24">
      <PageIntro eyebrow="Careers / engineering culture" title="Care about how it is built." description="We value clear ownership, useful software and careful engineering. This page explains how we work and how to express an interest in the work.">
        <div className="mt-8 flex flex-wrap gap-3">
          <PageAction href="/projects" primary>
            See the work
          </PageAction>
          <PageAction href="mailto:contact@miransas.com?subject=Working%20with%20Miransas">Introduce yourself</PageAction>
        </div>
      </PageIntro>
      <section aria-labelledby="open-roles" className="border-border mt-12 grid gap-4 border-b pb-10 sm:grid-cols-[1fr_2fr]">
        <h2 id="open-roles" className="text-xl font-medium">
          Open positions
        </h2>
        <div>
          <p className="text-lg">No open roles currently listed.</p>
          <p className="text-muted-foreground mt-3 text-sm leading-7">Follow News for future announcements. An introduction is welcome, but it is not an application to an advertised position.</p>
        </div>
      </section>
      <div className="mt-12 max-w-3xl">
        <Careers />
      </div>
    </div>
  );
}
