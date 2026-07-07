# Contributing to UTS Digital Blueprint

Welcome! This guide outlines the workflow and coding standards for developing the Universal Techno Services (UTS) website.

---

## Git Workflow

### Branching Strategy
We use a structured branch naming convention:
- **`feature/feature-name`** for new features.
- **`bugfix/bug-description`** for fixing bugs.
- **`hotfix/critical-fix`** for urgent production issues.
- **`docs/doc-updates`** for writing documentation.

### Commit Messages
We follow **Conventional Commits**:
- `feat: add Safety Relief Valve page`
- `fix: correct layout displacement on mobile`
- `docs: update ROADMAP milestones`
- `style: apply safety orange colors to primary CTA`
- `refactor: modularize catalog search inputs`

---

## Coding Standards

### TypeScript & React
- Use strict TypeScript; avoid using `any`.
- Prefer functional components and React Hooks.
- Define explicit prop types/interfaces.
- Keep components small, focused, and single-purpose.

### Styling & CSS
- Use Tailwind CSS utility classes inside files.
- Group custom styling in `index.css` under Tailwind `@layer utilities` or `@layer base` where necessary.
- Follow the official UTS Color Palette:
  - Primary: Deep Navy Blue
  - Secondary: Steel Gray
  - Accent: Safety Orange
  - Backgrounds: White and Light Slate

### UI Components
- Put reusable components in `src/components/ui/` (following `shadcn/ui` style).
- Do not duplicate components. If a similar UI is needed, generalize the existing one.

---

## Pull Request Checklist
Before submitting a PR or merging code, ensure:
1. [ ] Code compiles without TypeScript errors.
2. [ ] ESLint passes without errors (`npm run lint`).
3. [ ] Code is formatted with Prettier.
4. [ ] All pages have correct meta titles and descriptions for SEO.
5. [ ] Responsiveness is verified on mobile, tablet, and desktop viewports.
