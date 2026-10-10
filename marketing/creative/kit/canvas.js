/*
 * Sizes an asset to its canvas and, for print, sets up bleed and the PDF page.
 *
 * Usage, in the asset's <head>:
 *   <html lang="en" data-canvas="meta-portrait">
 *   <script src="../../creative/kit/canvas.js"></script>
 *
 * The asset's root element is <main class="canvas">. Everything else is yours.
 *
 * Query flags when previewing in a browser:
 *   ?guides  overlays safe zones (screen) or trim, bleed and safe margin (print)
 *   ?trim    print only: renders at trim size with the bleed cut off
 *
 * This table is the single source of canvas sizes. marketing/scripts/render.sh
 * reads the size it needs from the data-render attribute written below.
 * Specs and sources: marketing/creative/formats.md
 */
(function () {
  var SCREEN = {
    // Meta feed
    "meta-square": { w: 1080, h: 1080, safe: { top: 0, right: 0, bottom: 0, left: 0 } },
    "meta-portrait": { w: 1080, h: 1350, safe: { top: 0, right: 0, bottom: 0, left: 0 } },
    "meta-landscape": { w: 1200, h: 628, safe: { top: 0, right: 0, bottom: 0, left: 0 } },
    // Meta vertical: keep text and logos out of the zones Meta's UI covers
    "meta-story": { w: 1080, h: 1920, safe: { top: 270, right: 0, bottom: 270, left: 0 } },
    "meta-reel": { w: 1080, h: 1920, safe: { top: 270, right: 65, bottom: 670, left: 65 } },
    // Google Performance Max / Demand Gen image assets
    "google-landscape": { w: 1200, h: 628, safe: { top: 0, right: 0, bottom: 0, left: 0 } },
    "google-square": { w: 1200, h: 1200, safe: { top: 0, right: 0, bottom: 0, left: 0 } },
    "google-portrait": { w: 960, h: 1200, safe: { top: 0, right: 0, bottom: 0, left: 0 } },
    // Google Business Profile cover photo (Search and Maps listing)
    "google-business-cover": { w: 1080, h: 608, safe: { top: 0, right: 0, bottom: 0, left: 0 } },
    // Portrait cover: the Search knowledge-panel tile crops it to about 0.62:1, losing ~90px top and bottom
    "google-business-portrait": { w: 1080, h: 1920, safe: { top: 90, right: 0, bottom: 90, left: 0 } },
  };

  // Trim sizes in mm, portrait. Append "-landscape" to the name to rotate.
  var PRINT = {
    a6: { w: 105, h: 148 },
    a5: { w: 148, h: 210 },
    a4: { w: 210, h: 297 },
    a3: { w: 297, h: 420 },
    dl: { w: 99, h: 210 },
  };
  var BLEED_MM = 3;
  var SAFE_MM = 5; // keep text this far inside the trim line
  var PX_PER_MM = 96 / 25.4;

  var root = document.documentElement;
  var name = root.getAttribute("data-canvas");
  var params = new URLSearchParams(location.search);
  var guides = params.has("guides");
  var trim = params.has("trim");

  function css(text) {
    var style = document.createElement("style");
    style.textContent = text;
    document.head.appendChild(style);
  }

  if (!name) {
    console.error("canvas.js: add data-canvas to <html>, e.g. data-canvas=\"meta-portrait\"");
    return;
  }

  var screen = SCREEN[name];
  var printKey = name.replace(/-landscape$/, "");
  var print = PRINT[printKey];

  if (screen) {
    var s = screen.safe;
    root.setAttribute("data-render", "png " + screen.w + "x" + screen.h);
    css(
      ":root{--canvas-w:" + screen.w + "px;--canvas-h:" + screen.h + "px;" +
      "--safe-top:" + s.top + "px;--safe-right:" + s.right + "px;" +
      "--safe-bottom:" + s.bottom + "px;--safe-left:" + s.left + "px}" +
      "html,body{width:var(--canvas-w);height:var(--canvas-h);overflow:hidden}" +
      ".canvas{position:relative;width:var(--canvas-w);height:var(--canvas-h);overflow:hidden}"
    );
    if (guides) {
      css(
        ".canvas::after{content:'';position:absolute;z-index:9999;pointer-events:none;" +
        "top:var(--safe-top);right:var(--safe-right);bottom:var(--safe-bottom);left:var(--safe-left);" +
        "outline:3px dashed rgba(255,0,200,.9);box-shadow:0 0 0 9999px rgba(255,0,200,.18)}"
      );
    }
    return;
  }

  if (print) {
    var landscape = /-landscape$/.test(name);
    var tw = landscape ? print.h : print.w;
    var th = landscape ? print.w : print.h;
    var bw = tw + BLEED_MM * 2;
    var bh = th + BLEED_MM * 2;
    var pageW = trim ? tw : bw;
    var pageH = trim ? th : bh;

    root.setAttribute(
      "data-render",
      "pdf " + pageW + "x" + pageH + "mm " +
      Math.round(pageW * PX_PER_MM) + "x" + Math.round(pageH * PX_PER_MM)
    );
    css(
      "@page{size:" + pageW + "mm " + pageH + "mm;margin:0}" +
      ":root{--trim-w:" + tw + "mm;--trim-h:" + th + "mm;--bleed:" + BLEED_MM + "mm;--safe:" + SAFE_MM + "mm;" +
      "--canvas-w:" + bw + "mm;--canvas-h:" + bh + "mm}" +
      "html,body{width:" + pageW + "mm;height:" + pageH + "mm;overflow:hidden}" +
      ".canvas{position:relative;width:var(--canvas-w);height:var(--canvas-h);overflow:hidden;" +
      (trim ? "margin:calc(var(--bleed) * -1);" : "") + "}"
    );
    if (guides) {
      css(
        ".canvas::before,.canvas::after{content:'';position:absolute;z-index:9999;pointer-events:none}" +
        ".canvas::before{inset:var(--bleed);outline:1px solid rgba(255,0,200,.95)}" +
        ".canvas::after{inset:calc(var(--bleed) + var(--safe));outline:1px dashed rgba(0,160,255,.95)}"
      );
    }
    return;
  }

  console.error("canvas.js: unknown canvas \"" + name + "\". See marketing/creative/formats.md");
})();
