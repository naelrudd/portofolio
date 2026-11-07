"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "CV", href: "#cv" },
  { label: "Contact", href: "#contact" },
];

const facts = [
  { label: "Now", value: "Thesis on LLM-driven NPCs in a Unity RPG" },
  { label: "Stack", value: "Convex, Next.js, Clerk, Midtrans" },
  { label: "Open to", value: "Full-time and contract roles, flexible on hours" },
];

export function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <section className="flex flex-col">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 motion-reduce:transition-none ${
          scrolled
            ? "bg-[var(--bg)]/95 border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8 lg:px-16">
          <a
            href="#"
            className="font-[family-name:var(--font-heading)] text-lg font-medium text-[var(--text)]"
          >
            Natanael Rudy
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text)] motion-reduce:transition-none"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-[2px] w-5 bg-[var(--text)] transition-transform duration-200 motion-reduce:transition-none ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-[var(--text)] transition-opacity duration-200 motion-reduce:transition-none ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-[var(--text)] transition-transform duration-200 motion-reduce:transition-none ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[var(--bg)] md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-[family-name:var(--font-heading)] text-2xl text-[var(--text)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <div className="mx-auto flex w-full max-w-7xl flex-col px-6 pt-28 pb-14 md:px-8 lg:min-h-[100svh] lg:justify-between lg:px-16 lg:pt-28">
        <div className="mt-8 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h1 className="font-[family-name:var(--font-heading)] text-5xl leading-[0.98] font-medium text-[var(--text)] sm:text-6xl lg:text-[5.5rem]">
              Natanael Rudy
            </h1>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[var(--text-muted)]">
              Fullstack engineer building marketplaces and AI features that run in
              production.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href="#projects"
                className="rounded-lg bg-[var(--text)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition-colors duration-200 hover:bg-[var(--moss)] motion-reduce:transition-none"
              >
                View work
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-[var(--moss)] transition-colors duration-200 hover:text-[var(--rosy)] motion-reduce:transition-none"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-card)]">
              <div className="relative aspect-[16/10] w-full border-b border-[var(--border)]">
                <Image
                  src="/screenshots/kanvashub.webp"
                  alt="KanvaHub marketplace, a live product built with Convex and Midtrans"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 text-xs">
                <span className="text-[var(--text)]">KanvaHub</span>
                <span className="text-[var(--text-muted)]">
                  Live, on Convex and Midtrans
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-6 lg:mt-0 border-t border-[var(--border)] pt-6 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs text-[var(--text-muted)]">
                {fact.label}
              </dt>
              <dd className="mt-2 text-sm text-[var(--text)]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
