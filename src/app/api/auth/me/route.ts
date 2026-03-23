import { NextResponse } from "next/server";
import { getCurrentSessionFromCookie } from "@/lib/auth";

export async function GET() {
  const { payload } = await getCurrentSessionFromCookie();
  if (!payload) {
    return NextResponse.json({ message: "未登录" }, { status: 401 });
  }
  return NextResponse.json(payload);
}
