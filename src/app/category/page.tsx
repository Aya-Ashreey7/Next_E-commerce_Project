
interface Iproducts {
    category: string
}

export default async function Category() {

    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()
    const products: Iproducts[] = data.products



    const categorySet = new Set(products.map((p) => p.category));
    const categories = Array.from(categorySet);


    return (
        <div>
            <section className="max-w-3xl mx-auto px-4 py-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Categories of products
                </h1>

                <div className="flex justify-center gap-4">
                    {categories.map((cat) => (
                        <a
                            key={cat}
                            href={`/products`}
                            className="px-6 py-3 border border-gray-300 font-semibold rounded-lg hover:border-purple-600 hover:text-purple-600 transition"
                        >
                            {cat}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    )
}

