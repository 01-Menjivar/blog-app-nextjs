"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBlog, likeBlog } from "../services/blogService";
import { addToReadingList, markAsRead } from "../services/readingListService";
import { getUserByUsername } from "../services/userService";
import { auth } from "@/auth";

export async function createBlogAction(prevState: any, formData: FormData) {
  const title = (formData.get("title") as string) || "";
  const author = (formData.get("author") as string) || "";
  const url = (formData.get("url") as string) || "";
  
  const errors: Record<string, string> = {};

  if (title.length < 5) errors.title = "Title content must be at least 5 characters long";
  if (author.length < 5) errors.author = "Author content must be at least 5 characters long";
  if (url.length < 5) errors.url = "URL content must be at least 5 characters long";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, values: { title, author, url } };
  }

  const session = await auth();
  let userId: number | undefined;

  if (session?.user?.id) {
    userId = Number(session.user.id);
  } else if (session?.user?.email) {
    const user = await getUserByUsername(session.user.email);
    userId = user?.id;
  }

  const newBlog = await createBlog({ title, author, url, userId });

  if (userId && newBlog) {
    await addToReadingList(userId, newBlog.id);
  }

  revalidatePath("/blogs");
  revalidatePath("/me");
  return { success: true, errors: {}, values: { title: "", author: "", url: "" } };
}

export async function addToReadingListAction(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Must be logged in to add to reading list");
  }

  let userId: number | undefined;
  if (session.user.id) {
    userId = Number(session.user.id);
  } else if (session.user.email) {
    const user = await getUserByUsername(session.user.email);
    userId = user?.id;
  }

  if (!userId) {
    throw new Error("User not found");
  }

  const blogId = Number(formData.get("blogId"));
  if (!blogId || isNaN(blogId)) {
    throw new Error("Invalid blog id");
  }

  await addToReadingList(userId, blogId);

  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/me");
}

export async function likeBlogAction(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Missing blog id");
  }

  await likeBlog(id);

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
}

export async function markAsReadAction(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Must be logged in to update reading list");
  }

  let userId: number | undefined;
  if (session.user.id) {
    userId = Number(session.user.id);
  } else if (session.user.email) {
    const user = await getUserByUsername(session.user.email);
    userId = user?.id;
  }

  if (!userId) {
    throw new Error("User not found");
  }

  const readingListId = Number(formData.get("readingListId"));
  if (!readingListId || isNaN(readingListId)) {
    throw new Error("Invalid reading list item id");
  }

  await markAsRead(readingListId, userId);

  revalidatePath("/me");
}

export async function searchBlogsAction(formData: FormData) {
  const title = formData.get("title") as string;
  const trimmed = title ? title.trim() : "";

  if (trimmed) {
    redirect(`/blogs?title=${encodeURIComponent(trimmed)}`);
  } else {
    redirect("/blogs");
  }
}




