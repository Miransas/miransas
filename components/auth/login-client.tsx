/* eslint-disable react/no-unescaped-entities */
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Workflow, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BorderBeam } from "../ui/border-beam";

export default function LoginClient() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center relative overflow-hidden">
      {/* Arka plan glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        {/* Kart */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 backdrop-blur-sm"
          style={{ boxShadow: "0 0 60px rgba(124,58,237,0.1)" }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-4"
              style={{ boxShadow: "0 0 30px rgba(124,58,237,0.5)" }}
            >
              <Workflow size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white">
              Worktio
            </h1>
            <p className="text-zinc-500 text-sm mt-1">Hesabınıza giriş yapın</p>
          </div>

          {/* Google login butonu */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-black px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ boxShadow: "0 0 30px rgba(255,255,255,0.1)" }}
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {loading ? "Giriş yapılıyor..." : "Google ile Giriş Yap"}
          </button>

          <p className="text-center text-xs text-zinc-600 mt-6 leading-relaxed">
            Giriş yaparak{" "}
            <a href="/terms" className="text-zinc-500 hover:text-white transition-colors">Kullanım Şartları</a>
            {" "}ve{" "}
            <a href="/privacy" className="text-zinc-500 hover:text-white transition-colors">Gizlilik Politikası</a>
            'nı kabul etmiş olursunuz.
          </p>
        </div>

        {/* Alt link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            ← Ana sayfaya dön
          </Link>
        </div>
      </motion.div>
      <BorderBeam
        duration={4}
        size={300}
        reverse
        className="from-transparent via-green-500 to-transparent"
      />
    </div>
  );
}