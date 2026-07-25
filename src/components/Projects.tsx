import Image from "next/image";

const projects = [
  {
    name: "Moveverse",
    status: "Active",
    statusTone: "moss",
    desc: "Multi-role parent–child learning platform. Gamified XP, five-tier progression, and motion-based activities turn education into a game families actually finish.",
    challenge:
      "Balancing XP thresholds across five tiers so progression stays motivating without feeling grindy.",
    tags: ["Convex", "Next.js", "Clerk", "Gamification"],
    screenshot: "/screenshots/moveverse.webp",
    href: null as string | null,
  },
  {
    name: "NgopiKos",
    status: "In development",
    statusTone: "deep",
    desc: "Boarding-house marketplace for Malang MSMEs. Direct owner chat, Midtrans payments, Clerk auth, and live Convex sync — no middleman fees.",
    challenge:
      "Reliable payment + unlock flow with real-time state when inventory and chat move at once.",
    tags: ["Convex", "Clerk", "Midtrans", "Marketplace"],
    screenshot: "/screenshots/ngopikos.webp",
    href: null as string | null,
  },
  {
    name: "Peeler",
    status: "Live",
    statusTone: "moss",
    desc: "Company profile and product site for a quail-egg peeler built for UMKM. Mobile-first catalog, clear value prop, conversion-focused layout.",
    challenge:
      "Fast, clean mobile product story that converts non-technical buyers without sales calls.",
    tags: ["Astro", "E-commerce", "UMKM"],
    screenshot: "/screenshots/peeler.webp",
    href: null as string | null,
  },
  {
    name: "RepurposeKit",
    status: "Active",
    statusTone: "rosy",
    desc: "Chrome extension that turns one article into five platform-ready social posts in ~10 seconds. AI pipeline for LinkedIn, X, Instagram, Facebook, and Threads.",
    challenge:
      "Stable multi-platform rewrite quality without spammy tone or broken formatting.",
    tags: ["Chrome Extension", "AI", "OpenRouter"],
    screenshot: "/screenshots/repurposekit.webp",
    href: null as string | null,
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
              className="group relative grid md:grid-cols-12 gap-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] transition-all duration-500 hover:border-[var(--border-hover)] hover:shadow-[0_0_0_1px_var(--border-hover),0_24px_60px_-30px_rgba(131,153,88,0.35)]"
            >
              <div className="md:col-span-5 relative aspect-[16/10] md:aspect-auto md:min-h-[280px] bg-[var(--bg-deep)] overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
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
              </div>

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

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors group-hover:border-[var(--moss)]/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
