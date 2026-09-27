import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>
      <Link href="/" style={{ marginRight: "16px" }}>
        Home
      </Link>
      <Link href="/blogs" style={{ marginRight: "16px" }}>
        Blogs
      </Link>
      <Link href="/users">
        Users
      </Link>
    </nav>
  );
}
