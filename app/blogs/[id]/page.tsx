import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogService";
import { likeBlogAction } from "../../actions/blogActions";

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

  return (
    <main style={{ padding: "20px" }}>
      <h1>{blog.title}</h1>
      <p>
        <strong>Author:</strong> {blog.author}
      </p>
      <p>
        <strong>URL:</strong>{" "}
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>
      <p>
        <strong>Likes:</strong> {blog.likes}
      </p>

      <form action={likeBlogAction} style={{ marginTop: "12px" }}>
        <input type="hidden" name="id" value={String(blog.id)} />
        <button type="submit" style={{ padding: "6px 12px", cursor: "pointer" }}>
          Like
        </button>
      </form>

      <div style={{ marginTop: "16px" }}>
        <Link href="/blogs">Back to blogs</Link>
      </div>
    </main>
  );
}
