import type { Metadata } from 'next';
import Careers from './careers.mdx';
import { PageIntro, PageAction } from '@/components/pages/page-intro';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { createPageMetadata, getBreadcrumbJsonLd } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Careers — Engineering Culture & Voice AI Research',
  description:
    'Discover how Miransas approaches software engineering, voice AI research, and systems ownership, plus how to introduce yourself for future opportunities.',
  path: '/careers',
});

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-6xl min-w-0 px-6 py-16 md:py-24">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Careers', path: '/careers' },
        ])}
      />
      <PageIntro
        eyebrow="Careers / engineering culture"
        title="Care about how it is built."
        description="We value clear ownership, useful software and careful engineering. This page explains how we work and how to express an interest in the work."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <PageAction href="/projects" primary>
            See the work
          </PageAction>
          <PageAction href="mailto:contact@miransas.com?subject=Working%20with%20Miransas">
            Introduce yourself
          </PageAction>
        </div>
      </PageIntro>
      <section
        aria-labelledby="open-roles"
        className="surface-blue-gradient mt-8 grid gap-4 rounded-3xl p-6 sm:grid-cols-[1fr_2fr] sm:p-8"
      >
        <h2
          id="open-roles"
          className="text-heading text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl lg:text-[1.65rem]"
        >
          Open positions
        </h2>
        <div>
          <p className="text-prominent text-base leading-[1.6] font-medium sm:text-lg">
            No open roles currently listed.
          </p>
          <p className="text-secondary-copy mt-2 text-[15px] leading-[1.6] sm:text-base">
            Follow News for future announcements. An introduction is welcome, but it is not an application to an advertised position.
          </p>
        </div>
      </section>
      <div className="mt-12 max-w-3xl">
        <Careers />
      </div>
    </div>
  );
}
