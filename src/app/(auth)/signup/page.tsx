import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Universal Techno Services account to access quotes, orders, and more.",
};

export default function SignupPage() {
  return <SignupForm />;
}
