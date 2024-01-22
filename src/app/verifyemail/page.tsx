"use client"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"

import Router from "next/navigation"
import { useEffect, useState } from "react"

export default function VerifyEmailPage(){
    const router = useRouter()
    const gotoLogin = () => {
        router.push('/login')
    }
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false)

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token])

    const verifyUserEmail = async () => {
        try{
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true);
        }catch(error : any){
            setError(true);
            console.log(error.response.data);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2>{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <button
                        onClick={gotoLogin}
                        className="bg-yellow-500 mt-4 hover:bg-yellow-700 text-white font-bold py-2 px-3 rounded"
                    >
                        Now Login
                    </button>
                </div>
            )}

            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-yellow-500">Error</h2>
                </div>
            )}
        </div>
    )

}