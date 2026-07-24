export function About() {
  return (
    <section id="about" className="py-28 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 max-w-6xl mx-auto">
          {/* Left: Header */}
          <div className="lg:col-span-3">
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--moss)] tracking-[0.25em] uppercase mb-4">
              About Me
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-6">
              Who I Am
            </h2>
            <div className="w-12 h-[2px] bg-[var(--moss)]" />
          </div>

          {/* Center: Bio */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-[var(--text-muted)] leading-relaxed text-[15px]">
              I am a fullstack engineer specializing in integrating AI into production-grade products. 
              From real-time backends to intuitive user interfaces — I own the entire stack.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed text-[15px]">
              I believe an AI engineer should be a generalist with deep expertise — taking the best 
              practices from various engineering disciplines and applying them to solve real problems. 
              It is not enough to call an API; one must understand architecture, user experience, 
              and end-to-end deployment.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed text-[15px]">
              I build tools that are genuinely used in production, not just impressive demos. 
              When a problem arises, I find the right technology to solve it — 
              typically through the Convex + Next.js ecosystem.
            </p>
          </div>

          {/* Right: Cards */}
          <div className="lg:col-span-4 space-y-4">
            {[
              {
                icon: "◇",
                title: "Specialization",
                desc: "Convex + Next.js ecosystem. Real-time backend, authentication, and payment integration.",
              },
              {
                icon: "◇",
                title: "Philosophy",
                desc: "Build what is genuinely used, not merely what appears impressive.",
              },
              {
                icon: "◇",
                title: "Approach",
                desc: "Full-stack ownership — design, develop, deploy, and maintain.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--border-hover)] transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[var(--moss)] text-sm">{item.icon}</span>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
