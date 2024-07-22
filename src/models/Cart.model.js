
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    size: {type: Number, required: true},
    color: {type: String, required: true},
    quantity: {type: Number, required: true}
})


const cartSchema = new mongoose.Schema({
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    cartItems: [cartItemSchema]
}, {timestamps: true})

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema)


export {Cart}