import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

// Tekil yazı getir
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const post = await db.query.posts.findFirst({
    where: eq(posts.slug, params.slug)
  });
  return NextResponse.json(post);
}

// Yazıyı Güncelle (PATCH)
export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
  const session = await auth();
  if (session?.user?.email !== "seninemailin@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const updated = await db.update(posts)
    .set(body)
    .where(eq(posts.slug, params.slug))
    .returning();

  return NextResponse.json(updated[0]);
}

// Yazıyı Sil (DELETE)
export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  const session = await auth();
  if (session?.user?.email !== "seninemailin@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db.delete(posts).where(eq(posts.slug, params.slug));
  return NextResponse.json({ success: true });
}