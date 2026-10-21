"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const fieldClass =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-accent";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        setIsLoading(false);
        return;
      }

      router.push("/signin");
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 lg:grid-cols-2">
      <div className="hidden lg:block">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Join NextShop</p>
        <h1 className="mt-3 font-display text-5xl leading-tight">Create your account.</h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-muted">
          An account lets you keep a private cart and place an order. Use any email you like for this demo shop.
        </p>
      </div>
      <div className="rounded-[2rem] border border-line bg-white p-6 sm:p-8">
        <h2 className="font-display text-3xl">Sign up</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
            <input id="name" required value={name} onChange={(event) => setName(event.target.value)} className={fieldClass} />
          </label>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
            <input id="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={fieldClass} />
          </label>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
            <input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={fieldClass}
            />
          </label>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white hover:bg-ink disabled:opacity-60"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          Already registered?{" "}
          <Link href="/signin" className="font-semibold text-ink">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
