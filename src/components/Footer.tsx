export function Footer() {
  return (
    <footer className="py-8 border-t border-[var(--border)] bg-[var(--bg-deep)]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[var(--text-muted)]">
          {"\u00a9"} 2025 Natanael Rudy. Crafted with Next.js + Tailwind CSS.
        </p>
        <div className="flex items-center gap-6">
          <a href="https://github.com/naelrudd" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--text-muted)] hover:text-[var(--beige)] transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/natanaelrudy/" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--text-muted)] hover:text-[var(--beige)] transition-colors">
            LinkedIn
          </a>
          <a href="mailto:natanaelrudyhadinata@gmail.com" className="text-xs text-[var(--text-muted)] hover:text-[var(--beige)] transition-colors">
            Email
          </a>
        </div>
        <p className="font-[family-name:var(--font-heading)] text-[10px] text-[var(--rosy)] tracking-widest uppercase">
          Designing Systems. Building the Future.
        </p>
      </div>
    </footer>
  );
}
