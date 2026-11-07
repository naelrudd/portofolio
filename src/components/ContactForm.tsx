"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const OWNER_EMAIL = "natanaelrudyhadinata@gmail.com";
const ENDPOINT = "/api/contact";

const fieldClass =
  "w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] transition-colors duration-200 motion-reduce:transition-none focus:border-[var(--moss)] focus:outline-none disabled:opacity-55 disabled:cursor-not-allowed";

function subjectFor(name: string) {
  return name ? `Portfolio enquiry from ${name}` : "Portfolio enquiry";
}

function bodyFor(name: string, email: string, message: string) {
  return `${message}\n\n---\n${name}${email ? ` (${email})` : ""}`;
}

/** Gmail compose with the message already filled in, no mail client needed. */
function gmailComposeLink(name: string, email: string, message: string) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: OWNER_EMAIL,
    su: subjectFor(name),
    body: bodyFor(name, email, message),
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** Fallback for anyone not signed into Gmail. */
function mailtoLink(name: string, email: string, message: string) {
  const params = new URLSearchParams({
    subject: subjectFor(name),
    body: bodyFor(name, email, message),
  });
  return `mailto:${OWNER_EMAIL}?${params.toString()}`;
}

/**
 * Delivery: POST to /api/contact, a small serverless function that relays the
 * message through Gmail SMTP. If that endpoint fails, the same message is
 * offered as a prefilled Gmail compose tab and a mailto link, so a visitor
 * always has a route through that does not depend on my infrastructure.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState({
    gmail: "",
    mailto: `mailto:${OWNER_EMAIL}`,
  });
  const mountedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  // A bot fills the form instantly. A visitor cannot read and answer this fast.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "sent" || status === "error") {
      statusRef.current?.focus();
    }
  }, [status]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const honeypot = String(data.get("company") ?? "").trim();
    const elapsed = Date.now() - mountedAt.current;

    setFallback({
      gmail: gmailComposeLink(name, email, message),
      mailto: mailtoLink(name, email, message),
    });

    // Honeypot and time trap: pretend everything is fine so the bot does not retry.
    if (honeypot || elapsed < 1200) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    setError("");

    let failure = "";
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!response.ok || !result.ok) {
        failure = result.error || `Delivery failed with ${response.status}`;
      }
    } catch (cause) {
      failure = cause instanceof Error ? cause.message : "The request did not go through.";
    }

    if (!failure) {
      form.reset();
      setStatus("sent");
      return;
    }

    setError(failure);
    setStatus("error");
  }

  if (status === "sent") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-[var(--border)] bg-[var(--bg-deep)] p-6 md:p-8"
      >
        <p className="font-[family-name:var(--font-heading)] text-2xl font-medium text-[var(--text)]">
          Message on its way
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
          Thanks, it reached my inbox. I answer within a day.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <a
            href={fallback.gmail || `mailto:${OWNER_EMAIL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[var(--text)] px-5 py-3 text-sm font-medium text-[var(--bg)] transition-colors duration-200 motion-reduce:transition-none hover:bg-[var(--moss)]"
          >
            Open it again
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm font-medium text-[var(--moss)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--rosy)]"
          >
            Write another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      data-delivery="api"
      className="rounded-lg border border-[var(--border)] bg-[var(--bg-deep)] p-6 md:p-8"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs text-[var(--text-muted)]">Name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            disabled={status === "sending"}
            className={`mt-2 ${fieldClass}`}
          />
        </label>
        <label className="block">
          <span className="text-xs text-[var(--text-muted)]">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={status === "sending"}
            className={`mt-2 ${fieldClass}`}
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-xs text-[var(--text-muted)]">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          disabled={status === "sending"}
          className={`mt-2 resize-none ${fieldClass}`}
        />
      </label>

      {/* Honeypot: off-screen, not announced, never focusable. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <div role="alert" className="mt-4 text-sm text-[var(--rosy)]">
          <p>{error} The message is written, send it one of these ways:</p>
          <p className="mt-2 flex flex-wrap items-center gap-5">
            <a
              href={fallback.gmail}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--moss)] underline underline-offset-4 transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--rosy)]"
            >
              Open in Gmail
            </a>
            <a
              href={fallback.mailto}
              className="font-medium text-[var(--moss)] underline underline-offset-4 transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--rosy)]"
            >
              Open in your mail app
            </a>
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-lg bg-[var(--text)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition-colors duration-200 motion-reduce:transition-none hover:bg-[var(--moss)] disabled:opacity-55 sm:w-auto"
        >
          {status === "sending" ? "Sending" : "Send message"}
        </button>
        <span className="text-xs text-[var(--text-muted)]">
          No account needed. Replies go to the email you enter.
        </span>
      </div>
    </form>
  );
}
