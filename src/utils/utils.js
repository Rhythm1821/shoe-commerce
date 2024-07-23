import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

async function generateAccessAndRefreshToken(user) {
    try {
        // Generate access token
        const accessToken = jwt.sign(
            { _id: user._id, username: user.username, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // Example: short-lived access token (15 minutes)
        );

        // Generate refresh token
        const refreshToken = jwt.sign(
            { _id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } // Example: long-lived refresh token (7 days)
        );

        return {accessToken, refreshToken}
    } catch (error) {
        console.error("Error generating tokens and setting cookies:", error);
        return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
    }
}

async function refreshAccessToken(user) {
    try {
        const incomingRefreshToken = user.refreshToken;
        if (!incomingRefreshToken) {
            return NextResponse.json({ message: "Refresh token not found", success: false }, { status: 401 });
        }

        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!decoded) {
            return NextResponse.json({ message: "Invalid refresh token", success: false }, { status: 401 });
        }
        
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user);
        return {accessToken, refreshToken}
    } catch (error) {
        console.error("Error generating tokens and setting cookies:", error);
        return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
    }
}


export { generateAccessAndRefreshToken, refreshAccessToken };
