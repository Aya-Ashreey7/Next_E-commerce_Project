"use client";

import Link from "next/link";
import ProductCard from "@/components/productCard";
import { useFavorites } from "@/components/FavoritesContext";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Saved</p>
      <h1 className="mt-2 font-display text-4xl">Favorites</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        Pieces you save stay on this device, ready to add to your bag later.
      </p>

      {favorites.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <p className="font-display text-2xl">No favorites yet</p>
          <p className="mt-2 text-sm text-muted">Tap the heart on any product to keep it here.</p>
          <Link href="/products" className="mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white">
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {favorites.map((product) => (
            <ProductCard key={product.id} pro={product} />
          ))}
        </div>
      )}
    </div>
  );
}
