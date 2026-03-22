/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Eye, EyeOff, ImagePlus, X } from "lucide-react";

export default function BlogEditor({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [tab, setTab] = useState<"tr" | "en" | "uz">("tr");
    const [form, setForm] = useState({
        slug: initialData?.slug ?? "",
        tag: initialData?.tag ?? "Rehber",
        readTime: initialData?.readTime ?? 5,
        published: initialData?.published ?? false,
        authorName: initialData?.authorName ?? "Worktio",
        titleTr: initialData?.titleTr ?? "",
        titleEn: initialData?.titleEn ?? "",
        titleUz: initialData?.titleUz ?? "",
        excerptTr: initialData?.excerptTr ?? "",
        excerptEn: initialData?.excerptEn ?? "",
        excerptUz: initialData?.excerptUz ?? "",
        contentTr: initialData?.contentTr ?? "",
        contentEn: initialData?.contentEn ?? "",
        contentUz: initialData?.contentUz ?? "",
        coverImage: initialData?.coverImage ?? "",
    });

    const handleSave = async () => {
        if (!form.slug || !form.titleTr) return;
        setSaving(true);
        try {
            if (initialData) {
                await fetch(`/api/posts/${initialData.slug}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });
            } else {
                await fetch("/api/posts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });
            }
            router.push("/blog");
        } finally {
            setSaving(false);
        }
    };

    const LANG_TABS = [
        { code: "tr", label: "🇹🇷 Türkçe" },
        { code: "en", label: "🇬🇧 English" },
        { code: "uz", label: "🇺🇿 O'zbek" },
    ];
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setForm(f => ({ ...f, coverImage: reader.result as string }));
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-black text-white">
                    {initialData ? "Yazıyı Düzenle" : "Yeni Yazı"}
                </h1>
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <span className="text-xs text-zinc-500">Yayınla</span>
                        <div
                            onClick={() => setForm(f => ({ ...f, published: !f.published }))}
                            className={`w-10 h-5 rounded-full transition-colors relative ${form.published ? "bg-emerald-500" : "bg-zinc-700"}`}
                        >
                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.published ? "translate-x-5" : "translate-x-0.5"}`} />
                        </div>
                    </label>
                    <button
                        onClick={handleSave}
                        disabled={saving || !form.slug || !form.titleTr}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        Kaydet
                    </button>
                </div>
            </div>

            {/* Meta bilgiler */}
            {/* Meta grid — 2 satır */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">Slug</label>
                    <input
                        value={form.slug}
                        onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                        placeholder="n8n-vs-worktio"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 font-mono"
                    />
                </div>
                <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">Tag</label>
                    <select
                        value={form.tag}
                        onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500"
                    >
                        {["Rehber", "Karşılaştırma", "İpuçları", "Duyuru", "Güncelleme"].map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">Okuma süresi (dk)</label>
                    <input
                        type="number"
                        value={form.readTime}
                        onChange={e => setForm(f => ({ ...f, readTime: parseInt(e.target.value) }))}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">Yazar</label>
                    <input
                        value={form.authorName}
                        onChange={e => setForm(f => ({ ...f, authorName: e.target.value }))}
                        placeholder="Worktio"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500"
                    />
                </div>
                {/* image */}
                <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">Cover Image</label>
                    <div className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl transition-all ${form.coverImage ? "border-purple-500/50 bg-purple-500/5" : "border-zinc-700 hover:border-purple-500/30 bg-zinc-900"
                        }`} style={{ minHeight: "120px" }}>
                        {form.coverImage ? (
                            <div className="relative w-full p-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={form.coverImage} alt="" className="w-full h-32 object-cover rounded-xl" />
                                <button
                                    onClick={() => setForm(f => ({ ...f, coverImage: "" }))}
                                    className="absolute top-4 right-4 bg-black/80 hover:bg-red-500 p-1.5 rounded-lg text-white transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center cursor-pointer py-6 w-full">
                                <div className="p-3 rounded-xl bg-purple-500/10 mb-2">
                                    <ImagePlus size={20} className="text-purple-400" />
                                </div>
                                <span className="text-xs text-zinc-600">Resim Seç</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                        )}
                    </div>
                </div>
            </div>

            {/* Dil tabları */}
            <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1 w-fit mb-6">
                {LANG_TABS.map(t => (
                    <button
                        key={t.code}
                        onClick={() => setTab(t.code as any)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === t.code ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* İçerik formu */}
            <div className="space-y-4">
                <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">Başlık</label>
                    <input
                        value={form[`title${tab.charAt(0).toUpperCase() + tab.slice(1)}` as keyof typeof form] as string}
                        onChange={e => setForm(f => ({ ...f, [`title${tab.charAt(0).toUpperCase() + tab.slice(1)}`]: e.target.value }))}
                        placeholder="Yazı başlığı..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-purple-500"
                    />
                </div>
                <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">Özet</label>
                    <textarea
                        value={form[`excerpt${tab.charAt(0).toUpperCase() + tab.slice(1)}` as keyof typeof form] as string}
                        onChange={e => setForm(f => ({ ...f, [`excerpt${tab.charAt(0).toUpperCase() + tab.slice(1)}`]: e.target.value }))}
                        placeholder="Kısa özet..."
                        rows={2}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-purple-500 resize-none"
                    />
                </div>
                <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">İçerik (HTML)</label>
                    <textarea
                        value={form[`content${tab.charAt(0).toUpperCase() + tab.slice(1)}` as keyof typeof form] as string}
                        onChange={e => setForm(f => ({ ...f, [`content${tab.charAt(0).toUpperCase() + tab.slice(1)}`]: e.target.value }))}
                        placeholder="<p>Yazı içeriği...</p>"
                        rows={20}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-purple-500 resize-none font-mono"
                    />
                </div>
            </div>
        </div>
    );
}