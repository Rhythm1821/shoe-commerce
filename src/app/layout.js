'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SellerNavbar from "@/components/SellerNavbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticatedAndType } from "@/utils/api-client";
import Cart from "@/components/Cart";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  
  const noNavRoutes = ['/login', '/register', '/seller/login', '/seller/register']
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [type, setType] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // // Get pathname
  const route = usePathname();

  useEffect(()=>{
    async function getAuthenticatedAndType() {
      const res = await isAuthenticatedAndType();
      const data = await res.json();
      if (!res.ok) {
          console.error(data.message);
      }

      setIsAuthenticated(data.isAuthenticated);
      setType(data.type?.value);
    }

    getAuthenticatedAndType();
  })

  return (
    <html lang="en">
      <body className={inter.className}>
      {!noNavRoutes.includes(route) && (
                type === 'seller' ? <SellerNavbar /> : <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsCartOpen={setIsCartOpen} />
            )}
      {children}
      <Cart open={isCartOpen} setOpen={setIsCartOpen} />
      <Toaster />
      </body>
    </html>
  );
}