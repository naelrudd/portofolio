const facts = [
  { label: "Education", value: "Universitas Negeri Malang" },
  { label: "Focus", value: "Convex + Next.js, AI features" },
  { label: "Shipped", value: "4 production applications" },
  { label: "Location", value: "Malang, Indonesia" },
];

export function CVDownload() {
  return (
    <section id="cv" className="border-t border-[var(--border)] py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-medium text-[var(--text)] md:text-5xl">
              Curriculum vitae
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[var(--text-muted)]">
              Two pages: shipped products, the stack behind them, and education.
            </p>
            <a
              href="/cv/Natanael_Rudy_Hadinata_Resume.pdf"
              download
              className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[var(--text)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition-colors duration-200 motion-reduce:transition-none hover:bg-[var(--moss)]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-deep)] p-6">
              <p className="font-[family-name:var(--font-heading)] text-lg font-medium text-[var(--text)]">
                Natanael Rudy Hadinata
              </p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Fullstack engineer
              </p>
              <dl className="mt-5 divide-y divide-[var(--border)] border-t border-[var(--border)]">
                {facts.map((row) => (
                  <div key={row.label} className="grid grid-cols-3 gap-4 py-3">
                    <dt className="text-xs text-[var(--text-muted)]">
                      {row.label}
                    </dt>
                    <dd className="col-span-2 text-sm text-[var(--text)]">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
