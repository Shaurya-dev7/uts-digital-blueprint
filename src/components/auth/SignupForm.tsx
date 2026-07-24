"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { signupSchema, type SignupInput } from "@/schemas/auth";
import { signUp } from "@/lib/auth-client";
import { AuthCard } from "./AuthCard";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      privacyAccepted: false,
      newsletter: false,
    },
  });

  const watchedPassword = watch("password");

  const onSubmit = async (data: SignupInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      });

      if (result.error) {
        setServerError(
          result.error.message || "Failed to create account. Please try again."
        );
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create your account"
      description="Join UTS to access quotes, orders, downloads, and more"
      footer={
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#F97316] hover:text-orange-600 transition-colors"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Server Error */}
        {serverError && (
          <div
            className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2"
            role="alert"
          >
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {serverError}
          </div>
        )}

        {/* Name */}
        <div>
          <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Full name <span className="text-red-400">*</span>
          </label>
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            aria-invalid={!!errors.name}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.name
                ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                : "border-gray-200 focus:ring-orange-200 focus:border-[#F97316]"
            }`}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="signup-company" className="block text-sm font-medium text-gray-700 mb-1.5">
            Company name <span className="text-gray-400 text-xs font-normal">(optional)</span>
          </label>
          <input
            id="signup-company"
            type="text"
            autoComplete="organization"
            placeholder="Your company"
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#F97316] transition-all"
            {...register("company")}
          />
        </div>

        {/* Email & Phone — Side by side on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="signup-email"
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
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="signup-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone <span className="text-red-400">*</span>
            </label>
            <input
              id="signup-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              aria-invalid={!!errors.phone}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.phone
                  ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                  : "border-gray-200 focus:ring-orange-200 focus:border-[#F97316]"
              }`}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1.5">
            Password <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              id="signup-password"
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
              aria-label={showPassword ? "Hide password" : "Show password"}
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
          <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700 mb-1.5">
            Confirm password <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              id="signup-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
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
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Agreements */}
        <div className="space-y-3 pt-1">
          <div className="flex items-start gap-2">
            <input
              id="signup-terms"
              type="checkbox"
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#F97316] focus:ring-[#F97316]"
              {...register("termsAccepted")}
            />
            <label htmlFor="signup-terms" className="text-sm text-gray-600 leading-snug cursor-pointer">
              I agree to the{" "}
              <Link href="/terms" className="text-[#F97316] hover:underline" target="_blank">
                Terms of Service
              </Link>{" "}
              <span className="text-red-400">*</span>
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-xs text-red-500 ml-6">{errors.termsAccepted.message}</p>
          )}

          <div className="flex items-start gap-2">
            <input
              id="signup-privacy"
              type="checkbox"
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#F97316] focus:ring-[#F97316]"
              {...register("privacyAccepted")}
            />
            <label htmlFor="signup-privacy" className="text-sm text-gray-600 leading-snug cursor-pointer">
              I agree to the{" "}
              <Link href="/privacy" className="text-[#F97316] hover:underline" target="_blank">
                Privacy Policy
              </Link>{" "}
              <span className="text-red-400">*</span>
            </label>
          </div>
          {errors.privacyAccepted && (
            <p className="text-xs text-red-500 ml-6">{errors.privacyAccepted.message}</p>
          )}

          <div className="flex items-start gap-2">
            <input
              id="signup-newsletter"
              type="checkbox"
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#F97316] focus:ring-[#F97316]"
              {...register("newsletter")}
            />
            <label htmlFor="signup-newsletter" className="text-sm text-gray-600 leading-snug cursor-pointer">
              Subscribe to product updates and newsletter
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0A192F] text-white text-sm font-semibold hover:bg-[#0d2240] focus:outline-none focus:ring-2 focus:ring-[#0A192F] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <UserPlus className="w-4 h-4" />
          )}
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthCard>
  );
}
