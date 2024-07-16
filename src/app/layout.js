import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  const heads = headers()
 
  const pathname = heads.get('next-url')
  const noNavRoutes = ['/login', '/register', '/seller/login', '/seller/register']

  const cookie = cookies();
  const accessToken = cookie.get('accessToken')?.value;
  const refreshToken = cookie.get('refreshToken')?.value;
  
  const isAuthenticated = accessToken && refreshToken ? true : false;

  return (
    <html lang="en">
      <body className={inter.className}>
        {!noNavRoutes.includes(pathname) && <Navbar isAuthenticated={isAuthenticated} />}
        {children}
      </body>
    </html>
  );
}
