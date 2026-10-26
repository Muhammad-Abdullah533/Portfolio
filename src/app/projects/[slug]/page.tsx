import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { ProjectCover } from "@/components/project-cover";
import { TechTag } from "@/components/tech-tag";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getProjectBySlug, getProjectSlugs, type Project } from "@/lib/projects";
import { absoluteUrl, formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: absoluteUrl(`/projects/${project.slug}`),
      publishedTime: project.date.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="text-muted flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      <time dateTime={project.date.toISOString()}>{formatDate(project.date)}</time>
      <ul className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li key={tech}>
            <TechTag>{tech}</TechTag>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article className="py-12 md:py-16">
      <Container className="max-w-3xl">
        <Link
          href="/#projects"
          className="text-muted hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to projects
        </Link>

        <header className="mt-8">
          <h1 className="type-h1 font-display text-foreground font-bold">{project.title}</h1>
          <p className="text-muted mt-4 text-lg">{project.summary}</p>
          <div className="mt-6">
            <ProjectMeta project={project} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles()}
              >
                Visit live site
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "secondary" })}
              >
                View source
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        </header>

        <div className="border-border mt-10 overflow-hidden rounded-lg border">
          <ProjectCover project={project} />
        </div>

        <div className="mt-10">
          <MDXRemote
            source={project.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </div>

        <footer className="border-border mt-12 border-t pt-8">
          <Link href="/#contact" className={buttonStyles()}>
            Discuss a project
          </Link>
        </footer>
      </Container>
    </article>
  );
}
