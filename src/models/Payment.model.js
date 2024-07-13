import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    paymentDate: {type: Date, default: Date.now()},
    paymentMethod: {type: String, enum: ['UPI', 'Card'], required: true},
    totalAmount: {type: Number, required: true},
    status: {type: String, enum: ['pending', 'done'], default: 'pending'},
})

const Payment = mongoose.model("Payment", paymentSchema)

export default Payment  