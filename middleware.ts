import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/overview", "/devices", "/annotation", "/people"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needAuth = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!needAuth) {
    return NextResponse.next();
  }

  const sessId = req.cookies.get("sess_id")?.value;
  if (!sessId) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/overview/:path*",
    "/devices/:path*",
    "/annotation/:path*",
    "/people/:path*",
  ],
};
