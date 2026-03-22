import { boolean, integer, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
});

export const postsTable = pgTable('posts_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;


export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  titleTr: text("title_tr").notNull(),
  titleEn: text("title_en").notNull(),
  titleUz: text("title_uz").notNull(),
  excerptTr: text("excerpt_tr").notNull(),
  excerptEn: text("excerpt_en").notNull(),
  excerptUz: text("excerpt_uz").notNull(),
  contentTr: text("content_tr").notNull(),
  contentEn: text("content_en").notNull(),
  contentUz: text("content_uz").notNull(),
  tag: text("tag").notNull().default("Genel"),
  readTime: integer("read_time").notNull().default(5),
  published: boolean("published").notNull().default(false),
  authorName: text("author_name").notNull().default("Worktio"),
  coverImage: text("cover_image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Post = typeof posts.$inferSelect;
