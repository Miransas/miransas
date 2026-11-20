import type { Metadata } from 'next';
import { SupportView } from '@/components/support/SupportView';
import { SUPPORT_FAQ_ITEMS } from '@/lib/support-faq';
import { JsonLd } from '@/src/components/seo/JsonLd';
import {
  SITE_URL,
  createPageMetadata,
  getBreadcrumbJsonLd,
} from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Support',
  description:
    'Find product availability details, Miralas and Binboi support resources, voice AI FAQs, security reporting instructions, and direct help from Miransas.',
  path: '/support',
});

const supportJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/support#faq`,
    url: `${SITE_URL}/support`,
    mainEntity: SUPPORT_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answerText,
      },
    })),
  },
  getBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Support', path: '/support' },
  ]),
];

export default function SupportPage() {
  return (
    <>
      <JsonLd data={supportJsonLd} />
      <SupportView />
    </>
  );
}
