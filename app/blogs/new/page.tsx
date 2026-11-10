"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBlogAction } from "../../actions/blogActions";
import { useNotification } from "../../components/NotificationContext";

const initialState = {
  success: false,
  errors: {} as Record<string, string>,
  values: {
    title: "",
    author: "",
    url: "",
  },
};

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlogAction, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully!", "success");
      router.push("/blogs");
    }
  }, [state.success, showNotification, router]);

  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <Link
        href="/blogs"
        className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors inline-block mb-6"
      >
        ← Cancel and back
      </Link>

      <h1 className="text-xl font-bold tracking-tight text-neutral-900 mb-6">
        Create New Blog
      </h1>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-xs font-medium text-neutral-700 mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={state.values?.title}
            placeholder="Blog title (min. 5 chars)"
            className="w-full text-sm border border-neutral-300 rounded px-3 py-2 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
          />
          {state.errors?.title && (
            <p className="text-xs text-red-600 mt-1">{state.errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="author" className="block text-xs font-medium text-neutral-700 mb-1">
            Author
          </label>
          <input
            id="author"
            name="author"
            type="text"
            required
            defaultValue={state.values?.author}
            placeholder="Author name (min. 5 chars)"
            className="w-full text-sm border border-neutral-300 rounded px-3 py-2 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
          />
          {state.errors?.author && (
            <p className="text-xs text-red-600 mt-1">{state.errors.author}</p>
          )}
        </div>

        <div>
          <label htmlFor="url" className="block text-xs font-medium text-neutral-700 mb-1">
            URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            required
            defaultValue={state.values?.url}
            placeholder="https://example.com"
            className="w-full text-sm border border-neutral-300 rounded px-3 py-2 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
          />
          {state.errors?.url && (
            <p className="text-xs text-red-600 mt-1">{state.errors.url}</p>
          )}
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            data-testid="create-blog-button"
            className="text-xs font-medium bg-neutral-900 text-white px-4 py-2 rounded hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Create
          </button>
          <Link
            href="/blogs"
            className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
