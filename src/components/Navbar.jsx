'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar({ isAuthenticated, setIsCartOpen }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white text-black p-4 sticky top-0 shadow z-10">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <div className="text-2xl font-bold">
                        <Link href="/">ShoeCommerce</Link>
                    </div>
                    <div className="ml-4 hidden md:flex space-x-4">
                        <Link href="/">Home</Link>
                        <Link href="/menu">Menu</Link>
                    </div>
                </div>
                <div className="flex items-center md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                            />
                        </svg>
                    </button>
                </div>
                <div className={`flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mt-4 md:mt-0 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                    {/* <Link href="/cart">Cart</Link> */}
                    <button onClick={() => setIsCartOpen(true)}>Cart</button>
                    <Link href="/seller/home">Become a seller</Link>
                    {isAuthenticated ? (
                        <>
                            <Link href="/account">Account</Link>
                            <Link href="/logout">Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login">Login</Link>
                            <Link href="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
