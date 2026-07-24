"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { AuthCard } from "@/components/auth/AuthCard";

import { Suspense } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    // Better Auth handles verification via its own endpoint
    // This page just reads the result from the callback URL
    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="text-center py-8">
      {status === "loading" && (
        <>
          <Loader2 className="w-10 h-10 mx-auto mb-4 text-gray-400 animate-spin" />
          <p className="text-gray-600 text-sm">Verifying your email address...</p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-emerald-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email verified!</h3>
          <p className="text-gray-500 text-sm mb-6">
            Your email has been verified successfully. You can now access all features.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#0A192F] text-white text-sm font-semibold hover:bg-[#0d2240] transition-colors"
          >
            Go to Dashboard
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-red-50 flex items-center justify-center">
            <XCircle className="w-7 h-7 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification failed</h3>
          <p className="text-gray-500 text-sm mb-6">
            This verification link is invalid or has expired.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#0A192F] text-white text-sm font-semibold hover:bg-[#0d2240] transition-colors"
          >
            Back to Sign In
          </Link>
        </>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <AuthCard title="Email Verification">
      <Suspense fallback={
        <div className="text-center py-8">
          <Loader2 className="w-10 h-10 mx-auto mb-4 text-gray-400 animate-spin" />
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      }>
        <VerifyEmailContent />
      </Suspense>
    </AuthCard>
  );
}
