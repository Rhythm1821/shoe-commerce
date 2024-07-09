import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const response = NextResponse.json({message: "Logout successful"}, { status: 200 });
        response.cookies.delete("token");
        return response;

    } catch (error) {
        return NextResponse.json({error: error.message}, { status: 500 });
    }
}