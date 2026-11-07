const channels = [
  {
    label: "Email",
    value: "natanaelrudyhadinata@gmail.com",
    href: "mailto:natanaelrudyhadinata@gmail.com",
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/natanaelrudy",
    href: "https://linkedin.com/in/natanaelrudy/",
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/naelrudd",
    href: "https://github.com/naelrudd",
    external: true,
  },
];

const fieldClass =
  "w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] transition-colors duration-200 motion-reduce:transition-none focus:border-[var(--moss)] focus:outline-none";

export function Contact() {
  return (
    <section id="contact" className="border-t border-[var(--border)] py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-medium text-[var(--text)] md:text-5xl">
              Get in touch
            </h2>
            <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-[var(--text-muted)]">
              Open to full-time and contract roles. The form lands in my inbox.
            </p>

            <dl className="mt-8 divide-y divide-[var(--border)] border-t border-[var(--border)]">
              {channels.map((item) => (
                <div key={item.label} className="grid grid-cols-3 items-baseline gap-4 py-4">
                  <dt className="text-xs text-[var(--text-muted)]">
                    {item.label}
                  </dt>
                  <dd className="col-span-2">
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-[var(--moss)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--rosy)]"
                    >
                      {item.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-7">
            <form
              action="https://formsubmit.co/natanaelrudyhadinata@gmail.com"
              method="POST"
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-deep)] p-6 md:p-8"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_next"
                value="https://portofolio2-steel.vercel.app"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs text-[var(--text-muted)]">
                    Name
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={`mt-2 ${fieldClass}`}
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-[var(--text-muted)]">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={`mt-2 ${fieldClass}`}
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-xs text-[var(--text-muted)]">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className={`mt-2 resize-none ${fieldClass}`}
                />
              </label>
              <button
                type="submit"
                className="mt-6 w-full rounded-lg bg-[var(--text)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition-colors duration-200 motion-reduce:transition-none hover:bg-[var(--moss)] sm:w-auto"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
