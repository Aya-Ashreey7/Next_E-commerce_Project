import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">404</p>
      <h1 className="mt-3 font-display text-4xl">This page is not in the shop.</h1>
      <p className="mt-4 text-sm leading-6 text-muted">
        The link may be out of date, or the product may no longer be listed.
      </p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white">
        Back home
      </Link>
    </div>
  );
}
