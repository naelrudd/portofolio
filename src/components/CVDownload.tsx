export function CVDownload() {
  return (
    <section id="cv" className="py-24 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--moss)] tracking-widest uppercase mb-4">
              Resume
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-4">
              Download <span className="text-[var(--rosy)]">CV</span>
            </h2>
            <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
              Mau tau lebih detail soal experience, skills, dan education?
              Download CV gw langsung. Updated terakhir 2026.
            </p>
            <a
              href="/cv/Natanael_Rudy_Hadinata_Resume.pdf"
              download
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--moss)] text-[var(--bg)] font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--moss)]/10 rounded-full blur-[40px]" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--rosy)]/10 rounded-full blur-[30px]" />

              <div className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[var(--moss)]/20 flex items-center justify-center">
                    <span className="text-[var(--moss)] font-bold text-lg">NR</span>
                  </div>
                  <div>
                    <p className="font-semibold">Natanael Rudy Hadinata</p>
                    <p className="text-xs text-[var(--text-muted)]">AI & Fullstack Engineer</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[var(--border)]">
                  {[
                    { label: "Education", value: "Computer Science" },
                    { label: "Focus", value: "Convex + Next.js + AI" },
                    { label: "Experience", value: "4+ Production Projects" },
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
