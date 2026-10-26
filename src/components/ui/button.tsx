import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent/90",
  secondary:
    "border border-border bg-surface text-foreground hover:border-accent/50 hover:bg-accent-soft",
  ghost: "text-foreground hover:bg-surface",
};

export function buttonStyles({
  variant = "primary",
  className,
}: {
  variant?: ButtonVariant;
  className?: string;
} = {}) {
  return cn(base, variants[variant], className);
}

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={buttonStyles({ variant, className })} {...props} />;
}
