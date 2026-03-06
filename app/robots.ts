import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://miransas.com'; // Kendi domainini yaz usta

  return {
    rules: {
      userAgent: '*', // Tüm arama motoru botlarına izin ver (Google, Bing, DuckDuckGo)
      allow: '/',      // Sitenin genelini taramalarına izin ver
      disallow: [
        '/admin',      // Eğer bir yönetim panelin varsa burayı kapat
        '/private',    // Özel dosyaların olduğu yerleri taramasınlar
        '/api',        // API rotalarını genellikle gizli tutmak iyidir
      ],
    },
    // Az önce oluşturduğumuz sitemap dosyasını botlara gösteriyoruz
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}