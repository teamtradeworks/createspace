/*
 * Marble run Christmas review: draws the baubles hanging from the top edge.
 * Each canvas lists its own in data-baubles on <svg class="lights">:
 * [[x, string length, radius, colour], ...]
 */
(function () {
  var NS = "http://www.w3.org/2000/svg";
  var svg = document.querySelector(".lights");
  var baubles = document.getElementById("baubles");
  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    parent.appendChild(n);
    return n;
  }
  JSON.parse(svg.dataset.baubles).forEach(function (b) {
    var p = { x: b[0], y: 0 };
    var cy = p.y + b[1];
    el("line", { class: "string", x1: p.x, y1: p.y, x2: p.x, y2: cy - b[2] - 10 }, baubles);
    el("rect", { x: p.x - 10, y: cy - b[2] - 12, width: 20, height: 14, rx: 3, fill: "#c3c8de" }, baubles);
    el("circle", { cx: p.x, cy: cy, r: b[2] * 1.2, fill: b[3], opacity: 0.35, filter: "url(#bauble-glow)" }, baubles);
    el("circle", { cx: p.x, cy: cy, r: b[2], fill: b[3] }, baubles);
    el("path", { d: "M" + (p.x - b[2]) + " " + cy + " Q " + p.x + " " + (cy + b[2] * 0.35) + " " + (p.x + b[2]) + " " + cy, fill: "none", stroke: "#fff", "stroke-opacity": 0.45, "stroke-width": 4 }, baubles);
    el("circle", { cx: p.x, cy: cy, r: b[2], fill: "url(#shine)" }, baubles);
  });
})();
