import { boolean, integer, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// Kullanıcılar tablon (Buna dokunmadık, aynen kalıyor)
export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
});

// WORKTIO ASIL BLOG TABLOSU (Tr, En, Uz takılarından temizlendi!)
export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  
  // Sadece tek bir dil için sadeleştirilmiş alanlar:
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
 type: text("type").$type<"blog" | "changelog" | "docs" | "project">().notNull().default("blog"), // "blog" veya "project" gibi türler için
  tag: text("tag").notNull().default("Genel"),
  readTime: integer("read_time").notNull().default(5),
  published: boolean("published").notNull().default(false),
  authorName: text("author_name").notNull().default("Sardor Azimov"), // 
  
  coverImage: text("cover_image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tipler
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;