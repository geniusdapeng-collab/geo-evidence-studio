import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const bundleDir = join(root, "bundles", "geo-growth");
const manifestPath = join(bundleDir, "bundle.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const provided = Object.values(manifest.workloom.provides)
  .flatMap((value) => Array.isArray(value) ? value : typeof value === "string" ? [value] : [])
  .sort((a, b) => a.localeCompare(b));

const assets = Object.fromEntries(provided.map((assetPath) => {
  const bytes = readFileSync(join(bundleDir, assetPath));
  return [assetPath, createHash("sha256").update(bytes).digest("hex")];
}));

function ordered(value) {
  if (Array.isArray(value)) return value.map(ordered);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, child]) => [key, ordered(child)]));
  }
  return value;
}

const { integrity: _integrity, ...payload } = manifest;
const digest = createHash("sha256")
  .update(`${JSON.stringify(ordered(payload))}\n${JSON.stringify(ordered(assets))}`)
  .digest("hex");

manifest.integrity = {
  algorithm: "sha256",
  digest,
  assets,
};
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ digest, assets: Object.keys(assets).length }, null, 2));
