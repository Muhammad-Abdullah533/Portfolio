import { cn } from "@/lib/utils";

export function TechTag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "border-border bg-background text-muted inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}
