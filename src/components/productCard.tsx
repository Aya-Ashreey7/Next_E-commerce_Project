"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import Iproducts from "@/types/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";
import { useToast } from "./ToastContext";

export default function ProductCard({ pro }: { pro: Iproducts }) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const saved = isFavorite(pro.id);
  const image = pro.images?.[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper">
        <Link href={`/products/${pro.id}`} className="absolute inset-0">
          {image ? (
            <Image
              src={image}
              alt={pro.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : null}
        </Link>
        {pro.discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {Math.round(pro.discountPercentage)}% off
          </span>
        )}
        <button
          type="button"
          aria-label={saved ? `Remove ${pro.title} from favorites` : `Save ${pro.title} to favorites`}
          aria-pressed={saved}
          onClick={() => {
            const nowSaved = toggleFavorite(pro);
            showToast(nowSaved ? "Saved to favorites" : "Removed from favorites");
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink shadow-sm transition hover:scale-105"
        >
          {saved ? <FaHeart className="text-accent" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
          {pro.category.replace(/-/g, " ")}
        </p>
        <Link href={`/products/${pro.id}`} className="mt-1 line-clamp-2 font-medium text-ink hover:text-accent">
          {pro.title}
        </Link>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="font-semibold">{formatPrice(pro.price)}</span>
          <span className="flex items-center gap-1 text-muted">
            <FaStar className="text-brass" />
            {pro.rating}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            addToCart(pro);
            showToast("Added to cart");
          }}
          className="mt-4 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
