import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
export default function auth(req, res, next) {
    console.log('req.cookies', req.cookies);
    const cookieStore = cookies(req);
    const accessToken = cookieStore.get('accessToken')?.value;
    console.log('accessToken', accessToken);
    // const refreshToken = req.cookies.refreshToken;

    if (accessToken) {
        try {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            return true
        } catch (error) {
            return false
        }
    }

    return false
}

export const config = {
    matcher: ['/api/products/:path*'],
}