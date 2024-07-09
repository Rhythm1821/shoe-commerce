import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    seller: {type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    tags: {type: [String], required: true},
    stockQuantity: {type: Number, required: true},
    dateAdded: {type: Date, default: Date.now}
})

const Product = mongoose.model("Product", productSchema)

export default Product