"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import { getUserByUsername } from "../services/userService";
import { auth } from "@/auth";

export async function generateTokenAction() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const token = crypto.randomUUID();

  if (session.user.id) {
    await db
      .update(users)
      .set({ token })
      .where(eq(users.id, Number(session.user.id)));
  } else if (session.user.email) {
    await db
      .update(users)
      .set({ token })
      .where(eq(users.username, session.user.email));
  }

  revalidatePath("/me");
}

export async function registerUser(
  prevState: any,
  formData: FormData
) {
  const username = (formData.get("username") as string)?.trim() || "";
  const name = (formData.get("name") as string)?.trim() || "";
  const password = (formData.get("password") as string) || "";
  const confirmPassword = (formData.get("confirmPassword") as string) || "";

  const errors: Record<string, string> = {};

  if (username.length < 4) {
    errors.username = "Username must be at least 4 characters long";
  } else {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      errors.username = "Username already exists";
    }
  }

  if (password.length < 4) {
    errors.password = "Password must be at least 4 characters long";
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords must match";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password, confirmPassword } };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
}
