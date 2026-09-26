"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBlog, likeBlog } from "../services/blogService";

export async function createBlogAction(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  if (!title || !author || !url) {
    throw new Error("Missing required fields");
  }

  await createBlog({ title, author, url });

  revalidatePath("/blogs");
  redirect("/blogs");
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

export async function searchBlogsAction(formData: FormData) {
  const title = formData.get("title") as string;
  const trimmed = title ? title.trim() : "";

  if (trimmed) {
    redirect(`/blogs?title=${encodeURIComponent(trimmed)}`);
  } else {
    redirect("/blogs");
  }
}



