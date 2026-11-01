import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DEFAULT_NEWS_IMAGE } from "@/constants/news";
import {
  formatDate,
  getAllNews,
  getAllTags,
  getAuthor,
  getRawMdx,
  readingMinutes,
} from "@/lib/news";

export const metadata: Metadata = {
  title: "News",
  description: "Product updates, releases and engineering notes from Miransas.",
  alternates: {
    types: { "application/rss+xml": "/news/rss.xml" },
  },
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const tags = getAllTags();
  const items = getAllNews().filter((i) => !tag || i.tags.includes(tag));
  const minutes = await Promise.all(
    items.map(async (i) => readingMinutes(await getRawMdx(i.slug))),
  );

  const chip =
    "rounded-full border px-3 py-1 text-sm transition";
  const chipIdle =
    "border-border text-muted-foreground hover:bg-muted hover:text-foreground";
  const chipActive = "border-foreground bg-foreground text-background";

  return (
    <div className="mx-auto min-w-0 max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">News</h1>
      <p className="mt-3 text-muted-foreground">
        Product updates, releases and engineering notes.
      </p>

      <nav aria-label="Filter by tag" className="mt-8 flex flex-wrap gap-2">
        <Link href="/news" className={`${chip} ${!tag ? chipActive : chipIdle}`}>
          All
        </Link>
        {tags.map((t) => (
          <Link
            key={t}
            href={`/news?tag=${encodeURIComponent(t)}`}
            className={`${chip} ${tag === t ? chipActive : chipIdle}`}
          >
            {t}
          </Link>
        ))}
      </nav>

      {items.length === 0 ? (
        <p className="mt-12 text-muted-foreground">No posts with this tag yet.</p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.slug} className="min-w-0">
              <Link
                href={`/news/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/40 transition hover:bg-card"
              >
                <div className="relative aspect-[1200/630] w-full overflow-hidden border-b border-border">
                  <Image
                    src={item.image ?? DEFAULT_NEWS_IMAGE}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03] group-hover:brightness-90"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
                    {item.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {item.summary}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-5 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {getAuthor(item.author).name}
                    </span>
                    <span>·</span>
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                    <span>·</span>
                    <span>{minutes[i]} min read</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}