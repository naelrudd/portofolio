import Image from "next/image";

const projects = [
  {
    name: "KanvaHub",
    status: "Live",
    statusTone: "moss",
    desc: "Marketplace for digital templates, bundles, and services. Real-time Convex backend, Midtrans payments, Clerk auth, with seller/buyer flows, reviews, and an admin dashboard.",
    challenge:
      "Reliable payment + fulfillment flow when inventory, orders, and reviews change in real time on a live marketplace.",
    tags: ["Next.js", "Convex", "Clerk", "Midtrans"],
    screenshot: "/screenshots/kanvashub.webp",
    href: null,
    live: "https://kanvashub.id",
  },
  {
    name: "NgopiKos",
    status: "Live",
    statusTone: "deep",
    desc: "Boarding-house (kos) marketplace for Malang. Direct owner chat, Midtrans payments, Clerk auth, and live Convex sync — no middleman fees.",
    challenge:
      "Reliable payment + unlock flow with real-time state when inventory and chat move at once.",
    tags: ["Convex", "Clerk", "Midtrans", "Marketplace"],
    screenshot: "/screenshots/ngopikos.webp",
    href: null,
    live: "https://ngopikos.my.id",
  },
  {
    name: "MoveVerse",
    status: "Shipped",
    statusTone: "rosy",
    desc: "Gamified physical-education platform for Indonesian elementary schools — role-based dashboards for students, teachers, and parents, with XP, quests, and world progression.",
    challenge:
      "Balancing XP thresholds across five tiers so progression stays motivating without feeling grindy.",
    tags: ["Next.js", "Convex", "Clerk", "Gamification"],
    screenshot: "/screenshots/moveverse.webp",
    href: "https://github.com/naelrudd/moveverse",
    live: null,
  },
  {
    name: "llm-docs-mirrors",
    status: "Open Source",
    statusTone: "moss",
    desc: "Machine-readable mirrors of 4,100+ pages of official dev and fintech docs (Stripe, Clerk, Midtrans, Xendit, Canva) built for LLM agents and RAG pipelines.",
    challenge:
      "Turning heterogeneous doc sites into clean, git-pinnable Markdown that stays in sync with upstream changes.",
    tags: ["Python", "RAG", "LLM", "Markdown"],
    screenshot: "/screenshots/llm-docs-mirrors.webp",
    href: "https://github.com/naelrudd/llm-docs-mirrors",
    live: null,
  },
];

const toneClass: Record<string, string> = {
  moss: "bg-[var(--moss)] text-[var(--bg)]",
  deep: "bg-[var(--deep-green)] text-[var(--beige)]",
  rosy: "bg-[var(--rosy)] text-[var(--bg)]",
};

export function Projects() {
  return (
    <section id="projects" className="py-28 md:py-32 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
        <div className="mb-14 md:mb-16 max-w-2xl">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--rosy)] tracking-[0.25em] uppercase mb-4">
            Featured Work
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight">
            Selected <span className="text-[var(--moss)]">Projects</span>
          </h2>
          <p className="mt-4 text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
            Production systems, not demos — each entry ships a real product constraint.
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <article
              key={project.name}
              className="group relative grid md:grid-cols-12 gap-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] transition-all duration-500 hover:border-[var(--border-hover)] hover:shadow-[0_0_0_1px_var(--border-hover),0_24px_60px_-30px_rgba(34,211,238,0.18)]"
            >
              <a
                href={project.href ?? project.live ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="md:col-span-5 relative aspect-[16/10] md:aspect-auto md:min-h-[280px] bg-[var(--bg-deep)] overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none block"
              >
                <Image
                  src={project.screenshot}
                  alt={`${project.name} product preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover object-top opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.02]"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[var(--bg-card)]/80" />
                <span className="absolute top-4 left-4 text-[10px] tracking-widest text-[var(--text-muted)] bg-[var(--bg-deep)]/80 backdrop-blur px-2.5 py-1 rounded-full border border-[var(--border)]">
                  0{i + 1}
                </span>
              </a>

              <div className="md:col-span-7 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                    {project.name}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] rounded-full uppercase tracking-wider ${toneClass[project.statusTone]}`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-[var(--text-muted)] text-sm md:text-[15px] mb-5 leading-relaxed max-w-xl">
                  {project.desc}
                </p>

                <div className="rounded-xl px-4 py-3 mb-5 border border-[var(--moss)]/20 bg-[var(--moss)]/[0.06]">
                  <p className="text-xs md:text-[13px] text-[var(--beige)]/90 font-[family-name:var(--font-mono)] leading-relaxed">
                    <span className="text-[var(--rosy)]">Challenge</span>
                    <span className="text-[var(--text-muted)]"> — </span>
                    {project.challenge}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors group-hover:border-[var(--moss)]/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-medium text-[var(--beige)] bg-[var(--bg-deep)] border border-[var(--border)] hover:border-[var(--moss)] hover:text-[var(--moss)] transition-colors rounded-lg px-4 py-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5A3 3 0 0 0 12 14a3 3 0 0 0-2 .5 4.8 4.8 0 0 0-1 3.5v4"/><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                      Source Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-medium text-[var(--bg)] bg-[var(--moss)] hover:brightness-110 transition-all rounded-lg px-4 py-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/naelrudd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--beige)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            See more projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
