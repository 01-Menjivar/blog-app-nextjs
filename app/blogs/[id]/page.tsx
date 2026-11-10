import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogService";
import { likeBlogAction, addToReadingListAction } from "../../actions/blogActions";
import { isBlogInReadingList } from "../../services/readingListService";
import { getUserByUsername } from "../../services/userService";
import { auth } from "@/auth";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  const session = await auth();
  let currentUserId: number | undefined;

  if (session?.user?.id) {
    currentUserId = Number(session.user.id);
  } else if (session?.user?.email) {
    const user = await getUserByUsername(session.user.email);
    currentUserId = user?.id;
  }

  const isAuthor = Boolean(currentUserId && blog.userId && blog.userId === currentUserId);
  const showAddToReadingList = Boolean(currentUserId && !isAuthor);
  const inReadingList = currentUserId ? await isBlogInReadingList(currentUserId, blog.id) : false;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/blogs"
        className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors inline-block mb-6"
      >
        ← Back to blogs
      </Link>

      <article data-testid="blog-detail" className="border border-neutral-200 rounded p-6">
        <h1 data-testid="blog-title" className="text-xl font-bold tracking-tight text-neutral-900 mb-2">
          {blog.title}
        </h1>

        <p data-testid="blog-author" className="text-xs text-neutral-500 mb-4">
          Published by <span className="text-neutral-800 font-medium">{blog.author}</span>
        </p>

        <div className="text-xs mb-6 text-neutral-600">
          <span className="text-neutral-400 mr-1">URL:</span>
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-700 underline hover:text-neutral-900 break-all transition-colors"
          >
            {blog.url}
          </a>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <span className="text-xs text-neutral-600">
            {blog.likes} {blog.likes === 1 ? "like" : "likes"}
          </span>

          <div className="flex items-center gap-2">
            {showAddToReadingList && (
              <form action={addToReadingListAction}>
                <input type="hidden" name="blogId" value={String(blog.id)} />
                <button
                  type="submit"
                  data-testid="add-to-reading-list-button"
                  disabled={inReadingList}
                  className={`text-xs border border-neutral-300 rounded px-3 py-1 transition-colors ${
                    inReadingList
                      ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                      : "text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 cursor-pointer"
                  }`}
                >
                  {inReadingList ? "In reading list" : "Add to reading list"}
                </button>
              </form>
            )}

            <form action={likeBlogAction}>
              <input type="hidden" name="id" value={String(blog.id)} />
              <button
                type="submit"
                className="text-xs border border-neutral-300 rounded px-3 py-1 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                ♥ Like
              </button>
            </form>
          </div>
        </div>
      </article>
    </main>
  );
}
