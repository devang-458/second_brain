"use client"

import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get("/api/protected");
                setIsLoggedIn(true);
            } catch {
                setIsLoggedIn(false);
            }
        }
        checkAuth();
    }, [pathname])

    const handleLogout = async () => {
        await axios.post("/api/logout");
        setIsLoggedIn(false);
        router.push("/signin")
    }
    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link href={"/"} className="text-2xl font-bold text-blue-900">
                SecondBrain 🧠
            </Link>
            <div className="space-x-4">
                <Link href={"/dashboard"} className=" text-gray-800 hover:text-gray-500" >
                    Dashboard
                </Link>
                <Link href={"/shared/testhash"} className="text-gray-800 hover:text-gray-500 ">
                    Shared
                </Link>
            </div>
            {isLoggedIn ? (
                <button
                    onClick={handleLogout}
                    className="px-4 py-1 bg-red-500 rounded hover:bg-red-400"
                >
                    Logout
                </button>
            ) : (
                <Link href={"/signin"} className="px-4 py-1 bg-blue-600 rounded text-white hover:bg-blue-500">
                    Signin
                </Link>
            )
            }
        </nav >
    )
}