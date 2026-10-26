import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { projectFrontmatterSchema, type ProjectFrontmatter } from "@/lib/schemas";

export type Project = ProjectFrontmatter & {
  content: string;
};

const projectsDirectory = path.join(process.cwd(), "content", "projects");

function isMarkdownFile(fileName: string) {
  return fileName.endsWith(".md") || fileName.endsWith(".mdx");
}

function readProjectFile(fileName: string): Project {
  const filePath = path.join(projectsDirectory, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const parsed = projectFrontmatterSchema.safeParse(data);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid frontmatter in content/projects/${fileName} — ${issues}`);
  }

  const fileSlug = fileName.replace(/\.mdx?$/, "");

  if (parsed.data.slug !== fileSlug) {
    throw new Error(
      `Slug mismatch in content/projects/${fileName} — frontmatter slug "${parsed.data.slug}" must match the file name "${fileSlug}".`,
    );
  }

  return { ...parsed.data, content };
}

export const getAllProjects = cache((): Project[] => {
  if (!fs.existsSync(projectsDirectory)) return [];

  return fs
    .readdirSync(projectsDirectory)
    .filter(isMarkdownFile)
    .map(readProjectFile)
    .filter((project) => !project.draft)
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return b.date.getTime() - a.date.getTime();
    });
});

export const getFeaturedProjects = cache((): Project[] => {
  return getAllProjects().filter((project) => project.featured);
});

export const getProjectSlugs = cache((): string[] => {
  return getAllProjects().map((project) => project.slug);
});

export const getProjectBySlug = cache((slug: string): Project | undefined => {
  return getAllProjects().find((project) => project.slug === slug);
});
