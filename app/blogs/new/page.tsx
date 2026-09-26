import type { Metadata } from "next";
import Link from "next/link";
import { createBlogAction } from "../../actions/blogActions";

export const metadata: Metadata = {
  title: "Create New Blog",
};

export default function NewBlogPage() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>Create New Blog</h1>

      <form action={createBlogAction} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}>
        <div>
          <label htmlFor="title" style={{ display: "block", marginBottom: "4px" }}>
            Title:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            style={{ width: "100%", padding: "6px", border: "1px solid #fff" }}
          />
        </div>

        <div>
          <label htmlFor="author" style={{ display: "block", marginBottom: "4px" }}>
            Author:
          </label>
          <input
            id="author"
            name="author"
            type="text"
            required
            style={{ width: "100%", padding: "6px", border: "1px solid #fff" }}
          />
        </div>

        <div>
          <label htmlFor="url" style={{ display: "block", marginBottom: "4px" }}>
            URL:
          </label>
          <input
            id="url"
            name="url"
            type="url"
            required
            style={{ width: "100%", padding: "6px", border: "1px solid #fff" }}
          />
        </div>

        <div style={{ marginTop: "8px" }}>
          <button type="submit" style={{ padding: "6px 16px", cursor: "pointer" }}>
            Create Blog
          </button>{" "}
          <Link href="/blogs" style={{ marginLeft: "8px" }}>
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}