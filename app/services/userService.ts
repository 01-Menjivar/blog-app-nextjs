import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export async function getUsers() {
  return await db.select().from(users);
}

export async function getUserById(id: string | number) {
  const numericId = Number(id);
  if (isNaN(numericId)) return undefined;

  const result = await db.select().from(users).where(eq(users.id, numericId)).limit(1);
  return result[0];
}
