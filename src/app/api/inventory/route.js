import dbConnect from "@/lib/dbConnect";
import { Product } from "@/models/Product.model";
import { Seller } from "@/models/User.model";
import { NextResponse } from "next/server";
import { sellerAuth } from "@/utils/auth";

import { saveImages } from "@/utils/utils";

dbConnect()


// api/inventory (GET)
export async function GET(request) {
    const isAuthenticated = await sellerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }

    // check if seller exists
    const currentSeller = await Seller.findById(request.user._id);
    if (!currentSeller) {
        return NextResponse.json({message: "You must be a seller"}, { status: 404 });
    }

    const inventory = await Product.find({seller: request.user._id}).sort({createdAt: -1});

    return NextResponse.json({inventory}, { status: 200 });
}

// api/inventory (POST)
export async function POST(request) {
    const isAuthenticated = await sellerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }

    try {
        // check if seller exists
        const currentSeller = await Seller.findById(request.user._id);
        if (!currentSeller) {
            return NextResponse.json({message: "You must be a seller"}, { status: 404 });
        }
        const FormData = await request.formData(); // error here
        
        const name = FormData.get('name')
        const description = FormData.get('description')
        const brand = FormData.get('brand')
        const material = FormData.get('material')
        const color = FormData.get('color')
        const sizes =  JSON.parse(FormData.get('sizes'))
        const price = Number(FormData.get('price'))
        const category = FormData.get('category')
        const stockQuantity = Number(FormData.get('stockQuantity'))
        const ImageData = Array.from(FormData.getAll('shoeImages'));
    
        
        if (!name || !description || !brand || !material || !color || !sizes || !price || !category || !stockQuantity || ImageData.length<1) {
            return NextResponse.json({message: "Missing required fields"}, { status: 400 });
        }
        
        const shoeImages = await saveImages(brand, category, name, ImageData);
        
    
    
        const newProduct = new Product({
            name,
            description,
            brand,
            material,
            color,
            sizes,
            price,
            category,
            stockQuantity,
            shoeImages
        })
    
        // Add seller
        newProduct.seller = request.user._id;
        await newProduct.save();
    
        return NextResponse.json({message: "Product added successfully"}, { status: 201 });
    } catch (error) {
        console.log("Error adding product:", error);
        return NextResponse.json({message: error.message}, { status: 500 });
    }
}

