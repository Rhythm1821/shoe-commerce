import dbConnect from "@/lib/dbConnect";
import { buyerAuth } from "@/middlewares/auth";
import Payment from "@/models/Payment.model";
import { NextResponse } from "next/server";

dbConnect();

// api/payment (POST)
export async function POST(request) {

    const isAuthenticated = await buyerAuth(request);

    if (!isAuthenticated) {
        return NextResponse.json({message: "Unauthorized"}, { status: 401 })
    }
    try {
        const body = await request.json();
        const { paymentMethod, totalAmount } = body;
        // if (!paymentMethod || !totalAmount) {
        //     return NextResponse.json({message: "Missing payment method or total amount"}, { status: 400 });
        // }

        // TODO: Code for payment

        // Save payment
        const payment = new Payment({
            buyer: request.user._id,
            paymentMethod,
            totalAmount,
            status: 'done',
        });
        await payment.save();
        return NextResponse.json({message: "Payment created successfully"}, { status: 201 });
    } catch (error) {
        return NextResponse.json({error: error.message}, { status: 500 });
    }
}