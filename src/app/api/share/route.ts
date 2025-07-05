import { verifyToken } from "@/lib/auth";
import { connectDb } from "@/lib/mongo";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import Link from "@/models/Link";

export async function POST() {
  await connectDb();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = verifyToken(token || "");

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const hash = crypto.randomUUID();
  const link = await Link.create({ hash, userId: user.id });
}
