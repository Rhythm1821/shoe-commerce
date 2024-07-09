import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    paymentDate: {type: Date, default: Date.now},
    totalAmount: {type: Number, required: true},
    status: {type: String, required: true},
})

const Payment = mongoose.model("Payment", paymentSchema)

export default Payment  