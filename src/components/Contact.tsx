export function Contact() {
  return (
    <section id="contact" className="py-28 border-t border-[var(--border)] bg-[var(--bg-deep)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left */}
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--moss)] tracking-[0.25em] uppercase mb-4">
              Let&apos;s Collaborate
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-5">
              Get in <span className="text-[var(--rosy)]">Touch</span>
            </h2>
            <p className="text-[var(--text-muted)] mb-8 leading-relaxed max-w-md">
              I am open to project collaborations, consulting opportunities, 
              and technical discussions. Let&apos;s build something meaningful together.
            </p>

            <div className="space-y-3">
              {[
                { icon: "✉", label: "Email", value: "natanaelrudyhadinata@gmail.com", href: "mailto:natanaelrudyhadinata@gmail.com" },
                { icon: "◉", label: "LinkedIn", value: "linkedin.com/in/natanaelrudy", href: "https://linkedin.com/in/natanaelrudy/" },
                { icon: "⊚", label: "GitHub", value: "github.com/naelrudd", href: "https://github.com/naelrudd" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label !== "Email" ? "_blank" : undefined}
                  rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl hover:border-[var(--moss)] transition-all duration-300 group"
                >
                  <span className="text-lg w-8 text-center">{item.icon}</span>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">{item.label}</p>
                    <p className="text-sm font-medium group-hover:text-[var(--moss)] transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-8">
            <h3 className="font-semibold text-lg mb-6">Send a Message</h3>
            <form
              action="https://formsubmit.co/natanaelrudyhadinata@gmail.com"
              method="POST"
              className="space-y-4"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://portofolio2-steel.vercel.app" />
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full bg-[var(--bg-deep)] border border-[var(--border)] rounded-xl px-5 py-3.5 text-sm text-[var(--beige)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--moss)] transition-colors"
              />
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className="w-full bg-[var(--bg-deep)] border border-[var(--border)] rounded-xl px-5 py-3.5 text-sm text-[var(--beige)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--moss)] transition-colors"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                required
                className="w-full bg-[var(--bg-deep)] border border-[var(--border)] rounded-xl px-5 py-3.5 text-sm text-[var(--beige)] placeholder:text-[var(--text-muted)] resize-none focus:outline-none focus:border-[var(--moss)] transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3.5 bg-[var(--moss)] text-[var(--bg)] font-semibold rounded-xl hover:shadow-lg hover:shadow-[var(--moss)]/20 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)]">
            © 2026 Natanael Rudy. Crafted with Next.js + Tailwind CSS.
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-muted)] tracking-widest uppercase">
            Designing Systems. Building the Future.
          </p>
        </div>
      </div>
    </section>
  );
}
