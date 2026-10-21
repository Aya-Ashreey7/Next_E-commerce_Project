import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/productCard";
import { getCategories, getProducts } from "@/lib/catalog";

export default async function Home() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const featured = products.slice(0, 8);
  const highlights = categories.slice(0, 6).map((category) => {
    const sample = products.find((product) => product.category === category.slug);
    const count = products.filter((product) => product.category === category.slug).length;
    return { ...category, image: sample?.images?.[0], count };
  });
  const hero = products[0];

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass">The edit</p>
          <h1 className="mt-4 max-w-xl font-display text-5xl leading-[1.05] text-ink sm:text-6xl">
            Everyday objects, chosen with intention.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted">
            NextShop gathers furniture, fragrance, beauty, and pantry staples into one calm catalog. Save what you love, then check out when you are ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-ink">
              Shop the collection
            </Link>
            <Link href="/category" className="rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink hover:border-ink">
              Browse categories
            </Link>
          </div>
        </div>
        {hero?.images?.[0] && (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white">
            <Image
              src={hero.images[0]}
              alt={hero.title}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6 text-white">
              <p className="text-xs uppercase tracking-[0.18em] text-stone-200">Featured</p>
              <p className="mt-1 font-display text-2xl">{hero.title}</p>
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Departments</p>
            <h2 className="mt-2 font-display text-3xl">Shop by category</h2>
          </div>
          <Link href="/category" className="text-sm font-semibold text-accent hover:text-ink">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${encodeURIComponent(category.slug)}`}
              className="group relative min-h-44 overflow-hidden rounded-2xl bg-ink"
            >
              {category.image && (
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="font-display text-2xl">{category.name}</p>
                <p className="text-sm text-stone-200">{category.count} pieces</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Just in</p>
            <h2 className="mt-2 font-display text-3xl">Featured pieces</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-accent hover:text-ink">
            Shop all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} pro={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
          {[
            ["Complimentary notes", "Save favorites and return to them from any visit on this device."],
            ["Clear checkout", "Review quantities, totals, and delivery details before you place an order."],
            ["Signed-in cart", "Your bag and checkout stay private until you sign in."],
          ].map(([title, copy]) => (
            <div key={title}>
              <h3 className="font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
