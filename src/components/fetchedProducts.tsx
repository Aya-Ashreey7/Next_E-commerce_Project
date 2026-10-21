import Iproducts from "@/types/products";
import ProductCard from "./productCard";
import { getProducts, getProductsByCategory } from "@/lib/catalog";
import { formatCategory } from "@/lib/format";

export default async function FetchedProducts({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  const products: Iproducts[] =
    category && category !== "all"
      ? await getProductsByCategory(category)
      : await getProducts();

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
        <p className="font-display text-2xl">Nothing in this category yet</p>
        <p className="mt-2 text-sm text-muted">
          {category ? `No products matched ${formatCategory(category)}.` : "The catalog is unavailable right now."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} pro={product} />
      ))}
    </div>
  );
}
