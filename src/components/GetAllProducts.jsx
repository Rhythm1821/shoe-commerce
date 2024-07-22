"use client"
import { fetchProducts } from "@/utils/api-client";
import { useEffect, useState } from "react";
import Card from "./ProductCard";

export default function GetAllProducts() {
    const [allProducts, setAllProducts] = useState([]);


    useEffect(() => {
        const getProducts = async () => {
            const products = await fetchProducts();
            setAllProducts(products);
        };
        getProducts();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
                {allProducts?.length > 0 ? (
                    allProducts.map((product, index) => (
                        <Card key={index} product={product} />
                    ))
                ) : (
                    <p className="text-center text-gray-600 text-xl">Loading...</p>
                )}
            </div>
        </div>
    );
    
    
}
