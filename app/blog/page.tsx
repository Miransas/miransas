import Link from "next/link";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Clock, ArrowRight, Plus, User } from "lucide-react";
import { auth } from "@/auth";

export default async function BlogPage() {
  const session = await auth();
  const allPosts = await db.select().from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between mb-12 mt-20 px-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white mb-3">Blog</h1>
          <p className="text-zinc-500">Otomasyon, AI ve Worktio hakkında yazılar.</p>
        </div>
        {session && (
          <Link href="/blog/new"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Plus size={14} /> Yeni Yazı
          </Link>
        )}
      </div>

      {allPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 mb-2">Henüz yazı yok</p>
          <p className="text-zinc-600 text-sm">İlk yazıyı eklemek için + butonuna tıkla</p>
        </div>
      ) : (
        <div className="space-y-4">
          {allPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="group flex gap-5 p-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-white/10 transition-all"
            >
              {/* Cover image — küçük */}
              {post.coverImage ? (
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImage}
                    alt={post.titleTr}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-xl shrink-0 bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
              )}

              {/* İçerik */}
              <div className="flex-1 min-w-0">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-purple-500/10 text-purple-300 border-purple-500/20">
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-zinc-600">
                    <Clock size={10} /> {post.readTime} dk okuma
                  </div>
                  <span className="text-xs text-zinc-700">
                    {new Date(post.createdAt!).toLocaleDateString("tr-TR")}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-zinc-700">
                    <User size={10} /> {post.authorName}
                  </div>
                </div>

                {/* Başlık */}
                <h2 className="text-base font-bold text-white mb-1 group-hover:text-purple-300 transition-colors truncate">
                  {post.titleTr}
                </h2>

                {/* Özet */}
                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
                  {post.excerptTr}
                </p>
              </div>

              {/* Ok */}
              <ArrowRight size={16} className="text-zinc-700 group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}