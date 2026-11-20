import type { Metadata } from 'next';
import { ContactView } from '@/components/contact/ContactView';
import { JsonLd } from '@/src/components/seo/JsonLd';
import {
  SITE_NAME,
  SITE_URL,
  createPageMetadata,
  getBreadcrumbJsonLd,
} from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Contact the Miransas engineering team regarding Miralas, voice AI research, developer infrastructure, partnerships, security reports, or product support.',
  path: '/contact',
});

const contactJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact#contactpage`,
    name: `Contact | ${SITE_NAME}`,
    url: `${SITE_URL}/contact`,
    description:
      'Contact the Miransas engineering team regarding Miralas, voice AI research, developer infrastructure, partnerships, security reports, or product support.',
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: 'contact@miransas.com',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'contact@miransas.com',
          url: `${SITE_URL}/contact`,
          availableLanguage: ['English', 'Uzbek', 'Turkish'],
        },
        {
          '@type': 'ContactPoint',
          contactType: 'technical support',
          email: 'contact@miransas.com',
          url: `${SITE_URL}/support`,
          availableLanguage: ['English', 'Uzbek', 'Turkish'],
        },
      ],
    },
  },
  getBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]),
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd} />
      <ContactView />
    </>
  );
}
