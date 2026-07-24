# SEO & Local Search Audit

## 1. Global Meta Configuration
- **Dynamic Metadata:** Implemented via `layout.tsx` leveraging Next.js Metadata API.
- **OpenGraph (OG):** Configured for deep social integration (LinkedIn, WhatsApp link previews).
- **Twitter Cards:** Configured for `summary_large_image`.
- **Canonical URLs:** Handled dynamically via `metadataBase` in `layout.tsx`.

## 2. Technical SEO
- **Dynamic Sitemap (`sitemap.ts`):** Automatically maps all root, product, and industry routes with priorities.
- **Robots.txt (`robots.ts`):** Allows all crawlers to access the site and explicitly points to the dynamic XML sitemap.
- **Image Optimization:** All decorative images and brand logos rely on Next.js `next/image` with WebP/AVIF output enabled via `next.config.ts`.
- **Core Web Vitals:** Static rendering minimizes TTFB. `next/font` eliminates FOIT (Flash of Invisible Text) and layout shifts (CLS).

## 3. Local Business SEO
- **JSON-LD Schema Integration:** A structured Data layer has been embedded in `layout.tsx` utilizing the `LocalBusiness` schema.
- **Target Mapping:** Pinpoints exact coordinates to "Jamshedpur, Jharkhand, India".
- **NAP Consistency:** Ensures Name, Address, and Phone Number match Google Business Profile requirements precisely.

## 4. Accessibility (A11Y) Impact
- The site observes `prefers-reduced-motion` strictly.
- Semantic HTML tags (`<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`) are used throughout, bolstering machine readability for search indexers.

## 5. Ongoing Monitoring (Phase 10+)
- Register property with Google Search Console via Domain verification.
- Submit the `sitemap.xml` URL to Google Search Console and Bing Webmaster Tools.
- Validate JSON-LD Schema using the Google Rich Results Test tool post-deployment.
