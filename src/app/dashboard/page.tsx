

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import Content from "@/models/Content";
import { connectDb } from "@/lib/mongo";
import Link from "next/link";

export default async function Dashboard() {
    const cookiesStore = cookies();
    const token = (await cookiesStore).get('token')?.value;
    const user = verifyToken(token || "");

    if (!user) {
        return <div>Unauthorized</div>;
    }

    await connectDb();
    console.log(user)
    const data = await Content.find({
        userId: user.id
    });

    return (
        <div className="min-h-screen bg-white text-black p-6  ">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">📚 Your Second Brain</h1>
            <div className="w-full h-0.5 mb-4 bg-black"></div>
            {data.length === 0 ? (
                <div className="flex justify-between items-center bg-white border shadow-sm py-6 px-6 rounded-2xl">
                    <div className="text-lg text-gray-700 font-semibold">
                        You haven’t saved anything yet.
                    </div>
                    <Link href="/dashboard/add" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-500 transition">
                        + Add Content
                    </Link>
                </div>


            ) : (
                <div className="grid grid-cols-1 gap-4">
                    <div className="items-center justify-center flex">
                        <Link href="/dashboard/add" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-500 transition ">
                            + Add Content
                        </Link>
                    </div>
                    {data.map((item: any) => (
                        <div key={item._id} className="border p-4 rounded-lg shadow-sm">
                            <p className="font-bold">{item.title}</p>
                            <p className="text-sm text-gray-600">{item.link}</p>
                            <p className="text-xs mt-1 text-gray-400">{item.type}</p>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}
