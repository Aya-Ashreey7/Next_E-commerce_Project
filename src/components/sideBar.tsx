import React from 'react';

interface Iproducts {
    category: string
}


export default async function SideBar() {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    const products: Iproducts[] = data.products;

    const categorySet = new Set(products.map((p) => p.category));
    const categories = Array.from(categorySet);
    return (
        <div>

            <aside className="w-64 bg-gray-100 p-6 border-r border-gray-300 min-h-screen p-7">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Categories</h2>
                <ul className="space-y-2">
                    {categories.map((cat) => (
                        <li key={cat}>
                            <a
                                href={`/products/${cat}`}
                                className="block px-4 py-2 rounded hover:bg-purple-100 text-gray-700 font-medium hover:text-purple-700 transition"
                            >
                                {cat}
                            </a>
                        </li>
                    ))}
                </ul>
            </aside>


        </div>
    );
}

