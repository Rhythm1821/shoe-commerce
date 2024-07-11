import { Seller } from "@/models/User.model";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import dbConnect from "@/lib/dbConnect";
import { generateAccessAndRefreshToken } from "@/utils/utils";
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

    const existingCompany = await Seller.findOne({companyName})

    if (existingCompany) {
        return NextResponse.json({message: "Company name already exists, try a different one"}, { status: 409 });
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

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(newSeller)

    newSeller.refreshToken = refreshToken;
    await newSeller.save({ validateBeforeSave: false });

    // Set cookies
    const response = NextResponse.json({
        message: "Registered successfully",
        success: true,
    }, { status: 201 });

    response.cookies.set("accessToken", accessToken, { httpOnly: true });
    response.cookies.set("refreshToken", refreshToken, { httpOnly: true });

    
    return response
}