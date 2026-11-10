"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useNotification } from "../components/NotificationContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      showNotification("Logged in successfully", "success");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-bold tracking-tight text-neutral-900 mb-6">
        Login
      </h1>

      {error && (
        <div
          data-testid="error-message"
          className="text-xs text-red-600 border border-red-200 bg-red-50 p-2.5 rounded mb-4"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-xs font-medium text-neutral-700 mb-1"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            className="w-full text-sm border border-neutral-300 rounded px-3 py-2 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium text-neutral-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full text-sm border border-neutral-300 rounded px-3 py-2 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            data-testid="login-button"
            disabled={loading}
            className="w-full text-xs font-medium bg-neutral-900 text-white py-2 rounded hover:bg-neutral-800 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <p className="text-xs text-neutral-500 mt-6 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-neutral-900 hover:underline">
          register
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
