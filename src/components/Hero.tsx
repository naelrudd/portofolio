"use client";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--bg-deep)]/95 backdrop-blur-md border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
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
                className="text-sm font-[family-name:var(--font-mono)] text-[var(--text-muted)] hover:text-[var(--beige)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--moss)] tracking-widest uppercase">
                Hello, I&apos;m
              </p>
              <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl font-bold leading-[1.05]">
                Natanael
                <br />
                <span className="text-[var(--rosy)]">Rudy</span>
              </h1>
              <p className="text-xl text-[var(--text-muted)] font-light max-w-md">
                AI & Fullstack Engineer — building systems that actually work.
              </p>
              <div className="flex gap-4 pt-4">
                <a
                  href="#projects"
                  className="px-6 py-3 bg-[var(--moss)] text-[var(--bg)] font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  View Work
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 border border-[var(--border)] text-[var(--beige)] font-semibold rounded-lg hover:border-[var(--moss)] transition-colors"
                >
                  Get in Touch
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                {[
                  { num: "4+", label: "Projects" },
                  { num: "3+", label: "Years Coding" },
                  { num: "Full", label: "Stack" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-[var(--beige)] font-[family-name:var(--font-mono)]">
                      {stat.num}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Photo */}
            <div className="relative flex justify-center md:justify-end">
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-[var(--moss)] rounded-full blur-[80px] opacity-20 scale-90" />
                <div className="absolute inset-0 bg-[var(--midnight)] rounded-full blur-[60px] opacity-15 scale-95" />
                {/* Photo container */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-[var(--border)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/profile.png"
                    alt="Natanael Rudy"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-2 -right-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-2 shadow-lg">
                  <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--moss)]">
                    ▸ AI + Fullstack
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-[var(--text-muted)] font-[family-name:var(--font-mono)]">
          scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--moss)] to-transparent" />
      </div>
    </section>
  );
}
