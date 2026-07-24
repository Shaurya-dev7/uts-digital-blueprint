"use client";

import React from "react";

type StatusType = "active" | "suspended" | "deactivated" | "locked";

const statusConfig: Record<StatusType, { label: string; color: string; bg: string; dot: string }> = {
  active: { label: "Active", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
  suspended: { label: "Suspended", color: "text-red-700", bg: "bg-red-50 border-red-200", dot: "bg-red-500" },
  deactivated: { label: "Deactivated", color: "text-gray-700", bg: "bg-gray-50 border-gray-200", dot: "bg-gray-500" },
  locked: { label: "Locked", color: "text-orange-700", bg: "bg-orange-50 border-orange-200", dot: "bg-orange-500" },
};

interface UserStatusBadgeProps {
  status: string;
  banned?: boolean;
}

export function UserStatusBadge({ status, banned }: UserStatusBadgeProps) {
  let mappedStatus: StatusType = status as StatusType;
  
  if (banned) {
    mappedStatus = "suspended";
  } else if (!statusConfig[mappedStatus]) {
    mappedStatus = "active"; // Default fallback
  }

  const config = statusConfig[mappedStatus];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-medium ${config.bg} ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
