import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  keywords: [
    "Muhammad Abdullah",
    "software engineering student",
    "portfolio",
    "Karachi",
    "SZABIST",
    "Java",
    "C",
    "Next.js",
    "KhataFlow",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: site.name,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      url: absoluteUrl("/"),
      sameAs: [site.github],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karachi",
        addressCountry: "PK",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: site.university,
      },
      knowsAbout: ["Java", "C", "Microsoft Excel", "Next.js", "Tailwind CSS"],
    },
    {
      "@type": "WebSite",
      name: `${site.name} — Portfolio`,
      url: absoluteUrl("/"),
      author: { "@type": "Person", name: site.name },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-background text-foreground min-h-dvh font-sans antialiased`}
      >
        <Providers>
          <SkipLink />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
