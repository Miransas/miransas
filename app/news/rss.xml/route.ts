import { getAllNews, getAuthor } from "@/lib/news";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://miransas.com";

export const dynamic = "force-static";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function GET() {
  const items = getAllNews();
  const lastBuild = new Date(items[0]?.date ?? Date.now()).toUTCString();

  const entries = items
    .map(
      (n) => `    <item>
      <title>${esc(n.title)}</title>
      <link>${SITE}/news/${n.slug}</link>
      <guid isPermaLink="true">${SITE}/news/${n.slug}</guid>
      <pubDate>${new Date(n.date).toUTCString()}</pubDate>
      <dc:creator>${esc(getAuthor(n.author).name)}</dc:creator>
      <description>${esc(n.summary)}</description>
${n.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Miransas News</title>
    <link>${SITE}/news</link>
    <description>Product updates, releases and engineering notes from Miransas.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE}/news/rss.xml" rel="self" type="application/rss+xml" />
${entries}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}