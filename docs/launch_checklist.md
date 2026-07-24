# Enterprise Launch Pre-Flight Checklist

Ensure all checks are completed prior to shifting DNS to the production Vercel instance.

## Phase A: Code & Build
- [ ] `npm run build` executes without warnings or type errors.
- [ ] Bundle Analyzer confirms no unnecessary large dependencies (e.g., duplicate lodash, heavy un-treeshaken libraries).
- [ ] Environment variables in Vercel match production requirements.
- [ ] Edge caching headers are confirmed on static assets.

## Phase B: QA & Functionality
- [ ] Multi-step Quote Form flows correctly (UI validation).
- [ ] Contact Widget opens and closes correctly on Mobile and Desktop.
- [ ] Navbar scroll blur applies correctly.
- [ ] 404 System Override page renders when hitting `/invalid-route`.
- [ ] 500 Error boundary renders correctly on simulated failure.

## Phase C: SEO & Meta
- [ ] OpenGraph image (`/images/og-image.jpg`) exists and is <= 1200x630.
- [ ] Favicons (`favicon.ico`, `apple-touch-icon.png`) are correctly resolving.
- [ ] `sitemap.xml` generates dynamically and returns HTTP 200.
- [ ] `robots.txt` generates dynamically and returns HTTP 200.
- [ ] JSON-LD schema passes the Google Rich Results Test.

## Phase D: Final DNS & Switch
- [ ] Domain is verified in Vercel.
- [ ] DNS A-Record (or CNAME) is pointed to Vercel IP.
- [ ] SSL Certificate generation complete.
- [ ] Trigger Vercel Production Build.
- [ ] Wait for build success -> Live.
- [ ] Submit Sitemap to Google Search Console.
