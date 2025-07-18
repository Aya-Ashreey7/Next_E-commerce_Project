

import Iproducts from '@/types/products';
import React from 'react';
import ProductCard from './productCard';

export default async function FetchedProducts({ searchParams }: { searchParams: { category?: string } }) {

    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    let products: Iproducts[] = data.products;

    const category = searchParams.category;
    if (category && category !== "all") {
        products = products.filter(
            (product) => product.category.toLowerCase() === category.toLowerCase()
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((pro: Iproducts) => (
                    <div
                        key={pro.id}
                        className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col"
                    >

                        <ProductCard pro={pro} />

                    </div>
                ))}
            </div>
        </div>
    );
}

;
