import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User.model";
import { generateTokenAndSetCookies } from "@/utils/utils";

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, email, password } = body;

        if (!username || !email || !password) {
            return NextResponse.json({message: "Missing username, email or password"}, { status: 400 });
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
        const response = await generateTokenAndSetCookies(newUser, 201, "User created successfully");        

        return response;
    }

    catch (error) {
        return NextResponse.json({error: error.message}, { status: 500 });
    }
}