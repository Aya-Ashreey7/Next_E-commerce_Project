"use client";

import Iproducts from "@/types/products";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";
import { useToast } from "./ToastContext";

export default function ProductActions({ product }: { product: Iproducts }) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const saved = isFavorite(product.id);
  const unavailable = product.stock <= 0;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        disabled={unavailable}
        onClick={() => {
          addToCart(product);
          showToast("Added to cart");
        }}
        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-stone-300"
      >
        {unavailable ? "Out of stock" : "Add to cart"}
      </button>
      <button
        type="button"
        aria-pressed={saved}
        onClick={() => {
          const nowSaved = toggleFavorite(product);
          showToast(nowSaved ? "Saved to favorites" : "Removed from favorites");
        }}
        className="rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink"
      >
        {saved ? "Saved to favorites" : "Save to favorites"}
      </button>
    </div>
  );
}
