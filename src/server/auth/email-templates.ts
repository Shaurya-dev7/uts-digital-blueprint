import "server-only";

/**
 * UTS Email Templates
 *
 * Branded HTML email templates for all auth-related communications.
 * Uses inline styles for maximum email client compatibility.
 */

const BRAND = {
  name: "Universal Techno Services",
  shortName: "UTS",
  color: "#0A192F",
  accent: "#F97316",
  url: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  logo: "", // Add logo URL when available
};

function baseLayout(content: string, preheader: string = ""): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${BRAND.name}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>` : ""}
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color:${BRAND.color};padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">${BRAND.shortName}</h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">${BRAND.name}</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e4e4e7;text-align:center;">
              <p style="margin:0;color:#a1a1aa;font-size:12px;">
                &copy; ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.<br>
                P/14 Pragati Nagar, Baridih, Jamshedpur, Jharkhand 831017
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function ctaButton(text: string, url: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:32px 0;">
      <tr>
        <td align="center">
          <a href="${url}" target="_blank" style="display:inline-block;background-color:${BRAND.accent};color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 32px;border-radius:8px;">
            ${text}
          </a>
        </td>
      </tr>
    </table>`;
}

// ============================================
// Email Templates
// ============================================

export function verificationEmail(name: string, url: string): { subject: string; html: string } {
  return {
    subject: `Verify your email — ${BRAND.shortName}`,
    html: baseLayout(
      `
      <h2 style="margin:0 0 16px;color:#18181b;font-size:20px;">Verify your email address</h2>
      <p style="color:#52525b;font-size:15px;line-height:1.6;margin:0 0 8px;">
        Hi ${name},
      </p>
      <p style="color:#52525b;font-size:15px;line-height:1.6;margin:0 0 8px;">
        Thank you for creating an account with ${BRAND.name}. Please verify your email address to get started.
      </p>
      ${ctaButton("Verify Email", url)}
      <p style="color:#a1a1aa;font-size:13px;line-height:1.5;margin:0;">
        This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.
      </p>`,
      `Verify your email address for ${BRAND.shortName}`
    ),
  };
}

export function welcomeEmail(name: string): { subject: string; html: string } {
  return {
    subject: `Welcome to ${BRAND.shortName}!`,
    html: baseLayout(
      `
      <h2 style="margin:0 0 16px;color:#18181b;font-size:20px;">Welcome aboard, ${name}! 🎉</h2>
      <p style="color:#52525b;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Your ${BRAND.name} account is ready. Here's what you can do:
      </p>
      <ul style="color:#52525b;font-size:15px;line-height:1.8;margin:0 0 16px;padding-left:20px;">
        <li>Browse our complete product catalog</li>
        <li>Request quotes for industrial equipment</li>
        <li>Access technical downloads and resources</li>
        <li>Track your orders and history</li>
      </ul>
      ${ctaButton("Go to Dashboard", `${BRAND.url}/dashboard`)}`,
      `Welcome to ${BRAND.shortName}!`
    ),
  };
}

export function passwordResetEmail(name: string, url: string): { subject: string; html: string } {
  return {
    subject: `Reset your password — ${BRAND.shortName}`,
    html: baseLayout(
      `
      <h2 style="margin:0 0 16px;color:#18181b;font-size:20px;">Reset your password</h2>
      <p style="color:#52525b;font-size:15px;line-height:1.6;margin:0 0 8px;">
        Hi ${name},
      </p>
      <p style="color:#52525b;font-size:15px;line-height:1.6;margin:0 0 8px;">
        We received a request to reset your password. Click the button below to choose a new one.
      </p>
      ${ctaButton("Reset Password", url)}
      <p style="color:#a1a1aa;font-size:13px;line-height:1.5;margin:0;">
        This link expires in 1 hour. If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
      </p>`,
      `Reset your ${BRAND.shortName} password`
    ),
  };
}

export function passwordChangedEmail(name: string): { subject: string; html: string } {
  return {
    subject: `Password changed — ${BRAND.shortName}`,
    html: baseLayout(
      `
      <h2 style="margin:0 0 16px;color:#18181b;font-size:20px;">Password changed successfully</h2>
      <p style="color:#52525b;font-size:15px;line-height:1.6;margin:0 0 8px;">
        Hi ${name},
      </p>
      <p style="color:#52525b;font-size:15px;line-height:1.6;margin:0 0 8px;">
        Your password has been successfully changed. If you did not make this change, please contact us immediately or reset your password.
      </p>
      ${ctaButton("Reset Password", `${BRAND.url}/forgot-password`)}
      <p style="color:#a1a1aa;font-size:13px;line-height:1.5;margin:0;">
        For security, all your other sessions have been logged out.
      </p>`,
      `Your ${BRAND.shortName} password was changed`
    ),
  };
}

export function accountLockedEmail(name: string): { subject: string; html: string } {
  return {
    subject: `Account temporarily locked — ${BRAND.shortName}`,
    html: baseLayout(
      `
      <h2 style="margin:0 0 16px;color:#18181b;font-size:20px;">Account temporarily locked</h2>
      <p style="color:#52525b;font-size:15px;line-height:1.6;margin:0 0 8px;">
        Hi ${name},
      </p>
      <p style="color:#52525b;font-size:15px;line-height:1.6;margin:0 0 8px;">
        We detected multiple failed login attempts on your account. For your security, we've temporarily locked it for 30 minutes.
      </p>
      <p style="color:#52525b;font-size:15px;line-height:1.6;margin:0 0 8px;">
        If this wasn't you, we strongly recommend resetting your password.
      </p>
      ${ctaButton("Reset Password", `${BRAND.url}/forgot-password`)}`,
      `Your ${BRAND.shortName} account has been temporarily locked`
    ),
  };
}

export function loginAlertEmail(
  name: string,
  details: { browser: string; os: string; ip: string; time: string }
): { subject: string; html: string } {
  return {
    subject: `New login detected — ${BRAND.shortName}`,
    html: baseLayout(
      `
      <h2 style="margin:0 0 16px;color:#18181b;font-size:20px;">New login to your account</h2>
      <p style="color:#52525b;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Hi ${name}, a new login was detected on your account:
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f4f4f5;border-radius:8px;padding:20px;margin:0 0 16px;">
        <tr><td style="padding:4px 16px;color:#71717a;font-size:13px;">Browser</td><td style="padding:4px 16px;color:#18181b;font-size:14px;font-weight:500;">${details.browser}</td></tr>
        <tr><td style="padding:4px 16px;color:#71717a;font-size:13px;">Operating System</td><td style="padding:4px 16px;color:#18181b;font-size:14px;font-weight:500;">${details.os}</td></tr>
        <tr><td style="padding:4px 16px;color:#71717a;font-size:13px;">IP Address</td><td style="padding:4px 16px;color:#18181b;font-size:14px;font-weight:500;">${details.ip}</td></tr>
        <tr><td style="padding:4px 16px;color:#71717a;font-size:13px;">Time</td><td style="padding:4px 16px;color:#18181b;font-size:14px;font-weight:500;">${details.time}</td></tr>
      </table>
      <p style="color:#a1a1aa;font-size:13px;line-height:1.5;margin:0;">
        If this wasn't you, please reset your password immediately and review your active sessions.
      </p>`,
      `New login detected on your ${BRAND.shortName} account`
    ),
  };
}
