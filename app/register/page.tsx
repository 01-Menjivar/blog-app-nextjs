"use client";

import Link from "next/link";
import { registerUser } from "@/app/actions/userActions";
import { useActionState } from "react";

const initialState = {
  errors: {} as Record<string, string>,
  values: {
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  },
};

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-bold tracking-tight text-neutral-900 mb-6">
        Register
      </h1>

      <form action={formAction} className="space-y-4">
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
            required
            defaultValue={state.values?.username}
            placeholder="Enter username (min. 4 chars)"
            className="w-full text-sm border border-neutral-300 rounded px-3 py-2 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
          />
          {state.errors?.username && (
            <p data-testid="username-error" className="text-xs text-red-600 mt-1">
              {state.errors.username}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-xs font-medium text-neutral-700 mb-1"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            defaultValue={state.values?.name}
            placeholder="Enter your full name"
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
            required
            defaultValue={state.values?.password}
            placeholder="••••••••"
            className="w-full text-sm border border-neutral-300 rounded px-3 py-2 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
          />
          {state.errors?.password && (
            <p className="text-xs text-red-600 mt-1">{state.errors.password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-medium text-neutral-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            required
            defaultValue={state.values?.confirmPassword}
            placeholder="••••••••"
            className="w-full text-sm border border-neutral-300 rounded px-3 py-2 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
          />
          {state.errors?.confirmPassword && (
            <p data-testid="passwordConfirm-error" className="text-xs text-red-600 mt-1">
              {state.errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            data-testid="register-button"
            className="w-full text-xs font-medium bg-neutral-900 text-white py-2 rounded hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Register
          </button>
        </div>
      </form>

      <p className="text-xs text-neutral-500 mt-6 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-neutral-900 hover:underline">
          login
        </Link>
      </p>
    </main>
  );
}
