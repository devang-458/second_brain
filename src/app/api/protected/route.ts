import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  const user = verifyToken(token || "");

  if (!user) {
    return new Response("unauthorized", { status: 401 });
  }
  return Response.json({ message: "You are in" });
}
