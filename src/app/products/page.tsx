import { Suspense } from "react";
import FetchedProducts from "@/components/fetchedProducts";
import Filter from "@/components/filter";
import Loading from "./loading";
import { getCategories } from "@/lib/catalog";
import { formatCategory } from "@/lib/format";

export const revalidate = 120;

export const metadata = {
  title: "Shop",
};

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const categories = await getCategories();
  const activeName =
    resolvedSearchParams.category && resolvedSearchParams.category !== "all"
      ? categories.find((category) => category.slug === resolvedSearchParams.category)?.name ||
        formatCategory(resolvedSearchParams.category)
      : "All products";

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Catalog</p>
      <h1 className="mt-2 font-display text-4xl">{activeName}</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        Filter the collection, save pieces you want to revisit, and add them to your bag.
      </p>

      <div className="mt-8">
        <Filter categories={categories} active={resolvedSearchParams.category} />
      </div>

      <div className="mt-8">
        <Suspense fallback={<Loading />}>
          <FetchedProducts searchParams={resolvedSearchParams} />
        </Suspense>
      </div>
    </div>
  );
}
