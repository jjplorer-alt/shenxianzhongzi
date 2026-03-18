/**
 * 为图标添加圆角并重新生成 PNG
 * 用法: node scripts/round-icon.mjs
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "app", "public");
const appDir = path.join(root, "app", "src", "app");

const sizes = [
  { size: 32, radius: 6, out: path.join(appDir, "icon.png") },
  { size: 192, radius: 24, out: path.join(publicDir, "icon-192.png") },
  { size: 512, radius: 64, out: path.join(publicDir, "icon-512.png") },
];

const source = path.join(publicDir, "icon-512.png");

async function roundImage(inputPath, size, radius, outputPath) {
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/></svg>`
  );

  await sharp(inputPath)
    .resize(size, size)
    .png()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(outputPath);
}

async function main() {
  for (const { size, radius, out } of sizes) {
    await roundImage(source, size, radius, out);
    console.log(`✓ ${path.basename(out)} (${size}×${size}, rx=${radius})`);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
