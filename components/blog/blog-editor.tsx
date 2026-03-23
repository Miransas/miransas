/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, Loader2, ImagePlus, X, 
  Newspaper, History, FileCode, Briefcase, Check 
} from "lucide-react";
import RichTextEditor from "./rich-text-editor";

export default function BlogEditor({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    
    const [form, setForm] = useState({
        slug: initialData?.slug ?? "",
        type: initialData?.type ?? "blog", // 'blog' | 'changelog' | 'docs' | 'project'
        tag: initialData?.tag ?? "Rehber",
        readTime: initialData?.readTime ?? 5,
        published: initialData?.published ?? false,
        authorName: initialData?.authorName ?? "Sardor Azimov",
        title: initialData?.title ?? "",
        excerpt: initialData?.excerpt ?? "",
        content: initialData?.content ?? "",
        coverImage: initialData?.coverImage ?? "",
    });

    const handleSave = async () => {
        if (!form.slug || !form.title) return;
        setSaving(true);
        try {
            const url = initialData ? `/api/posts/${initialData.slug}` : "/api/posts";
            const method = initialData ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                // KAYIT BAŞARILI: Seni yazdığın kategorinin listesine gönderir
                // Örneğin: Doküman yazdıysan /admin?type=docs sayfasına gider.
                router.push(`/admin?type=${form.type}`);
                router.refresh();
            }
        } catch (error) {
            console.error("Kayıt hatası:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setForm(f => ({ ...f, coverImage: reader.result as string }));
            reader.readAsDataURL(file);
        }
    };

    const CATEGORIES = [
        { id: "blog", label: "Blog Yazısı", icon: <Newspaper size={18} />, color: "purple" },
        { id: "changelog", label: "Changelog", icon: <History size={18} />, color: "blue" },
        { id: "docs", label: "Doküman", icon: <FileCode size={18} />, color: "emerald" },
        { id: "project", label: "Proje", icon: <Briefcase size={18} />, color: "orange" },
    ];

    return (
        <div className="max-w-4xl mx-auto py-10">
            {/* ÜST PANEL */}
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tighter italic">Yeni İçerik Oluştur</h1>
                    <p className="text-zinc-500 text-sm mt-1">Miransas & Worktio için yeni değerler üret.</p>
                </div>
                
                <div className="flex items-center gap-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <span className="text-[10px] font-black text-zinc-500 group-hover:text-zinc-300 uppercase tracking-widest transition-colors">Yayınla</span>
                        <div
                            onClick={() => setForm(f => ({ ...f, published: !f.published }))}
                            className={`w-12 h-6 rounded-full transition-all relative flex items-center ${form.published ? "bg-purple-600 shadow-[0_0_20px_rgba(147,51,234,0.3)]" : "bg-zinc-800"}`}
                        >
                            <div className={`absolute w-4.5 h-4.5 rounded-full bg-white transition-transform ${form.published ? "translate-x-6.5" : "translate-x-1"}`} />
                        </div>
                    </label>

                    <button
                        onClick={handleSave}
                        disabled={saving || !form.slug || !form.title}
                        className="flex items-center gap-2 px-8 py-3 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-white/5"
                    >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Save
                    </button>
                </div>
            </div>

            {/* 4'LÜ KATEGORİ SEÇİCİ */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                {CATEGORIES.map((cat) => (
                    <button 
                        key={cat.id}
                        onClick={() => setForm(f => ({ ...f, type: cat.id as any }))}
                        className={`relative flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all overflow-hidden ${
                            form.type === cat.id 
                            ? "bg-white/5 border-white/20 text-white" 
                            : "bg-zinc-900/40 border-white/5 text-zinc-500 hover:border-white/10"
                        }`}
                    >
                        {cat.icon}
                        <span className="text-[11px] font-black uppercase tracking-tight">{cat.label}</span>
                        {form.type === cat.id && (
                            <div className="absolute top-1 right-1">
                                <Check size={12} className="text-purple-500" />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* META BİLGİLERİ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-2xl">
                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-2 block">Slug</label>
                    <input
                        value={form.slug}
                        onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                        placeholder="n8n-vs-worktio"
                        className="w-full bg-transparent text-sm text-zinc-300 outline-none font-mono placeholder:text-zinc-800"
                    />
                </div>
                <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-2xl">
                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-2 block">Tag</label>
                    <select
                        value={form.tag}
                        onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                        className="w-full bg-transparent text-sm text-zinc-300 outline-none"
                    >
                        {["Rehber", "Duyuru", "Güncelleme", "İnceleme", "Portfolio"].map(t => (
                            <option key={t} value={t} className="bg-zinc-900">{t}</option>
                        ))}
                    </select>
                </div>
                <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-2xl">
                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-2 block">Okuma Süresi</label>
                    <input
                        type="number"
                        value={form.readTime}
                        onChange={e => setForm(f => ({ ...f, readTime: parseInt(e.target.value) || 1 }))}
                        className="w-full bg-transparent text-sm text-zinc-300 outline-none"
                    />
                </div>
            </div>

            {/* YAZAR & KAPAK */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-2xl flex flex-col justify-center">
                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-2 block">Yazar</label>
                    <input
                        value={form.authorName}
                        onChange={e => setForm(f => ({ ...f, authorName: e.target.value }))}
                        className="w-full bg-transparent text-sm text-zinc-300 outline-none font-bold"
                    />
                </div>
                
                <div className={`relative h-24 border-2 border-dashed rounded-2xl transition-all overflow-hidden flex items-center justify-center ${form.coverImage ? "border-purple-500/20 bg-purple-500/5" : "border-white/5 bg-zinc-900/40 hover:border-white/10"}`}>
                    {form.coverImage ? (
                        <div className="relative w-full h-full group">
                            <img src={form.coverImage} alt="" className="w-full h-full object-cover" />
                            <button
                                onClick={() => setForm(f => ({ ...f, coverImage: "" }))}
                                className="absolute inset-0 m-auto w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                            <ImagePlus size={20} className="text-zinc-700 mb-1" />
                            <span className="text-[9px] font-black text-zinc-700 uppercase tracking-tighter">Kapak Görseli</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    )}
                </div>
            </div>

            {/* EDİTÖR GÖVDESİ */}
            <div className="bg-zinc-900/20 border border-white/5 p-10 rounded-[3rem] backdrop-blur-xl">
                <input
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Yazı başlığı..."
                    className="w-full bg-transparent text-5xl font-black text-white outline-none placeholder:text-zinc-800 italic mb-6 tracking-tighter"
                />
                <textarea
                    value={form.excerpt}
                    onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                    placeholder="Kısa özet..."
                    rows={2}
                    className="w-full bg-transparent text-lg text-zinc-500 outline-none resize-none leading-relaxed mb-8 border-l border-white/5 pl-6"
                />
                <div className="pt-8 border-t border-white/5">
                    <RichTextEditor
                        content={form.content}
                        onChange={(html) => setForm(f => ({ ...f, content: html }))}
                    />
                </div>
            </div>
        </div>
    );
}