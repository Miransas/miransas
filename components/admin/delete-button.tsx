"use client";
import { useState } from "react";
import { Trash2, Loader2, X, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeleteButton({ slug, title }: { slug: string; title: string }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      if (res.ok) {
        // Sayfayı yenileyerek listeyi günceller
        router.refresh();
      }
    } catch (error) {
      console.error("Silme hatası:", error);
    } finally {
      setIsDeleting(false);
      setIsConfirming(false);
    }
  };

  if (isConfirming) {
    return (
      <div className="flex items-center gap-1 bg-red-500/10 border border-red-500/20 rounded-xl p-1 animate-in fade-in zoom-in duration-200">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 hover:bg-red-500 hover:text-white text-red-500 rounded-lg transition-all flex items-center gap-2"
        >
          {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          <span className="text-[10px] font-black uppercase">Sil</span>
        </button>
        <button
          onClick={() => setIsConfirming(false)}
          className="p-2 hover:bg-zinc-800 text-zinc-500 rounded-lg transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      title={`${title} yazısını sil`}
      className="p-2.5 bg-zinc-800 hover:bg-red-500/20 rounded-xl text-zinc-400 hover:text-red-500 transition-all active:scale-90 border border-white/5 shadow-lg"
    >
      <Trash2 size={16} />
    </button>
  );
}