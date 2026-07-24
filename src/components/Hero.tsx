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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--bg-deep)]/90 backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <a href="#" className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--moss)]">
            N<span className="text-[var(--rosy)]">.</span>R
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-[family-name:var(--font-mono)] text-[var(--text-muted)] hover:text-[var(--beige)] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-8 text-center lg:text-left flex flex-col justify-center items-center lg:items-start">
              <div>
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--moss)] tracking-[0.25em] uppercase mb-4">
                  Hello, I&apos;m
                </p>
                <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0] tracking-tight">
                  Natanael
                  <br />
                  <span className="text-[var(--rosy)]">Rudy</span>
                </h1>
              </div>
              <p className="text-lg text-[var(--text-muted)] font-light max-w-lg leading-relaxed">
                AI & Fullstack Engineer — building systems that are reliable, scalable, and genuinely useful.
              </p>
              <div className="flex gap-4 justify-center lg:justify-start">
                <a
                  href="#projects"
                  className="px-8 py-3.5 bg-[var(--moss)] text-[var(--bg)] font-semibold rounded-lg hover:bg-[var(--moss-green)] hover:shadow-lg hover:shadow-[var(--moss)]/20 transition-all duration-300"
                >
                  View Work
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3.5 border border-[var(--rosy)] text-[var(--rosy)] font-semibold rounded-lg hover:bg-[var(--rosy)]/10 hover:border-[var(--rosy)] transition-all duration-300"
                >
                  Get in Touch
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-10 pt-4 justify-center lg:justify-start">
                {[
                  { num: "4+", label: "Projects" },
                  { num: "3+", label: "Years Coding" },
                  { num: "Full", label: "Stack" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-[var(--beige)] font-[family-name:var(--font-mono)]">
                      {stat.num}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-widest mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Photo */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Ambient glow */}
                <div className="absolute -inset-8 bg-[var(--moss)] rounded-full blur-[100px] opacity-10" />
                <div className="absolute -inset-4 bg-[var(--midnight)] rounded-full blur-[60px] opacity-15" />
                {/* Photo */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border border-[var(--border)] shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/profile.png"
                    alt="Natanael Rudy"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Badge */}
                <div className="absolute -bottom-1 -right-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-2.5 shadow-xl">
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
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] text-[var(--text-muted)] font-[family-name:var(--font-mono)] tracking-widest uppercase">
          scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[var(--moss)] to-transparent" />
      </div>
    </section>
  );
}
