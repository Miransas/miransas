"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, History, FileCode, Briefcase, Plus, LogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react";

const MENU_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blog Yazıları", href: "/admin/blog/new", icon: Newspaper },
 
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-0 bg-[#080808] border-r border-white/5 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-black text-white italic">W</div>
        <span className="font-black tracking-tighter text-xl italic uppercase">Worktio</span>
      </div>

      <nav className="flex-1 space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive ? "bg-white text-black shadow-lg shadow-white/5" : "text-zinc-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <Link href="/admin/blog/new" className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-500/20">
          <Plus size={16} /> Yeni İçerik
        </Link>
        <button onClick={() => signOut({ callbackUrl: "/login" })} className="flex items-center gap-3 w-full px-4 py-3 text-zinc-600 hover:text-red-400 text-sm font-bold transition-colors">
          <LogOut size={18} /> Çıkış Yap
        </button>
      </div>
    </aside>
  );
}