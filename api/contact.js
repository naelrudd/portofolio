// Vercel serverless function: delivers the contact form straight through Gmail SMTP.
//
// Required environment variables, set in the Vercel project (never in the repo):
//   GMAIL_USER           the full Gmail address that sends and receives
//   GMAIL_APP_PASSWORD   16-character Google app password, not the account password
// Optional:
//   CONTACT_TO           override the recipient (defaults to GMAIL_USER)
const nodemailer = require("nodemailer");

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

function clean(value, limit) {
  return String(value ?? "").replace(/\r\n/g, "\n").trim().slice(0, limit);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    return res.status(503).json({
      ok: false,
      error: "Mail is not configured on the server.",
    });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: "Too many messages. Try again later." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body ?? {};

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);

  if (!name || !isEmail(email) || message.length < 5) {
    return res.status(400).json({ ok: false, error: "Name, a valid email and a message are required." });
  }

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  try {
    await transport.sendMail({
      from: `"Portfolio form" <${user}>`,
      to: process.env.CONTACT_TO || user,
      replyTo: `"${name}" <${email}>`,
      subject: `Portfolio enquiry from ${name}`,
      text: `${message}\n\n---\n${name} <${email}>\nSent from the portfolio contact form.`,
      headers: { "X-Entity-Ref-ID": `${Date.now()}` },
    });
    return res.status(200).json({ ok: true });
  } catch (cause) {
    console.error("contact send failed", cause);
    return res.status(502).json({ ok: false, error: "The message could not be sent." });
  }
};
