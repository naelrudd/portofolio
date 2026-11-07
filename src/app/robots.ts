import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Required by `output: "export"`; these routes are pure functions of the build.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
