"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddContentForm({ onSuccess }: { onSuccess?: () => void }) {
    const [form, setForm] = useState({ title: "", link: "", type: "" });
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post("/api/content", form);
            setForm({ title: "", link: "", type: "" });
            router.refresh();
        } catch {
            alert("Failed to add content");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl text-black font-semibold mb-4">Add New Content</h2>

            <input
                className="w-full border text-black px-3 py-2 mb-3 rounded"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
            />

            <input
                className="w-full border text-black px-3 py-2 mb-3 rounded"
                placeholder="Link"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                required
            />

            <select className="w-full border px-3 py-2 text-black mb-4 rounded"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
                <option value="">Select type</option>
                <option value="text">Text</option>
                <option value="link">Link</option>
                <option value="note">Note</option>
            </select>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition">
                Save Content
            </button>
        </form>
    );
}
