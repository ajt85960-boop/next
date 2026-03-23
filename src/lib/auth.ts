import { cookies } from "next/headers";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { SessionPayload } from "@/types/auth";

const SESSION_COOKIE = "sess_id";
const SESSION_PREFIX = "sess:";
const SESSION_TTL_DAYS = Number(process.env.SESSION_TTL_DAYS ?? 7);
const SESSION_TTL_SECONDS = SESSION_TTL_DAYS * 24 * 60 * 60;

function sessionKey(sessionId: string) {
  return `${SESSION_PREFIX}${sessionId}`;
}

export async function createSession(userId: string) {
  const sessionId = uuidv4();
  const expiresAt = dayjs().add(SESSION_TTL_DAYS, "day").toDate();

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }
  const payload: SessionPayload = {
    userId: user.id,
    role: user.role,
  };

  await prisma.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      expiresAt,
    },
  });

  await redis.set(
    sessionKey(sessionId),
    JSON.stringify(payload),
    "EX",
    SESSION_TTL_SECONDS,
  );

  return { sessionId, payload, expiresAt };
}

export async function getSessionPayload(
  sessionId: string | undefined,
): Promise<SessionPayload | null> {
  if (!sessionId) return null;

  const cached = await redis.get(sessionKey(sessionId));
  if (cached) return JSON.parse(cached) as SessionPayload;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => null);
    return null;
  }
  const payload: SessionPayload = {
    userId: session.user.id,
    role: session.user.role,
  };

  await redis.set(
    sessionKey(sessionId),
    JSON.stringify(payload),
    "EX",
    SESSION_TTL_SECONDS,
  );

  return payload;
}

export async function destroySession(sessionId: string | undefined) {
  if (!sessionId) return;
  await redis.del(sessionKey(sessionId));
  await prisma.session.delete({ where: { id: sessionId } }).catch(() => null);
}

export async function getCurrentSessionFromCookie() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  const payload = await getSessionPayload(sessionId);
  return { sessionId, payload };
}

export const sessionCookieName = SESSION_COOKIE;
export const sessionTtlDays = SESSION_TTL_DAYS;
