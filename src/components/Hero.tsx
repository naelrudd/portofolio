"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Tools", href: "#tools" },
  { label: "CV", href: "#cv" },
  { label: "Contact", href: "#contact" },
];

export function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 20%, rgba(131,153,88,0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(211,150,140,0.08), transparent 50%)",
        }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--bg-deep)]/90 backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 h-16 flex items-center justify-between">
          <a
            href="#"
            className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--moss)]"
          >
            N<span className="text-[var(--rosy)]">.</span>R
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--beige)] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--moss)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-[2px] bg-[var(--beige)] transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-[var(--beige)] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-[var(--beige)] transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--bg-deep)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-[family-name:var(--font-heading)] text-[var(--beige)] hover:text-[var(--moss)] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <div className="relative flex-1 flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 w-full py-12 md:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-7 text-center lg:text-left flex flex-col justify-center items-center lg:items-start order-2 lg:order-1">
              <div>
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--moss)] tracking-[0.25em] uppercase mb-4">
                  Hello, I&apos;m
                </p>
                <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight">
                  Natanael
                  <br />
                  <span className="text-[var(--rosy)]">Rudy</span>
                </h1>
              </div>
              <p className="text-base md:text-lg text-[var(--text-muted)] font-light max-w-md leading-relaxed">
                AI & Fullstack Engineer — shipping reliable systems with Convex,
                Next.js, and production AI.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <a
                  href="#projects"
                  className="px-7 py-3.5 bg-[var(--moss)] text-[var(--bg)] font-semibold rounded-xl hover:brightness-110 hover:shadow-lg hover:shadow-[var(--moss)]/25 transition-all duration-300"
                >
                  View Work
                </a>
                <a
                  href="#contact"
                  className="px-7 py-3.5 border border-[var(--rosy)]/70 text-[var(--rosy)] font-semibold rounded-xl hover:bg-[var(--rosy)]/10 hover:border-[var(--rosy)] transition-all duration-300"
                >
                  Get in Touch
                </a>
              </div>

              <div className="flex gap-8 sm:gap-10 pt-2 justify-center lg:justify-start">
                {[
                  { num: "4+", label: "Shipped apps" },
                  { num: "3+", label: "Years coding" },
                  { num: "E2E", label: "Ownership" },
                ].map((stat) => (
                  <div key={stat.label} className="text-left">
                    <div className="text-2xl font-bold text-[var(--beige)] font-[family-name:var(--font-mono)]">
                      {stat.num}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] tracking-widest mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-10 bg-[var(--moss)] rounded-full blur-[90px] opacity-[0.12]" />
                <div className="absolute -inset-4 bg-[var(--deep-green)] rounded-full blur-[50px] opacity-20" />
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full overflow-hidden border border-[var(--border)] shadow-2xl ring-1 ring-[var(--moss)]/20">
                  <Image
                    src="/images/profile.webp"
                    alt="Natanael Rudy"
                    fill
                    priority
                    sizes="(max-width: 768px) 288px, 352px"
                    className="object-cover object-[center_18%]"
                  />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-2.5 shadow-xl backdrop-blur">
                  <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--moss)] whitespace-nowrap">
                    ▸ AI + Fullstack
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] text-[var(--text-muted)] font-[family-name:var(--font-mono)] tracking-widest uppercase">
          scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--moss)] to-transparent" />
      </div>
    </section>
  );
}
