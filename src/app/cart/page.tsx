"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/components/CartContext";
import Image from "next/image";
import Iproducts from "@/types/products";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CartProduct extends Iproducts {
  qty: number;
}

export default function CartPage() {
  const { status } = useSession();
  const router = useRouter();

  const { cart } = useCart(); // ✅ hook moved to top
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // Sync quantities when cart changes
  useEffect(() => {
    const groupedItems = cart.reduce((acc: Record<number, number>, item) => {
      acc[item.id] = (acc[item.id] || 0) + 1;
      return acc;
    }, {});
    setQuantities(groupedItems);
  }, [cart]);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [status, router]);

  // Don't render cart until session is resolved
  if (status === "loading") {
    return <div className="text-center py-20">Checking authentication...</div>;
  }

  const grouped: CartProduct[] = Object.entries(quantities)
    .map(([id, qty]) => {
      const product = cart.find((p) => p.id === Number(id));
      return product ? { ...product, qty } : null;
    })
    .filter(Boolean) as CartProduct[];

  const handleQtyChange = (id: number, delta: number) => {
    setQuantities((prev) => {
      const newQty = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const grandTotal = grouped.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || 1),
    0
  );

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Products in Cart</h1>
      {grouped.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {grouped.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm"
              >
                <Image
                  src={item.images?.[0] || "/placeholder.png"}
                  width={80}
                  height={80}
                  alt={item.title}
                  className="rounded-lg object-cover w-20 h-20"
                />
                <div className="flex-1">
                  <div className="font-semibold text-lg text-purple-700">
                    {item.title}
                  </div>
                  <div className="text-gray-600">${item.price}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="px-2 py-1 bg-purple-200 text-purple-700 rounded hover:bg-purple-300"
                      onClick={() => handleQtyChange(item.id, -1)}
                      disabled={quantities[item.id] <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 font-semibold">
                      {quantities[item.id]}
                    </span>
                    <button
                      className="px-2 py-1 bg-purple-200 text-purple-700 rounded hover:bg-purple-300"
                      onClick={() => handleQtyChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-gray-900 font-bold mt-2">
                    Total: ${item.price * (quantities[item.id] || 1)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-right">
            <span className="text-xl font-bold text-purple-700">
              Total Price: ${grandTotal}
            </span>
          </div>
          <div className="mt-6 flex justify-end">
            <Link
              href="/checkout"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
