"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { lines, total, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin?callbackUrl=/checkout");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
    }
  }, [session]);

  if (status === "loading") {
    return <p className="px-5 py-20 text-center text-sm text-muted">Checking your account...</p>;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Order received</p>
        <h1 className="mt-3 font-display text-4xl">Thank you, {name.split(" ")[0] || "there"}.</h1>
        <p className="mt-4 text-sm leading-6 text-muted">
          This is a demonstration checkout, so no payment was taken. A confirmation would be sent to {email}.
        </p>
        <Link href="/products" className="mt-8 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white">
          Keep browsing
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Checkout</p>
      <h1 className="mt-2 font-display text-4xl">Delivery details</h1>

      {lines.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <p className="font-display text-2xl">Nothing to check out</p>
          <Link href="/products" className="mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-line bg-white p-6">
            <Field label="Name" id="name" value={name} onChange={setName} />
            <Field label="Email" id="email" type="email" value={email} onChange={setEmail} />
            <label htmlFor="address" className="block text-sm font-medium">
              Address
              <textarea
                id="address"
                required
                rows={4}
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-accent"
                placeholder="Street, city, postal code"
              />
            </label>
            <button type="submit" className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white hover:bg-ink">
              Place order · {formatPrice(total)}
            </button>
          </form>

          <aside className="h-fit rounded-2xl border border-line bg-white p-6">
            <h2 className="font-display text-2xl">Your order</h2>
            <ul className="mt-4 space-y-4">
              {lines.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-paper">
                    {item.images?.[0] && (
                      <Image src={item.images[0]} alt="" fill sizes="64px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted">Qty {item.qty}</p>
                  </div>
                  <p className="text-sm font-semibold">{formatPrice(item.price * item.qty)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
              <span className="text-sm text-muted">Total</span>
              <span className="font-display text-2xl">{formatPrice(total)}</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label htmlFor={id} className="block text-sm font-medium">
      {label}
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}
