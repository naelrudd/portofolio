import { expect, test } from "@playwright/test";

test("an unknown URL renders the branded 404, not a bare string", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);

  await expect(
    page.getByRole("heading", { level: 1 }),
  ).toContainText("This page was never built");

  await expect(
    page.getByRole("link", { name: /Back to the front page/ }),
  ).toHaveAttribute("href", "/");

  // A dead end still has to lead somewhere: both case studies are reachable.
  await expect(page.locator('a[href="/work/kanvashub"]')).toHaveCount(1);
  await expect(page.locator('a[href="/work/ngopikos"]')).toHaveCount(1);
});
