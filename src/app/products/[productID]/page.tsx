import Iproducts from '@/types/products';
import Image from 'next/image';
import React from 'react';

interface Props {
    params: {
        productID: string;
    };
}

export default async function Page({ params }: Props) {

    const res = await fetch(`https://dummyjson.com/products/${params.productID} `);
    const product: Iproducts = await res.json();

    return (
        <div className="p-8 sm:p-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">


                <div className="order-2 md:order-1 space-y-5">
                    <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                        {product.title}
                    </h1>

                    <p className="text-gray-600 text-base">{product.description}</p>

                    <div className="text-purple-600 text-3xl font-extrabold">
                        ${product.price}
                    </div>

                    <div className="text-sm text-gray-700 flex items-center gap-2">
                        <span>⭐ {product.rating}</span>
                        <span className="text-gray-400">•</span>
                        <span>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition">
                            Add to Cart
                        </button>
                        <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded-xl transition">
                            Wishlist
                        </button>
                    </div>
                </div>

                <div className="order-1 md:order-2">
                    <div className="relative w-full overflow-hidden rounded-xl shadow-xl">
                        <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={600}
                            height={600}
                            className="object-cover w-full h-auto hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>
        </div>
    );



}

