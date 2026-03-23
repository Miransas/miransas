import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import BlogEditor from "../../../../components/blog/blog-editor";


export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 1. Next.js 15 için slug parametresini bekliyoruz
  const { slug } = await params;

  // 2. Veritabanından bu slug'a ait yazıyı çekiyoruz
  const post = await db.query.posts.findFirst({
    where: eq(posts.slug, slug),
  });

  // 3. Eğer böyle bir yazı yoksa 404'e at
  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tighter italic uppercase text-white">
          İçeriği Düzenle.
        </h1>
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
          {post.title} — Düzenleme Modu
        </p>
      </div>

      {/* Hazırladığımız editör bileşenine eski verileri (initialData) gönderiyoruz */}
      <div className="mt-10">
        <BlogEditor initialData={post} />
      </div>
    </div>
  );
}