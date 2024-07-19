'use client'

import { addToCart } from "@/utils/api-client";
import Link from "next/link";

export default function Card({ product }) {

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
    <Link target="_blank" href={`/product/${product._id}`}>
      <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden mx-auto p-6">
        <div className="w-full h-64 overflow-hidden rounded-t-lg">
          <img src={product.shoeImages} alt={product.name} className="w-full h-full object-cover mb-6" />
        </div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg text-gray-800 font-bold mb-4">Rs.{product.price}</p>
        <button onClick={(e) => {handleAddToCart(e,product._id, 1)}} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
