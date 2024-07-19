'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SellerNavbar from "@/components/SellerNavbar";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  // Get current path
  const pathname = usePathname();
  
  const noNavRoutes = ['/login', '/register', '/seller/login', '/seller/register']

  // Get cookies
  const accessToken = getCookie('accessToken')
  const refreshToken = getCookie('refreshToken')
  const type = getCookie('type')
  
  // Check if user is authenticated
  const isAuthenticated = accessToken && refreshToken ? true : false;

  return (
    <html lang="en">
      <body className={inter.className}>
        {
          !noNavRoutes.includes(pathname) && (
            type==='seller' ? <SellerNavbar /> : <Navbar isAuthenticated={isAuthenticated} />
          )
        }
        {children}
      </body>
    </html>
  );
}
