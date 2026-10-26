export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-accent-text text-xs font-semibold tracking-[0.2em] uppercase">{eyebrow}</p>
      <h2 id={id} className="font-display type-h2 text-foreground mt-3">
        {title}
      </h2>
      {description ? <p className="text-muted mt-4 text-base">{description}</p> : null}
    </div>
  );
}
