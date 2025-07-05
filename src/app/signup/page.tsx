"use client"

import { InputBox } from "@/components/InputBox";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SignUp() {
    const [form, setForm] = useState({ username: "", password: "" });
    const router = useRouter();

    const handleSumbit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post("/api/signup", form);
            router.push("/signin");
        } catch {
            alert("SignIn failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSumbit} className="bg-gra-400 bg-gray-300 w-96 p-6 rounded-lg ">
                <h1 className="text-2xl text-black font-bold mb-4">
                    SignUp
                </h1>
                <InputBox
                    placeholder="Username"
                    type="text"
                    value={form.username}
                    className="border"
                    onChange={(e) => setForm({ ...form, username: e.target.value })} />
                <InputBox
                    placeholder="Password"
                    type="text"
                    value={form.password}
                    className="border"
                    onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="submit" className="w-full mb-4 bg-black text-white py-2 rounded">
                    SignUp
                </button>

                <button
                    type="button"
                    onClick={() => router.push("/signin")}
                    className="w-full bg-black text-white py-2 rounded"
                >
                    Go to Sign In
                </button>
            </form>
        </div>
    )
}