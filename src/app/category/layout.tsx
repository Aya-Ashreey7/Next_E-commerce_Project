import SideBar from '@/components/sideBar';
import React from 'react';

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex">
            <SideBar />
            <main className="flex-1 p-10">{children}</main>
        </div>
    );
}