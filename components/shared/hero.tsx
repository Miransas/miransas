"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Code2, Database, Shield, Zap, Layers3, ArrowRight, Github, FolderGit2 } from "lucide-react";

// --- KUSURSUZ İZOMETRİK MOTOR (Milimetrik Hesaplama) ---
const pt = (x: number, y: number, z: number = 0) => {
  const ISO_X = 0.866025; // cos(30)
  const ISO_Y = 0.5;      // sin(30)
  // x ve y eksenlerini görsel simetri için hafifçe ölçeklendiriyoruz
  return `${(x - y) * ISO_X * 1.1},${((x + y) * ISO_Y - z) * 1.1}`;
};

const poly = (...pts: [number, number, number][]) => pts.map(p => pt(...p)).join(' ');

// --- İZOMETRİK STATİK BLOK ---
const IsoBlock = ({ 
  x, y, z, w, h, d, 
  topFill = "#161616", leftFill = "#0D0D0D", rightFill = "#050505", edge = "#2A2A2A"
}: any) => (
  <g>
    <polygon points={poly([x, y+h, z], [x+w, y+h, z], [x+w, y+h, z+d], [x, y+h, z+d])} fill={leftFill} stroke={edge} strokeWidth="0.5" strokeLinejoin="round" />
    <polygon points={poly([x+w, y, z], [x+w, y+h, z], [x+w, y+h, z+d], [x+w, y, z+d])} fill={rightFill} stroke={edge} strokeWidth="0.5" strokeLinejoin="round" />
    <polygon points={poly([x, y, z+d], [x+w, y, z+d], [x+w, y+h, z+d], [x, y+h, z+d])} fill={topFill} stroke={edge} strokeWidth="0.5" strokeLinejoin="round" />
  </g>
);

export default function Hero() {
  const S = 180; // Üst grid boyutu
  const C = S / 2; // Merkez noktası (90)

  // --- 6 SİMETRİK MODÜL VE RENKLERİ (Altıgen Yerleşim) ---
  const nodes = [
    { id: 0, label: "AI CORE", color: "#FF4F00", icon: Brain, x: -60, y: C, z: 220, path: `M ${pt(-60, C, 220)} L ${pt(-60, C, 160)} L ${pt(C-20, C, 160)}` },
    { id: 1, label: "API LAYER", color: "#3B82F6", icon: Code2, x: 30, y: -40, z: 240, path: `M ${pt(30, -40, 240)} L ${pt(30, -40, 160)} L ${pt(30, C, 160)} L ${pt(C-20, C, 160)}` },
    { id: 2, label: "DATA STATE", color: "#10B981", icon: Database, x: 150, y: -40, z: 230, path: `M ${pt(150, -40, 230)} L ${pt(150, -40, 160)} L ${pt(150, C, 160)} L ${pt(C+20, C, 160)}` },
    { id: 3, label: "AUTH KEY", color: "#EAB308", icon: Shield, x: S+60, y: C, z: 220, path: `M ${pt(S+60, C, 220)} L ${pt(S+60, C, 160)} L ${pt(S+60, C, 160)} L ${pt(C+20, C, 160)}` },
    { id: 4, label: "DB CLUSTER", color: "#EC4899", icon: Zap, x: 150, y: S+40, z: 210, path: `M ${pt(150, S+40, 210)} L ${pt(150, S+40, 160)} L ${pt(150, C, 160)} L ${pt(C+20, C, 160)}` },
    { id: 5, label: "UI ENGINE", color: "#8B5CF6", icon: Layers3, x: 30, y: S+40, z: 200, path: `M ${pt(30, S+40, 200)} L ${pt(30, S+40, 160)} L ${pt(30, C, 160)} L ${pt(C-20, C, 160)}` },
  ];

  // --- ANİMASYON MOTORU STATE'LERİ ---
  const [activeNode, setActiveNode] = useState(0);
  const [coreColor, setCoreColor] = useState(nodes[0].color);
  const [pulseKey, setPulseKey] = useState(0); // Şelale ve Merkezî Depo animasyonunu tetiklemek için

  useEffect(() => {
    let isMounted = true;
    const runSequence = async () => {
      let currentIndex = 0;
      while (isMounted) {
        // 1. Dışarıdan merkeze giden lazer ateşlenir
        setActiveNode(currentIndex);
        // 2. Lazerin merkeze ulaşmasını bekle (1.5s)
        await new Promise(r => setTimeout(r, 1500));
        if (!isMounted) break;
        // 3. Enerji merkeze çarptı! Çekirdeği rengini değiştir ve Şelaleyi tetikle
        setCoreColor(nodes[currentIndex].color);
        setPulseKey(prev => prev + 1); // pulseKey değiştiğinde animasyon baştan başlar
        // 4. Enerjinin aşağıya kadar akmasını izle (1.8s)
        await new Promise(r => setTimeout(r, 1800));
        if (!isMounted) break;
        // Sıradaki modüle geç
        currentIndex = (currentIndex + 1) % nodes.length;
      }
    };
    runSequence();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] text-white flex items-center py-20 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        
        {/* SOL TARAF: Tipografi */}
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }} className="max-w-xl z-20">
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            className="text-5xl md:text-6xl lg:text-[72px] font-semibold leading-[1.02] tracking-tight mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Sistemleriniz <span className="text-white/60">lineer</span> değil.<br />
            Motorunuz da olmamalı.
          </motion.h1>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }} 
            className="text-[16px] text-gray-400 mb-12 leading-relaxed max-w-lg font-light"
          >
            Üretim sistemleri için inşa edilmiş; 6 katmanlı düğüm (node) kontrolü, simetrik hata toleransı ve Merkezî Depolama özellikli yaşayan veri akışı motoru. Tüm yollar Miransas'a çıkar.
          </motion.p>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-wrap gap-4">
            <button 
              className="group flex items-center gap-2 text-white px-7 py-3 rounded-xl font-medium transition-all shadow-lg active:scale-95 text-sm"
              style={{ backgroundColor: coreColor, boxShadow: `0 0 30px ${coreColor}50` }} // Buton da aktif renkle değişir!
            >
              Hemen Başla <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] border border-white/5 text-white px-7 py-3 rounded-xl font-medium transition-colors active:scale-95 text-sm">
              Star Github <Github size={17} />
            </button>
          </motion.div>
        </motion.div>

        {/* SAĞ TARAF: YAŞAYAN VE MERKEZÎ DEPOLAMA İZOMETRİK MOTORU */}
        <div className="relative w-full h-[700px] flex items-center justify-center pointer-events-none">
          
          {/* Dinamik Merkez Işıltı (Renk Değiştirir) */}
          <motion.div 
            className="absolute w-[500px] h-[500px] rounded-full blur-[120px]" 
            animate={{ backgroundColor: `${coreColor}15` }} // %15 opaklıkta arkaplan parlaması
            transition={{ duration: 0.5 }}
          />
          
          <svg viewBox="-350 -350 700 750" className="w-[140%] h-[140%] max-w-[900px] overflow-visible">
            <motion.g initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }}>
              
              {/* --- KATMAN 1: ANA BLOK VE ŞELALE (Z = 0) --- */}
              <g>
                <IsoBlock x={0} y={0} z={0} w={S} h={S} d={60} topFill="#141414" leftFill="#0A0A0A" rightFill="#050505" edge="#1A1A1A" />
                
                {/* Şelale (Aşağı Akan Çizgiler): Enerjinin kenarlardan aşağıya akmasını sağlar */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.path
                    key={`waterfall-left-${i}-${pulseKey}`} // pulseKey ile tetiklenir
                    d={`M ${pt(i * (S / 11), S, 60)} L ${pt(i * (S / 11), S, 0)}`} // Üstten alta çizilir
                    stroke={coreColor}
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }} // Su damlası gibi aşağı iner ve söner
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 + (i * 0.05) }} // Çekirdek yandıktan sonra akar
                  />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.path
                    key={`waterfall-right-${i}-${pulseKey}`}
                    d={`M ${pt(S, i * (S / 11), 60)} L ${pt(S, i * (S / 11), 0)}`}
                    stroke={coreColor}
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 + (i * 0.05) }}
                  />
                ))}
              </g>

              {/* Katmanları Birleştiren Dikey Sütunlar 1->2 */}
              <path d={`M ${pt(0,0,60)} L ${pt(0,0,100)} M ${pt(S,0,60)} L ${pt(S,0,100)} M ${pt(0,S,60)} L ${pt(0,S,100)} M ${pt(S,S,60)} L ${pt(S,S,100)}`} stroke="#222" strokeWidth="1" strokeDasharray="3 3" />

              {/* --- KATMAN 2: Orta Tel Kafes (Z = 100) --- */}
              <g>
                <polygon points={poly([0,0,100], [S,0,100], [S,S,100], [0,S,100])} fill="#111" fillOpacity="0.4" stroke="#333" strokeWidth="1" />
              </g>

              {/* Katmanları Birleştiren Dikey Sütunlar 2->3 */}
              <path d={`M ${pt(0,0,100)} L ${pt(0,0,140)} M ${pt(S,0,100)} L ${pt(S,0,140)} M ${pt(0,S,100)} L ${pt(0,S,140)} M ${pt(S,S,100)} L ${pt(S,S,140)}`} stroke="#222" strokeWidth="1" strokeDasharray="3 3" />

              {/* --- KATMAN 3: Üst Grid ve CORE MATRİS (Z = 140) --- */}
              <g>
                <IsoBlock x={0} y={0} z={140} w={S} h={S} d={20} topFill="#161616" leftFill="#111" rightFill="#0A0A0A" edge="#222" opacity={0.9} />
                {/* Üst Grid Çizgileri */}
                {[1, 2, 3, 4, 5].map(i => (
                  <g key={`grid-${i}`}>
                    <path d={`M ${pt(i*(S/6), 0, 160)} L ${pt(i*(S/6), S, 160)}`} stroke="#2A2A2A" strokeWidth="1" />
                    <path d={`M ${pt(0, i*(S/6), 160)} L ${pt(S, i*(S/6), 160)}`} stroke="#2A2A2A" strokeWidth="1" />
                  </g>
                ))}

                {/* --- CORE GRID: MERKEZ ALTI 6X6 MATRİS (Canlı Renk Senkronu) --- */}
                {/* Merkez çekirdeğin tam altındaki 36 karelik canlı matris */}
                <g>
                  {Array.from({ length: 6 }).map((_, row) => 
                    Array.from({ length: 6 }).map((_, col) => {
                      // Grid koordinatları (C-20 = 70, C+20 = 110)
                      const cellX = (C-20) + (col * (40/6));
                      const cellY = (C-20) + (row * (40/6));
                      const cellSize = 40/6;
                      
                      // Merkezden uzaklığa göre gecikme (Ripple Effect)
                      const delay = Math.sqrt(Math.pow(col-2.5, 2) + Math.pow(row-2.5, 2)) * 0.05;

                      return (
                        <motion.polygon
                          key={`coregrid-${row}-${col}-${pulseKey}`} // pulseKey ile tetiklenir
                          points={poly([cellX, cellY, 160], [cellX+cellSize, cellY, 160], [cellX+cellSize, cellY+cellSize, 160], [cellX, cellY+cellSize, 160])}
                          fill="#111" stroke="#222" strokeWidth="0.5"
                          // Çekirdek rengiyle senkronize, merkezden dışarıya doğru parlar
                          animate={{ stroke: [`#222`, `${coreColor}80`, `#222`], fill: [`#111`, `${coreColor}20`, `#111`] }}
                          transition={{ duration: 1.5, delay: delay, ease: "easeInOut" }}
                        />
                      );
                    })
                  )}
                </g>
                
                {/* --- YAŞAYAN VE RENK DEĞİŞTİREN ANA ÇEKİRDEK (CORE) --- */}
                <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  {/* Dinamik Üst, Sol ve Sağ Yüzeyler (Küçültüldü: 20x20x15) */}
                  <motion.polygon points={poly([C-10, C-10, 175], [C+10, C-10, 175], [C+10, C+10, 175], [C-10, C+10, 175])} animate={{ fill: coreColor }} transition={{ duration: 0.3 }} opacity={0.9} />
                  <motion.polygon points={poly([C-10, C+10, 160], [C+10, C+10, 160], [C+10, C+10, 175], [C-10, C+10, 175])} animate={{ fill: coreColor }} transition={{ duration: 0.3 }} opacity={0.7} />
                  <motion.polygon points={poly([C+10, C-10, 160], [C+10, C+10, 160], [C+10, C+10, 175], [C+10, C-10, 175])} animate={{ fill: coreColor }} transition={{ duration: 0.3 }} opacity={0.5} />
                  
                  {/* Çekirdeğin Etrafındaki Dinamik Parlama (Glow) */}
                  <motion.path 
                    d={`M ${pt(C,C,175)}`} fill="none" strokeWidth="25" opacity="0.3" 
                    style={{ filter: "blur(12px)" }}
                    animate={{ stroke: coreColor }} transition={{ duration: 0.3 }}
                  />
                </motion.g>
              </g>

              {/* --- 6 ADET HAVADA İNEN VE 90 DERECE KIVRILAN LAZER --- */}
              {/* Lazerler havadan modüle inip 90 derece dönüşle merkeze vuruyor (Görseldeki gibi) */}
              {nodes.map((node, index) => {
                const isActive = activeNode === index;
                return (
                  <motion.path 
                    key={`line-${node.id}`}
                    d={node.path} 
                    fill="none" 
                    stroke={node.color} 
                    strokeWidth="2.5" 
                    strokeLinecap="round" // Keskin köşeler için
                    strokeLinejoin="miter" // 90 derece dönüşlerin miter olması için
                    initial={{ pathLength: 0, opacity: 0 }}
                    // Lazer atışı etkisi
                    animate={{ 
                      pathLength: isActive ? 1 : 0, 
                      opacity: isActive ? 1 : 0 
                    }}
                    transition={{ 
                      pathLength: { duration: isActive ? 1.5 : 0, ease: "easeInOut" },
                      opacity: { duration: isActive ? 0.3 : 0 }
                    }}
                  />
                );
              })}

              {/* --- 6 ADET HAVADA SÜZÜLEN SİMETRİK MODÜL --- */}
              {nodes.map((node, index) => {
                const isActive = activeNode === index;
                const Icon = node.icon;
                
                return (
                  <motion.g 
                    key={`node-${node.id}`}
                    animate={{ y: [0, -8, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                  >
                    {/* Modül Kutusu (Simetrik 30x30x10) */}
                    <IsoBlock 
                      x={node.x-15} y={node.y-15} z={node.z} w={30} h={30} d={10} 
                      topFill="#1A1A1A" leftFill="#111" rightFill="#0A0A0A" 
                      edge={isActive ? node.color : "#444"} 
                    />
                    
                    {/* SVG İzometrik İkon Yansıtması (Kutunun üzerine oturur) */}
                    <g transform={`translate(${pt(node.x, node.y, node.z + 10).split(',')[0]}, ${pt(node.x, node.y, node.z + 10).split(',')[1]})`}>
                      <g transform="scale(1, 0.577) rotate(-45)">
                        <Icon color={isActive ? node.color : "#666"} size={13} x="-6.5" y="-6.5" strokeWidth={isActive ? 2.5 : 1.5} />
                      </g>
                    </g>
                  </motion.g>
                );
              })}

              {/* --- İŞTE ÇİZDİĞİN O TEK UZUN ÇİZGİ VE MERKEZÎ DEPO (MIRANSAS) --- */}
              {/* Şelale efektinin ulaştığı damarları tabandan bir Hub'a gönderip, oradan tek çizgiyle Miransas Terminaline gönderiyoruz. */}
              
              {/* 1. Birleştirme Hub'ı (Data Aggregation Node) */}
              <g>
                <IsoBlock x={S+40} y={S+40} z={0} w={20} h={20} d={20} topFill="#161616" leftFill="#0A0A0A" rightFill="#050505" edge="#222" />
                <motion.path 
                  d={`M ${pt(S-20, S, 0)} L ${pt(S+50, S+50, 10)}`} // Tabandaki damarlardan Hub'a giden yollar
                  stroke="#333" strokeWidth="1" strokeDasharray="2 2"
                />
                <motion.path 
                  d={`M ${pt(S, S-20, 0)} L ${pt(S+50, S+50, 10)}`} // Tabandaki damarlardan Hub'a giden yollar
                  stroke="#333" strokeWidth="1" strokeDasharray="2 2"
                />
              </g>

              {/* 2. O TEK UZUN ÇİZGİ VE ANİMASYONU */}
              <motion.path 
                key={`central-line-${pulseKey}`}
                d={`M ${pt(S+50, S+50, 20)} L ${pt(S+50, S+50, 100)} L ${pt(S+150, S+150, 100)} L ${pt(S+150, S+150, 140)}`} // Hub'dan çıkıp, cam katmanından geçip, en üst terminale giden o tek uzun çizgi
                fill="none" 
                stroke={coreColor} 
                strokeWidth="2.5" 
                strokeLinecap="round" strokeLinejoin="round" 
                variants={nodes[activeNode]} // Aktif modülün rengiyle parlar!
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }} 
                transition={{ duration: 2, ease: "easeOut", delay: 1.8 }} // Şelale bittikten sonra akar
              />

              {/* 3. MERKEZÎ REPO TERMİNALİ (Central Repo Terminal) */}
              <motion.g 
                animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                key={`miransas-terminal-${pulseKey}`} // pulseKey ile tetiklenir
              >
                {/* Terminatör Terminali (Central Repo Box) */}
                <IsoBlock x={S+130} y={S+130} z={140} w={40} h={40} d={25} topFill="#111" leftFill="#111" rightFill="#0A0A0A" edge={`${coreColor}40`} />
                
                {/* Merkezî Depo İkonu (Folder) */}
                <g transform={`translate(${pt(S+150, S+150, 165).split(',')[0]}, ${pt(S+150, S+150, 165).split(',')[1]})`}>
                  <g transform="scale(1, 0.577) rotate(-45)">
                    <FolderGit2 color={coreColor} size={18} x="-9" y="-9" strokeWidth={2.5} />
                  </g>
                </g>

                {/* --- İŞTE O YAZI: "MIRANSAS" --- */}
                {/* Görseldeki gibi şık ve teknik bir fontla terminalin üzerine oturur. */}
                <g transform={`translate(${pt(S+150, S+150, 175).split(',')[0]}, ${pt(S+150, S+150, 175).split(',')[1]})`}>
                  <g transform="scale(1, 0.577) rotate(-45)">
                    <text x="0" y="5" fill="#888" fontSize="11" fontWeight="bold" textAnchor="middle" style={{ fontFamily: "Georgia, serif" }}>
                      MIRANSAS
                    </text>
                  </g>
                </g>

                {/* Terminalin Parıldayan Cam Efekti */}
                <polygon points={poly([S+135, S+135, 165], [S+165, S+135, 165], [S+165, S+165, 165], [S+135, S+165, 165])} fill="#111" fillOpacity="0.3" stroke={`${coreColor}60`} strokeWidth="1.5" />
              </motion.g>

            </motion.g>
          </svg>
        </div>
      </div>
    </section>
  );
}