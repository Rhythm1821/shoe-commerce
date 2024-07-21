'use client'
import { fetchCart } from "@/utils/api-client";
import { useEffect, useState } from "react";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null)

    useEffect(()=>{
        async function getCart() {
            const res = await fetchCart();
            const data = await res.json();
            console.log("res", res);
            if (!res.ok) {
                setError(data.message)
            }

            setCart(data.cart)
        }

        getCart()

    },[])

    if (error) {
        return <div>{error}</div>
    }
    
    return (
        <>
         <div className="h-screen text-gray-600">{JSON.stringify(cart)}</div>
        </>
    )
}