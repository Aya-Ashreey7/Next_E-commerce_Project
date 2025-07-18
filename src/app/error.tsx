'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  error: Error;
}

export default function Error({ error }: Props) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>

        <p className="text-gray-600 mb-6">
          {error.message || 'An unexpected error occurred.'}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition"
          >
            Go Back
          </button>

          <button
            onClick={() => router.push('/')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
