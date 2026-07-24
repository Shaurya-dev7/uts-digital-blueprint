# Monitoring & Analytics Architecture

This document defines the strategy for monitoring application health, user behavior, and error rates in production.

## 1. Analytics & Tracking
**Google Tag Manager (GTM)**
- GTM acts as the primary injection vector for all third-party scripts.
- No hardcoded tracking pixels in the React codebase outside of the GTM container.

**Google Analytics 4 (GA4)**
- Injected via GTM.
- Custom Event Tracking Requirements for Phase 10:
  - `generate_lead` (Quote Form Submit)
  - `click_whatsapp` (WhatsApp Floating Button)
  - `click_phone` (Phone Number Click)
  - `view_item` (Product Detail View)

**Microsoft Clarity**
- Injected via GTM to provide heatmaps and session recordings of enterprise users navigating complex product tables.

## 2. Error Monitoring (Proposed)
**Sentry.io**
- Full-stack error tracking.
- Client-side capturing enabled via `sentry.client.config.ts`.
- Server-side capturing enabled via `sentry.server.config.ts`.
- Configured to ignore common noisy browser extensions and bot-related 404s.

## 3. Uptime & Performance Monitoring
**Vercel Speed Insights & Web Vitals**
- First-party integration for monitoring real-world Core Web Vitals (INP, CLS, LCP).

**UptimeRobot / Better Stack**
- HTTP ping every 60 seconds on the root domain (`/`).
- Keyword check for "Universal Techno Services" in the response body to ensure the site rendered correctly and did not just return a generic 200 OK from the edge cache.

## 4. Privacy & Consent
- Integration with a Consent Management Platform (CMP) like CookieYes or OneTrust is required before running Meta Pixels or LinkedIn Insight Tags to remain compliant with international data laws.
