import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AUTHORS,
  DEFAULT_NEWS_IMAGE,
  NEWS,
  type NewsItem,
} from "@/constants/news";
import { CopyMdxButton } from "@/components/news/copy-mdx-button";
import { Toc } from "@/components/news/toc";
import {
  formatDate,
  formatTime,
  getAdjacent,
  getAuthor,
  getNews,
  getRawMdx,
  getRelated,
  githubEditUrl,
  readingMinutes,
} from "@/lib/news";
import { extractToc } from "@/lib/toc";
import { FaGithub } from "react-icons/fa6";

export const dynamicParams = false;

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) return {};
  return {
    title: item.title,
    alternates: { canonical: `/news/${item.slug}` },
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      type: "article",
      publishedTime: item.date,
    },
  };
}

function PostMeta({
  item,
  author,
  minutes,
  raw,
}: {
  item: NewsItem;
  author: (typeof AUTHORS)[keyof typeof AUTHORS];
  minutes: number;
  raw: string;
}) {
  return (
    <div className="space-y-4">
      <div className="text-sm">
        <div className="font-medium text-foreground">{author.name}</div>
        <div className="text-muted-foreground">{author.role}</div>
      </div>

      <div className="text-sm text-muted-foreground">
        <time dateTime={item.date}>{formatDate(item.date)}</time>
        <div>
          {formatTime(item.date)} · {minutes} min read
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <CopyMdxButton text={raw} />
        <a
          href={githubEditUrl(item.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg flex border border-border px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          Edit on GitHub <FaGithub className="ml-2" size={16} />
        </a>
      </div>
    </div>
  );
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) notFound();

  const raw = await getRawMdx(slug);
  if (raw === null) notFound();

  let Post;
  try {
    ({ default: Post } = await import(`@/content/news/${slug}.mdx`));
  } catch {
    notFound();
  }

  const author = getAuthor(item.author);
  const minutes = readingMinutes(raw);
  const toc = extractToc(raw);
  const { newer, older } = getAdjacent(slug);
  const related = getRelated(slug)

  return (
    <div className="mx-auto min-w-0 max-w-6xl px-6 py-16">
      <Link
        href="/news"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← All news
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="min-w-0 max-w-3xl">
          <header className="border-b border-border pb-8">
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <Link
                  key={t}
                  href={`/news?tag=${encodeURIComponent(t)}`}
                  className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  {t}
                </Link>
              ))}
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              {item.title}
            </h1>
            <p className="mt-3 text-lg leading-7 text-muted-foreground">
              {item.summary}
            </p>

            {/* Mobilde meta burada, lg+ ekranda sağ kolonda */}
            <div className="mt-6 lg:hidden">
              <PostMeta item={item} author={author} minutes={minutes} raw={raw} />
            </div>
          </header>

          <div className="relative mt-8 aspect-[1200/630] w-full overflow-hidden rounded-2xl">
            <Image
              src={item.image ?? DEFAULT_NEWS_IMAGE}
              alt={item.title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-8">
            <Post />
          </div>
          {related.length > 0 && (
            <section className="mt-16 border-t border-border pt-8">
              <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Related posts
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/news/${r.slug}`}
                      className="block h-full rounded-xl border border-border p-4 transition hover:bg-muted"
                    >
                      <div className="text-xs text-muted-foreground">
                        {formatDate(r.date)}
                      </div>
                      <div className="mt-1 font-medium">{r.title}</div>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {r.summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav
            aria-label="More posts"
            className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
          >
            {older ? (
              <Link
                href={`/news/${older.slug}`}
                className="rounded-xl border border-border p-4 transition hover:bg-muted"
              >
                <div className="text-xs text-muted-foreground">← Older</div>
                <div className="mt-1 font-medium">{older.title}</div>
              </Link>
            ) : (
              <div />
            )}
            {newer ? (
              <Link
                href={`/news/${newer.slug}`}
                className="rounded-xl border border-border p-4 text-right transition hover:bg-muted"
              >
                <div className="text-xs text-muted-foreground">Newer →</div>
                <div className="mt-1 font-medium">{newer.title}</div>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <PostMeta item={item} author={author} minutes={minutes} raw={raw} />
            <Toc items={toc} />
          </div>
        </aside>
      </div>
    </div>
  );
}