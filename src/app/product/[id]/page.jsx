'use client'
import { addToCart, fetchProductDetails } from "@/utils/api-client";
import { useEffect, useState } from "react";

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
      if (res.status === 200) {
        return alert(message);
      }
    } catch (error) {
      return alert(error.message);
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
          <img
            src={product.shoeImages[0]}
            alt={product.name}
            className="rounded-lg shadow-lg"
          />
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
