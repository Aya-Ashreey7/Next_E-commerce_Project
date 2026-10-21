"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Something stalled</p>
      <h1 className="mt-3 font-display text-4xl">We could not load this page.</h1>
      <p className="mt-4 text-sm leading-6 text-muted">{error.message || "Please try again."}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </div>
  );
}
