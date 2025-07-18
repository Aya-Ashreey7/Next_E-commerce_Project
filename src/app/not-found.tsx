import Link from "next/link";

// app/category/not-found.tsx
export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center px-6 ">
            <div >
                <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600 mb-6">
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
}
