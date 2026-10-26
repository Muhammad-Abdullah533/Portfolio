"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonStyles, Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60svh] flex-col items-center justify-center py-20 text-center">
      <p className="text-danger font-mono text-sm tracking-widest uppercase">Error</p>
      <h1 className="type-h2 font-display mt-4 font-bold">Something went wrong</h1>
      <p className="text-muted mt-3 max-w-md">
        An unexpected error stopped this page from loading. You can try again, or head back to the
        homepage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link href="/" className={buttonStyles({ variant: "secondary" })}>
          Back to homepage
        </Link>
      </div>
    </Container>
  );
}
