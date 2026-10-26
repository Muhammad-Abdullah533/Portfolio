# Specification — Developer Portfolio

**Project:** Muhammad Abdullah — Developer Portfolio
**Version:** 1.1.0 (Approved)
**Phase:** 2 — Specify
**Date:** 2026-10-25
**Approved:** 2026-10-25

> This document defines **what** the portfolio must do and **why**. It contains no
> implementation detail. Every task later created must trace back to a requirement ID here.

---

## 1. Overview

A single-owner personal portfolio website for **Muhammad Abdullah**, a BS Software
Engineering student who also has two years of hands-on accounts experience in a retail
market business. The site must present his skills, sample work, and background clearly,
and must itself demonstrate good engineering (fast, accessible, responsive).

### 1.1 Problem

There is no central place to show his work, skills, and background. Recruiters, teachers,
and potential clients currently have no way to evaluate him beyond a resume or a GitHub
profile.

### 1.2 Goal

A visitor should understand **who he is, what he can build, and how to reach him** within
30 seconds of landing on the page — on any device, in any lighting condition, with or
without a mouse.

### 1.3 Success Metrics

| Metric                            | Target                        |
| --------------------------------- | ----------------------------- |
| Lighthouse (mobile, prod)         | ≥ 95 in all four categories   |
| Visitor can find contact action   | Within 1 scroll / 1 click     |
| Project detail pages reachable    | 100% from project cards       |
| No horizontal scroll              | 320 px → 1920 px              |
| Build fails on invalid content    | Yes (enforced by schema)      |

---

## 2. Audience and Personas

| Persona              | Wants                                              | Cares about                        |
| -------------------- | -------------------------------------------------- | ---------------------------------- |
| **Recruiter**        | Quick scan of skills, education, contact            | Clarity, credibility, resume       |
| **Potential client** | Proof he can build working tools                    | Concrete projects, contact form    |
| **Peer / teacher**   | Code quality, GitHub activity, current learning     | Links to repos, honest skill level |

---

## 3. Scope

### 3.1 In Scope

- Single-page marketing experience with anchored sections: Hero, About, Skills, Projects,
  Experience, GitHub Activity, Contact.
- Project listing plus per-project detail pages.
- Light and dark theme.
- Subtle scroll and entrance motion.
- Working contact form with server-side validation.
- SEO metadata, sitemap, robots, social sharing image.
- Fully responsive, keyboard accessible.

### 3.2 Out of Scope (Non-Goals)

- Blog / articles section.
- CMS admin UI.
- User accounts, authentication, or gated content.
- Multi-language / i18n.
- Analytics dashboards or third-party trackers.
- E-commerce, payments, or booking.
- Resume builder.
- Comments or any user-generated content.

---

## 4. Content Inventory (Owner-Supplied)

| Field              | Value                                                              | Status     |
| ------------------ | ------------------------------------------------------------------ | ---------- |
| Display name       | Muhammad Abdullah                                                  | Supplied   |
| GitHub username    | `Muhammad-Abdullah533`                                             | Supplied   |
| Public email       | `abdullahhhhh533@gmail.com`                                        | Supplied   |
| Primary role       | Software Engineering Student                                       | Supplied   |
| Secondary role     | Accounts Professional (retail market)                              | Supplied   |
| Education          | BS Software Engineering (BSSE), SZABIST Karachi, started 2025       | Supplied   |
| Experience         | 2 years — accounts handling in a market business (June 2024 – Present) | Supplied |
| Skills             | Java, C, Microsoft Excel; currently learning AI and Blockchain       | Supplied   |
| Projects           | **KhataFlow** — live at `khataflows.vercel.app`, used by real businesses | Supplied   |
| Tagline            | "Software engineering student turning everyday business problems into working software." | Supplied (C-01) |
| University name    | SZABIST                                                            | Supplied (C-20) |
| City / country     | Karachi, Pakistan                                                  | Supplied (C-20) |
| Resume PDF         | Not available — link omitted                                       | Supplied (C-21) |
| Other social links | LinkedIn (URL pending)                                             | Supplied (C-23) |
| Profile photo      | Not available — initials avatar                                    | Supplied (C-22) |
| Accent color       | Electric Indigo `#6366F1` (white text on accent)                   | Supplied (C-02) |

### 4.1 Proposed Tagline Options

One will be selected in Phase 3:

1. "Software engineering student turning everyday business problems into working software."
2. "I build simple tools that solve real problems — and I balance the books too."
3. "Learning to engineer software. Already using it to solve real-world problems."

### 4.2 Projects

#### 4.2.1 Real Project — KhataFlow (Flagship)

| Field        | Value                                                          |
| ------------ | -------------------------------------------------------------- |
| Name         | **KhataFlow**                                                  |
| Live URL     | `https://khataflows.vercel.app`                                |
| Type         | Multi-business web app (SaaS) for accounts / ledger management  |
| Status       | **Live** — already helping real businesses manage their accounts |
| Stack        | Next.js (App Router), Tailwind CSS, deployed on Vercel          |
| Source       | `TODO(owner)` — public repository URL, if any                   |
| Placeholder  | No                                                             |

**Description:** A digital khata (ledger) for small businesses in Pakistan. It replaces
paper ledger books with a shared, always-current system where a business can track both
what customers owe and what it owes vendors.

**Capabilities to highlight on the portfolio:**

- Customer ledgers with a running balance per customer (bills, payments, credits).
- Vendor ledgers tracked side by side with customer ledgers.
- Bills, payments, and credit/adjustment entries in PKR — quick mode and itemized mode.
- Printable, A4-ready bills and customer statements carrying the business name.
- Month-over-month reports per customer and vendor.
- Shared workspace with owner/staff roles so a team sees one live ledger.
- Owner-managed onboarding via WhatsApp instead of open sign-up.

**Why it matters:** This is the portfolio's proof of real-world impact. It was built from
first-hand accounts experience and is in active use by businesses, not a tutorial project.
It should be the first project a visitor sees and should be described honestly, without
inflated metrics.

`Resolved (C-28, C-29)`: the live site confirms **Next.js (App Router + RSC), Tailwind CSS,
and Vercel**. Database and auth are not publicly detectable, so the tech tags intentionally
avoid claiming them.

#### 4.2.2 Placeholder Projects

**None.** The owner chose to show only KhataFlow (C-26). The earlier Java ledger idea and the
two filler projects are dropped. The projects section therefore launches with one strong,
real project, and the empty-state behaviour (AC4.6) still guards the layout if that file is
ever removed.

Project frontmatter uses the fields required by the constitution (`title`, `summary`, `date`,
`tech`, `featured`, `slug`) plus optional `liveUrl`, `repoUrl`, `cover`, and `placeholder`.
The `placeholder` flag stays in the schema so future sample entries can be labelled, but no
placeholder content ships in v1.

---

## 5. User Stories and Acceptance Criteria

### US1 — Hero / Landing

> As a first-time visitor, I want to instantly understand who this person is and what they
> do, so that I can decide whether to keep reading.

- **AC1.1** Above the fold, the page shows the display name, role line, and tagline.
- **AC1.2** Two primary actions are visible: **View Projects** (scrolls to the projects
  section) and **Get in Touch** (scrolls to the contact section).
- **AC1.3** GitHub profile and email are available as labelled icon links.
- **AC1.4** There is exactly one `<h1>` on the page, containing the display name.
- **AC1.5** The hero renders correctly at 320 px and 1440 px with no text overflow.
- **AC1.6** Hero content is visible without JavaScript (server-rendered text).

### US2 — About

> As a visitor, I want a short, honest background so that I can judge credibility.

- **AC2.1** The About section contains a 400–600 character bio in first person.
- **AC2.2** The bio mentions the BSSE program at SZABIST (started 2025) and the 2 years of
  accounts experience (from June 2024).
- **AC2.3** A profile image is shown when available; otherwise a generated initials avatar
  is displayed (no broken image icon, no layout shift).
- **AC2.4** A resume download link appears **only** when a resume file exists; otherwise it
  is omitted entirely (no dead link).

### US3 — Skills

> As a recruiter, I want a scannable list of technologies so that I can match requirements.

- **AC3.1** Skills are grouped into at least: **Languages** and **Tools**.
- **AC3.2** Groups render as semantic lists (`<ul>` / `<li>`), not unlabelled divs.
- **AC3.3** No invented proficiency percentages or fake ratings are shown.
- **AC3.4** A "Currently learning" group shows the AI and Blockchain course.
- **AC3.5** Skill data comes from a single typed source file, not hardcoded per component.

### US4 — Projects

> As a potential client or recruiter, I want to browse concrete work and read details.

- **AC4.1** The projects section lists all projects marked `featured` as cards, newest
  first.
- **AC4.2** Each card shows title, summary, tech tags, and at least one link (repository or
  live URL when available).
- **AC4.3** Clicking a card opens `/projects/[slug]` with the full Markdown content
  rendered.
- **AC4.4** Each detail page includes a back link to the projects section and its own
  metadata (title, description).
- **AC4.5** Invalid or missing frontmatter fails the build with a clear error naming the
  offending file.
- **AC4.6** When no projects exist, a friendly empty state is shown instead of an empty grid.
- **AC4.7** Adding a new Markdown file is the only step required to publish a project.
- **AC4.8** KhataFlow is the first project shown and carries a visible **Live** badge.
- **AC4.9** A project with a `liveUrl` shows a "Visit live site" action that opens in a new
  tab with `rel="noopener noreferrer"` and an accessible name stating it opens externally.
- **AC4.10** Projects without a `repoUrl` or `liveUrl` are not rendered as clickable cards
  unless a detail page exists for them.

### US5 — Experience

> As a recruiter, I want a timeline of work and education so that I can see progression.

- **AC5.1** Experience is displayed as a chronological timeline, newest first.
- **AC5.2** Each entry shows role/title, organization, period, and 1–2 short bullet points.
- **AC5.3** Entries include the accounts role (June 2024 – present) and the BSSE education at
  SZABIST (2025 – present).
- **AC5.4** Timeline uses an ordered list structure and remains fully readable with CSS
  animations disabled.
- **AC5.5** Experience data comes from a single typed source file.

### US6 — GitHub Activity

> As a peer, I want to see recent repositories so that I can evaluate real code.

- **AC6.1** The section fetches public repositories for `Muhammad-Abdullah533`.
- **AC6.2** It shows up to 6 repositories sorted by most recently pushed, each with name,
  description (if any), primary language, star count, and a link.
- **AC6.3** Data is cached and revalidated at most hourly.
- **AC6.4** If the API fails or rate-limits, the section shows a graceful message and a
  direct link to the GitHub profile; the page still renders.
- **AC6.5** The section requires no client-side API call and does not push user data to
  third parties.
- **AC6.6** Loading/failure states cause no layout shift.

### US7 — Contact

> As a recruiter or client, I want to send a message without leaving the site.

- **AC7.1** The form has Name, Email, and Message fields with visible labels.
- **AC7.2** Validation runs on both client and server; invalid submissions show inline,
  field-level errors linked via `aria-describedby`.
- **AC7.3** Email format and message length (20–2000 characters) are enforced.
- **AC7.4** A hidden honeypot field and per-IP rate limiting reduce spam.
- **AC7.5** Success and failure results are announced to screen readers via `aria-live`.
- **AC7.6** The owner's public email is always visible as a fallback contact method.
- **AC7.7** No message content is logged to the console or persisted beyond delivery.

---

## 6. Functional Requirements

| ID    | Requirement                                                                 |
| ----- | --------------------------------------------------------------------------- |
| FR-01 | Site is a single-page layout with anchored sections at fixed order.          |
| FR-02 | Header navigation links to every major section and is keyboard operable.    |
| FR-03 | Theme toggle switches light/dark and persists the choice.                   |
| FR-04 | Theme defaults to the OS preference on first visit.                         |
| FR-05 | Projects are sourced from Markdown files and validated at build time.        |
| FR-06 | Project detail pages are statically generated from frontmatter slugs.        |
| FR-07 | GitHub repositories are fetched server-side with hourly revalidation.        |
| FR-08 | Contact requests are validated server-side and delivered by email.          |
| FR-09 | Sitemap, robots file, and per-page metadata are generated automatically.     |
| FR-10 | Unknown routes render a styled 404 page with a link back home.               |

---

## 7. Non-Functional Requirements

All NFRs inherit the project constitution (`docs/00-constitution.md`):

- **Accessibility:** WCAG 2.2 AA; keyboard-first; visible focus; reduced motion honored.
- **Performance:** Lighthouse ≥ 95 all categories; LCP < 2.5 s; CLS < 0.1; INP < 200 ms.
- **Bundle:** initial JS < 150 KB gzip.
- **Responsiveness:** usable from 320 px to 1920 px.
- **Theming:** every component verified in light and dark.
- **Security:** secrets only in environment variables; server-side validation; rate limit.
- **Privacy:** no third-party trackers; no cookies beyond theme preference.
- **Maintainability:** content changes require no component edits; strict TypeScript.

---

## 8. Assumptions and Dependencies

- The GitHub account `Muhammad-Abdullah533` is public and has at least one public repo.
- Email delivery requires a provider account; the choice is made in Phase 3.
- A custom domain is optional; the site must work on a platform-provided domain.
- Project placeholders will be replaced by the owner before public launch.

---

## 9. Open Questions (Phase 3 — Clarify)

**Status:** Questions 2, 4, 5, 6, and 9 are resolved — see `docs/02-clarifications.md`
(C-01, C-02, C-04, C-06, C-08). Questions 1, 3, 7, and 8 are also resolved by C-20…C-23.
Only two non-blocking content items remain open: the LinkedIn URL and KhataFlow screenshots.

| # | Question                                              | Blocks          | Proposed default                          |
| - | ----------------------------------------------------- | --------------- | ----------------------------------------- |
| 1 | Exact display name and spelling?                      | About, Hero     | "Muhammad Abdullah"                       |
| 2 | Which tagline?                                        | Hero            | Option 1                                  |
| 3 | University name and city/country?                     | About, Timeline | Resolved: SZABIST, Karachi (C-20)         |
| 4 | Accent color for the bold & colorful theme?           | Design system   | Resolved: Electric Indigo (C-02)          |
| 5 | Contact delivery: Resend (API key) or Formspree?      | Contact         | Resolved: Resend (C-04)                   |
| 6 | Deployment target: Vercel, Netlify, or GitHub Pages?  | Launch          | Resolved: Vercel (C-06)                   |
| 7 | Is a resume PDF available?                            | About           | Resolved: omitted, no PDF (C-21)          |
| 8 | Other social profiles (LinkedIn, X)?                  | Hero, Contact   | Resolved: LinkedIn only (C-23)            |
| 9 | Are the 3 proposed projects acceptable as placeholders?| Projects        | Resolved: KhataFlow only, no placeholders (C-26) |

---

## 10. Definition of Success for This Phase

This spec is approved when:

- [x] The owner confirms the content inventory in Section 4.
- [x] The owner accepts KhataFlow as the only project (no placeholders) in Section 4.2.
- [x] The owner answers or accepts defaults for all questions in Section 9.
- [x] User stories US1–US7 and their acceptance criteria are accepted as written.
