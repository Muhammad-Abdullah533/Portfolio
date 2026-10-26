import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProjectCover } from "@/components/project-cover";
import { TechTag } from "@/components/tech-tag";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-border bg-surface shadow-card hover:border-accent/40 flex flex-col overflow-hidden rounded-lg border transition-colors">
      <ProjectCover project={project} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.liveUrl ? (
            <Badge variant="success">
              <span aria-hidden="true" className="bg-success size-1.5 rounded-full" />
              Live
            </Badge>
          ) : null}
          {project.placeholder ? <Badge variant="outline">Sample project</Badge> : null}
        </div>

        <h3 className="font-display text-foreground mt-3 text-2xl font-semibold">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent-text">
            {project.title}
          </Link>
        </h3>

        <p className="text-muted mt-2 flex-1 text-sm">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech}>
              <TechTag>{tech}</TechTag>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="text-accent-text inline-flex items-center gap-1.5 hover:underline hover:underline-offset-4"
          >
            Read case study
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              Live site
              <ExternalLink className="size-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
