// The link card (site/media/og.png, 1200x630): og/card.html is the home page itself with a stylesheet
// over it that keeps only the lockup, the hero's headline and its live scene, so the card follows the
// page and the scene runs on the page's own script. It carries no version: a card shows wherever the
// link is shared, long after a release, and X keeps it for days.
//
//   node og/make.mjs        -> og/card.html (git-ignored); og/README.md says how it becomes og.png
import { readFile, writeFile } from "node:fs/promises";

const home = await readFile(new URL("../site/omabox.html", import.meta.url), "utf8");
for (const [what, s] of [["the hero's headline", '<div class="hero-h">'], ["the hero's scene", 'class="scene"']])
  if (!home.includes(s)) throw new Error(`og/make.mjs: ${what} not found in site/omabox.html`);

const lockup = `<div class="og-lock"><svg viewBox="0 0 15 15" aria-hidden="true"><use href="#m"/></svg><b>omabox</b></div>`;
const page = home
  .replace('<div class="hero-h">', `<div class="hero-h">${lockup}`)
  .replace(/(<h1>[^]*?<\/h1>)/, '$1<div class="og-url">omabox.app</div>');

await writeFile(new URL("card.html", import.meta.url), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><base href="../site/"></head><body>
${page}
<style>
/* The card: 1200x630, the lockup and the headline left, the live scene right; the rest of the page hidden. */
html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden !important; }
header, .rail, .agents, main section, footer, .hero-b, .pill, .lg-act, .strip { display: none !important; }
main > .wrap { max-width: none; padding: 0; }
.hero { box-sizing: border-box; width: 1200px; height: 630px; padding: 36px 40px 36px 56px; display: grid;
  grid-template-columns: 400px minmax(0, 1fr); gap: 44px; align-items: center; }
.hero-h { gap: 0; }
.hero-h h1 { font-size: 46px; line-height: 1.1; margin: 0 0 26px; max-width: none; }
.og-lock { display: flex; align-items: center; gap: 18px; margin-bottom: 34px; }
.og-lock svg { width: 64px; height: 64px; color: var(--brand); filter: drop-shadow(0 0 14px var(--glow)); }
.og-lock b { font: 600 42px/1 var(--display); color: var(--ink); }
.og-url { font: 500 18px var(--mono); color: var(--brand); letter-spacing: .04em; }
.scene { --k: .63 !important; height: 558px; opacity: 1 !important; transform: none !important; }
</style>
</body></html>
`);
console.log("og/card.html");
