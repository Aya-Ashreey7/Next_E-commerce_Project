"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const fieldClass =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-accent";

export default function SignInForm({
  callbackUrl,
  google,
  facebook,
}: {
  callbackUrl: string;
  google: boolean;
  facebook: boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const showSocial = google || facebook;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setIsLoading(false);

    if (!result || result.error) {
      setError("Email or password is incorrect.");
      return;
    }

    router.push(result.url || callbackUrl);
    router.refresh();
  };

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-12 px-5 py-14 lg:grid-cols-2">
      <div className="hidden lg:block">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Account</p>
        <h1 className="mt-3 font-display text-5xl leading-tight">Welcome back.</h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-muted">
          Sign in to open your bag and finish checkout. Favorites stay available on this device either way.
        </p>
      </div>

      <div className="rounded-[2rem] border border-line bg-white p-6 sm:p-8">
        <h2 className="font-display text-3xl lg:hidden">Sign in</h2>
        <h2 className="hidden font-display text-3xl lg:block">Sign in</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              disabled={isLoading}
              onChange={(event) => setEmail(event.target.value)}
              className={fieldClass}
              placeholder="you@example.com"
            />
          </label>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              disabled={isLoading}
              onChange={(event) => setPassword(event.target.value)}
              className={fieldClass}
              placeholder="Your password"
            />
          </label>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white hover:bg-ink disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {showSocial && (
          <div className="mt-6 space-y-3">
            <p className="text-center text-xs uppercase tracking-[0.16em] text-muted">Or</p>
            {google && (
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl })}
                className="w-full rounded-full border border-line py-3 text-sm font-semibold hover:border-ink"
              >
                Continue with Google
              </button>
            )}
            {facebook && (
              <button
                type="button"
                onClick={() => signIn("facebook", { callbackUrl })}
                className="w-full rounded-full border border-line py-3 text-sm font-semibold hover:border-ink"
              >
                Continue with Facebook
              </button>
            )}
          </div>
        )}

        <p className="mt-6 text-center text-sm text-muted">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-ink">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
