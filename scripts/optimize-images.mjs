// One-off asset optimizer for the PageSpeed fixes (run: node scripts/optimize-images.mjs).
// Generates display-sized variants next to the originals; originals are kept
// for the lightbox/OG uses.
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const TINTS = path.join(ROOT, 'public', 'Oscuro tints');
const ASSETS = path.join(ROOT, 'public', 'assets');

const jobs = [];

function resize(src, dest, opts) {
  jobs.push(
    sharp(src)
      .resize(opts.resize)
      .webp({ quality: opts.quality ?? 72 })
      .toFile(dest)
      .then((info) => console.log(`${path.basename(dest)}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`))
  );
}

// --- Logo: nav shows 40px tall, footer 64px tall -> 128px (2x retina) ---
const logo = path.join(ASSETS, 'oscuro-logo.png');
resize(logo, path.join(ASSETS, 'oscuro-logo-nav.webp'), { resize: { height: 128 }, quality: 85 });

// Favicon / apple icon (square, padded, white bg matches the source artwork)
jobs.push(
  sharp(logo)
    .resize({ width: 192, height: 192, fit: 'contain', background: '#ffffff' })
    .png()
    .toFile(path.join(ASSETS, 'oscuro-logo-icon.png'))
    .then((info) => console.log(`oscuro-logo-icon.png  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`))
);

// --- Home gallery grid thumbs (displayed ~432px wide -> 864px for 2x) ---
const HOME_GALLERY = ['after9', 'after7', 'after6', 'backright-lexus', 'after2', 'after3', 'IMG_8148'];
for (const name of HOME_GALLERY) {
  resize(path.join(TINTS, `${name}.webp`), path.join(TINTS, `${name}-thumb.webp`), {
    resize: { width: 864, withoutEnlargement: true },
  });
}

// --- Full-bleed banner backgrounds (1600w is plenty for a darkened bg) ---
for (const name of ['IMG_8148', 'tint_from_insideview']) {
  resize(path.join(TINTS, `${name}.webp`), path.join(TINTS, `${name}-1600.webp`), {
    resize: { width: 1600, withoutEnlargement: true },
    quality: 68,
  });
}

// --- Gallery page before/after pairs (4:3 cards, ~620px wide -> 1200w) ---
const PAIR_SLUGS = ['windshield', 'backwindshield', 'backleft', 'backright', 'backpassenger'];
const PAIR_NUMS = ['9', '8', '7', '6', '5', '3'];
const pairFiles = [
  ...PAIR_SLUGS.flatMap((s) => [`${s}-before`, `${s}-after`]),
  ...PAIR_NUMS.flatMap((n) => [`before${n}`, `after${n}`]),
];
for (const name of pairFiles) {
  const src = path.join(TINTS, `${name}.webp`);
  if (!existsSync(src)) {
    console.warn(`SKIP (missing): ${name}.webp`);
    continue;
  }
  resize(src, path.join(TINTS, `${name}-1200.webp`), {
    resize: { width: 1200, withoutEnlargement: true },
  });
}

await Promise.all(jobs);
console.log('done');
