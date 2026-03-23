import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ message: "Not allowed" }, { status: 403 });
  }

  const adminPassword = await bcrypt.hash("Admin123456", 10);
  const managerPassword = await bcrypt.hash("Manager123456", 10);
  const annotatorPassword = await bcrypt.hash("Annotator123456", 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {
      password: adminPassword,
      role: "ADMIN",
      email: "admin@example.com",
    },
    create: {
      username: "admin",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { username: "manager" },
    update: {
      password: managerPassword,
      role: "MANAGER",
      email: "manager@example.com",
    },
    create: {
      username: "manager",
      email: "manager@example.com",
      password: managerPassword,
      role: "MANAGER",
    },
  });

  await prisma.user.upsert({
    where: { username: "annotator" },
    update: {
      password: annotatorPassword,
      role: "ANNOTATOR",
      email: "annotator@example.com",
    },
    create: {
      username: "annotator",
      email: "annotator@example.com",
      password: annotatorPassword,
      role: "ANNOTATOR",
    },
  });

  return NextResponse.json({
    ok: true,
    accounts: [
      { username: "admin", password: "Admin123456", role: "ADMIN" },
      {
        username: "manager",
        password: "Manager123456",
        role: "MANAGER",
      },
      {
        username: "annotator",
        password: "Annotator123456",
        role: "ANNOTATOR",
      },
    ],
  });
}
