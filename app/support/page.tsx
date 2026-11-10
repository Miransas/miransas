import type { Metadata } from 'next';
import Support from './support.mdx';
import { PageIntro, PageAction } from '@/components/pages/page-intro';

export const metadata: Metadata = { alternates: { canonical: '/support' }, title: 'Support', description: 'Product availability, voice questions and support resources for Miransas and Miralas.' };

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-5xl min-w-0 px-6 py-16 md:py-24">
      <PageIntro eyebrow="Support" title="Find the right next step." description="Check product availability, read the current model notes or reach the team with the details of an issue.">
        <div className="mt-8 flex flex-wrap gap-3">
          <PageAction href="/contact" primary>
            Contact the team
          </PageAction>
          <PageAction href="https://status.miransas.com">Service status</PageAction>
        </div>
      </PageIntro>
      <div className="mt-12 max-w-3xl">
        <Support />
      </div>
    </div>
  );
}
