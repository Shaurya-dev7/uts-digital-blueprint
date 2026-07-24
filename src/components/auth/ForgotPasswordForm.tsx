"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/schemas/auth";
import { authClient } from "@/lib/auth-client";
import { AuthCard } from "./AuthCard";

export function ForgotPasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // @ts-expect-error - Better Auth types sometimes miss forgetPassword depending on version/config
      await authClient.forgetPassword({
        email: data.email,
        redirectTo: "/reset-password",
      });
      // Always show success (security: don't reveal if email exists)
      setEmailSent(true);
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthCard
        title="Check your email"
        footer={
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-[#F97316] hover:text-orange-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to sign in
          </Link>
        }
      >
        <div className="text-center py-4">
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-emerald-500" />
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            If an account exists for{" "}
            <span className="font-semibold text-gray-900">{getValues("email")}</span>,
            you&apos;ll receive a password reset link shortly.
          </p>
          <p className="text-gray-400 text-xs">
            Didn&apos;t receive the email? Check your spam folder or try again.
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Forgot password?"
      description="Enter your email and we'll send you a reset link"
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-[#F97316] hover:text-orange-600 font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {serverError && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
            {serverError}
          </div>
        )}

        <div>
          <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Email address
          </label>
          <input
            id="forgot-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.email
                ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                : "border-gray-200 focus:ring-orange-200 focus:border-[#F97316]"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0A192F] text-white text-sm font-semibold hover:bg-[#0d2240] focus:outline-none focus:ring-2 focus:ring-[#0A192F] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Mail className="w-4 h-4" />
          )}
          {isLoading ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </AuthCard>
  );
}
