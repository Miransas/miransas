import type { Metadata } from 'next';
import { groups } from '@/constants/faq';

export const SITE_URL = 'https://miransas.com';
export const SITE_NAME = 'Miransas';
export const DEFAULT_TITLE =
  'Miransas — Independent Voice AI Lab & Infrastructure';
export const DEFAULT_DESCRIPTION =
  'Independent voice AI research lab building Miralas, multilingual and native Uzbek speech synthesis, permission-based voice cloning, and gRPC infrastructure.';

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  type?: 'website' | 'article';
  noIndex?: boolean;
  publishedTime?: string;
  rssPath?: string;
}

export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return cleanPath === '/'
    ? SITE_URL
    : `${SITE_URL}${cleanPath.replace(/\/$/, '')}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  ogType,
  type,
  noIndex = false,
  publishedTime,
  rssPath,
}: PageMetadataOptions): Metadata {
  const isHome = path === '/';
  const canonical = getCanonicalUrl(path);
  const resolvedOgType = ogType ?? type ?? 'website';
  const fullTitle = isHome
    ? DEFAULT_TITLE
    : title.includes('Miransas')
      ? title
      : `${title} | ${SITE_NAME}`;

  return {
    title: isHome ? { absolute: DEFAULT_TITLE } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical,
      ...(rssPath
        ? {
            types: {
              'application/rss+xml': `${SITE_URL}${rssPath}`,
            },
          }
        : {}),
    },
    openGraph: {
      type: resolvedOgType,
      locale: 'en_US',
      url: canonical,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@miransaas',
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ResearchOrganization'],
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/logo.png`,
    description: DEFAULT_DESCRIPTION,
    email: 'contact@miransas.com',
    founder: {
      '@type': 'Person',
      name: 'Sardor Azimov',
      url: SITE_URL,
    },
    brand: {
      '@type': 'Brand',
      name: 'Miralas',
      url: 'https://miralas.io',
    },
    knowsAbout: [
      'Voice AI',
      'Multilingual Speech Synthesis',
      'Uzbek Speech Research',
      'Permission-Based Voice Cloning',
      'Conversational Voice Agents',
      'Rust and Python gRPC Infrastructure',
    ],
    owns: {
      '@type': 'SoftwareApplication',
      '@id': 'https://miralas.io/#application',
      name: 'Miralas',
      url: 'https://miralas.io',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web, Linux',
      description:
        'Miralas is a voice AI platform in development by Miransas, uniting multilingual text-to-speech, Uzbek speech research, permission-based voice cloning, and a Rust API connected to a Python voice worker over gRPC.',
    },
    sameAs: [
      'https://miralas.io',
      'https://github.com/Miransas',
      'https://x.com/miransaas',
      'https://twitter.com/miransaas',
      'https://www.instagram.com/miransaas',
      'https://www.youtube.com/@miransaas',
      'https://discord.gg/miransas',
    ],
  };
}

export function getHomeJsonLd() {
  const allFaqs = Object.values(groups).flat();

  return [
    getOrganizationJsonLd(),
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#miralas`,
      name: 'Miralas Voice AI Platform',
      url: 'https://miralas.io',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web, Linux',
      author: {
        '@id': `${SITE_URL}/#organization`,
      },
      description:
        'Multilingual text-to-speech, Uzbek speech research, permission-based voice cloning, and conversational voice infrastructure powered by a Rust API and Python voice engine over gRPC.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: allFaqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
  ];
}
