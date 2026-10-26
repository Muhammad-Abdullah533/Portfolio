"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { cn } from "@/lib/utils";

type Status =
  { state: "idle" } | { state: "success"; message: string } | { state: "error"; message: string };

const fieldClasses =
  "mt-1.5 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none";

export function ContactForm() {
  const mountedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus({ state: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          company: values.company ?? "",
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });

      const data = (await response.json()) as { ok?: boolean };

      if (!response.ok || !data.ok) {
        setStatus({
          state: "error",
          message:
            "The message could not be sent. Please email me directly at abdullahhhhh533@gmail.com.",
        });
        return;
      }

      reset();
      mountedAt.current = Date.now();
      setStatus({ state: "success", message: "Thanks — your message has been sent." });
    } catch {
      setStatus({
        state: "error",
        message: "Something went wrong. Please email me directly at abdullahhhhh533@gmail.com.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="text-foreground text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(fieldClasses, errors.name && "border-danger")}
          {...register("name")}
        />
        {errors.name ? (
          <p id="name-error" className="text-danger mt-1.5 text-xs">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="text-foreground text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(fieldClasses, errors.email && "border-danger")}
          {...register("email")}
        />
        {errors.email ? (
          <p id="email-error" className="text-danger mt-1.5 text-xs">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="text-foreground text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell me what you are working on..."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(fieldClasses, "resize-y", errors.message && "border-danger")}
          {...register("message")}
        />
        {errors.message ? (
          <p id="message-error" className="text-danger mt-1.5 text-xs">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              Send message
            </>
          )}
        </Button>

        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-sm",
            status.state === "success" && "text-success",
            status.state === "error" && "text-danger",
            status.state === "idle" && "sr-only",
          )}
        >
          {status.state === "idle" ? "" : status.message}
        </p>
      </div>
    </form>
  );
}
