// app/layout.tsx
import Navbar from "@/components/navbar";
import "./globals.css";
import { Poppins } from "next/font/google";
import { CartProvider } from "@/components/CartContext";
import { ToastProvider } from "@/components/ToastContext";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className + " bg-gray-50 text-gray-900"}>
        <SessionProvider>
          <ToastProvider>
            <CartProvider>
              <Navbar />
              <main>{children}</main>
             
            </CartProvider>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
