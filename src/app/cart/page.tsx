"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { status } = useSession();
  const router = useRouter();
  const { lines, setQty, removeFromCart, total } = useCart();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin?callbackUrl=/cart");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="px-5 py-20 text-center text-sm text-muted">Checking your account...</p>;
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Bag</p>
      <h1 className="mt-2 font-display text-4xl">Your cart</h1>

      {lines.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <p className="font-display text-2xl">Your bag is empty</p>
          <Link href="/products" className="mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <ul className="space-y-4">
            {lines.map((item) => (
              <li key={item.id} className="flex gap-4 rounded-2xl border border-line bg-white p-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-paper">
                  {item.images?.[0] && (
                    <Image src={item.images[0]} alt={item.title} fill sizes="96px" className="object-cover" />
                  )}
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/products/${item.id}`} className="font-medium hover:text-accent">
                      {item.title}
                    </Link>
                    <p className="font-semibold">{formatPrice(item.price * item.qty)}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted">{formatPrice(item.price)} each</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-full border border-line">
                      <button
                        type="button"
                        className="h-8 w-8 text-lg"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(item.id, item.qty - 1)}
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <button
                        type="button"
                        className="h-8 w-8 text-lg"
                        aria-label="Increase quantity"
                        onClick={() => setQty(item.id, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-muted hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border border-line bg-white p-6">
            <h2 className="font-display text-2xl">Summary</h2>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted">Shipping is calculated as a flat courtesy on this demo checkout.</p>
            <Link
              href="/checkout"
              className="mt-6 flex justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-ink"
            >
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
