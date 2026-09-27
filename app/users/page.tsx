import type { Metadata } from "next";
import Link from "next/link";
import { getUsers } from "../services/userService";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const usersList = await getUsers();

  return (
    <main style={{ padding: "20px" }}>
      <h1>Users</h1>
      {usersList.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {usersList.map((user) => (
            <li key={user.id} style={{ marginBottom: "8px" }}>
              <Link href={`/users/${user.username}`}>
                {user.name} (@{user.username})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
