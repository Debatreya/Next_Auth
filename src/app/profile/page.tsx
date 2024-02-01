"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter()
    const logout = async () => {
        try{
            await axios.get('/api/users/logout')
            toast.success("Logout successful")
            router.push('/login')
        }catch(e : any){
            toast.error(e.message);
        }
    }
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        router.push(`/profile/${res.data.username}`)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Profile</h1>
            <hr />
            <p>Profile page</p>
            <button
                onClick={getUserDetails}
                className="bg-yellow-500 mt-4 hover:bg-yellow-700 text-white font-bold py-2 px-3 rounded"
            >
                View Profile
            </button>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
            >
                Logout
            </button>
            
            <Toaster />
        </div>
    )
}