// Builds the public site from site/: each page (an artifact source, no <html>/<head>) wrapped into a
// whole document, with what changes at every omabox release read from the omabox repo at its latest
// release tag: the version, every command and its help (bin/omabox), the changelog (CHANGELOG.md).
// The home page also gets the repo's contributors (people only: no bots, no AI agents), their avatars
// saved next to it. No dependencies; Node 18+.
//
//   node build.mjs              into dist/, for omabox.app; GITHUB_TOKEN, if set, is used for the API
//   SITE_URL=https://x.pages.dev node build.mjs
//                               for another address (links, link card), and keeps search engines out:
//                               anything but omabox.app gets noindex
//   node build.mjs --preview    into preview/: the other pages, for the artifact (AGENTS.md,
//                               "Publishing"); their links keep .html, as the artifact serves them
//
// If GitHub can't be reached, the home page keeps the contributors and the version written in its
// source and the build says so. The commands and changelog pages can't be made without the release,
// so then the build stops, and the site keeps its last deploy.

import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

const REPO = "diogochaves/omabox";
const HOME = "https://omabox.app";
const SITE = (process.env.SITE_URL || HOME).replace(/\/+$/, "");
const PREVIEW = process.argv.includes("--preview");
const OUT = PREVIEW ? "preview" : "dist";

// AI agents that show up as GitHub users. Bots (type "Bot", or a login ending in "[bot]": Claude,
// Codex, Copilot, Devin, Jules...) are dropped anyway; this catches agent accounts that are plain
// users. Only product names: never a first name (devin, jules, cody), which real people have.
const AGENT = /^(claude|anthropic|codex|openai|chatgpt|copilot|cursoragent|coderabbit|gemini-code|opencode|openhands)([-_.[]|$)/i;
const isPerson = c => c.type === "User" && !c.login.endsWith("[bot]") && !AGENT.test(c.login);

const PAGES = [
  { src: "omabox.html", out: "index.html", path: "/", home: true,
    title: "omabox: desktops for AI agents on Omarchy",
    desc: "omabox gives every AI agent a whole Omarchy desktop, invisible and in parallel. Your desktop stays untouched: no windows, no cursor moves, no stolen focus, no prompts.",
    card: "A whole Omarchy desktop for every AI agent, invisible and in parallel. Yours stays untouched." },
  { src: "how-it-works.html", out: "how-it-works.html", path: "/how-it-works", name: "How it works",
    title: "How omabox works: a desktop of its own for every agent",
    desc: "What an omabox box keeps off your desktop and how, what a box gets, one box per agent session, and how you look inside one." },
  { src: "commands.html", out: "commands.html", path: "/commands", name: "Commands",
    title: "omabox commands: every command and option",
    desc: "Every omabox command, its options and examples, read from omabox help at the latest release." },
  { src: "develop.html", out: "develop.html", path: "/develop", name: "Develop",
    title: "Develop for Omarchy with omabox",
    desc: "Test Omarchy shell plugins, themes and apps, and changes to Hyprland or Omarchy itself, in a box instead of on your desktop." },
  { src: "compare.html", out: "compare.html", path: "/compare", name: "Compare",
    title: "omabox, ai-jail, Cua and omarchy-in-omarchy compared",
    desc: "omabox is not a security boundary. When to pair it with ai-jail, and when Cua or omarchy-in-omarchy is what you need instead." },
  { src: "changelog.html", out: "changelog.html", path: "/changelog", name: "Changelog",
    title: "omabox changelog",
    desc: "What changed in each omabox release." },
  { src: "install.html", out: "install.html", path: "/install", name: "Install",
    title: "Install omabox",
    desc: "What omabox needs, how to install and check it, update it and remove it." },
];

const esc = s => String(s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
const headers = { accept: "application/vnd.github+json", "user-agent": "omabox-site-build" };
if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function github(path) {
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

// The latest release, "v0.4.3" → "0.4.3"; every page shows it in each <span class="ver">.
async function latestVersion() {
  const r = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const v = String((await r.json()).tag_name || "").replace(/^v/, "");
  if (!/^\d+\.\d+\.\d+$/.test(v)) throw new Error(`unexpected tag ${JSON.stringify(v)}`);
  return v;
}

async function atRelease(path) {
  const r = await fetch(`https://raw.githubusercontent.com/${REPO}/v${version}/${path}`);
  if (!r.ok) throw new Error(`${path} at v${version}: HTTP ${r.status}`);
  return r.text();
}

// ── omabox help, read from bin/omabox without running it ─────────────────────────────────────────
// The help is a heredoc (in usage_text(), or usage() before omabox had help per command): the
// commands' lines, a blank line, then the prose. With help per command, each paragraph comes after
// an "@" line naming the commands it is about, and `omabox help CMD` prints a command's lines and
// its paragraphs (and, for run, up's lines too); each command here gets the same. Without "@" lines
// the prose is one text, shown once, as the CLI prints it.
function helpText(script) {
  const m = script.match(/\n(?:usage_text|usage)\(\) \{\n {2}cat <<EOF\n([^]*?)\nEOF\n/);
  if (!m) throw new Error("bin/omabox: no usage_text heredoc");
  return m[1].replace(/\\([\\$`])|\$([A-Za-z_]\w*)/g, (_, escaped, name) => {
    if (escaped) return escaped;
    const v = script.match(new RegExp(`^${name}="([^"$\`\\\\]*)"$`, "m"));
    if (!v) throw new Error(`bin/omabox: the help uses $${name}, which has no plain value`);
    return v[1];
  });
}

function parseHelp(text) {
  const lines = text.split("\n").slice(2);   // "omabox: a contained ..." and a blank line
  const blank = lines.indexOf("");
  if (blank < 0) throw new Error("bin/omabox help: no blank line after the commands");
  const cmds = [], blocks = [], rest = [];
  let cur = null;
  for (const l of lines.slice(0, blank)) {
    const f = l.trim().split(/\s+/);
    if (f[0] === "omabox") cur = cmds.find(c => c.name === f[1]) || cmds[cmds.push({ name: f[1], lines: [] }) - 1];
    if (!cur) throw new Error(`bin/omabox help: a line before any command: ${l}`);
    cur.lines.push(l.replace(/^ {2}/, ""));
  }
  for (const l of lines.slice(blank + 1)) {
    if (l.startsWith("@")) blocks.push({ tags: l.trim().split(/\s+/).slice(1), lines: [] });
    else if (blocks.length) blocks[blocks.length - 1].lines.push(l);
    else rest.push(l);
  }
  if (blocks.length && rest.some(l => l.trim())) throw new Error(`bin/omabox help: prose before its first "@" line`);
  return { cmds, blocks, rest: rest.join("\n").trim() };
}

// Prose from the help or the changelog: `code`, **bold**, [links](url); everything else escaped.
function inline(s) {
  const code = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => `\u0000${code.push(c) - 1}\u0000`);
  s = esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(code[i])}</code>`);
}
const code = lines => `<pre class="code">${lines.map(l => `<span class="p">$ </span>${esc(l)}`).join("\n")}</pre>`;
const anchor = name => name.replace(/^-+/, "");

function commandsHtml(help, notes) {
  const byName = new Map(help.cmds.map(c => [c.name, c]));
  const known = new Set(notes.groups.flatMap(g => g.commands));
  for (const n of known) if (!byName.has(n)) console.warn(`commands: ${n} is in site/commands.json but not in omabox help (left out)`);
  const groups = notes.groups.map(g => ({ ...g, commands: g.commands.filter(n => byName.has(n)) }));
  const other = help.cmds.filter(c => !known.has(c.name)).map(c => c.name);
  if (other.length) {
    console.warn(`commands: not in site/commands.json yet, listed under Other: ${other.join(", ")}`);
    groups.push({ id: "other", title: "Other", commands: other });
  }
  const card = name => {
    const c = byName.get(name), n = notes.commands[name] || {}, id = anchor(name);
    const paras = help.blocks.filter(b => b.tags.includes(name));
    const up = name === "run" ? byName.get("up")?.lines || [] : [];
    const more = paras.length || up.length ? `
      <details class="wide"><summary>omabox help ${esc(name)}</summary>${up.length ? `
        <pre class="code">${esc(up.join("\n"))}</pre>` : ""}${paras.map(b => `
        <p>${inline(b.lines.join(" ").trim())}</p>`).join("")}
      </details>` : "";
    return `
    <article class="cmd card cut" id="${id}"><div class="in">
      <div><h3><a href="#${id}">omabox ${esc(name)}</a></h3>${n.say ? `<p style="margin-top:10px">${inline(n.say)}</p>` : ""}</div>
      ${n.examples?.length ? `<div class="ex"><span class="lbl">Examples</span>${code(n.examples)}</div>` : "<div></div>"}
      <pre class="code syn wide">${esc(c.lines.join("\n"))}</pre>${more}
    </div></article>`;
  };
  const names = help.blocks.find(b => b.lines[0]?.startsWith("NAME defaults to"));
  return `<nav class="jump" aria-label="Commands">${help.cmds.map(c => `<a href="#${anchor(c.name)}">${esc(c.name)}</a>`).join("")}${help.rest ? '<a href="#details">the details</a>' : ""}</nav>
    ${names ? `<p class="lead names">${inline(names.lines.join(" ").trim())}</p>` : ""}
    ${groups.map(g => `<section class="group" id="${esc(g.id)}">
    <h2>${esc(g.title)}</h2>${g.commands.map(card).join("")}
    </section>`).join("\n    ")}${help.rest ? `
    <section class="group" id="details">
    <h2>The details</h2>
    <p class="lead" style="margin-bottom:18px">The rest of <code>omabox help</code>: names, networks, windows, waiting, idle boxes and more, as the CLI prints it.</p>
    <pre class="code help">${esc(help.rest)}</pre>
    </section>` : ""}`;
}

// ── CHANGELOG.md: headings, paragraphs and lists of one level, which is all it uses ───────────────
function changelogHtml(md) {
  const start = md.search(/^## /m);
  if (start < 0) throw new Error("CHANGELOG.md: no version heading");
  const out = [];
  let para = null, item = null, list = false;
  const flush = () => {
    if (para) { out.push(`<p>${inline(para.join(" "))}</p>`); para = null; }
    if (item) { out.push(`<li>${inline(item.join(" "))}</li>`); item = null; }
  };
  const endList = () => { flush(); if (list) { out.push("</ul>"); list = false; } };
  for (const l of md.slice(start).split("\n")) {
    let m;
    if ((m = l.match(/^## (\S+)(?:\s+—\s+(.+))?$/))) {
      endList();
      const id = `v${m[1]}`;
      out.push(`<h2 id="${esc(id)}"><a href="#${esc(id)}">${esc(m[1])}</a>${m[2] ? `<small>${esc(m[2])}</small>` : ""}</h2>`);
    } else if ((m = l.match(/^#{3,} (.+)$/))) { endList(); out.push(`<h3>${inline(m[1])}</h3>`); }
    else if ((m = l.match(/^[-*] (.*)$/))) { flush(); if (!list) { out.push("<ul>"); list = true; } item = [m[1]]; }
    else if (!l.trim()) flush();
    else if (item && /^\s/.test(l)) item.push(l.trim());
    else { if (list) endList(); (para ||= []).push(l.trim()); }
  }
  endList();
  return out.join("\n      ");
}

// ── pages ────────────────────────────────────────────────────────────────────────────────────────
const head = page => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.desc)}">
<meta name="theme-color" content="#0b0c13">
${SITE === HOME ? (page.home ? '<meta name="google-site-verification" content="-2jD-QisVYY6LeZz7BjqZh5F_TZoDvAYAb3ViPGuCUQ">\n' : "") : '<meta name="robots" content="noindex">\n'}<link rel="canonical" href="${SITE}${page.path}">
<link rel="icon" href="media/icon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}${page.path}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.card || page.desc)}">
<meta property="og:image" content="${SITE}/media/og.png">
<meta name="twitter:card" content="summary_large_image">
${page.home ? `<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org", "@type": "SoftwareApplication", name: "omabox", url: `${SITE}/`,
  description: "A whole Omarchy desktop for every AI agent, invisible and in parallel, so your own desktop stays untouched.",
  applicationCategory: "DeveloperApplication", operatingSystem: "Linux (Omarchy)", softwareVersion: version,
  license: "https://opensource.org/licenses/MIT", codeRepository: `https://github.com/${REPO}`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
})}</script>\n` : ""}`;

let home = await readFile("site/omabox.html", "utf8");
let version = home.match(/<span class="ver">([^<]+)<\/span>/)?.[1];
if (!version) throw new Error('site/omabox.html: no <span class="ver"> with the version');
try {
  version = await latestVersion();
  console.log(`version: ${version}`);
} catch (e) {
  console.warn(`version: kept ${version} from site/omabox.html (${e.message})`);
}

// What the other pages share with the home page, taken from it so it is written once.
const pick = (re, what) => { const m = home.match(re); if (!m) throw new Error(`site/omabox.html: no ${what}`); return m[0]; };
const fonts = pick(/<link rel="preconnect"[^]*?<link rel="stylesheet" href="base\.css">/, "font and base.css links");
const sprite = pick(/<svg width="0" height="0"[^]*?<\/svg>/, "<svg> sprite");
const ghMark = pick(/<svg viewBox="0 0 16 16"[^]*?<\/svg>/, "GitHub mark");
const others = PAGES.filter(p => !p.home);
// The nav (a row on wide screens, a menu on narrow ones) and "Keep reading" are written once, in the
// home page; each other page gets them with its own link marked, or left out.
const nav = pick(/<!-- nav[^>]*-->[^]*?<!-- \/nav -->/, "<!-- nav --> block").replace(/^<!--[^>]*-->\s*|\s*<!--[^>]*-->$/g, "");
const more = pick(/ {2}<section class="sec more"[^]*?<\/section>/, "Keep reading section");
const header = cur => `<header class="top">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="omabox, the home page"><span class="bm static"><svg viewBox="0 0 15 15" shape-rendering="crispEdges" aria-hidden="true"><use href="#m"/></svg></span><span class="bw" aria-hidden="true">omabox</span></a>
    ${nav.replaceAll(`href="${cur.out}"`, `href="${cur.out}" aria-current="page"`)}
  </div>
</header>`;
const ending = cur => `${more.replace(new RegExp(`\\n[^\\n]*href="${cur.out}"[^\\n]*`), "")}${cur.out === "install.html" ? "" : `
  <section class="sec get">
    <div class="head"><p class="tag">Install</p><h2>Give every agent a desktop of its own.</h2>
      <p class="lead">Omarchy 4 with Hyprland 0.56 or later, and a GPU. Three minutes, then your agents take it from there.</p></div>
    <pre class="code"><span class="p">$ </span>git clone https://github.com/${REPO} &amp;&amp; cd omabox &amp;&amp; ./install.sh</pre>
    <div class="ctas"><a class="btn solid" href="install.html">Install guide</a><a class="btn gh" href="https://github.com/${REPO}">${ghMark}GitHub</a></div>
  </section>`}`;
const footer = pick(/ {2}<footer>[^]*?<\/footer>/, "footer").replace(/\s*<pre>[^]*?<\/pre>/, "");

const notes = JSON.parse(await readFile("site/commands.json", "utf8"));
const generated = {
  "commands.html": { commands: commandsHtml(parseHelp(helpText(await atRelease("bin/omabox"))), notes) },
  "changelog.html": { changelog: changelogHtml(await atRelease("CHANGELOG.md")) },
};
const fill = (html, page) => {
  html = html.replaceAll(/(<span class="ver">)[^<]+/g, `$1${version}`)
    .replaceAll("<!-- release-url -->", `https://github.com/${REPO}/releases/tag/v${version}`)
    .replaceAll("<!-- changelog-url -->", `https://github.com/${REPO}/blob/v${version}/CHANGELOG.md`);
  for (const [k, v] of Object.entries(generated[page.src] || {})) {
    if (!html.includes(`<!-- ${k} -->`)) throw new Error(`site/${page.src}: no <!-- ${k} --> marker`);
    html = html.replace(`<!-- ${k} -->`, v);
  }
  return html;
};
// On omabox.app pages have clean addresses (/commands); in the preview they stay files.
const links = html => PREVIEW ? html : html
  .replace(/href="index\.html(#[^"]*)?"/g, (_, h) => `href="/${h || ""}"`)
  .replace(new RegExp(`href="(${others.map(p => p.out.replace(".html", "")).join("|")})\\.html(#[^"]*)?"`, "g"), (_, p, h) => `href="/${p}${h || ""}"`);

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const page of PAGES) {
  if (PREVIEW && page.home) continue;   // the artifact's page is site/omabox.html itself
  let doc;
  if (page.home) {
    const body = home.indexOf("<svg");   // the <title>, fonts and <style> go in <head>; the rest is the body
    if (body < 0) throw new Error("site/omabox.html: no <svg> sprite where the body starts");
    let rest = fill(home.slice(body), page);
    try {
      const tiles = await contributors();
      if (!tiles.length) throw new Error("no contributors left after filtering");
      rest = rest.replace(/[ \t]*<!-- contributors:[^]*?<!-- \/contributors -->/, tiles.join("\n"));
      console.log(`contributors: ${tiles.length}`);
    } catch (e) {
      console.warn(`contributors: kept the list in site/omabox.html (${e.message})`);
    }
    doc = `${head(page)}${home.slice(0, body).replace(/<title>[^<]*<\/title>\n?/, "")}</head>\n<body>\n${rest}\n</body>\n</html>\n`;
  } else {
    const src = fill(await readFile(`site/${page.src}`, "utf8"), page);
    const style = src.match(/<style>[^]*?<\/style>/)?.[0] || "";
    const main = src.slice(src.indexOf("<main")).replace(/<\/main>\s*$/, `${ending(page)}\n\n${footer}\n</main>`);
    doc = `${head(page)}${fonts}\n${style}\n</head>\n<body>\n${sprite}\n\n${header(page)}\n\n${main}\n</body>\n</html>\n`;
  }
  await writeFile(`${OUT}/${page.out}`, links(doc));
  console.log(`built ${OUT}/${page.out}`);
}

if (PREVIEW) process.exit(0);
await cp("site/media", `${OUT}/media`, { recursive: true, filter: src => !src.endsWith("README.md") });
await cp("site/base.css", `${OUT}/base.css`);
if (SITE !== HOME) await writeFile(`${OUT}/_headers`, "/*\n  X-Robots-Tag: noindex\n");
// functions/_middleware.js (the www redirect) runs for these paths only, not for the media
await writeFile(`${OUT}/_routes.json`, JSON.stringify({ version: 1, include: ["/*"], exclude: ["/media/*"] }) + "\n");
// without these, Pages answers /robots.txt and /sitemap.xml with the page itself
await writeFile(`${OUT}/robots.txt`, SITE === HOME ? `User-agent: *\nAllow: /\nSitemap: ${HOME}/sitemap.xml\n` : "User-agent: *\nDisallow: /\n");
const today = new Date().toISOString().slice(0, 10);
if (SITE === HOME) await writeFile(`${OUT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${PAGES.map(p => `<url><loc>${HOME}${p.path}</loc><lastmod>${today}</lastmod></url>`).join("")}</urlset>\n`);
console.log(`built ${OUT}/ for ${SITE}${SITE === HOME ? "" : " (noindex)"}`);
