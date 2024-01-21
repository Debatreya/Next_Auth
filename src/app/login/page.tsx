"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage (){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const onLogin = async () => {
        try{
            setIsLoading(true);
            const res = await axios.post("/api/users/login", user);
            console.log(res);
            router.push("/profile")
        }catch(e : any){
            console.log("Login failed", e.message);
            
            toast.error(e.message)
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user])
    return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-3xl">{isLoading ? "Loading" : "Login"}</h1>
                <div className="w-[340px] h-1 mb-3 mt-2 bg-gray-300"></div>
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
                <div className="flex items-center justify-between w-[320px] mb-5">
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
                    onClick={onLogin}
                    className="p-2 border text-yellow-500 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                    Login Here
                </button>
                <Link href="/signup">Visit Signup page</Link>
                <Toaster />
            </div>
    )
}