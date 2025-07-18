'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/category" },
]

const SeparateLink = () => {
    const pathName = usePathname()



    return (
        <div>
            {
                navItems.map(({ name, href }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`${href === pathName ? "underline " : ""}text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4`}
                    >
                        {name}
                    </Link>
                ))
            }

        </div>
    );
}

export default SeparateLink;
