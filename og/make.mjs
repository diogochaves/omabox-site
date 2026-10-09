// The link card (site/media/og.png, 1200x630): og/card.html made from the home page itself (its
// styles, the mark, the hero's headline and live view), so the card follows the page. It carries no
// version: a card shows wherever the link is shared, long after a release, and X keeps it for days.
//
//   node og/make.mjs        -> og/card.html (git-ignored); og/README.md says how it becomes og.png
import { readFile, writeFile } from "node:fs/promises";

const home = await readFile(new URL("../site/omabox.html", import.meta.url), "utf8");

function between(s, from, to, what) {
  const a = s.indexOf(from);
  const b = a < 0 ? -1 : s.indexOf(to, a + from.length);
  if (a < 0 || b < 0) throw new Error(`og/make.mjs: ${what} not found in site/omabox.html`);
  return s.slice(a, b + to.length);
}

const head = home.slice(0, home.indexOf("<style>"));
const fonts = head.split("\n").filter(l => l.includes("fonts.g")).join("\n");
const style = between(home, "<style>", "</style>", "the home page's <style>");
const symbols = between(home.slice(home.lastIndexOf("<svg", home.indexOf('<symbol id="m"'))), "<svg", "</svg>", "the symbols");
const live = between(home, '<div class="live" id="live"', "\n  </section>", "the hero's live view").replace(/\n  <\/section>$/, "");
const title = between(home, "<h1>", "</h1>", "the hero's headline");

await writeFile(new URL("card.html", import.meta.url), `<!doctype html>
<meta charset="utf-8">
<title>omabox link card</title>
${fonts}
<link rel="stylesheet" href="../site/base.css">
${style}
<style>
/* The card: 1200x630, the lockup and the headline left, the live view right. */
html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden; }
body { display: grid; grid-template-columns: 470px 1fr; gap: 56px; align-items: center; padding: 0 56px; box-sizing: border-box;
  background:
    linear-gradient(color-mix(in srgb, var(--line) 55%, transparent) 1px, transparent 1px) 0 0 / 48px 48px,
    linear-gradient(90deg, color-mix(in srgb, var(--line) 55%, transparent) 1px, transparent 1px) 0 0 / 48px 48px,
    var(--bg); }
body::before { content: ""; position: fixed; inset: 0; z-index: -1; opacity: .5;
  background: radial-gradient(700px 420px at 10% 0%, color-mix(in srgb, var(--brand) 14%, transparent), transparent 70%); }
body > * { position: relative; }
.lock { display: flex; align-items: center; gap: 26px; margin-bottom: 30px; }
.lock svg { width: 92px; height: 92px; color: var(--brand); filter: drop-shadow(0 0 14px var(--glow)); }
.lock b { display: block; font: 600 48px/1 var(--display); color: var(--ink); }
.lock small { display: block; margin-top: 8px; font: 500 13px var(--mono); letter-spacing: .18em; color: var(--muted); }
.card .tag { margin: 0 0 14px; }
.card h1 { font-size: 48px; line-height: 1.08; margin: 0 0 26px; }
.card .url { font: 500 18px var(--mono); color: var(--brand); letter-spacing: .04em; }
.live { width: 100%; }
.live .tile { pointer-events: none; }
</style>
<body>
${symbols}
<div class="card">
  <div class="lock"><svg viewBox="0 0 15 15" aria-hidden="true"><use href="#m"/></svg><div><b>omabox</b><small>FOR OMARCHY</small></div></div>
  <p class="tag">Agents, off your desktop</p>
  ${title}
  <div class="url">omabox.app</div>
</div>
${live}
</body>
`);
console.log("og/card.html");
