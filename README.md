# Muhammad Abdullah — Portfolio

A personal developer portfolio for Muhammad Abdullah, a software engineering student at SZABIST,
Karachi. Built as a single-page site with a dedicated case study for the live product
[KhataFlow](https://khataflows.vercel.app).

## Stack

- **Framework:** Next.js (App Router, React Server Components)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 with design tokens in `src/app/globals.css`
- **Motion:** Motion (Framer Motion) with `prefers-reduced-motion` respect
- **Content:** Markdown files in `content/projects/` parsed with `gray-matter` and rendered with
  `next-mdx-remote`
- **Validation:** Zod for project frontmatter, contact form, and GitHub API responses
- **Email:** Resend for contact form delivery
- **Hosting:** Vercel

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site runs at `http://localhost:3000`.

### Environment variables

| Variable               | Required | Description                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Yes      | Absolute site URL used for canonical URLs, sitemap, and OG images. |
| `RESEND_API_KEY`       | Yes      | Resend API key used by the contact form route.                     |
| `CONTACT_TO_EMAIL`     | Yes      | Inbox that receives contact form messages.                         |
| `GITHUB_USERNAME`      | No       | GitHub username for the activity section (defaults to the owner).  |
| `GITHUB_TOKEN`         | No       | Optional token to raise the GitHub API rate limit.                 |

The contact route fails with a clear server error if `RESEND_API_KEY` or `CONTACT_TO_EMAIL` is
missing. Everything else on the site still renders without them.

## Scripts

| Command                | Purpose                            |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Start the development server.      |
| `npm run build`        | Production build.                  |
| `npm run start`        | Serve the production build.        |
| `npm run lint`         | Run ESLint.                        |
| `npm run typecheck`    | Run TypeScript with no emit.       |
| `npm run format`       | Format with Prettier.              |
| `npm run format:check` | Verify formatting without writing. |

## Content

### Adding a project

Create `content/projects/<slug>.md` (or `.mdx`). The file name must match the `slug` field.

```yaml
---
title: "Project name"
slug: "project-name"
summary: "One or two sentences, 20–240 characters."
date: "2025-06-01"
tech:
  - "Next.js"
  - "Tailwind CSS"
featured: true
order: 0
liveUrl: "https://example.com"
placeholder: false
draft: false
---
## Overview

Write the case study in Markdown.
```

Allowed frontmatter is validated at build time. Unknown keys, a slug mismatch, or a missing
required field fails the build with the file name and the exact issue.

- `order` controls display order (lower first); ties fall back to newest `date`.
- `featured: false` keeps the project available at `/projects/<slug>` but off the homepage grid.
- `draft: true` removes the project from the build entirely.
- `cover` is optional and must point inside `/images/...`; otherwise a generated gradient cover
  is used.
- `placeholder` marks a sample project; KhataFlow is a real, live product.

### Updating owner details

Identity, links, location, and availability live in `src/data/site.ts`. Skills live in
`src/data/skills.ts`, and the timeline lives in `src/data/experience.ts`.

## Contact route

`POST /api/contact` runs on the Node.js runtime and:

1. Rejects bodies larger than 8 KB.
2. Validates input with Zod.
3. Silently accepts honeypot submissions and forms submitted faster than 1.5 seconds.
4. Rate limits to 5 requests per IP per 10 minutes.
5. Sends the message through Resend to `CONTACT_TO_EMAIL`, with the sender set as `replyTo`.

Rate limiting is in-memory and therefore per server instance. For multi-instance deployments,
swap `src/lib/rate-limit.ts` for a shared store such as Upstash Redis.

## Accessibility and performance

- Semantic landmarks, a skip link, and visible focus rings.
- Theme toggle with `aria-expanded` state on mobile and Escape-to-close.
- Motion is disabled under `prefers-reduced-motion`.
- Accent combinations are chosen to meet WCAG 2.2 AA contrast in both themes.
- GitHub data is fetched with a 5-second timeout and an hourly revalidation; on failure the
  section links to the GitHub profile instead of showing broken content.

## Deployment

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add the environment variables above (set `NEXT_PUBLIC_SITE_URL` to the production URL).
4. Verify the Resend sending domain, or keep the sandbox sender for testing.
5. Deploy.

## Open content items

- LinkedIn profile URL (currently hidden until provided).
- KhataFlow screenshots for the case study cover.

## Project documentation

The specification, plan, and task breakdown live in `docs/`:

- `docs/00-constitution.md`
- `docs/01-spec.md`
- `docs/02-clarifications.md`
- `docs/03-plan.md`
- `docs/04-tasks.md`
