import dbConnect from "@/lib/dbConnect";
import { sellerAuth } from "@/utils/auth";
import { Product } from "@/models/Product.model";
import { NextResponse } from "next/server";
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Seller } from "@/models/User.model";
const pump = promisify(pipeline);

dbConnect();

// api/product/:id (GET)
export async function GET(request,context) {
    const isAuthenticated = await sellerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }
    const { id } = context.params;
    const product = await Product.findById(id);
    return NextResponse.json({product}, { status: 200 });
}

// api/product/:id (PUT)
export async function PUT(request,context) {
    const isAuthenticated = await sellerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = context.params;

    const curProduct = await Product.findById(id);
    const seller = await Seller.findById(curProduct.seller);
    const curSeller = await Seller.findById(request.user._id);

    if (seller._id.toString() !== curSeller._id.toString()) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse the form data
    const formData = await request.formData();

    // Initialize an update object
    const updateData = {};

    // Check and add fields to update object if they are provided
    const name = formData.get('name');
    if (name) updateData.name = name;

    const description = formData.get('description');
    if (description) updateData.description = description;

    const brand = formData.get('brand');
    if (brand) updateData.brand = brand;

    const material = formData.get('material');
    if (material) updateData.material = material;

    const color = formData.get('color');
    if (color) updateData.color = color;

    const sizes = formData.get('sizes');
    if (sizes) updateData.sizes = JSON.parse(sizes);

    const price = formData.get('price');
    if (price) updateData.price = Number(price);

    const category = formData.get('category');
    if (category) updateData.category = category;

    const stockQuantity = formData.get('stockQuantity');
    if (stockQuantity) updateData.stockQuantity = Number(stockQuantity);

    const ImageData = formData.getAll('shoeImages');
    const shoeImages = []
    async function saveImages() {
        // check if brand dir exists
        const product = await Product.findById(id);
        const brand = product.brand
        const brandDir = `./public/${brand}`;
        if (!fs.existsSync(brandDir)) {
            fs.mkdirSync(brandDir);
        }
    
        for (const Image of ImageData) {
            const filePath = `./public/${brand}/${Image.name}`;
            try {
                await pump(Image.stream(), fs.createWriteStream(filePath));
                shoeImages.push(`http://localhost:3000/${Image.name}`);
            } catch (error) {
                console.error(`Error saving ${Image.name}:`, error);
            }
        }
        }
    
    await saveImages();
    

    // Update the product
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!product) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated successfully", product }, { status: 200 });
}


// api/product/:id (DELETE)
export async function DELETE(request,context) {
    const isAuthenticated =  await sellerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }

    const { id } = context.params;

    const curProduct = await Product.findById(id);
    console.log(curProduct);
    const seller = await Seller.findById(curProduct.seller);
    const curSeller = await Seller.findById(request.user._id);

    if (seller._id.toString() !== curSeller._id.toString()) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await curProduct.deleteOne();

    if (!curProduct) {
        return NextResponse.json({message: "Product not found"}, { status: 404 });
    }

    // delete images
    const brand = curProduct.brand
    const brandDir = `./public/${brand}`;
    if (fs.existsSync(brandDir)) {
        fs.rmSync(brandDir, { recursive: true });
    }


    return NextResponse.json({message: "Product deleted successfully"}, { status: 200 });
}