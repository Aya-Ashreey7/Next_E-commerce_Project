import Link from "next/link";

const shopLinks = [
  { href: "/products", label: "All products" },
  { href: "/category", label: "Categories" },
  { href: "/favorites", label: "Favorites" },
];

const accountLinks = [
  { href: "/signin", label: "Sign in" },
  { href: "/signup", label: "Create account" },
  { href: "/cart", label: "Cart" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="font-display text-2xl text-white">NextShop</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-stone-300">
            Everyday goods, edited with care. Furniture, fragrance, beauty, and pantry staples in one place.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-stone-300">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Account</p>
          <ul className="mt-4 space-y-2 text-sm text-stone-300">
            {accountLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-stone-400">
          NextShop. Product imagery and catalog data via DummyJSON.
        </p>
      </div>
    </footer>
  );
}
