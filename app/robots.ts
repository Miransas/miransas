import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://miransas.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: [], // Şimdilik boş, eklersen buraya yaz
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}