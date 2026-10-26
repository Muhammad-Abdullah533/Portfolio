"use client";

import dynamic from "next/dynamic";

const ContactForm = dynamic(
  () => import("@/components/contact-form").then((module) => module.ContactForm),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-5" aria-hidden="true">
        <div className="bg-background h-16 animate-pulse rounded-md" />
        <div className="bg-background h-16 animate-pulse rounded-md" />
        <div className="bg-background h-32 animate-pulse rounded-md" />
        <div className="bg-background h-11 w-36 animate-pulse rounded-md" />
      </div>
    ),
  },
);

export function ContactFormLazy() {
  return <ContactForm />;
}
