import auth from "@/middlewares/auth";
import { NextResponse } from "next/server";



// api/product (GET)
export async function GET(request) {
    const isAuthenticated = auth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }
    return NextResponse.json({message: "Product fetched successfully"}, { status: 200 });
}


// api/product (POST)
export async function POST(request) {
    const isAuthenticated = auth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }
    return NextResponse.json({message: "Product added successfully"}, { status: 201 });
}

export async function PUT(request) {
    const isAuthenticated = auth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }
    return NextResponse.json({message: "Product updated successfully"}, { status: 200 });
}

export async function DELETE(request) {
    const isAuthenticated = auth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }
    return NextResponse.json({message: "Product deleted successfully"}, { status: 204 });
}