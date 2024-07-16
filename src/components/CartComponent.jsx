import React from 'react';

const CartComponent = ({ cart }) => {
  console.log("Received cart", cart);
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold">Cart</h2>
        <p className="text-gray-600">Buyer: {cart.buyer}</p>
        <p className="text-gray-600">Created At: {new Date(cart.createdAt).toLocaleString()}</p>
        <p className="text-gray-600">Updated At: {new Date(cart.updatedAt).toLocaleString()}</p>
      </div>
      <div className="p-4">
        {cart.cartItems?.map((item) => (
          <div key={item._id} className="flex justify-between items-center p-2 border-b last:border-none">
            <div>
              <h3 className="text-lg font-semibold">Product: {item.product.name}</h3>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartComponent;
