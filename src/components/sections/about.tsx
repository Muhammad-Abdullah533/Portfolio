import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";
import { getInitials } from "@/lib/utils";

const facts = [
  { label: "Accounts experience", value: "2+ years" },
  { label: "BSSE started", value: "2025" },
  { label: "Live product", value: "KhataFlow" },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-border border-t py-16 md:py-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <div className="flex items-center gap-5 lg:flex-col lg:items-start">
              <div
                aria-hidden="true"
                className="from-accent to-accent-2 font-display text-accent-foreground shadow-lift flex size-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-3xl font-bold"
              >
                {getInitials(site.name)}
              </div>
              <div>
                <p className="font-display text-lg font-semibold">{site.name}</p>
                <p className="text-muted mt-1 text-sm">
                  {site.role} · {site.university}
                </p>
                <p className="text-muted text-sm">{site.location}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <SectionHeading
              id="about-title"
              eyebrow="About"
              title="From paper khata to working software"
            />

            <div className="text-muted mt-6 space-y-4 text-base">
              <p>
                I am Muhammad Abdullah, a software engineering student at SZABIST in Karachi. For
                the past two years I have managed accounts for a retail market business, tracking
                ledgers, payments, and balances every single day.
              </p>
              <p>
                That work showed me exactly where paper processes break, so I started building
                software to fix them. KhataFlow, my digital khata, is now used by real businesses. I
                work mainly with Java, C, and Excel, and I am currently studying AI and Blockchain.
              </p>
            </div>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="border-border bg-surface rounded-md border p-4">
                  <dt className="text-muted text-xs font-semibold tracking-wide uppercase">
                    {fact.label}
                  </dt>
                  <dd className="font-display text-foreground mt-1 text-lg font-semibold">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
