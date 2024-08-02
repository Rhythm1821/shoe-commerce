'use client'
import { addToCart, fetchProductDetails } from "@/utils/api-client";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { toast } from "react-hot-toast";

export default function ProductPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchProductDetails(id)
      .then((res) => res.json())
      .then((res) => setProduct(res.product))
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddToCart = async (e,productId, quantity) => {
    e.preventDefault();
    try {
      const res = await addToCart(productId, quantity);
      const {message} = await res.json();
      if (res.ok) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  if (!product || Object.keys(product).length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-900">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        <div className="lg:flex lg:justify-center">
        <Carousel>
            <CarouselContent>
              {product.shoeImages.map((image, index) => (
                <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
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
        </div>
        <div className="mt-8 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-4 text-gray-600">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p className="mt-4 text-gray-600">
            <span className="font-semibold">Material:</span> {product.material}
          </p>
          <p className="mt-4 text-gray-600">
            <span className="font-semibold">Color:</span> {product.color}
          </p>
          <p className="mt-4 text-gray-600">
            <span className="font-semibold">Sizes:</span>{" "}
            {product.sizes.join(", ")}
          </p>
          <p className="mt-4 text-gray-600">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p className="mt-4 text-gray-600">
            <span className="font-semibold">Ratings:</span> {product.ratings}
          </p>
          <p className="mt-4 text-2xl font-semibold text-gray-900">
            Rs. {product.price}
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart(e, id, 1);
            }}
           className="w-full bg-blue-500 text-white mt-7 mb-4 py-3  rounded-xl hover:bg-blue-600 transition-colors duration-200">
            Add to Cart
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart(e, id, 1);
            }}
           className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-colors duration-200">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
