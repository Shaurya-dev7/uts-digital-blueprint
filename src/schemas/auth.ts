import * as z from "zod";

/**
 * UTS Auth Validation Schemas
 *
 * Zod schemas for all authentication forms.
 * Used on both client (react-hook-form) and server (server actions).
 */

// ============================================
// Common Validators
// ============================================

const commonPasswords = [
  "password123", "12345678901", "qwerty12345", "letmein1234",
  "admin123456", "welcome1234", "password1234", "123456789012",
  "changeme1234", "iloveyou1234",
];

const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters")
  .max(128, "Password must be at most 128 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
  .refine(
    (val) => !commonPasswords.some((p) => val.toLowerCase().includes(p)),
    "Password is too common. Please choose a stronger password."
  );

const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(255, "Email must be at most 255 characters")
  .transform((v) => v.toLowerCase().trim());

const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be at most 100 characters")
  .trim();

const phoneSchema = z
  .string()
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number must be at most 15 digits")
  .regex(/^[+]?[\d\s-()]+$/, "Please enter a valid phone number");

// ============================================
// Auth Form Schemas
// ============================================

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export const signupSchema = z
  .object({
    name: nameSchema,
    company: z.string().max(200),
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    termsAccepted: z.boolean().refine((v) => v === true, {
      message: "You must accept the Terms of Service",
    }),
    privacyAccepted: z.boolean().refine((v) => v === true, {
      message: "You must accept the Privacy Policy",
    }),
    newsletter: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    token: z.string().min(1, "Reset token is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export const profileUpdateSchema = z.object({
  name: nameSchema.optional(),
  phone: phoneSchema.optional(),
  company: z.string().max(200).optional(),
  designation: z.string().max(100).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  pincode: z.string().max(10).optional(),
});

// ============================================
// Admin Schemas
// ============================================

export const adminUserUpdateSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  role: z.string().optional(),
  banned: z.boolean().optional(),
  banReason: z.string().max(500).optional(),
});

export const adminRoleAssignSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: z.string().min(1, "Role is required"),
});

// ============================================
// Type Exports
// ============================================

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type AdminUserUpdateInput = z.infer<typeof adminUserUpdateSchema>;
export type AdminRoleAssignInput = z.infer<typeof adminRoleAssignSchema>;
