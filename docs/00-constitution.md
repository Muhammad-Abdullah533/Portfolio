# Project Constitution

**Project:** Developer Portfolio
**Version:** 1.0.0
**Status:** Ratified
**Date:** 2026-10-25

> This document defines the non-negotiable rules of the project. Every spec, plan, task,
> and pull request must comply with it. If a change conflicts with this constitution, the
> change is rejected or the constitution is formally amended (see Section 8).

---

## 1. Purpose

Build a fast, accessible, and visually distinctive personal portfolio for a software
developer. The site exists to:

1. Present projects and experience clearly to recruiters, clients, and peers.
2. Demonstrate engineering quality through the site itself (performance, a11y, code).
3. Stay cheap and simple to maintain and deploy.

---

## 2. Core Principles

### I. Spec First, Code Second

- No feature is implemented without a corresponding requirement in `docs/01-spec.md`.
- Every task in `docs/04-tasks.md` must reference the user story and acceptance
  criteria (US / AC IDs) it satisfies.
- Code that cannot be traced back to a requirement is deleted or the spec is updated first.

### II. Accessibility Is Non-Negotiable

- Target: **WCAG 2.2 Level AA**.
- Semantic HTML first. A `<div>` is never used where a native element exists.
- Exactly one `<h1>` per page; heading levels never skip.
- All interactive elements are reachable and operable by keyboard.
- Focus states are always visible and never removed without a replacement.
- All images have meaningful `alt` text; decorative images use `alt=""`.
- Text contrast is at least 4.5:1 (3:1 for large text) in **both** themes.
- `prefers-reduced-motion: reduce` disables all non-essential animation.
- Color is never the only means of conveying information.

### III. Performance Budget

Measured on mobile, Lighthouse, production build:

| Metric                        | Budget        |
| ----------------------------- | ------------- |
| Performance score             | ≥ 95          |
| Accessibility score           | ≥ 95          |
| Best Practices score          | ≥ 95          |
| SEO score                     | ≥ 95          |
| LCP                           | < 2.5 s       |
| CLS                           | < 0.1         |
| INP                           | < 200 ms      |
| Initial JS (gzip, first load) | < 150 KB      |

- New dependencies must justify their size. No dependency is added for something
  achievable in under ~50 lines of local code.
- Images are served through `next/image` in an optimized format with explicit dimensions.
- Fonts are self-hosted via `next/font` with `display: swap` and subsetting.

### IV. Mobile First and Responsive

- The layout must work from **320 px** width upward with no horizontal scroll.
- Primary breakpoints follow Tailwind defaults: `sm 640`, `md 768`, `lg 1024`, `xl 1280`.
- Tap targets are at least 44×44 CSS px.
- Content is readable at 200% zoom without loss of function.

### V. Content Is Data, Not Markup

- Project content lives in `content/projects/*.md` with validated frontmatter.
- Components never hardcode project, skill, or experience content. They receive data.
- All frontmatter is parsed with a **Zod schema** and fails the build on invalid data.
- Adding a project must require **zero** component changes.

### VI. Simplicity and Maintainability

- Server Components by default. `"use client"` is added only when interactivity requires it.
- No general-purpose UI kit (MUI, Chakra, Ant, Bootstrap). Custom Tailwind components only.
- One component per file, named in `kebab-case`; exported names in `PascalCase`.
- Props are typed with explicit interfaces. No `any`, no non-null `!` without a comment.
- Utility code lives in `src/lib`, never duplicated across components.

### VII. Type Safety and Validation

- TypeScript `strict` mode on; `noUncheckedIndexedAccess` on.
- All external data (frontmatter, API responses, form input) is validated at the boundary.
- Environment variables are validated and typed; missing required vars fail fast.

### VIII. Security and Privacy

- Secrets never enter the repository. `.env*` files are git-ignored; `.env.example` documents keys.
- The contact form requires server-side validation, rate limiting, and a honeypot field.
- No third-party trackers. Any analytics must be privacy-friendly and require explicit consent.
- External links use `rel="noopener noreferrer"` when opened in a new tab.
- Dependencies are kept current; known-vulnerable packages are not shipped.

### IX. Theming and Visual Identity

- All colors, spacing, radii, and shadows are **semantic design tokens**, never raw hex or
  magic numbers inside components.
- Both light and dark themes are first-class; every new component is checked in both.
- Visual direction is **bold and colorful**: a strong accent color, large type, generous
  whitespace, and confident use of color blocks. Bold must never reduce readability.
- Motion is purposeful and subtle; it never blocks content or delays interaction.

### X. Git and Documentation Discipline

- Commits follow **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`).
- Each commit represents one logical change and leaves the build green.
- Documentation is updated in the same change as the behavior it describes.
- The SDD documents are the source of truth and are never left stale.

---

## 3. Technical Constraints

| Area            | Decision                                                       |
| --------------- | -------------------------------------------------------------- |
| Framework       | Next.js 15, App Router                                         |
| Language        | TypeScript (strict)                                            |
| Styling         | Tailwind CSS v4 + CSS custom properties for tokens             |
| Package manager | npm (`npm.cmd` on Windows due to PowerShell execution policy)   |
| Node            | ≥ 20 (current environment: v24)                                |
| Formatting      | Prettier                                                       |
| Linting         | ESLint (`next/core-web-vitals`)                                |
| Type checking   | `tsc --noEmit` in CI                                           |
| Icons           | `lucide-react`                                                 |
| Animation       | `framer-motion` (via `motion`), client components only         |
| Content         | Markdown + `gray-matter` + `next-mdx-remote/rsc`               |
| Validation      | `zod`                                                          |
| Theming         | `next-themes`                                                  |
| Forms           | `react-hook-form` + `zod` resolver, API route handler          |
| Deployment      | Static-friendly on Vercel or Netlify; decided in Phase 3        |

**Prohibited:** jQuery, CSS-in-JS runtimes, moment.js, lodash (use native JS), component
libraries that ship their own design system, and any dependency above 30 KB gzip without
written justification in `docs/03-plan.md`.

---

## 4. Design Standards

- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px (Tailwind scale only).
- **Type scale:** display, h1, h2, h3, body-lg, body, caption. No ad-hoc font sizes.
- **Content width:** prose max ~65ch; page container max 1200 px.
- **Radii:** `sm 6px`, `md 12px`, `lg 20px`, `full 9999px` — via tokens only.
- **Color tokens (semantic):** `bg`, `surface`, `border`, `text`, `muted`, `accent`,
  `accent-contrast`, `success`, `danger`. Every token has a light and dark value.
- **Focus ring:** 2 px accent outline with 2 px offset, visible on every theme.
- **Motion:** durations 150–300 ms, ease-out; respects reduced motion.

---

## 5. Definition of Done

A task is complete only when **all** of the following are true:

- [ ] Acceptance criteria for the linked US/AC are met.
- [ ] `npm run lint` passes with zero warnings.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` succeeds with no errors.
- [ ] Keyboard navigation works for the affected UI.
- [ ] Verified in light theme and dark theme.
- [ ] Verified at 320 px, 768 px, and 1440 px widths.
- [ ] No new console errors or warnings in the browser.
- [ ] Relevant docs updated.
- [ ] Commit message follows Conventional Commits.

---

## 6. Content Rules

- Site copy is **English only**.
- No lorem ipsum in shipped code; incomplete content uses explicit
  `TODO(content): ...` markers tracked in `docs/02-clarifications.md`.
- Page titles follow `Page — Name`; meta descriptions are 150–160 characters.
- Project frontmatter requires: `title`, `summary`, `date`, `tech`, `featured`, `slug`.
- Placeholder imagery is clearly marked and must be replaced before public launch.

---

## 7. Workflow and Phase Gates

The project advances through these phases in order:

1. **Constitution** (this document) — ratified.
2. **Specify** — `docs/01-spec.md` approved before planning.
3. **Clarify** — `docs/02-clarifications.md` has no open blocking questions.
4. **Plan** — `docs/03-plan.md` approved before task breakdown.
5. **Tasks** — `docs/04-tasks.md` approved before implementation.
6. **Implement** — tasks executed in ID order, one logical commit per task group.
7. **Validate** — `docs/05-validation.md` signed off.

A phase may not begin until the previous one is explicitly approved by the project owner.
Scope changes discovered mid-phase are recorded in the spec first, then replanned.

---

## 8. Governance

- This constitution supersedes ad-hoc preferences and general convention.
- **Amendments** require: a written proposal, the reason, the affected sections, and
  explicit owner approval, followed by a version bump.
- **Versioning:** MAJOR for principle removal/redefinition, MINOR for new principles or
  sections, PATCH for wording and clarification.
- Every amendment is logged in the table below.

| Version | Date       | Change                                   |
| ------- | ---------- | ---------------------------------------- |
| 1.0.0   | 2026-10-25 | Initial ratification for portfolio build |
