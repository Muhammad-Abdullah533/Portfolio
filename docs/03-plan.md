# Technical Plan — Developer Portfolio

**Project:** Muhammad Abdullah — Developer Portfolio
**Version:** 1.0.0 (Approved)
**Phase:** 4 — Plan
**Date:** 2026-10-25
**Approved:** 2026-10-25
**Inputs:** `docs/00-constitution.md`, `docs/01-spec.md` (v1.0.0), `docs/02-clarifications.md`

> This document defines **how** the requirements will be built. It contains no task list —
> the breakdown lives in `docs/04-tasks.md` (Phase 5). Every decision here is traceable to a
> user story, acceptance criterion, or constitution principle.

---

## 1. Stack Decisions

| Area            | Choice                                             | Version (major) | Why |
| --------------- | -------------------------------------------------- | --------------- | --- |
| Framework       | Next.js, App Router                                | 15              | Server Components give SSG + tiny client JS; native image/font optimization; Vercel fit. |
| UI runtime      | React                                              | 19              | Required by Next 15; Server Components. |
| Language        | TypeScript, `strict` + `noUncheckedIndexedAccess`   | 5               | Constitution VII. |
| Styling         | Tailwind CSS v4 (CSS-first `@theme`)               | 4               | No config file, token-driven, tiny output. |
| Theming         | `next-themes`                                      | latest          | Class-based dark mode, OS default, localStorage persistence, no cookie. |
| Animation       | `motion` (Framer Motion, `motion/react`)           | latest          | Declarative in-view animation + built-in reduced-motion hook. |
| Icons           | `lucide-react`                                     | latest          | Tree-shakeable SVG icons. |
| Content         | Markdown + `gray-matter` + `next-mdx-remote/rsc`   | latest          | Markdown files stay the only publishing step (AC4.7). |
| Markdown extras | `remark-gfm`, `rehype-slug`                        | latest          | Tables and stable heading anchors. |
| Validation      | `zod`                                              | 3               | Build-time content validation + form validation (AC4.5, AC7.2). |
| Forms           | `react-hook-form` + `@hookform/resolvers/zod`      | latest          | Client UX without re-render churn; shared schema. |
| Email           | `resend`                                           | latest          | C-04 decision; simple server SDK. |
| Class helpers   | `clsx` + `tailwind-merge`                          | latest          | Safe conditional class composition. |
| Server guard    | `server-only`                                      | latest          | Prevents secrets/content modules leaking to the client. |
| Package manager | npm (`npm.cmd` on this Windows machine)            | 11              | Constitution §3. |
| Hosting         | Vercel (Node runtime for API route)                | —               | C-06 decision. |

**Rejected alternatives**

- **Astro:** excellent for static sites, but the contact API + ISR-on-demand fit Next's
  Route Handlers with fewer moving parts on Vercel.
- **Contentlayer:** unmaintained; `gray-matter` + `next-mdx-remote` is enough for 3–20 files.
- **A UI kit (MUI/Chakra/shadcn CLI):** violates constitution VI and adds weight for a
  seven-section page.
- **Client-side GitHub fetch:** leaks rate limits to the visitor and adds a loading state;
  server fetch with ISR is cheaper (AC6.5).

---

## 2. Architecture Overview

```
Browser
  │
  ├── / (static + ISR 1h) ──► Server Components
  │                             ├─ sections (Hero, About, Skills, Projects, Experience, Contact)
  │                             ├─ GitHubActivity ──► GitHub REST API (cached 1h)
  │                             └─ data: content/projects/*.md, src/data/*.ts
  │
  ├── /projects/[slug] (static, generateStaticParams)
  │                             └─ MDX rendered on the server
  │
  └── POST /api/contact (Node runtime, dynamic)
                                ├─ zod validation
                                ├─ honeypot + in-memory rate limit
                                └─ Resend API ──► owner inbox
```

**Rendering strategy**

| Route                   | Strategy                               | Revalidate |
| ----------------------- | -------------------------------------- | ---------- |
| `/`                     | Static at build + ISR                  | 3600 s     |
| `/projects/[slug]`      | Static (`generateStaticParams`)        | never      |
| `/api/contact`          | Dynamic, Node runtime                  | n/a        |
| `/sitemap.xml`, `/robots.txt` | Static/metadata route            | at build   |
| unknown route           | `not-found.tsx`                        | static     |

**Cache tags:** GitHub fetch uses `next: { revalidate: 3600, tags: ["github"] }` so data can
also be purged manually.

---

## 3. Folder Structure

```
PORTFOLIO/
├─ docs/                          # SDD documents (constitution → validation)
├─ content/
│  └─ projects/
│     ├─ khataflow.md
│     ├─ student-result-manager.md
│     └─ daily-expense-tracker.md
├─ public/
│  ├─ images/
│  │  ├─ avatar.jpg               # TODO(owner): replace with real photo
│  │  └─ projects/
│  ├─ resume.pdf                  # TODO(owner): add or omit link
│  └─ favicon.ico
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx               # fonts, metadata, ThemeProvider, header/footer
│  │  ├─ page.tsx                 # home: composes sections
│  │  ├─ globals.css              # Tailwind v4 import + tokens + base styles
│  │  ├─ not-found.tsx
│  │  ├─ error.tsx
│  │  ├─ sitemap.ts
│  │  ├─ robots.ts
│  │  ├─ opengraph-image.tsx
│  │  ├─ projects/[slug]/page.tsx
│  │  └─ api/contact/route.ts
│  ├─ components/
│  │  ├─ site-header.tsx
│  │  ├─ site-footer.tsx
│  │  ├─ theme-toggle.tsx
│  │  ├─ skip-link.tsx
│  │  ├─ reveal.tsx
│  │  ├─ sections/
│  │  │  ├─ hero.tsx
│  │  │  ├─ about.tsx
│  │  │  ├─ skills.tsx
│  │  │  ├─ projects.tsx
│  │  │  ├─ experience.tsx
│  │  │  ├─ github-activity.tsx
│  │  │  └─ contact.tsx
│  │  ├─ contact-form.tsx
│  │  ├─ project-card.tsx
│  │  ├─ project-cover.tsx
│  │  ├─ tech-tag.tsx
│  │  ├─ section-heading.tsx
│  │  ├─ ui/
│  │  │  ├─ button.tsx
│  │  │  ├─ badge.tsx
│  │  │  └─ card.tsx
│  │  └─ mdx/mdx-components.tsx
│  ├─ data/
│  │  ├─ site.ts                  # name, role, tagline, email, socials
│  │  ├─ skills.ts
│  │  └─ experience.ts
│  ├─ lib/
│  │  ├─ projects.ts              # read + parse + validate Markdown
│  │  ├─ schemas.ts               # zod schemas (content, contact, env)
│  │  ├─ env.ts                   # lazy server env accessor
│  │  ├─ github.ts                # repo fetch + mapping + fallback
│  │  ├─ rate-limit.ts            # in-memory fixed-window limiter
│  │  └─ utils.ts                 # cn(), date formatting, absoluteUrl()
│  └─ assets/fonts/               # OG-render font (.ttf) if needed
├─ .env.example
├─ .gitignore
├─ eslint.config.mjs
├─ next.config.ts
├─ postcss.config.mjs
├─ prettier.config.mjs
├─ tsconfig.json
└─ package.json
```

**Naming rules:** files `kebab-case`, components `PascalCase`, one component per file,
exports named (no default except Next.js page/layout/route files).

---

## 4. Design System

### 4.1 Color Tokens

Defined as CSS custom properties in `globals.css`, exposed to Tailwind through
`@theme inline` so utilities are semantic (`bg-surface`, `text-muted`, `ring-accent`).
No raw hex is used inside components (constitution IX).

| Token                | Light     | Dark      | Usage |
| -------------------- | --------- | --------- | ----- |
| `--background`       | `#FFFFFF` | `#09090B` | Page background |
| `--surface`          | `#F4F4F5` | `#18181B` | Cards, panels |
| `--surface-2`        | `#FAFAFA` | `#111113` | Inset/alternate bands |
| `--border`           | `#E4E4E7` | `#27272A` | Dividers, card borders |
| `--foreground`       | `#18181B` | `#FAFAFA` | Primary text |
| `--muted`            | `#52525B` | `#A1A1AA` | Secondary text |
| `--accent`           | `#6366F1` | `#6366F1` | Buttons, active states, focus ring base |
| `--accent-foreground`| `#FFFFFF` | `#FFFFFF` | Text on accent fill |
| `--accent-soft`      | `#EEF2FF` | `#1E1B4B` | Tinted blocks, tag backgrounds |
| `--accent-text`      | `#4F46E5` | `#A5B4FC` | Accent-colored text/links on background |
| `--accent-2`         | `#22D3EE` | `#22D3EE` | Decorative gradient only, never text |
| `--success`          | `#15803D` | `#4ADE80` | Form success |
| `--danger`           | `#B91C1C` | `#F87171` | Form errors |
| `--ring`             | `#6366F1` | `#818CF8` | `focus-visible` outline |

**Contrast policy:** body/muted text ≥ 4.5:1 on its background in both themes; accent fills
always pair with `--accent-foreground`. `--accent-2` is decorative (`aria-hidden`) and never
carries meaning. "Bold & colorful" is expressed through large accent blocks, tinted tags,
and an indigo→cyan gradient wash — never through color-only signals.

### 4.2 Typography

| Role     | Font                       | Weights | Notes |
| -------- | -------------------------- | ------- | ----- |
| Display  | **Space Grotesk**          | 500, 700 | Headings, hero name, numbers. |
| Body/UI  | **Inter**                  | 400, 500, 600 | Body, nav, forms. |
| Mono     | system `ui-monospace` stack | —      | Tech tags, dates (no extra font download). |

Loaded with `next/font/google` (self-hosted at build), `display: "swap"`, `subsets: ["latin"]`,
exposed as `--font-display` / `--font-sans`. Two families only, to protect the JS/CSS budget.

**Type scale**

| Token      | Size                                        | Line height | Weight |
| ---------- | ------------------------------------------- | ----------- | ------ |
| `display`  | `clamp(2.5rem, 6vw, 4.5rem)`                | 1.05        | 700 |
| `h1`       | `clamp(2rem, 4.5vw, 3.5rem)`                | 1.1         | 700 |
| `h2`       | `clamp(1.75rem, 3.5vw, 2.75rem)`            | 1.15        | 700 |
| `h3`       | `1.5rem`                                    | 1.3         | 600 |
| `body-lg`  | `1.125rem`                                  | 1.7         | 400 |
| `body`     | `1rem`                                      | 1.7         | 400 |
| `caption`  | `0.875rem`                                  | 1.5         | 500 |

### 4.3 Layout and Spacing

- Page container: `max-width: 1200px`, padding `1rem` (mobile) → `1.5rem` (`sm`) → `2rem` (`lg`).
- Section rhythm: `padding-block: 4rem` mobile → `6rem` (`md`) → `8rem` (`lg`).
- Prose width: `65ch`.
- Sticky header height: `4.5rem`; every section gets `scroll-margin-top: 5.5rem` so anchors
  are not hidden under the header.
- Grids: About/Contact `1 → 2` columns (`lg`); Projects `1 → 2 → 3`; Skills `1 → 2`.

### 4.4 Radii, Shadows, Motion

| Token          | Value                                   |
| -------------- | --------------------------------------- |
| `--radius-sm`  | `6px`                                   |
| `--radius-md`  | `12px`                                  |
| `--radius-lg`  | `20px`                                  |
| `--shadow-sm`  | `0 1px 2px rgb(0 0 0 / 0.06)`           |
| `--shadow-lg`  | `0 12px 32px -12px rgb(0 0 0 / 0.18)`   |
| `--ease-out`   | `cubic-bezier(0.22, 1, 0.36, 1)`        |
| durations      | `150ms` (micro) · `250ms` (hover) · `400ms` (reveal) |

Motion rules:

- Hero entrance uses **CSS** keyframes only (no JS on the critical path).
- Below-the-fold sections use a single `Reveal` client wrapper (`whileInView`, `once: true`,
  `margin: "-80px"`), animating opacity + `translateY(16px)`.
- `useReducedMotion()` disables transforms; a global `@media (prefers-reduced-motion: reduce)`
  rule zeroes durations and disables smooth scrolling.
- No parallax, no auto-playing carousels, no motion that blocks reading.

### 4.5 Styling Rules

- Tokens only — no raw hex, no arbitrary spacing values outside the scale.
- Variants via small helpers (`cn()`), not component-level style maps that duplicate tokens.
- Every new component is visually checked in light **and** dark before it is marked done.
- Hover effects never remove information; focus styles are never `outline: none` alone.

---

## 5. Data Model and Content Pipeline

### 5.1 Project Frontmatter Schema (`src/lib/schemas.ts`)

```ts
const projectFrontmatter = z.object({
  title: z.string().min(3).max(80),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().min(20).max(240),
  date: z.coerce.date(),
  tech: z.array(z.string().min(1)).min(1).max(8),
  featured: z.boolean().default(true),
  order: z.number().int().min(0).default(999),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  cover: z.string().startsWith("/images/").optional(),
  placeholder: z.boolean().default(false),
  draft: z.boolean().default(false),
});
```

- Unknown frontmatter keys are rejected (`.strict()`), catching typos.
- `slug` is validated against the filename; a mismatch fails the build with the file path.
- `draft: true` projects are excluded from lists, routes, and the sitemap.
- Sorting: `order` ascending, then `date` descending. KhataFlow uses `order: 0` (C-17).

### 5.2 Other Content Types

```ts
type SkillGroup = { id: string; label: string; items: string[] };
type ExperienceEntry = {
  id: string;
  title: string;
  org: string;
  period: string;
  type: "work" | "education";
  bullets: string[];
};
```

Plain-typed object arrays in `src/data/*.ts` — no CMS, no database (constitution V, VI).

### 5.3 Loading and Validation

1. `src/lib/projects.ts` reads `content/projects/*.md` with `node:fs` at build time.
2. `gray-matter` splits frontmatter and body.
3. Zod parses frontmatter; on failure it throws
   `Invalid frontmatter in <file>: <flattened issues>` → build fails (AC4.5).
4. Results are wrapped in React `cache()` so repeated calls in one render are free.
5. Body is rendered on the server with `<MDXRemote source={body} components={mdxComponents} />`.

**Thin content is intentional:** only KhataFlow is real. The two placeholder projects carry
`placeholder: true` and render the same UI; a small "Sample project" note is displayed so
they are never presented as shipped work.

---

## 6. Routing and Rendering

| File | Responsibility |
| ---- | -------------- |
| `app/layout.tsx` | `lang="en"`, font variables, `ThemeProvider`, skip link, header, `<main id="main">`, footer, JSON-LD. |
| `app/page.tsx` | Server component; composes sections in fixed order (FR-01); exports `revalidate = 3600`. |
| `app/projects/[slug]/page.tsx` | `generateStaticParams()` from project slugs, `dynamicParams = false`, `generateMetadata()` from frontmatter, MDX body, back link. |
| `app/api/contact/route.ts` | `POST` handler, `runtime = "nodejs"`, `dynamic = "force-dynamic"`. |
| `app/sitemap.ts` | Home + project detail URLs with `lastModified` from frontmatter. |
| `app/robots.ts` | Allow all; point to sitemap. |
| `app/not-found.tsx` | Styled 404 with a link home (FR-10). |
| `app/opengraph-image.tsx` | 1200×630 `ImageResponse` with name, role, accent block. |
| `app/error.tsx` | Client error boundary with a retry action. |

Section anchors: `#about`, `#skills`, `#projects`, `#experience`, `#contact`. Header nav and
hero CTAs use these IDs (AC1.2, FR-02).

No separate `/projects` index page — the home projects section is the index (FR-01).

---

## 7. Component Responsibilities

| Component | Type | Notes |
| --------- | ---- | ----- |
| `site-header` | Client | Sticky, blurred surface; mobile disclosure menu (`aria-expanded`, `aria-controls`); no active-section tracking in v1. |
| `theme-toggle` | Client | `next-themes`; rendered only after mount to avoid hydration mismatch; `aria-pressed` + text label. |
| `skip-link` | Server | First focusable element, visible on focus. |
| `reveal` | Client | Thin `motion.div` wrapper; accepts `children` so the subtree stays server-rendered. |
| `hero` | Server | CSS-only entrance animation; one `<h1>`; two CTAs; social icon links. |
| `about` | Server | Avatar or initials fallback; conditional resume link (AC2.4). |
| `skills` | Server | Grouped `<ul>` lists; no proficiency bars (AC3.3). |
| `projects` | Server | Grid of feature cards + empty state (AC4.6). |
| `project-card` | Server | Title, summary, tech tags, Live badge (AC4.8), external link note. |
| `experience` | Server | `<ol>` timeline; readable with animations off (AC5.4). |
| `github-activity` | Server (async) | Wrapped in `<Suspense>` with a skeleton; fallback card on failure (AC6.4). |
| `contact` | Server | Section shell, email fallback, availability note. |
| `contact-form` | Client | `react-hook-form` + zod; inline errors; `aria-live` status region. |
| `site-footer` | Server | Email, GitHub, copyright, "built with Next.js". |

Client components are limited to those six; everything else renders on the server.

---

## 8. Contact Form Architecture

**Request**

```json
POST /api/contact
{ "name": "...", "email": "...", "message": "...", "company": "" }
```

`company` is the honeypot — must be empty.

**Server pipeline** (`app/api/contact/route.ts`)

1. Parse JSON with a size guard; malformed body → `400`.
2. Validate with `contactSchema` (zod): name 2–80, email valid, message 20–2000.
3. Honeypot filled or `elapsedMs < 1500` → return `200 { ok: true }` without sending.
4. Rate limit: 5 requests / 10 minutes per IP (`x-forwarded-for`), fixed window in memory.
5. Send via Resend: subject `Portfolio contact — {name}`, `replyTo` set to the visitor.
6. Return `200 { ok: true }`; provider failure → `502 { ok: false, error: "send_failed" }`.

**Privacy:** message bodies are never logged; only event names and status codes are logged.
No data is stored on the server.

**Client UX**

- Native labels, `autoComplete` attributes, `inputmode` where useful.
- On success: form resets and the `aria-live="polite"` region announces confirmation.
- On error: form values are kept; the alert region announces a retryable message plus the
  fallback email.
- Submit button shows a pending state and is disabled to prevent double submits.

**Rate-limit limitation:** module memory is per serverless instance, so the limiter is
best-effort. Honeypot + Resend's own abuse controls are the primary defence. Upstash Redis is
the upgrade path if spam appears (not in v1).

---

## 9. GitHub Integration

`src/lib/github.ts`

```ts
fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
  headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  next: { revalidate: 3600, tags: ["github"] },
  signal: AbortSignal.timeout(5000),
});
```

- Filter: drop forks and archived repos; map to `{ name, description, language, stars, url, pushedAt }`.
- Sort by `pushed_at` desc, take 6 (AC6.2).
- On non-200, timeout, or empty result → return `null`; the component renders a short note
  plus a profile link (AC6.4, A-01).
- `GITHUB_TOKEN` is optional and only raises the 60 req/h unauthenticated limit (A-02 note in
  clarifications). No token is exposed to the client (`server-only`).
- The section is wrapped in `<Suspense fallback={<ReposSkeleton />}>`; the skeleton reserves
  the final height to keep CLS at zero (AC6.6).

---

## 10. SEO and Metadata

- `metadataBase` from `NEXT_PUBLIC_SITE_URL`; title template `%s — Muhammad Abdullah`.
- Home: name + role + tagline description (150–160 chars), canonical, OG + Twitter card.
- Project pages: `generateMetadata` uses `title` and `summary`; canonical `/projects/{slug}`.
- `sitemap.ts`: `/`, plus every non-draft project with `lastModified`.
- `robots.ts`: allow all, sitemap reference.
- `opengraph-image.tsx`: `ImageResponse` (Node runtime), 1200×630, display font loaded from
  `src/assets/fonts` `.ttf` when present, otherwise platform default.
- JSON-LD in the layout: `Person` (name, jobTitle, url, email, sameAs → GitHub) and
  `WebSite`. Serialized from static data only.
- Semantic landmarks and heading order are part of SEO, not an afterthought.

---

## 11. Accessibility Implementation

| Requirement | Implementation |
| ----------- | -------------- |
| Landmarks | `header` / `nav` / `main` / `footer`; one `h1`; sections use `aria-labelledby`. |
| Skip link | First focusable element; visible on focus; jumps to `#main`. |
| Focus | Global `:focus-visible` rule using `--ring` with 2px offset; never removed. |
| Keyboard | Mobile menu traps nothing, closes on `Escape`; all controls are native buttons/links. |
| Forms | Labels tied by `htmlFor`; errors linked with `aria-describedby`; `aria-invalid`; live region. |
| Motion | `useReducedMotion` + global reduced-motion CSS; no essential information in animation. |
| Images | Meaningful `alt`; decorative gradients marked `aria-hidden`; `next/image` with dimensions. |
| External links | Visible "opens in new tab" text (screen-reader only where the icon implies it). |
| Contrast | Token pairs verified; CI-free manual check with a contrast tool per theme. |
| Zoom | Layout holds at 200% zoom; no fixed heights on text blocks. |

---

## 12. Performance Strategy

- **Server-first:** only six client components; no data fetching in the browser.
- **No icon barrel imports:** import individual `lucide-react` icons.
- **Motion:** `Reveal` is ~10 KB gzip and only below the fold; hero is pure CSS.
- **Images:** `next/image`, explicit `width`/`height`, `sizes`, AVIF/WebP; only the avatar or
  hero image may use `priority`.
- **Fonts:** two families, `display: swap`, variable where possible; no icon fonts.
- **Caching:** home ISR 3600 s; GitHub fetch cached; static project pages.
- **Budget enforcement:** after Phase 6, measure with Lighthouse mobile and `next build`
  output; initial JS must stay < 150 KB gzip. Any dependency pushing past the budget is
  replaced or lazily loaded.
- **No analytics or tag managers** (scope + privacy).

---

## 13. Security and Privacy

- All secrets in `.env.local` / Vercel env; `.env*` git-ignored; `.env.example` documents keys.
- `server-only` import in `env.ts`, `github.ts`, and the contact route.
- Security headers in `next.config.ts`: `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`,
  `Permissions-Policy` disabling camera/mic/geolocation.
- Contact endpoint: zod validation, body size cap, honeypot, rate limit, no logging of content.
- No cookies beyond none (theme is localStorage); no third-party scripts.
- Dependencies audited with `npm audit` before launch; no known-vulnerable versions shipped.
- Outbound links use `rel="noopener noreferrer"`.

---

## 14. Error Handling and Fallbacks

| Failure | Behaviour |
| ------- | --------- |
| Invalid project frontmatter | Build fails with file path + field (AC4.5). |
| GitHub API down / limited | Section shows note + profile link (AC6.4). |
| Resend failure | `502`, form shows retry + `mailto:` fallback (C-05, AC7.6). |
| Missing env var | Server code throws a named error on first use; build of static pages is unaffected. |
| Unknown route | Styled 404 (FR-10). |
| Runtime render error | `error.tsx` boundary with retry. |
| Missing optional asset (resume, avatar, cover) | Element is omitted or replaced by initials/gradient — never a broken image (AC2.3, AC2.4). |

---

## 15. Tooling and Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

- **ESLint:** flat config, `next/core-web-vitals` + `next/typescript`; zero warnings allowed in
  the Definition of Done.
- **Prettier:** `printWidth: 100`, `prettier-plugin-tailwindcss` for class ordering.
- **tsconfig:** `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, path alias `@/*`.
- **PostCSS:** `@tailwindcss/postcss` only.
- **next.config.ts:** `typedRoutes: true`, image formats, security headers.
- **Git:** Conventional Commits; one commit per task group; build green before each commit.

---

## 16. Testing and QA

No unit-test framework in v1 — the surface is mostly static rendering, and the constitution's
gates (lint, typecheck, build) plus manual checks cover the risk. Automated tests remain an
explicit upgrade path, not a launch blocker.

| Gate | Method |
| ---- | ------ |
| Types | `npm run typecheck` |
| Lint | `npm run lint` (zero warnings) |
| Build | `npm run build` |
| Content schema | Build fails on bad frontmatter (intentional test via a temp bad file) |
| Visual | Chrome, Firefox, Safari (iOS); widths 320 / 768 / 1440 |
| Themes | Every section in light and dark |
| Keyboard | Tab through header → sections → form; `Escape` closes menu |
| Screen reader | NVDA (Windows) or VoiceOver smoke pass on home + form |
| Reduced motion | OS setting → no transforms, no smooth scroll |
| Automated a11y | axe DevTools on `/`, `/projects/khataflow`, contact section |
| Performance | Lighthouse mobile + desktop against the production build |
| Contact | Success, validation error, honeypot, rate limit, provider failure (simulated) |

Upgrade path (not in v1): Playwright smoke tests + `@axe-core/playwright` in CI.

---

## 17. Deployment (Vercel)

1. Push the repository to GitHub (`Muhammad-Abdullah533`).
2. Import into Vercel; framework preset Next.js; default build command.
3. Add env vars for Production and Preview: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
   `NEXT_PUBLIC_SITE_URL`, optional `GITHUB_TOKEN`.
4. First deploy → smoke test home, a project page, the contact form, and the 404.
5. Verify Lighthouse against the deployed URL.
6. Custom domain later (A-05); no code changes required.
7. Rollback plan: Vercel instant rollback to the previous deployment.

---

## 18. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
| ---- | ---------- | ------ | ---------- |
| Resend test sender only delivers to the account owner | Medium | Contact form fails silently for others | Send to the owner's verified inbox; verify a domain before promoting the site |
| Unauthenticated GitHub API rate limit (60/h, shared IP) | Medium | Section shows fallback | 1 h cache + optional `GITHUB_TOKEN`; fallback link keeps the page intact |
| In-memory rate limit not shared across serverless instances | High | Weaker spam protection | Honeypot + short window + Resend abuse controls; Upstash as upgrade |
| Framer Motion bloats client bundle | Low | Perf budget | Only six client components; hero uses CSS; measure at build |
| Placeholder projects go live | Medium | Credibility hit | `placeholder: true` badge + launch checklist blocks publishing until replaced |
| Font swap causes visible layout shift | Low | CLS | `next/font` size-adjust + reserved heading sizes |
| Dark/light contrast regressions | Medium | Accessibility failure | Token-only colors + per-theme checklist on every component |
| Content TODOs forgotten | Medium | Incomplete site | `TODO(content)` markers + `02-clarifications.md` tracked until closed |

---

## 19. Implementation Order (feeds Phase 5 tasks)

1. **Foundation** — scaffold, config, tokens, fonts, base layout, theme, header/footer.
2. **Hero + static sections** — Hero, About, Skills, Experience (data-driven).
3. **Projects** — schemas, content files, list, cards, MDX detail pages, empty state.
4. **GitHub Activity** — fetch, cache, skeleton, fallback.
5. **Contact** — form, API route, Resend, rate limit, error states.
6. **SEO and polish** — metadata, sitemap, robots, OG, JSON-LD, 404, error boundary.
7. **Quality gates** — a11y pass, responsive pass, themes, Lighthouse, bundle check.
8. **Deploy and verify** — Vercel, env vars, production smoke test.
9. **Content finalization** — replace placeholders, close T-01…T-11.

---

## 20. Explicitly Out of Plan

Blog, CMS, auth, i18n, analytics, search, comments, dark-mode-only themes, PWA/service
worker, automated test suite, custom domain, and any server-side database.

---

## 21. Traceability

| Requirement | Where it is satisfied |
| ----------- | --------------------- |
| US1 / AC1.x | `sections/hero.tsx`, `layout.tsx` (single `h1`), `next/font` |
| US2 / AC2.x | `sections/about.tsx`, `data/site.ts`, `public/images/avatar.jpg` |
| US3 / AC3.x | `sections/skills.tsx`, `data/skills.ts` |
| US4 / AC4.x | `lib/projects.ts`, `lib/schemas.ts`, `sections/projects.tsx`, `project-card.tsx`, `app/projects/[slug]/page.tsx` |
| US5 / AC5.x | `sections/experience.tsx`, `data/experience.ts` |
| US6 / AC6.x | `lib/github.ts`, `sections/github-activity.tsx`, ISR |
| US7 / AC7.x | `components/contact-form.tsx`, `app/api/contact/route.ts`, `lib/rate-limit.ts`, `lib/schemas.ts` |
| FR-01…FR-10 | `app/page.tsx`, `site-header.tsx`, `theme-toggle.tsx`, `lib/projects.ts`, `app/sitemap.ts`, `app/robots.ts`, `not-found.tsx` |
| Constitution II (a11y) | §11 of this plan |
| Constitution III (perf) | §12 of this plan |
| Constitution VIII (security) | §13 of this plan |

---

## 22. Plan Approval

This plan is ready for task breakdown when:

- [x] Stack and architecture (§1, §2) are accepted.
- [x] Design tokens and typography (§4) are accepted.
- [x] Content schema and data flow (§5) are accepted.
- [x] Contact and GitHub approaches (§8, §9) are accepted.
- [x] Deployment target and env list (§17) are accepted.
