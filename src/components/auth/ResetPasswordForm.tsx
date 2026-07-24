"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, KeyRound, CheckCircle2 } from "lucide-react";
import { resetPasswordSchema, type ResetPasswordInput } from "@/schemas/auth";
import { authClient } from "@/lib/auth-client";
import { AuthCard } from "./AuthCard";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token,
    },
  });

  const watchedPassword = watch("password");

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      await authClient.resetPassword({
        newPassword: data.password,
        token: data.token,
      });
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch {
      setServerError("Failed to reset password. The link may have expired. Please request a new one.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <AuthCard title="Invalid link">
        <div className="text-center py-4">
          <p className="text-gray-600 text-sm mb-4">
            This password reset link is invalid or has expired.
          </p>
          <Link
            href="/forgot-password"
            className="text-[#F97316] hover:text-orange-600 font-medium text-sm transition-colors"
          >
            Request a new reset link
          </Link>
        </div>
      </AuthCard>
    );
  }

  if (isSuccess) {
    return (
      <AuthCard title="Password reset successful">
        <div className="text-center py-4">
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-emerald-500" />
          </div>
          <p className="text-gray-600 text-sm mb-2">
            Your password has been reset successfully.
          </p>
          <p className="text-gray-400 text-xs">
            Redirecting to sign in...
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Set new password"
      description="Your new password must be different from previously used passwords"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <input type="hidden" {...register("token")} />

        {serverError && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
            {serverError}
          </div>
        )}

        {/* New Password */}
        <div>
          <label htmlFor="reset-password" className="block text-sm font-medium text-gray-700 mb-1.5">
            New password
          </label>
          <div className="relative">
            <input
              id="reset-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Min. 12 characters"
              aria-invalid={!!errors.password}
              className={`w-full px-3.5 py-2.5 pr-10 rounded-lg border text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.password
                  ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                  : "border-gray-200 focus:ring-orange-200 focus:border-[#F97316]"
              }`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
          <PasswordStrengthIndicator password={watchedPassword || ""} />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="reset-confirm" className="block text-sm font-medium text-gray-700 mb-1.5">
            Confirm new password
          </label>
          <div className="relative">
            <input
              id="reset-confirm"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              aria-invalid={!!errors.confirmPassword}
              className={`w-full px-3.5 py-2.5 pr-10 rounded-lg border text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.confirmPassword
                  ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                  : "border-gray-200 focus:ring-orange-200 focus:border-[#F97316]"
              }`}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0A192F] text-white text-sm font-semibold hover:bg-[#0d2240] focus:outline-none focus:ring-2 focus:ring-[#0A192F] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
          {isLoading ? "Resetting..." : "Reset password"}
        </button>
      </form>
    </AuthCard>
  );
}
