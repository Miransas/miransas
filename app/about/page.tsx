import type { Metadata } from 'next';
import { AboutContent } from '@/components/shared/about-content';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { createPageMetadata, getBreadcrumbJsonLd } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'About — Independent Voice AI & Software Studio',
  description:
    'Learn how Miransas researches voice AI, multilingual speech synthesis, and conversational software systems built with long-term engineering discipline.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <AboutContent />
    </>
  );
}
