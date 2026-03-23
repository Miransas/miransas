import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc, eq, and } from "drizzle-orm";
import { ProjectDisplay } from "@/components/projects/project-display";

export default async function ProjectsPage() {
  // Veritabanından projeleri çekiyoruz
  const projectsFromDB = await db.select().from(posts)
    .where(
      and(
        eq(posts.published, true),
        eq(posts.type, "project")
      )
    )
    .orderBy(desc(posts.createdAt));

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-40 pb-32 overflow-hidden relative">
      
      {/* ─── PREMIUM AMBIENT GLOW (Sinematik Arka Plan Işıkları) ─── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-40 -left-40 w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ─── HEADER ALANI (Premium & Animasyonlu His) ─── */}
        <div className="mb-40 max-w-4xl relative">
          
          {/* Üst Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-md shadow-2xl shadow-purple-500/5">
             <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(147,51,234,0.8)]" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Miransas Core Systems</span>
          </div>
          
          
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-10">
            {/* <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500 italic drop-shadow-2xl">
              Engineered
            </span>
            <span className="block text-[#111111] italic transform -translate-y-4">
              Solutions.
            </span> */}
          </h1>
          
          {/* Premium Özet */}
        
        </div>

        {/* ─── PROJE LİSTESİ ─── */}
        <div className="space-y-40">
          {projectsFromDB.map((project, index) => (
            <ProjectDisplay key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}