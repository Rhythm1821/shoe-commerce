'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Cookies } from "react-cookie";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathaname = usePathname();
  const noNavRoutes = ['/login', '/register', '/seller/login', '/seller/register']

  const cookie = new Cookies();
  const accessToken = cookie.get('accessToken')?.value;
  const refreshToken = cookie.get('refreshToken')?.value;
  
  const isAuthenticated = accessToken && refreshToken ? true : false;

  return (
    <html lang="en">
      <body className={inter.className}>
        {!noNavRoutes.includes(pathaname) && <Navbar isAuthenticated={isAuthenticated} />}
        {children}
      </body>
    </html>
  );
}
