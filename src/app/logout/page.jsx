'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {  fetchLogout } from "@/utils/api-client";

export default function Logout() {
    const router = useRouter()

    useEffect(() => {
        const logout = () => {
            fetchLogout()
            router.push('/')
        }
        logout()
    }, [router])
    
    return 
}