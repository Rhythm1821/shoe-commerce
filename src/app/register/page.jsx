"use client"
import RegisterForm from "../../components/auth/RegisterForm";

// API_BASE_URL/register
export default function Register() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <RegisterForm type={"buyer"} />
        </div>
    )
}