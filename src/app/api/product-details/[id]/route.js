import { buyerAuth } from "@/utils/auth";
import { Product } from "@/models/Product.model";
import { NextResponse } from "next/server";

// api/product-details (GET)
export async function GET(request,context) {

    try {
        const { id } = context.params;
    
        const product = await Product.findById(id).select('-_id -createdAt -updatedAt -__v -seller');
    
        if (!product) {
            return NextResponse.json({message: "Product not found"}, { status: 404 });
        }
    
        return NextResponse.json({product}, { status: 200 });
    } catch (error) {
        return NextResponse.json({error: error.message}, { status: 500 });
    }
}