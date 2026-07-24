"use client";

import Image from "next/image";

const projects = [
  {
    name: "Moveverse",
    status: "Active",
    statusColor: "bg-[var(--moss)]",
    desc: "A multi-role dashboard for a parent-child learning system. Gamification mechanics — experience points, tier progression, and leveling — transform education into an engaging experience.",
    challenge: "XP threshold balancing across five tiers — ensuring progression feels achievable yet challenging",
    tags: ["Convex", "Next.js 15", "Clerk", "Gamification"],
    screenshot: "/screenshots/moveverse.png",
  },
  {
    name: "NgopiKos",
    status: "Development",
    statusColor: "bg-[var(--deep-green)]",
    desc: "A platform for MSME boarding house management. Integrated with Midtrans payment gateway, Clerk authentication, and real-time data synchronization through Convex.",
    challenge: "Building a reliable payment flow with real-time synchronization in a production environment",
    tags: ["Convex", "Clerk", "Midtrans", "Payment Gateway"],
    screenshot: "/screenshots/ngopikos.png",
  },
  {
    name: "Peeler",
    status: "Live",
    statusColor: "bg-[var(--moss)]",
    desc: "An e-commerce platform for quail egg processing MSMEs. Features product catalog, order management, and conversion-focused UX designed for mobile-first interactions.",
    challenge: "Creating a clean, fast mobile-first product listing experience that drives conversions",
    tags: ["Astro", "E-commerce", "UMKM"],
    screenshot: "/screenshots/peeler.png",
  },
  {
    name: "RepurposeKit",
    status: "Active",
    statusColor: "bg-[var(--rosy)]",
    desc: "A Chrome extension that transforms a single article into five social media posts within ten seconds. AI-powered content repurposing for LinkedIn, X, Instagram, Facebook, and Threads.",
    challenge: "Developing a consistent content transformation pipeline with reliable output quality",
    tags: ["Chrome Extension", "AI", "OpenRouter", "Automation"],
    screenshot: "/screenshots/repurposekit.png",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-32 mt-20 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="mb-16">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--rosy)] tracking-[0.25em] uppercase mb-4">
            Featured Work
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold">
            Selected <span className="text-[var(--moss)]">Projects</span>
          </h2>
        </div>

        <div className="space-y-5">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--border-hover)] transition-all duration-300"
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Screenshot */}
                <div className="md:col-span-2 relative aspect-[4/3] md:aspect-auto bg-[var(--bg-deep)] overflow-hidden">
                  <Image
                    src={project.screenshot}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg-card)]/30 md:block hidden" />
                </div>

                {/* Content */}
                <div className="md:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-[family-name:var(--font-mono)] rounded-full ${project.statusColor} text-[var(--bg)]`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="text-[var(--text-muted)] text-sm mb-4 leading-relaxed max-w-xl">
                    {project.desc}
                  </p>

                  <div className="bg-[var(--deep-green)]/10 rounded-lg px-4 py-3 mb-4 border border-[var(--deep-green)]/30">
                    <p className="text-xs text-[var(--rosy)] font-[family-name:var(--font-mono)] leading-relaxed">
                      CHALLENGE → {project.challenge}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-[family-name:var(--font-mono)] px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--moss)] hover:text-[var(--moss)] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
