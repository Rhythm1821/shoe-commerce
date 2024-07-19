import { Seller } from "@/models/User.model";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import dbConnect from "@/lib/dbConnect";
import { generateAccessAndRefreshToken } from "@/utils/utils";
import bcrypt from "bcrypt";


dotenv.config();
dbConnect();
console.log("Connected to MongoDB");


// api/users/seller/register
export async function POST(request) {
    console.log("Reached seller registration endpoint");
    try {
        const body = await request.json();
        const { username, email, password, confirmPassword, companyName, contactInfo } = body;
        console.log("Checking if all fields are filled");
        if (!username || !email || !password || !confirmPassword || !companyName || !contactInfo) {
            return NextResponse.json({message: "Fill all fields"}, { status: 400 });
        }

        console.log("Checking if passwords match");
    
        if (password!==confirmPassword) {
            return NextResponse.json({message: "Passwords do not match"}, { status: 400 });
        }

        console.log("Checking if seller with email already exists");
        const existingSeller = await Seller.findOne({email})
    
        if (existingSeller) {
            return NextResponse.json({message: "Email already exists"}, { status: 409 });
        }
        
        console.log("Checking if company name already exists");
        const existingCompany = await Seller.findOne({companyName})
        console.log("existingCompany", existingCompany);
    
        if (existingCompany) {
            console.log("Company name already exists, try a different one");
            return NextResponse.json({message: "Company name already exists, try a different one"}, { status: 409 });
        }
        
        console.log("Hashing password");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Creating new seller");
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
        const response = NextResponse.json({message: "Registered successfully"}, { status: 201 });
    
        response.cookies.set("accessToken", accessToken, { httpOnly: true });
        response.cookies.set("refreshToken", refreshToken, { httpOnly: true });
        response.cookies.set("type", "seller", { httpOnly: true });
    
        return response
    } catch (error) {
        console.log("Failed to register seller", error);
        return NextResponse.json({message: error.message}, { status: 500 });
    }
}