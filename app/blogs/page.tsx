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
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold tracking-tight text-neutral-900">Blogs</h1>
        <Link
          href="/blogs/new"
          className="text-xs bg-neutral-900 text-white rounded px-3 py-1.5 hover:bg-neutral-800 transition-colors"
        >
          + Create Blog
        </Link>
      </div>

      <form action={searchBlogsAction} className="flex gap-2 mb-6">
        <input
          type="text"
          name="title"
          data-testid="filter-input"
          defaultValue={titleQuery}
          placeholder="Filter by title..."
          className="flex-1 text-sm border border-neutral-300 rounded px-3 py-1.5 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
        />
        <button
          type="submit"
          data-testid="search-button"
          className="text-xs border border-neutral-300 rounded px-3 py-1.5 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          {isFiltering ? "Clear / Update" : "Filter"}
        </button>
      </form>

      <div data-testid="blogs-list">
        {blogs.length === 0 ? (
          <div className="py-12 text-center text-sm text-neutral-400 border border-dashed border-neutral-200 rounded">
            No blogs found.
          </div>
        ) : (
          <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
            {blogs.map((blog) => (
              <article key={blog.id} className="py-4">
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors block mb-1"
                >
                  {blog.title}
                </Link>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                  <span>By {blog.author}</span>
                  <span>•</span>
                  <span>{blog.likes} {blog.likes === 1 ? "like" : "likes"}</span>
                </div>
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-400 hover:text-neutral-600 truncate block max-w-md transition-colors"
                >
                  {blog.url}
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
