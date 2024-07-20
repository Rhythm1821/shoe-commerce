'use client'

import { addToCart } from "@/utils/api-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Card({ product }) {

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = async (e,productId, quantity) => {
    e.preventDefault();
    try {
      const res = await addToCart(productId, quantity);
      const {message} = await res.json();
      if (res.status === 200) {
        return alert(message);
      }
    } catch (error) {
      return alert(error.message);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
      <div className="max-w-sm bg-zinc-50 rounded-2xl shadow-lg overflow-hidden mx-auto p-6 transition-transform transform hover:scale-105 w-full">
        <Link target="_blank" href={`/product/${product._id}`}>
          <div className="w-full h-64 overflow-hidden rounded-xl">
            <img src={product.shoeImages} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
        <div className="flex">
          <h1 className="text-xl text-gray-600 text-center mb-2 truncate px-9">{product.name}</h1>
           || 
          <p className="text-neutral-900 text-center text-xl mb-4 truncate">{product.brand}</p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg text-gray-800 font-bold">Rs. {product.price}</p>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart(e, product._id, 1);
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-200"
          >
            Add to Cart
          </Button>
        </div>
        <button onClick={(e) => {handleAddToCart(e,product._id, 1)}} className="w-full bg-orange-500 text-white py-2 px-4 rounded-xl hover:bg-orange-600 transition-colors duration-200">
          Buy Now
        </button>
    </div>
        </Link> 
      </div>
  );
}
