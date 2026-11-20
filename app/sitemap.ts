import type { MetadataRoute } from 'next';
import { getAllNews } from '@/lib/news';
import { SITE_URL } from '@/src/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const news = getAllNews();
  const newestNews = news[0] ? new Date(news[0].date) : new Date('2026-11-01');

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: newestNews,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: newestNews,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/models`,
      lastModified: newestNews,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/agent`,
      lastModified: newestNews,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: newestNews,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/developers`,
      lastModified: newestNews,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: newestNews,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/lab`,
      lastModified: newestNews,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/lab/visuals`,
      lastModified: newestNews,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/support`,
      lastModified: newestNews,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: newestNews,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: newestNews,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${SITE_URL}/news/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...newsRoutes];
}
