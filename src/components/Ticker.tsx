const items = [
  "Next.js",
  "Convex",
  "TypeScript",
  "Clerk",
  "Midtrans",
  "Ollama",
  "Python",
  "Tailwind",
  "Node.js",
  "Local LLMs",
];

export function Ticker() {
  const row = [...items, ...items];

  return (
    <div
      className="overflow-hidden border-y border-[var(--border)] bg-[var(--bg-deep)] py-3"
      aria-hidden="true"
    >
      <div className="flex w-max motion-safe:animate-[ticker_38s_linear_infinite]">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]"
          >
            {item}
            <span className="mx-6 text-[var(--rosy)]">&#9679;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
