import { Seller } from "@/models/User.model";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import dbConnect from "@/lib/dbConnect";
import { generateTokenAndSetCookies } from "@/utils/utils";
import bcrypt from "bcrypt";


dotenv.config();
dbConnect();
console.log("Connected to MongoDB");


// api/auth/seller/register
export async function POST(request) {
    const body = await request.json();
    const { username, email, password, confirmPassword, companyName, contactInfo } = body;

    if (!username || !email || !password || !confirmPassword || !companyName || !contactInfo) {
        return NextResponse.json({message: "Fill all fields"}, { status: 400 });
    }

    if (password!==confirmPassword) {
        return NextResponse.json({message: "Passwords do not match"}, { status: 400 });
    }

    const existingSeller = await Seller.findOne({email})

    if (existingSeller) {
        return NextResponse.json({message: "Email already exists"}, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
        username,
        email,
        password: hashedPassword,
        companyName,
        contactInfo
    })

    await newSeller.save()

    // login user
    const response = await generateTokenAndSetCookies(newSeller, 201, "Seller Registered successfully");
    
    return response
}