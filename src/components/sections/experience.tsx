import { Briefcase, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="experience-title"
            eyebrow="Experience"
            title="Work and education"
            description="Two years of accounts work, a live product, and a degree in progress."
          />
        </Reveal>

        <ol className="mt-10 space-y-8">
          {experience.map((entry, index) => (
            <li key={entry.id} className="relative pl-8 sm:pl-10">
              <span
                aria-hidden="true"
                className={cn(
                  "border-border bg-surface text-accent-text absolute top-1 left-0 flex size-7 items-center justify-center rounded-full border",
                  index !== experience.length - 1 &&
                    "after:bg-border after:absolute after:top-7 after:left-1/2 after:h-[calc(100%+1.5rem)] after:w-px after:-translate-x-1/2",
                )}
              >
                {entry.type === "education" ? (
                  <GraduationCap className="size-3.5" />
                ) : (
                  <Briefcase className="size-3.5" />
                )}
              </span>

              <Reveal delay={index * 0.06}>
                <div className="border-border bg-surface rounded-lg border p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-foreground text-lg font-semibold">
                      {entry.title}
                    </h3>
                    <p className="text-muted font-mono text-xs tracking-wide uppercase">
                      {entry.period}
                    </p>
                  </div>
                  <p className="text-accent-text mt-1 text-sm font-medium">{entry.org}</p>
                  <ul className="mt-3 space-y-2">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="text-muted flex gap-3 text-sm">
                        <span
                          aria-hidden="true"
                          className="bg-border mt-2 size-1.5 shrink-0 rounded-full"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
