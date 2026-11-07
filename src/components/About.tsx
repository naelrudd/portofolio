import Image from "next/image";

const spec = [
  { label: "Focus", value: "Convex and Next.js, real-time backends, payment flows" },
  { label: "Also", value: "Local LLM systems, Python tooling, Chrome extensions" },
  { label: "Based in", value: "Malang, Indonesia" },
];

export function About() {
  return (
    <section id="about" className="border-t border-[var(--border)] py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rosy)]">
              01 <span aria-hidden="true">/</span> About
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-medium text-[var(--text)] md:text-5xl">
              How I work
            </h2>
            <div className="mt-6 max-w-xl space-y-5 text-[16px] leading-relaxed text-[var(--text-muted)]">
              <p>
                I build products where AI is a working part, not a demo. The hard part is
                the state, the auth, the payment, and the error path at 2am.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[var(--border)]">
              <Image
                src="/images/profile.webp"
                alt="Natanael Rudy"
                fill
                sizes="(max-width: 1024px) 100vw, 32vw"
                className="object-cover object-[center_20%]"
              />
            </div>

            <dl className="mt-6 divide-y divide-[var(--border)] border-t border-[var(--border)]">
              {spec.map((row) => (
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
    </section>
  );
}
