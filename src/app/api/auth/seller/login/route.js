import {Seller} from "@/models/User.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { generateTokenAndSetCookies } from "@/utils/utils";
import dbConnect from "@/lib/dbConnect";


dbConnect();
console.log("Connected to MongoDB");

// POST /api/auth/login
export async function POST(request) {
    try {
        const body = await request.json();
    
        const { email, password } = body;
    
        if (!email || !password) {
            return new NextResponse.json({message: "Missing email or password"}, { status: 400 });
        }
    
        const seller = await Seller.findOne({email})
    
        if (!seller) {
            return NextResponse.json({error: "Account not found"}, { status: 404 });
        }
    
        const validPassword = await bcrypt.compare(password, seller.password);
    
        if (!validPassword) {
            return NextResponse.json({error: "Invalid password"}, { status: 401 });
        }
    
        const response = await generateTokenAndSetCookies(seller);
    
        return response;
    } catch (error) {
        return NextResponse.json({error: error.message}, { status: 500 });
    }

}