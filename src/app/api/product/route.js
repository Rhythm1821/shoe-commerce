import dbConnect from "@/lib/dbConnect";
import { Product } from "@/models/Product.model";
import { Seller } from "@/models/User.model";
import { NextResponse } from "next/server";
import { sellerAuth } from "@/middlewares/auth";

import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
const pump = promisify(pipeline);

dbConnect()


// api/product (GET)
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

    const products = await Product.find({seller: request.user._id});

    return NextResponse.json({products}, { status: 200 });
}

// api/product (POST)
export async function POST(request) {
    const isAuthenticated = await sellerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }

    // check if seller exists
    const currentSeller = await Seller.findById(request.user._id);
    if (!currentSeller) {
        return NextResponse.json({message: "You must be a seller"}, { status: 404 });
    }

    const FormData = await request.formData();
    
    const name = FormData.get('name')
    const description = FormData.get('description')
    const brand = FormData.get('brand')
    const material = FormData.get('material')
    const color = FormData.get('color')
    const sizes =  JSON.parse(FormData.get('sizes'))
    const price = Number(FormData.get('price'))
    const category = FormData.get('category')
    const stockQuantity = Number(FormData.get('stockQuantity'))

    const ImageData = FormData.getAll('shoeImages')
    console.log("ImageData", ImageData);

    const shoeImages = []
    async function saveImages() {
        // check if brand dir exists
        const brandDir = `./public/${brand}`;
        if (!fs.existsSync(brandDir)) {
            fs.mkdirSync(brandDir);
        }
    
        for (const Image of ImageData) {
            const filePath = `./public/${brand}/${Image.name}`;
            try {
                await pump(Image.stream(), fs.createWriteStream(filePath));
                shoeImages.push(`http://localhost:3000/${Image.name}`);
                console.log(`File ${Image.name} saved successfully to ${filePath}`);
            } catch (error) {
                console.error(`Error saving ${Image.name}:`, error);
            }
        }
        }
    
    await saveImages();
    

    if (!name || !description || !brand || !material || !color || !sizes || !price || !category || !stockQuantity || shoeImages.length<1) {
        return NextResponse.json({message: "Missing required fields"}, { status: 400 });
    }

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
}

