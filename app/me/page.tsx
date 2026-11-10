import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserById, getUserByUsername } from "../services/userService";
import { generateTokenAction } from "../actions/userActions";
import { markAsReadAction } from "../actions/blogActions";
import { getReadingListForUser } from "../services/readingListService";

export default async function MePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user.id
    ? await getUserById(session.user.id)
    : await getUserByUsername(session.user.email!);

  const name = user?.name || session.user.name || "N/A";
  const username = user?.username || session.user.email || "N/A";
  const token = user?.token;

  const readingListItems = user?.id ? await getReadingListForUser(user.id) : [];
  const unreadBlogs = readingListItems.filter((item) => !item.read);
  const readBlogs = readingListItems.filter((item) => item.read);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold tracking-tight text-neutral-900 mb-6">
        Personal Profile
      </h1>

      <section data-testid="user-profile" className="border border-neutral-200 rounded p-6 mb-6">
        <h2 className="text-sm font-semibold text-neutral-900 mb-4">
          User Information
        </h2>
        <div className="space-y-3 text-xs">
          <div>
            <span className="text-neutral-500 block">Name</span>
            <span data-testid="user-name" className="text-neutral-900 font-medium text-sm">
              {name}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 block">Username</span>
            <span data-testid="user-username" className="text-neutral-900 font-medium text-sm">
              {username}
            </span>
          </div>
        </div>
      </section>

      <section data-testid="reading-list-section" className="border border-neutral-200 rounded p-6 mb-6">
        <h2 className="text-sm font-semibold text-neutral-900 mb-1">
          Reading List
        </h2>
        <p className="text-xs text-neutral-500 mb-6">
          Blogs added to your personal reading list grouped by status.
        </p>

        {readingListItems.length === 0 ? (
          <p data-testid="empty-reading-list" className="text-xs text-neutral-400 italic">
            Your reading list is empty.
          </p>
        ) : (
          <>
            {/* Unread section */}
            <div data-testid="unread-section" className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                  Unread
                </h3>
                <span className="text-[10px] bg-neutral-100 text-neutral-600 rounded-full px-2 py-0.5 font-medium">
                  {unreadBlogs.length}
                </span>
              </div>

              {unreadBlogs.length === 0 ? (
                <p data-testid="no-unread-blogs" className="text-xs text-neutral-400 italic">
                  No unread blogs.
                </p>
              ) : (
                <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
                  {unreadBlogs.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/blogs/${item.blogId}`}
                          className="text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors block truncate"
                        >
                          {item.title}
                        </Link>
                        <div className="text-xs text-neutral-500 flex items-center gap-2 mt-0.5">
                          <span>By {item.author}</span>
                          <span>•</span>
                          <span>{item.likes} {item.likes === 1 ? "like" : "likes"}</span>
                        </div>
                      </div>

                      <form action={markAsReadAction} className="shrink-0">
                        <input type="hidden" name="readingListId" value={String(item.id)} />
                        <button
                          type="submit"
                          data-testid={`mark-read-${item.id}`}
                          className="text-xs border border-neutral-300 rounded px-2.5 py-1 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                        >
                          mark as read
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Read section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                  Read
                </h3>
                <span className="text-[10px] bg-neutral-100 text-neutral-600 rounded-full px-2 py-0.5 font-medium">
                  {readBlogs.length}
                </span>
              </div>

              {readBlogs.length === 0 ? (
                <p className="text-xs text-neutral-400 italic">No read blogs.</p>
              ) : (
                <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
                  {readBlogs.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/blogs/${item.blogId}`}
                          className="text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors block truncate"
                        >
                          {item.title}
                        </Link>
                        <div className="text-xs text-neutral-500 flex items-center gap-2 mt-0.5">
                          <span>By {item.author}</span>
                          <span>•</span>
                          <span>{item.likes} {item.likes === 1 ? "like" : "likes"}</span>
                        </div>
                      </div>

                      <span className="text-xs text-neutral-400 italic shrink-0">
                        ✓ Read
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>

      <section data-testid="api-token-section" className="border border-neutral-200 rounded p-6">
        <h2 className="text-sm font-semibold text-neutral-900 mb-1">
          Personal API Token
        </h2>
        <p className="text-xs text-neutral-500 mb-4">
          Generate an API token for authenticating personal requests.
        </p>

        <div className="space-y-4">
          <div>
            <span className="text-xs text-neutral-500 block mb-1">Current Token:</span>
            {token ? (
              <div data-testid="token-display">
                <code data-testid="api-token" className="block font-mono text-xs bg-neutral-50 border border-neutral-200 rounded px-3 py-2 text-neutral-800 break-all select-all">
                  {token}
                </code>
              </div>
            ) : (
              <p data-testid="no-token-message" className="text-xs text-neutral-400 italic">
                No token has been generated yet.
              </p>
            )}
          </div>

          <form action={generateTokenAction}>
            <button
              type="submit"
              data-testid="generate-token-button"
              className="text-xs bg-neutral-900 text-white rounded px-3 py-1.5 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              {token ? "Generate New Token" : "Generate Token"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
