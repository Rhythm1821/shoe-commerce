import Link from 'next/link';

export default function Navbar({ isAuthenticated }) {
    return (
        <nav className="bg-white text-black p-4 sticky top-0 shadow z-10">
            <div className="container mx-auto flex items-center">
                <div className="flex items-center space-x-4">
                    
                    <ul className="flex space-x-4 list-none">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/menu">Menu</Link></li>
                    </ul>
                </div>
                <div className="ml-auto flex items-center">
                    <h4 className="text-2xl font-bold">ShoeCommerce</h4>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                    <ul className="flex space-x-4 list-none">
                        {isAuthenticated ? (
                            <>
                            <li><Link href="/account">Account</Link></li>
                            <li><Link href="/logout">Logout</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link href="/login">Login</Link></li>
                                <li><Link href="/register">Register</Link></li>
                            </>
                        )}
                        <li><Link href="/cart">Cart</Link></li>
                        <li><Link href={"/seller/home"}>Become a seller</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
