export function About() {
  return (
    <section id="about" className="py-28 md:py-32 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="text-xs text-[var(--rosy)] tracking-[0.25em] uppercase mb-4">
              About Me
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Who I <span className="text-[var(--moss)]">Am</span>
            </h2>
            <div className="w-12 h-[2px] bg-[var(--rosy)] mb-8" />
            <div className="space-y-5 max-w-xl">
            <p className="text-[var(--text-muted)] leading-relaxed text-[15px] md:text-base">
              Fullstack engineer focused on putting AI into products people actually use —
              real-time backends, clean interfaces, and ownership of the full stack.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed text-[15px] md:text-base">
              Calling an API is not enough. Architecture, UX, auth, payments, and deploy
              all have to hold together under real users.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed text-[15px] md:text-base">
              Default stack: Convex + Next.js + Clerk, with AI where it removes real work —
              not where it only looks impressive in a demo.
            </p>
          </div>

          </div>

          {/* Right: Cards */}
          <div className="lg:col-span-5 space-y-4">
            {[
              {
                title: "Specialization",
                desc: "Convex + Next.js ecosystem. Real-time backend, authentication, and payment integration.",
              },
              {
                title: "Philosophy",
                desc: "Build what is genuinely used, not merely what appears impressive.",
              },
              {
                title: "Approach",
                desc: "Full-stack ownership — design, develop, deploy, and maintain.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[var(--bg-card)]/60 backdrop-blur-sm border border-[var(--border)] rounded-xl p-6 hover:border-[var(--moss)]/30 hover:bg-[var(--bg-card)] transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-[3px] rounded-full bg-[var(--rosy)]/40 shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-2">{item.title}</h4>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
