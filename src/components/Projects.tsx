import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    name: "KanvaHub",
    status: "Live",
    desc: "Marketplace for digital templates and services. Convex backend, Midtrans payments, Clerk auth, seller and buyer flows.",
    challenge:
      "Keeping payment and fulfillment honest when inventory, orders, and reviews change in real time on a live marketplace.",
    tags: ["Next.js", "Convex", "Clerk", "Midtrans"],
    screenshot: "/screenshots/kanvashub.webp",
    href: null,
    live: "https://kanvashub.id",
    caseStudy: "/work/kanvashub",
  },
  {
    name: "NgopiKos",
    status: "Live",
    desc: "Boarding-house marketplace for Malang. Owner chat, Midtrans payments, live Convex sync, no middleman fees.",
    challenge:
      "Pairing a paid feature with real-time state while inventory and chat move at the same time.",
    tags: ["Convex", "Clerk", "Midtrans", "Marketplace"],
    screenshot: "/screenshots/ngopikos.webp",
    href: null,
    live: "https://ngopikos.my.id",
    caseStudy: "/work/ngopikos",
  },
  {
    name: "MoveVerse",
    status: "Shipped",
    desc: "Gamified PE platform for elementary schools, with dashboards for students, teachers, and parents.",
    challenge:
      "Balancing XP thresholds across five tiers so progression stays motivating instead of grindy.",
    tags: ["Next.js", "Convex", "Clerk", "Gamification"],
    screenshot: "/screenshots/moveverse.webp",
    href: "https://github.com/naelrudd/moveverse",
    live: null,
    caseStudy: null,
  },
  {
    name: "llm-docs-mirrors",
    status: "Open source",
    desc: "Machine-readable mirrors of 4,100+ pages of official dev and fintech docs, for LLM agents.",
    challenge:
      "Turning heterogeneous doc sites into clean, git-pinnable Markdown that stays in sync with upstream changes.",
    tags: ["Python", "RAG", "LLM", "Markdown"],
    screenshot: "/screenshots/llm-docs-mirrors.webp",
    href: "https://github.com/naelrudd/llm-docs-mirrors",
    live: null,
    caseStudy: null,
  },
];

export function Projects() {
  return (
    <section id="projects" className="border-t border-[var(--border)] py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rosy)]">
            03 <span aria-hidden="true">/</span> Work
          </p>

          <h2 className="font-[family-name:var(--font-heading)] text-4xl font-medium text-[var(--text)] lg:col-span-5 md:text-5xl">
            Selected work
          </h2>
          <p className="max-w-xl text-[16px] leading-relaxed text-[var(--text-muted)] lg:col-span-6 lg:col-start-7 lg:pt-2">
            Production systems, not demos. Each entry names the constraint that shaped it.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {projects.map((project, i) => (
            <article
              key={project.name}
              className="grid grid-cols-1 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-card)] md:min-h-[440px] transition-colors duration-200 motion-reduce:transition-none hover:border-[var(--border-hover)] md:grid-cols-12"
            >
              <a
                href={project.live ?? project.href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-[16/10] overflow-hidden border-b border-[var(--border)] md:col-span-5 md:aspect-auto md:border-b-0 md:border-r"
              >
                <Image
                  src={project.screenshot}
                  alt={`${project.name} product preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover object-left-top"
                  priority={i === 0}
                />
              </a>

              <div className="flex flex-col justify-center p-6 md:col-span-7 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-medium text-[var(--text)] md:text-2xl">
                    {project.name}
                  </h3>
                  <span className="text-xs text-[var(--text-muted)]">
                    {project.status}
                  </span>
                </div>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                  {project.desc}
                </p>

                <div className="mt-5 border-l-2 border-[var(--border-hover)] pl-4">
                  <p className="text-[11px] text-[var(--rosy)]">
                    Constraint
                  </p>
                  <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-[var(--text-muted)]">
                    {project.challenge}
                  </p>
                </div>

                <p className="mt-5 text-xs text-[var(--text-muted)]">
                  {project.tags.join(", ")}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-6">
                  {project.caseStudy && (
                    <Link
                      href={project.caseStudy}
                      className="text-sm font-medium text-[var(--moss)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--text)]"
                    >
                      Read the case study
                    </Link>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[var(--moss)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--text)]"
                    >
                      Visit site
                    </a>
                  )}
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[var(--moss)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--text)]"
                    >
                      Source code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
