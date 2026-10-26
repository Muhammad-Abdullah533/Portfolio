import "server-only";
import { z } from "zod";
import { githubRepoSchema } from "@/lib/schemas";

export type RepoSummary = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  pushedAt: string;
};

type FetchResult = {
  repos: RepoSummary[] | null;
  reason?: string;
};

export async function getRecentRepos(limit = 6): Promise<FetchResult> {
  const username = process.env.GITHUB_USERNAME ?? "Muhammad-Abdullah533";
  const token = process.env.GITHUB_TOKEN;

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: 3600, tags: ["github"] },
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) {
      return { repos: null, reason: `github_${response.status}` };
    }

    const parsed = z.array(githubRepoSchema).safeParse(await response.json());

    if (!parsed.success) {
      return { repos: null, reason: "invalid_response" };
    }

    const repos = parsed.data
      .filter((repo) => !repo.fork && !repo.archived)
      .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
      .slice(0, limit)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        url: repo.html_url,
        pushedAt: repo.pushed_at,
      }));

    return { repos };
  } catch {
    return { repos: null, reason: "network_error" };
  }
}
