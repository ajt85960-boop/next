import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession, sessionCookieName, sessionTtlDays } from "@/lib/auth";

const loginSchema = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "参数不合法" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username: parsed.data.username },
    });

    if (!user) {
      return NextResponse.json({ message: "账号或密码错误" }, { status: 401 });
    }

    const passOk = await bcrypt.compare(parsed.data.password, user.password);
    if (!passOk) {
      return NextResponse.json({ message: "账号或密码错误" }, { status: 401 });
    }

    const { sessionId, payload } = await createSession(user.id);

    const response = NextResponse.json({
      userId: payload.userId,
      role: payload.role,
    });

    response.cookies.set({
      name: sessionCookieName,
      value: sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: sessionTtlDays * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "登录失败" }, { status: 500 });
  }
}
