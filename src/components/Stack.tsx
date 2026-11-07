const stack = [
  {
    label: "Frontend",
    values: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Shadcn UI"],
  },
  {
    label: "Backend",
    values: ["Convex", "Node.js", "PostgreSQL", "Clerk", "REST & tRPC"],
  },
  {
    label: "AI",
    values: ["OpenRouter", "LLM prompting", "Ollama", "Python", "Chrome extensions"],
  },
  {
    label: "Tooling",
    values: ["Git", "Vercel", "Docker", "Linux", "Figma"],
  },
];

export function Stack() {
  return (
    <section id="stack" className="border-t border-[var(--border)] py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rosy)]">
              04 <span aria-hidden="true">/</span> Stack
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-medium text-[var(--text)] md:text-5xl">
              What I build with
            </h2>
            <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-[var(--text-muted)]">
              The same tools across projects on purpose. Fewer moving parts to debug at
              launch.
            </p>
          </div>

          <dl className="divide-y divide-[var(--border)] border-t border-[var(--border)] lg:col-span-8">
            {stack.map((row) => (
              <div key={row.label} className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-4 sm:gap-6">
                <dt className="text-xs text-[var(--text-muted)] sm:pt-1">
                  {row.label}
                </dt>
                <dd className="col-span-3 text-[15px] text-[var(--text)]">
                  {row.values.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
