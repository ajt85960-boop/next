import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { destroySession, sessionCookieName } from "@/lib/auth";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(sessionCookieName)?.value;
  await destroySession(sessionId);

  const response = NextResponse.redirect(new URL("/login", req.url));
  response.cookies.set({
    name: sessionCookieName,
    value: "",
    path: "/",
    expires: new Date(0),
  });

  return response;
}

export async function GET(req: Request) {
  return POST(req);
}
