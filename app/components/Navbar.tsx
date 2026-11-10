"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            BlogApp
          </Link>
          <Link
            href="/blogs"
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            blogs
          </Link>
          <Link
            href="/users"
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            users
          </Link>
          {session && (
            <Link
              href="/me"
              className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              me
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          {session ? (
            <>
              <span className="text-xs text-neutral-500">
                {session.user?.name}
              </span>
              <button
                type="button"
                onClick={() => signOut()}
                className="text-xs text-neutral-600 border border-neutral-300 rounded px-2.5 py-1 hover:border-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                login
              </Link>
              <Link
                href="/register"
                className="text-xs bg-neutral-900 text-white rounded px-3 py-1.5 hover:bg-neutral-800 transition-colors"
              >
                register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
