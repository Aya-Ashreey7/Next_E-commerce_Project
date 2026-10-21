"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/lib/catalog";

const featuredSlugs = ["beauty", "fragrances", "furniture", "groceries", "skin-care"];

export default function Filter({
  categories,
  active,
}: {
  categories: Category[];
  active?: string;
}) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const current = active && active !== "all" ? active : "all";

  const featured = featuredSlugs
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter((category): category is Category => Boolean(category));

  const activeCategory = categories.find((category) => category.slug === current);
  const activeIsFeatured = featured.some((category) => category.slug === current);

  function handleFilter(value: string) {
    setOpen(false);
    router.push(value === "all" ? "/products" : `/products?category=${encodeURIComponent(value)}`);
  }

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <Chip selected={current === "all"} onClick={() => handleFilter("all")}>
          All
        </Chip>
        {featured.map((category) => (
          <Chip
            key={category.slug}
            selected={current === category.slug}
            onClick={() => handleFilter(category.slug)}
          >
            {category.name}
          </Chip>
        ))}
      </div>

      <div className="relative shrink-0" ref={menuRef}>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((value) => !value)}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
            open || (activeCategory && !activeIsFeatured)
              ? "border-ink bg-ink text-white"
              : "border-line bg-white text-ink hover:border-ink"
          }`}
        >
          {activeCategory && !activeIsFeatured ? activeCategory.name : "All departments"}
          <span aria-hidden className={`text-[10px] transition ${open ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>

        {open && (
          <div className="absolute left-0 z-20 mt-2 w-[min(28rem,calc(100vw-2.5rem))] rounded-2xl border border-line bg-white p-2 shadow-xl sm:left-auto sm:right-0">
            <ul className="menu-scroll grid grid-cols-2 gap-1" role="listbox" aria-label="Departments">
              {categories.map((category) => {
                const selected = current === category.slug;
                return (
                  <li key={category.slug}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => handleFilter(category.slug)}
                      className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                        selected ? "bg-accent text-white" : "text-ink hover:bg-paper"
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        selected
          ? "border-accent bg-accent text-white"
          : "border-line bg-white text-ink hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}
