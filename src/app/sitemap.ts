import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { SITE_URL } from "@/lib/site";

// Required by `output: "export"`; these routes are pure functions of the build.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudies.map((study) => ({
      url: `${SITE_URL}/work/${study.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
