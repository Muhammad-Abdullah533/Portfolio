# Clarifications — Phase 3

**Project:** Muhammad Abdullah — Developer Portfolio
**Version:** 1.0.0
**Phase:** 3 — Clarify
**Date:** 2026-10-25

> Records every ambiguity resolved between the spec and the technical plan. Decisions here
> are binding for the plan and implementation. Anything still unknown is tracked as a
> `TODO(owner)` and must be non-blocking.

---

## 1. Resolved Decisions

| ID    | Question                              | Decision                                                                 | Rationale                                                        |
| ----- | ------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| C-01  | Hero tagline                          | "Software engineering student turning everyday business problems into working software." | Owner selected; matches BSSE + accounts background. |
| C-02  | Accent color                          | **Electric Indigo `#6366F1`** used as the `accent` token                  | Owner selected; strong in both themes.                            |
| C-03  | Accent contrast                       | White text on accent (`#FFFFFF`)                                          | Meets 4.5:1 on `#6366F1`.                                         |
| C-04  | Contact delivery                      | **Resend** via a server API route                                        | Owner selected; free tier (100 emails/day) is sufficient.          |
| C-05  | Contact fallback                      | Public email shown at all times; form failure shows mailto fallback       | No message is lost if the provider is down.                       |
| C-06  | Deployment target                     | **Vercel**                                                               | Best Next.js support; API route + server fetch work natively.      |
| C-07  | Rendering strategy                    | Server-rendered / statically generated; no static export                 | Needed for API route and server-side GitHub fetch.                |
| C-08  | Sample projects                       | KhataFlow (real, live) is the flagship project; 2 placeholder projects remain         | Owner supplied a real project; placeholders only fill the grid.  |
| C-09  | Display name                          | "Muhammad Abdullah"                                                      | Derived from the GitHub handle; owner may correct.                |
| C-10  | Skills scope                          | Java, C, Microsoft Excel only                                            | Supplied by owner; no invented skills.                            |
| C-11  | "Currently learning" group            | Omitted for now                                                          | Requires owner confirmation; avoids fabricated content.            |
| C-12  | Theme behavior                        | Default follows OS preference; user choice persists                      | Standard, privacy-friendly, no tracking.                          |
| C-13  | GitHub data                           | Public REST API, server-side, revalidate 1 hour, max 6 repos             | No token required; optional token supported for rate limits.       |
| C-14  | GitHub failure behavior               | Section degrades to a profile link with a short note                     | Page must never break because of a third-party outage.            |
| C-15  | Experience timeline order             | Newest first                                                             | Recruiter-friendly scanning.                                      |
| C-16  | Flagship project                      | **KhataFlow** — `https://khataflows.vercel.app` — is a real, live project used by businesses | Owner confirmed; it is the portfolio's strongest proof of impact. |
| C-17  | Project presentation order            | KhataFlow is always first (`featured: true`, `order: 0`)                 | Real work must lead.                                              |
| C-18  | Live project link behavior            | Opens in a new tab with `rel="noopener noreferrer"` and an "opens externally" note | Security + usability.                                             |
| C-19  | Dropped sample project                | Java "Accounts Ledger Manager" is removed from the plan                  | KhataFlow supersedes it.                                          |
| C-20  | University and location               | **SZABIST, Karachi, Pakistan**                                           | Owner supplied.                                                   |
| C-21  | Resume                                | **Omitted** — no PDF available                                           | No dead link; AC2.4 keeps it conditional.                         |
| C-22  | Profile photo                         | **Not available** — use a generated initials avatar                      | AC2.3 fallback path is the launch path.                           |
| C-23  | Social profiles                       | **LinkedIn** only (URL pending from owner)                               | GitHub + email already present.                                   |
| C-24  | Accounts role period                  | **June 2024 – Present** (~2 years)                                       | Owner supplied exact start.                                       |
| C-25  | Currently learning                    | **AI and Blockchain** course (name confirmed)                            | Rendered as its own skills group.                                 |
| C-26  | Project list                          | **KhataFlow only** — no placeholder projects ship                        | Owner chose "show only KhataFlow"; keeps the portfolio honest.    |
| C-27  | KhataFlow public repository           | **None / private** — live link only                                      | No `repoUrl` in frontmatter.                                      |
| C-28  | KhataFlow technology (verified)       | **Next.js (App Router + RSC), Tailwind CSS, Vercel**                     | Confirmed from response headers + CSS markers on the live site.   |
| C-29  | KhataFlow database/auth               | Not publicly detectable — **do not claim any**                           | Tech tags stay limited to verified technologies.                  |
| C-30  | KhataFlow screenshots                 | Pending — deterministic gradient cover until supplied                    | Avoids a broken or empty project card.                            |

---

## 2. Assumptions

| ID   | Assumption                                                                    | If false                              |
| ---- | ----------------------------------------------------------------------------- | ------------------------------------- |
| A-01 | GitHub account `Muhammad-Abdullah533` has at least one public repository.     | Show profile link + empty-state note. |
| A-02 | Owner can create a free Resend account and verify a sending domain/email.     | Switch to Formspree or mailto-only.    |
| A-03 | Accounts role started June 2024 and is ongoing.                               | Owner corrects the period.            |
| A-04 | BSSE started in 2025 and is ongoing.                                          | Owner corrects the period.            |
| A-05 | No custom domain is required for launch.                                      | Add domain later in Vercel settings.  |

---

## 3. Environment Variables Required

| Variable              | Required | Purpose                                        |
| --------------------- | -------- | ---------------------------------------------- |
| `RESEND_API_KEY`      | Yes      | Server-side email delivery.                    |
| `CONTACT_TO_EMAIL`    | Yes      | Destination inbox for contact messages.        |
| `NEXT_PUBLIC_SITE_URL`| Yes      | Absolute URLs for metadata, sitemap, OG image. |
| `GITHUB_TOKEN`        | No       | Raises GitHub API rate limit if provided.      |
| `GITHUB_USERNAME`     | No       | Defaults to `Muhammad-Abdullah533`.            |

A `.env.example` will document all keys. No secret is committed.

---

## 4. Content Decisions and Remaining TODOs

Resolved with the owner on 2026-10-25.

| ID   | Item                    | Resolution                                                        | Status |
| ---- | ----------------------- | ----------------------------------------------------------------- | ------ |
| T-01 | University name         | **SZABIST**                                                       | Resolved |
| T-02 | City / country          | **Karachi, Pakistan**                                             | Resolved |
| T-03 | Resume PDF              | **Omitted** — no file available                                    | Resolved |
| T-04 | Other social profiles   | **LinkedIn only** — URL still pending                              | Partial |
| T-05 | Profile photo           | **Initials avatar** until a photo is supplied                      | Resolved |
| T-06 | Project repositories    | KhataFlow is **private**; placeholder projects dropped             | Resolved |
| T-07 | Accounts period         | **June 2024 – Present**                                            | Resolved |
| T-08 | Display name            | **"Muhammad Abdullah"** confirmed                                  | Resolved |
| T-09 | Currently learning      | **AI and Blockchain** course                                       | Resolved |
| T-10 | KhataFlow technical     | **Next.js, Tailwind CSS, Vercel** verified; DB/auth not public     | Partial |
| T-11 | KhataFlow screenshots   | Pending — deterministic gradient cover used until supplied         | Open |
| T-12 | LinkedIn URL            | Pending                                                            | Open |
| T-13 | AI course details       | **AI and Blockchain**                                              | Resolved |

Only T-04 (LinkedIn URL) and T-11 (screenshots) remain open. Neither blocks implementation;
each has a defined fallback (omit link / gradient cover).

---

## 5. Deferred to Phase 4 (Plan)

- Design-token values, typography choices, and accent usage rules.
- Component boundaries and file layout.
- Data schemas for projects, skills, and experience.
- Motion strategy and reduced-motion handling.
- SEO/OG image generation approach.
- Rate-limiting implementation for the contact route.

---

## 6. Spec Impact

- `docs/01-spec.md` Section 4 updated with the chosen tagline, accent color, and KhataFlow.
- `docs/01-spec.md` Section 4.2 rewritten: KhataFlow is the flagship real project; all
  placeholder projects are dropped (C-26).
- `docs/01-spec.md` US4 gained AC4.8–AC4.10 for the live project badge and external links.
- `docs/01-spec.md` Section 9 questions 2, 4, 5, 6, and 9 marked resolved by C-01, C-02,
  C-04, C-06, and C-08.
- Content inventory updated with SZABIST, Karachi, LinkedIn, initials avatar, AI and Blockchain
  course, June 2024 start, and a single real project (v1.1.0).
