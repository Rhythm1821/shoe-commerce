'use client'

import LoginForm from "@/components/auth/LoginForm"

// API_BASE_URL/seller/login
export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <LoginForm type={"seller"} />
        </div>
    )
}