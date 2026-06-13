"use client";

import { useState, useEffect } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  RefreshCw,
  Zap,
  ChevronRight
} from "lucide-react";

// Güncelleme Notları Verisi
const changelogData = {
  version: "v2.4.0",
  releaseDate: "13 Haziran 2026",
  size: "24.8 MB",
  features: [
    {
      id: 1,
      category: "new",
      title: "Yapay Zeka Destekli Arama",
      desc: "Projeleriniz ve kod tabanınız içinde doğal dille arama yapabileceğiniz semantik motor aktif edildi.",
      icon: Cpu,
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 2,
      category: "improved",
      title: "Derleme ve Dağıtım Hızı",
      desc: "Ağ mimarisindeki optimizasyonlar sayesinde deploy süreleri %40 oranında düşürüldü.",
      icon: Zap,
      color: "from-amber-500 to-orange-500"
    },
    {
      id: 3,
      category: "security",
      title: "Gelişmiş API Koruması",
      desc: "İki aşamalı doğrulama ve IP tabanlı erişim kısıtlama protokolleri güvenlik duvarına eklendi.",
      icon: ShieldCheck,
      color: "from-emerald-500 to-teal-500"
    }
  ]
};

export function UpdateScreen() {
  const [status, setStatus] = useState<"idle" | "updating" | "completed">("idle");
  const [progress, setProgress] = useState(0);

  // Güncelleme animasyonu simülasyonu
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "updating") {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus("completed");
            return 100;
          }
          // Rastgele adımlarla yükleme hissi verelim
          const increment = Math.floor(Math.random() * 8) + 3;
          return Math.min(prev + increment, 100);
        });
      }, 150);
    } else if (status === "idle") {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleStartUpdate = () => {
    setStatus("updating");
    setProgress(0);
  };

  const handleReset = () => {
    setStatus("idle");
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      
      {/* Arka Plan Teknolojik Çizgiler ve Izgara */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      
      {/* Degrade Işık Huzmeleri */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      {status === "completed" && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none transition-all duration-1000" />
      )}

      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-12 gap-8 items-center">
        
        {/* Sol Taraf: İnteraktif Güncelleme Kartı (Play Store Tarzı Akıcı Alan) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl flex flex-col items-center text-center">
            
            {/* Durumuna Göre Değişen Dinamik Başlık */}
            <div className="mb-6">
              <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
                {changelogData.version} Update
              </span>
              <h2 className="text-xl font-bold mt-1 text-white">
                {status === "idle" && "Güncelleme Hazır"}
                {status === "updating" && "Güncelleniyor..."}
                {status === "completed" && "Sistem Güncel!"}
              </h2>
            </div>

            {/* Dinamik Daire ve Animasyon Alanı */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-8">
              
              {/* Arka Plan Glow Efektleri */}
              <div className={`absolute inset-0 rounded-full transition-all duration-700 blur-xl ${
                status === "updating" ? "bg-indigo-500/10 scale-110" : 
                status === "completed" ? "bg-emerald-500/20 scale-125" : "bg-zinc-500/5"
              }`} />

              {/* Dış Daire (Dönen İlerleme Halkası) */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  className="stroke-zinc-800"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  className={`transition-all duration-300 ease-out ${
                    status === "completed" ? "stroke-emerald-500" : "stroke-indigo-500"
                  }`}
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * progress) / 100}
                  strokeLinecap="round"
                />
              </svg>

              {/* Merkez İkon & Durum Görseli */}
              <div className="absolute inset-0 flex items-center justify-center">
                {status === "idle" && (
                  <div className="p-4 bg-zinc-800/50 rounded-full border border-zinc-700/50 animate-pulse">
                    <RefreshCw className="w-8 h-8 text-indigo-400" />
                  </div>
                )}
                
                {status === "updating" && (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold font-mono tracking-tighter text-white">
                      {progress}%
                    </span>
                    <span className="text-[10px] text-zinc-500 mt-1 animate-pulse">
                      Yükleniyor
                    </span>
                  </div>
                )}

                {status === "completed" && (
                  <div className="relative">
                    {/* Geometrik Dağılan Şekiller (Play Store Başarı Efekti) */}
                    <div className="absolute -top-10 -left-10 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-75" />
                    <div className="absolute -bottom-8 -right-8 w-3 h-3 bg-teal-400 rotate-45 animate-bounce" />
                    <div className="absolute top-12 -right-12 w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                    
                    <div className="p-5 bg-emerald-500/10 rounded-full border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-[scaleIn_0.3s_ease-out]">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Dosya Bilgisi ve Açıklama */}
            <div className="mb-8 min-h-[50px] flex items-center justify-center">
              {status === "idle" && (
                <p className="text-sm text-zinc-400">
                  Boyut: <span className="font-mono text-zinc-200">{changelogData.size}</span> <br />
                  Kararlı sürüm dağıtıma hazır.
                </p>
              )}
              {status === "updating" && (
                <p className="text-xs text-zinc-500 max-w-[200px]">
                  Paketler açılıyor ve dosyalar doğrulanıyor. Lütfen sayfayı kapatmayın.
                </p>
              )}
              {status === "completed" && (
                <div className="animate-fade-in">
                  <p className="text-sm text-emerald-400 font-medium">
                    Başarıyla Güncellendi!
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Tüm sistemler kararlı çalışıyor.
                  </p>
                </div>
              )}
            </div>

            {/* İnteraktif Butonlar */}
            <div className="w-full">
              {status === "idle" && (
                <button
                  onClick={handleStartUpdate}
                  className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.4)] active:scale-98 flex items-center justify-center gap-2"
                >
                  Şimdi Güncelle
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {status === "updating" && (
                <button
                  disabled
                  className="w-full py-3.5 px-6 rounded-2xl bg-zinc-800 text-zinc-500 font-medium text-sm cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  Güncelleme Sürüyor
                </button>
              )}

              {status === "completed" && (
                <button
                  onClick={handleReset}
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-medium text-sm transition-all active:scale-98"
                >
                  Kapat veya Başa Dön
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sağ Taraf: Detaylı Güncelleme Notları Listesi */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="space-y-6">
            
            {/* Başlık ve Sürüm Bilgisi */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Yeni Neler Var?
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Sistem Güncellemesi
              </h1>
              <p className="text-sm text-zinc-400 mt-2">
                Yayınlanma Tarihi: <span className="text-zinc-200">{changelogData.releaseDate}</span>
              </p>
            </div>

            {/* Özellik Kartları */}
            <div className="grid gap-4 mt-4">
              {changelogData.features.map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div 
                    key={feat.id} 
                    className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/60 hover:bg-zinc-900/60 transition-all duration-300 group flex gap-4 items-start"
                  >
                    {/* Sol İkon Alanı */}
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feat.color} text-white shadow-lg shrink-0`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Sağ Metin Alanı */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors">
                          {feat.title}
                        </h3>
                        {/* Kategori Etiketi */}
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          feat.category === "new" ? "bg-blue-500/10 text-blue-400 border border-blue-500/15" :
                          feat.category === "improved" ? "bg-amber-500/10 text-amber-400 border border-amber-500/15" :
                          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                        }`}>
                          {feat.category === "new" && "Yeni"}
                          {feat.category === "improved" && "Geliştirme"}
                          {feat.category === "security" && "Güvenlik"}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-zinc-400 mt-1.5 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Alt İpucu veya Linkler */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-900 text-xs text-zinc-500">
              <span>Tüm geçmiş sürümler için dokümantasyonu inceleyin.</span>
              <a 
                href="/changelog" 
                className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors group"
              >
                Tüm Değişiklikler
                <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}