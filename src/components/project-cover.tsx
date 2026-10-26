import Image from "next/image";
import type { Project } from "@/lib/projects";

export function ProjectCover({ project }: { project: Project }) {
  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt={`${project.title} preview`}
        width={1200}
        height={675}
        sizes="(min-width: 1024px) 600px, 100vw"
        className="border-border aspect-[16/9] w-full border-b object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="border-border from-accent via-accent/80 to-accent-2 relative flex aspect-[16/9] w-full items-end overflow-hidden border-b bg-gradient-to-br p-6"
    >
      <div className="absolute -top-10 -right-6 size-40 rounded-full bg-white/15 blur-2xl" />
      <div className="absolute -bottom-12 -left-8 size-44 rounded-full bg-black/10 blur-2xl" />
      <span className="font-display text-accent-foreground relative text-3xl font-bold tracking-tight sm:text-4xl">
        {project.title}
      </span>
    </div>
  );
}
