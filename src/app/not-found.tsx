import Link from "next/link";

const routes = [
  { label: "Front page", href: "/", note: "Who I am, and what I have shipped" },
  { label: "KanvasHub", href: "/work/kanvashub", note: "Marketplace, Convex, Midtrans" },
  { label: "NgopiKos", href: "/work/ngopikos", note: "Paid unlocks, expiry windows" },
  { label: "Contact", href: "/#contact", note: "Email is the fastest route" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--bg)]">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8 lg:px-16">
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] text-lg font-medium text-[var(--text)]"
          >
            Natanael Rudy
          </Link>
          <Link
            href="/#projects"
            className="text-sm text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text)] motion-reduce:transition-none"
          >
            All work
          </Link>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-16 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rosy)]">
              Error <span aria-hidden="true">/</span> 404
            </p>
            <p
              aria-hidden="true"
              className="mt-5 select-none font-[family-name:var(--font-heading)] text-[clamp(4.5rem,19vw,14rem)] font-medium leading-[0.8] tracking-[-0.055em] text-[var(--text)]"
            >
              404
            </p>
            <h1 className="mt-8 max-w-xl text-balance font-[family-name:var(--font-heading)] text-3xl font-medium leading-[1.1] text-[var(--text)] md:text-[40px]">
              This page was never built, or it moved.
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--text-muted)]">
              The site is four pages deep. Everything worth reading is one click away.
            </p>
            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[var(--text)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition-colors duration-200 hover:bg-[var(--moss)] motion-reduce:transition-none"
            >
              Back to the front page
              <span aria-hidden="true">&#8594;</span>
            </Link>
          </div>

          <nav aria-label="Site pages" className="lg:col-span-5 lg:col-start-8">
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--rosy)]">
              Directory <span aria-hidden="true">/</span> 4 pages
            </p>
            <ul className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {routes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="group flex items-baseline justify-between gap-4 py-5"
                  >
                    <span>
                      <span className="block text-[15px] font-medium text-[var(--text)]">
                        {route.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-[var(--text-muted)]">
                        {route.note}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-sm text-[var(--moss)] transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                      &#8594;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center md:px-8 lg:px-16">
          <p>Natanael Rudy Hadinata. Malang, Indonesia.</p>
          <a
            href="mailto:natanaelrudyhadinata@gmail.com?subject=Portfolio%20enquiry"
            className="transition-colors duration-200 hover:text-[var(--text)] motion-reduce:transition-none"
          >
            natanaelrudyhadinata@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
}
