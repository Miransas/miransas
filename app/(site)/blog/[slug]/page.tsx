/* eslint-disable @next/next/no-img-element */
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, User, Sparkles, Calendar } from "lucide-react";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

// ─── DECODER: Fixes escaped HTML from the database ───
const decodeHTML = (html: string) => {
  if (!html) return "";
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/");
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug));

  if (!post || !post.published) notFound();

  return (
    <main className="min-h-screen bg-[#030303] text-zinc-400 pt-40 pb-32 overflow-x-hidden">
      <article className="max-w-4xl mx-auto px-6 relative">
        
        {/* AMBIENT GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/5 blur-[150px] pointer-events-none rounded-full" />

        {/* BACK ACTION */}
        <Link href="/blog"
          className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-white mb-16 transition-colors relative z-10"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Return to Archives
        </Link>

        {/* HEADER SECTION */}
        <header className="mb-16 relative z-10">
          <div className="flex items-center gap-6 mb-10 flex-wrap">
            <span className="flex items-center gap-2 text-[10px] font-black px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-widest">
              <Sparkles size={12} /> {post.tag}
            </span>
            <span className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
              <Clock size={14} /> {post.readTime} MIN READ
            </span>
            <span className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
              <Calendar size={14} /> 
              {new Date(post.createdAt!).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter text-white mb-8 leading-[0.85]">
            {post.title}
          </h1>

          <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed font-light italic border-l-4 border-purple-500/30 pl-8">
            {post.excerpt}
          </p>
        </header>

        {/* AUTHOR & ORIGIN */}
        <div className="flex items-center gap-5 py-8 border-y border-white/5 mb-20 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/10">
            <User size={24} className="text-zinc-600" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-300">{post.authorName}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 mt-1">Miransas Neural Node</div>
          </div>
        </div>

        {/* HERO IMAGE */}
        {post.coverImage && (
          <div className="w-full aspect-[21/9] rounded-[3rem] overflow-hidden mb-24 relative z-10 border border-white/5 shadow-2xl hover:grayscale-0 transition-all duration-700">
            <img
              src={post.coverImage}
              alt={post.title || "Cover"}
              className="w-full h-full object-cover"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" /> */}
          </div>
        )}

        {/* CONTENT RENDERER */}
        <div
          className="prose prose-invert prose-miransas max-w-none 
            prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-white
            prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-lg prose-p:font-light
            prose-strong:text-zinc-200 prose-strong:font-bold
            prose-blockquote:border-purple-500 prose-blockquote:bg-purple-500/5 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl
            prose-code:text-purple-400 prose-code:bg-purple-500/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#080808] prose-pre:border prose-pre:border-white/5 prose-pre:rounded-[2rem]
            prose-ul:list-disc prose-li:marker:text-purple-500
            prose-img:rounded-[2.5rem] prose-img:border prose-img:border-white/5
            relative z-10"
          dangerouslySetInnerHTML={{ __html: decodeHTML(post.content || "<p>System error: No data payload found.</p>") }}
        />

        {/* FOOTER CTA */}
        {/* <div className="mt-40 p-12 rounded-[3rem] bg-gradient-to-br from-zinc-900/40 to-black border border-white/5 text-center space-y-8 relative z-10">
          <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">
            Ready to integrate?
          </h3>
          <p className="text-zinc-500 max-w-md mx-auto text-sm font-light leading-relaxed">
            Discover how Miransas can optimize your infrastructure through custom automation and neural nodes.
          </p>
          <Link 
            href="/contact"
            className="inline-block px-12 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-transform"
          >
            Deploy Inquiry
          </Link>
        </div> */}

      </article>
    </main>
  );
}