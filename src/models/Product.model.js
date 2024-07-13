import mongoose from "mongoose";


// for shoes category
const shoesSchema = new mongoose.Schema({
    // Specific for shoes category
    category: {
        type: String,
        enum: ['Formal', 'Casual', 'Sports', 'Ethnic', 'Boots'],
        required: true
    }, //
    sizes: {type: [Number], required: true}, //

    // Common to all categories
    seller: {type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true},
    name: {type: String, required: true}, //
    brand: {type: String, required: true}, //
    description: {type: String, required: true}, //
    material: {type: String, required: true}, //
    color: {type: String, required: true}, //
    price: {type: Number, required: true}, //
    stockQuantity: {type: Number, required: true}, //
    shoeImages: {type: [String], required: true}, //
    ratings: {type: Number, default: 0},
    reviews: {type: mongoose.Schema.Types.ObjectId, ref: "Review"},
}, {timestamps: true})

const Product = mongoose.models.Product || mongoose.model("Product", shoesSchema)

export {Product}