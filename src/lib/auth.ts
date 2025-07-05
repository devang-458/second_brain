import jwt from "jsonwebtoken";

export const verifyToken = (token: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "string") return null;
    return decoded;
  } catch {
    throw new Error("Invalid or expired token");
  }
};
