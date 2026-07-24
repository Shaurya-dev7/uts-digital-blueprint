"use server";

import { requirePermission } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/server/auth/audit";
import { revokeAllUserSessions } from "@/server/auth/session-manager";
import { revalidatePath } from "next/cache";

export async function suspendUserAction(targetUserId: string, reason: string) {
  try {
    const adminUser = await requirePermission("users:manage");

    // Prevent suspending yourself
    if (adminUser.id === targetUserId) {
      return { success: false, error: "You cannot suspend your own account." };
    }

    // Check if target is super_admin (cannot be suspended)
    const target = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (target?.role === "super_admin") {
      return { success: false, error: "Super administrators cannot be suspended." };
    }

    await prisma.$transaction(async (tx) => {
      // 1. Mark user as banned in Better Auth core table
      await tx.user.update({
        where: { id: targetUserId },
        data: { 
          banned: true,
          banReason: reason,
        },
      });

      // 2. Mark profile status
      await tx.profile.upsert({
        where: { userId: targetUserId },
        create: { userId: targetUserId, status: "suspended" },
        update: { status: "suspended" },
      });

      // 3. Revoke all active sessions immediately
      await revokeAllUserSessions(targetUserId);

      // 4. Log audit event
      await createAuditLog({
        userId: adminUser.id, // Admin who did it
        action: "account_suspend",
        resource: "user",
        resourceId: targetUserId,
        details: { reason }
      });
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User account has been suspended." };

  } catch (error) {
    console.error("[ADMIN_SUSPEND_ERROR]", error);
    return { success: false, error: "Failed to suspend user account." };
  }
}

export async function activateUserAction(targetUserId: string) {
  try {
    const adminUser = await requirePermission("users:manage");

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: targetUserId },
        data: { 
          banned: false,
          banReason: null,
          banExpires: null,
        },
      });

      await tx.profile.upsert({
        where: { userId: targetUserId },
        create: { userId: targetUserId, status: "active" },
        update: { status: "active" },
      });

      await createAuditLog({
        userId: adminUser.id,
        action: "account_activate",
        resource: "user",
        resourceId: targetUserId,
      });
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User account has been activated." };

  } catch (error) {
    console.error("[ADMIN_ACTIVATE_ERROR]", error);
    return { success: false, error: "Failed to activate user account." };
  }
}

export async function assignRoleAction(targetUserId: string, newRole: string) {
  try {
    const adminUser = await requirePermission("roles:manage");

    // Prevent changing your own role
    if (adminUser.id === targetUserId) {
      return { success: false, error: "You cannot change your own role." };
    }

    const target = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!target) return { success: false, error: "User not found." };
    
    // Only super_admin can assign super_admin
    if (newRole === "super_admin" && adminUser.role !== "super_admin") {
      return { success: false, error: "Only Super Administrators can grant Super Administrator role." };
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: targetUserId },
        data: { role: newRole },
      });

      // Revoke sessions to force new permission resolution on next login
      await revokeAllUserSessions(targetUserId);

      await createAuditLog({
        userId: adminUser.id,
        action: "role_change",
        resource: "user",
        resourceId: targetUserId,
        details: { oldRole: target.role, newRole }
      });
    });

    revalidatePath("/admin/users");
    return { success: true, message: `Role updated to ${newRole}. User must log in again.` };

  } catch (error) {
    console.error("[ADMIN_ROLE_ERROR]", error);
    return { success: false, error: "Failed to assign role." };
  }
}
