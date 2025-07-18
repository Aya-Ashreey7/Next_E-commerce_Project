// import Image from "next/image";

import Link from "next/link";



export default function Home() {
  return (

    <div className="bg-gray-50">

      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to Our Platform
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Build faster, smarter, and cleaner websites with our tools and services.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/products"
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Get Started
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 border border-gray-300 font-semibold rounded-lg hover:border-purple-600 hover:text-purple-600 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features  */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-3 text-center">
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Performance</h3>
              <p className="text-gray-600">Optimized for speed and scalability using modern frameworks like Next.js.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Developer Friendly</h3>
              <p className="text-gray-600">Designed with developers in mind. Clean code, modern tooling, and extensibility.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Beautiful UI</h3>
              <p className="text-gray-600">Prebuilt components and UI kits to make stunning interfaces easily.</p>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}
