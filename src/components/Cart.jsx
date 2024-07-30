'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { fetchCart, removeFromCart } from '@/utils/api-client'
import Link from 'next/link'

export default function Cart({open, setOpen}) {
    const [cart, setCart] = useState([]);
    // const []

    async function getCart() {
        const res = await fetchCart();
        const data = await res.json();
        if (data.cart?.cartItems) {
          setCart(data.cart?.cartItems)              
        }
    }
    useEffect(()=>{

        getCart()

    },[])

    async function handleRemove(e,id){
        e.preventDefault();
        const res = await removeFromCart(id);
        const data = await res.json();
        if (!res.ok) {
          alert(data.message);
          return
        }
        // getCart();
        setCart(cart.filter((item) => item._id !== id));
        alert("Product removed successfully");
        return data.message;
    }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center text-center">
                        <h2 className="text-2xl font-semibold text-gray-900">Your cart is empty</h2>
                        <p className="mt-4 text-gray-500">Browse our products and add items to your cart.</p>
                        <button onClick={() => setOpen(false)} className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700">
                          Continue Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cart.map((product) => (
                            <Link target='_blank' href={`/product/${product.product?._id}`} key={product._id}>
                              <li key={product._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    alt={product.imageAlt}
                                    src={product.product?.shoeImages[0]}
                                    className="h-full w-full object-cover object-center rounded-xl"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.product?.name}</a>
                                        <h5>{product?.product?.category}</h5>
                                      </h3>
                                      <p className="ml-4">Rs.{product?.product?.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product?.product?.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {product.quantity}</p>

                                    <div className="flex">
                                      <button onClick={(e)=>handleRemove(e,product._id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </Link>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>
                        {cart.reduce((total, product) => total + product.product.price * product.quantity, 0)}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
