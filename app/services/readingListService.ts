import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { blogs, readingList } from "../../db/schema";

export async function addToReadingList(userId: number, blogId: number) {
  const existing = await db
    .select()
    .from(readingList)
    .where(and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  const result = await db
    .insert(readingList)
    .values({
      userId,
      blogId,
      read: false,
    })
    .returning();

  return result[0];
}

export async function getReadingListForUser(userId: number) {
  return await db
    .select({
      id: readingList.id,
      read: readingList.read,
      blogId: readingList.blogId,
      title: blogs.title,
      author: blogs.author,
      url: blogs.url,
      likes: blogs.likes,
    })
    .from(readingList)
    .innerJoin(blogs, eq(readingList.blogId, blogs.id))
    .where(eq(readingList.userId, userId));
}

export async function isBlogInReadingList(userId: number, blogId: number): Promise<boolean> {
  const existing = await db
    .select()
    .from(readingList)
    .where(and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)))
    .limit(1);

  return existing.length > 0;
}

export async function markAsRead(id: number, userId: number) {
  const result = await db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.id, id), eq(readingList.userId, userId)))
    .returning();

  return result[0];
}
