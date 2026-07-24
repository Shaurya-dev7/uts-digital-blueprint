import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { roleHasPermission, roleHasAnyPermission } from "@/server/auth/permissions";

/**
 * Data Access Layer (DAL) for Authentication
 * Use these functions in server components and server actions to verify access.
 */

export async function verifySession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Check if user is banned
  if (session.user.banned) {
    redirect("/login?error=account_banned");
  }

  return { isAuth: true, user: session.user, session: session.session };
}

export async function getUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user ?? null;
}

export async function requireRole(allowedRoles: string[]) {
  const { user } = await verifySession();
  
  // Super admin always has access
  if (user.role === "super_admin") return user;
  
  if (!allowedRoles.includes(user.role)) {
    redirect("/dashboard"); // Redirect to safe default
  }
  
  return user;
}

export async function requirePermission(permission: string) {
  const { user } = await verifySession();
  
  if (!roleHasPermission(user.role, permission)) {
    redirect("/dashboard");
  }
  
  return user;
}

export async function requireAnyPermission(permissions: string[]) {
  const { user } = await verifySession();
  
  if (!roleHasAnyPermission(user.role, permissions)) {
    redirect("/dashboard");
  }
  
  return user;
}
