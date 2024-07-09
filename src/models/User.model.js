import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isSeller: {type: Boolean, default: false},
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema);


const sellerSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    companyName: {type: String, required: true},
    contactInfo: {type: String, required: true}
}, {timestamps: true})

const Seller = mongoose.models.Seller || mongoose.model("Seller", sellerSchema)

export {User, Seller}

