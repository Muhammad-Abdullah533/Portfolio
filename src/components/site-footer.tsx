import { Mail } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-border bg-surface-2 border-t">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-display text-base font-semibold">{site.name}</p>
          <p className="text-muted mt-1 text-sm">
            {site.role} · {site.location}
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
          <a
            href={`mailto:${site.email}`}
            className="text-muted hover:text-foreground inline-flex items-center gap-2 transition-colors"
          >
            <Mail className="size-4" aria-hidden="true" />
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground inline-flex items-center gap-2 transition-colors"
          >
            <GitHubIcon className="size-4" />
            GitHub
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>

      <div className="border-border border-t">
        <p className="text-muted mx-auto w-full max-w-[1200px] px-4 py-4 text-xs sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {site.name}. Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
