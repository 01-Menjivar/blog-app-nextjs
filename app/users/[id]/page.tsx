import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserById } from "../../services/userService";

interface UserDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>{user.name}</h1>
      <p>
        <strong>Username:</strong> @{user.username}
      </p>
      <div style={{ marginTop: "16px" }}>
        <Link href="/users">Back to users</Link>
      </div>
    </main>
  );
}
