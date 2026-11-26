import { ContentTheme } from '@/components/shared/content-theme';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AUTHORS,
  DEFAULT_NEWS_IMAGE,
  NEWS,
  type NewsItem,
} from '@/constants/news';
import { CopyMdxButton } from '@/components/news/copy-mdx-button';
import { Toc } from '@/components/news/toc';
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
} from '@/lib/news';
import { extractToc } from '@/lib/toc';
import { FaGithub } from 'react-icons/fa6';
import { JsonLd } from '@/src/components/seo/JsonLd';
import {
  SITE_NAME,
  SITE_URL,
  createPageMetadata,
  getBreadcrumbJsonLd,
} from '@/src/lib/seo';

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
  return createPageMetadata({
    title: item.title,
    description: item.summary,
    path: `/news/${item.slug}`,
    ogType: 'article',
    publishedTime: item.date,
  });
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
    <div className="surface-card space-y-4 rounded-3xl p-5">
      <div className="text-sm">
        <div className="text-heading font-semibold">{author.name}</div>
        <div className="text-secondary-copy text-xs leading-[1.45] sm:text-[13px]">
          {author.role}
        </div>
      </div>

      <div className="text-secondary-copy text-xs leading-[1.45] sm:text-[13px]">
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
          className="surface-card-elevated text-prominent hover:text-heading inline-flex items-center rounded-xl px-3.5 py-2 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] sm:text-[13px]"
        >
          Edit on GitHub <FaGithub className="ml-2" size={15} />
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
  const related = getRelated(slug);

  const articleJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: item.title,
      description: item.summary,
      datePublished: item.date,
      dateModified: item.date,
      url: `${SITE_URL}/news/${item.slug}`,
      mainEntityOfPage: `${SITE_URL}/news/${item.slug}`,
      image: `${SITE_URL}${item.image ?? DEFAULT_NEWS_IMAGE}`,
      author: [
        {
          '@type': 'Person',
          name: author.name,
        },
        {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
      ],
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/icons/logo.png`,
        },
      },
    },
    getBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'News', path: '/news' },
      { name: item.title, path: `/news/${item.slug}` },
    ]),
  ];

  return (
    <div className="mx-auto max-w-6xl min-w-0 px-6 py-16">
      <JsonLd data={articleJsonLd} />
      <Link
        href="/news"
        className="surface-card hover:surface-card-elevated text-prominent inline-flex min-h-10 items-center rounded-xl px-4 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff] sm:text-[13px]"
      >
        ← All news
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <article className="max-w-3xl min-w-0">
          <header className="pb-6">
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <Link
                  key={t}
                  href={`/news?tag=${encodeURIComponent(t)}`}
                  className="surface-card hover:surface-card-elevated text-prominent rounded-xl px-3 py-1 text-xs leading-[1.45] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
                >
                  {t}
                </Link>
              ))}
            </div>

            <h1 className="text-heading mt-5 text-[2.75rem] leading-[1.03] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              {item.title}
            </h1>
            <p className="text-secondary-copy mt-4 text-base leading-[1.6] sm:text-lg lg:text-[1.1875rem]">
              {item.summary}
            </p>

            <div className="mt-6 lg:hidden">
              <PostMeta item={item} author={author} minutes={minutes} raw={raw} />
            </div>
          </header>

          <div className="relative mt-6 aspect-[1200/630] w-full overflow-hidden rounded-4xl">
            <Image
              src={item.image ?? DEFAULT_NEWS_IMAGE}
              alt={item.title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>

          <ContentTheme>
            <div className="mt-8">
              <Post />
            </div>

            {related.length > 0 && (
              <section className="mt-16 pt-8">
                <h2 className="text-prominent mb-4 text-xs font-medium tracking-[0.12em] uppercase sm:text-[13px]">
                  Related posts
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/news/${r.slug}`}
                        className="surface-card hover:bg-surface-card-elevated block h-full rounded-3xl p-5 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
                      >
                        <span className="text-supporting-copy block text-xs leading-[1.45]">
                          {formatDate(r.date)}
                        </span>
                        <h3 className="text-heading mt-2 text-lg leading-[1.2] font-semibold">
                          {r.title}
                        </h3>
                        <p className="text-supporting-copy mt-2 line-clamp-2 text-[15px] leading-[1.6]">
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
              className="mt-12 grid gap-4 pt-4 sm:grid-cols-2"
            >
              {older ? (
                <Link
                  href={`/news/${older.slug}`}
                  className="surface-card hover:bg-surface-card-elevated rounded-3xl p-5 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
                >
                  <span className="text-supporting-copy block text-xs leading-[1.45]">
                    ← Older
                  </span>
                  <span className="text-heading mt-1 block font-semibold">
                    {older.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {newer ? (
                <Link
                  href={`/news/${newer.slug}`}
                  className="surface-card hover:bg-surface-card-elevated rounded-3xl p-5 text-right transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
                >
                  <span className="text-supporting-copy block text-xs leading-[1.45]">
                    Newer →
                  </span>
                  <span className="text-heading mt-1 block font-semibold">
                    {newer.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </ContentTheme>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <PostMeta item={item} author={author} minutes={minutes} raw={raw} />
            <ContentTheme><Toc items={toc} /></ContentTheme>
          </div>
        </aside>
      </div>
    </div>
  );
}
