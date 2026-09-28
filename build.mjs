// Builds the public site into dist/: site/omabox.html (an artifact source, no <html>/<head>) wrapped
// into a whole document, its media, and the omabox repo's contributors (people only: no bots, no AI
// agents), with their avatars saved next to the page. No dependencies; Node 18+.
//
//   node build.mjs              GITHUB_TOKEN, if set, is used for the API (optional)
//
// If GitHub can't be reached, the page keeps the contributors written in the source and the build
// says so; the rest of the site still builds.

import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

const REPO = "diogochaves/omabox";
const SITE = "https://omabox.app";
const OUT = "dist";

// AI agents that show up as GitHub users. Bots (type "Bot", or a login ending in "[bot]": Claude,
// Codex, Copilot, Devin, Jules...) are dropped anyway; this catches agent accounts that are plain
// users. Only product names: never a first name (devin, jules, cody), which real people have.
const AGENT = /^(claude|anthropic|codex|openai|chatgpt|copilot|cursoragent|coderabbit|gemini-code|opencode|openhands)([-_.[]|$)/i;
const isPerson = c => c.type === "User" && !c.login.endsWith("[bot]") && !AGENT.test(c.login);

const esc = s => String(s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

async function github(path) {
  const headers = { accept: "application/vnd.github+json", "user-agent": "omabox-site-build" };
  if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const out = [];
  for (let page = 1; ; page++) {
    const r = await fetch(`https://api.github.com${path}?per_page=100&page=${page}`, { headers });
    if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
    const batch = await r.json();
    out.push(...batch);
    if (batch.length < 100) return out;
  }
}

async function contributors() {
  const people = (await github(`/repos/${REPO}/contributors`)).filter(isPerson);
  people.sort((a, b) => a.login.localeCompare(b.login, "en", { sensitivity: "base" }));
  await mkdir(`${OUT}/media/avatars`, { recursive: true });
  const tiles = [];
  for (const p of people) {
    const r = await fetch(`${p.avatar_url}${p.avatar_url.includes("?") ? "&" : "?"}s=144`);
    if (!r.ok) throw new Error(`avatar of ${p.login}: HTTP ${r.status}`);
    const ext = (r.headers.get("content-type") || "").includes("png") ? "png" : "jpg";
    const file = `media/avatars/${p.login.toLowerCase()}.${ext}`;
    await writeFile(`${OUT}/${file}`, Buffer.from(await r.arrayBuffer()));
    tiles.push(`        <li><a class="cut" href="https://github.com/${esc(p.login)}"><span class="in"><img src="${file}" alt="" width="72" height="72" loading="lazy">${esc(p.login)}</span></a></li>`);
  }
  return tiles;
}

const head = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="omabox gives every AI agent a whole Omarchy desktop, invisible and in parallel. Your desktop stays untouched: no windows, no cursor moves, no stolen focus, no prompts.">
<meta name="theme-color" content="#0b0c13">
<link rel="canonical" href="${SITE}/">
<link rel="icon" href="media/icon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}/">
<meta property="og:title" content="omabox: agents off your desktop">
<meta property="og:description" content="A whole Omarchy desktop for every AI agent, invisible and in parallel. Yours stays untouched.">
<meta property="og:image" content="${SITE}/media/og.png">
<meta name="twitter:card" content="summary_large_image">
`;

let page = await readFile("site/omabox.html", "utf8");
page = page.replace(/<title>[^<]*<\/title>/, "<title>omabox: agents off your desktop</title>");
const body = page.indexOf("<svg");   // the <title>, fonts and <style> go in <head>; the rest is the body
if (body < 0) throw new Error("site/omabox.html: no <svg> sprite where the body starts");

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp("site/media", `${OUT}/media`, { recursive: true, filter: src => !src.endsWith("README.md") });

let rest = page.slice(body);
try {
  const tiles = await contributors();
  if (!tiles.length) throw new Error("no contributors left after filtering");
  rest = rest.replace(/[ \t]*<!-- contributors:[^]*?<!-- \/contributors -->/, tiles.join("\n"));
  console.log(`contributors: ${tiles.length}`);
} catch (e) {
  console.warn(`contributors: kept the list in site/omabox.html (${e.message})`);
}

await writeFile(`${OUT}/index.html`, `${head}${page.slice(0, body)}</head>\n<body>\n${rest}\n</body>\n</html>\n`);
console.log(`built ${OUT}/index.html`);
