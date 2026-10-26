import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="border-border bg-surface-2 border-t py-16 md:py-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="skills-title"
            eyebrow="Skills"
            title="What I work with"
            description="The languages and tools I use day to day, plus what I am learning next. No invented proficiency scores."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.06}>
              <div className="border-border bg-background h-full rounded-lg border p-6">
                <h3 className="font-display text-foreground text-lg font-semibold">
                  {group.label}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-muted flex items-center gap-3 text-sm">
                      <span
                        aria-hidden="true"
                        className="bg-accent size-1.5 shrink-0 rounded-full"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
