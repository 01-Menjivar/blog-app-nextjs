import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserByUsernameWithBlogs } from "../../services/userService";

interface UserDetailPageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);
  const user = await getUserByUsernameWithBlogs(decodedUsername);

  if (!user) {
    notFound();
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>{user.name}</h1>
      <p>
        <strong>Username:</strong> @{user.username}
      </p>

      <h2 style={{ marginTop: "24px" }}>Blogs</h2>
      {user.blogs.length === 0 ? (
        <p>No blogs added yet.</p>
      ) : (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id} style={{ marginBottom: "12px" }}>
              <Link href={`/blogs/${blog.id}`}>
                <strong>{blog.title}</strong>
              </Link>
              <div>Likes: {blog.likes}</div>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "20px" }}>
        <Link href="/users">Back to users</Link>
      </div>
    </main>
  );
}
