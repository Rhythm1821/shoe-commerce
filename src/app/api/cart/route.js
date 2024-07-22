import { Cart } from "@/models/Cart.model";
import { Product } from "@/models/Product.model";
import { buyerAuth } from "@/utils/auth";
import { NextResponse } from "next/server";

// api/cart (GET)
export async function GET(request) {
    const isAuthenticated = await buyerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Sign Up to add items to cart"}, { status: 401 })
    }

    const cart = await Cart.findOne({buyer: request.user._id}).populate({path: "cartItems.product", select: "name price color category shoeImages"});
    return NextResponse.json({cart}, { status: 200 });
}

// api/cart (POST)

export async function POST(request) {

    // check if buyer exists
    const isAuthenticated = await buyerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Sign Up to add items to cart"}, { status: 401 })
    }

    // Get the data
    const body = await request.json();
    const { productId, quantity } = body;

    // check if product exists
    if (!(await Product.findById(productId))) {
        return NextResponse.json({message: "Product not found"}, { status: 404 });        
    }

    // check if cart exists
    const cart = await Cart.findOne({buyer: request.user._id});

    // create new cart if not exists
    if (!cart) {
        const newCart = new Cart({
            buyer: request.user._id,
            cartItems: [{product: productId, quantity, size: body.size}],            
        })
        await newCart.save();
        return NextResponse.json({message: "Cart created successfully"}, { status: 201 });
    }
    
    // Add product to cart
    const existingItemIndex = cart.cartItems.findIndex((item) => item.product.toString() === productId);
    if (existingItemIndex > -1) {
        // Product already exists in cart, update quantity
        cart.cartItems[existingItemIndex].quantity += quantity;
    } else {
        // Product does not exist in cart, add new item
        cart.cartItems.push({product: productId, quantity});
    }

    await cart.save();
    return NextResponse.json({message: "Cart updated successfully"}, { status: 200 });

}

export async function PUT(request) {

    // check if buyer exists
    const isAuthenticated = await buyerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Sign Up to add items to cart"}, { status: 401 })
    }

    // Get the query params id
    const { productId, quantity } = await request.json();

    // check if cart exists
    const cart = await Cart.findOne({buyer: request.user._id});
    if (!cart) {
        return NextResponse.json({message: "Cart not found"}, { status: 404 });
    }

    // Update item from cart
    const existingItemIndex = cart.cartItems.findIndex((item) => item.product.toString() === productId);
    if (existingItemIndex > -1) {
        // Product already exists in cart, update quantity
        cart.cartItems[existingItemIndex].quantity += quantity
        
        if (cart.cartItems[existingItemIndex].quantity <= 0) {
            cart.cartItems.splice(existingItemIndex, 1);
        }
    } else {
        // Product does not exist in cart
        return NextResponse.json({message: "Product not found in cart"}, { status: 404 });
    }

    await cart.save();

    return NextResponse.json({message: "Cart updated successfully"}, { status: 200 });
}