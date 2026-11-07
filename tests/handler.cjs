// Exercises api/contact.js without sending mail: method guard, config guard, validation.
const http = require("http");
const handler = require("../api/contact.js");

function call({ method = "POST", body, headers = {} }) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      res.status = (code) => {
        res.statusCode = code;
        return res;
      };
      res.json = (payload) => {
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify(payload));
      };
      req.body = body;
      handler(req, res);
    });
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      const payload = body === undefined ? "" : JSON.stringify(body);
      const req = http.request(
        {
          port,
          method,
          path: "/api/contact",
          host: "127.0.0.1",
          headers: { "content-type": "application/json", ...headers },
        },
        (res) => {
          let text = "";
          res.on("data", (c) => (text += c));
          res.on("end", () => {
            server.close();
            resolve({ status: res.statusCode, body: text });
          });
        }
      );
      if (payload && method !== "GET") req.write(payload);
      req.end();
    });
  });
}

(async () => {
  const results = [];

  results.push(["GET is rejected", await call({ method: "GET" })]);

  delete process.env.GMAIL_USER;
  delete process.env.GMAIL_APP_PASSWORD;
  results.push(["missing config", await call({ body: { name: "a", email: "a@b.co", message: "hello" } })]);

  process.env.GMAIL_USER = "owner@gmail.com";
  process.env.GMAIL_APP_PASSWORD = "app-password-placeholder";
  results.push(["bad payload", await call({ body: { name: "", email: "nope", message: "x" } })]);
  results.push(["bad email", await call({ body: { name: "A", email: "a@b", message: "hello there" } })]);

  for (const [label, r] of results) console.log(label.padEnd(20), r.status, r.body);
  const ok = results[0][1].status === 405 && results[1][1].status === 503 && results[2][1].status === 400 && results[3][1].status === 400;
  console.log(ok ? "CONTRACT OK" : "CONTRACT FAILED");
  process.exit(ok ? 0 : 1);
})();
