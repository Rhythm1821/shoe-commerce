import {User} from "@/models/User.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { generateAccessAndRefreshToken } from "@/utils/utils";
import dbConnect from "@/lib/dbConnect";


dbConnect();
console.log("Connected to MongoDB");

// POST /api/users/buyer/login
export async function POST(request) {
    try {
        const body = await request.json();    
        const { email, password } = body;
    
        if (!email || !password) {
            return new NextResponse.json({message: "Missing email or password"}, { status: 400 });
        }
    
        const user = await User.findOne({email})
    
        if (!user) {
            return NextResponse.json({error: "User not found"}, { status: 404 });
        }
    
        const validPassword = await bcrypt.compare(password, user.password);
    
        if (!validPassword) {
            return NextResponse.json({error: "Invalid password"}, { status: 401 });
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // Set cookies
        const response = NextResponse.json({message: "Login successful"}, { status: 200 });

        response.cookies.set("accessToken", accessToken, { httpOnly: true });
        response.cookies.set("refreshToken", refreshToken, { httpOnly: true });
        
        return response
    } catch (error) {
        return NextResponse.json({error: error.message}, { status: 500 });
    }

}