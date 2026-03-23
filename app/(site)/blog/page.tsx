import Link from "next/link";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { Clock, ArrowUpRight, Plus, User, Sparkles, Inbox } from "lucide-react";
import { auth } from "@/auth";

export default async function BlogPage() {
  const session = await auth();
  
  // Fetching only published blog posts
  const allPosts = await db.select().from(posts)
    .where(
      and(
        eq(posts.published, true),
        eq(posts.type, "blog")
      )
    )
    .orderBy(desc(posts.createdAt));

  const featuredPost = allPosts.length > 0 ? allPosts[0] : null;
  const regularPosts = allPosts.length > 1 ? allPosts.slice(1) : [];

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-40 pb-32 ">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24 relative">
          <div className="absolute -top-32 -left-20 w-80 h-80 bg-purple-600/10 blur-[150px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-8 backdrop-blur-md">
              <Sparkles size={12} className="text-purple-500" />
              <span>Miransas Insights</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-6 leading-none">
              Archives<span className="text-zinc-700">.</span>
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl font-light leading-relaxed border-l-4 border-purple-500/30 pl-8 italic">
              Deep dives into neural automation, low-level systems, and the engineering behind the Miransas ecosystem.
            </p>
          </div>

          {/* ADMIN ACTION - Replace email with your actual admin email */}
          {session?.user?.email === "seninemailin@gmail.com" && (
            <Link href="/admin/new"
              className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] z-10"
            >
              <Plus size={16} className="transition-transform group-hover:rotate-90 duration-500" /> 
              Create Entry
            </Link>
          )}
        </div>

        {allPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 border border-dashed border-zinc-800 rounded-[3rem] bg-zinc-900/10">
            <div className="w-20 h-20 mb-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-700">
              <Inbox size={32} />
            </div>
            <p className="text-zinc-600 text-lg font-black uppercase tracking-widest italic">No transmissions found.</p>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* FEATURED ENTRY */}
            {featuredPost && (
              <Link 
                href={`/blog/${featuredPost.slug}`}
                className="group relative block w-full bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-3 hover:border-purple-500/40 transition-all duration-700 hover:bg-[#0d0d0d] overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row gap-12 items-center p-8 lg:p-10">
                  <div className="w-full lg:w-1/2 aspect-video lg:aspect-[16/10] rounded-[2rem] overflow-hidden relative bg-zinc-950 shrink-0">
                    {featuredPost.coverImage ? (
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover  opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 italic font-black text-zinc-800 text-8xl">
                        CORE
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>

                  <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-[0.2em]">
                        {featuredPost.tag}
                      </span>
                      <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} /> {featuredPost.readTime} MIN READ
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-[0.9] text-white group-hover:text-purple-400 transition-colors duration-500">
                      {featuredPost.title}
                    </h2>

                    <p className="text-zinc-500 text-lg font-light leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 group-hover:border-purple-500/30 transition-colors">
                          <User size={18} className="text-zinc-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">{featuredPost.authorName}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                            {new Date(featuredPost.createdAt!).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600 transition-all duration-500 shadow-2xl">
                        <ArrowUpRight size={24} className="text-zinc-500 group-hover:text-white transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* REGULAR GRID */}
            {regularPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                {regularPosts.map(post => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-3 hover:bg-[#0d0d0d] hover:border-purple-500/20 transition-all duration-500"
                  >
                    <div className="w-full aspect-[2/1] rounded-[2rem] overflow-hidden relative mb-6 bg-zinc-950">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 font-black text-zinc-800 text-4xl italic">
                          NODE
                        </div>
                      )}
                    </div>

                    <div className="px-6 pb-6 flex flex-col flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[9px] font-black px-3 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/10 uppercase tracking-widest">
                          {post.tag}
                        </span>
                        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                          <Clock size={10} /> {post.readTime} MIN
                        </span>
                      </div>

                      <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4 group-hover:text-purple-400 transition-colors line-clamp-2 leading-none">
                        {post.title}
                      </h3>

                      <p className="text-sm text-zinc-500 font-light leading-relaxed line-clamp-2 mb-8 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">
                          {new Date(post.createdAt!).toLocaleDateString("en-US")}
                        </span>
                        <ArrowUpRight size={18} className="text-zinc-700 group-hover:text-purple-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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