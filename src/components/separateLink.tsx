"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "Categories", href: "/category" },
  { name: "Favorites", href: "/favorites" },
];

export default function SeparateLink({
  className = "flex items-center gap-6",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathName = usePathname();

  return (
    <div className={className}>
      {navItems.map(({ name, href }) => {
        const active = href === "/" ? pathName === "/" : pathName.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`text-sm tracking-wide transition ${
              active ? "font-semibold text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
}
