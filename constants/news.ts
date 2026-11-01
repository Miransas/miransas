export type Author = { name: string; role: string };

export const AUTHORS = {
  sardor: { name: "Sardor", role: "Founder" },
  efe: { name: "Efe Kaya", role: "Backend Developer" },
} as const satisfies Record<string, Author>;

export type AuthorKey = keyof typeof AUTHORS;

export type NewsItem = {
  slug: string; // content/news/<slug>.mdx ile aynı olmalı
  title: string;
  summary: string;
  date: string; // ISO, saat dahil
  author: AuthorKey;
  tags: string[];
  image?: string;
};

// GitHub "Edit" butonu için: kendi repo adınla değiştir
export const NEWS_REPO = "Miransas/miransas";
export const NEWS_BRANCH = "main";
export const DEFAULT_NEWS_IMAGE = "/news/cover.png";

export const NEWS: NewsItem[] = [
  {
    slug: "chatterbox",
    title: "Chatterbox now powers our voice layer",
    summary:
      "We use Chatterbox, an open-source TTS family, for voice across Miransas products.",
    date: "2026-11-01T18:00:00+03:00",
    author: "sardor",
    tags: ["Voice", "Models"],
  },
  {
    slug: "hello-news",
    title: "Introducing Miransas News",
    summary: "A single place for product updates, releases and engineering notes.",
    date: "2026-11-01T17:30:00+03:00",
    author: "sardor",
    tags: ["Announcement"],
  },
  {
    slug: "our-team",
    title: "From solo builder to a team of three",
    summary:
      "Miransas started as one developer. Today it is a small team, with another voice actor on the way.",
    date: "2026-11-01T17:00:00+03:00",
    author: "sardor",
    tags: ["Team", "Company"],
  },
  {
    slug: "built-so-far",
    title: "Everything we have built so far",
    summary: "An honest map of every Miransas product and where it stands today.",
    date: "2026-11-01T16:30:00+03:00",
    author: "sardor",
    tags: ["Products", "Timeline"],
  },
  {
    slug: "miralas-status",
    title: "Miralas: where we are",
    summary:
      "Native Uzbek voice AI. What exists, how it works, and what comes next.",
    date: "2026-11-01T16:00:00+03:00",
    author: "sardor",
    tags: ["Miralas", "Voice"],
  },
  {
    slug: "principles",
    title: "What we will not build",
    summary:
      "The lines we have drawn for Miransas and Miralas, written down so you can hold us to them.",
    date: "2026-11-01T15:30:00+03:00",
    author: "sardor",
    tags: ["Principles", "Company"],
  },
  {
    slug: "voice-agent",
    title: "The Voice Agent and what comes next",
    summary:
      "A self-hosted voice AI for businesses, an engineering lesson, and our order of work.",
    date: "2026-11-01T15:00:00+03:00",
    author: "sardor",
    tags: ["Agent", "Roadmap"],
  },
];