import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    // Get cookies
    const cookieStore = cookies()
    const hasAccessToken = cookieStore.has('accessToken')
    const hasRefreshToken = cookieStore.has('refreshToken')
    const type = cookieStore.get('type')
    
    // Check if user is authenticated
    const isAuthenticated = hasAccessToken && hasRefreshToken ? true : false;
   
    return NextResponse.json({isAuthenticated, type});
}