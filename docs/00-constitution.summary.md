# Constitution — Summary (Roman Urdu)

> `docs/00-constitution.md` ka aasaan khulasa. Ye file sirf samajhne ke liye hai;
> asal rules constitution mein hain.

**Version:** 1.0.0 · **Status:** Ratified · **Date:** 2026-10-25

---

## Ye document kya hai?

Constitution project ka **rulebook** hai. Ismein woh bunyadi usool likhe hain jin par poora
portfolio banega. Koi bhi feature, code, ya decision in rules ke khilaf nahi ja sakta.
Agar zaroorat pade to pehle constitution update hoga, phir kaam hoga.

**Maqsad:** Ek fast, accessible, aur visually strong developer portfolio jo recruiters,
clients aur peers ko projects aur experience saaf dikhaye — aur khud site ki quality
engineering ka proof ho.

---

## 10 Core Principles (asal usool)

| #   | Principle                 | Matlab (aasan lafzon mein)                                                        |
| --- | ------------------------- | --------------------------------------------------------------------------------- |
| I   | Spec First, Code Second   | Pehle requirement likho, phir code. Har task ka ID spec se linked hoga.            |
| II  | Accessibility             | WCAG 2.2 AA. Keyboard se sab chalna chahiye, focus dikhna chahiye, alt text lazmi. |
| III | Performance Budget        | Lighthouse har category ≥ 95, LCP < 2.5s, CLS < 0.1, JS < 150 KB.                 |
| IV  | Mobile First              | 320px se 1440px tak kaam kare, koi horizontal scroll nahi, tap target 44px.       |
| V   | Content is Data           | Projects Markdown files mein. Component mein content hardcode nahi hoga.          |
| VI  | Simplicity                | Server Components default, koi bhaari UI kit nahi, sirf custom Tailwind.          |
| VII | Type Safety               | TypeScript strict, koi `any` nahi, har external data Zod se validate.              |
| VIII| Security & Privacy        | Secrets repo mein nahi, contact form par validation + rate limit + honeypot.      |
| IX  | Theming                   | Sirf design tokens, light + dark dono first-class, bold & colorful direction.     |
| X   | Git & Docs Discipline     | Conventional Commits, docs code ke saath update, ek commit = ek logical change.   |

---

## Technical Constraints (kya use hoga)

- **Next.js 15** (App Router) + **TypeScript strict**
- **Tailwind CSS v4** + CSS variables (tokens ke liye)
- **npm** (Windows par `npm.cmd`)
- **lucide-react** icons, **framer-motion** animations, **next-themes** dark mode
- **Markdown + gray-matter + next-mdx-remote** projects ke liye
- **zod** validation, **react-hook-form** contact form ke liye
- **Manfi (prohibited):** jQuery, moment.js, lodash, MUI/Chakra/Bootstrap jaise UI kits,
  30 KB se bara koi dependency (bina justification).

---

## Design Standards (dikhne mein kaisa hoga)

- **Spacing:** sirf 4/8/12/16/24/32/48/64/96 px (Tailwind scale)
- **Type scale:** display, h1, h2, h3, body-lg, body, caption — bas
- **Width:** prose ~65ch, page container max 1200px
- **Radii:** sm 6px, md 12px, lg 20px, full 9999px
- **Color tokens:** `bg`, `surface`, `border`, `text`, `muted`, `accent`,
  `accent-contrast`, `success`, `danger` — har token ki light + dark value
- **Focus ring:** 2px accent outline, 2px offset, har theme mein visible
- **Motion:** 150–300ms, ease-out, reduced-motion par band

---

## Definition of Done (task kab "complete" mana jayega)

Har task ke liye 10 checks:

1. Acceptance criteria poore
2. Lint zero warnings
3. Typecheck pass
4. Build pass
5. Keyboard navigation kaam kare
6. Light + dark dono theme check
7. 320 / 768 / 1440 px par check
8. Console mein koi error/warning nahi
9. Docs update
10. Conventional commit message

---

## Content Rules (likhai ke rules)

- Site ka content sirf **English**
- Lorem ipsum ship nahi hoga; adhoora content `TODO(content): ...` se mark hoga
- Page title format: `Page — Name`
- Meta description 150–160 characters
- Project frontmatter lazmi: `title`, `summary`, `date`, `tech`, `featured`, `slug`
- Placeholder images launch se pehle replace hongi

---

## Workflow (kaam kaise chalega)

7 phases, **order se**, aur har phase owner ki approval ke baad:

1. Constitution ✅ *(ye document)*
2. **Spec** — `01-spec.md` (kya banana hai)
3. **Clarify** — `02-clarifications.md` (sawal aur faisle)
4. **Plan** — `03-plan.md` (technical architecture)
5. **Tasks** — `04-tasks.md` (chhote numbered tasks)
6. **Implement** — code likhna
7. **Validate** — final checklist

Phase ke beech mein naya scope mile to pehle spec mein likha jayega, phir plan update hoga.

---

## Governance (rules badalne ka tareeqa)

- Constitution baqi sab cheezon par haavi hai
- Badlav ke liye: likhit proposal + wajah + affected sections + owner approval
- **MAJOR** = principle hataana/badalna, **MINOR** = naya principle, **PATCH** = wording
- Har change version table mein log hoga

---

## Abhi kya pending hai?

| Cheez            | Kab decide hoga        |
| ---------------- | ---------------------- |
| Accent color     | Phase 3 (Clarify)      |
| Deployment       | Phase 3 (Clarify)      |
| Content (naam, tagline, projects, skills, experience) | Phase 2 (Spec) |
