import { ContentTheme } from '@/components/shared/content-theme';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageIntro, PageAction } from '@/components/pages/page-intro';
import { Reveal } from '@/components/shared/reval';
import { DEFAULT_NEWS_IMAGE } from '@/constants/news';
import {
  formatDate,
  getAllNews,
  getAllTags,
  getAuthor,
  getRawMdx,
  readingMinutes,
} from '@/lib/news';
import { JsonLd } from '@/src/components/seo/JsonLd';
import { createPageMetadata, getBreadcrumbJsonLd } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'News & Engineering Notes — Voice AI & Miralas',
  description:
    'Read official engineering notes, Miralas development updates, voice AI research milestones, and systems architecture decisions published by Miransas.',
  path: '/news',
  rssPath: '/news/rss.xml',
});

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const tags = getAllTags();
  const items = getAllNews().filter((i) => !tag || i.tags.includes(tag));
  const minutes = await Promise.all(
    items.map(async (i) => readingMinutes(await getRawMdx(i.slug)))
  );

  const chip =
    'inline-flex min-h-11 items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]';
  const chipIdle =
    'surface-card hover:bg-surface-card-elevated text-prominent';
  const chipActive = 'bg-[#3847ff] text-white';

  return (
    <div className="mx-auto max-w-6xl min-w-0 px-6 py-16">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'News', path: '/news' },
        ])}
      />
      <PageIntro
        eyebrow="From the studio"
        title="News & engineering notes."
        description="Product updates, development decisions and the work behind Miransas. Read the published record, or follow new entries through RSS."
      >
        <div className="mt-8">
          <PageAction href="/news/rss.xml" primary>
            Subscribe with RSS
          </PageAction>
        </div>
      </PageIntro>
      <ContentTheme>

        <nav aria-label="Filter by tag" className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/news"
            aria-current={!tag ? 'page' : undefined}
            className={`${chip} ${!tag ? chipActive : chipIdle}`}
          >
            All
          </Link>
          {tags.map((t) => (
            <Link
              key={t}
              href={`/news?tag=${encodeURIComponent(t)}`}
              aria-current={tag === t ? 'page' : undefined}
              className={`${chip} ${tag === t ? chipActive : chipIdle}`}
            >
              {t}
            </Link>
          ))}
        </nav>

        {items.length === 0 ? (
          <section className="surface-card mt-12 rounded-3xl px-6 py-12">
            <h2 className="text-heading text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl">
              No notes with this tag yet.
            </h2>
            <p className="text-supporting-copy mt-3 text-[15px] leading-[1.6] sm:text-base">
              Try another topic or return to the full publishing archive.
            </p>
            <Link
              href="/news"
              className="text-heading mt-6 inline-flex min-h-11 items-center rounded-xl font-medium underline decoration-[#3847ff] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
            >
              View all news →
            </Link>
          </section>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <li key={item.slug} className="min-w-0">
                <Reveal className="h-full">
                  <Link
                    href={`/news/${item.slug}`}
                    className="surface-card group flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-200 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847ff]"
                  >
                    <div className="relative aspect-[1200/630] w-full overflow-hidden">
                      <Image
                        src={item.image ?? DEFAULT_NEWS_IMAGE}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="surface-card-elevated text-prominent rounded-xl px-2.5 py-1 text-xs leading-[1.45]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-heading mt-4 text-xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-2xl">
                        {item.title}
                      </h2>
                      <p className="text-supporting-copy mt-3 line-clamp-3 text-[15px] leading-[1.6] sm:text-base">
                        {item.summary}
                      </p>

                      <div className="text-supporting-copy mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-5 text-xs leading-[1.45] sm:text-[13px]">
                        <span className="text-prominent font-medium">
                          {getAuthor(item.author).name}
                        </span>
                        <span>·</span>
                        <time dateTime={item.date}>{formatDate(item.date)}</time>
                        <span>·</span>
                        <span>{minutes[i]} min read</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </ContentTheme>
    </div>
  );
}
