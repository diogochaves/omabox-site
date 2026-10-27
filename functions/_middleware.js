// Runs for every path but /media/* (dist/_routes.json, written by build.mjs).
//
// www.omabox.app is attached to the Pages project only to send people to omabox.app: a permanent
// redirect, path and query kept.
//
// A page asked for as Markdown gets its Markdown twin: a GET or HEAD of a page's address (/, /install,
// /next...) whose Accept header prefers text/markdown to text/html gets /index.md, /install.md,
// /next.md... (build.mjs writes them beside the pages), as text/markdown. A page's own response gets
// Vary: Accept, since its address now answers by it. Everything else passes through untouched.

// The quality an Accept header gives a media type, and where it says so: the most specific entry that
// matches wins (text/html, then text/*, then */*). No match is quality 0.
export function accepts(header, type) {
  const major = type.split("/")[0];
  let best = { q: 0, at: Infinity, rank: -1 };
  String(header || "").split(",").forEach((part, at) => {
    const [range, ...params] = part.trim().toLowerCase().split(";").map(s => s.trim());
    const rank = range === type ? 2 : range === `${major}/*` ? 1 : range === "*/*" ? 0 : -1;
    if (rank <= best.rank) return;
    const q = params.map(p => /^q=([\d.]+)$/.exec(p)).find(Boolean);
    best = { q: q ? Math.min(1, Number(q[1]) || 0) : 1, at, rank };
  });
  return best;
}

// Markdown only when the header names it (a */* alone never asks for it) and ranks it above HTML: a
// higher quality, or the same quality and listed first.
export function prefersMarkdown(header) {
  const md = accepts(header, "text/markdown"), html = accepts(header, "text/html");
  if (md.rank < 2 || md.q <= 0) return false;
  return md.q > html.q || (md.q === html.q && md.at < html.at);
}

// A page's address, as its twin's: "/" → "/index.md", "/next", "/next/" or "/next.html" → "/next.md".
// Anything else (a file with another extension, llms.txt, a twin itself) is not a page: null.
export function twinOf(pathname) {
  const p = pathname.replace(/\/+$/, "").replace(/\.html$/, "");
  if (p === "" || p === "/index") return "/index.md";
  return /^\/[\w-]+$/.test(p) ? `${p}.md` : null;
}

export const onRequest = async ({ request, next, env }) => {
  const url = new URL(request.url);
  if (url.hostname === "www.omabox.app") {
    url.hostname = "omabox.app";
    return Response.redirect(url.toString(), 301);
  }
  const twin = (request.method === "GET" || request.method === "HEAD") && twinOf(url.pathname);
  if (!twin) return next();
  if (prefersMarkdown(request.headers.get("accept"))) {
    const md = await env.ASSETS.fetch(new Request(new URL(twin, url), { method: request.method }));
    // Pages answers an address it has no file for with the home page, as HTML: then there is no twin.
    if (md.ok && !(md.headers.get("content-type") || "").includes("text/html")) {
      const headers = new Headers(md.headers);
      headers.set("content-type", "text/markdown; charset=utf-8");
      headers.set("vary", "Accept");
      return new Response(md.body, { status: 200, headers });
    }
  }
  const page = await next();
  const res = new Response(page.body, page);
  res.headers.append("vary", "Accept");
  return res;
};
