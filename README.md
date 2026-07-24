# UTS Enterprise Content Platform

The UTS Enterprise Content Platform is a modern, high-performance web platform for Universal Techno Services (UTS). Built with Next.js 16, React 19, and Tailwind 4, this repository serves as the digital headquarters for UTS, providing an unparalleled user experience tailored for the industrial supply sector.

## Architecture & Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI & Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (GPU Accelerated)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Icons**: [Lucide React](https://lucide.dev/)
- **SEO & Metadata**: JSON-LD Schema, Server-side Dynamic Metadata

## Features

- 🏎️ **Scroll Sequence Architecture**: A revolutionary `requestIdleCallback` based sliding-window frame renderer for 60fps cinematic scrolling.
- 🎨 **Enterprise Design System**: Pixel-perfect industrial design with a consistent `navy`, `orange` and `slate` color scheme.
- 📱 **Fully Responsive**: Optimized for ultra-wide monitors down to the smallest mobile viewports.
- ⚡ **Performance First**: Leverages `next/image` priorities, `aria-hidden` attributes for SVGs, and preloads critical assets.
- 🧩 **Robust Forms**: Advanced multi-step quoting system with strict Zod validation schemas and comprehensive error/success states.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Production Guidelines

Before deploying to production, ensure the following steps have been followed:
- Review Next.js bundle sizes using `@next/bundle-analyzer` if introducing heavy dependencies.
- Ensure all forms run through Zod validation schema before hitting APIs.
- Validate `aria-labels` and keyboard focus states are preserved in any new component.
- Maintain the strict folder architecture (`components/sections`, `components/ui`, `components/forms`, `components/layout`).

---
*Built for UTS by the Advanced Agentic Coding Team.*
