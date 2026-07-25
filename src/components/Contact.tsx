import type { ReactNode } from "react";

/* ── SVG Icons ── */
const ContactIcon = ({ name }: { name: string }) => {
  const icons: Record<string, string> = {
    email: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
    github: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  };
  const svg = icons[name];
  if (!svg) return null;
  return <span className="text-[var(--moss)]" dangerouslySetInnerHTML={{ __html: svg }} />;
};

export function Contact() {
  return (
    <section id="contact" className="py-32 mt-20 border-t border-[var(--border)]" style={{background: "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-card) 50%, var(--bg-deep) 100%)"}}>
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p className="text-xs text-[var(--moss)] tracking-[0.25em] uppercase mb-4">
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
                { icon: "email", label: "Email", value: "natanaelrudyhadinata@gmail.com", href: "mailto:natanaelrudyhadinata@gmail.com" },
                { icon: "linkedin", label: "LinkedIn", value: "linkedin.com/in/natanaelrudy", href: "https://linkedin.com/in/natanaelrudy/" },
                { icon: "github", label: "GitHub", value: "github.com/naelrudd", href: "https://github.com/naelrudd" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label !== "Email" ? "_blank" : undefined}
                  rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl hover:border-[var(--rosy)] transition-all duration-300 group"
                >
                  <span className="text-[var(--moss)] w-8 flex items-center justify-center">
                    <ContactIcon name={item.icon} />
                  </span>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">{item.label}</p>
                    <p className="text-sm font-medium group-hover:text-[var(--rosy)] transition-colors">{item.value}</p>
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
                className="w-full py-3.5 bg-[var(--rosy)] text-[var(--bg)] font-semibold rounded-xl hover:shadow-lg hover:shadow-[var(--rosy)]/20 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
