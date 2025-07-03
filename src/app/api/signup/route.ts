import { connectDb } from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  await connectDb();

  const { username, password } = await req.json();

  const userExists = await User.findOne({ username });
  if (userExists) {
    return NextResponse.json({ error: "User alredy exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, password: hashed });

  return NextResponse.json(
    { message: "User Created", user: newUser },
    { status: 201 }
  );
}
