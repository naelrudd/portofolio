import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    name: "KanvasHub",
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
    desc: "Machine-readable mirrors of 6,370 pages of official payment and developer docs, for LLM agents.",
    challenge:
      "Turning heterogeneous doc sites into clean, git-pinnable Markdown that stays in sync with upstream changes.",
    tags: ["Python", "RAG", "LLM", "Markdown"],
    screenshot: "/screenshots/llm-docs-mirrors.webp",
    href: "https://github.com/naelrudd/llm-docs-mirrors",
    live: null,
    caseStudy: null,
  },
];

const statusDot: Record<string, string> = {
  Live: "bg-[var(--moss)]",
  Shipped: "bg-[var(--deep-green)]",
  "Open source": "bg-[var(--rosy)]",
};

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
              className="group grid grid-cols-1 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-card)] transition-colors duration-200 motion-reduce:transition-none hover:border-[var(--border-hover)] md:min-h-[440px] md:grid-cols-12"
            >
              <div className="p-3 md:col-span-5 md:border-r md:border-[var(--border)] md:p-4">
                <a
                  href={project.live ?? project.href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="relative block aspect-[16/10] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--bg-deep)] shadow-[inset_0_0_0_1px_rgba(10,51,35,0.07)]"
                >
                  <Image
                    src={project.screenshot}
                    alt={`${project.name} product preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-left-top transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.02]"
                    priority={i === 0}
                  />
                </a>
              </div>

              <div className="flex flex-col justify-center p-6 md:col-span-7 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    {String(i + 1).padStart(2, "0")} <span aria-hidden="true">/</span>{" "}
                    {String(projects.length).padStart(2, "0")}
                  </p>
                  <p className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    <span
                      aria-hidden="true"
                      className={`inline-block h-1.5 w-1.5 rounded-full ${statusDot[project.status]}`}
                    />
                    {project.status}
                  </p>
                </div>

                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-medium text-[var(--text)] md:text-[28px]">
                  {project.name}
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                  {project.desc}
                </p>

                <p className="mt-3 font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                  {project.tags.join(" · ")}
                </p>

                <div className="mt-6 border-t border-[var(--border)] pt-4">
                  <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rosy)]">
                    Constraint
                  </p>
                  <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-[var(--text-muted)]">
                    {project.challenge}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {project.caseStudy && (
                    <Link
                      href={project.caseStudy}
                      className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-[var(--moss)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--text)]"
                    >
                      Read the case study
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 motion-reduce:transition-none group-hover/link:translate-x-1"
                      >
                        &#8594;
                      </span>
                    </Link>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-[var(--moss)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--text)]"
                    >
                      Visit site
                      <span aria-hidden="true">&#8599;</span>
                    </a>
                  )}
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-[var(--moss)] transition-colors duration-200 motion-reduce:transition-none hover:text-[var(--text)]"
                    >
                      Source code
                      <span aria-hidden="true">&#8599;</span>
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
