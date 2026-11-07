import { expect, test } from "@playwright/test";

const ORIGIN = "https://portofolio-naelrudd.vercel.app";

test("the sitemap lists every page under the canonical origin", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);

  const xml = await response.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  expect(locs).toContain(`${ORIGIN}/`);
  expect(locs).toContain(`${ORIGIN}/work/kanvashub`);
  expect(locs).toContain(`${ORIGIN}/work/ngopikos`);
  expect(locs).toHaveLength(3);
});

test("robots.txt points at the sitemap on the same origin", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
  expect(body).not.toContain("Disallow: /");
});

test("the canonical link matches the origin the sitemap uses", async ({ page }) => {
  for (const path of ["/", "/work/kanvashub"]) {
    await page.goto(path);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    const expected = `${ORIGIN}${path === "/" ? "" : path}`;
    expect(canonical?.replace(/\/+$/, "")).toBe(expected);
  }
});
