import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { AnimatedBadge } from "../../../../components/shared/animated-badge";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 1. Next.js 15 kuralı: Params'ı bekliyoruz
  const { slug } = await params;

  // 2. Veriyi çekiyoruz
  const project = await db.query.posts.findFirst({
    where: eq(posts.slug, slug),
  });

  // 3. Proje yoksa 404
  if (!project || project.type !== "project") notFound();
  // Veritabanından gelen şifrelenmiş (escaped) HTML'i gerçek HTML'e çevirir
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
  return (
    <div className="min-h-screen bg-[#030303] pt-40 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* ÜST KISIM: Geri Dön ve Badge */}
        <div className="flex flex-col gap-8 mb-12">
          <Link href="/projects" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
            <ArrowLeft size={14} /> Geri Dön
          </Link>

          <div className="flex items-center gap-6">
            {/* EĞER BİNBOI İSE BADGE GÖSTER */}
            {project.slug.includes("binboi") && (
              <AnimatedBadge text="LAUNCHING SOON" color="purple" />
            )}

            <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
              <Clock size={12} /> {project.readTime} DK OKUMA
            </div>
          </div>
        </div>

        {/* BAŞLIK VE ÖZET */}
        <header className="mb-16">
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] text-white mb-8">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed border-l-4 border-purple-600 pl-8 italic">
            {project.excerpt}
          </p>
        </header>

        {/* KAPAK GÖRSELİ */}
        {project.coverImage && (
          <div className="relative w-full aspect-[21/9] rounded-[3rem] overflow-hidden mb-20 border border-white/5">
            <img src={project.coverImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
          </div>
        )}

        {/* ASIL İÇERİK (HTML BURADA ÇÖZÜLÜYOR) */}
        <article className="prose prose-invert prose-miransas max-w-none">
          <div dangerouslySetInnerHTML={{ __html: decodeHTML(project.content) }} />
        </article>

      </div>
    </div>
  );
}