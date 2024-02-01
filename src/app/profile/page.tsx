"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/users/me');
                setUsername(res.data.username);
                setEmail(res.data.email);
            } catch (error: any) {
                toast.error(error.message);
            }
        };
        fetchData();
    }, [])
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
        try {
            router.push(`/profile/${username}`)
        }catch(e: any){
            toast.error(e.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
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