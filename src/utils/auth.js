import dbConnect from "@/lib/dbConnect";
import { Seller, User } from "@/models/User.model";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

dbConnect();

export async function buyerAuth(req) {
    const cookieStore = cookies(req);

    // check user type
    const type = cookieStore.get('type')?.value;

    if (type!=="buyer") {
        return false
    }
    const accessToken = cookieStore.get('accessToken')?.value;

    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded._id);
            if (!user) {
                return false
            }
            req.user = decoded
            return true
        } catch (error) {
            return false
        }
    }

    return false
}

export async function sellerAuth(req) {
    const cookieStore = cookies(req);

    // check user type
    const type = cookieStore.get('type')?.value;

    if (type!=="seller") {
        return false
    }
    const accessToken = cookieStore.get('accessToken')?.value;
    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const seller = await Seller.findById(decoded._id);
            if (!seller) {
                return false
            }
            req.user = decoded
            return true
        } catch (error) {
            return false
        }
    }
}
