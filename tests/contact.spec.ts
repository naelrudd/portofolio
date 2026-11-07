import { expect, test } from "@playwright/test";

const NAME = "Ada Lovelace";
const EMAIL = "ada@example.com";
const MESSAGE = "We are hiring a fullstack engineer for a Convex project. Are you free to talk?";

async function fillAndSend(page: import("@playwright/test").Page, overrides = {}) {
  await page.getByLabel("Name").fill(NAME);
  await page.getByLabel("Email").fill(EMAIL);
  await page.getByLabel("Message").fill(MESSAGE);
  for (const [field, value] of Object.entries(overrides)) {
    await page.locator(`[name="${field}"]`).fill(String(value));
  }
  // Stay past the time trap, which exists to catch instant bot submissions.
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: /send message/i }).click();
}

test("the contact section is reachable and the email link is a real mailto", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator("#contact");
  await expect(contact).toBeVisible();
  await expect(contact.getByRole("heading", { name: "Get in touch" })).toBeVisible();
  await expect(contact.getByRole("link", { name: "Email me" })).toHaveAttribute(
    "href",
    /^mailto:natanaelrudyhadinata@gmail\.com/
  );
});

test("empty submit is blocked by native validation", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: /send message/i }).click();
  await expect(page.locator("form[data-delivery]")).toBeVisible();
  await expect(page.locator("#contact").getByRole("status")).toHaveCount(0);
});

test("a filled form is posted to the mail endpoint and confirmed", async ({ page }) => {
  await page.goto("/");
  let payload: Record<string, unknown> | null = null;
  await page.route("**/api/contact", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await fillAndSend(page);

  await expect(page.locator("#contact").getByRole("status")).toContainText("Message on its way");
  expect(payload).not.toBeNull();
  expect(payload!.name).toBe(NAME);
  expect(payload!.email).toBe(EMAIL);
  expect(payload!.message).toBe(MESSAGE);
});

test("a failed delivery keeps the message and offers Gmail plus mailto", async ({ page }) => {
  await page.goto("/");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, error: "Mail is not configured on the server." }),
    })
  );

  await fillAndSend(page);

  const alert = page.locator("#contact").getByRole("alert");
  await expect(alert).toBeVisible();
  await expect(alert).toContainText("Mail is not configured");

  const gmail = alert.getByRole("link", { name: /open in gmail/i });
  await expect(gmail).toBeVisible();
  const gmailHref = decodeURIComponent(((await gmail.getAttribute("href")) ?? "").replace(/\+/g, " "));
  expect(gmailHref).toContain("mail.google.com");
  expect(gmailHref).toContain(MESSAGE);

  const mailto = alert.getByRole("link", { name: /mail app/i });
  expect(await mailto.getAttribute("href")).toContain("mailto:natanaelrudyhadinata@gmail.com");
});

test("the honeypot silently drops bots without calling the endpoint", async ({ page }) => {
  await page.goto("/");
  let called = false;
  await page.route("**/api/contact", async (route) => {
    called = true;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await fillAndSend(page, { company: "definitely a bot" });

  await expect(page.locator("#contact").getByRole("status")).toContainText("Message on its way");
  expect(called).toBe(false);
});
