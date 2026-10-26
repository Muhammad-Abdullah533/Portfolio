import Link from "next/link";
import type { MDXComponents } from "mdx/types";

function H2(props: React.ComponentPropsWithoutRef<"h2">) {
  return <h2 className="font-display mt-12 scroll-mt-24 text-2xl font-semibold" {...props} />;
}

function H3(props: React.ComponentPropsWithoutRef<"h3">) {
  return <h3 className="font-display mt-8 scroll-mt-24 text-xl font-semibold" {...props} />;
}

function P(props: React.ComponentPropsWithoutRef<"p">) {
  return <p className="text-muted mt-4 leading-7" {...props} />;
}

function A({ href = "", children, ...props }: React.ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link
        href={href}
        className="text-accent-text hover:text-accent font-medium underline underline-offset-4"
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent-text hover:text-accent font-medium underline underline-offset-4"
      {...props}
    >
      {children}
    </a>
  );
}

function UL(props: React.ComponentPropsWithoutRef<"ul">) {
  return <ul className="text-muted marker:text-accent mt-4 list-disc space-y-2 pl-6" {...props} />;
}

function OL(props: React.ComponentPropsWithoutRef<"ol">) {
  return (
    <ol className="text-muted marker:text-accent mt-4 list-decimal space-y-2 pl-6" {...props} />
  );
}

function LI(props: React.ComponentPropsWithoutRef<"li">) {
  return <li className="leading-7" {...props} />;
}

function Blockquote(props: React.ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="border-accent text-foreground mt-6 border-l-2 pl-5 text-base italic"
      {...props}
    />
  );
}

function Code(props: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className="border-border bg-surface text-foreground rounded-sm border px-1.5 py-0.5 font-mono text-[0.85em]"
      {...props}
    />
  );
}

function Pre(props: React.ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      className="border-border bg-surface mt-6 overflow-x-auto rounded-md border p-4 font-mono text-sm [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  );
}

function HR(props: React.ComponentPropsWithoutRef<"hr">) {
  return <hr className="border-border my-10" {...props} />;
}

function Table(props: React.ComponentPropsWithoutRef<"table">) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  );
}

function TH(props: React.ComponentPropsWithoutRef<"th">) {
  return (
    <th className="border-border text-foreground border-b px-3 py-2 font-semibold" {...props} />
  );
}

function TD(props: React.ComponentPropsWithoutRef<"td">) {
  return <td className="border-border text-muted border-b px-3 py-2" {...props} />;
}

export const mdxComponents: MDXComponents = {
  h2: H2,
  h3: H3,
  p: P,
  a: A,
  ul: UL,
  ol: OL,
  li: LI,
  blockquote: Blockquote,
  code: Code,
  pre: Pre,
  hr: HR,
  table: Table,
  th: TH,
  td: TD,
};
