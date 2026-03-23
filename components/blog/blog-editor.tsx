/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, Loader2, ImagePlus, X, 
  Newspaper, History, FileCode, Briefcase, Check, ArrowLeft 
} from "lucide-react";
import RichTextEditor from "./rich-text-editor";
import Link from "next/link";
import { toast } from "sonner";

export default function BlogEditor({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    
    const [form, setForm] = useState({
        slug: initialData?.slug ?? "",
        type: initialData?.type ?? "blog",
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
    if (!form.slug || !form.title) {
        toast.error("Başlık ve Slug alanları boş bırakılamaz!");
        return;
    }

    setSaving(true);

    // Toast mekanizmasını başlatıyoruz
    const savePromise = new Promise(async (resolve, reject) => {
        try {
            const url = initialData ? `/api/posts/${initialData.slug}` : "/api/posts";
            const method = initialData ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                resolve(data);
                // Kısa bir gecikme ile yönlendir ki kullanıcı başarı mesajını görsün
                setTimeout(() => {
                    router.push(`/admin?type=${form.type}`);
                    router.refresh();
                }, 1500);
            } else {
                // API'den gelen spesifik hata mesajını (örneğin: slug çakışması) fırlatıyoruz
                reject(data.error || "Bir sorun oluştu.");
            }
        } catch (error) {
            reject("Sunucuya bağlanılamadı.");
        } finally {
            setSaving(false);
        }
    });

    toast.promise(savePromise, {
        loading: 'Veriler Miransas Core\'a iletiliyor...',
        success: (data: any) => `${form.title} başarıyla kaydedildi!`,
        error: (err) => `Hata: ${err}`,
    });
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
        { id: "blog", label: "Blog", icon: <Newspaper size={14} /> },
        { id: "changelog", label: "Changelog", icon: <History size={14} /> },
        { id: "docs", label: "Docs", icon: <FileCode size={14} /> },
        { id: "project", label: "Project", icon: <Briefcase size={14} /> },
    ];

    return (
        <div className="min-h-screen bg-[#030303]">
            {/* ─── STICKY HEADER (Seni asla bırakmaz) ─── */}
            <div className="sticky top-0 z-[50] w-full bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 mb-10">
                <div className="max-w-full  mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 hover:bg-white/5 rounded-xl transition-colors text-zinc-500">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-sm font-black uppercase tracking-widest text-white italic">
                                {initialData ? "İçeriği Düzenle" : "Yeni İçerik"}
                            </h1>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Miransas Editor v2.0</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <span className="text-[10px] font-black text-zinc-500 group-hover:text-zinc-300 uppercase tracking-widest transition-colors">Yayınla</span>
                            <div
                                onClick={() => setForm(f => ({ ...f, published: !f.published }))}
                                className={`w-10 h-5 rounded-full transition-all relative flex items-center ${form.published ? "bg-purple-600" : "bg-zinc-800"}`}
                            >
                                <div className={`absolute w-3.5 h-3.5 rounded-full bg-white transition-transform ${form.published ? "translate-x-5.5" : "translate-x-1"}`} />
                            </div>
                        </label>

                        <button
                            onClick={handleSave}
                            disabled={saving || !form.slug || !form.title}
                            className="flex items-center gap-2 px-8 py-2.5 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95"
                        >
                            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                            {initialData ? "Güncelle" : "Kaydet"}
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── MAİN CONTENT ─── */}
            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 pb-20">
                
                {/* SOL TARAF: Yazı Alanı (Geniş) */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-zinc-900/20 border border-white/5 p-10 rounded-[3rem] backdrop-blur-xl">
                        <input
                            value={form.title}
                            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                            placeholder="Başlık buraya..."
                            className="w-full bg-transparent text-5xl font-black text-white outline-none placeholder:text-zinc-800 italic mb-6 tracking-tighter border-b border-white/5 pb-4"
                        />
                        <textarea
                            value={form.excerpt}
                            onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                            placeholder="Okuyucuyu etkileyecek kısa bir özet..."
                            rows={3}
                            className="w-full bg-transparent text-lg text-zinc-500 outline-none resize-none leading-relaxed mb-8 border-l-2 border-white/5 pl-6 italic"
                        />
                        <div className="pt-8 border-t border-white/5 min-h-[500px]">
                            <RichTextEditor
                                content={form.content}
                                onChange={(html) => setForm(f => ({ ...f, content: html }))}
                            />
                        </div>
                    </div>
                </div>

                {/* SAĞ TARAF: Ayarlar Sidebar (Dar) */}
                <div className="lg:col-span-4 space-y-6">
                    
                    {/* KATEGORİ */}
                    <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-[2rem] space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">İçerik Türü</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {CATEGORIES.map((cat) => (
                                <button 
                                    key={cat.id}
                                    onClick={() => setForm(f => ({ ...f, type: cat.id as any }))}
                                    className={`flex items-center gap-2 p-3 rounded-xl border text-[10px] font-bold uppercase transition-all ${
                                        form.type === cat.id 
                                        ? "bg-white/10 border-white/20 text-white" 
                                        : "bg-transparent border-white/5 text-zinc-600 hover:border-white/10"
                                    }`}
                                >
                                    {cat.icon} {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* META BİLGİLER */}
                    <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-[2rem] space-y-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Meta Verileri</h3>
                        
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-2">URL Slug</label>
                            <input
                                value={form.slug}
                                onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                                className="w-full bg-black/40 border border-white/5 p-3 rounded-xl text-xs text-zinc-300 outline-none focus:border-purple-500/50 transition-all font-mono"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-2">Etiket</label>
                                <select
                                    value={form.tag}
                                    onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                                    className="w-full bg-black/40 border border-white/5 p-3 rounded-xl text-xs text-zinc-300 outline-none"
                                >
                                    {["All", "Guide", "Announcement", "Update", "Info"].map(t => (
                                        <option key={t} value={t} className="bg-zinc-900">{t}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-2">Dk.</label>
                                <input
                                    type="number"
                                    value={form.readTime}
                                    onChange={e => setForm(f => ({ ...f, readTime: parseInt(e.target.value) || 1 }))}
                                    className="w-full bg-black/40 border border-white/5 p-3 rounded-xl text-xs text-zinc-300 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* KAPAK GÖRSELİ */}
                    <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-[2rem] space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Kapak Görseli</h3>
                        <div className={`relative aspect-video border-2 border-dashed rounded-2xl transition-all overflow-hidden flex items-center justify-center ${form.coverImage ? "border-purple-500/20 bg-purple-500/5" : "border-white/5 bg-black/40"}`}>
                            {form.coverImage ? (
                                <div className="relative w-full h-full group">
                                    <img src={form.coverImage} alt="" className="w-full h-full object-cover" />
                                    <button onClick={() => setForm(f => ({ ...f, coverImage: "" }))} className="absolute inset-0 m-auto w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={20} />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full py-10">
                                    <ImagePlus size={24} className="text-zinc-700 mb-2" />
                                    <span className="text-[10px] font-black text-zinc-700 uppercase">Görsel </span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}