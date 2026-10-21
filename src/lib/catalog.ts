import Iproducts from "@/types/products";
import { formatCategory } from "@/lib/format";

export interface Category {
  slug: string;
  name: string;
}

export async function getProducts(limit = 0): Promise<Iproducts[]> {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}`, {
    next: { revalidate: 120 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.products ?? [];
}

export async function getProductsByCategory(category: string): Promise<Iproducts[]> {
  const res = await fetch(
    `https://dummyjson.com/products/category/${encodeURIComponent(category)}`,
    { next: { revalidate: 120 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.products ?? [];
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch("https://dummyjson.com/products/categories", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  if (!Array.isArray(data)) return [];

  return data.map((item) => {
    if (typeof item === "string") {
      return { slug: item, name: formatCategory(item) };
    }
    const slug = String(item.slug ?? "");
    return { slug, name: String(item.name ?? formatCategory(slug)) };
  }).filter((category) => category.slug);
}
