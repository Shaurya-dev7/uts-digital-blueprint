import "server-only";
import { prisma } from "@/lib/prisma";

/**
 * UTS Audit Logger
 *
 * Append-only audit trail. Audit logs are NEVER deleted.
 * Tracks all security-relevant events across the platform.
 */

export type AuditAction =
  | "login"
  | "login_failed"
  | "logout"
  | "signup"
  | "password_change"
  | "password_reset_request"
  | "password_reset_complete"
  | "profile_update"
  | "role_change"
  | "permission_change"
  | "account_lock"
  | "account_unlock"
  | "account_suspend"
  | "account_activate"
  | "account_deactivate"
  | "session_revoke"
  | "session_revoke_all"
  | "email_verification"
  | "admin_action"
  | "user_create"
  | "user_delete"
  | "settings_update";

interface AuditLogEntry {
  userId?: string | null;
  action: AuditAction;
  resource?: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  status?: "success" | "failure";
}

/**
 * Create an audit log entry
 */
export async function createAuditLog(entry: AuditLogEntry) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: entry.userId,
        action: entry.action,
        resource: entry.resource,
        resourceId: entry.resourceId,
        details: entry.details ? JSON.stringify(entry.details) : null,
        ipAddress: entry.ipAddress,
        userAgent: entry.userAgent,
        status: entry.status || "success",
      },
    });
  } catch (error) {
    // Audit logging should never break the application
    console.error("[AUDIT] Failed to create audit log:", error);
  }
}

/**
 * Get audit logs for a specific user
 */
export async function getUserAuditLogs(
  userId: string,
  options?: {
    limit?: number;
    offset?: number;
    action?: AuditAction;
  }
) {
  return prisma.auditLog.findMany({
    where: {
      userId,
      ...(options?.action ? { action: options.action } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: options?.limit || 50,
    skip: options?.offset || 0,
  });
}

/**
 * Get all audit logs (admin view)
 */
export async function getAllAuditLogs(options?: {
  limit?: number;
  offset?: number;
  action?: AuditAction;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  return prisma.auditLog.findMany({
    where: {
      ...(options?.action ? { action: options.action } : {}),
      ...(options?.userId ? { userId: options.userId } : {}),
      ...(options?.startDate || options?.endDate
        ? {
            createdAt: {
              ...(options?.startDate ? { gte: options.startDate } : {}),
              ...(options?.endDate ? { lte: options.endDate } : {}),
            },
          }
        : {}),
    },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: options?.limit || 50,
    skip: options?.offset || 0,
  });
}

/**
 * Count audit logs (for pagination)
 */
export async function countAuditLogs(options?: {
  action?: AuditAction;
  userId?: string;
}) {
  return prisma.auditLog.count({
    where: {
      ...(options?.action ? { action: options.action } : {}),
      ...(options?.userId ? { userId: options.userId } : {}),
    },
  });
}
