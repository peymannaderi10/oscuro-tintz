#!/usr/bin/env node
/**
 * Fetches Square catalog item variations (bookable services) and prints
 * their IDs for use in .env.local. Run after updating SQUARE_ACCESS_TOKEN.
 *
 * Usage: node scripts/fetch-square-services.mjs
 *
 * Requires: .env.local with SQUARE_ACCESS_TOKEN and SQUARE_ENV
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const envPath = join(root, ".env.local");

// Load .env.local
if (existsSync(envPath)) {
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) {
      const val = m[2].trim().replace(/^["']|["']$/g, "");
      process.env[m[1].trim()] = val;
    }
  }
}

const token = process.env.SQUARE_ACCESS_TOKEN;
const env = process.env.SQUARE_ENV || "sandbox";

if (!token) {
  console.error("Missing SQUARE_ACCESS_TOKEN in .env.local");
  process.exit(1);
}

const baseUrl =
  env === "production"
    ? "https://connect.squareup.com"
    : "https://connect.squareupsandbox.com";

async function fetchCatalog() {
  const all = [];
  let cursor = null;

  do {
    const url = new URL("/v2/catalog/list", baseUrl);
    url.searchParams.set("types", "ITEM,ITEM_VARIATION");
    if (cursor) url.searchParams.set("cursor", cursor);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Square-Version": "2026-01-22",
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.errors?.[0]?.detail || res.statusText);
    }

    const data = await res.json();
    all.push(...(data.objects || []));
    cursor = data.cursor || null;
  } while (cursor);

  return all;
}

async function main() {
  console.log("Fetching Square catalog (ITEM + ITEM_VARIATION)...\n");

  const objects = await fetchCatalog();
  const items = new Map();
  const variations = [];

  for (const obj of objects) {
    if (obj.type === "ITEM") {
      const name = obj.item_data?.name ?? "(unnamed)";
      items.set(obj.id, { name, variations: [] });
    } else if (obj.type === "ITEM_VARIATION") {
      const name = obj.item_variation_data?.name ?? "(unnamed)";
      const itemId = obj.item_variation_data?.item_id;
      const duration = obj.item_variation_data?.service_duration;
      variations.push({
        id: obj.id,
        name,
        itemId,
        durationHours: duration ? Number(duration) / 3600000 : null,
      });
    }
  }

  for (const v of variations) {
    if (v.itemId && items.has(v.itemId)) {
      items.get(v.itemId).variations.push(v);
    }
  }

  console.log("--- Bookable services (catalog item variations) ---\n");

  const keyToDuration = {
    signature: 4.0,
    diamond: 5.5,
    basic: 2.5,
    fullinterior: 3.0,
    fullexterior: 2.0,
  };

  const nameHints = {
    signature: ["signature", "interior and exterior"],
    diamond: ["diamond", "interior and exterior"],
    basic: ["basic", "interior", "exterior"],
    fullinterior: ["full", "interior"],
    fullexterior: ["full", "exterior"],
  };

  function suggestKey(itemName, v, dur) {
    const combined = `${itemName} ${v.name}`.toLowerCase();
    for (const [k, keywords] of Object.entries(nameHints)) {
      const matchDur = dur != null && Math.abs(dur - keyToDuration[k]) < 0.5;
      const matchName = keywords.every((kw) => combined.includes(kw));
      if (matchName || (matchDur && keywords.some((kw) => combined.includes(kw))))
        return k;
    }
    if (dur != null) {
      for (const [k, d] of Object.entries(keyToDuration)) {
        if (Math.abs(dur - d) < 0.5) return k;
      }
    }
    return "";
  }

  for (const [, item] of items) {
    if (item.variations.length === 0) continue;
    for (const v of item.variations) {
      const dur = v.durationHours ?? "?";
      console.log(`${item.name} / ${v.name}`);
      console.log(`  ID: ${v.id}`);
      console.log(`  Duration: ${dur} hrs`);
      console.log("");
    }
  }

  console.log("--- Suggested .env.local entries ---\n");
  console.log("# Map these to your service keys (match by name or duration):\n");

  const seen = new Set();
  for (const [, item] of items) {
    for (const v of item.variations) {
      if (seen.has(v.id)) continue;
      seen.add(v.id);
      const mappedKey = suggestKey(item.name, v, v.durationHours);
      const envKey = mappedKey
        ? `SERVICE_ID_${mappedKey.toUpperCase().replace("FULLINTERIOR", "FULL_INTERIOR").replace("FULLEXTERIOR", "FULL_EXTERIOR")}`
        : "SERVICE_ID_???";
      const label = mappedKey ? `# ${item.name}` : `# ${item.name} (${v.name})`;
      console.log(`${envKey}=${v.id}  ${label}`);
    }
  }

  console.log("\nCopy the IDs above into your .env.local and map each to the correct SERVICE_ID_* variable.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
