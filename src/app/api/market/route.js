import dbConnect from "@/lib/dbConnect";
import { buyerAuth } from "@/middlewares/auth";
import { Product } from "@/models/Product.model";
import { NextResponse } from "next/server";

dbConnect();

// api/market (GET)
export async function GET(request){
    const isAuthenticated = buyerAuth(request)

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }

    try {
        // Get all products
        const products = await Product.find().select('-_id -createdAt -updatedAt -__v -seller -stockQuantity -ratings' );
    
        return NextResponse.json({products}, { status: 200 })
    } catch (error) {
        return NextResponse.json({error: error.message}, { status: 500 })
    }
}