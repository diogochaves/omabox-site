// The infomercial's pieces: a starburst, and TV grain. Deterministic: the grain comes from a seeded
// generator, so every render draws the same frames.
(function () {
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  // A grey noise tile as a data URL, for a background that a timeline shifts in steps.
  function noise(size, seed) {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const g = c.getContext("2d"), img = g.createImageData(size, size), r = rng(seed);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.floor(r() * 255);
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    return c.toDataURL("image/png");
  }
  // A starburst behind EL's text: SPIKES points, the inner radius a fraction of the outer.
  function burst(el, fill, spikes, inner, stroke) {
    const n = spikes || 22, k = inner || 0.8, pts = [];
    for (let i = 0; i < n * 2; i++) {
      const a = (Math.PI * i) / n - Math.PI / 2, r = i % 2 ? 100 * k : 100;
      pts.push((r * Math.cos(a)).toFixed(2) + "," + (r * Math.sin(a)).toFixed(2));
    }
    const ns = "http://www.w3.org/2000/svg", svg = document.createElementNS(ns, "svg"), p = document.createElementNS(ns, "polygon");
    svg.setAttribute("viewBox", "-104 -104 208 208");
    p.setAttribute("points", pts.join(" "));
    p.setAttribute("fill", fill);
    p.setAttribute("stroke", stroke || "#000");
    p.setAttribute("stroke-width", "4");
    p.setAttribute("stroke-linejoin", "round");
    svg.appendChild(p);
    el.insertBefore(svg, el.firstChild);
    return svg;
  }
  window.info = { noise, burst };
})();
