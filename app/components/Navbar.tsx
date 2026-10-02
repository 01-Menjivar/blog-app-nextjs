"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>
      <Link href="/" style={{ marginRight: "16px" }}>
        Home
      </Link>
      <Link href="/blogs" style={{ marginRight: "16px" }}>
        Blogs
      </Link>
      <Link href="/users" style={{ marginRight: "16px" }}>
        Users
      </Link>
      {session ? (
        <>
          <em>{session.user?.name} logged in</em>{" "}
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login" style={{ marginRight: "16px" }}>
            Login
          </Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
