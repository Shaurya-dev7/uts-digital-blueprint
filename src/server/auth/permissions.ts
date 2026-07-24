/**
 * UTS Enterprise RBAC — Permission Definitions
 *
 * Resource-based permission system. Permissions follow the format:
 *   resource:action
 *
 * Roles are hierarchical — higher level roles inherit lower level access
 * but each role also has explicit permissions for clarity and auditability.
 */

// ============================================
// Permission Constants
// ============================================

export const PERMISSIONS = {
  DASHBOARD: {
    VIEW: "dashboard:view",
  },
  USERS: {
    VIEW: "users:view",
    CREATE: "users:create",
    UPDATE: "users:update",
    DELETE: "users:delete",
    MANAGE: "users:manage",
  },
  PRODUCTS: {
    VIEW: "products:view",
    CREATE: "products:create",
    UPDATE: "products:update",
    DELETE: "products:delete",
  },
  ORDERS: {
    VIEW: "orders:view",
    CREATE: "orders:create",
    UPDATE: "orders:update",
    DELETE: "orders:delete",
  },
  QUOTES: {
    VIEW: "quotes:view",
    CREATE: "quotes:create",
    UPDATE: "quotes:update",
    APPROVE: "quotes:approve",
    DELETE: "quotes:delete",
  },
  BLOG: {
    VIEW: "blog:view",
    CREATE: "blog:create",
    UPDATE: "blog:update",
    PUBLISH: "blog:publish",
    DELETE: "blog:delete",
  },
  ANALYTICS: {
    VIEW: "analytics:view",
    EXPORT: "analytics:export",
  },
  SETTINGS: {
    VIEW: "settings:view",
    UPDATE: "settings:update",
  },
  ROLES: {
    VIEW: "roles:view",
    MANAGE: "roles:manage",
  },
  AUDIT: {
    VIEW: "audit:view",
  },
  DOWNLOADS: {
    VIEW: "downloads:view",
    MANAGE: "downloads:manage",
  },
  NOTIFICATIONS: {
    VIEW: "notifications:view",
    MANAGE: "notifications:manage",
  },
} as const;

// Flatten all permissions into a single array for seeding
export const ALL_PERMISSIONS = Object.values(PERMISSIONS).flatMap((resource) =>
  Object.values(resource)
);

// ============================================
// Role Definitions
// ============================================

export type RoleName =
  | "guest"
  | "customer"
  | "dealer"
  | "sales_executive"
  | "manager"
  | "admin"
  | "super_admin";

export interface RoleDefinition {
  name: RoleName;
  description: string;
  level: number;
  isSystem: boolean;
  permissions: string[];
}

const P = PERMISSIONS;

export const ROLE_DEFINITIONS: Record<RoleName, RoleDefinition> = {
  guest: {
    name: "guest",
    description: "Unauthenticated visitor with public access only",
    level: 0,
    isSystem: true,
    permissions: [],
  },
  customer: {
    name: "customer",
    description: "Registered customer with basic portal access",
    level: 1,
    isSystem: true,
    permissions: [
      P.DASHBOARD.VIEW,
      P.PRODUCTS.VIEW,
      P.QUOTES.VIEW,
      P.QUOTES.CREATE,
      P.DOWNLOADS.VIEW,
      P.NOTIFICATIONS.VIEW,
    ],
  },
  dealer: {
    name: "dealer",
    description: "Authorized dealer with order and inventory access",
    level: 2,
    isSystem: true,
    permissions: [
      P.DASHBOARD.VIEW,
      P.PRODUCTS.VIEW,
      P.ORDERS.VIEW,
      P.ORDERS.CREATE,
      P.ORDERS.UPDATE,
      P.QUOTES.VIEW,
      P.QUOTES.CREATE,
      P.QUOTES.UPDATE,
      P.DOWNLOADS.VIEW,
      P.NOTIFICATIONS.VIEW,
    ],
  },
  sales_executive: {
    name: "sales_executive",
    description: "Sales team member with CRM and reporting access",
    level: 3,
    isSystem: true,
    permissions: [
      P.DASHBOARD.VIEW,
      P.PRODUCTS.VIEW,
      P.ORDERS.VIEW,
      P.ORDERS.CREATE,
      P.ORDERS.UPDATE,
      P.QUOTES.VIEW,
      P.QUOTES.CREATE,
      P.QUOTES.UPDATE,
      P.USERS.VIEW,
      P.ANALYTICS.VIEW,
      P.DOWNLOADS.VIEW,
      P.NOTIFICATIONS.VIEW,
    ],
  },
  manager: {
    name: "manager",
    description: "Department manager with approval and content privileges",
    level: 4,
    isSystem: true,
    permissions: [
      P.DASHBOARD.VIEW,
      P.PRODUCTS.VIEW,
      P.PRODUCTS.CREATE,
      P.PRODUCTS.UPDATE,
      P.ORDERS.VIEW,
      P.ORDERS.CREATE,
      P.ORDERS.UPDATE,
      P.QUOTES.VIEW,
      P.QUOTES.CREATE,
      P.QUOTES.UPDATE,
      P.QUOTES.APPROVE,
      P.USERS.VIEW,
      P.ANALYTICS.VIEW,
      P.ANALYTICS.EXPORT,
      P.BLOG.VIEW,
      P.BLOG.CREATE,
      P.BLOG.UPDATE,
      P.DOWNLOADS.VIEW,
      P.DOWNLOADS.MANAGE,
      P.NOTIFICATIONS.VIEW,
    ],
  },
  admin: {
    name: "admin",
    description: "System administrator with full management access",
    level: 5,
    isSystem: true,
    permissions: [
      P.DASHBOARD.VIEW,
      P.USERS.VIEW,
      P.USERS.CREATE,
      P.USERS.UPDATE,
      P.USERS.DELETE,
      P.USERS.MANAGE,
      P.PRODUCTS.VIEW,
      P.PRODUCTS.CREATE,
      P.PRODUCTS.UPDATE,
      P.PRODUCTS.DELETE,
      P.ORDERS.VIEW,
      P.ORDERS.CREATE,
      P.ORDERS.UPDATE,
      P.ORDERS.DELETE,
      P.QUOTES.VIEW,
      P.QUOTES.CREATE,
      P.QUOTES.UPDATE,
      P.QUOTES.APPROVE,
      P.QUOTES.DELETE,
      P.BLOG.VIEW,
      P.BLOG.CREATE,
      P.BLOG.UPDATE,
      P.BLOG.PUBLISH,
      P.BLOG.DELETE,
      P.ANALYTICS.VIEW,
      P.ANALYTICS.EXPORT,
      P.SETTINGS.VIEW,
      P.SETTINGS.UPDATE,
      P.ROLES.VIEW,
      P.AUDIT.VIEW,
      P.DOWNLOADS.VIEW,
      P.DOWNLOADS.MANAGE,
      P.NOTIFICATIONS.VIEW,
      P.NOTIFICATIONS.MANAGE,
    ],
  },
  super_admin: {
    name: "super_admin",
    description: "Super administrator with unrestricted platform access",
    level: 6,
    isSystem: true,
    permissions: ["*"], // Wildcard — access to everything
  },
};

// ============================================
// Permission Check Utilities
// ============================================

/**
 * Check if a role has a specific permission
 */
export function roleHasPermission(
  roleName: string,
  permission: string
): boolean {
  const role = ROLE_DEFINITIONS[roleName as RoleName];
  if (!role) return false;
  if (role.permissions.includes("*")) return true;
  return role.permissions.includes(permission);
}

/**
 * Check if a role has any of the given permissions
 */
export function roleHasAnyPermission(
  roleName: string,
  permissions: string[]
): boolean {
  return permissions.some((p) => roleHasPermission(roleName, p));
}

/**
 * Check if a role has all of the given permissions
 */
export function roleHasAllPermissions(
  roleName: string,
  permissions: string[]
): boolean {
  return permissions.every((p) => roleHasPermission(roleName, p));
}

/**
 * Get all permissions for a role (resolves wildcard)
 */
export function getRolePermissions(roleName: string): string[] {
  const role = ROLE_DEFINITIONS[roleName as RoleName];
  if (!role) return [];
  if (role.permissions.includes("*")) return ALL_PERMISSIONS;
  return role.permissions;
}

/**
 * Check if roleA is higher or equal level to roleB
 */
export function isRoleAtLeast(
  roleA: string,
  roleB: string
): boolean {
  const a = ROLE_DEFINITIONS[roleA as RoleName];
  const b = ROLE_DEFINITIONS[roleB as RoleName];
  if (!a || !b) return false;
  return a.level >= b.level;
}
