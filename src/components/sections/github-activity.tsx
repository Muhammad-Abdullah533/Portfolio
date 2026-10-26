import { ExternalLink, Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { GitHubIcon } from "@/components/icons";
import { site } from "@/data/site";
import { getRecentRepos } from "@/lib/github";

export function GitHubActivitySkeleton() {
  return (
    <section
      id="github"
      aria-labelledby="github-title"
      className="border-border bg-surface-2 border-t py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          id="github-title"
          eyebrow="GitHub"
          title="Recent repositories"
          description="Public work, pulled directly from GitHub."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="border-border bg-background h-36 animate-pulse rounded-lg border"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export async function GitHubActivity() {
  const { repos } = await getRecentRepos();
  const hasRepos = repos !== null && repos.length > 0;

  return (
    <section
      id="github"
      aria-labelledby="github-title"
      className="border-border bg-surface-2 border-t py-16 md:py-24"
    >
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="github-title"
              eyebrow="GitHub"
              title="Recent repositories"
              description="Public work, pulled directly from GitHub and refreshed hourly."
            />
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border bg-background hover:border-accent/50 hover:text-accent-text inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors"
            >
              <GitHubIcon className="size-4" />
              View profile
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Reveal>

        {hasRepos ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, index) => (
              <Reveal key={repo.name} delay={index * 0.04}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-border bg-background hover:border-accent/50 flex h-full flex-col rounded-lg border p-5 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-foreground group-hover:text-accent-text font-mono text-sm font-semibold break-all">
                      {repo.name}
                    </h3>
                    <ExternalLink className="text-muted size-4 shrink-0" aria-hidden="true" />
                  </div>

                  <p className="text-muted mt-2 flex-1 text-sm">
                    {repo.description ?? "No description provided."}
                  </p>

                  <div className="text-muted mt-4 flex items-center gap-4 text-xs">
                    {repo.language ? (
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden="true" className="bg-accent-2 size-2 rounded-full" />
                        {repo.language}
                      </span>
                    ) : null}
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3.5" aria-hidden="true" />
                      {repo.stars}
                    </span>
                  </div>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="border-border bg-background text-muted mt-8 rounded-lg border p-6 text-sm">
            Live repository data is unavailable right now.{" "}
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-text font-semibold underline underline-offset-4"
            >
              Open the GitHub profile
            </a>{" "}
            to browse the work.
          </div>
        )}
      </Container>
    </section>
  );
}
