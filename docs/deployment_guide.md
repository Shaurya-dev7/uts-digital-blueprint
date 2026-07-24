# Vercel Deployment Guide

This guide details the procedure for deploying the Universal Techno Services (UTS) Enterprise Website to production on Vercel.

## 1. Prerequisites
- Vercel Account linked to GitHub/GitLab/Bitbucket.
- Admin access to the UTS DNS provider (for custom domain configuration).
- Access to the source code repository.

## 2. Environment Variables
Ensure the following environment variables are set in the Vercel dashboard prior to deployment:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The production URL (e.g., `https://www.utsjamshedpur.com`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID |
| `RESEND_API_KEY` | (Future) API Key for transactional emails |
| `SUPABASE_URL` | (Future) Supabase instance URL |
| `SUPABASE_ANON_KEY` | (Future) Supabase anonymous key |

## 3. Deployment Steps
1. Navigate to the Vercel Dashboard and click **Add New... > Project**.
2. Import the UTS Repository.
3. Configure the **Framework Preset** to **Next.js**.
4. Set the **Root Directory** to `./` (if applicable).
5. Expand **Environment Variables** and paste the required variables.
6. Click **Deploy**.

## 4. Post-Deployment Checks
- **Custom Domain:** Configure `www.utsjamshedpur.com` and setup a redirect from the apex domain to `www`.
- **SSL Verification:** Verify that Vercel has successfully provisioned the SSL certificate.
- **Cache Header Inspection:** Ensure caching headers are properly set for static assets.
- **Lighthouse Run:** Run a final Lighthouse audit against the production URL to guarantee 100/100 performance.

## 5. Rollback Strategy
Vercel automatically provisions a unique URL for every commit. In the event of a critical failure:
1. Navigate to the Vercel project **Deployments** tab.
2. Locate the previous stable deployment.
3. Click the vertical ellipsis (⋮) and select **Promote to Production**.
4. The DNS will instantaneously route traffic to the previous version without downtime.
