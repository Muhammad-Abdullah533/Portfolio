import "server-only";
import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required."),
  CONTACT_TO_EMAIL: z.string().email("CONTACT_TO_EMAIL must be a valid email."),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  GITHUB_USERNAME: z.string().min(1).default("Muhammad-Abdullah533"),
  GITHUB_TOKEN: z.string().min(1).optional(),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (cachedEnv) return cachedEnv;

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid environment variables — ${details}`);
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}
