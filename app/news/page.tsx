import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageIntro, PageAction } from '@/components/pages/page-intro';
import { Reveal } from '@/components/shared/reval';
import { DEFAULT_NEWS_IMAGE } from '@/constants/news';
import { formatDate, getAllNews, getAllTags, getAuthor, getRawMdx, readingMinutes } from '@/lib/news';

export const metadata: Metadata = {
  title: 'News',
  description: 'Product updates, releases and engineering notes from Miransas.',
  alternates: {
    canonical: '/news',
    types: { 'application/rss+xml': '/news/rss.xml' },
  },
};

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const { tag } = await searchParams;
  const tags = getAllTags();
  const items = getAllNews().filter((i) => !tag || i.tags.includes(tag));
  const minutes = await Promise.all(items.map(async (i) => readingMinutes(await getRawMdx(i.slug))));

  const chip = 'rounded-full border px-3 py-1 text-sm transition';
  const chipIdle = 'border-border text-muted-foreground hover:bg-muted hover:text-foreground';
  const chipActive = 'border-foreground bg-foreground text-background';

  return (
    <div className="mx-auto max-w-6xl min-w-0 px-6 py-16">
      <PageIntro eyebrow="From the studio" title="News & engineering notes." description="Product updates, development decisions and the work behind Miransas. Read the published record, or follow new entries through RSS.">
        <div className="mt-8">
          <PageAction href="/news/rss.xml">Subscribe with RSS</PageAction>
        </div>
      </PageIntro>

      <nav aria-label="Filter by tag" className="mt-8 flex flex-wrap gap-2">
        <Link href="/news" aria-current={!tag ? 'page' : undefined} className={`${chip} ${!tag ? chipActive : chipIdle}`}>
          All
        </Link>
        {tags.map((t) => (
          <Link key={t} href={`/news?tag=${encodeURIComponent(t)}`} aria-current={tag === t ? 'page' : undefined} className={`${chip} ${tag === t ? chipActive : chipIdle}`}>
            {t}
          </Link>
        ))}
      </nav>

      {items.length === 0 ? (
        <section className="border-border mt-12 rounded-2xl border px-6 py-12">
          <h2 className="text-xl font-medium">No notes with this tag yet.</h2>
          <p className="text-muted-foreground mt-3 text-sm leading-7">Try another topic or return to the full publishing archive.</p>
          <Link href="/news" className="mt-6 inline-flex min-h-11 items-center font-medium underline underline-offset-4">
            View all news →
          </Link>
        </section>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.slug} className="min-w-0">
              <Reveal className="h-full">
                <Link href={`/news/${item.slug}`} className="group border-border bg-card/40 hover:bg-card flex h-full flex-col overflow-hidden rounded-2xl border transition">
                  <div className="border-border relative aspect-[1200/630] w-full overflow-hidden border-b">
                    <Image src={item.image ?? DEFAULT_NEWS_IMAGE} alt={item.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-300 group-hover:scale-[1.03] group-hover:brightness-90" />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <span key={t} className="border-border text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs">
                          {t}
                        </span>
                      ))}
                    </div>

                    <h2 className="mt-3 text-lg leading-snug font-semibold tracking-tight">{item.title}</h2>
                    <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-6">{item.summary}</p>

                    <div className="text-muted-foreground mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-5 text-xs">
                      <span className="text-foreground font-medium">{getAuthor(item.author).name}</span>
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
    </div>
  );
}
