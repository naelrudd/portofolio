// Minimal static file server for the Next.js export in dist/.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = Number(process.argv[2] || 4321);
const root = new URL("../dist/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
};

// Static export writes /work/foo.html, so try the clean URL a host would serve:
// the path itself, then path.html, then path/index.html.
async function resolve(base) {
  for (const candidate of [base, `${base}.html`, join(base, "index.html")]) {
    const info = await stat(candidate).catch(() => null);
    if (info?.isFile()) return candidate;
  }
  return null;
}

createServer(async (req, res) => {
  try {
    const url = decodeURIComponent((req.url || "/").split("?")[0]);
    const base = join(root, normalize(url).replace(/^(\.\.[/\\])+/, ""));
    const file = await resolve(base);
    if (!file) {
      // Mirror what the host does: serve the exported 404 page, not a bare string.
      const body = await readFile(join(root, "404.html")).catch(() => null);
      if (!body) throw new Error("not found");
      res.writeHead(404, { "Content-Type": types[".html"] });
      res.end(body);
      return;
    }
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`serving dist on ${port}`));
