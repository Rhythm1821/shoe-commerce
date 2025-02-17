import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    comment: {type: String, required: true},
}, {timestamps: true})

const Review = mongoose.model("Review", reviewSchema)

export default Review