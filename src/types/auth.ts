/**
 * UTS Auth Type Definitions
 */

import type { RoleName } from "@/server/auth/permissions";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string;
  banned: boolean;
  banReason: string | null;
  banExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  phone: string | null;
  company: string | null;
  designation: string | null;
  gstNumber: string | null;
  dealerCode: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  photoUrl: string | null;
  phoneVerified: boolean;
  lastLogin: Date | null;
  lastActivity: Date | null;
  status: string;
}

export interface UserWithProfile extends AuthUser {
  profile: UserProfile | null;
}

export interface SessionInfo {
  id: string;
  token: string;
  ipAddress: string | null;
  browser: string;
  os: string;
  device: string;
  createdAt: Date;
  expiresAt: Date;
  isCurrent?: boolean;
}

export interface LoginHistoryEntry {
  id: string;
  userId: string;
  ipAddress: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  status: string;
  createdAt: Date;
}

export interface AuditLogEntry {
  id: string;
  userId: string | null;
  action: string;
  resource: string | null;
  resourceId: string | null;
  details: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  status: string;
  createdAt: Date;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface AuthActionResult {
  success: boolean;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export { type RoleName };
