const links = [
  { label: "GitHub", href: "https://github.com/naelrudd" },
  { label: "LinkedIn", href: "https://linkedin.com/in/natanaelrudy/" },
  { label: "Email", href: "mailto:natanaelrudyhadinata@gmail.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-deep)]">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-16">
        <div className="flex flex-col gap-2 pt-12 pb-10 sm:flex-row sm:items-baseline sm:gap-6">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rosy)]">
            Colophon
          </p>
          <p className="max-w-xl text-[13px] leading-relaxed text-[var(--text-muted)]">
            Set in Playfair Display and Inter. Built with Next.js, exported static, served
            from Vercel.
          </p>
        </div>

        <p
          aria-hidden="true"
          className="select-none pb-6 font-[family-name:var(--font-heading)] text-[clamp(2.6rem,11.6vw,10.5rem)] font-medium leading-[0.86] tracking-[-0.05em] text-[var(--text)]"
        >
          Natanael <span className="text-[var(--moss)]">Rudy</span>
        </p>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center md:px-8 lg:px-16">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Natanael Rudy Hadinata. Malang, Indonesia.
          </p>
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-xs text-[var(--text-muted)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--text)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
