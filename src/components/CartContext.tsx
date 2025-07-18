"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import Iproducts from "@/types/products";

type CartItem = Iproducts;

interface IcartContext {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
}

const CartContext = createContext<IcartContext | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
} 