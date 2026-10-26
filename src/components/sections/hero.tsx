import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-drift bg-accent/25 dark:bg-accent/20 absolute -top-40 -left-32 size-[34rem] rounded-full blur-3xl" />
        <div className="animate-drift bg-accent-2/20 absolute top-24 -right-24 size-[28rem] rounded-full blur-3xl" />
      </div>

      <Container className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-center py-20">
        <p className="animate-rise text-accent-text text-sm font-semibold tracking-[0.18em] uppercase">
          {site.role} · {site.secondaryRole}
        </p>

        <h1
          id="hero-title"
          className="animate-rise font-display type-display text-foreground mt-4 max-w-4xl"
          style={{ animationDelay: "80ms" }}
        >
          {site.name}
        </h1>

        <p
          className="animate-rise text-muted mt-6 max-w-2xl text-lg sm:text-xl"
          style={{ animationDelay: "160ms" }}
        >
          {site.tagline}
        </p>

        <div
          className="animate-rise mt-10 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Link href="/#projects" className={buttonStyles()}>
            View projects
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href="/#contact" className={buttonStyles({ variant: "secondary" })}>
            Get in touch
          </Link>
        </div>

        <div
          className="animate-rise mt-10 flex flex-wrap items-center gap-3 text-sm"
          style={{ animationDelay: "320ms" }}
        >
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border bg-surface text-foreground hover:border-accent/50 hover:text-accent-text inline-flex items-center gap-2 rounded-md border px-4 py-2.5 font-medium transition-colors"
          >
            <GitHubIcon className="size-4" />
            GitHub
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="border-border bg-surface text-foreground hover:border-accent/50 hover:text-accent-text inline-flex items-center gap-2 rounded-md border px-4 py-2.5 font-medium transition-colors"
          >
            <Mail className="size-4" aria-hidden="true" />
            Email me
          </a>
          <span className="text-muted inline-flex items-center gap-2 px-1">
            <MapPin className="size-4" aria-hidden="true" />
            {site.location}
          </span>
        </div>
      </Container>
    </section>
  );
}
