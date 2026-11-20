import type { Metadata } from 'next';
import Support from './support.mdx';
import { PageIntro, PageAction } from '@/components/pages/page-intro';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { createPageMetadata, getBreadcrumbJsonLd } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Support — Product Availability & Technical Help',
  description:
    'Find product availability details, voice AI troubleshooting guidance, security reporting instructions, and direct support resources for Miransas and Miralas.',
  path: '/support',
});

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-5xl min-w-0 px-6 py-16 md:py-24">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Support', path: '/support' },
        ])}
      />
      <PageIntro
        eyebrow="Support"
        title="Find the right next step."
        description="Check product availability, read the current model notes or reach the team with the details of an issue."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <PageAction href="/contact" primary>
            Contact the team
          </PageAction>
          <PageAction href="https://status.miransas.com">
            Service status
          </PageAction>
        </div>
      </PageIntro>
      <div className="mt-12 max-w-3xl">
        <Support />
      </div>
    </div>
  );
}
