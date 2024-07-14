import dbConnect from "@/lib/dbConnect";
import { buyerAuth } from "@/middlewares/auth";
import { Product } from "@/models/Product.model";
import { NextResponse } from "next/server";

dbConnect();

// api/market (GET)
export async function GET(request){
    try {
        // Get all products
        const products = await Product.find().select('-createdAt -updatedAt -__v -seller -stockQuantity -ratings' );
    
        return NextResponse.json({products}, { status: 200 })
    } catch (error) {
        return NextResponse.json({error: error.message}, { status: 500 })
    }
}