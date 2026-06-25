// Generates public/og.png (1200x630) and public/apple-touch-icon.png (180x180)
// from SVG using @resvg/resvg-js with system Arial fonts (reliable text).
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const FONTS = ["C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/arialbd.ttf"];

const arms = [0, 60, 120, 180, 240, 300]
  .map(
    (d) =>
      `<g transform="rotate(${d} 24 24)"><line x1="24" y1="24" x2="24" y2="9.5"/><line x1="24" y1="13.5" x2="27.6" y2="10.2"/><line x1="24" y1="13.5" x2="20.4" y2="10.2"/></g>`,
  )
  .join("");

const mark = (x, y, scale) => `
  <g transform="translate(${x} ${y}) scale(${scale})">
    <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#mg)"/>
    <g stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">${arms}</g>
    <circle cx="24" cy="24" r="2.6" fill="#33c9e0"/>
  </g>`;

const defs = `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
    <stop stop-color="#0e3a5c"/><stop offset="0.55" stop-color="#0a2740"/><stop offset="1" stop-color="#0e3a5c"/>
  </linearGradient>
  <linearGradient id="mg" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
    <stop stop-color="#1593d6"/><stop offset="1" stop-color="#0e3a5c"/>
  </linearGradient>
</defs>`;

const chip = (x, w, label) => `
  <rect x="${x}" y="476" width="${w}" height="58" rx="29" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.20)"/>
  <text x="${x + w / 2}" y="513" font-family="Arial" font-size="26" fill="#eaf4ff" text-anchor="middle">${label}</text>`;

const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <rect width="1200" height="630" fill="url(#bg)"/>
  ${mark(80, 64, 2.17)}
  <text x="1120" y="128" font-family="Arial" font-weight="bold" font-size="32" fill="#7cc0f5" text-anchor="end">+966 58 029 4257</text>
  <text x="1120" y="166" font-family="Arial" font-size="24" fill="#9db8d4" text-anchor="end">Call or WhatsApp</text>
  <text x="80" y="300" font-family="Arial" font-weight="bold" font-size="86" letter-spacing="-2">
    <tspan fill="#ffffff">AlHadi </tspan><tspan fill="#7cc0f5">Cooling</tspan>
  </text>
  <text x="82" y="352" font-family="Arial" font-size="33" fill="#cfe3f6">AC Installation, Repair &amp; Appliance Service in Jeddah</text>
  ${chip(80, 300, "16+ Years Experience")}
  ${chip(400, 250, "2000+ Jobs Done")}
  ${chip(670, 230, "24/7 Emergency")}
</svg>`;

// Square app icon with safe-zone padding (works as a maskable PWA icon).
const genIcon = (size) => {
  const pad = Math.round(size * 0.16);
  const scale = (size - pad * 2) / 48;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${defs}<rect width="${size}" height="${size}" fill="#0e3a5c"/>${mark(pad, pad, scale)}</svg>`;
};

function render(svg, width, out) {
  const r = new Resvg(svg, {
    font: { fontFiles: FONTS, loadSystemFonts: true, defaultFontFamily: "Arial" },
    fitTo: { mode: "width", value: width },
  });
  writeFileSync(out, r.render().asPng());
  console.log("wrote", out);
}

const pub = join(root, "public");
mkdirSync(pub, { recursive: true });
render(ogSvg, 1200, join(pub, "og.png"));
render(genIcon(180), 180, join(pub, "apple-touch-icon.png"));
render(genIcon(192), 192, join(pub, "icon-192.png"));
render(genIcon(512), 512, join(pub, "icon-512.png"));
