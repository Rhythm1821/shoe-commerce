import { NextResponse } from "next/server";

// api/users/logout (POST)
export async function POST(request) {
    try {
        const response = NextResponse.json({message: "Logout successful"}, { status: 200 });
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;

    } catch (error) {
        return NextResponse.json({error: error.message}, { status: 500 });
    }
}