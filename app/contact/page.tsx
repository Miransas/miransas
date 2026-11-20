import type { Metadata } from 'next';
import Contact from './contact.mdx';
import { PageIntro, PageAction } from '@/components/pages/page-intro';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { createPageMetadata, getBreadcrumbJsonLd } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact — Reach the Miransas Engineering Team',
  description:
    'Contact the Miransas engineering studio regarding Miralas, voice AI research, developer infrastructure, partnerships, security reports, or product support.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl min-w-0 px-6 py-16 md:py-24">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <PageIntro
        eyebrow="Contact / a direct conversation"
        title="Tell us what you are working on."
        description="A question about a product, an engineering problem or an idea worth exploring. Write to the team through the channels below."
      >
        <a
          href="mailto:contact@miransas.com"
          className="text-heading mt-8 inline-block max-w-full rounded-xl text-xl font-semibold break-all underline decoration-[#3847ff] underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] sm:text-2xl lg:text-3xl"
        >
          contact@miransas.com
        </a>
        <div className="mt-8 flex flex-wrap gap-3">
          <PageAction href="/support" primary>
            Product support
          </PageAction>
          <PageAction href="https://github.com/Miransas/miransas/issues/new">
            Report a website issue
          </PageAction>
        </div>
      </PageIntro>
      <div className="mt-12 max-w-3xl">
        <Contact />
      </div>
    </div>
  );
}
