import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// 1. Tip tanımını Promise<{ slug: string }> olarak güncelle
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> } 
) {
  // 2. slug değerini await ile içinden çıkar
  const { slug } = await params;

  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// AYNI ŞEKİLDE DELETE veya PATCH varsa onları da güncelle:
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params; // Burada da await şart!
  
  // ... silme işlemleri
  return NextResponse.json({ success: true });
}