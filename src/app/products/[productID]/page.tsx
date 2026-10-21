import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductActions from "@/components/productActions";
import Iproducts from "@/types/products";
import { formatCategory, formatPrice } from "@/lib/format";

interface PageProps {
  params: Promise<{
    productID: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { productID } = await params;
  const res = await fetch(`https://dummyjson.com/products/${productID}`, {
    next: { revalidate: 120 },
  });

  if (!res.ok) notFound();

  const product: Iproducts = await res.json();
  if (!product?.id) notFound();

  const image = product.images?.[0];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Link href="/products" className="text-sm font-semibold text-muted hover:text-ink">
        Back to shop
      </Link>
      <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white">
          {image && (
            <Image
              src={image}
              alt={product.title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="lg:py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">
            <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-ink">
              {formatCategory(product.category)}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{product.title}</h1>
          <p className="mt-5 max-w-prose text-base leading-7 text-muted">{product.description}</p>
          <p className="mt-6 font-display text-4xl">{formatPrice(product.price)}</p>
          <p className="mt-3 text-sm text-muted">
            Rated {product.rating} · {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
          <div className="mt-8">
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
