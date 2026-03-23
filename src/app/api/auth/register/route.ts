import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  username: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(6).max(64),
  role: z.enum(["ADMIN", "MANAGER", "ANNOTATOR"]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "参数不合法" }, { status: 400 });
    }

    const existed = await prisma.user.findUnique({
      where: { username: parsed.data.username },
    });

    if (existed) {
      return NextResponse.json({ message: "用户名已存在" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

    await prisma.user.create({
      data: {
        username: parsed.data.username,
        password: hashedPassword,
        role: parsed.data.role,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "注册成功，请登录",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "注册失败" }, { status: 500 });
  }
}
