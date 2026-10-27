// Builds the public site from site/: each page (an artifact source, no <html>/<head>) wrapped into a
// whole document, with what changes at every omabox release read from the omabox repo at its latest
// release tag: the version, every command and its help (bin/omabox), the changelog (CHANGELOG.md).
// The home page also gets the repo's contributors (people only: no bots, no AI agents), their avatars
// saved next to it. For agents, each page also gets a Markdown twin (/uses.md...), /install.md is
// the setup guide (site/install-agent.md), and /llms.txt lists them. No dependencies; Node 18+.
//
//   node build.mjs              into dist/, for omabox.app; GITHUB_TOKEN, if set, is used for the API
//   SITE_URL=https://x.pages.dev node build.mjs
//                               for another address (links, link card), and keeps search engines out:
//                               anything but omabox.app gets noindex
//   node build.mjs --preview    into preview/: the other pages, for the artifact (AGENTS.md,
//                               "Publishing"); their links keep .html, as the artifact serves them
//   OUT=DIR node build.mjs --preview   the same, into DIR
//
// If GitHub can't be reached, the home page keeps the contributors and the version written in its
// source and the build says so. The commands and changelog pages can't be made without the release,
// so then the build stops, and the site keeps its last deploy.

import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
// The link card's address changes with the card: X and others keep a card by its URL for days.
const OG_V = createHash("sha256").update(await readFile("site/media/og.png")).digest("hex").slice(0, 8);

const REPO = "diogochaves/omabox";
const HOME = "https://omabox.app";
const SITE = (process.env.SITE_URL || HOME).replace(/\/+$/, "");
const PREVIEW = process.argv.includes("--preview");
const OUT = process.env.OUT || (PREVIEW ? "preview" : "dist");   // OUT=DIR: elsewhere, e.g. one builder each

// AI agents that show up as GitHub users. Bots (type "Bot", or a login ending in "[bot]": Claude,
// Codex, Copilot, Devin, Jules...) are dropped anyway; this catches agent accounts that are plain
// users. Only product names: never a first name (devin, jules, cody), which real people have.
const AGENT = /^(claude|anthropic|codex|openai|chatgpt|copilot|cursoragent|coderabbit|gemini-code|opencode|openhands)([-_.[]|$)/i;
const isPerson = c => c.type === "User" && !c.login.endsWith("[bot]") && !AGENT.test(c.login);

const PAGES = [
  { src: "omabox.html", out: "index.html", path: "/", home: true,
    title: "omabox: desktops of their own for your coding agents",
    desc: "omabox gives every coding agent a whole Hyprland desktop to test its work in: invisible, one per agent, gone when the agent is. Yours stays untouched: no windows, no cursor moves, no stolen focus, no prompts.",
    card: "A whole Hyprland desktop for every coding agent, invisible and in parallel. Yours stays untouched." },
  { src: "how-it-works.html", out: "how-it-works.html", path: "/how-it-works", name: "How it works",
    title: "How omabox works: a desktop of its own for every agent",
    desc: "The four steps, what a box keeps off your desktop and how, what a box gets, 1.0's hardening and the ten rules, and how agents use it on their own." },
  { src: "uses.html", out: "uses.html", path: "/uses", name: "Uses",
    title: "What people use omabox for",
    desc: "Testing is where omabox started. Videos of what you made, shots at 2x or 4K, a clean setup that isn't yours, monitors you don't have, and more, in a box instead of on your desktop." },
  { src: "omarchy.html", out: "omarchy.html", path: "/omarchy", name: "Omarchy",
    title: "omabox on Omarchy",
    desc: "omabox was born on Omarchy and is fullest there: Omarchy's own config and shell in every box, your theme and bar, your plugins, and a widget in your bar." },
  { src: "commands.html", out: "commands.html", path: "/commands", name: "Commands",
    title: "omabox commands: every command and option",
    desc: "Every omabox command, its options and examples, read from omabox help at the latest release, and the contract your scripts can keep." },
  { src: "develop.html", out: "develop.html", path: "/develop", name: "Develop",
    title: "Develop with omabox: apps, plugins, themes, Hyprland",
    desc: "Test apps, shell plugins and themes, and changes to Hyprland itself, in a box instead of on your desktop: visual checks, accessibility trees, videos and sound." },
  { src: "compare.html", out: "compare.html", path: "/compare", name: "ai-jail",
    title: "omabox and ai-jail",
    desc: "omabox is not a security boundary. ai-jail fences what an agent can read, write and reach; omabox decides where it draws. The two recipes that pair them." },
  { src: "next.html", out: "next.html", path: "/next", name: "Coming",
    title: "What's coming to omabox",
    desc: "omabox beyond Omarchy: plain Hyprland boxes, your own shell, your own Hyprland desktop in a box. What has run so far, and what hasn't." },
  { src: "changelog.html", out: "changelog.html", path: "/changelog", name: "Changelog",
    title: "omabox changelog",
    desc: "What each omabox release added, and every change." },
  { src: "install.html", out: "install.html", path: "/install", name: "Install",
    title: "Install omabox",
    desc: "What omabox needs, how to install and check it, upgrade to 1.0, update and remove it, and the questions people ask." },
];

// What omabox is, in three lines, at the top of /llms.txt (the home page's words).
const LLMS_SUMMARY = [
  "omabox gives every coding agent a whole Hyprland desktop to test its work in: invisible, one per agent, gone when the agent is.",
  "Your own desktop stays untouched: no windows, no cursor moves, no stolen focus, no prompts. Built for agents to drive; not a security boundary.",
  "Today on Omarchy 4 with Hyprland 0.56 or later, on AMD, Intel or NVIDIA GPUs. MIT, every line.",
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
    tiles.push(`            <li><a href="https://github.com/${esc(p.login)}" title="${esc(p.login)}"><img src="${file}" alt="${esc(p.login)}" width="38" height="38" loading="lazy"></a></li>`);
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

// The commands by group, as site/commands.json sorts them; one the help has and the file hasn't goes
// under Other. Shared by the page and its Markdown twin.
function groupCommands(help, notes) {
  const byName = new Map(help.cmds.map(c => [c.name, c]));
  const known = new Set(notes.groups.flatMap(g => g.commands));
  for (const n of known) if (!byName.has(n)) console.warn(`commands: ${n} is in site/commands.json but not in omabox help (left out)`);
  const groups = notes.groups.map(g => ({ ...g, commands: g.commands.filter(n => byName.has(n)) }));
  const other = help.cmds.filter(c => !known.has(c.name)).map(c => c.name);
  if (other.length) {
    console.warn(`commands: not in site/commands.json yet, listed under Other: ${other.join(", ")}`);
    groups.push({ id: "other", title: "Other", commands: other });
  }
  return { byName, groups };
}

function commandsHtml(help, notes, { byName, groups }) {
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
    <article class="cmdc card" id="${id}"><div class="in">
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

// ── Markdown twins, for agents ───────────────────────────────────────────────────────────────────
// Every page also goes out as Markdown (/uses.md...), made from the same source as the page so the
// two never drift: a small HTML-to-Markdown pass over its <main> that keeps the words, the commands
// and the links (made absolute), and leaves out what is only drawn: scripts, styles, inline SVG,
// buttons, the page's own navigation, anything aria-hidden, a figure with no picture in it, the
// mock-ups whose classes are in DRAWN, and any element marked data-md="skip" (the build takes that
// mark out of the HTML). /commands' list and /changelog's log are written from omabox's help and
// CHANGELOG.md directly, as their pages are.
const DRAWN = new Set([
  "scene", "lg", "fleet", "feed", "tabpane", "pic", "desk", "mach", "graph", "licp", "viz", "ws-bar",
  "wsl", "pill", "you2", "ports", "rels", "drive", "wd", "ver45", "num", "pjump",
]);
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const UNSAID = new Set(["script", "style", "svg", "button", "nav", "footer", "template", "noscript", "input", "select", "textarea"]);
const BLOCK = new Set(["article", "aside", "blockquote", "details", "div", "dl", "figcaption", "figure", "footer", "header",
  "h1", "h2", "h3", "h4", "h5", "h6", "hr", "li", "main", "nav", "ol", "p", "pre", "section", "summary", "table", "ul"]);
const ENTITY = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = s => s.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (m, e) => e[0] !== "#" ? ENTITY[e] ?? m
  : String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : Number(e.slice(1))));

// Enough of an HTML parser for pages written by hand: elements, text and comments, in a tree.
function parseHtml(html) {
  const root = { tag: "#root", attrs: {}, kids: [] }, stack = [root];
  const re = /<!--([^]*?)-->|<(\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^'">])*)>|[^<]+|</g;
  for (let m; (m = re.exec(html));) {
    const top = stack[stack.length - 1];
    if (m[1] !== undefined) top.kids.push({ comment: m[1].trim() });
    else if (!m[3]) top.kids.push({ text: m[0] });
    else if (m[2]) {
      const i = stack.findLastIndex(n => n.tag === m[3].toLowerCase());
      if (i > 0) stack.length = i;
    } else {
      const el = { tag: m[3].toLowerCase(), attrs: {}, kids: [], parent: top };
      for (const a of m[4].matchAll(/([^\s=/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) el.attrs[a[1].toLowerCase()] = decode(a[2] ?? a[3] ?? a[4] ?? "");
      top.kids.push(el);
      if (el.tag === "script" || el.tag === "style") {
        const end = html.toLowerCase().indexOf(`</${el.tag}`, re.lastIndex);
        re.lastIndex = end < 0 ? html.length : html.indexOf(">", end) + 1;
      } else if (!VOID.has(el.tag) && !m[4].endsWith("/")) stack.push(el);
    }
  }
  return root;
}

const classes = el => (el?.attrs?.class || "").split(/\s+/);
const textOf = n => n.text !== undefined ? decode(n.text) : n.kids ? n.kids.map(textOf).join("") : "";
const holds = (n, test) => (n.kids || []).some(k => test(k) || holds(k, test));
const unsaid = el => el.attrs["aria-hidden"] === "true" || el.attrs["data-md"] === "skip"
  || UNSAID.has(el.tag) && !(el.tag === "button" && el.attrs.role === "tab")
  || classes(el).some(c => DRAWN.has(c))
  || classes(el).includes("tag") && classes(el.parent).includes("head")   // the page's name above its h1
  || el.tag === "figure" && !holds(el, k => k.tag === "img" || k.tag === "video")
  || el.tag === "img" && !el.attrs.alt;
const isBlock = n => !!n.tag && (BLOCK.has(n.tag) || n.tag === "a" && n.kids.some(isBlock));
const ticks = s => { const f = "`".repeat(Math.max(0, ...(s.match(/`+/g) || []).map(t => t.length)) + 1); return `${f}${/^`|`$/.test(s) ? ` ${s} ` : s}${f}`; };
const fenced = s => { const f = "`".repeat(Math.max(2, ...(s.match(/`+/g) || []).map(t => t.length)) + 1); return `${f}\n${s}\n${f}`; };

function markdown(html, page, raw = {}) {
  const url = href => /^[a-z][\w+.-]*:/i.test(href) ? href
    : href.startsWith("#") ? `${SITE}${page.path}${href}`
    : href.replace(/^([\w-]+)\.html(#.*)?$/, (_, p, h = "") => `/${p === "index" ? "" : p}${h}`).replace(/^(?!\/)/, "/").replace(/^/, SITE);

  // Inline: text with **bold**, `code` and [links](...). Two pieces that would touch word to word
  // (a label and its title, two names in a row) get a " · " between them, as the page sets them apart.
  const inline = nodes => {
    let out = "", prev = null;
    for (const n of nodes) {
      const s = piece(n);
      if (!s) continue;
      const a = prev && textOf(prev).slice(-1), b = textOf(n)[0];
      if (prev && (prev.tag || n.tag) && a && b && !/\s/.test(a + b) && !/\s$/.test(out)) {
        if (/[\p{L}\p{N}]/u.test(a) && /[\p{L}\p{N}]/u.test(b) || prev.tag && n.tag && !/[.,;:!?)\]]/.test(b)) out += " · ";
        else if (/[.,;:!?]/.test(a) && /[\p{L}\p{N}]/u.test(b)) out += " ";
      }
      out += s;
      prev = n;
    }
    return out;
  };
  const piece = n => {
    if (n.text !== undefined) return decode(n.text).replace(/\s+/g, " ");
    if (!n.tag || unsaid(n)) return "";
    switch (n.tag) {
      case "br": return "\n";
      case "b": case "strong": { const s = inline(n.kids); return s.trim() ? s.replace(/^(\s*)(.*?)(\s*)$/s, "$1**$2**$3") : s; }
      case "code": case "kbd": { const s = textOf(n).replace(/\s+/g, " "); return s.trim() ? ticks(s) : ""; }
      case "img": return `![${n.attrs.alt}](${url(n.attrs.src)})`;
      case "video": return `[Video](${url(n.attrs.src)})`;
      case "a": {
        const only = n.kids.filter(k => k.tag || textOf(k).trim());
        const s = only.length === 1 && only[0].tag === "img" ? only[0].attrs.alt : inline(n.kids).trim();
        return s && n.attrs.href ? `[${s}](${url(n.attrs.href)})` : s;
      }
      default: return inline(n.kids);
    }
  };
  const para = nodes => inline(nodes).split("\n").map(l => l.replace(/ {2,}/g, " ").trim()).join("\n").replace(/^\n+|\n+$/g, "");

  // Blocks: a run of inline nodes is a paragraph; each block element is rendered by kind. A short
  // label right above a heading (a step's number, a card's tag) joins it: "### 1. It starts one".
  const isLabel = s => s.length <= 40 && !/\n|[.!?:]$|\]\(|^([#*`!]|- )/.test(s);
  const blocks = (nodes, ctx) => {
    const out = [];
    let run = [], label = false;
    const push = (b, lab) => { if (b) { out.push(b); label = lab && isLabel(b); } };
    const flush = () => { if (run.length) push(para(run), true); run = []; };
    for (const n of nodes) {
      if (n.comment !== undefined && n.comment in raw) { flush(); push(raw[n.comment], false); }
      else if (n.tag && !unsaid(n) && (isBlock(n) || n.attrs.role === "tablist")) {
        flush();
        if (/^h[1-6]$/.test(n.tag) && label) push(block(n, ctx, out.pop()), false);
        else push(block(n, ctx), n.tag === "p");
      } else run.push(n);
    }
    flush();
    return out;
  };
  const list = (items, ordered) => {
    const out = items.map((bs, i) => {
      const mark = ordered ? `${i + 1}. ` : "- ";
      return bs.join("\n\n").split("\n").map((l, j) => j === 0 ? mark + l : l && " ".repeat(mark.length) + l).join("\n");
    });
    return out.join(out.some(s => s.includes("\n\n")) ? "\n\n" : "\n");
  };
  const block = (n, ctx, label) => {
    const h = /^h([1-6])$/.exec(n.tag);
    if (h) {
      let t = para(n.kids).replace(/\n/g, " ").replace(/\*\*/g, "");
      if (t && label) t = `${label.startsWith("-") ? ticks(label) : label}${/^\d+$/.test(label) ? "." : ":"} ${t}`;
      // The page's h1 is its headline; the twin's own "# " is the page's title.
      return !t ? "" : n.tag === "h1" || ctx.list ? `**${t}**` : `${"#".repeat(Number(h[1]))} ${t}`;
    }
    if (n.attrs.role === "tablist") return list(n.kids.filter(k => k.tag && !unsaid(k)).map(k => [para(k.kids)]).filter(([s]) => s), false);
    switch (n.tag) {
      case "p": { const t = para(n.kids); return t && classes(n).includes("who") ? `**${t}**` : t; }
      case "figcaption": return para(n.kids);
      case "pre": return fenced(textOf(n).replace(/^\n|\s+$/g, ""));
      case "hr": return "---";
      case "ul": case "ol": return list(n.kids.filter(k => k.tag === "li" && !unsaid(k)).map(li => blocks(li.kids, { ...ctx, list: true })).filter(bs => bs.length), n.tag === "ol");
      case "details": {
        const sum = n.kids.find(k => k.tag === "summary");
        return [sum && `**${para(sum.kids)}**`, ...blocks(n.kids.filter(k => k !== sum), ctx)].filter(Boolean).join("\n\n");
      }
      case "table": {
        const rows = [], walk = el => el.kids.forEach(k => k.tag === "tr" ? rows.push(k) : k.kids && walk(k));
        walk(n);
        const cells = rows.map(r => r.kids.filter(k => k.tag === "td" || k.tag === "th"));
        const cell = c => para(c.kids).replace(/\n/g, " ").replace(/\|/g, "\\|");
        if (cells[0]?.every(c => c.tag === "th")) {
          const line = cs => `| ${cs.map(cell).join(" | ")} |`;
          return [line(cells[0]), `|${cells[0].map(() => " --- |").join("")}`, ...cells.slice(1).map(line)].join("\n");
        }
        return list(cells.map(cs => [cs.map(cell).join(": ")]), false);
      }
      case "a": {
        // A card that is a link: its heading carries the link, or a line under it does.
        const md = blocks(n.kids, ctx).join("\n\n"), to = url(n.attrs.href);
        return /^#+ /m.test(md) ? md.replace(/^(#+ )(.*)$/m, `$1[$2](${to})`) : `${md}\n\n[More](${to})`;
      }
      default: return blocks(n.kids, ctx).join("\n\n");
    }
  };

  const at = html.indexOf("<main"), end = html.lastIndexOf("</main>");
  if (at < 0) throw new Error(`site/${page.src}: no <main> for its Markdown twin`);
  const main = parseHtml(html.slice(at, end < 0 ? undefined : end + 7)).kids.find(k => k.tag === "main");
  return blocks(main.kids, {}).join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
}

// /commands' list for agents: each command's line and examples from site/commands.json, then its
// lines and paragraphs from omabox help, as the page has them.
function commandsMd(help, notes, { byName, groups }) {
  const shell = lines => fenced(lines.map(l => `$ ${l}`).join("\n"));
  const names = help.blocks.find(b => b.lines[0]?.startsWith("NAME defaults to"));
  const cmd = name => {
    const c = byName.get(name), n = notes.commands[name] || {};
    const up = name === "run" ? byName.get("up")?.lines || [] : [];
    const paras = help.blocks.filter(b => b.tags.includes(name)).map(b => b.lines.join(" ").trim());
    return [`#### omabox ${name}`, n.say, n.examples?.length && `Examples:\n\n${shell(n.examples)}`, fenced(c.lines.join("\n")),
      (paras.length || up.length) && `\`omabox help ${name}\` adds:`, up.length && fenced(up.join("\n")), ...paras]
      .filter(Boolean).join("\n\n");
  };
  return [names && names.lines.join(" ").trim(),
    ...groups.map(g => [`### ${g.title}`, ...g.commands.map(cmd)].join("\n\n")),
    help.rest && `### The details\n\nThe rest of \`omabox help\`: names, networks, windows, waiting, idle boxes and more, as the CLI prints it.\n\n${fenced(help.rest)}`,
  ].filter(Boolean).join("\n\n");
}

// /changelog's log for agents: CHANGELOG.md itself from its first version on, each heading a level
// down so the versions sit under the page's own "Every change" heading.
const changelogMd = md => md.slice(md.search(/^## /m)).replace(/^(#{2,}) /gm, "#$1 ").trim();

// Where each page's twin goes: /install.md is the setup guide (site/install-agent.md), so /install's
// own twin is /install-page.md.
const twin = page => page.home ? "index.md" : page.out === "install.html" ? "install-page.md" : page.out.replace(/\.html$/, ".md");
// What a page's head points an agent to: its twin, but /install points to the setup guide.
const alternate = page => page.out === "install.html" ? "install.md" : twin(page);

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
${PREVIEW ? "" : `<link rel="alternate" type="text/markdown" href="/${alternate(page)}">\n`}<link rel="icon" href="media/icon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}${page.path}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.card || page.desc)}">
<meta property="og:image" content="${SITE}/media/og.png?v=${OG_V}">
<meta name="twitter:card" content="summary_large_image">
${page.home ? `<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org", "@type": "SoftwareApplication", name: "omabox", url: `${SITE}/`,
  description: "A whole Hyprland desktop for every coding agent, invisible and in parallel, so your own desktop stays untouched.",
  applicationCategory: "DeveloperApplication", operatingSystem: "Linux (Hyprland; Omarchy 4 today)", softwareVersion: version,
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
// The nav (a row on wide screens, a menu on narrow ones) is written once, in the home page; each
// other page gets it with its own link marked.
const nav = pick(/<!-- nav[^>]*-->[^]*?<!-- \/nav -->/, "<!-- nav --> block").replace(/^<!--[^>]*-->\s*|\s*<!--[^>]*-->$/g, "");
const header = cur => `<header class="top-bar sub">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="omabox, the home page"><span class="bm static"><svg viewBox="0 0 15 15" shape-rendering="crispEdges" aria-hidden="true"><use href="#m"/></svg></span><span class="bw" aria-hidden="true">omabox</span></a>
    ${nav.replaceAll(`href="${cur.out}"`, `href="${cur.out}" aria-current="page"`)}
  </div>
</header>`;
// Every page ends the same way: the call to install (not on /install), then what's coming (not on /next).
const ending = cur => `${cur.out === "install.html" ? "" : `
  <div class="inst">
    <h2>Give every agent <i>a desktop of its own.</i></h2>
    <div class="icmd"><code>git clone https://github.com/${REPO} &amp;&amp; cd omabox &amp;&amp; ./install.sh</code></div>
    <p class="req">Today on Omarchy 4 · Hyprland 0.56+ · AMD, Intel or NVIDIA · MIT</p>
    <div class="ctas"><a class="btn solid" href="install.html">Install guide</a><a class="btn" href="https://github.com/${REPO}">${ghMark}GitHub</a></div>
  </div>`}${cur.out === "next.html" ? "" : `
  <a class="strip" href="next.html"><b>What's coming</b><span>Plain Hyprland boxes · Your own shell · Your own Hyprland desktop, in a box →</span></a>`}`;
const footer = pick(/ {2}<footer>[^]*?<\/footer>/, "footer").replace(/\s*<pre>[^]*?<\/pre>/, "");
// Landing on a linked section once the fonts are in (written once, in the home page, like the nav).
const landing = pick(/<!-- landing[^>]*-->[^]*?<!-- \/landing -->/, "<!-- landing --> block").replace(/^<!--[^>]*-->\s*|\s*<!--[^>]*-->$/g, "");

const notes = JSON.parse(await readFile("site/commands.json", "utf8"));
const help = parseHelp(helpText(await atRelease("bin/omabox"))), grouped = groupCommands(help, notes);
const changelog = await atRelease("CHANGELOG.md");
// What fills each page's <!-- markers -->, as HTML for the page and as Markdown for its twin.
const generated = {
  "commands.html": { commands: commandsHtml(help, notes, grouped) },
  "changelog.html": { changelog: changelogHtml(changelog) },
};
const generatedMd = {
  "commands.html": { commands: commandsMd(help, notes, grouped) },
  "changelog.html": { changelog: changelogMd(changelog) },
};
const release = html => html.replaceAll(/(<span class="ver">)[^<]+/g, `$1${version}`)
  .replaceAll("<!-- release-url -->", `https://github.com/${REPO}/releases/tag/v${version}`)
  .replaceAll("<!-- changelog-url -->", `https://github.com/${REPO}/blob/v${version}/CHANGELOG.md`);
const fill = (html, page) => {
  html = release(html);
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

const twinSource = new Map();   // page → the HTML its Markdown twin is made from
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
    twinSource.set(page, rest);
    doc = `${head(page)}${home.slice(0, body).replace(/<title>[^<]*<\/title>\n?/, "")}</head>\n<body>\n${rest}\n</body>\n</html>\n`;
  } else {
    const source = await readFile(`site/${page.src}`, "utf8");
    twinSource.set(page, release(source));
    const src = fill(source, page);
    const style = src.match(/<style>[^]*?<\/style>/)?.[0] || "";
    const main = src.slice(src.indexOf("<main")).replace(/<\/main>\s*$/, `${ending(page)}\n\n${footer}\n${landing}\n</main>`);
    doc = `${head(page)}${fonts}\n${style}\n</head>\n<body>\n${sprite}\n\n${header(page)}\n\n${main}\n</body>\n</html>\n`;
  }
  await writeFile(`${OUT}/${page.out}`, links(doc).replace(/ data-md="[^"]*"/g, ""));
  console.log(`built ${OUT}/${page.out}`);
}

if (PREVIEW) process.exit(0);

// The pages as Markdown, for agents (the artifact doesn't need them): a twin of each, the setup
// guide at /install.md, and /llms.txt, which lists them all.
const pointer = page => `This is ${SITE}${page.path} as Markdown, for agents. Every page: ${SITE}/llms.txt`;
for (const page of PAGES) {
  const md = markdown(twinSource.get(page), page, generatedMd[page.src]);
  await writeFile(`${OUT}/${twin(page)}`, `# ${page.title}\n\n${pointer(page)}\n\n${md}\n`);
  console.log(`built ${OUT}/${twin(page)}`);
}
// The guide is written by hand; its <!-- check --> notes are for the site's authors, not for agents.
await writeFile(`${OUT}/install.md`, (await readFile("site/install-agent.md", "utf8")).replace(/[ \t]*<!--[^]*?-->/g, ""));
const listed = page => `- [${page.title}](${SITE}/${twin(page)}): ${page.desc}`;
await writeFile(`${OUT}/llms.txt`, `# omabox

> ${LLMS_SUMMARY.join("\n> ")}

Every page of ${SITE} is also Markdown: the links below, or any page's address fetched with \`Accept: text/markdown\`.

## Setup

- [Installing omabox, for an agent](${SITE}/install.md): the setup guide for an agent installing omabox with its user: what to check first, what to leave to the user, how to check it works

## Pages

${PAGES.filter(p => p.out !== "changelog.html").map(listed).join("\n")}

## Optional

${PAGES.filter(p => p.out === "changelog.html").map(listed).join("\n")}
- [omabox on GitHub](https://github.com/${REPO}): the code, its README and SECURITY.md
`);
console.log(`built ${OUT}/install.md and ${OUT}/llms.txt`);

await cp("site/media", `${OUT}/media`, { recursive: true, filter: src => !src.endsWith("README.md") });
await cp("site/base.css", `${OUT}/base.css`);
if (SITE !== HOME) await writeFile(`${OUT}/_headers`, "/*\n  X-Robots-Tag: noindex\n");
// functions/_middleware.js (the www redirect) runs for these paths only, not for the media
await writeFile(`${OUT}/_routes.json`, JSON.stringify({ version: 1, include: ["/*"], exclude: ["/media/*"] }) + "\n");
// without these, Pages answers /robots.txt and /sitemap.xml with the page itself
await writeFile(`${OUT}/robots.txt`, SITE === HOME ? `User-agent: *\nAllow: /\nSitemap: ${HOME}/sitemap.xml\n` : "User-agent: *\nDisallow: /\n");
// The pages only: the Markdown twins and llms.txt say the same words for agents, not for search.
const today = new Date().toISOString().slice(0, 10);
if (SITE === HOME) await writeFile(`${OUT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${PAGES.map(p => `<url><loc>${HOME}${p.path}</loc><lastmod>${today}</lastmod></url>`).join("")}</urlset>\n`);
console.log(`built ${OUT}/ for ${SITE}${SITE === HOME ? "" : " (noindex)"}`);
