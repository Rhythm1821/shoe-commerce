'use client'
import { fetchCart } from "@/utils/api-client";
import { useEffect, useState } from "react";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCartProducts = async () => {
            const cart = await fetchCart();
            setCart(cart);
        }

        fetchCartProducts();
    }, [])
    return (
        <>
            <div>Cart</div>
            {
                JSON.stringify(cart)
            }
        </>
    )
}