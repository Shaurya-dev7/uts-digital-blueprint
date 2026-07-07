# Project TODO List

This list tracks active and pending engineering tasks for the UTS project.

---

## 🛠️ Project Setup & Config
- [ ] Initialize Next.js 15 app in root workspace.
- [ ] Set up compiler preferences in `tsconfig.json`.
- [ ] Install dev dependencies: Prettier, ESLint plugins.
- [ ] Install animation libraries: `framer-motion`, `gsap`.
- [ ] Set up `shadcn/ui` base styles and configuration.

---

## 🎨 Theme & Layout
- [ ] Define design system colors in `tailwind.config.ts`.
- [ ] Create layout wrapper (`src/app/layout.tsx`).
- [ ] Implement responsive Navbar with safety orange highlights.
- [ ] Implement Footer with business credentials, address (Jamshedpur), and contact details.

---

## 📄 Core Pages
- [ ] **Home Page**: Hero banner, primary business products, testimonials.
- [ ] **Catalog Page**: Filterable grid displaying UTS product catalog:
  - Safety Relief & Industrial Valves
  - Pressure & Agricultural Equipment
  - Construction Chemicals
- [ ] **About Page**: History (since 2013), owner Rajesh Kumar Rai, vision.
- [ ] **Contact Page**: Contact forms, Google Maps link for Jamshedpur location.

---

## 🔍 SEO & Analytics
- [ ] Integrate meta description & tags for dynamic pages.
- [ ] Add JSON-LD schema for local business (UTS Jamshedpur) and product lists.
- [ ] Generate standard `sitemap.xml` and `robots.txt` configuration.
