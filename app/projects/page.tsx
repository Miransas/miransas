import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc, eq, and } from "drizzle-orm";
import { ProjectDisplay } from "@/components/projects/project-display";
// ... (Senin importların aynı kalıyor)
// Alt bileşen yapalım

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
    <main className="min-h-screen mt-20 bg-[#050505] text-white pt-32 pb-32 font-sans selection:bg-[#FF4F00]/30 overflow-hidden">
      {/* ─── DOT BACKGROUND ─── */}
      <div className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(circle at 1.5px 1.5px, #ffffff 1px, transparent 0)`, backgroundSize: `32px 32px` }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER (Aynı kalıyor) */}
        <div className="mb-32 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            Engineered <br /> <span className="text-neutral-600">Solutions.</span>
          </h1>
          <p className="text-lg text-neutral-400 font-light leading-relaxed">
            Sardor Azimov tarafından inşa edilen çekirdek mimariler. Her sistem sıfır kesinti ve maksimum verimlilik için tasarlandı.
          </p>
        </div>

        {/* PROJE LİSTESİ (Dinamik) */}
        <div className="space-y-40">
          {projectsFromDB.map((project, index) => (
            <ProjectDisplay key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}