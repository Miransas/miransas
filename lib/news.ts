import { readFile } from "node:fs/promises";
import path from "node:path";
import { AUTHORS, NEWS, NEWS_BRANCH, NEWS_REPO } from "@/constants/news";

export function getAllNews() {
  return [...NEWS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getNews(slug: string) {
  return NEWS.find((n) => n.slug === slug);
}

export function getAuthor(key: keyof typeof AUTHORS) {
  return AUTHORS[key];
}

export async function getRawMdx(slug: string) {
  const file = path.join(process.cwd(), "content", "news", `${slug}.mdx`);
  try {
    return await readFile(file, "utf8");
  } catch {
    return null;
  }
}

export function readingMinutes(raw: string | null) {
  if (!raw) return 1;
  const words = raw.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}


const TZ = "Europe/Istanbul";

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: TZ,
  }).format(new Date(iso));
}

export function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  }).format(new Date(iso));
}

export function githubEditUrl(slug: string) {
  return `https://github.com/${NEWS_REPO}/edit/${NEWS_BRANCH}/content/news/${slug}.mdx`;
}

export function getAllTags() {
  return [...new Set(NEWS.flatMap((n) => n.tags))].sort();
}

export function getAdjacent(slug: string) {
  const list = getAllNews();
  const i = list.findIndex((n) => n.slug === slug);
  return {
    newer: i > 0 ? list[i - 1] : undefined,
    older: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined,
  };
}

export function getRelated(slug: string, limit = 2) {
  const current = getNews(slug);
  if (!current) return [];
  return getAllNews()
    .filter((n) => n.slug !== slug)
    .map((n) => ({
      n,
      score: n.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.n.date).getTime() - new Date(a.n.date).getTime(),
    )
    .slice(0, limit)
    .map((x) => x.n);
}