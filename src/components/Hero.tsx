"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about", index: "01" },
  { label: "Experience", href: "#experience", index: "02" },
  { label: "Work", href: "#projects", index: "03" },
  { label: "Stack", href: "#stack", index: "04" },
  { label: "CV", href: "#cv", index: "05" },
  { label: "Contact", href: "#contact", index: "06" },
];

const facts = [
  { label: "Now", value: "Thesis on LLM-driven NPCs in a Unity RPG" },
  { label: "Stack", value: "Convex, Next.js, Clerk, Midtrans" },
  { label: "Open to", value: "Full-time and contract roles, flexible on hours" },
];

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());

    setTime(format());
    const id = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums text-[var(--text-muted)]">
      Malang, ID <span aria-hidden="true">/</span> {time ?? "--:--"} WIB
    </span>
  );
}

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
    <section className="flex min-h-[100svh] flex-col">
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
            aria-hidden={!scrolled}
            tabIndex={scrolled ? 0 : -1}
            className={`font-[family-name:var(--font-heading)] text-lg font-medium text-[var(--text)] transition-opacity duration-300 motion-reduce:transition-none ${
              scrolled ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            Natanael Rudy
          </a>

          <div className="hidden items-baseline gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex items-baseline gap-1.5 text-[13px] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text)] motion-reduce:transition-none"
              >
                <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--text-muted)] transition-colors duration-200 group-hover:text-[var(--rosy)] motion-reduce:transition-none">
                  {link.index}
                </span>
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] lg:block">
            <LocalTime />
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
        <div className="fixed inset-0 z-40 flex flex-col bg-[var(--bg)] px-6 pt-24 pb-10 md:hidden">
          <nav aria-label="Sections">
            <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.16em] text-[var(--rosy)]">
                      {link.index}
                    </span>
                    <span className="font-[family-name:var(--font-heading)] text-[28px] font-medium leading-none text-[var(--text)]">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto space-y-3 pt-10">
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
              <LocalTime />
            </p>
            <a
              href="mailto:natanaelrudyhadinata@gmail.com?subject=Portfolio%20enquiry"
              className="block break-all text-sm text-[var(--moss)]"
            >
              natanaelrudyhadinata@gmail.com
            </a>
            <a
              href="https://github.com/naelrudd"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-[var(--moss)]"
            >
              github.com/naelrudd
            </a>
          </div>
        </div>
      )}

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-6 pt-28 pb-10 md:px-8 lg:px-16 lg:pt-32">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-[var(--border)] pb-4 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)] md:text-[11px]">
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--deep-green)] motion-safe:animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--deep-green)]" />
              </span>
              Open to work
            </span>
            <span className="hidden sm:block">
              Portfolio <span aria-hidden="true">/</span> 2026
            </span>
            <span>
              Fullstack <span aria-hidden="true">/</span> AI features
            </span>
          </div>

          <h1 className="mt-7 font-[family-name:var(--font-heading)] text-[clamp(2.9rem,12.4vw,11.5rem)] font-medium leading-[0.9] tracking-[-0.045em] text-[var(--text)]">
            Natanael <span className="text-[var(--moss)]">Rudy</span>
          </h1>

          <div className="mt-9 grid grid-cols-1 items-start gap-10 border-t border-[var(--border)] pt-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="max-w-md text-balance text-[19px] leading-[1.5] text-[var(--text)] md:text-[21px]">
                I build marketplaces and AI features that run in production, not
                demos. The interesting part is the state, the payment, and the error
                path at 2am.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 border-b border-[var(--border-strong)] pb-1 text-sm font-medium text-[var(--text)] transition-colors duration-200 hover:border-[var(--rosy)] hover:text-[var(--rosy)] motion-reduce:transition-none"
                >
                  View work
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    &#8594;
                  </span>
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-medium text-[var(--text-muted)] transition-colors duration-200 hover:border-[var(--border-strong)] hover:text-[var(--text)] motion-reduce:transition-none"
                >
                  Get in touch
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    &#8594;
                  </span>
                </a>
              </div>
            </div>

            <figure className="lg:col-span-6 lg:col-start-7">
              <a
                href="/work/kanvashub"
                className="group block overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-card)] transition-colors duration-200 hover:border-[var(--border-hover)] motion-reduce:transition-none"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[var(--border)]">
                  <Image
                    src="/screenshots/kanvashub.webp"
                    alt="KanvasHub marketplace, a live product built with Convex and Midtrans"
                    fill
                    priority
                    fetchPriority="high"
                    loading="eager"
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <figcaption className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] md:text-[11px]">
                  <span className="text-[var(--text)]">
                    Featured <span aria-hidden="true">/</span> KanvasHub
                  </span>
                  <span className="text-[var(--text-muted)] transition-colors duration-200 group-hover:text-[var(--rosy)] motion-reduce:transition-none">
                    Case study &#8594;
                  </span>
                </figcaption>
              </a>
            </figure>
          </div>
        </div>

        <div className="mt-14 lg:mt-20">
          <dl className="grid grid-cols-1 gap-6 border-t border-[var(--border)] pt-6 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--rosy)]">
                  {fact.label}
                </dt>
                <dd className="mt-2 max-w-xs text-sm leading-snug text-[var(--text)]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
