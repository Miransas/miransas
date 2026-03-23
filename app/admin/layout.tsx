// app/admin/layout.tsx
import AdminSidebar from "@/components/admin/admin-sidebar";
import { auth } from "@/auth";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const ADMIN_EMAIL = "sardorazimov2901@gmail.com"; // Burayı terminaldeki maille eşle

  // EĞER OTURUM YOKSA
  if (!session) {
    return (
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-10">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Oturum Bulunamadı!</h1>
        <p className="text-zinc-500 mb-6">Sistem senin giriş yaptığını henüz fark etmedi.</p>
        <Link href="/login" className="px-6 py-2 bg-white text-black rounded-xl font-bold">Girişe Dön</Link>
      </div>
    );
  }

  // EĞER OTURUM VAR AMA MAİL YANLIŞSA
  if (session.user?.email !== ADMIN_EMAIL) {
    return (
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-10 text-center">
        <h1 className="text-2xl font-bold text-amber-500 mb-4">Yetki Reddedildi!</h1>
        <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 space-y-2">
          <p className="text-xs text-zinc-500 uppercase tracking-widest">Giriş Yapılan Mail:</p>
          <p className="text-purple-400 font-mono text-lg">{session.user?.email || "Email gelmiyor!"}</p>
          <div className="h-px bg-white/5 my-4" />
          <p className="text-xs text-zinc-500 uppercase tracking-widest">Beklenen Mail:</p>
          <p className="text-emerald-400 font-mono text-lg">{ADMIN_EMAIL}</p>
        </div>
        <p className="mt-8 text-zinc-600 text-sm italic">Not: Bu iki mail aynı olmadığı sürece Dashboardu göremezsin.</p>
      </div>
    );
  }

  // HER ŞEY YOLUNDAYSA
  return (
    <div className="flex min-h-screen bg-[#030303] text-white">
      <AdminSidebar />
      <section className="flex-1 p-10 overflow-y-auto">
        {children}
      </section>
    </div>
  );
}