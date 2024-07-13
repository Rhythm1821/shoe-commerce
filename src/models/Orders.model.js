import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    quantity: {type: Number, required: true},
}, {toJSON: {virtuals: true}}, {toObject: {virtuals: true}})

orderItemSchema.virtual("price").get(function () {
    return this.quantity * this.product.price
})

const orderSchema = new mongoose.Schema({
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},    
    payment: {type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: true},
    orderDate: {type: Date, default: Date.now()},
    status: {type: String, enum: ['pending', 'processing', 'shipped', 'delivered'], default: 'pending'},
    orderItems: [orderItemSchema]
})

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)



export {Order}