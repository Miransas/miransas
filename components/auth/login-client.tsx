/* eslint-disable react/no-unescaped-entities */
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Workflow, Loader2, Github } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BorderBeam } from "../ui/border-beam";

export default function LoginClient() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Google'ı sildik, sadece GitHub kaldı. 
    // Giriş sonrası hedef: /admin
    await signIn("github", { callbackUrl: "/admin" });
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center relative overflow-hidden">
      {/* Arka plan glow efekti */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>
      
      {/* Arka plan Grid deseni */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        {/* Giriş Kartı */}
        <div className="relative bg-zinc-900/40 border border-white/[0.08] rounded-[2.5rem] p-10 backdrop-blur-xl overflow-hidden shadow-2xl shadow-purple-500/10 text-center">
          
          {/* Mor dönen ışık efekti */}
          <BorderBeam
            duration={6}
            size={200}
            className="from-transparent via-purple-500 to-transparent"
          />

          {/* Logo ve Başlık */}
          <div className="flex flex-col items-center mb-10">
            <div
              className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(124,58,237,0.4)]"
            >
              <Workflow size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase text-white italic">
              Worktio
            </h1>
            <p className="text-zinc-500 text-xs mt-2 font-bold tracking-[0.2em] uppercase">Developer Only</p>
          </div>

          {/* SADECE GITHUB BUTONU */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="group relative w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-200 text-black px-5 py-4 rounded-2xl text-sm font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed active:scale-95 shadow-xl shadow-white/5"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin text-purple-600" />
            ) : (
              <Github size={20} />
            )}
            <span>{loading ? "Bağlanılıyor..." : "GitHub ile Yönetime Gir"}</span>
          </button>

          <div className="mt-8 pt-8 border-t border-white/5">
            <p className="text-center text-[10px] text-zinc-600 uppercase tracking-widest font-bold italic">
              Miransas Studio Control Panel
            </p>
          </div>
        </div>

        {/* Geri Dön Linki */}
        <div className="text-center mt-8">
          <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-white transition-colors">
            ← Projeye geri dön
          </Link>
        </div>
      </motion.div>
    </div>
  );
}