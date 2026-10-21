import Link from "next/link";
import { getCategories } from "@/lib/catalog";

export default async function SideBar() {
  const categories = await getCategories();

  return (
    <aside className="w-full border-b border-line bg-white p-6 lg:w-64 lg:border-b-0 lg:border-r">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-brass">Categories</h2>
      <ul className="mt-4 space-y-1">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/products?category=${encodeURIComponent(category.slug)}`}
              className="block rounded-lg px-3 py-2 text-sm text-ink hover:bg-paper"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
