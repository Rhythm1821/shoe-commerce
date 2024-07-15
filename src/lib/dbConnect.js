import mongoose from "mongoose";

export default async function dbConnect() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}

