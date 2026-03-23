import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc, eq, and } from "drizzle-orm";
import { GitCommit, Sparkles, Box, Zap, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Changelog | Miransas",
  description: "Latest updates and releases from the Worktio and Miransas ecosystem.",
};

// ─── DECODER FONKSİYONU (Dışarıya alındı) ───
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

export default async function ChangelogPage() {
  const updates = await db.select().from(posts)
    .where(
      and(
        eq(posts.published, true),
        eq(posts.type, "changelog")
      )
    )
    .orderBy(desc(posts.createdAt));

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-32 pb-24 0">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-20 text-center relative">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6">
            <Zap size={12} fill="currentColor" />
            <span>System Updates</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic uppercase">
            Changelog.
          </h1>
          <p className="text-zinc-500 max-w-lg mx-auto leading-relaxed">
            The evolution of Miransas and Worktio. Every commit is a new architecture; every update is a superior experience.
          </p>
        </div>

        {updates.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[2.5rem] bg-zinc-900/20">
            <Box size={40} className="mx-auto text-zinc-700 mb-4" />
            <p className="text-zinc-500 font-medium">No release notes have been published yet.</p>
          </div>
        ) : (
          <div className="relative">
            {/* MERKEZİ ÇİZGİ */}
            <div className="absolute left-[17px] top-2 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-zinc-800 to-transparent" />

            <div className="space-y-16">
              {updates.map((update, index) => (
                <div key={update.id} className="relative pl-12 group">
                  
                  {/* TİMELİNE NOKTASI (İCON) */}
                  <div className="absolute left-0 top-1 w-9 h-9 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center z-10 group-hover:border-blue-500/50 transition-colors shadow-xl">
                    <GitCommit size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
                  </div>

                  {/* TARİH ETİKETİ (İngilizce Format) */}
                  <div className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-3">
                    <Calendar size={12} />
                    {new Date(update.createdAt!).toLocaleDateString("en-US", { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                    })}
                  </div>

                  {/* İÇERİK KARTI */}
                  <div className="bg-zinc-900/30 border border-white/5 rounded-[2rem] p-8 backdrop-blur-sm hover:bg-zinc-900/50 transition-all hover:border-white/10 group-hover:translate-x-1 duration-500">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h2 className="text-2xl font-black tracking-tight group-hover:text-blue-400 transition-colors">
                        {update.title}
                      </h2>
                      <span className="shrink-0 px-2 py-1 rounded bg-zinc-800 text-[9px] font-bold text-zinc-500 border border-white/5">
                        v{updates.length - index}.0
                      </span>
                    </div>

                    {/* ÖZET */}
                    <p className="text-zinc-400 leading-relaxed mb-6">
                      {update.excerpt}
                    </p>

                    {/* ─── HATA BURADA ÇÖZÜLDÜ: decodeHTML(update.content || "") eklendi ─── */}
                    <div 
                      className="prose prose-invert prose-sm max-w-none 
                        prose-p:text-zinc-500 prose-p:leading-relaxed
                        prose-headings:text-white prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-2
                        prose-strong:text-zinc-300 prose-strong:font-bold
                        prose-ul:list-disc prose-ul:pl-4
                        prose-li:text-zinc-500 prose-li:mb-2"
                      dangerouslySetInnerHTML={{ __html: decodeHTML(update.content || "") }} 
                    />

                    {/* ETİKETLER */}
                    <div className="mt-8 flex items-center gap-2">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400">
                            <Sparkles size={10} /> {update.tag}
                        </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}