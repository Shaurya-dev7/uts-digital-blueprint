"use client";

import React, { useState } from "react";
import { Laptop, Smartphone, Tablet, Globe, Clock, MapPin, XCircle, Loader2 } from "lucide-react";
import type { SessionInfo } from "@/types/auth";
import { formatDistanceToNow } from "date-fns";

interface SessionCardProps {
  session: SessionInfo;
  onRevoke?: (id: string) => Promise<void>;
}

export function SessionCard({ session, onRevoke }: SessionCardProps) {
  const [isRevoking, setIsRevoking] = useState(false);

  const getDeviceIcon = () => {
    switch (session.device?.toLowerCase()) {
      case "mobile": return <Smartphone className="w-5 h-5 text-gray-400" />;
      case "tablet": return <Tablet className="w-5 h-5 text-gray-400" />;
      default: return <Laptop className="w-5 h-5 text-gray-400" />;
    }
  };

  const handleRevoke = async () => {
    if (!onRevoke) return;
    setIsRevoking(true);
    try {
      await onRevoke(session.id);
    } catch (error) {
      setIsRevoking(false);
    }
  };

  return (
    <div className={`p-4 border rounded-xl bg-white flex items-center justify-between transition-all ${session.isCurrent ? 'border-emerald-200 ring-1 ring-emerald-50' : 'border-gray-200'}`}>
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-lg ${session.isCurrent ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50'}`}>
          {getDeviceIcon()}
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-gray-900">
              {session.os} • {session.browser}
            </h4>
            {session.isCurrent && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold tracking-wide uppercase">
                Current Device
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {session.ipAddress || "Unknown IP"}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {session.isCurrent ? "Active now" : `Last active ${formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}`}
            </div>
          </div>
        </div>
      </div>

      {!session.isCurrent && onRevoke && (
        <button
          onClick={handleRevoke}
          disabled={isRevoking}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          title="Sign out this device"
        >
          {isRevoking ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}
