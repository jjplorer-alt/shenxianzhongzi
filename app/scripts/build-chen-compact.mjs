import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const blocks = JSON.parse(readFileSync(join(__dirname, "chen-blocks.json"), "utf8"));

function stripTrailingYinshu(raw) {
  const markers = [
    /【\s*引述[】\}]?/,
    /【\s*51\s*述[】\}]?/,
    /\[\s*51\s*述/,
    /\(51述/,
    /【吉\|述/,
    /法霖、今海与引述/,
    /注释、今译与引述/,
    /注[辑糖]*、今/,
  ];
  let s = raw;
  for (const re of markers) {
    const m = s.search(re);
    if (m !== -1) s = s.slice(0, m);
  }
  return s.trim();
}

const cleaned = blocks.map(stripTrailingYinshu);
writeFileSync(join(__dirname, "chen-blocks-compact.json"), JSON.stringify(cleaned), "utf8");
console.log("chars", cleaned.join("").length);
