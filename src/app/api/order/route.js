import dbConnect from "@/lib/dbConnect";
import { buyerAuth } from "@/middlewares/auth";
import { Order } from "@/models/Orders.model";
import { NextResponse } from "next/server";

dbConnect();

// api/order (GET)
export async function GET(request) {

    const isAuthenticated = await buyerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }
    try {
        const orders = await Order.find({buyer: request.user._id});
        return NextResponse.json({orders}, { status: 200 });
    } catch (error) {
        return NextResponse.json({error: error.message}, { status: 500 });
    }
}

// api/order (POST)
export async function POST(request) {

    const isAuthenticated = await buyerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }
    try {
        const body = await request.json();
        const { orderItems, payment } = body;
        
        if (!orderItems || !payment) {
            return NextResponse.json({message: "Missing order items or payment"}, { status: 400 });
        }
        const order = new Order({
            buyer: request.user._id,
            orderItems,
            status: 'pending',
            payment
        });
        await order.save();
        return NextResponse.json({message: "Order created successfully"}, { status: 201 });
    } catch (error) {
        return NextResponse.json({error: error.message}, { status: 500 });
    }
}
