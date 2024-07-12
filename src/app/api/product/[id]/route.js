import dbConnect from "@/lib/dbConnect";
import { sellerAuth } from "@/middlewares/auth";
import { Product } from "@/models/Product.model";
import { NextResponse } from "next/server";
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
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

export async function PUT(request,context) {
    const isAuthenticated = await sellerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = context.params;

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

// api/product/:id (PUT)
// export async function PUT(request) {
//     const isAuthenticated = await sellerAuth(request);

//     if (!isAuthenticated) {
//         return NextResponse.json({message: "Unauthorized"}, { status: 401 })
//     }

//     const { id } = request.params;
//     const FormData = await request.formData();
//     const name = FormData.get('name')
//     const description = FormData.get('description')
//     const brand = FormData.get('brand')
//     const material = FormData.get('material')
//     const color = FormData.get('color')
//     const sizes =  JSON.parse(FormData.get('sizes'))
//     const price = Number(FormData.get('price'))
//     const category = FormData.get('category')
//     const stockQuantity = Number(FormData.get('stockQuantity'))

//     const ImageData = FormData.getAll('shoeImages')
//     const shoeImages = []
//     for (let i = 0; i < ImageData.length; i++) {
//         shoeImages.push(ImageData[i].value)
//     }

//     const product = await Product.findByIdAndUpdate(id, {
//         name,
//         description,
//         brand,
//         material,
//         color,
//         sizes,
//         price,
//         category,
//         stockQuantity,
//         shoeImages
//     }, {new: true});
    
//     return NextResponse.json({message: "Product updated successfully"}, { status: 200, product });
// }

// api/product/:id (DELETE)
export async function DELETE(request) {
    const isAuthenticated =  await sellerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }
    return NextResponse.json({message: "Product deleted successfully"}, { status: 204 });
}