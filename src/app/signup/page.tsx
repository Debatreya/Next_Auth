"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage (){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    }, [user])
    const onSignup = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data);
            router.push("/login");
        }catch(error : any){
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-3xl">{loading ? "Loading" : "Signup"}</h1>
                <div className="w-[340px] h-1 mb-3 mt-2 bg-gray-300"></div>
                <div className="flex items-center justify-between mb-4 w-[320px]">
                    <label htmlFor="username">Username</label>
                    <input
                        className="p-2 text-slate-800 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        placeholder="username"
                    />
                </div>
                <div className="flex items-center justify-between mb-4 w-[320px]">   
                    <label htmlFor="email">Email</label>
                    <input
                        className="p-2 text-slate-800 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="email@example.com"
                    />
                </div>
                <div className="flex items-center justify-between w-[320px] mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                        className="p-2 text-slate-800 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="password"
                    />
                </div>
                <button 
                    disabled={buttonDisabled}
                    onClick={onSignup}
                    className="p-2 border text-yellow-500 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                    Signup Here
                </button>
                <Link href="/login">Visit login page</Link>
                <Toaster />
            </div>
    )
}