"use client";

import React from "react";

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-6 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <span className="text-gray-900 font-bold text-lg tracking-tight">
            UTS
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Form Content */}
      <div>{children}</div>

      {/* Footer */}
      {footer && (
        <div className="mt-8 text-center text-sm text-gray-500">{footer}</div>
      )}
    </div>
  );
}
