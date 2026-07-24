export function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-[var(--border)] bg-[var(--bg-deep)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--moss)] tracking-widest uppercase mb-4">
              Let&apos;s Collaborate
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-4">
              Butuh engineer yang{" "}
              <span className="text-[var(--rosy)]">bisa</span>?
            </h2>
            <p className="text-[var(--text-muted)] mb-8 leading-relaxed max-w-md">
              Gw open untuk project, kolaborasi, atau diskusi soal arsitektur.
              Let&apos;s build something that matters.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: "✉",
                  label: "Email",
                  value: "natanaelrudyhadinata@gmail.com",
                  href: "mailto:natanaelrudyhadinata@gmail.com",
                },
                {
                  icon: "◉",
                  label: "LinkedIn",
                  value: "linkedin.com/in/natanaelrudy",
                  href: "https://linkedin.com/in/natanaelrudy/",
                },
                {
                  icon: "⊚",
                  label: "GitHub",
                  value: "github.com/naelrudd",
                  href: "https://github.com/naelrudd",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label !== "Email" ? "_blank" : undefined}
                  rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl hover:border-[var(--moss)] transition-colors group"
                >
                  <span className="text-xl w-8 text-center">{item.icon}</span>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">{item.label}</p>
                    <p className="text-sm font-medium group-hover:text-[var(--moss)] transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Quick message form placeholder */}
          <div className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-8">
            <h3 className="font-semibold text-lg mb-6">Quick Message</h3>
            <form
              action="https://formsubmit.co/natanaelrudyhadinata@gmail.com"
              method="POST"
              className="space-y-4"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://your-domain.vercel.app" />
              <input
                name="name"
                type="text"
                placeholder="Name"
                required
                className="w-full bg-[var(--bg-deep)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--beige)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--moss)]"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full bg-[var(--bg-deep)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--beige)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--moss)]"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Message..."
                required
                className="w-full bg-[var(--bg-deep)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--beige)] placeholder:text-[var(--text-muted)] resize-none focus:outline-none focus:border-[var(--moss)]"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[var(--moss)] text-[var(--bg)] font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)]">
            © 2026 Natanael Rudy. Built with Next.js + Tailwind.
          </p>
          <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)]">
            DESIGNING SYSTEMS. BUILDING FUTURE.
          </p>
        </div>
      </div>
    </section>
  );
}
