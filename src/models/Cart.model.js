import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    cartItems: {type: [mongoose.Schema.Types.ObjectId], ref: "CartItem", required: true},
    created_at: {type: Date, default: Date.now}
})

const Cart = mongoose.model("Cart", cartSchema)

const cartItemSchema = new mongoose.Schema({
    cart: {type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    quantity: {type: Number, required: true}
})

const CartItem = mongoose.model("CartItem", cartItemSchema)

export default {Cart, CartItem}