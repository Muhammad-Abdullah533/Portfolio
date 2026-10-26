import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "outline" | "success";

const variants: Record<BadgeVariant, string> = {
  default: "bg-surface text-muted",
  accent: "bg-accent-soft text-accent-text",
  outline: "border border-border text-muted",
  success: "bg-success/10 text-success",
};

export function Badge({
  variant = "default",
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
