'use client'

import { addToCart } from "@/utils/api-client";
import Link from "next/link";
import { Button } from "./ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export default function Card({ product }) {

  if (!product) return <div className="text-center text-gray-600">Loading...</div>;

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

  if (!product) return <div className="text-center text-gray-600">Loading...</div>;

  return (
      <div className="max-w-sm bg-zinc-50 rounded-2xl shadow-lg overflow-hidden mx-auto p-6 transition-transform transform hover:scale-105 w-full">
        
          <Carousel>
            <CarouselContent>
              {product.shoeImages.map((image, index) => (
                <CarouselItem key={index}>
                  <Link target="_blank" href={`/product/${product._id}`}>
                    <img
                      src={image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="flex items-center justify-center absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-800 hover:bg-gray-100 hover:text-gray-900 rounded-full shadow-lg h-8 w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </CarouselPrevious>
            <CarouselNext className="flex items-center justify-center absolute right-0 top-1/2 transform -translate-y-1/2  text-gray-800 hover:bg-gray-200 hover:text-gray-900 rounded-full shadow-lg h-8 w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </CarouselNext>

          </Carousel>

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
      </div>
  );
}
