"use client";
import React from 'react';
import Image from "next/image";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import Iproducts from '@/types/products';
import Link from 'next/link';
import { useCart } from './CartContext';
import { useToast } from './ToastContext';

interface IProps {
    pro: Iproducts
}

export default function ProductCard({ pro }: IProps) {
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const handleAddToCart = () => {
        addToCart(pro);
        showToast(`${pro.title} added to cart!`);
    };

    return (
        <div>
            <div className="relative overflow-hidden rounded-t-2xl">
                <Image
                    src={pro.images[0]}
                    width={400}
                    height={300}
                    alt={pro.title}
                    className="object-cover w-full h-90 hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    -{Math.round(pro.discountPercentage)}%
                </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{pro.title}</h2>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{pro.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-purple-600 text-lg font-bold">${pro.price}</span>
                    <span className="flex items-center text-yellow-500 text-sm">
                        <FaStar className="mr-1" /> {pro.rating}
                    </span>
                </div>
                <Link
                    href={`/products/${pro.id}`}
                    className="mt-4 inline-block text-center text-sm font-semibold bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
                >
                    View Details
                </Link>
                <div className="mt-4 flex justify-between items-center">
                    <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${pro.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {pro.stock > 0 ? `${pro.stock} in stock` : "Out of stock"}
                    </span>
                    <div className="flex gap-2">
                        <button
                            className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition"
                            onClick={handleAddToCart}
                        >
                            <FaShoppingCart />
                        </button>
                        <button className="p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200">
                            <FaHeart />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
