import { Mail, MapPin } from "lucide-react";
import { ContactFormLazy } from "@/components/contact-form-lazy";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              id="contact-title"
              eyebrow="Contact"
              title="Let's build something useful"
              description="Have a problem worth solving, an internship opening, or a project in mind? Send a message and I will get back to you."
            />

            <div className="mt-8 space-y-3 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="text-foreground hover:text-accent-text flex items-center gap-3 font-medium transition-colors"
              >
                <span className="border-border bg-surface flex size-9 items-center justify-center rounded-md border">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                {site.email}
              </a>
              <p className="text-muted flex items-center gap-3">
                <span className="border-border bg-surface flex size-9 items-center justify-center rounded-md border">
                  <MapPin className="size-4" aria-hidden="true" />
                </span>
                {site.location}
              </p>
            </div>

            <p className="bg-accent-soft text-accent-text mt-6 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold">
              {site.availability}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="border-border bg-surface rounded-lg border p-6 sm:p-8">
              <ContactFormLazy />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
