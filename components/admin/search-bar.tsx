"use client";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Kullanıcı yazmayı bıraktıktan 300ms sonra aramayı başlat (Debounce)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    router.push(`/admin?${params.toString()}`);
  }, [query, router, searchParams]);

  return (
    <div className="relative w-full max-w-md group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-500 transition-colors">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Başlığa göre ara..."
        className="w-full bg-zinc-900/40 border border-white/5 rounded-2xl py-3 pl-12 pr-10 text-sm text-white outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all placeholder:text-zinc-700"
      />
      {query && (
        <button 
          onClick={() => setQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}