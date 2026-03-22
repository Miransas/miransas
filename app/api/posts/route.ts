import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const published = searchParams.get("published");

  const list = await db.select().from(posts)
    .where(published === "true" ? eq(posts.published, true) : undefined)
    .orderBy(desc(posts.createdAt));

  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const [post] = await db.insert(posts).values(body).returning();
  return NextResponse.json(post);
}