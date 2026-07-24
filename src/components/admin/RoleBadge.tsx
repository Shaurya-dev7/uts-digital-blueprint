"use client";

import React from "react";
import type { RoleName } from "@/server/auth/permissions";

const roleConfig: Record<string, { label: string; color: string; bg: string }> = {
  super_admin: { label: "Super Admin", color: "text-red-700", bg: "bg-red-50 border-red-200" },
  admin: { label: "Admin", color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  manager: { label: "Manager", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  sales_executive: { label: "Sales Executive", color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-200" },
  dealer: { label: "Dealer", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  customer: { label: "Customer", color: "text-gray-700", bg: "bg-gray-50 border-gray-200" },
  guest: { label: "Guest", color: "text-gray-500", bg: "bg-gray-50 border-gray-200" },
};

interface RoleBadgeProps {
  role: string;
  size?: "sm" | "md";
}

export function RoleBadge({ role, size = "sm" }: RoleBadgeProps) {
  const config = roleConfig[role as RoleName] || roleConfig.guest;

  return (
    <span
      className={`inline-flex items-center font-medium border rounded-full ${config.color} ${config.bg} ${
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
    >
      {config.label}
    </span>
  );
}
