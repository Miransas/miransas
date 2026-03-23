import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, User, Sparkles, Calendar } from "lucide-react";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug));

  if (!post || !post.published) notFound();

  return (
    <main className="min-h-screen bg-[#000000] text-zinc-200 pt-32 pb-32 selection:bg-purple-500/30">
      <article className="max-w-3xl mx-auto px-6 relative">
        
        {/* Arka plan parlama efekti */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[120px] pointer-events-none rounded-full" />

        {/* Geri Dön Butonu */}
        <Link href="/blog"
          className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white mb-12 transition-colors relative z-10"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Blog&#39;a Dön
        </Link>

        {/* BAŞLIK VE META BİLGİLERİ */}
        <header className="mb-12 relative z-10">
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 shadow-[0_0_15px_-3px_rgba(168,85,247,0.2)]">
              <Sparkles size={12} /> {post.tag}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
              <Clock size={14} /> {post.readTime} dk okuma
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
              <Calendar size={14} /> 
              {new Date(post.createdAt!).toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
            {post.title}
          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed font-light">
            {post.excerpt}
          </p>
        </header>

        {/* YAZAR KARTI */}
        <div className="flex items-center gap-4 py-6 border-y border-white/[0.05] mb-12 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-zinc-800 flex items-center justify-center border border-white/10 shadow-inner">
            <User size={20} className="text-purple-400" />
          </div>
          <div>
            <div className="text-base font-bold text-white">{post.authorName}</div>
            <div className="text-sm text-zinc-500">Worktio Insights</div>
          </div>
        </div>

        {/* KAPAK GÖRSELİ (Devasa ve Şık) */}
        {post.coverImage && (
          <div className="w-full aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 relative z-10 shadow-2xl shadow-black/50 border border-white/[0.05]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title || "Cover"}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* İÇERİK (Zengin Metin - Typography ile Boyanmış) */}
        <div
          className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-black prose-headings:tracking-tight prose-headings:text-white prose-headings:scroll-mt-32
            prose-p:text-zinc-300 prose-p:leading-relaxed 
            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-bold
            prose-code:text-purple-300 prose-code:bg-purple-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-zinc-800/50 prose-pre:shadow-2xl prose-pre:rounded-xl
            prose-ul:text-zinc-300 prose-li:marker:text-purple-500
            prose-img:rounded-2xl prose-img:border prose-img:border-zinc-800/50 prose-img:shadow-2xl
            relative z-10"
          dangerouslySetInnerHTML={{ __html: post.content || "<p>İçerik henüz eklenmemiş.</p>" }}
        />
      </article>
    </main>
  );
}