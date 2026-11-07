export type CaseStudySection = {
  heading: string;
  body: string[];
  table?: { left: string; right: string }[];
};

export type CaseStudy = {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  period: string;
  status: string;
  live: string | null;
  stack: string[];
  cover: string;
  lede: string;
  facts: { label: string; value: string }[];
  sections: CaseStudySection[];
  differently: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "kanvashub",
    name: "KanvasHub",
    tagline: "A marketplace where the inventory is somebody else's Canva link",
    role: "Solo engineer, backend and frontend",
    period: "2026",
    status: "Live at kanvashub.id",
    live: "https://kanvashub.id",
    stack: ["Next.js", "Convex", "Clerk", "Midtrans", "TypeScript"],
    cover: "/screenshots/kanvashub.webp",
    lede: "Indonesian designers sell Canva templates through Instagram DMs and bank transfers. The seller sends a preview, the buyer transfers, the seller pastes an editable link. Both sides can disappear halfway through, and nobody can prove what was delivered. KanvasHub is that transaction with a ledger, a payment gateway and a licence behind it.",
    facts: [
      { label: "Backend", value: "22 tables, 76 indexes, 167 functions" },
      { label: "Code", value: "7,800 lines of Convex" },
      { label: "Money", value: "Midtrans, 1 webhook, 6 rate limits" },
      { label: "Background jobs", value: "2 hourly cron jobs" },
    ],
    sections: [
      {
        heading: "Why Convex instead of a server",
        body: [
          "The whole product is a trust problem between two strangers, which means the backend has to be transactional: an order, a payment and a delivery have to move together or not at all. Convex gives me serialisable mutations, reactive queries and scheduled jobs without a server for me to keep alive, patch and pay for.",
          "The cost is that everything is a function with an argument, and every argument is attacker-controlled. That shaped the design more than any feature did.",
        ],
      },
      {
        heading: "How the money moves",
        body: [
          "A purchase is created in a mutation, the buyer is sent to Midtrans Snap, and the webhook is the only place a purchase becomes paid. Nothing the browser says can mark an order as settled.",
          "The webhook route does two checks before it touches the database. First an IP allowlist against Midtrans' published ranges. Second an SHA-512 signature over order_id, status_code, gross_amount and the server key. An unknown IP gets an HTTP 200 with no side effect, on purpose: returning 4xx makes Midtrans retry, and a retry storm on a route that rejects everything is just noise.",
          "Sellers keep a balance that only grows from settled purchases, and a payout request draws against it. Commission is 10% on the student tier, read from the plan table rather than hardcoded.",
        ],
      },
      {
        heading: "What I got wrong, and what it cost",
        body: [
          "The first version shipped fast and was, in places, indefensible. I ran an audit against the live deployment and every finding below was reproduced before it was fixed.",
        ],
        table: [
          {
            left: "Editable Canva link returned to anonymous callers",
            right: "Paid templates could be downloaded for free. Now redacted unless admin, owner, or a buyer with a settled purchase.",
          },
          {
            left: "canvaAccounts.getByUser was public and returned other sellers' OAuth tokens",
            right: "Replaced with getMine, derived from the session. The server-side variants that took a user id are deleted.",
          },
          {
            left: "User queries leaked email, Clerk id and phone number",
            right: "Every public read now goes through a toPublicUser projection.",
          },
          {
            left: "confirmPayment was a public mutation that only checked for a session",
            right: "Any account could mark any order paid. Now an internalMutation, callable only from the webhook.",
          },
          {
            left: "Order reads took buyerId and sellerId from the client",
            right: "Classic IDOR. The actor is derived from the session and never from an argument.",
          },
          {
            left: "The Canva OAuth callback used the raw Clerk id as its state parameter",
            right: "Login CSRF. Replaced with a signed, single-use state.",
          },
        ],
      },
      {
        heading: "The pattern under all six",
        body: [
          "Every finding is the same bug wearing different clothes: a function that accepted an identifier from the caller and trusted it. The fix in each case is also the same, so the fix is a rule rather than six patches — the actor comes from the session, the resource is checked against the actor, and anything that cannot prove ownership is not returned.",
          "A seventh one is waiting to happen wherever that rule is remembered instead of enforced, which is why the next thing I build will put the ownership check in a helper that every read has to go through.",
        ],
      },
    ],
    differently: [
      "Write the ownership helper before the first table, not after the first audit.",
      "One test per public query asserting it rejects an anonymous caller. Six bugs, zero tests, is not a coincidence.",
      "Model the licence as its own record from day one. It started as a field on the purchase and had to be pulled out once templates could be re-sold as part of a bundle.",
    ],
  },
  {
    slug: "ngopikos",
    name: "NgopiKos",
    tagline: "Paying to unlock a phone number, and the fifteen minutes that decides whether it worked",
    role: "Solo engineer, backend and frontend",
    period: "2026",
    status: "Live at ngopikos.my.id",
    live: "https://ngopikos.my.id",
    stack: ["Next.js", "Convex", "Clerk", "Midtrans", "Leaflet", "TypeScript"],
    cover: "/screenshots/ngopikos.webp",
    lede: "Looking for a boarding house in Malang runs on WhatsApp groups and recycled photos. Middlemen take a cut of the rent for handing over a phone number, and a student has no way to tell a live listing from one that was rented out two months ago. NgopiKos charges the tenant a small amount to unlock the owner's contact directly, and charges the owner only when a lease is actually signed.",
    facts: [
      { label: "Backend", value: "14 tables, 31 indexes, 67 functions" },
      { label: "Code", value: "2,600 lines of Convex" },
      { label: "Pricing", value: "Rp21k / Rp37k / Rp63k unlock tiers" },
      { label: "Background jobs", value: "Cron every 5 min for stale payments" },
    ],
    sections: [
      {
        heading: "The pricing is the product",
        body: [
          "Rp21,000 unlocks one listing. Rp37,000 unlocks every kos in one area. Rp63,000 covers three areas. A survey visit is Rp39,000, or Rp49,000 bundled with the contact. The owner pays a success fee only when a booking is confirmed, tiered by rent: Rp50,000 up to Rp800,000 a month, scaling to Rp150,000 above Rp1,800,000.",
          "Those numbers are a business model, not decoration. A tenant will pay two percent of a month's rent to stop talking to middlemen. An owner will pay a fixed fee once, because a signed tenant is worth several months of empty rooms. Both prices live in a settings table an admin can edit, with a hard floor so a typo cannot quietly give the product away.",
        ],
      },
      {
        heading: "A fifteen-minute promise",
        body: [
          "Midtrans sessions expire after fifteen minutes. If the app's window is longer than the gateway's, a tenant can unlock a contact after the payment has already died at Midtrans. If it is shorter, they watch a countdown that kills a payment which is still alive.",
          "So there is one constant, PAYMENT_EXPIRY_MS, and three places read it: the mutation that creates the payment, the countdown in the UI, and the check that decides whether a contact is unlocked. They cannot drift, because they are not three numbers.",
          "Webhooks still get lost. A cron sweeps every five minutes and moves anything past its expiry into an expired state, so a payment cannot sit in pending forever and an unlock cannot outlive the thing that paid for it.",
        ],
      },
      {
        heading: "Making the paid parts auditable",
        body: [
          "A survey report is a paid artifact, so it is written once per listing and readable only by its owner or an admin. Destructive admin actions go through a single mutation that writes to an audit log in the same transaction — delete a listing and its rooms, and the deletion is recorded with who did it and when, because that is the only way to answer a complaint three weeks later.",
          "Unlock state is resolved through one function rather than checked ad hoc at each call site. Every place that needs to know whether a tenant has paid asks the same question and gets the same answer.",
        ],
      },
    ],
    differently: [
      "Start with prices in the database. Moving them out of a constants file later touched every read path.",
      "Model the owner's success fee as a real invoice with a due date, not a flag on the booking. Chasing it manually is the part that does not scale.",
      "Put the map behind a click. Leaflet on first paint costs more than it earns on a phone.",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
