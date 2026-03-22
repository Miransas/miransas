/* eslint-disable react/no-unescaped-entities */
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, User } from "lucide-react";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post] = await db.select().from(posts)
    .where(eq(posts.slug, slug));

  if (!post || !post.published) notFound();

  return (
    <div>
      <Link href="/blog"
        className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 mb-8 transition-colors"
      >
        <ArrowLeft size={12} /> Blog'a Dön
      </Link>
      {/* Cover image — başlıktan önce ekle */}
      {post.coverImage && (
        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.titleTr}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-purple-500/10 text-purple-300 border-purple-500/20">
            {post.tag}
          </span>
          <div className="flex items-center gap-1 text-xs text-zinc-600">
            <Clock size={10} /> {post.readTime} dk okuma
          </div>
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white mb-4">{post.titleTr}</h1>
        <p className="text-zinc-400 text-lg mb-6">{post.excerptTr}</p>
        <div className="flex items-center gap-3 pb-6 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
            <User size={14} className="text-purple-400" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-300">{post.authorName}</div>
            <div className="text-xs text-zinc-600">
              {new Date(post.createdAt!).toLocaleDateString("tr-TR")}
            </div>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div
        className="prose prose-invert prose-zinc max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-purple-400 prose-code:text-purple-300 prose-code:bg-purple-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800"
        dangerouslySetInnerHTML={{ __html: post.contentTr }}
      />
    </div>
  );
}