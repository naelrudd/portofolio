export function CVDownload() {
  return (
    <section id="cv" className="py-28 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left */}
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--moss)] tracking-[0.25em] uppercase mb-4">
              Resume
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-5">
              Download <span className="text-[var(--rosy)]">CV</span>
            </h2>
            <p className="text-[var(--text-muted)] mb-8 leading-relaxed max-w-md">
              For a detailed overview of my experience, technical skills, and educational background, 
              please download my resume. Last updated July 2026.
            </p>
            <a
              href="/cv/Natanael_Rudy_Hadinata_Resume.pdf"
              download
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--moss)] text-[var(--bg)] font-semibold rounded-xl hover:shadow-lg hover:shadow-[var(--moss)]/20 transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>
          </div>

          {/* Right: Preview card */}
          <div className="relative">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--moss)]/5 rounded-full blur-[50px]" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--rosy)]/5 rounded-full blur-[40px]" />

              <div className="relative space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[var(--moss)]/15 flex items-center justify-center border border-[var(--moss)]/20">
                    <span className="text-[var(--moss)] font-bold text-lg font-[family-name:var(--font-mono)]">NR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Natanael Rudy Hadinata</p>
                    <p className="text-sm text-[var(--text-muted)]">AI & Fullstack Engineer</p>
                  </div>
                </div>

                <div className="border-t border-[var(--border)] pt-5 space-y-3.5">
                  {[
                    { label: "Education", value: "Computer Science" },
                    { label: "Focus", value: "Convex + Next.js + AI" },
                    { label: "Projects", value: "4+ Production Applications" },
                    { label: "Location", value: "Indonesia" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span className="text-[var(--text-muted)]">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
