"use client"
import { fetchProducts } from "@/utils/api-client";
import { useEffect, useState } from "react";

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
        <div className="p-6 bg-slate-950 text-yellow-100 rounded shadow-md text-center">
            <div>
                {
                    allProducts.length > 0 ? (
                        allProducts.map((product, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-xl">{product.name}</h3>
                                <p>Category: {product.category}</p>
                                <p>Brand: {product.brand}</p>
                                <p>Description: {product.description}</p>
                                <p>Material: {product.material}</p>
                                <p>Color: {product.color}</p>
                                <p>Price: ${product.price}</p>
                                <p>Sizes: {product.sizes.join(", ")}</p>
                                {product.shoeImages.length > 0 && (
                                    <div>
                                        <h4 className="text-lg">Images:</h4>
                                        <div className="flex space-x-4">
                                            {product.shoeImages.map((image, imgIndex) => (
                                                <img key={imgIndex} src={image} alt={`Shoe Image ${imgIndex}`} className="w-24 h-24 object-cover rounded shadow mx-auto" />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No products available</p>
                    )
                }
            </div>
        </div>
    );
}
