---
format: 1920x1080
duration: ~60s
message: "Your agents get desktops of their own, so they test their apps without touching yours."
arc: Are you tired of… → There's got to be a better way → Introducing → Watch this → But wait, there's more → And that's not all → How much would you pay? → Order now
audience: developers on Hyprland/Omarchy who run coding agents, on X; most have never heard of omabox
tone: a late-night TV infomercial, played straight and full of dad jokes. Not a product: it's free.
---

Design: concept: **an infomercial from the 90s about a desktop.** The problem is old TV: black and
white, a CRT's scanlines, grain, vignette and a slight roll, captions in yellow caps with a black
outline. omabox is crisp colour HD (the real footage, Tokyo Night), with infomercial graphics on
top: red and yellow starbursts, slanted banners, price tags, a fine-print crawl. The world switches
the moment omabox appears (a TV switching on), and once more at the end (switching off).
Palette: the problem: greys + caption yellow #ffd60a. omabox: frame.md (Tokyo Night). Infomercial
graphics: yellow #ffd60a, red #e5243b, white, black outlines.
Type: infomercial caps in a heavy condensed face (Anton, OFL, added to assets/fonts); Montserrat 900
for omabox's own statements; Chakra Petch 700 for the wordmark; JetBrains Mono for terminal and
data.
Beat grid: silent; reveals land on named times. Every joke reads muted.
Rules kept: footage only from omabox boxes; numbers on screen are real (#390, CHANGELOG), except the
prices, which are the joke; testimonials only from things (your desktop, your cursor), never a
person, an agent or a product.

## Act 1 — Are you tired of… (B&W CRT, 0.0–7.5)

### 1. "Are you tired of THIS?" (0.0–2.2)
- take: `desk-problem`, `pop` at ~0.6 s
- motion: CRT power-on blip, then B&W footage; on the pop a crash zoom and a shake
You're typing. omaseed's window lands on top of you. Caption (yellow caps): **ARE YOU TIRED OF
THIS?!**

### 2. "Typing into the WRONG APP?" (2.2–4.3)
- take: `desk-problem`, `stolen`
- motion: coordinate-target-zoom on omaseed's Add torrent field, a freeze frame with a red circle
"graph of the last hour" lands in its field. **YOUR SENTENCE… IN *ITS* APP?!**

### 3. "Password prompts out of NOWHERE?" (4.3–6.0)
- source: OPEN (see questions): a mock of Omarchy's password prompt over B&W footage, or the
  pointer jump instead (real footage)
**PASSWORD PROMPTS OUT OF NOWHERE?!**

### 4. "There's GOT to be a better way!" (6.0–7.5)
- motion: the frame shakes, the picture rolls, a channel-change of static
**THERE'S GOT TO BE A BETTER WAY!**

## Act 2 — Introducing (colour, 7.5–10.5)

### 5. The reveal (7.5–10.5)
- motion: a TV switching on into crisp colour; the mark assembles, the wordmark lands, a red
  starburst **NEW! 1.0** spins in
Small caps over it: **INTRODUCING**. Then the pitch: "Your agents get desktops of their own. Yours
stays untouched."

## Act 3 — Watch this! (colour, 10.5–21.0)

### 6. "Same desktop. Same sentence. WATCH!" (10.5–15.0)
- take: `desk-boxed` (typing straight through, the agent's `omabox up`…)
- banner: **WATCH!** then **NOT ONE KEY LOST!**
The same sentence, typed through; the agent works in its box.

### 7. Four boxes (15.0–21.0)
- takes: `desk-boxed` shrinks; `box-1…4` fan in; `omabox ls` zooms up
- banner: **FOUR AGENTS! FOUR BOXES! ZERO WINDOWS ON YOURS!**
- testimonial card (a quote with stars, pops in at ~18 s): *"I haven't been touched in weeks."*
  **— Your Desktop**

## Act 4 — But wait, there's more! (21.0–37.0)

### 8. "BUT WAIT… THERE'S MORE!" (21.0–22.2)
- motion: a slanted red banner slams across the frame

### 9. Four uses, one card each, an infomercial line over each (22.2–37.0)
1. **IT FILMS!** a box recording itself switching themes (REC). *"Lights, camera, no action on your screen."*
2. **MONITORS YOU DON'T EVEN OWN!** one box, three monitors.
3. **IT CHECKS ITS OWN WORK!** the check card: Save moved 6 px, brackets. *"It even spots 6 pixels. Your
   optometrist is jealous."*
4. **IT READS APPS AS TEXT!** the tokens card, long: ~17 tokens as text against ~1,500 as a screenshot,
   the screenshot bar running off like a receipt. A starburst: **~17 TOKENS!** *"That's not a typo.
   That's a tree."*

## Act 5 — And that's not all! (37.0–43.0)

### 10. "AND THAT'S NOT ALL!" (37.0–43.0)
- motion: items ding in with a check each, like a box's contents in an ad ("you also get…")
Two previews (any theme, without changing yours; drive a box yourself, or peek in) and the list: film
with sound nobody hears · a web page, off your screen · find the crash before your users do · tray
icons, notifications, a keyring · your bar plugin, in every theme · 4K shots on any monitor.

## Act 6 — How much would you pay? (43.0–50.5)

### 11. "NOW WITH…" (43.0–46.0)
- motion: kinetic, three lines with a ding each
**NOW IN 1.0:** one Rust binary · about 3 ms to step into a box · exit codes and --json you can
count on, for all of 1.x.

### 12. The price (46.0–50.5)
- motion: price tags, each crossed out with a red stroke, then the big starburst
**HOW MUCH WOULD YOU PAY?** ~~$99.99~~ ~~$49.99~~ ~~$19.99~~ → **FREE!** with **MIT, EVERY LINE.**
Under it: *"Not sold in stores. Not sold anywhere."*

## Act 7 — Order now! (50.5–60.0)

### 13. The guarantee (50.5–54.0)
- a gold seal: **GUARANTEED*:** 0 windows opened · 0 focus taken · 0 left behind (the site's hero
  tiles)

### 14. Order now (54.0–60.0)
- motion: the lockup, the address flashing like a phone number, the fine print crawling at the bottom
**DON'T CALL. ASK YOUR AGENT.** · **omabox.app** · **FREE · MIT · START TODAY**
Fine print (crawl): *"Box included. Desktop not included: you already have one, and now you get to
keep it. Today on Omarchy 4 · Hyprland 0.56+ · AMD, Intel or NVIDIA. Plain Hyprland is coming. Every
shot filmed in omabox. No desktops were harmed in the making of this video."*
Last frame: the TV switches off to a dot.

## Decided (Diogo, 2026-10-27)

- The password prompt is drawn (a box has no system bus, so it can't be filmed), in the B&W act only.
- Anton (OFL) for the infomercial caps, in assets/fonts.
- English only. Built as cut 3 (62 s): compositions/a1…a7; cut 2 is in cut2/.
- The grain is coarse (3 px) and slow (8 fps): full-frame 1 px noise made act 1 alone 25 MB.
  renders/1.0-post.mp4 is the posting copy (x264 CRF 21, faststart).
