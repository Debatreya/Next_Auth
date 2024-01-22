"use client"
import { useRouter } from "next/navigation"

export default function UserProfile({params}: any) {
    const router = useRouter()
    const gotoDashboard = () => {
        router.push('/profile')
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <hr />
            <p className="text-4xl">Hi 
                <span className="p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
            </p>
            <button
                onClick={gotoDashboard}
                className="bg-yellow-500 mt-4 hover:bg-yellow-700 text-white font-bold py-2 px-3 rounded"
            >
                Goto Dashboard
            </button>
        </div>
    )
}