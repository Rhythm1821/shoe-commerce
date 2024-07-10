import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    refreshToken: {type: String},
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema);


const sellerSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    companyName: {type: String, required: true},
    contactInfo: {type: String, required: true},
    refreshToken: {type: String}
}, {timestamps: true})

const Seller = mongoose.models.Seller || mongoose.model("Seller", sellerSchema)

export {User, Seller}

