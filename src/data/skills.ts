export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["Java", "C"],
  },
  {
    id: "tools",
    label: "Tools & frameworks",
    items: ["Next.js", "Tailwind CSS", "Microsoft Excel"],
  },
  {
    id: "learning",
    label: "Currently learning",
    items: ["AI and Blockchain"],
  },
];
