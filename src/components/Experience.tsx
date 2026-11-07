const entries = [
  {
    role: "Work Scheduler, Kiev Fragrance",
    kind: "Client work",
    period: "2025",
    org: "Universitas Negeri Malang, community service programme (Program Kemitraan Masyarakat)",
    summary:
      "A mobile web application for staff scheduling at a fragrance retailer in Malang, delivered to the business and used by its owner and staff. Built with one other student under Prof. Dr. Ir. Syaad Patmanthara, M.Pd.",
    details: [
      "Automatic shift scheduling for staff who are also active university students, so shifts fit around class hours.",
      "Attendance logging, a monitoring dashboard, and reminder notifications for upcoming shifts.",
      "Handed over on site with a walkthrough session so the owner and staff could run it without support.",
    ],
    evidence: {
      label: "Registered copyright EC002024223931, accepted",
      href: "https://tei.um.ac.id/2025/06/26/optimalisasi-manajemen-pegawai-pada-umkm-kiev-fragrance-melalui-pengembangan-aplikasi-mobile-web-work-scheduler/",
    },
  },
  {
    role: "LLM documentation corpora",
    kind: "Open source",
    period: "2026",
    org: "github.com/naelrudd",
    summary:
      "Machine-readable mirrors of official developer documentation, converted to plain Markdown so retrieval pipelines and coding agents can read them without scraping.",
    details: [
      "Stripe, Midtrans, Xendit, Razorpay, Clerk, pen.dev and Canva documentation, each in its own repository.",
      "Kept as git-pinnable text, so a pipeline can lock a docs version instead of chasing a live site.",
    ],
    evidence: {
      label: "github.com/naelrudd/llm-docs-mirrors",
      href: "https://github.com/naelrudd/llm-docs-mirrors",
    },
  },
];

export function Experience() {
  return (
    <section id="experience" className="border-t border-[var(--border)] py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rosy)]">
            02 <span aria-hidden="true">/</span> Experience
          </p>

          <h2 className="font-[family-name:var(--font-heading)] text-4xl font-medium text-[var(--text)] lg:col-span-5 md:text-5xl">
            Experience
          </h2>
          <p className="max-w-xl text-balance text-[16px] leading-relaxed text-[var(--text-muted)] lg:col-span-6 lg:col-start-7 lg:pt-2">
            Software delivered to a business, and tooling other developers now depend on.
          </p>
        </div>

        <ol className="mt-12 divide-y divide-[var(--border)] border-t border-[var(--border)]">
          {entries.map((entry) => (
            <li key={entry.role} className="grid grid-cols-1 gap-6 py-8 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4">
                <p className="text-xs text-[var(--text-muted)]">{entry.kind}</p>
                <h3 className="mt-2 text-balance font-[family-name:var(--font-heading)] text-xl font-medium text-[var(--text)] md:text-2xl">
                  {entry.role}
                </h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{entry.period}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{entry.org}</p>
              </div>

              <div className="md:col-span-8">
                <p className="max-w-2xl text-sm leading-relaxed text-[var(--text)] md:text-[15px]">
                  {entry.summary}
                </p>
                <ul className="mt-4 max-w-2xl space-y-2">
                  {entry.details.map((line) => (
                    <li
                      key={line}
                      className="border-l-2 border-[var(--border-hover)] pl-4 text-[13px] leading-relaxed text-[var(--text-muted)]"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
                <a
                  href={entry.evidence.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex text-sm font-medium text-[var(--moss)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--text)]"
                >
                  {entry.evidence.label}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
