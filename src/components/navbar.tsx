"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaHeart, FaShoppingBag, FaTimes } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import SeparateLink from "./separateLink";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const { favorites } = useFavorites();
  const { data: session, status } = useSession();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="font-display text-2xl tracking-tight text-ink" onClick={closeMenu}>
          NextShop
        </Link>

        <nav className="hidden md:block">
          <SeparateLink />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/favorites" aria-label="Favorites" className="relative rounded-full p-2 text-ink hover:bg-white">
            <FaHeart className="h-4 w-4" />
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative rounded-full p-2 text-ink hover:bg-white">
            <FaShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>

          {status === "authenticated" ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="hidden rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-ink sm:inline-flex"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/signin"
              className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-ink sm:inline-flex"
            >
              Sign in
            </Link>
          )}

          <button
            className="rounded-full p-2 text-ink hover:bg-white md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-line px-5 py-4 md:hidden">
          <SeparateLink className="flex flex-col gap-4" onNavigate={closeMenu} />
          <div className="mt-4 border-t border-line pt-4 text-sm">
            {status === "authenticated" ? (
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-muted">{session?.user?.name || session?.user?.email}</span>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="font-semibold text-ink">
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link href="/signin" onClick={closeMenu} className="font-semibold text-ink">
                  Sign in
                </Link>
                <Link href="/signup" onClick={closeMenu} className="text-muted">
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
