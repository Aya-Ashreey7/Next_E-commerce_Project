'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

export default function Filter() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();

    function handleFilter(FilterValue: string) {
        const params = new URLSearchParams(searchParams);
        params.set('category', FilterValue);
        router.replace(`${pathName}?${params.toString()}`);
    }

    const categories = ['all', 'beauty', 'fragrances', 'furniture', 'groceries'];

    return (
        <div className="mb-8 flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleFilter(cat)}
                    className="px-5 py-2 text-sm font-medium rounded-full border border-purple-300 bg-white text-purple-700 hover:bg-purple-600 hover:text-white transition-all duration-200 shadow-sm"
                >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
            ))}
        </div>
    );
}
