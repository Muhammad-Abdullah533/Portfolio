export type ExperienceEntry = {
  id: string;
  title: string;
  org: string;
  period: string;
  type: "work" | "education";
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "accounts",
    title: "Accounts Professional",
    org: "Retail market business",
    period: "June 2024 — Present",
    type: "work",
    bullets: [
      "Manage customer and vendor accounts, payments, and outstanding balances for a retail business.",
      "Keep daily records accurate and prepare summaries that support day-to-day decisions.",
    ],
  },
  {
    id: "khataflow",
    title: "Developer — KhataFlow",
    org: "Independent project",
    period: "2025 — Present",
    type: "work",
    bullets: [
      "Designed and built a live digital ledger that real businesses use to track customer and vendor balances.",
      "Shipped bills, payments, printable statements, monthly reports, and owner/staff workspaces.",
    ],
  },
  {
    id: "bsse",
    title: "BS Software Engineering",
    org: "SZABIST, Karachi",
    period: "2025 — Present",
    type: "education",
    bullets: [
      "Studying software engineering with coursework in programming, data structures, and systems.",
    ],
  },
];
