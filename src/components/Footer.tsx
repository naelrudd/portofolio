export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-8 lg:px-16">
        <p className="text-xs text-[var(--text-muted)]">
          {new Date().getFullYear()} Natanael Rudy. Next.js and Convex.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/naelrudd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--text)]"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/natanaelrudy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--text)]"
          >
            LinkedIn
          </a>
          <a
            href="mailto:natanaelrudyhadinata@gmail.com"
            className="text-xs text-[var(--text-muted)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--text)]"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
