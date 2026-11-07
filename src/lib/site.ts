// Single source of truth for the canonical origin.
//
// When the custom domain goes live, set NEXT_PUBLIC_SITE_URL in Vercel and in
// .env.local — canonical tags, OG URLs, JSON-LD, the sitemap and robots.txt all
// read from here, so nothing else has to change.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portofolio2-steel.vercel.app"
).replace(/\/+$/, "");
