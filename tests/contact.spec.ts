import { expect, test } from "@playwright/test";

const NAME = "Ada Lovelace";
const EMAIL = "ada@example.com";
const MESSAGE = "We are hiring a fullstack engineer for a Convex project. Are you free to talk?";

/** The build decides delivery: an access key posts to Web3Forms, otherwise the visitor's mail client. */
async function delivery(page: import("@playwright/test").Page) {
  await page.goto("/");
  return page.locator("form[data-delivery]").getAttribute("data-delivery");
}

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

test("the contact section is reachable from the page and the email link is a real mailto", async ({
  page,
}) => {
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

test("a filled form is delivered and confirmed", async ({ page }) => {
  const mode = await delivery(page);

  if (mode === "api") {
    let payload: Record<string, unknown> | null = null;
    await page.route("https://api.web3forms.com/submit", async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Email sent successfully!" }),
      });
    });

    await fillAndSend(page);

    await expect(page.locator("#contact").getByRole("status")).toContainText("Message on its way");
    expect(payload).not.toBeNull();
    expect(payload!.name).toBe(NAME);
    expect(payload!.email).toBe(EMAIL);
    expect(payload!.message).toBe(MESSAGE);
    expect(payload!.access_key).toBeTruthy();
  } else {
    await fillAndSend(page);
    await expect(page.locator("#contact").getByRole("status")).toContainText("Message on its way");
    const href = await page.getByRole("link", { name: /open it again/i }).getAttribute("href");
    expect(href).toContain("mailto:natanaelrudyhadinata@gmail.com");
    expect(href).toContain(encodeURIComponent(MESSAGE));
    expect(href).toContain(encodeURIComponent(EMAIL));
  }
});

test("a provider failure falls back to email instead of losing the message", async ({ page }) => {
  test.skip((await delivery(page)) !== "api", "Only runs when an access key is configured");
  await page.route("https://api.web3forms.com/submit", (route) =>
    route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({ success: false, message: "Provider unavailable" }),
    })
  );

  await fillAndSend(page);

  const alert = page.locator("#contact").getByRole("alert");
  await expect(alert).toBeVisible();
  await expect(alert).toContainText("Provider unavailable");
  const fallback = page.getByRole("link", { name: /send by email instead/i });
  await expect(fallback).toHaveAttribute("href", /^mailto:/);
  expect(await fallback.getAttribute("href")).toContain(encodeURIComponent(MESSAGE));
});

test("the honeypot silently drops bot submissions without calling the provider", async ({
  page,
}) => {
  const mode = await delivery(page);
  let called = false;
  await page.route("https://api.web3forms.com/submit", async (route) => {
    called = true;
    await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
  });

  await fillAndSend(page, { company: "definitely a bot" });

  await expect(page.locator("#contact").getByRole("status")).toContainText("Message on its way");
  expect(called, `delivery mode was ${mode}`).toBe(false);
});
