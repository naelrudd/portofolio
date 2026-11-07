import { expect, test } from "@playwright/test";

const pages = [
  { slug: "kanvashub", name: "KanvaHub", live: "https://kanvashub.id" },
  { slug: "ngopikos", name: "NgopiKos", live: "https://ngopikos.my.id" },
];

for (const page of pages) {
  test(`${page.name} case study renders and links back`, async ({ page: p }) => {
    const response = await p.goto(`/work/${page.slug}`);
    expect(response?.status()).toBe(200);

    await expect(p.getByRole("heading", { level: 1 })).toHaveText(page.name);
    await expect(p.locator(`a[href="${page.live}"]`).first()).toBeVisible();
    await expect(
      p.getByRole("link", { name: "All work" }),
    ).toHaveAttribute("href", "/#projects");

    const canonical = await p
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical).toContain(`/work/${page.slug}`);
  });
}

test("the home page links to both case studies", async ({ page }) => {
  await page.goto("/#projects");

  for (const { slug } of pages) {
    await expect(
      page.locator(`#projects a[href="/work/${slug}"]`),
    ).toHaveCount(1);
  }
});

test("every case study section has a heading", async ({ page }) => {
  await page.goto("/work/kanvashub");

  const sections = page.locator("article section");
  const count = await sections.count();
  expect(count).toBeGreaterThan(3);

  for (let i = 0; i < count; i += 1) {
    await expect(sections.nth(i).getByRole("heading", { level: 2 })).toHaveCount(1);
  }
});
