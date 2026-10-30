const categories = [
  {
    title: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Shadcn UI"],
  },
  {
    title: "Backend & Real-time",
    skills: ["Convex", "Node.js", "PostgreSQL", "Clerk", "REST & tRPC"],
  },
  {
    title: "AI & Automation",
    skills: ["OpenRouter", "LLM Prompting", "Chrome Extensions", "Python"],
  },
  {
    title: "DevOps & Tools",
    skills: ["Git", "Vercel", "Docker", "Linux", "Figma"],
  },
];

export function Stack() {
  return (
    <section
      id="stack"
      className="py-28 md:py-32 border-t border-[var(--border)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
        <div className="mb-14 md:mb-16 max-w-2xl">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--moss)] tracking-[0.25em] uppercase mb-4">
            Tech Stack
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight">
            Tools I <span className="text-[var(--rosy)]">Use</span>
          </h2>
          <p className="mt-4 text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
            The modern stack I use to ship products from zero to production.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-[var(--bg-card)]/60 backdrop-blur-sm border border-[var(--border)] rounded-xl p-6 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card)] transition-all duration-300"
            >
              <h3 className="font-semibold text-sm mb-4 text-[var(--beige)]">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
