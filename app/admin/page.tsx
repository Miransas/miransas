/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc, eq, and, ilike } from "drizzle-orm";
import { auth } from "@/auth";
import Link from "next/link";
import { 
  LayoutGrid, Briefcase, Newspaper, History, 
  FileCode, Plus, Edit, ExternalLink, CheckCircle2, CircleDashed 
} from "lucide-react";

// Ayırdığımız küçük parçaları import ediyoruz
import { SearchBar } from "@/components/admin/search-bar";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}) {
  const session = await auth();
  
  // 1. Next.js 15 Kuralı: Promise olan searchParams'ı bekliyoruz
  const { type, q } = await searchParams;
  const currentType = type || "all";
  const searchQuery = q || "";

  // 2. Veritabanı Filtreleme Mantığı
  const conditions = [];
  if (currentType !== "all") {
    conditions.push(eq(posts.type, currentType as any));
  }
  if (searchQuery) {
    conditions.push(ilike(posts.title, `%${searchQuery}%`));
  }

  // Verileri çekiyoruz
  const filteredPosts = await db.select().from(posts)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(posts.createdAt));

  // Sayısal istatistikler için tüm veriyi bir kez çekelim
  const allData = await db.select().from(posts);
  const getCount = (t: string) => allData.filter(p => p.type === t).length;

  const TABS = [
    { id: "all", label: "Hepsi", icon: <LayoutGrid size={14} />, count: allData.length },
    { id: "project", label: "Projeler", icon: <Briefcase size={14} />, count: getCount("project") },
    { id: "blog", label: "Blog", icon: <Newspaper size={14} />, count: getCount("blog") },
    { id: "changelog", label: "Changelog", icon: <History size={14} />, count: getCount("changelog") },
    { id: "docs", label: "Dökümanlar", icon: <FileCode size={14} />, count: getCount("docs") },
  ];

  return (
    <div className="space-y-10">
      {/* ÜST PANEL: Başlık, Arama ve Yeni Ekle */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter italic uppercase text-white">Arşiv.</h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Miransas Control Center</p>
        </div>
        
        <div className="flex flex-1 max-w-2xl items-center gap-4">
          <SearchBar />
          <Link href="/admin/new" className="shrink-0 flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 active:scale-95">
            <Plus size={18} /> Yeni Ekle
          </Link>
        </div>
      </div>

      {/* KATEGORİ SEKMELERİ */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-zinc-900/50 border border-white/5 rounded-[2rem] w-fit backdrop-blur-md">
        {TABS.map((tab) => (
          <Link
            key={tab.id}
            href={tab.id === "all" ? "/admin" : `/admin?type=${tab.id}`}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              currentType === tab.id 
              ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20" 
              : "text-zinc-500 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.icon}
            {tab.label}
            <span className={`ml-2 px-1.5 py-0.5 rounded text-[9px] ${currentType === tab.id ? "bg-white/20" : "bg-zinc-800"}`}>
              {tab.count}
            </span>
          </Link>
        ))}
      </div>

      {/* İÇERİK TABLOSU */}
      <div className="bg-zinc-900/20 border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="p-8 text-[10px] font-black uppercase text-zinc-600 tracking-[0.2em]">Başlık / Slug</th>
              <th className="p-8 text-[10px] font-black uppercase text-zinc-600 tracking-[0.2em]">Tür</th>
              <th className="p-8 text-[10px] font-black uppercase text-zinc-600 tracking-[0.2em] text-center">Durum</th>
              <th className="p-8 text-right text-[10px] font-black uppercase text-zinc-600 tracking-[0.2em]">Aksiyon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr key={post.id} className="group hover:bg-white/[0.02] transition-all">
                  <td className="p-8">
                    <div className="font-bold text-sm text-zinc-200 group-hover:text-purple-400 transition-colors uppercase tracking-tight italic">
                      {post.title}
                    </div>
                    <div className="text-[10px] text-zinc-600 font-mono mt-1 opacity-50">/{post.slug}</div>
                  </td>
                  <td className="p-8">
                    <span className="text-[9px] font-black uppercase px-2.5 py-1 rounded-lg bg-zinc-800/50 text-zinc-500 border border-white/5">
                      {post.type}
                    </span>
                  </td>
                  <td className="p-8 text-center">
                    {post.published ? (
                      <div className="inline-flex items-center gap-1.5 text-emerald-500 text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        <CheckCircle2 size={10} /> Yayında
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 text-zinc-600 text-[9px] font-black uppercase tracking-widest bg-zinc-800/50 px-3 py-1 rounded-full border border-white/5">
                        <CircleDashed size={10} /> Taslak
                      </div>
                    )}
                  </td>
                  <td className="p-8">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      {/* Önizleme */}
                      <Link 
                        href={`/${post.type === 'project' ? 'projects' : post.type}/${post.slug}`} 
                        target="_blank" 
                        className="p-2.5 bg-zinc-800 hover:bg-white hover:text-black rounded-xl text-zinc-400 transition-all border border-white/5"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      {/* Düzenle */}
                      <Link 
                        href={`/admin/edit/${post.slug}`} 
                        className="p-2.5 bg-zinc-800 hover:bg-purple-600 hover:text-white rounded-xl text-zinc-400 transition-all border border-white/5"
                      >
                        <Edit size={14} />
                      </Link>
                      {/* Silme (Yeni Bileşen) */}
                      <DeleteButton slug={post.slug} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-32 text-center">
                  <p className="text-zinc-600 font-black italic tracking-widest uppercase text-xs mb-4">Arama kriterlerine uygun içerik bulunamadı.</p>
                  <Link href="/admin" className="text-purple-500 text-[10px] font-black uppercase tracking-widest hover:underline">Filtreleri Temizle</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}