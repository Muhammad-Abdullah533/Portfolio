import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { getFeaturedProjects } from "@/lib/projects";

export function ProjectsSection() {
  const projects = getFeaturedProjects();

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="projects-title"
            eyebrow="Projects"
            title="Work in the real world"
            description="One product, built for a problem I lived with: keeping a business's accounts correct without paper."
          />
        </Reveal>

        {projects.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="border-border bg-surface text-muted mt-10 rounded-lg border border-dashed p-8 text-center text-sm">
            Projects are being updated. Check back soon.
          </div>
        )}
      </Container>
    </section>
  );
}
