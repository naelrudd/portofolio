# AUDIT — portofolio2 (portofolio2-steel.vercel.app)

Date: 7 November 2026. Read-only audit. No repo files changed.
Baseline commit: `8b10ccd`. Live site confirmed serving that build.

## What was run

| Check | Tool | Result |
|---|---|---|
| Lighthouse mobile | Lighthouse CLI 13.6.0, mobile emulation, cold cache | see scores below |
| Lighthouse desktop | Lighthouse CLI 13.6.0, `--preset=desktop` | see scores below |
| axe-core WCAG 2.2 AA + best-practice | puppeteer-core + axe 4.x, 1440x900 | **0 violations** |
| Keyboard walk | 25 Tab stops, computed outline on each | every stop has a visible 2px outline |
| Broken links | curl, all 10 outbound + internal assets | **all 200** |
| Contact form end to end | direct POST to the form action | **FAILS — HTTP 522** |
| OG / Twitter preview | rendered `<head>` inspection | **no image at all** |
| robots.txt / sitemap.xml | HTTP | **404 / 404** |
| Console + network errors | puppeteer, live page | 0 errors, 0 failed requests |
| ESLint | `npm run lint` | 1913 problems, **all in one dead file** |

### Baseline Lighthouse

| Category | Mobile | Desktop |
|---|---|---|
| Performance | **89** | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Mobile metrics: FCP 1.2s · LCP 2.6s · TBT 330ms · CLS 0 · Speed Index 1.3s.
Page weight 1,094 KiB of which **828.9 KiB is images** (4 requests).

---

## P0 — blocks the primary conversion

### P0-1. The contact form is dead right now. No visitor can reach you through it.

`src/components/Contact.tsx:61` posts to `https://formsubmit.co/natanaelrudyhadinata@gmail.com`.

Live test, 3 attempts, plus their AJAX endpoint, plus their root domain:

```
POST https://formsubmit.co/natanaelrudyhadinata@gmail.com   -> HTTP 522 (19.4–19.8s each)
POST https://formsubmit.co/ajax/...                          -> HTTP 522
GET  https://formsubmit.co/                                  -> HTTP 522
```

522 is Cloudflare "origin unreachable" — the whole FormSubmit service is down, not just your endpoint. A recruiter filling the form today gets a Cloudflare error page and no confirmation that anything happened. Worse: the copy at `Contact.tsx:38` promises "The form lands in my inbox", which is currently untrue.

Second problem in the same component, independent of the outage: `Contact.tsx:65` sets `_captcha=false`, which turns off FormSubmit's only spam control, and there is no honeypot field. Third: `Contact.tsx:68` redirects back to the homepage on submit, so there is no success state and no error state — the user cannot tell whether it worked.

**Fix (Phase 1):**
- Replace the native form POST with a client-side submit so we control all three states: idle → sending → sent / failed.
- Add a honeypot input (`_honey`), keep `_captcha` at `false` only because the honeypot + a minimum-time check replaces it.
- On failure, show an inline error and a prominent `mailto:` fallback with the message pre-filled, so the form can never dead-end.
- Primary channel becomes a direct `mailto:` link in the hero of the contact section, not a third-party relay.
- Needs a decision from you: **stay on FormSubmit** (free, currently down, no SLA) **or move to Web3Forms** (free tier, needs an access key tied to your email — I cannot create that for you). Tell me which; I will wire the fallback either way.

### P0-2. Link previews are blank. Nothing renders on LinkedIn or WhatsApp.

Rendered `<head>` has `og:title`, `og:description`, `og:type` and `twitter:card` — but **no `og:image`, no `twitter:image`**, and `twitter:card` is `summary` instead of `summary_large_image`. `src/app/layout.tsx:20` defines `openGraph` with no `images` key.

Consequence: a shared link shows a grey box. For a portfolio whose job is to be shared with recruiters, this is the cheapest possible loss.

**Fix:** generate a static `1200x630` OG image, add `metadataBase`, `openGraph.images`, `twitter.images`, and switch the card to `summary_large_image`. Static export means no dynamic OG route — it has to be a file in `public/`.

### P0-3. No robots.txt, no sitemap.xml, no canonical.

`/robots.txt` → 404. `/sitemap.xml` → 404. No `<link rel="canonical">` in the head. Lighthouse SEO still reports 100 because it does not test any of these.

**Fix:** `src/app/robots.ts` and `src/app/sitemap.ts` (both work with `output: "export"`), plus `alternates.canonical` in metadata.

### P0-4. 610 KB PNG where a 37 KB WebP already exists.

`src/components/Projects.tsx:22` points at `/screenshots/ngopikos.png` (610,930 bytes). `/screenshots/ngopikos.webp` (37,726 bytes) is already in `public/` and unused. Lighthouse attributes 569 KB of wasted bytes to this one file.

**Fix:** one-line change to `.webp`. Then re-encode the remaining screenshots to consistent WebP at display size. This single fix is most of the gap between mobile 89 and 90+.

---

## P1 — credibility and completeness

### P1-1. "4 production applications" contradicts the labels directly above it.

`src/components/CVDownload.tsx:4` says `Shipped: 4 production applications`. The Work section labels the same four things as **Live, Live, Shipped, Open source** — and `llm-docs-mirrors` is a docs mirror repo, not an application. A careful reader notices in about four seconds.

**Fix:** derive the number from the same source as the project list, and word it honestly, e.g. "2 live products, 1 shipped platform, 1 open-source corpus". Or drop the count entirely — the labels already say it.

### P1-2. CV card has no degree, no major, no graduation year.

`src/components/CVDownload.tsx:2` — `Education: Universitas Negeri Malang`. That is a city and a university, not a qualification.

**Needs input from you:** degree name, major/program, expected graduation. I will not invent it.

### P1-3. No Experience section.

There is no employment, internship, freelance or contract history anywhere on the page. For a recruiter the About section answers "how does he think" but not "has anyone paid him to do this". This is the single biggest content gap.

**Needs input from you:** which items to include (internship, freelance clients, the band, teaching assistant, anything with a date and an organisation). I will build the section around whatever you give me.

### P1-4. No outcome evidence per project.

Each project states the constraint but never the result. "Kept payment and fulfillment honest" is a claim, not a number.

**Needs input from you:** any real number per project — orders processed, sellers onboarded, listings, users, uptime, page count, load time. Anything I cannot source stays out.

### P1-5. `4,100+` is an unverified number in public copy.

`Projects.tsx:40` claims "4,100+ pages" for llm-docs-mirrors. If the repo has a count, it should be reproducible from the repo. If it does not, the number should go.

**Fix:** I can count the mirrored files in the repo and set the number to whatever is actually there.

---

## P2 — polish

| # | Finding | File | Fix |
|---|---|---|---|
| P2-1 | Header wordmark is `href="#"` — jumps to top and pollutes history with `#` | `Hero.tsx:48` | point at `#top` on `<main>`, or make it a non-link |
| P2-2 | No skip link; a keyboard user tabs through 5 nav items on every visit | `Hero.tsx` | add a visually-hidden skip link as the first focusable element |
| P2-3 | Footer has no `©` | `Footer.tsx:6` | `© 2026 Natanael Rudy` |
| P2-4 | `Tools.tsx` is dead code — 430 lines, never imported, and it is the source of **all 1913 ESLint problems** (18 errors) | `src/components/Tools.tsx` | delete it, or move it behind a route. **I will not delete without your explicit go-ahead.** |
| P2-5 | Unused PNGs bloat the repo: `moveverse.png` 1.9 MB, `peeler.png` 284 KB, `repurposekit.png` 326 KB, `profile.png` 571 KB, `ngopikos.png` 611 KB | `public/` | delete once WebP is confirmed live (asks first) |
| P2-6 | Hero image lacks `fetchpriority=high`; Lighthouse flags the LCP request as not priority-hinted | `Hero.tsx:140` | add `fetchpriority="high"` alongside `priority` |
| P2-7 | `metadataBase` missing, so any future relative OG URL resolves against localhost | `layout.tsx` | set to `https://portofolio2-steel.vercel.app` |
| P2-8 | No JSON-LD `Person` schema | `layout.tsx` | add a `<script type="application/ld+json">` block |
| P2-9 | 330ms mobile TBT; the whole hero is a client component for a scroll listener and a menu toggle | `Hero.tsx:1` | split the nav into its own client component so the hero copy ships as static HTML |
| P2-10 | `CVDownload.tsx:3` still uses `Convex + Next.js` while the rest of the page was normalised to commas | `CVDownload.tsx:3` | normalise |
| P2-11 | No `<header>` landmark around the nav | `Hero.tsx:39` | wrap in `<header>` |

---

## What is already good, and should not be touched

- axe: **0 violations** at WCAG 2.2 AA + best practice. Every focus stop has a visible 2px outline. Heading order is correct (one H1, H2 per section, H3 per project).
- All 10 outbound links and every asset return 200.
- Zero console errors, zero failed requests.
- CLS 0. Desktop 100 across the board.
- The "Constraint" block per project is the strongest thing on the page — it is why this reads as an engineer's portfolio and not a template. Phase 3 case studies should extend that pattern, not replace it.

---

## Proposed plan

**Phase 1 (P0 only), one branch `fix/p0-conversion`**
1. Contact form: client submit, three states, honeypot, mailto fallback that cannot dead-end.
2. OG image 1200x630 + full OG/Twitter metadata + `metadataBase`.
3. `robots.ts` + `sitemap.ts` + canonical.
4. `ngopikos.png` → `.webp`, plus re-encode every screenshot to consistent WebP at display size.
5. Small fixes from P2 that are one-liners: skip link, `©`, header href, `fetchpriority`, JSON-LD.

Target: mobile Performance ≥ 90, A11y ≥ 95, BP ≥ 95, SEO 100. Report before/after Lighthouse for both form factors.

**Phase 2 (content)** — needs your input on P1-2, P1-3, P1-4. Everything I cannot source I mark `TODO` and ask.

**Phase 3 (case studies)** — `/work/kanvashub` and `/work/ngopikos`, each with problem, constraint, architecture diagram, payment/real-time flow, what broke and how it was fixed, outcome. Also needs the same input as P1-4.

**One open decision before I start Phase 1:** FormSubmit (currently down, free, no SLA) or Web3Forms (free tier, needs an access key I cannot create)? I recommend Web3Forms with the mailto fallback as the guaranteed path either way.


---

## Phase 1 result

Branch `fix/p0-conversion`, merged to `master` and live at
https://portofolio2-steel.vercel.app/.

### Lighthouse, measured on the live deployment

| Category | Mobile before | Mobile after | Desktop after |
|---|---|---|---|
| Performance | 89 | 95 | 100 |
| Accessibility | 100 | 100 | 100 |
| Best practices | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 |

Mobile is measured under Lighthouse's simulated slow-4G throttling, so runs
vary by a few points; three consecutive runs gave 95, 96 and one discarded run
where Chrome failed to start. Target was 90.

Key numbers: LCP 2.4 s (was 2.6 s with 829 KB of PNGs), TBT 171 ms, CLS 0,
total page weight 449 KB (was 1094 KB).

### What changed

- **Contact form.** FormSubmit returned 522 on every request, so the form could
  not deliver anything. It now posts to `/api/contact`, a Vercel function that
  relays through Gmail SMTP. When delivery fails the visitor keeps their text
  and gets two prefilled routes: Gmail compose in a new tab, and a `mailto`
  link. Honeypot plus a time trap absorb bots without a captcha.
- **Sharing surface.** Rendered `public/og.png` at 1200x630 from a local HTML
  template, plus full OG and Twitter metadata, `metadataBase`, canonical URL,
  `robots.txt`, `sitemap.xml` and Person JSON-LD.
- **Images.** Every screenshot re-encoded to 1200x750 WebP at quality 82;
  `Projects.tsx` now points at `ngopikos.webp` instead of the 610 KB PNG.
  Image weight 829 KB to 181 KB.
- **LCP.** The hero screenshot carries `fetchPriority="high"` and an explicit
  preload, because `next/image` drops the priority hint in a static export.
- **Copy.** "AI and Fullstack Engineer" became "Fullstack Engineer"; the
  description now names the products instead of listing adjectives.

### Verification

- `npm run build` passes.
- `npx playwright test` — 5 specs pass: reachable contact section, native
  validation, successful post to `/api/contact`, provider failure offering
  Gmail plus `mailto`, honeypot dropping bots silently.
- `npm run test:handler` — 4 assertions on the function contract (405 for GET,
  503 without config, 400 for bad name/email).
- Live browser submission through the real form returns the success state, and
  the message arrives in the inbox with a correct `Reply-To`.
- `og.png` serves 200, `image/png`, 1200x630, 100 KB.

### Known limits

- `npm run lint` still reports 1920 problems, all in `src/components/Tools.tsx`,
  a file nothing imports. Left untouched; deleting it needs your word.
- Gmail SMTP caps around 500 recipients a day on a free account. Fine for a
  portfolio, not for bulk.
- Rate limiting is in-memory per warm function instance, so it slows abuse but
  does not stop it. Vercel's own limits are the real ceiling.
- `GMAIL_USER` and `GMAIL_APP_PASSWORD` live in the Vercel project environment,
  never in the repo. Rotating the app password means updating the variable and
  redeploying.

### Content pass

- **Education** now reads: S1 Teknik Informatika, Universitas Negeri Malang,
  S.Kom expected 2027, semester 7 of 8. The previous "4 production applications"
  line is gone, since the project labels said three shipped plus one
  open-source.
- **Experience section added**, built only from sources that can be checked:
  the Work Scheduler delivery to Kiev Fragrance (DTEI UM news article, 25 June
  2025, plus registered copyright EC002024223931) and the open-source
  documentation corpora on GitHub. Both link to their evidence.
- A band credit (guitarist, Lucien Sunmoon) exists on the public profiles but
  is left off the page, since it does not help a hiring decision.

### Still open, needs you

- P1-4: no outcome numbers on the projects. Anything specific you can share
  (users, orders, latency, uptime) makes the cards far stronger. Everything on
  the page right now is either a live product or a link that can be opened and
  checked.

---

## Audit artefacts

`.audit/lh-mobile.json`, `.audit/lh-desktop.json`, `.audit/axe.json`, `.audit/probe.cjs`, `.audit/formsubmit-response.html`.
`.audit/` is untracked and gitignored.
