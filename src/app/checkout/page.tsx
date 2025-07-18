"use client";
import React, { useState } from "react";
import { useCart } from "@/components/CartContext";
import Image from "next/image";
import Iproducts from "@/types/products";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface CartProduct extends Iproducts {
  qty: number;
}

export default function CheckoutPage() {
  const { status } = useSession();
  const router = useRouter();
  const { cart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState("");


  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="text-center py-20">Checking authentication...</div>;
  }

    const grouped: CartProduct[] = cart.reduce((acc: CartProduct[], item) => {
    const found = acc.find((i) => i.id === item.id);
    if (found) {
      found.qty += 1;
    } else {
      acc.push({ ...item, qty: 1 });
    }
    return acc;
  }, []);

  const grandTotal = grouped.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("Order placed successfully! Thank you for your purchase.");
    setName("");
    setEmail("");
    setAddress("");
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      {grouped.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-8">
            {grouped.map((item) => (
              <li key={item.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
                <Image src={item.images[0]} width={60} height={60} alt={item.title} className="rounded-lg object-cover w-16 h-16" />
                <div className="flex-1">
                  <div className="font-semibold text-purple-700">{item.title}</div>
                  <div className="text-gray-600">${item.price} x {item.qty}</div>
                  <div className="text-gray-900 font-bold">Total: ${item.price * item.qty}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mb-8 text-right">
            <span className="text-xl font-bold text-purple-700">Total Price: ${grandTotal}</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                required
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                required
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                required
                placeholder="Your Address"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Place Order
            </button>
            {success && <div className="text-green-600 text-center font-semibold mt-2">{success}</div>}
          </form>
        </>
      )}
    </div>
  );
} 