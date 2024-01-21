"use client"
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage (){
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {

    }
    return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>Login</h1>
                <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
                <div className="flex items-center justify-between">   
                    <label htmlFor="email">Email</label>
                    <input
                        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="email@example.com"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password">Password</label>
                    <input
                        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="password"
                    />
                </div>
                <button 
                    onClick={onLogin}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                    Signup Here
                </button>
                <Link href="/signup">Visit Signup page</Link>
            </div>
    )
}