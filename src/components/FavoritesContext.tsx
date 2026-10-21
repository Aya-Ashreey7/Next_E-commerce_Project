"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Iproducts from "@/types/products";

interface FavoritesContextValue {
  favorites: Iproducts[];
  toggleFavorite: (product: Iproducts) => boolean;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);
const STORAGE_KEY = "nextshop-favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Iproducts[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      setFavorites([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites, ready]);

  const isFavorite = (id: number) => favorites.some((product) => product.id === id);

  const toggleFavorite = (product: Iproducts) => {
    const alreadySaved = favorites.some((item) => item.id === product.id);
    setFavorites((current) =>
      alreadySaved ? current.filter((item) => item.id !== product.id) : [...current, product]
    );
    return !alreadySaved;
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
}
