import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.name,
    description: study.tagline,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.name} — ${study.tagline}`,
      description: study.lede.slice(0, 180),
      url: `/work/${study.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = caseStudies.filter((s) => s.slug !== study.slug);

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8 lg:px-16">
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] text-lg font-medium text-[var(--text)]"
          >
            Natanael Rudy
          </Link>
          <Link
            href="/#projects"
            className="text-sm text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text)] motion-reduce:transition-none"
          >
            All work
          </Link>
        </div>
      </header>

      <article>
        <div className="mx-auto max-w-7xl px-6 pt-16 md:px-8 md:pt-20 lg:px-16">
          <p className="text-[11px] tracking-[0.14em] uppercase text-[var(--rosy)]">
            Case study
          </p>

          <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h1 className="font-[family-name:var(--font-heading)] text-5xl font-medium leading-[1.05] text-[var(--text)] md:text-6xl">
                {study.name}
              </h1>
              <p className="mt-5 max-w-[24ch] text-balance font-[family-name:var(--font-heading)] text-[24px] leading-[1.25] text-[var(--text)] md:text-[28px]">
                {study.tagline}
              </p>
            </div>

            <dl className="space-y-4 self-start border-t border-[var(--border)] pt-5 text-sm lg:col-span-4 lg:col-start-9">
              {[
                { term: "Role", value: study.role },
                { term: "Period", value: study.period },
                { term: "Status", value: study.status, href: study.live },
              ].map((row) => (
                <div key={row.term}>
                  <dt className="text-[11px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                    {row.term}
                  </dt>
                  <dd className="mt-1 text-[var(--text)]">
                    {row.href ? (
                      <a
                        href={row.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--moss)] underline decoration-[var(--border-hover)] underline-offset-4 transition-colors duration-200 hover:text-[var(--text)] motion-reduce:transition-none"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-10 max-w-2xl text-[16px] leading-[1.75] text-[var(--text-muted)] md:text-[17px]">
            {study.lede}
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
            {study.facts.map((fact) => (
              <div key={fact.label} className="bg-[var(--bg-card)] p-5">
                <dt className="text-[11px] uppercase tracking-[0.1em] text-[var(--rosy)]">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-[13px] leading-snug text-[var(--text)]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto mt-14 max-w-7xl px-6 md:px-8 lg:px-16">
          <figure className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-3 md:p-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--bg-deep)] shadow-[inset_0_0_0_1px_rgba(10,51,35,0.07)] md:aspect-[16/9]">
              <Image
                src={study.cover}
                alt={`${study.name} interface`}
                fill
                sizes="(max-width: 768px) 100vw, 90vw"
                className="object-cover object-left-top"
                priority
              />
            </div>
          </figure>
        </div>

        <div className="mx-auto mt-16 max-w-7xl border-t border-[var(--border)] px-6 md:px-8 lg:px-16">
          {study.sections.map((section, i) => (
            <section
              key={section.heading}
              className="grid grid-cols-1 gap-6 border-b border-[var(--border)] py-12 lg:grid-cols-12 lg:gap-16"
            >
              <div className="lg:col-span-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-[11px] tabular-nums text-[var(--rosy)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-balance font-[family-name:var(--font-heading)] text-[22px] font-medium leading-snug text-[var(--text)] md:text-[26px]">
                    {section.heading}
                  </h2>
                </div>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mb-4 max-w-2xl text-[16px] leading-relaxed text-[var(--text-muted)] last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.table && (
                  <div className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                    {section.table.map((row) => (
                      <div
                        key={row.left}
                        className="grid grid-cols-1 gap-1 py-4 md:grid-cols-2 md:gap-8"
                      >
                        <p className="text-sm font-medium leading-snug text-[var(--text)]">
                          {row.left}
                        </p>
                        <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                          {row.right}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}

          <section className="grid grid-cols-1 gap-6 py-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-balance font-[family-name:var(--font-heading)] text-2xl font-medium leading-snug text-[var(--text)] md:text-[28px]">
                What I would do differently
              </h2>
            </div>
            <ul className="lg:col-span-7 lg:col-start-6">
              {study.differently.map((item) => (
                <li
                  key={item}
                  className="mb-4 max-w-2xl border-l-2 border-[var(--border-hover)] pl-4 text-[16px] leading-relaxed text-[var(--text-muted)] last:mb-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-20 md:px-8 lg:px-16">
          <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--text-muted)]">
              Stack: {study.stack.join(", ")}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/work/${other.slug}`}
                  className="text-sm font-medium text-[var(--moss)] transition-colors duration-200 hover:text-[var(--text)] motion-reduce:transition-none"
                >
                  Next: {other.name}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="text-sm font-medium text-[var(--moss)] transition-colors duration-200 hover:text-[var(--text)] motion-reduce:transition-none"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
