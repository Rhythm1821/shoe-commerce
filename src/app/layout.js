'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SellerNavbar from "@/components/SellerNavbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticatedAndType } from "@/utils/api-client";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  
  const noNavRoutes = ['/login', '/register', '/seller/login', '/seller/register']
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [type, setType] = useState(null);

  // // Get pathname
  const route = usePathname();
  console.log("route", route);

  useEffect(()=>{
    async function getAuthenticatedAndType() {
      const res = await isAuthenticatedAndType();
      const data = await res.json();
      console.log("res", res);
      if (!res.ok) {
          console.error(data.message);
      }

      setIsAuthenticated(data.isAuthenticated);
      setType(data.type?.value);
    }

    getAuthenticatedAndType();
  })

  console.log("isAuthenticated", isAuthenticated, "type", type);

  return (
    <html lang="en">
      <body className={inter.className}>
      {!noNavRoutes.includes(route) && (
                type === 'seller' ? <SellerNavbar /> : <Navbar isAuthenticated={isAuthenticated} />
            )}
      {children}
      </body>
    </html>
  );
}

/*
Server-Side Rendering
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SellerNavbar from "@/components/SellerNavbar";
import { cookies } from "next/headers";
import { pathname } from 'next-extra/pathname';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  
  const noNavRoutes = ['/login', '/register', '/seller/login', '/seller/register']

  // Get pathname
  const route = pathname();
  console.log("route", route);

  // Get cookies
  const cookieStore = cookies()
  const hasAccessToken = cookieStore.has('accessToken')
  const hasRefreshToken = cookieStore.has('refreshToken')
  const type = cookieStore.get('type')
  
  // Check if user is authenticated
  const isAuthenticated = hasAccessToken && hasRefreshToken ? true : false;

  return (
    <html lang="en">
      <body className={inter.className}>
        {
          !noNavRoutes.includes(route) && (
            type==='seller' ? <SellerNavbar /> : <Navbar isAuthenticated={isAuthenticated} />
          )
        }
        {children}
      </body>
    </html>
  );
}


*/