import Image from "next/image";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/catalog";

export const metadata = {
  title: "Categories",
};

export default async function CategoryPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const cards = categories.map((category) => {
    const matches = products.filter((product) => product.category === category.slug);
    return {
      ...category,
      count: matches.length,
      image: matches[0]?.images?.[0],
    };
  }).filter((category) => category.count > 0 || category.slug);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Departments</p>
      <h1 className="mt-2 font-display text-4xl">Shop by category</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        Each department opens a filtered catalog, so you land on the products that belong there.
      </p>

      {cards.length === 0 ? (
        <p className="mt-10 text-sm text-muted">Categories are unavailable right now. Please try again shortly.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${encodeURIComponent(category.slug)}`}
              className="group overflow-hidden rounded-2xl border border-line bg-white"
            >
              <div className="relative aspect-[5/4] bg-paper">
                {category.image && (
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex items-end justify-between gap-3 p-5">
                <div>
                  <h2 className="font-display text-2xl">{category.name}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {category.count} {category.count === 1 ? "product" : "products"}
                  </p>
                </div>
                <span className="text-sm font-semibold text-accent">Shop</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
