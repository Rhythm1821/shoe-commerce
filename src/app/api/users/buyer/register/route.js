import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/models/User.model";
import { generateAccessAndRefreshToken } from "@/utils/utils";
import dbConnect from "@/lib/dbConnect";

dbConnect();
console.log("Connected to MongoDB");


// POST /api/users/register
export async function POST(request) {
    try {
        const body = await request.json();
        const { username, email, password, confirmPassword } = body;

        if (!username || !email || !password) {
            return NextResponse.json({message: "Missing username, email or password"}, { status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({message: "Passwords do not match"}, { status: 400 });
        }

        // check if email already exists
        const existingUser = await User.findOne({email: email});

        if (existingUser) {
            return NextResponse.json({message: "Email already exists"}, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        }); 

        await newUser.save();

        // login user
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(newUser);

        newUser.refreshToken = refreshToken;
        await newUser.save({ validateBeforeSave: false });

        // Set cookies
        const response = NextResponse.json({message: "Registered successfully"}, { status: 201 });

        response.cookies.set("accessToken", accessToken, { httpOnly: true });
        response.cookies.set("refreshToken", refreshToken, { httpOnly: true });
        response.cookies.set("type", "buyer", { httpOnly: true });
        
        return response
    }

    catch (error) {
        return NextResponse.json({error: error.message}, { status: 500 });
    }
}