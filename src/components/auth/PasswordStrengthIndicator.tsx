"use client";

import React, { useMemo } from "react";

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface StrengthCheck {
  label: string;
  met: boolean;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const checks: StrengthCheck[] = useMemo(() => {
    return [
      { label: "At least 12 characters", met: password.length >= 12 },
      { label: "Uppercase letter", met: /[A-Z]/.test(password) },
      { label: "Lowercase letter", met: /[a-z]/.test(password) },
      { label: "Number", met: /[0-9]/.test(password) },
      { label: "Special character", met: /[^A-Za-z0-9]/.test(password) },
    ];
  }, [password]);

  const strength = useMemo(() => {
    const metCount = checks.filter((c) => c.met).length;
    if (metCount === 0) return { level: 0, label: "", color: "" };
    if (metCount <= 2) return { level: 1, label: "Weak", color: "bg-red-500" };
    if (metCount <= 3) return { level: 2, label: "Fair", color: "bg-orange-500" };
    if (metCount <= 4) return { level: 3, label: "Good", color: "bg-yellow-500" };
    return { level: 4, label: "Strong", color: "bg-emerald-500" };
  }, [checks]);

  if (!password) return null;

  return (
    <div className="mt-3 space-y-3">
      {/* Strength bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i <= strength.level ? strength.color : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        {strength.label && (
          <span
            className={`text-xs font-medium ${
              strength.level <= 1
                ? "text-red-600"
                : strength.level <= 2
                ? "text-orange-600"
                : strength.level <= 3
                ? "text-yellow-600"
                : "text-emerald-600"
            }`}
          >
            {strength.label}
          </span>
        )}
      </div>

      {/* Requirements checklist */}
      <ul className="space-y-1">
        {checks.map((check) => (
          <li
            key={check.label}
            className={`flex items-center gap-2 text-xs transition-colors duration-200 ${
              check.met ? "text-emerald-600" : "text-gray-400"
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 flex-shrink-0 transition-all duration-200 ${
                check.met ? "text-emerald-500" : "text-gray-300"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              {check.met ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <circle cx="12" cy="12" r="8" />
              )}
            </svg>
            {check.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
