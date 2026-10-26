import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60svh] flex-col items-center justify-center py-20 text-center">
      <p className="text-accent-text font-mono text-sm tracking-widest uppercase">404</p>
      <h1 className="type-h2 font-display mt-4 font-bold">This page does not exist</h1>
      <p className="text-muted mt-3 max-w-md">
        The link may be broken, or the page may have moved. Head back to the homepage to keep
        exploring.
      </p>
      <Link href="/" className={buttonStyles({ className: "mt-8" })}>
        Back to homepage
      </Link>
    </Container>
  );
}
