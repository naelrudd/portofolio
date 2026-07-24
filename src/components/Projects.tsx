"use client";

import Image from "next/image";

const projects = [
  {
    name: "Moveverse",
    status: "Active",
    statusColor: "bg-[var(--moss)]",
    desc: "Multi-role dashboard untuk parent-child learning system. Gamifikasi (XP, tier, level) bikin belajar jadi game.",
    challenge: "XP threshold balancing — tier progression harus feel achievable tapi challenging",
    tags: ["Convex", "Next.js 15", "Clerk", "Gamification"],
    screenshot: "/screenshots/moveverse.png",
  },
  {
    name: "NgopiKos",
    status: "Dev",
    statusColor: "bg-[var(--midnight)]",
    desc: "Platform UMKM kos-kosan. Payment gateway Midtrans, auth Clerk, real-time data Convex.",
    challenge: "Payment flow + real-time sync yang reliable di production",
    tags: ["Convex", "Clerk", "Midtrans", "Payment"],
    screenshot: "/screenshots/ngopikos.png",
  },
  {
    name: "Peeler",
    status: "Live",
    statusColor: "bg-[var(--moss)]",
    desc: "E-commerce UMKM quail (puyuh). Product catalog, order management, conversion-focused UX.",
    challenge: "Mobile-first product listing yang clean dan fast",
    tags: ["Astro", "E-commerce", "UMKM"],
    screenshot: "/screenshots/peeler.png",
  },
  {
    name: "RepurposeKit",
    status: "Active",
    statusColor: "bg-[var(--rosy)]",
    desc: "Tool buat repurpose konten digital — satu konten jadi banyak produk digital.",
    challenge: "Content transformation pipeline yang konsisten output-nya",
    tags: ["Content Pipeline", "Automation", "Digital Products"],
    screenshot: "/screenshots/repurposekit.png",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--moss)] tracking-widest uppercase mb-4">
            Featured Work
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold">
            Yang udah <span className="text-[var(--rosy)]">gw build</span>
          </h2>
        </div>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className="group bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--moss)] transition-colors"
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Screenshot placeholder */}
                <div className="md:col-span-2 relative aspect-[4/3] md:aspect-auto bg-[var(--bg-deep)] overflow-hidden">
                  <Image
                    src={project.screenshot}
                    alt={project.name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Fallback gradient if no screenshot */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--midnight)] to-[var(--dark-green)] opacity-50" />
                </div>

                {/* Content */}
                <div className="md:col-span-3 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-[family-name:var(--font-mono)] rounded-full ${project.statusColor} text-[var(--bg)]`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="text-[var(--text-muted)] text-sm mb-4 leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="bg-[var(--bg-deep)] rounded-lg px-4 py-3 mb-4">
                    <p className="text-xs text-[var(--moss)] font-[family-name:var(--font-mono)]">
                      CHALLENGE → {project.challenge}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-[family-name:var(--font-mono)] px-3 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)]"
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
