import { buyerAuth } from "@/middlewares/auth";
import { Cart, CartItem } from "@/models/Cart.model";
import { Product } from "@/models/Product.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// api/cart (GET)
export async function GET(request) {
    const isAuthenticated = await buyerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }

    const cart = await Cart.findOne({buyer: request.user._id});
    return NextResponse.json({cart}, { status: 200 });
}

// api/cart (POST)
export async function POST(request) {
    const isAuthenticated = await buyerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }

    const body = await request.json();
    const { productId, quantity } = body;

    if (!(await Product.findById(productId))) {
        return NextResponse.json({message: "Product not found"}, { status: 404 });        
    }

    const cart = await Cart.findOne({buyer: request.user._id});
    if (!cart) {
        const newCart = new Cart({
            buyer: request.user._id,
            cartItems: [productId],
            quantity
        });
        await newCart.save();
        return NextResponse.json({message: "Cart created successfully"}, { status: 201 });
    }

    const cartItem = await CartItem({
        cart: cart._id,
        product: productId,
        quantity
    })

    cart.cartItems.push(cartItem);
    cart.quantity += quantity;
    await cart.save();
    return NextResponse.json({message: "Cart updated successfully"}, { status: 200 });
}

