// pages/product/[id].js
'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const id = 2

  useEffect(() => {
    // Fetch product details based on the id
    // This is a placeholder, replace it with your actual fetch logic
    const fetchedProduct = {
      id,
      name: 'Leather Formal Shoe',
      description: 'Elegant leather formal shoe for men.',
      price: 99.99,
      imageUrl: './formal-shoes.jpeg',
    };
    setProduct(fetchedProduct);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="w-full h-890 overflow-hidden rounded-t-lg">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover mb-6" />
      </div>
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-lg font-bold">${product.price}</p>
    </div>
  );
};

export default ProductDetail;
