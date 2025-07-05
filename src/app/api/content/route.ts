import { verifyToken } from "@/lib/auth";
import { connectDb } from "@/lib/mongo";
import Content from "@/models/Content";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  const user = verifyToken(token || "");

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDb();
  const body = await req.json();

  const newContent = await Content.create({
    title: body.title,
    link: body.link,
    type: body.type,
    userId: user.id,
  });

  return NextResponse.json({ message: "Content saved", content: newContent });
}
