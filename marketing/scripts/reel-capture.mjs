#!/usr/bin/env node
// Capture an animated asset frame by frame with headless Chrome, no npm packages.
//
//   node marketing/scripts/reel-capture.mjs <asset.html> <seconds> [fps] [outDir]
//
// The asset must define window.seek(ms) that pauses every animation at that time
// (see campaigns/2026-11-microscope-comparison/reel.html). Frames are written as
// PNGs to outDir (default: a temp folder), then encode them with frames-to-mp4.swift.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [, , asset, secondsArg, fpsArg, outArg] = process.argv;
if (!asset || !secondsArg) {
  console.error("Usage: reel-capture.mjs <asset.html> <seconds> [fps] [outDir]");
  process.exit(1);
}
const seconds = Number(secondsArg);
const fps = Number(fpsArg || 30);
const outDir = outArg ? resolve(outArg) : mkdtempSync(join(tmpdir(), "reel-"));
mkdirSync(outDir, { recursive: true });
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9300 + Math.floor(Math.random() * 500);

const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${port}`, "--hide-scrollbars",
  "--allow-file-access-from-files", "--force-device-scale-factor=1",
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "reel-chrome-"))}`, "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function targetWs() {
  for (let i = 0; i < 50; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error("Chrome did not start");
}

const ws = new WebSocket(await targetWs());
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
const send = (method, params = {}) => new Promise((res, rej) => {
  const n = ++id;
  pending.set(n, (m) => (m.error ? rej(new Error(m.error.message)) : res(m.result)));
  ws.send(JSON.stringify({ id: n, method, params }));
});
const evaluate = (expression) => send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });

try {
  await send("Emulation.setDeviceMetricsOverride", { width: 1080, height: 1920, deviceScaleFactor: 1, mobile: false });
  await send("Page.enable");
  await send("Page.navigate", { url: pathToFileURL(resolve(asset)).href });
  for (let i = 0; i < 50; i++) {
    const r = await evaluate("document.readyState === 'complete' && typeof window.seek === 'function'");
    if (r.result.value) break;
    await sleep(100);
  }
  await evaluate("document.fonts.ready.then(() => Promise.all([...document.images].map(i => i.decode().catch(() => {})))).then(() => true)");

  const total = Math.round(seconds * fps);
  for (let f = 0; f < total; f++) {
    await evaluate(`window.seek(${(f * 1000) / fps}); new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))`);
    const { data } = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 1080, height: 1920, scale: 1 } });
    writeFileSync(join(outDir, `f${String(f).padStart(5, "0")}.png`), Buffer.from(data, "base64"));
  }
  console.log(`${total} frames -> ${outDir}`);
} finally {
  ws.close();
  chrome.kill();
}
