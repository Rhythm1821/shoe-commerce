'use client'
import { fetchInventory } from "@/utils/api-client"
import { useEffect, useState } from "react"

export default function Inventory() {
    const [inventory, setInventory] = useState([]);

    useEffect(()=>{
        fetchInventory()
            .then((res)=>{setInventory(res.inventory)})
            .catch((err)=>console.log(err))
    },[])

    console.log("inventory", inventory)

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h2>Inventory</h2>
            {JSON.stringify(inventory)}
        </div>
    )
}