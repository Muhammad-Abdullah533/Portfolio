# Tasks — Developer Portfolio

**Project:** Muhammad Abdullah — Developer Portfolio
**Version:** 1.0.0
**Phase:** 5 — Tasks
**Date:** 2026-10-25
**Inputs:** `docs/01-spec.md` (v1.0.0), `docs/03-plan.md` (v1.0.0)

> Implementation checklist. Tasks are executed in ID order. Each task references the user
> story or acceptance criterion it satisfies. "Done" means the constitution's Definition of
> Done (`docs/00-constitution.md` §5) is met for that task's scope.

---

## Progress

| Group | Tasks | Done |
| ----- | ----- | ---- |
| G0 — Foundation | T001–T014 | 13 / 14 |
| G1 — Design system and shell | T015–T023 | 9 / 9 |
| G2 — Content layer | T024–T033 | 10 / 10 |
| G3 — Static sections | T034–T040 | 7 / 7 |
| G4 — Projects | T041–T046 | 6 / 6 |
| G5 — GitHub activity | T047–T050 | 4 / 4 |
| G6 — Contact | T051–T058 | 8 / 8 |
| G7 — SEO and resilience | T059–T066 | 7 / 8 |
| G8 — QA and polish | T067–T079 | 2 / 13 |
| G9 — Deploy | T080–T084 | 0 / 5 |
| G10 — Content finalization | T085–T095 | 9 / 11 |
| **Total** | **T001–T095** | **75 / 95** |

### Implementation status (2026-10-25)

Code, content, and all routes are implemented. `lint`, `typecheck`, `format:check`, and
`build` pass. Production smoke tests: home 200, `/projects/khataflow` 200, unknown slug 404,
`sitemap.xml` (2 URLs), `robots.txt`, `opengraph-image` (PNG), contact API (400 invalid,
200 honeypot, 200 too-fast, 502 on missing env). Home first-load JS is 123 kB.

Remaining work is verification and release, not implementation:

- **T001** — `git init` and first commit (awaiting owner approval).
- **T066** — only an SVG icon ships; `.ico` not generated.
- **G8** — device/browser QA, axe, Lighthouse, real Resend email, security-header check,
  `npm audit`.
- **G9** — GitHub push and Vercel deployment.
- **T088 / T091** — LinkedIn URL and KhataFlow screenshots still pending from the owner.

---

## G0 — Foundation

- [ ] **T001** Initialize git repository, `.gitignore`, `README.md` skeleton, `.nvmrc`/`engines` (Node ≥ 20). — *Constitution §3*
- [x] **T002** Scaffold Next.js 15 + TypeScript + Tailwind v4 + ESLint + Prettier into the existing folder (no nested directory). — *Plan §1*
- [x] **T003** Configure `tsconfig.json`: `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `@/*` alias. — *Constitution VII*
- [x] **T004** Configure Prettier with `printWidth: 100` and `prettier-plugin-tailwindcss`. — *Plan §15*
- [x] **T005** Configure ESLint flat config (`next/core-web-vitals`, `next/typescript`), zero-warning policy. — *Constitution §5*
- [x] **T006** Configure `next.config.ts`: `typedRoutes`, image formats, security headers. — *Plan §13*
- [x] **T007** Write `globals.css`: Tailwind import, class-based `dark` custom variant, all light/dark token values. — *Plan §4.1*
- [x] **T008** Map tokens into Tailwind via `@theme inline` (colors, radii, fonts, shadows, ease). — *Plan §4.1, §4.4*
- [x] **T009** Base styles: `:focus-visible` ring, `scroll-margin-top`, reduced-motion reset, smooth scroll behind motion query, selection color. — *Constitution II*
- [x] **T010** Root `layout.tsx` shell: `lang="en"`, `metadataBase`, `suppressHydrationWarning`, landmarks. — *Plan §6*
- [x] **T011** Load Space Grotesk + Inter with `next/font`, `display: swap`, latin subset; wire CSS variables. — *Plan §4.2*
- [x] **T012** Create `.env.example` and `src/lib/env.ts` (lazy zod validation). — *Plan §13*
- [x] **T013** Add `ThemeProvider` (`next-themes`, class attribute, system default, persist). — *FR-03, FR-04*
- [x] **T014** Add skip link and `<main id="main">` target. — *Constitution II*

**Gate G0:** `npm.cmd run dev` renders a themed blank page; `lint`, `typecheck`, `build` pass.

---

## G1 — Design System and Shell

- [x] **T015** `ui/container` + section wrapper primitives with consistent padding/rhythm. — *Plan §4.3*
- [x] **T016** `ui/button` with `primary`, `secondary`, `ghost` variants, `asChild`-style link support, focus/disabled states. — *AC1.2*
- [x] **T017** `tech-tag` + `ui/badge` (default, accent, success, outline) and a `Live` variant. — *AC4.8*
- [x] **T018** `ui/card` with surface, border, radius, hover treatment (no motion dependency). — *Plan §4.4*
- [x] **T019** `section-heading` (eyebrow, `h2`, description) with `id` for `aria-labelledby`. — *Plan §11*
- [x] **T020** `reveal` client wrapper: `whileInView`, `once`, reduced-motion aware, accepts server children. — *Plan §4.4*
- [x] **T021** `site-header`: sticky, blurred surface, desktop nav, mobile disclosure (`aria-expanded`/`aria-controls`, Escape to close). — *FR-02*
- [x] **T022** `theme-toggle`: mounted guard, `aria-pressed`, visible label, keyboard operable. — *FR-03*
- [x] **T023** `site-footer`: email, GitHub, copyright, tech note. — *US7*

**Gate G1:** Header/footer/toggle work in both themes at 320 px and 1440 px; keyboard pass.

---

## G2 — Content Layer

- [x] **T024** `lib/schemas.ts`: project frontmatter schema (strict), contact schema, repo schema, env schema. — *Plan §5.1*
- [x] **T025** `data/site.ts`: name, role, tagline, email, GitHub, location, availability, socials (typed). — *US1, US2*
- [x] **T026** `data/skills.ts`: grouped skills from confirmed content only. — *US3*
- [x] **T027** `data/experience.ts`: accounts + BSSE entries (newest first). — *US5*
- [x] **T028** `lib/utils.ts`: `cn()`, `formatDate()`, `absoluteUrl()`. — *Plan §15*
- [x] **T029** `lib/projects.ts`: read `content/projects`, parse with gray-matter, validate, filename↔slug check, `cache()` wrappers, sort by `order` then date. — *AC4.5, AC4.7*
- [x] **T030** `mdx/mdx-components.tsx` + `remark-gfm` + `rehype-slug`; styled headings, lists, tables, code, links. — *AC4.3*
- [x] **T031** Add `content/projects/khataflow.md` with validated frontmatter and full write-up. — *US4*
- [x] **T032** Confirm `content/projects` contains only `khataflow.md`; no placeholder project files ship. — *C-26*
- [x] **T033** Unknown slug returns `notFound()` with `dynamicParams = false`. — *FR-10*

**Gate G2:** Deliberately invalid frontmatter fails the build with the file name; valid content parses.

---

## G3 — Static Sections

- [x] **T034** `hero`: single `h1`, role line, tagline, CSS-only entrance, indigo→cyan decorative wash (`aria-hidden`). — *US1, AC1.1, AC1.4, AC1.6*
- [x] **T035** Hero CTAs (View Projects, Get in Touch) + labelled GitHub/email icon links. — *AC1.2, AC1.3*
- [x] **T036** `about`: 400–600 char bio, photo or initials avatar, conditional resume link. — *US2*
- [x] **T037** `skills`: grouped semantic lists, no proficiency bars, optional learning group. — *US3*
- [x] **T038** `experience`: `<ol>` timeline, period/bullets, readable with animations disabled. — *US5*
- [x] **T039** Compose `app/page.tsx` in fixed section order + `revalidate = 3600`. — *FR-01*
- [x] **T040** Wire nav anchors and `scroll-margin` so the sticky header never hides headings. — *FR-02*

**Gate G3:** All static sections render at 320/768/1440, light + dark, keyboard navigable.

---

## G4 — Projects

- [x] **T041** `project-card`: title, summary, tech tags, Live badge, external link with "opens in new tab" accessible name. — *AC4.2, AC4.8, AC4.9*
- [x] **T042** `projects` section: featured grid, ordering (KhataFlow first), empty state. — *AC4.1, AC4.6, C-17*
- [x] **T043** `app/projects/[slug]/page.tsx`: `generateStaticParams`, `generateMetadata`, back link. — *AC4.3, AC4.4*
- [x] **T044** Render MDX body with mapped components; prose width 65ch. — *AC4.3*
- [x] **T045** `project-cover`: next/image when `cover` exists, otherwise deterministic gradient + initials fallback. — *AC2.3 principle*
- [x] **T046** Placeholder notice badge — **not applicable**; no placeholder projects ship (C-26).

**Gate G4:** KhataFlow card → detail page works; new Markdown file appears with zero code changes.

---

## G5 — GitHub Activity

- [x] **T047** `lib/github.ts`: fetch repos, timeout 5 s, filter forks/archived, map, sort, take 6, return `null` on failure. — *AC6.1, AC6.2*
- [x] **T048** `github-activity` async server section + Suspense skeleton with reserved height. — *AC6.6*
- [x] **T049** Failure/empty fallback with profile link and short note. — *AC6.4*
- [x] **T050** Verify hourly caching and that no client request hits the GitHub API. — *AC6.3, AC6.5*

**Gate G5:** Section renders with a token, without a token, and with a simulated failure.

---

## G6 — Contact

- [x] **T051** `contact` section shell: intro, public email fallback, availability note. — *AC7.6*
- [x] **T052** `contact-form` UI: labelled fields, `autoComplete`, honeypot field hidden from AT, submit pending state. — *AC7.1*
- [x] **T053** Client validation with shared zod schema; inline errors via `aria-describedby` and `aria-invalid`. — *AC7.2, AC7.3*
- [x] **T054** `app/api/contact/route.ts`: JSON guard, zod parse, honeypot, minimum-fill-time. — *AC7.4, AC7.7*
- [x] **T055** `lib/rate-limit.ts`: 5 requests / 10 min per IP, fixed window. — *AC7.4*
- [x] **T056** Resend integration: subject, `replyTo`, HTML + text body, failure → `502` without logging content. — *AC7.7*
- [x] **T057** Success/error `aria-live` region, form reset on success, values kept on failure. — *AC7.5*
- [x] **T058** `mailto:` fallback surfaced when delivery fails. — *C-05*

**Gate G6:** Real email received; validation, honeypot, limit, and forced failure all behave correctly.

---

## G7 — SEO and Resilience

- [x] **T059** Home metadata: title template, description 150–160 chars, canonical, OG, Twitter. — *Plan §10*
- [x] **T060** `sitemap.ts` with home + non-draft projects and `lastModified`. — *FR-09*
- [x] **T061** `robots.ts` allowing all with sitemap reference. — *FR-09*
- [x] **T062** `opengraph-image.tsx`: 1200×630 `ImageResponse` with display font + accent block. — *Plan §10*
- [x] **T063** JSON-LD `Person` + `WebSite` from static data. — *Plan §10*
- [x] **T064** Styled `not-found.tsx` with link home. — *FR-10*
- [x] **T065** `error.tsx` boundary with retry action. — *Plan §14*
- [ ] **T066** Favicon/icon set (SVG + `.ico`) using the accent identity. — *Plan §3*

**Gate G7:** Social preview renders; `/robots.txt`, `/sitemap.xml`, and `/og` resolve on the deployed build.

---

## G8 — QA and Polish

- [x] **T067** `lint`, `typecheck`, `build` all green with zero warnings. — *Constitution §5*
- [ ] **T068** Keyboard-only pass: skip link, nav, menu, toggle, cards, form; focus never lost. — *Constitution II*
- [ ] **T069** Screen-reader smoke pass (NVDA or VoiceOver) on home + form. — *Constitution II*
- [ ] **T070** Responsive pass at 320 / 768 / 1440; no horizontal scroll; 200% zoom. — *Constitution IV*
- [ ] **T071** Light/dark audit of every component; verify contrast pairs. — *Constitution IX*
- [ ] **T072** Reduced-motion audit: no transforms, no smooth scroll, content intact. — *Constitution II*
- [ ] **T073** axe DevTools scan on `/`, `/projects/khataflow`, contact; fix all serious issues. — *Plan §16*
- [ ] **T074** Lighthouse mobile + desktop ≥ 95 in all categories; fix regressions. — *Constitution III*
- [x] **T075** Verify initial JS < 150 KB gzip from the build output. — *Constitution III*
- [ ] **T076** Negative test: break a frontmatter field in a temp file, confirm a clear build error, then revert. — *AC4.5*
- [ ] **T077** Contact end-to-end test with a real submission. — *AC7.5*
- [ ] **T078** Confirm security headers and absence of console errors/warnings. — *Plan §13*
- [ ] **T079** `npm audit` clean or documented; update vulnerable packages. — *Constitution VIII*

**Gate G8:** Every Definition of Done item passes; screenshots of Lighthouse attached to `docs/05-validation.md`.

---

## G9 — Deploy

- [ ] **T080** Push repository to GitHub under `Muhammad-Abdullah533`. — *Plan §17*
- [ ] **T081** Import to Vercel; add Production + Preview env vars. — *Plan §17*
- [ ] **T082** Production smoke test: home, project page, contact, 404, OG. — *Plan §17*
- [ ] **T083** Lighthouse against the production URL; record results. — *Constitution III*
- [ ] **T084** Defer custom domain; document the step for later. — *A-05*

**Gate G9:** Live URL works end-to-end on mobile and desktop.

---

## G10 — Content Finalization

- [x] **T085** Profile photo unavailable — ship the initials avatar (C-22).
- [x] **T086** Resume omitted — no PDF available, no link rendered (C-21, AC2.4).
- [x] **T087** University and location confirmed: SZABIST, Karachi, Pakistan (C-20).
- [ ] **T088** Add the LinkedIn profile once the owner supplies the URL (C-23).
- [x] **T089** Accounts role period confirmed: June 2024 – Present (C-24).
- [x] **T090** KhataFlow tech tags confirmed: Next.js, Tailwind CSS, Vercel (C-28); no DB/auth claims (C-29).
- [ ] **T091** Add KhataFlow screenshots when supplied; gradient cover until then (C-30).
- [x] **T092** No placeholders to replace — KhataFlow is the only project (C-26).
- [x] **T093** Display name confirmed: "Muhammad Abdullah" (C-09).
- [x] **T094** "Currently learning" confirmed: **AI and Blockchain** course (C-25).
- [x] **T095** Remove every `TODO(content)` marker and verify none remain in the repo. — *Constitution §6*

**Gate G10:** No placeholder content ships publicly; `05-validation.md` signed off.

---

## Commit Plan

One commit per group, build green before each:

| Group | Suggested commit message |
| ----- | ------------------------ |
| G0 | `chore: scaffold next.js app with design tokens` |
| G1 | `feat: add design system primitives and site shell` |
| G2 | `feat: add typed content layer for projects and data` |
| G3 | `feat: add hero, about, skills, and experience sections` |
| G4 | `feat: add project grid and markdown detail pages` |
| G5 | `feat: add cached github activity section` |
| G6 | `feat: add validated contact form with resend delivery` |
| G7 | `feat: add seo metadata, sitemap, og image, and error pages` |
| G8 | `fix: resolve accessibility, responsive, and performance issues` |
| G9 | `chore: configure vercel deployment` |
| G10 | `content: replace placeholders with final portfolio content` |

---

## Approval

- [x] Task breakdown covers every user story, acceptance criterion, and functional requirement.
- [x] Task order respects dependencies (content layer before sections, sections before QA).
- [x] Content finalization is last and explicitly blocks public launch.
- [x] Owner approved implementation to begin after the content TODO section is filled.
