'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {  fetchLogout } from "@/utils/api-client";
import { toast } from "react-hot-toast";

export default function Logout() {
    const router = useRouter()

    useEffect(() => {
        const logout = () => {
            fetchLogout()
            toast.success("Logged out successfully")
            router.push('/')
        }
        logout()
    }, [router])
    
    return 
}