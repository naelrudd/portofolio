export function About() {
  return (
    <section id="about" className="py-24 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left: Section label */}
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--moss)] tracking-widest uppercase mb-4">
              About Me
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-4">
              Siapa <span className="text-[var(--rosy)]">gw</span>
            </h2>
            <div className="w-16 h-[2px] bg-[var(--moss)]" />
          </div>

          {/* Center: Bio */}
          <div className="space-y-6">
            <p className="text-[var(--text-muted)] leading-relaxed">
              Fullstack engineer yang spesialis integrasiin AI ke produk nyata.
              Dari backend real-time sampe UX yang intuitive — satu orang, full stack.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Gw percaya AI engineer harusnya generalis yang bisa spesialis —
              ambil yang terbaik dari berbagai discipline, apply ke masalah nyata.
              Bukan cuma bisa panggil API, tapi ngerti arsitektur, UX, dan deployment end-to-end.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Suka bikin tools yang beneran dipake, bukan cuma demo. Kalau ada masalah,
              gw cari cara solve pakai tech yang paling cocok — biasanya Convex + Next.js.
            </p>
          </div>

          {/* Right: Quick facts */}
          <div className="space-y-6">
            {[
              {
                icon: "◆",
                title: "Spesialisasi",
                desc: "Convex + Next.js ecosystem. Real-time backend, auth, payments.",
              },
              {
                icon: "◆",
                title: "Philosophy",
                desc: "Bikin yang beneran dipake, bukan yang keliatan bagus doang.",
              },
              {
                icon: "◆",
                title: "Approach",
                desc: "Full stack ownership — design, build, deploy, maintain.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[var(--moss)]">{item.icon}</span>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                </div>
                <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
