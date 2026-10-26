import { z } from "zod";

export const projectFrontmatterSchema = z
  .object({
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
  })
  .strict();

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export const contactFieldsSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters.")
    .max(2000, "Message must be 2000 characters or fewer."),
});

export type ContactFields = z.infer<typeof contactFieldsSchema>;

export const contactFormSchema = contactFieldsSchema.extend({
  company: z.string().max(200).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactSchema = contactFieldsSchema.extend({
  company: z.string().max(200).optional().default(""),
  elapsedMs: z.number().int().nonnegative().max(86_400_000).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const githubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  html_url: z.string().url(),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  pushed_at: z.string(),
  fork: z.boolean(),
  archived: z.boolean(),
});

export type GitHubRepo = z.infer<typeof githubRepoSchema>;
