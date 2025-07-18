import React from 'react';

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-[70vh]">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}

