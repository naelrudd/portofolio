import { ContactForm } from "@/components/ContactForm";

const channels = [
  {
    label: "Email",
    value: "natanaelrudyhadinata@gmail.com",
    href: "mailto:natanaelrudyhadinata@gmail.com?subject=Portfolio%20enquiry",
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
              Open to full-time and contract roles. Email reaches me fastest.
            </p>
            <a
              href="mailto:natanaelrudyhadinata@gmail.com?subject=Portfolio%20enquiry"
              className="mt-6 inline-flex rounded-lg bg-[var(--text)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition-colors duration-200 motion-reduce:transition-none hover:bg-[var(--moss)]"
            >
              Email me
            </a>

            <dl className="mt-10 divide-y divide-[var(--border)] border-t border-[var(--border)]">
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
                      className="text-sm break-all text-[var(--moss)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--rosy)]"
                    >
                      {item.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
