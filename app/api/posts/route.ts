import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const published = searchParams.get("published");

  const list = await db
    .select()
    .from(posts)
    .where(published === "true" ? eq(posts.published, true) : undefined)
    .orderBy(desc(posts.createdAt));

  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const session = await auth();

  // 1. Yetki Kontrolü
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug } = body;

    // 2. Çakışma Kontrolü (Slug Unique Check)
    const existingPost = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);

    if (existingPost.length > 0) {
      return NextResponse.json(
        {
          error:
            "Bu URL (slug) zaten başka bir içerik tarafından kullanılıyor.",
        },
        { status: 400 }, // Bad Request
      );
    }

    // 3. Kayıt İşlemi
    const [post] = await db.insert(posts).values(body).returning();
    return NextResponse.json(post);
  } catch (error) {
    console.error("POST_ERROR:", error);
    return NextResponse.json(
      { error: "İçerik kaydedilirken teknik bir sorun oluştu." },
      { status: 500 },
    );
  }
}
