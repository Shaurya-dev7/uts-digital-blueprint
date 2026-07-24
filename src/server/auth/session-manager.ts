import "server-only";
import { prisma } from "@/lib/prisma";

/**
 * UTS Session Manager
 *
 * Extended session management beyond what Better Auth provides.
 * Handles device tracking, session listing, and bulk session operations.
 */

/**
 * Parse user agent string into structured data
 */
export function parseUserAgent(userAgent: string | null | undefined): {
  browser: string;
  os: string;
  device: string;
} {
  if (!userAgent) {
    return { browser: "Unknown", os: "Unknown", device: "Unknown" };
  }

  // Browser detection
  let browser = "Unknown";
  if (userAgent.includes("Firefox/")) browser = "Firefox";
  else if (userAgent.includes("Edg/")) browser = "Microsoft Edge";
  else if (userAgent.includes("Chrome/") && !userAgent.includes("Edg/"))
    browser = "Chrome";
  else if (userAgent.includes("Safari/") && !userAgent.includes("Chrome/"))
    browser = "Safari";
  else if (userAgent.includes("Opera/") || userAgent.includes("OPR/"))
    browser = "Opera";

  // OS detection
  let os = "Unknown";
  if (userAgent.includes("Windows NT 10")) os = "Windows 10/11";
  else if (userAgent.includes("Windows")) os = "Windows";
  else if (userAgent.includes("Mac OS X")) os = "macOS";
  else if (userAgent.includes("Linux")) os = "Linux";
  else if (userAgent.includes("Android")) os = "Android";
  else if (userAgent.includes("iPhone") || userAgent.includes("iPad"))
    os = "iOS";

  // Device type detection
  let device = "Desktop";
  if (
    userAgent.includes("Mobile") ||
    userAgent.includes("Android") ||
    userAgent.includes("iPhone")
  )
    device = "Mobile";
  else if (userAgent.includes("iPad") || userAgent.includes("Tablet"))
    device = "Tablet";

  return { browser, os, device };
}

/**
 * Get all active sessions for a user with parsed device info
 */
export async function getUserSessions(userId: string) {
  const sessions = await prisma.session.findMany({
    where: {
      userId,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  return sessions.map((session) => {
    const { browser, os, device } = parseUserAgent(session.userAgent);
    return {
      id: session.id,
      token: session.token,
      ipAddress: session.ipAddress,
      browser,
      os,
      device,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
    };
  });
}

/**
 * Revoke a specific session
 */
export async function revokeSession(sessionId: string) {
  return prisma.session.delete({
    where: { id: sessionId },
  });
}

/**
 * Revoke all sessions for a user except the current one
 */
export async function revokeAllOtherSessions(
  userId: string,
  currentSessionToken: string
) {
  return prisma.session.deleteMany({
    where: {
      userId,
      token: { not: currentSessionToken },
    },
  });
}

/**
 * Revoke ALL sessions for a user (used by admin)
 */
export async function revokeAllUserSessions(userId: string) {
  return prisma.session.deleteMany({
    where: { userId },
  });
}

/**
 * Record a login attempt in login history
 */
export async function recordLoginHistory(data: {
  userId: string;
  ipAddress?: string;
  userAgent?: string;
  status: "success" | "failed" | "locked" | "blocked";
}) {
  const { browser, os, device } = parseUserAgent(data.userAgent);

  return prisma.loginHistory.create({
    data: {
      userId: data.userId,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      browser,
      os,
      device,
      status: data.status,
    },
  });
}

/**
 * Get login history for a user
 */
export async function getUserLoginHistory(
  userId: string,
  limit: number = 20
) {
  return prisma.loginHistory.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/**
 * Count failed login attempts within a time window
 */
export async function countRecentFailedLogins(
  userId: string,
  windowMinutes: number = 15
): Promise<number> {
  const since = new Date(Date.now() - windowMinutes * 60 * 1000);

  return prisma.loginHistory.count({
    where: {
      userId,
      status: "failed",
      createdAt: { gte: since },
    },
  });
}
