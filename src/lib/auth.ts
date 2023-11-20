import { jwtVerify } from "jose";
import bcrypt from "bcrypt"
import prisma from "@/db/db";
import { cookies } from "next/headers";
import { getUserById } from "@/db/user";

export function getJwtSecretKey() {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }
  return new TextEncoder().encode(secret);
}

export function getCryptKey() {
  const secret = process.env.CRYPT_KEY;
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }
  return secret;
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10).then((hash) => hash);
}

export async function compare(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email: email }, select: { password: true } });
  if (user)
    return bcrypt.compare(password, user.password).then((res) => res);
  return false;
}

export async function getAuth() {
  const token = cookies().get("token");
  
  if (!token)
    return null;
  const res = await jwtVerify(token.value, getJwtSecretKey());
  return await getUserById(Number(res.payload.id));
}