import { desc, eq, ilike, sql } from "drizzle-orm";
import { db } from "../../db";
import { blogs } from "../../db/schema";

export async function getBlogs() {
  return await db.select().from(blogs);
}

export async function getBlogsSortedByLikes() {
  return await db.select().from(blogs).orderBy(desc(blogs.likes));
}

export async function searchBlogs(titleQuery?: string) {
  if (!titleQuery || !titleQuery.trim()) {
    return await getBlogsSortedByLikes();
  }
  return await db
    .select()
    .from(blogs)
    .where(ilike(blogs.title, `%${titleQuery.trim()}%`))
    .orderBy(desc(blogs.likes));
}

export async function getBlogById(id: string | number) {
  const numericId = Number(id);
  if (isNaN(numericId)) return undefined;

  const result = await db.select().from(blogs).where(eq(blogs.id, numericId)).limit(1);
  return result[0];
}

export async function createBlog(data: { title: string; author: string; url: string }) {
  const result = await db
    .insert(blogs)
    .values({
      title: data.title,
      author: data.author,
      url: data.url,
      likes: 0,
    })
    .returning();

  return result[0];
}

export async function likeBlog(id: string | number) {
  const numericId = Number(id);
  if (isNaN(numericId)) return undefined;

  const result = await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, numericId))
    .returning();

  return result[0];
}
