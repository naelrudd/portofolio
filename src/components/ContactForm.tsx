"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const OWNER_EMAIL = "natanaelrudyhadinata@gmail.com";

/**
 * Delivery is configurable per build.
 *
 * With NEXT_PUBLIC_WEB3FORMS_KEY set, the form posts to Web3Forms and stays on
 * the page. Without it, the form hands the composed message to the visitor's
 * mail client, which always works and never depends on a third party being up.
 * Either way a failure offers the same mail-client path, so the form cannot
 * dead-end.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

const fieldClass =
  "w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] transition-colors duration-200 motion-reduce:transition-none focus:border-[var(--moss)] focus:outline-none disabled:opacity-55 disabled:cursor-not-allowed";

function buildMailto(name: string, email: string, message: string) {
  const subject = name ? `Portfolio enquiry from ${name}` : "Portfolio enquiry";
  const body = `${message}\n\n---\n${name}${email ? ` (${email})` : ""}`;
  return `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [mailtoHref, setMailtoHref] = useState(`mailto:${OWNER_EMAIL}`);
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

    // Honeypot and time trap: pretend everything is fine so the bot does not retry.
    if (honeypot || elapsed < 1200) {
      setStatus("sent");
      return;
    }

    const fallback = buildMailto(name, email, message);
    setMailtoHref(fallback);

    if (!ACCESS_KEY) {
      // No relay configured: hand the message straight to the mail client.
      window.location.href = fallback;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio enquiry from ${name || "someone"}`,
          name,
          email,
          message,
          from_name: "portofolio2",
        }),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) {
        throw new Error(result.message || `Request failed with ${response.status}`);
      }
      form.reset();
      setStatus("sent");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "The message could not be delivered."
      );
      setStatus("error");
    }
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
          {ACCESS_KEY
            ? "Thanks, it reached my inbox. I answer within a day."
            : "Your mail app should be open with the message filled in. Send it from there and it reaches my inbox directly."}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <a
            href={mailtoHref}
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
      data-delivery={ACCESS_KEY ? "api" : "mailto"}
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
        <p role="alert" className="mt-4 text-sm text-[var(--rosy)]">
          {error} You can send it by email instead, the message is already filled in.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-lg bg-[var(--text)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition-colors duration-200 motion-reduce:transition-none hover:bg-[var(--moss)] disabled:opacity-55 sm:w-auto"
        >
          {status === "sending" ? "Sending" : "Send message"}
        </button>
        {status === "error" ? (
          <a
            href={mailtoHref}
            className="text-sm font-medium text-[var(--moss)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--rosy)]"
          >
            Send by email instead
          </a>
        ) : (
          <span className="text-xs text-[var(--text-muted)]">
            No account needed. Replies go to the email you enter.
          </span>
        )}
      </div>
    </form>
  );
}
