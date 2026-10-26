import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "border-border bg-surface shadow-card rounded-lg border p-6 transition-colors",
        className,
      )}
    >
      {children}
    </div>
  );
}
