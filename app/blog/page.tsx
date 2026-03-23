import Link from "next/link";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm"; // 'and' importu eklendi
import { Clock, ArrowUpRight, Plus, User, Sparkles } from "lucide-react";
import { auth } from "@/auth";

export default async function BlogPage() {
  const session = await auth();
  
  // Sadece yayında olan VE tipi 'blog' olanları çekiyoruz
  const allPosts = await db.select().from(posts)
    .where(
      and(
        eq(posts.published, true),
        eq(posts.type, "blog") // Sadece blog yazılarını getir
      )
    )
    .orderBy(desc(posts.createdAt));

  // Yazı yoksa featuredPost undefined olur, hata almamak için güvenli ayırıyoruz
  const featuredPost = allPosts.length > 0 ? allPosts[0] : null;
  const regularPosts = allPosts.length > 1 ? allPosts.slice(1) : [];

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-32 pb-24 selection:bg-purple-500/30">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* HEADER ALANI */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/20 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-6">
              <Sparkles size={14} className="text-purple-400" />
              <span>Miransas Insights</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 bg-gradient-to-br from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
              Blog.
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
              Otomasyon, Yapay Zeka ve Worktionun inşası hakkında en son güncellemeler ve derinlemesine rehberler.
            </p>
          </div>

          {/* Sadece Admin görebilsin (Buradaki maili kendi mailin yap) */}
          {session?.user?.email === "seninemailin@gmail.com" && (
            <Link href="/admin/new"
              className="group relative flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black text-sm font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] z-10"
            >
              <Plus size={16} className="transition-transform group-hover:rotate-90 duration-300" /> 
              Yeni Yazı Yaz
            </Link>
          )}
        </div>

        {allPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
            <div className="w-16 h-16 mb-4 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Sparkles size={24} />
            </div>
            <p className="text-zinc-400 text-lg font-medium mb-2">Henüz yazı bulunamadı.</p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* 1. ÖNE ÇIKAN YAZI */}
            {featuredPost && (
              <Link 
                href={`/blog/${featuredPost.slug}`}
                className="group relative block w-full bg-zinc-900/40 border border-white/[0.05] rounded-[2rem] p-2 hover:border-purple-500/30 transition-all duration-500 hover:bg-zinc-900/80 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center p-6 md:p-8">
                  <div className="w-full md:w-1/2 aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden relative bg-zinc-950 shrink-0">
                    {featuredPost.coverImage ? (
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-zinc-900">
                        <span className="text-6xl">📝</span>
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 uppercase">
                        {featuredPost.tag}
                      </span>
                      <span className="text-xs font-medium text-zinc-500 flex items-center gap-1">
                        <Clock size={12} /> {featuredPost.readTime} dk okuma
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-purple-300 transition-colors duration-300">
                      {featuredPost.title}
                    </h2>

                    <p className="text-zinc-400 text-base md:text-lg leading-relaxed line-clamp-3 mb-8">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                          <User size={16} className="text-zinc-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-200">{featuredPost.authorName}</p>
                          <p className="text-xs text-zinc-500">{new Date(featuredPost.createdAt!).toLocaleDateString("tr-TR")}</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600 transition-all duration-300">
                        <ArrowUpRight size={20} className="text-zinc-400 group-hover:text-white transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* 2. DİĞER YAZILAR */}
            {regularPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                {regularPosts.map(post => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-zinc-900/20 border border-white/[0.05] rounded-3xl p-2 hover:bg-zinc-900/60 transition-all duration-300"
                  >
                    <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden relative mb-4 bg-zinc-950">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                          <Sparkles className="text-zinc-700" size={32} />
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-1 text-left">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 uppercase">
                          {post.tag}
                        </span>
                        <span className="text-xs text-zinc-500 flex items-center gap-1">
                          <Clock size={12} /> {post.readTime} dk
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-sm text-zinc-500 line-clamp-2 mb-6 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.02]">
                        <span className="text-xs text-zinc-600 font-medium">
                          {new Date(post.createdAt!).toLocaleDateString("tr-TR")}
                        </span>
                        <ArrowUpRight size={18} className="text-zinc-600 group-hover:text-purple-400 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}