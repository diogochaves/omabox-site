// The omabox mark (omabox.app's icon: a 15x15 pixel box with a smaller box inside), drawn as one
// div per rectangle so a timeline can assemble it piece by piece. Deterministic.
(function () {
  const RECTS = [[0, 0, 8, 1], [13, 0, 2, 1], [14, 1, 1, 13], [7, 14, 8, 1], [0, 14, 2, 1], [0, 1, 1, 13],
    [4, 4, 7, 2], [10, 6, 1, 4], [4, 10, 7, 1], [4, 6, 1, 4]];
  // Fills EL (sized 15 * unit square) with the mark's pieces; returns them in drawing order.
  function draw(el, unit, color) {
    return RECTS.map(([x, y, w, h]) => {
      const d = document.createElement("div");
      d.className = "mark-px";
      Object.assign(d.style, { position: "absolute", left: x * unit + "px", top: y * unit + "px",
        width: w * unit + "px", height: h * unit + "px", background: color || "#9ece6a" });
      el.appendChild(d);
      return d;
    });
  }
  window.omaboxMark = { draw };
})();
