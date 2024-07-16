'use client'
import { fetchCart } from "@/utils/api-client";
import { useEffect, useState } from "react";
import CartComponent from "@/components/CartComponent";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetchCart()
            .then((res)=>setCart(res.cart))
            .catch((err)=>console.log(err))
    },[])
    
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {cart ? <CartComponent cart={cart} /> : <p>Loading...</p>}
        </div>
    )
}