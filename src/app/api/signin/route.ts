import { connectDb } from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await connectDb();

  const { username, password } = await req.json();

  const user = await User.findOne({ username });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    return NextResponse.json({ error: "Invaild password" }, { status: 401 });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECERT is not defined");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const response = NextResponse.json({
    message: "Login Successful",
    token,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return response;
}
