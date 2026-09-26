import type { Metadata } from "next";
import Link from "next/link";
import { searchBlogs } from "../services/blogService";
import { searchBlogsAction } from "../actions/blogActions";

export const metadata: Metadata = {
  title: "Blogs",
};

interface BlogsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const resolvedSearchParams = await searchParams;
  const titleQuery = typeof resolvedSearchParams.title === "string" ? resolvedSearchParams.title : "";
  const blogs = await searchBlogs(titleQuery);
  const isFiltering = Boolean(titleQuery.trim());

  return (
    <main style={{ padding: "20px" }}>
      <h1>Blogs</h1>
      <div style={{ marginBottom: "16px" }}>
        <Link href="/blogs/new">+ Create New Blog</Link>
      </div>

      <form action={searchBlogsAction} style={{ marginBottom: "20px", display: "flex", gap: "8px" }}>
        <input
          type="text"
          name="title"
          defaultValue={titleQuery}
          placeholder="Filter by title..."
          style={{ padding: "6px", width: "260px" }}
        />
        <button type="submit" style={{ padding: "6px 12px", cursor: "pointer" }}>
          {isFiltering ? "Clear / Update Filter" : "Filter"}
        </button>
      </form>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id} style={{ marginBottom: "16px" }}>
              <div>
                <Link href={`/blogs/${blog.id}`}>
                  <strong>{blog.title}</strong>
                </Link>
              </div>
              <div>Author: {blog.author}</div>
              <div>
                URL:{" "}
                <a href={blog.url} target="_blank" rel="noopener noreferrer">
                  {blog.url}
                </a>
              </div>
              <div>Likes: {blog.likes}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
