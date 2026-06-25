import { existsSync, readFileSync, writeFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));

if (!existsSync("manifest.json")) {
  process.exit(0);
}

const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
manifest.version = pkg.version;
writeFileSync("manifest.json", `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`manifest.json version synced to ${pkg.version}`);
