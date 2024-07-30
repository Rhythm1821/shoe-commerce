

// api/cart/:id (DELETE)

import dbConnect from "@/lib/dbConnect";
import { Cart } from "@/models/Cart.model";
import { buyerAuth } from "@/utils/auth";
import { NextResponse } from "next/server";

dbConnect();




// TODO 
// export async function PUT(request) {

//     // check if buyer exists
//     const isAuthenticated = await buyerAuth(request);

//     if (!isAuthenticated) {
//         return NextResponse.json({message: "Sign Up to add items to cart"}, { status: 401 })
//     }

//     // Get the query params id
//     const { productId, quantity } = await request.json();

//     // check if cart exists
//     const cart = await Cart.findOne({buyer: request.user._id});
//     if (!cart) {
//         return NextResponse.json({message: "Cart not found"}, { status: 404 });
//     }

//     // Update item from cart
//     const existingItemIndex = cart.cartItems.findIndex((item) => item.product.toString() === productId);
//     if (existingItemIndex > -1) {
//         // Product already exists in cart, update quantity
//         cart.cartItems[existingItemIndex].quantity += quantity
        
//         if (cart.cartItems[existingItemIndex].quantity <= 0) {
//             cart.cartItems.splice(existingItemIndex, 1);
//         }
//     } else {
//         // Product does not exist in cart
//         return NextResponse.json({message: "Product not found in cart"}, { status: 404 });
//     }

//     await cart.save();

//     return NextResponse.json({message: "Cart updated successfully"}, { status: 200 });
// }