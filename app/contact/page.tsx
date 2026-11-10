import type { Metadata } from 'next';
import Contact from './contact.mdx';
import { PageIntro, PageAction } from '@/components/pages/page-intro';

export const metadata: Metadata = { alternates: { canonical: '/contact' }, title: 'Contact', description: 'Contact the Miransas team about products, engineering, partnerships, support or voice work.' };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl min-w-0 px-6 py-16 md:py-24">
      <PageIntro eyebrow="Contact / a direct conversation" title="Tell us what you are working on." description="A question about a product, an engineering problem or an idea worth exploring. Write to the team through the channels below.">
        <a href="mailto:contact@miransas.com" className="decoration-border hover:decoration-foreground mt-8 inline-block max-w-full text-[clamp(1.15rem,3vw,2rem)] font-medium break-all underline underline-offset-8">
          contact@miransas.com
        </a>
        <div className="mt-8 flex flex-wrap gap-3">
          <PageAction href="/support">Product support</PageAction>
          <PageAction href="https://github.com/Miransas/miransas/issues/new">Report a website issue</PageAction>
        </div>
      </PageIntro>
      <div className="mt-12 max-w-3xl">
        <Contact />
      </div>
    </div>
  );
}
