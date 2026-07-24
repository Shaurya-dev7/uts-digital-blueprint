# Security Architecture Audit

## 1. Network & Protocol Level
- **Strict-Transport-Security (HSTS):** Enforced via `next.config.ts` (`max-age=63072000; includeSubDomains; preload`). Guarantees HTTPS connections and prevents protocol downgrade attacks.
- **X-Content-Type-Options:** Set to `nosniff` to prevent MIME-type sniffing vulnerabilities.
- **Referrer-Policy:** Set to `strict-origin-when-cross-origin` to protect user privacy across domains.

## 2. Content & Rendering Protection
- **Content-Security-Policy (CSP):** Highly restrictive policy locking down scripts, styles, and image sources to known entities. Prevents Cross-Site Scripting (XSS).
- **X-Frame-Options:** Set to `SAMEORIGIN` to explicitly prevent Clickjacking attacks.
- **Permissions-Policy:** Locks down browser features (`camera=(), microphone=(), geolocation=()`) since UTS does not require device-level hardware access.

## 3. Data Integrity & Input
- **Form Hardening (Future Implementation):** 
  - All form submissions (`MultiStepQuoteForm.tsx`, `ContactForm.tsx`) are currently designed as uncontrolled or React-managed inputs.
  - Phase 10 will require server-side Zod validation + Turnstile/ReCAPTCHA integration before database mutations occur.

## 4. Secret Management
- **Environment Variables:** No secrets are exposed to the browser.
- Variables prefixed with `NEXT_PUBLIC_` are limited only to safe identifiers (like GA4 Measurement IDs). Database URLs and API keys must remain strictly on the server edge.

## 5. Denial of Service (DoS) Resilience
- Relying on Vercel's Edge Network for global DDoS mitigation and automated rate limiting. No custom WAF rules are required for the static pages.
