import type { MetadataRoute } from "next";
import { getAllNews } from "@/lib/news";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://miransas.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const news = getAllNews();
  const newestNews = news[0] ? new Date(news[0].date) : undefined;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/models`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/agent`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/developers`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/support`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/projects/miralas`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${baseUrl}/news`,
      lastModified: newestNews,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes];
}