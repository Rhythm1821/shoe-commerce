import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    orderDate: {type: Date, default: Date.now},
    totalAmount: {type: Number, required: true},
    status: {type: String, required: true},
})

const Order = mongoose.model("Order", orderSchema)

const orderItemSchema = new mongoose.Schema({
    order: {type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true}
})

const OrderItem = mongoose.model("OrderItem", orderItemSchema)

export default {Order, OrderItem}