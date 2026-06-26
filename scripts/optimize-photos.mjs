// Optimizes the supplied technician PNGs into web-ready WebP in public/images.
// Run once: node scripts/optimize-photos.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DL = "C:/Users/LiteBook/Downloads";
const out = join(root, "public", "images");
mkdirSync(out, { recursive: true });

const landscape = [
  ["ChatGPT Image Jun 26, 2026, 02_24_05 AM.png", "work-maintenance"],
  ["ChatGPT Image Jun 26, 2026, 02_24_19 AM.png", "work-washer"],
  ["ChatGPT Image Jun 26, 2026, 02_24_26 AM.png", "work-fridge"],
  ["ChatGPT Image Jun 26, 2026, 02_24_34 AM.png", "work-install"],
  ["ChatGPT Image Jun 26, 2026, 02_25_02 AM.png", "work-gasrefill"],
];

for (const [src, name] of landscape) {
  await sharp(join(DL, src))
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(join(out, `${name}.webp`));
  console.log("wrote", `${name}.webp`);
}

// Wide background for the full-bleed cinematic hero (luxury room with AC).
await sharp(join(DL, "ChatGPT Image Jun 26, 2026, 08_02_21 PM.png"))
  .resize({ width: 1800, withoutEnlargement: true })
  .webp({ quality: 74 })
  .toFile(join(out, "hero-bg.webp"));
console.log("wrote hero-bg.webp");
